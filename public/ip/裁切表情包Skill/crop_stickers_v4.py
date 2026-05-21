#!/usr/bin/env python3
"""
Sticker Cropper v4 - Uses exact separator positions from white-band detection.
Falls back to equal division only when detection fails.
Output: 240×240 PNG with rounded corners, < 500KB, NO white borders.
"""

import os
import numpy as np
from PIL import Image, ImageDraw

OUTPUT_DIR = os.path.expanduser("~/Desktop/表情包")
os.makedirs(OUTPUT_DIR, exist_ok=True)

OUTPUT_SIZE = 240
CORNER_RADIUS = int(OUTPUT_SIZE * 0.08)


def add_rounded_corners(img):
    img = img.convert("RGBA")
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), (w - 1, h - 1)], radius=CORNER_RADIUS, fill=255)
    img.putalpha(mask)
    return img


def find_separators(arr_1d_pct, min_width=3):
    """Find separator bands where white percentage > 70%, merging nearby ones."""
    length = len(arr_1d_pct)
    raw_seps = []
    in_sep = False
    sep_start = 0
    for i in range(length):
        if arr_1d_pct[i] > 0.7:
            if not in_sep:
                sep_start = i
                in_sep = True
        else:
            if in_sep:
                if i - sep_start >= min_width:
                    raw_seps.append((sep_start, i))
                in_sep = False
    if in_sep and length - sep_start >= min_width:
        raw_seps.append((sep_start, length))

    # Merge separators that are close together (gap < 15px)
    if not raw_seps:
        return []
    merged = [raw_seps[0]]
    for s, e in raw_seps[1:]:
        prev_s, prev_e = merged[-1]
        if s - prev_e < 15:  # small gap = same separator zone
            merged[-1] = (prev_s, e)
        else:
            merged.append((s, e))
    return merged


def get_content_regions(seps, total_length, expected_count):
    """
    Convert separators to content regions.
    If too many regions found, merge the closest ones to match expected_count.
    """
    # Get all regions between separators
    regions = []
    prev = 0
    for s, e in seps:
        if s > prev + 5:
            regions.append((prev, s))
        prev = e
    if total_length > prev + 5:
        regions.append((prev, total_length))

    # If we got the expected number, great!
    if len(regions) == expected_count:
        return regions

    # If too many regions, merge small gaps
    # Strategy: find the N-1 widest separators to define N regions
    if len(regions) > expected_count and len(seps) > 0:
        # Sort separators by width (widest = most confident)
        sep_widths = [(e - s, idx) for idx, (s, e) in enumerate(seps)]
        sep_widths.sort(reverse=True)

        # We need expected_count-1 separators (+ possible border seps)
        # Remove border separators first
        inner_seps = [(s, e) for s, e in seps if s > 10 and e < total_length - 10]

        if len(inner_seps) >= expected_count - 1:
            # Take the N-1 widest inner separators
            inner_widths = [(e - s, s, e) for s, e in inner_seps]
            inner_widths.sort(reverse=True)
            chosen = sorted([(s, e) for _, s, e in inner_widths[:expected_count - 1]])

            regions = []
            prev = 0
            for s, e in chosen:
                regions.append((prev, s))
                prev = e
            regions.append((prev, total_length))
            return regions

    # Fallback: equal division
    step = total_length / expected_count
    return [(int(i * step), int((i + 1) * step)) for i in range(expected_count)]


def detect_and_crop(filepath, expected_rows, expected_cols, names, prefix):
    """Detect separators and crop with precise boundaries."""
    if not os.path.exists(filepath):
        print(f"  ⚠️ Not found: {filepath}")
        return []

    img = Image.open(filepath).convert("RGB")
    arr = np.array(img)
    h, w = arr.shape[:2]

    # Detect white pixels
    is_white = arr.mean(axis=2) > 240
    row_white_pct = is_white.mean(axis=1)
    col_white_pct = is_white.mean(axis=0)

    # Find separator bands
    h_seps = find_separators(row_white_pct)
    v_seps = find_separators(col_white_pct)

    # Get content regions matching expected grid
    row_regions = get_content_regions(h_seps, h, expected_rows)
    col_regions = get_content_regions(v_seps, w, expected_cols)

    print(f"\n  [{prefix}] {os.path.basename(filepath)} ({w}x{h})")
    print(f"    Grid: {expected_rows}×{expected_cols} | Detected: {len(row_regions)} rows, {len(col_regions)} cols")

    saved = []
    idx = 0

    for r_idx, (r_start, r_end) in enumerate(row_regions):
        for c_idx, (c_start, c_end) in enumerate(col_regions):
            # Crop the cell at separator midpoints (no fixed inset)
            left = c_start
            top = r_start
            right = c_end
            bottom = r_end

            if right <= left or bottom <= top:
                idx += 1
                continue

            cell = img.crop((left, top, right, bottom))

            # Aggressive border trim: remove rows/cols that are white OR black
            cell_arr = np.array(cell.convert("RGB"))
            ch_, cw_ = cell_arr.shape[:2]

            # Iteratively strip border rows/cols
            t, b_, l_, r_ = 0, ch_, 0, cw_
            # Helper: is a row/col a "border" (mostly white or mostly black)?
            def is_border_row(row_pixels):
                mean_vals = row_pixels.mean(axis=1)  # per-pixel brightness
                white = (mean_vals > 230).sum()
                black = (mean_vals < 25).sum()
                return (white + black) / len(mean_vals) > 0.65

            def is_border_col(col_pixels):
                mean_vals = col_pixels.mean(axis=1)
                white = (mean_vals > 230).sum()
                black = (mean_vals < 25).sum()
                return (white + black) / len(mean_vals) > 0.65

            # Strip top
            while t < b_ - 10 and is_border_row(cell_arr[t]):
                t += 1
            # Strip bottom
            while b_ > t + 10 and is_border_row(cell_arr[b_ - 1]):
                b_ -= 1
            # Strip left
            while l_ < r_ - 10 and is_border_col(cell_arr[t:b_, l_]):
                l_ += 1
            # Strip right
            while r_ > l_ + 10 and is_border_col(cell_arr[t:b_, r_ - 1]):
                r_ -= 1

            # Final edge cleanup: if edge rows/cols are still >45% white/black, strip them
            def is_edge_light(pixels):
                mean_vals = pixels.mean(axis=1) if pixels.ndim == 2 else pixels.mean()
                return (mean_vals > 225).sum() / len(mean_vals) > 0.45

            sub = cell_arr[t:b_, l_:r_]
            # Extra top strip
            while b_ - t > 10 and is_edge_light(sub[0]):
                t += 1
                sub = cell_arr[t:b_, l_:r_]
            # Extra bottom strip
            while b_ - t > 10 and is_edge_light(sub[-1]):
                b_ -= 1
                sub = cell_arr[t:b_, l_:r_]
            # Extra left strip
            while r_ - l_ > 10 and is_edge_light(sub[:, 0]):
                l_ += 1
                sub = cell_arr[t:b_, l_:r_]
            # Extra right strip
            while r_ - l_ > 10 and is_edge_light(sub[:, -1]):
                r_ -= 1
                sub = cell_arr[t:b_, l_:r_]

            cell = cell.crop((l_, t, r_, b_))
            cw, ch = cell.size
            if cw < 10 or ch < 10:
                idx += 1
                continue

            # Scale to COVER 240x240 (fill entirely), then center-crop overflow
            scale = max(OUTPUT_SIZE / cw, OUTPUT_SIZE / ch)
            new_w = int(cw * scale)
            new_h = int(ch * scale)
            cell = cell.resize((new_w, new_h), Image.LANCZOS)

            # Center-crop to exact 240x240
            crop_x = (new_w - OUTPUT_SIZE) // 2
            crop_y = (new_h - OUTPUT_SIZE) // 2
            cell = cell.crop((crop_x, crop_y, crop_x + OUTPUT_SIZE, crop_y + OUTPUT_SIZE))

            # Round corners
            cell = add_rounded_corners(cell)

            # Name
            if idx < len(names):
                name = names[idx]
            else:
                name = f"{prefix}_{r_idx}_{c_idx}"

            safe_name = name.replace("/", "_").replace("\\", "_").replace(":", "").replace("?", "").replace("!", "").replace("…", "").replace("~", "")
            out_path = os.path.join(OUTPUT_DIR, f"{safe_name}.png")
            counter = 1
            while os.path.exists(out_path):
                out_path = os.path.join(OUTPUT_DIR, f"{safe_name}_{counter}.png")
                counter += 1

            cell.save(out_path, "PNG", optimize=True)
            saved.append(os.path.basename(out_path))
            idx += 1

    print(f"    → {len(saved)} stickers")
    return saved


# ============ NAMES ============

NAMES_PIG_WORK = [
    "猪猪_早八咖啡续命中",
    "猪猪_改到第8版还在改",
    "猪猪_方案一过稳了",
    "猪猪_嗯嗯你说的都对",
    "猪猪_下班铃响拦不住我",
    "猪猪_工作堆山一个个拆",
    "猪猪_周五才要我",
    "猪猪_放假加班因为太优秀",
    "猪猪_五一出发世界那么大",
    "猪猪_假期模式100快乐",
    "猪猪_打卡ing停不下来",
    "猪猪_假期换个地方睡觉",
    "猪猪_五一快乐好好生活",
    "猪猪_假期三件事吃睡躺",
    "猪猪_五一干杯不谈工作",
    "猪猪_假期余额不足心碎",
]

NAMES_PIG_TRAVEL = [
    "猪猪_再打工就睡着了",
    "猪猪_咖啡续命打工人冲鸭",
    "猪猪_专注工作勿扰",
    "猪猪_这方案可以",
    "猪猪_思路打开灵感爆棚",
    "猪猪_收到马上安排",
    "猪猪_先睡了明天再卷",
    "猪猪_救命还有一堆工作",
    "猪猪_五一出发啦",
    "猪猪_出门玩略",
    "猪猪_攻略做完出发",
    "猪猪_享受假期快乐第一",
    "猪猪_旅途愉快开心最重要",
    "猪猪_放假就是吃喝玩乐",
    "猪猪_行李一背说走就走",
    "猪猪_生活明朗万物可爱",
]

NAMES_TEAM_INTRO = [
    "团队_Wenfei领头羊大佬带路",
    "团队_Zhichao树懒梗王靠谱",
    "团队_Kai小黄狗温暖前沿",
    "团队_Jiaxi小兔子靠谱设计师",
    "团队_Jiaqi熊猫大美女拍照",
    "团队_Jaymee雪纳瑞全能天才",
    "团队_Binbin小鸟拍鸟大佬",
    "团队_Duan飞机迷拍机专业",
    "团队_FangHan柴犬气氛担当",
    "团队_YanGao小狮子干练可爱",
    "团队_Bella猪猪努力搬砖",
    "团队_Freda金渐层健身干饭",
    "团队_全员合照感情真好",
    "团队_斗图三人组没有对手",
    "团队_拍照搭档友谊加倍",
    "团队_午餐约会沙拉时间",
]

NAMES_TEAM_WORK = [
    "团队_领导发话冲就完事",
    "团队_看看哪还能再优化",
    "团队_收到资讯马上同步",
    "团队_电量不足靠咖啡续命",
    "团队_拍照5分钟修图2小时",
    "团队_工作超强爱好也多",
    "团队_好看鸟咔嚓咔嚓",
    "团队_飞机拍拍快乐起飞",
    "团队_哈哈哈笑到头掉",
    "团队_交给我条理清晰",
    "团队_努力搬砖快乐生活",
    "团队_沙拉快乐也使我减肥",
    "团队_全员集合耶耶耶",
    "团队_斗图三人组只有快乐",
    "团队_干饭搭子沙拉time",
    "团队_远程组开会精神满满",
]

NAMES_HOLIDAY_20 = [
    "五一_猪猪五一快乐",
    "五一_努力工作认真生活",
    "五一_劳动最光荣奋斗最幸福",
    "五一_致敬每一位劳动者",
    "五一_辛苦了",
    "五一_全力以赴未来可期",
    "五一_终于放假啦",
    "五一_假期模式开启中",
    "五一_小长假快乐出发",
    "五一_团队野餐合照",
    "五一_烧烤快乐嗨起来",
    "五一_假期安排睡旅行放松",
    "五一_看风景放松心情",
    "五一_平凡岗位不平凡坚守",
    "五一_劳动创造美好",
    "五一_致敬每份付出值得尊重",
    "五一_五一夜晚好惬意",
    "五一_五一快乐好好休息",
    "五一_好好休息明天继续",
    "五一_假期余额不足",
]

NAMES_HOLIDAY_9 = [
    "五一_猪猪劳动最光荣",
    "五一_团结就是力量",
    "五一_兔子向劳动者致敬",
    "五一_树懒劳动最帅",
    "五一_小狗工作计划",
    "五一_小羊五一快乐送花",
    "五一_小熊猫假期烧烤吃喝",
    "五一_小狮子小长假放松",
    "五一_全员五一出游去",
]

NAMES_GROUP_4 = [
    "团队_五一快乐全员合照",
    "团队_放假啦向快乐出发",
    "团队_五一露营烧烤快乐",
    "团队_一起出发坐车兜风",
]

NAMES_MIXED_25 = [
    "混合_今天也要加油鸭",
    "混合_刷手机5分钟快乐2小时",
    "混合_吃好睡好心情好",
    "混合_我是谁我在哪在干嘛",
    "混合_比想象中更能吃",
    "混合_上班表面平静内心狂飙",
    "混合_干饭人干饭魂",
    "混合_火锅解决一切烦恼",
    "混合_早睡早起身体好",
    "混合_早餐晚点快乐不能晚",
    "混合_起飞向快乐出发",
    "混合_目的地没有烦恼",
    "混合_记录美好每一刻",
    "混合_报告塔台心情良好",
    "混合_咖啡续航飞行不慌",
    "混合_蓝天白云自由自在",
    "混合_重要的是沿途风景",
    "混合_偶尔摆烂也没关系",
    "混合_不确定方向先飞再说",
    "混合_飞累了休息一会儿",
    "混合_今天也要元气满满",
    "混合_生活很苦但我很甜",
    "混合_开心最重要",
    "混合_沉迷工作不沉迷搞钱",
    "混合_减肥明天再说先干饼干",
]


# ============ MAIN ============
if __name__ == "__main__":
    dl = os.path.expanduser("~/Downloads")
    dt = os.path.expanduser("~/Desktop")

    all_saved = []
    print("=" * 60)
    print("🎨 Sticker Cropper v4 - 精确分隔线裁切")
    print(f"   Output: {OUTPUT_SIZE}×{OUTPUT_SIZE}px, rounded corners")
    print("=" * 60)

    jobs = [
        (f"{dl}/ChatGPT Image Apr 30, 2026, 02_04_01 PM.png", 2, 2, NAMES_GROUP_4, "团队合照"),
        (f"{dl}/ChatGPT Image Apr 30, 2026, 02_04_10 PM.png", 3, 3, NAMES_HOLIDAY_9, "五一大图"),
        (f"{dl}/ChatGPT Image Apr 30, 2026, 02_05_52 PM.png", 5, 4, NAMES_HOLIDAY_20, "五一节日"),
        (f"{dl}/ChatGPT Image Apr 30, 2026, 01_07_59 PM.png", 4, 4, NAMES_PIG_WORK, "猪猪工作"),
        (f"{dl}/ChatGPT Image Apr 30, 2026, 01_08_16 PM.png", 4, 4, NAMES_PIG_TRAVEL, "猪猪旅行"),
        (f"{dl}/ChatGPT Image Apr 30, 2026, 02_11_04 PM.png", 4, 4, NAMES_TEAM_INTRO, "团队介绍"),
        (f"{dt}/42254684-a8bf-4a80-9cdc-2ecf791df602.png", 4, 4, NAMES_TEAM_WORK, "团队工作"),
        (f"{dl}/ChatGPT Image Apr 30, 2026, 02_26_03 PM.png", 5, 5, NAMES_MIXED_25, "混合表情"),
    ]

    for filepath, n_rows, n_cols, names, prefix in jobs:
        saved = detect_and_crop(filepath, n_rows, n_cols, names, prefix)
        all_saved.extend(saved)

    print(f"\n{'=' * 60}")
    print(f"✅ Total: {len(all_saved)} stickers exported")
    print(f"📁 {OUTPUT_DIR}")

    import glob
    files = glob.glob(os.path.join(OUTPUT_DIR, "*.png"))
    if files:
        sizes = [os.path.getsize(f) for f in files]
        print(f"💾 {min(sizes)//1024}KB - {max(sizes)//1024}KB | All < 500KB: {all(s < 500*1024 for s in sizes)}")
        # Check dimensions
        from PIL import Image as Im2
        dims = set(Im2.open(f).size for f in files)
        print(f"📐 Dimensions: {dims}")

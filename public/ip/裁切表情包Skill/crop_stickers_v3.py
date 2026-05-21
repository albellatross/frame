#!/usr/bin/env python3
"""
Sticker Cropper v3 - Final version.
- Processes all sticker collage images
- Equal grid division (most reliable for these images)
- Output: 240x240 PNG with rounded corners, < 500KB
- No white borders - crops tight to content
"""

import os
import numpy as np
from PIL import Image, ImageDraw

OUTPUT_DIR = os.path.expanduser("~/Desktop/表情包")
os.makedirs(OUTPUT_DIR, exist_ok=True)

OUTPUT_SIZE = 240
CORNER_RADIUS = int(OUTPUT_SIZE * 0.08)  # ~19px


def add_rounded_corners(img):
    """Apply rounded corners with transparent background."""
    img = img.convert("RGBA")
    w, h = img.size
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), (w - 1, h - 1)], radius=CORNER_RADIUS, fill=255)
    img.putalpha(mask)
    return img


def smart_crop_cell(img_full, r, c, n_rows, n_cols):
    """
    Extract a single cell from the grid, then trim white/light edges
    and make it square - ensuring NO white borders remain.
    """
    w, h = img_full.size
    cell_w = w / n_cols
    cell_h = h / n_rows

    # Extract cell with a tiny inset to avoid picking up grid lines
    inset = 2
    left = int(c * cell_w) + inset
    top = int(r * cell_h) + inset
    right = int((c + 1) * cell_w) - inset
    bottom = int((r + 1) * cell_h) - inset

    cell = img_full.crop((left, top, right, bottom))

    # Trim light borders (white/near-white edges)
    arr = np.array(cell.convert("RGB"))
    # A pixel is "content" if it's not nearly white
    is_content = arr.mean(axis=2) < 240

    if is_content.any():
        rows_with_content = np.where(is_content.any(axis=1))[0]
        cols_with_content = np.where(is_content.any(axis=0))[0]

        if len(rows_with_content) > 0 and len(cols_with_content) > 0:
            # Trim but keep a small margin (2px) to avoid cutting into content
            t = max(0, rows_with_content[0] - 1)
            b = min(arr.shape[0], rows_with_content[-1] + 2)
            l = max(0, cols_with_content[0] - 1)
            r_edge = min(arr.shape[1], cols_with_content[-1] + 2)
            cell = cell.crop((l, t, r_edge, b))

    # Make square by center-cropping
    cw, ch = cell.size
    if cw > 0 and ch > 0:
        size = min(cw, ch)
        left_sq = (cw - size) // 2
        top_sq = (ch - size) // 2
        cell = cell.crop((left_sq, top_sq, left_sq + size, top_sq + size))

    return cell


def process_grid(filepath, n_rows, n_cols, names, prefix="sticker"):
    """Process a collage with known grid dimensions."""
    if not os.path.exists(filepath):
        print(f"  ⚠️ Not found: {filepath}")
        return []

    img = Image.open(filepath).convert("RGB")
    w, h = img.size
    print(f"\n  [{prefix}] {os.path.basename(filepath)} ({w}x{h}) → {n_rows}×{n_cols}")

    saved = []
    idx = 0

    for r in range(n_rows):
        for c in range(n_cols):
            cell = smart_crop_cell(img, r, c, n_rows, n_cols)

            if cell.size[0] < 10 or cell.size[1] < 10:
                idx += 1
                continue

            # Resize to 240x240
            cell = cell.resize((OUTPUT_SIZE, OUTPUT_SIZE), Image.LANCZOS)

            # Apply rounded corners
            cell = add_rounded_corners(cell)

            # Name
            if idx < len(names):
                name = names[idx]
            else:
                name = f"{prefix}_{r}_{c}"

            safe_name = name.replace("/", "_").replace("\\", "_").replace(":", "_").replace("?", "").replace("!", "").replace("…", "")
            out_path = os.path.join(OUTPUT_DIR, f"{safe_name}.png")
            counter = 1
            while os.path.exists(out_path):
                out_path = os.path.join(OUTPUT_DIR, f"{safe_name}_{counter}.png")
                counter += 1

            cell.save(out_path, "PNG", optimize=True)
            saved.append(os.path.basename(out_path))
            idx += 1

    print(f"    → {len(saved)} stickers saved")
    return saved


# ============ NAMES ============

NAMES_PIG_WORK = [
    "猪猪_早八咖啡续命中",
    "猪猪_改方案改到第8版",
    "猪猪_方案一过稳了",
    "猪猪_嗯嗯你说的都对",
    "猪猪_下班铃响谁也留不住",
    "猪猪_工作堆山一个个拆",
    "猪猪_周五才需要我",
    "猪猪_放假还加班太优秀哭",
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
    "猪猪_再打工就要睡着了",
    "猪猪_咖啡续命打工人冲鸭",
    "猪猪_专注工作中勿扰",
    "猪猪_这方案我觉得可以",
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
    "团队_好看的鸟咔嚓咔嚓",
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

# The 5x5 mixed grid (pig + shiba + plane character)
NAMES_MIXED_25 = [
    "猪猪_今天也要加油鸭",
    "猪猪_刷手机5分钟快乐2小时",
    "猪猪_生活态度吃好睡好心情好",
    "猪猪_我是谁我在哪我在干嘛",
    "猪猪_相信自己比想象中更能吃",
    "柴犬_上班表面平静内心狂飙",
    "柴犬_干饭人干饭魂干饭都是人上人",
    "猪猪_没什么烦恼火锅解决不了",
    "猪猪_早睡早起身体好心情好",
    "猪猪_假期意义早餐晚点快乐不能晚",
    "飞机_起飞向快乐出发",
    "飞机_目的地没有烦恼的地方",
    "飞机_记录美好起飞每一刻",
    "飞机_报告塔台心情良好一路顺风",
    "飞机_咖啡续航飞行不慌",
    "飞机_蓝天白云自由自在",
    "飞机_人生就像旅行重要的是沿途风景",
    "飞机_偶尔摆烂也没关系呀",
    "飞机_不确定方向先飞起来再说",
    "飞机_飞累了休息一会儿",
    "柴犬_今天也要元气满满",
    "柴犬_生活很苦但我很甜",
    "柴犬_我的原则开心最重要",
    "柴犬_沉迷工作不沉迷搞钱",
    "柴犬_减肥明天再说先干这块饼干",
]

# Bottom row of 5x5 grid
NAMES_MIXED_BOTTOM = [
    "柴犬_今日计划吃饭睡觉发呆快乐",
    "猪猪_没有西瓜的夏天不完整",
    "柴犬_努力不一定成功不努力很轻松",
    "飞机_遇到困难先摆头然后笑一笑",
    "猪猪_晚安啦做个好梦明天见",
]


# ============ FILE MAPPING ============
# Based on visual inspection + grid score analysis

def get_file_mapping():
    """Map each collage file to its grid layout and names."""
    dl = os.path.expanduser("~/Downloads")
    dt = os.path.expanduser("~/Desktop")

    mapping = [
        # (filepath, n_rows, n_cols, names, prefix)
        # 2×2 group photos
        (f"{dl}/ChatGPT Image Apr 30, 2026, 02_04_01 PM.png", 2, 2, NAMES_GROUP_4, "团队合照"),

        # 3×3 holiday (white bg with clear separators at 422/830 and 399/843)
        (f"{dl}/ChatGPT Image Apr 30, 2026, 02_04_10 PM.png", 3, 3, NAMES_HOLIDAY_9, "五一大图"),

        # 5×4 holiday (20 stickers)
        (f"{dl}/ChatGPT Image Apr 30, 2026, 02_05_52 PM.png", 5, 4, NAMES_HOLIDAY_20, "五一节日"),

        # 4×4 pig work (highest confidence 4×4)
        (f"{dl}/ChatGPT Image Apr 30, 2026, 01_07_59 PM.png", 4, 4, NAMES_PIG_WORK, "猪猪工作"),

        # 4×4 pig travel
        (f"{dl}/ChatGPT Image Apr 30, 2026, 01_08_16 PM.png", 4, 4, NAMES_PIG_TRAVEL, "猪猪旅行"),

        # 4×4 team work scenes (confirmed: cell 0,0 = sheep "领导发话")
        (f"{dt}/42254684-a8bf-4a80-9cdc-2ecf791df602.png", 4, 4, NAMES_TEAM_WORK, "团队工作"),

        # 4×4 team intro (character portraits with names)
        (f"{dl}/ChatGPT Image Apr 30, 2026, 02_11_04 PM.png", 4, 4, NAMES_TEAM_INTRO, "团队介绍"),

        # 5×5 mixed (pig + shiba + plane)
        (f"{dl}/ChatGPT Image Apr 30, 2026, 02_26_03 PM.png", 5, 5, NAMES_MIXED_25 + NAMES_MIXED_BOTTOM, "混合表情"),
    ]

    return mapping


# ============ MAIN ============
if __name__ == "__main__":
    all_saved = []

    print("=" * 60)
    print("🎨 Sticker Cropper v3 - 表情包精确裁切 (240×240)")
    print("=" * 60)

    mapping = get_file_mapping()

    for filepath, n_rows, n_cols, names, prefix in mapping:
        saved = process_grid(filepath, n_rows, n_cols, names, prefix)
        all_saved.extend(saved)

    # Also check for additional unique files not yet processed
    # Process files 02_49_05_(1) which is the 5x5 I already viewed
    extra_5x5 = os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 02_49_05 PM (1).png")
    if os.path.exists(extra_5x5):
        # Check if it's different from 02_26_03 by comparing a sample pixel
        img1 = Image.open(extra_5x5)
        img2_path = os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 02_26_03 PM.png")
        if os.path.exists(img2_path):
            img2 = Image.open(img2_path)
            # Quick content comparison
            px1 = np.array(img1.convert("RGB"))[100:110, 100:110, :].mean()
            px2 = np.array(img2.convert("RGB"))[100:110, 100:110, :].mean()
            if abs(px1 - px2) > 10:
                # Different content - process this too
                saved = process_grid(extra_5x5, 5, 5, NAMES_MIXED_25 + NAMES_MIXED_BOTTOM, "混合v2")
                all_saved.extend(saved)
                print(f"\n  [Extra] Also processed 02_49_05_(1) as different 5×5")

    print(f"\n{'=' * 60}")
    print(f"✅ Total exported: {len(all_saved)} stickers")
    print(f"📁 Location: {OUTPUT_DIR}")

    # File size check
    import glob
    files = glob.glob(os.path.join(OUTPUT_DIR, "*.png"))
    if files:
        sizes = [os.path.getsize(f) for f in files]
        dims = [Image.open(f).size for f in files[:3]]
        print(f"📐 Size: {dims[0][0]}×{dims[0][1]}px")
        print(f"💾 File sizes: {min(sizes)//1024}KB - {max(sizes)//1024}KB")
        over_500kb = [f for f in files if os.path.getsize(f) > 500*1024]
        if over_500kb:
            print(f"⚠️  {len(over_500kb)} files over 500KB!")
        else:
            print(f"✓ All files under 500KB")

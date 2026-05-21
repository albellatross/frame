#!/usr/bin/env python3
"""Crop sticker collages into individual rounded-corner squares."""

import os
import numpy as np
from PIL import Image, ImageDraw

OUTPUT_DIR = os.path.expanduser("~/Desktop/表情包")
os.makedirs(OUTPUT_DIR, exist_ok=True)

CORNER_RADIUS_RATIO = 0.08  # 8% of image size for rounded corners


def add_rounded_corners(img):
    """Apply rounded corners, returning RGBA with transparent corners."""
    img = img.convert("RGBA")
    w, h = img.size
    r = int(min(w, h) * CORNER_RADIUS_RATIO)
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), (w - 1, h - 1)], radius=r, fill=255)
    img.putalpha(mask)
    return img


def trim_white(img, threshold=248):
    """Trim white/near-white borders from an image."""
    arr = np.array(img.convert("RGB"))
    mask = arr.mean(axis=2) < threshold
    if not mask.any():
        return img
    rows = np.where(mask.any(axis=1))[0]
    cols = np.where(mask.any(axis=0))[0]
    if len(rows) == 0 or len(cols) == 0:
        return img
    return img.crop((cols[0], rows[0], cols[-1] + 1, rows[-1] + 1))


def make_square(img):
    """Crop to square from center."""
    w, h = img.size
    size = min(w, h)
    left = (w - size) // 2
    top = (h - size) // 2
    return img.crop((left, top, left + size, top + size))


def crop_grid(img, n_rows, n_cols, names, prefix="sticker"):
    """Divide image into a fixed grid, crop each cell, save with rounded corners."""
    w, h = img.size
    cell_w = w / n_cols
    cell_h = h / n_rows
    saved = []

    for r in range(n_rows):
        for c in range(n_cols):
            idx = r * n_cols + c
            # Crop cell with slight inset to avoid border overlap
            left = int(c * cell_w)
            top = int(r * cell_h)
            right = int((c + 1) * cell_w)
            bottom = int((r + 1) * cell_h)

            cell = img.crop((left, top, right, bottom))
            cell = trim_white(cell, threshold=245)

            # Skip if cell is too small (empty)
            if cell.size[0] < 20 or cell.size[1] < 20:
                continue

            cell = make_square(cell)
            cell = add_rounded_corners(cell)

            # Name
            if idx < len(names):
                name = names[idx]
            else:
                name = f"{prefix}_{r}_{c}"

            safe_name = name.replace("/", "_").replace("\\", "_").replace(":", "_")
            out_path = os.path.join(OUTPUT_DIR, f"{safe_name}.png")
            counter = 1
            while os.path.exists(out_path):
                out_path = os.path.join(OUTPUT_DIR, f"{safe_name}_{counter}.png")
                counter += 1

            cell.save(out_path, "PNG")
            saved.append(os.path.basename(out_path))

    return saved


def crop_grid_variable_rows(img, row_configs, names, prefix="sticker"):
    """Handle grids where different rows have different column counts.
    row_configs: list of (n_cols_in_this_row, row_height_fraction)
    """
    w, h = img.size
    total_weight = sum(rh for _, rh in row_configs)
    saved = []
    idx = 0
    y_offset = 0

    for row_idx, (n_cols, row_weight) in enumerate(row_configs):
        row_h = int(h * row_weight / total_weight)
        cell_w = w / n_cols

        for c in range(n_cols):
            left = int(c * cell_w)
            top = y_offset
            right = int((c + 1) * cell_w)
            bottom = y_offset + row_h

            cell = img.crop((left, top, right, bottom))
            cell = trim_white(cell, threshold=245)

            if cell.size[0] < 20 or cell.size[1] < 20:
                idx += 1
                continue

            cell = make_square(cell)
            cell = add_rounded_corners(cell)

            if idx < len(names):
                name = names[idx]
            else:
                name = f"{prefix}_{row_idx}_{c}"

            safe_name = name.replace("/", "_").replace("\\", "_").replace(":", "_")
            out_path = os.path.join(OUTPUT_DIR, f"{safe_name}.png")
            counter = 1
            while os.path.exists(out_path):
                out_path = os.path.join(OUTPUT_DIR, f"{safe_name}_{counter}.png")
                counter += 1

            cell.save(out_path, "PNG")
            saved.append(os.path.basename(out_path))
            idx += 1

        y_offset += row_h

    return saved


# ============ NAME MAPPINGS ============

NAMES_PIG_WORK = [
    "猪猪_早八咖啡续命",
    "猪猪_改方案改到第8版",
    "猪猪_方案一过稳了",
    "猪猪_嗯嗯你说的都对",
    "猪猪_下班谁也别想留住我",
    "猪猪_工作堆成山一个个拆",
    "猪猪_周五需要我",
    "猪猪_放假我加班太优秀哭",
    "猪猪_五一出发世界那么大",
    "猪猪_假期模式100快乐",
    "猪猪_打卡ing咔咔咔",
    "猪猪_假期换个地方睡觉",
    "猪猪_五一快乐好好生活",
    "猪猪_假期三件事吃睡躺",
    "猪猪_五一干杯不谈工作",
    "猪猪_假期余额不足心碎",
]

NAMES_PIG_TRAVEL = [
    "猪猪_再打工就要睡着了",
    "猪猪_咖啡续命打工人冲鸭",
    "猪猪_专注工作勿扰",
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
    "猪猪_放假就是要吃喝玩乐",
    "猪猪_行李一背说走就走",
    "猪猪_生活明朗万物可爱",
]

NAMES_TEAM_INTRO = [
    "团队_Wenfei领头羊大佬带路",
    "团队_Zhichao树懒梗王靠谱",
    "团队_Kai小黄狗温暖技术前沿",
    "团队_Jiaxi小兔子靠谱设计师",
    "团队_Jiaqi小熊猫拍照达人",
    "团队_Jaymee雪纳瑞全能天才",
    "团队_Binbin小鸟拍鸟大佬",
    "团队_Duan飞机拍机超专业",
    "团队_FangHan柴犬团队气氛组",
    "团队_YanGao小狮子干练可爱",
    "团队_Bella小猪努力搬砖快乐",
    "团队_Freda金渐层健身干饭搭子",
    "团队_全员合照感情好好呀",
    "团队_斗图三人组没有对手",
    "团队_拍照搭档Duan拍照yyds",
    "团队_午餐约会沙拉快乐友谊加倍",
    "团队_苏州远程组距离不是问题",
]

NAMES_TEAM_WORK = [
    "团队_领导发话冲就完事了",
    "团队_我看看还能再优化一下",
    "团队_收到前沿资讯马上同步",
    "团队_今天电量不足靠咖啡续命",
    "团队_拍照5分钟修图2小时",
    "团队_工作超强爱好也多",
    "团队_好看的鸟鸟咔嚓咔嚓",
    "团队_飞机拍拍拍快乐起飞",
    "团队_哈哈哈笑到头掉",
    "团队_交给我吧条理清晰",
    "团队_努力搬砖快乐生活",
    "团队_沙拉使我快乐也使我减肥",
    "团队_全员集合耶耶耶",
    "团队_斗图三人组只有快乐",
    "团队_干饭搭子上线沙拉time",
    "团队_苏州远程组开会精神满满",
]

NAMES_HOLIDAY_20 = [
    "五一_猪猪五一快乐加油",
    "五一_努力工作认真生活",
    "五一_劳动最光荣奋斗最幸福",
    "五一_致敬每一位劳动者",
    "五一_辛苦了大熊",
    "五一_全力以赴未来可期",
    "五一_终于放假啦",
    "五一_假期模式开启中",
    "五一_小长假快乐出发",
    "五一_大家一起野餐",
    "五一_烧烤快乐嗨起来",
    "五一_假期安排睡觉旅行放松",
    "五一_看看风景放松心情",
    "五一_平凡岗位不平凡的坚守",
    "五一_劳动创造美好实干成就梦想",
    "五一_致敬劳动者付出值得尊重",
    "五一_五一夜晚好惬意",
    "五一_五一快乐",
    "五一_好好休息明天继续加油",
    "五一_猪猪假期余额不足",
]

NAMES_HOLIDAY_9 = [
    "五一_猪猪劳动最光荣竖拇指",
    "五一_团结就是力量合照",
    "五一_兔子向劳动者致敬",
    "五一_树懒劳动最帅",
    "五一_小狗工作计划认真学习",
    "五一_小羊五一快乐送花",
    "五一_小熊猫烧烤假期吃喝",
    "五一_小狮子五一小长假放松",
    "五一_全员五一出游去",
]

NAMES_GROUP_4 = [
    "团队_五一快乐全员合照",
    "团队_放假啦向快乐出发",
    "团队_五一露营烧烤真快乐",
    "团队_一起出发坐车兜风",
]

# Additional 4x4 grid names for the "work scenes" square image
NAMES_TEAM_WORK_V2 = [
    "团队_羊领导发话冲完事了",
    "团队_树懒看哪个环节优化",
    "团队_狗收到资讯马上同步",
    "团队_兔子电量不足咖啡续命",
    "团队_熊猫拍照5分钟修图2小时",
    "团队_瑞工作超强爱好多",
    "团队_鸟鸟咔嚓咔嚓好看",
    "团队_飞机拍拍拍起飞",
    "团队_柴犬哈哈哈笑到掉",
    "团队_狮子交给我条理清晰",
    "团队_猪猪搬砖快乐生活",
    "团队_猫沙拉快乐也减肥",
    "团队_全员集合耶",
    "团队_斗图VS只有快乐",
    "团队_干饭搭子沙拉time",
    "团队_远程组开会精神满满",
]


# ============ MAIN ============
if __name__ == "__main__":
    all_saved = []

    print("=" * 50)
    print("Sticker Cropper - 表情包裁切工具")
    print("=" * 50)

    # === A4 images: known 4x4 grids ===
    # A4-1: Pig work (4x4 = 16)
    fp = os.path.expanduser("~/Desktop/A4 - 1.png")
    if os.path.exists(fp):
        img = Image.open(fp)
        print(f"\n[A4-1] Pig work stickers: {img.size}")
        saved = crop_grid(img, 4, 4, NAMES_PIG_WORK, "猪猪工作")
        all_saved.extend(saved)
        print(f"  → Saved {len(saved)} stickers")

    # A4-2: Pig travel (4x4 = 16)
    fp = os.path.expanduser("~/Desktop/A4 - 2.png")
    if os.path.exists(fp):
        img = Image.open(fp)
        print(f"\n[A4-2] Pig travel stickers: {img.size}")
        saved = crop_grid(img, 4, 4, NAMES_PIG_TRAVEL, "猪猪旅行")
        all_saved.extend(saved)
        print(f"  → Saved {len(saved)} stickers")

    # A4-3: Team intro (rows 1-3: 4 cols, row 4: 5 cols)
    fp = os.path.expanduser("~/Desktop/A4 - 3.png")
    if os.path.exists(fp):
        img = Image.open(fp)
        print(f"\n[A4-3] Team intro: {img.size}")
        # Row heights: top 3 rows are character cards (taller), bottom row is scenes (shorter)
        # Approximate: each of top 3 rows = 1.0 weight, bottom row = 0.85 weight
        row_configs = [(4, 1.0), (4, 1.0), (4, 1.0), (5, 0.85)]
        saved = crop_grid_variable_rows(img, row_configs, NAMES_TEAM_INTRO, "团队介绍")
        all_saved.extend(saved)
        print(f"  → Saved {len(saved)} stickers")

    # A4-4: Team work (4x4 = 16)
    fp = os.path.expanduser("~/Desktop/A4 - 4.png")
    if os.path.exists(fp):
        img = Image.open(fp)
        print(f"\n[A4-4] Team work stickers: {img.size}")
        saved = crop_grid(img, 4, 4, NAMES_TEAM_WORK, "团队工作")
        all_saved.extend(saved)
        print(f"  → Saved {len(saved)} stickers")

    # === Square 1254x1254 images ===
    # I need to identify which file has which layout.
    # Strategy: try to detect grid by checking if image matches expected dimensions

    square_candidates = [
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 02_05_52 PM.png"),
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 02_04_01 PM.png"),
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 02_04_10 PM.png"),
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 02_11_04 PM.png"),
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 02_11_10 PM.png"),
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 01_08_16 PM.png"),
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 01_07_59 PM.png"),
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 01_09_44 PM.png"),
        os.path.expanduser("~/Desktop/42254684-a8bf-4a80-9cdc-2ecf791df602.png"),
        os.path.expanduser("~/Desktop/ChatGPT Image Apr 29, 2026, 02_54_46 PM.png"),
    ]

    def detect_best_grid(img):
        """Try common grid sizes and pick the one with cleanest separators."""
        w, h = img.size
        arr = np.array(img.convert("RGB"))
        candidates = [(5, 4), (4, 5), (4, 4), (3, 3), (2, 2)]
        best_score = -1
        best_grid = (1, 1)

        for n_rows, n_cols in candidates:
            score = 0
            # Check horizontal separator lines
            for r in range(1, n_rows):
                y = int(r * h / n_rows)
                # Sample a band around the expected separator
                band = arr[max(0, y-3):min(h, y+3), :, :]
                avg = band.mean()
                if avg > 230:
                    score += 1
            # Check vertical separator lines
            for c in range(1, n_cols):
                x = int(c * w / n_cols)
                band = arr[:, max(0, x-3):min(w, x+3), :]
                avg = band.mean()
                if avg > 230:
                    score += 1

            total_expected = (n_rows - 1) + (n_cols - 1)
            if total_expected > 0:
                ratio = score / total_expected
            else:
                ratio = 0

            if ratio > best_score:
                best_score = ratio
                best_grid = (n_rows, n_cols)

        return best_grid, best_score

    processed_layouts = set()

    for filepath in square_candidates:
        if not os.path.exists(filepath):
            continue
        img = Image.open(filepath)
        grid, score = detect_best_grid(img)
        n_rows, n_cols = grid
        total = n_rows * n_cols

        # Skip if we already processed this layout
        layout_key = (n_rows, n_cols)
        if layout_key in processed_layouts:
            print(f"\n[Skip] Duplicate {n_rows}×{n_cols} grid: {os.path.basename(filepath)}")
            continue
        processed_layouts.add(layout_key)

        # Assign names based on grid size
        if total == 20:
            names = NAMES_HOLIDAY_20
            prefix = "五一"
        elif total == 9:
            names = NAMES_HOLIDAY_9
            prefix = "五一大图"
        elif total == 4:
            names = NAMES_GROUP_4
            prefix = "团队合照"
        elif total == 16:
            names = NAMES_TEAM_WORK_V2
            prefix = "团队场景"
        else:
            names = []
            prefix = f"sticker_{n_rows}x{n_cols}"

        print(f"\n[Square] {os.path.basename(filepath)}: {n_rows}×{n_cols} grid (score={score:.2f})")
        saved = crop_grid(img, n_rows, n_cols, names, prefix)
        all_saved.extend(saved)
        print(f"  → Saved {len(saved)} stickers")

    print(f"\n{'=' * 50}")
    print(f"✅ Done! Total stickers exported: {len(all_saved)}")
    print(f"📁 Output: {OUTPUT_DIR}")
    print(f"\nFiles:")
    for f in sorted(all_saved):
        print(f"  {f}")

#!/usr/bin/env python3
"""
Sticker Cropper v2 - Precise grid detection using wide white-band analysis.
Outputs 240x240 PNG with rounded corners, each < 500KB.
"""

import os
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

OUTPUT_DIR = os.path.expanduser("~/Desktop/表情包")
os.makedirs(OUTPUT_DIR, exist_ok=True)

OUTPUT_SIZE = 240
CORNER_RADIUS_RATIO = 0.08
MAX_FILE_SIZE = 500 * 1024  # 500KB


def add_rounded_corners(img):
    """Apply rounded corners with transparent background."""
    img = img.convert("RGBA")
    w, h = img.size
    r = int(min(w, h) * CORNER_RADIUS_RATIO)
    mask = Image.new("L", (w, h), 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), (w - 1, h - 1)], radius=r, fill=255)
    img.putalpha(mask)
    return img


def find_separator_bands(brightness, min_band_width=5, threshold=240):
    """
    Find wide bands of high brightness (white separators).
    Returns list of (center_position) for each separator band.
    """
    length = len(brightness)
    separators = []
    i = 0
    while i < length:
        if brightness[i] > threshold:
            # Found start of a potential white band
            start = i
            while i < length and brightness[i] > threshold:
                i += 1
            band_width = i - start
            if band_width >= min_band_width:
                center = (start + i) // 2
                separators.append((start, i, center))
        else:
            i += 1
    return separators


def detect_grid_precise(img, min_band_pct=0.005):
    """
    Detect grid by finding wide white separator bands.
    min_band_pct: minimum band width as fraction of image dimension.
    Returns (row_segments, col_segments) where each segment is (start, end).
    """
    arr = np.array(img.convert("RGB"))
    h, w, _ = arr.shape

    min_band_h = max(3, int(h * min_band_pct))
    min_band_w = max(3, int(w * min_band_pct))

    # Compute per-row and per-column average brightness
    row_brightness = arr.mean(axis=(1, 2))
    col_brightness = arr.mean(axis=(0, 2))

    # Find separator bands
    row_seps = find_separator_bands(row_brightness, min_band_h, threshold=235)
    col_seps = find_separator_bands(col_brightness, min_band_w, threshold=235)

    # Convert separators to content segments
    def seps_to_segments(separators, total_length):
        """Convert separator positions to content segment (start, end) pairs."""
        segments = []
        prev_end = 0
        for start, end, _ in separators:
            if start > prev_end + 10:  # minimum content width
                segments.append((prev_end, start))
            prev_end = end
        if total_length > prev_end + 10:
            segments.append((prev_end, total_length))
        return segments

    row_segments = seps_to_segments(row_seps, h)
    col_segments = seps_to_segments(col_seps, w)

    return row_segments, col_segments


def detect_grid_for_pink_bg(img, min_band_pct=0.005):
    """
    For images with pink/beige background, use a lower threshold.
    Detect grid by looking for uniform-color bands (separators).
    """
    arr = np.array(img.convert("RGB"))
    h, w, _ = arr.shape

    min_band_h = max(3, int(h * min_band_pct))
    min_band_w = max(3, int(w * min_band_pct))

    # For pink background images, separators are areas with low variance
    # (uniform color) AND higher brightness than content

    # Compute per-row brightness AND variance
    row_brightness = arr.mean(axis=(1, 2))
    col_brightness = arr.mean(axis=(0, 2))

    # Use a slightly lower threshold for pink backgrounds
    row_seps = find_separator_bands(row_brightness, min_band_h, threshold=220)
    col_seps = find_separator_bands(col_brightness, min_band_w, threshold=220)

    def seps_to_segments(separators, total_length):
        segments = []
        prev_end = 0
        for start, end, _ in separators:
            if start > prev_end + 10:
                segments.append((prev_end, start))
            prev_end = end
        if total_length > prev_end + 10:
            segments.append((prev_end, total_length))
        return segments

    row_segments = seps_to_segments(row_seps, h)
    col_segments = seps_to_segments(col_seps, w)

    return row_segments, col_segments


def crop_and_save(img, row_segs, col_segs, names, prefix="sticker"):
    """Crop each cell, resize to 240x240 with rounded corners, save."""
    saved = []
    idx = 0

    for r_idx, (r_start, r_end) in enumerate(row_segs):
        for c_idx, (c_start, c_end) in enumerate(col_segs):
            cell = img.crop((c_start, r_start, c_end, r_end))

            # Make square by center-cropping
            cw, ch = cell.size
            size = min(cw, ch)
            left = (cw - size) // 2
            top = (ch - size) // 2
            cell = cell.crop((left, top, left + size, top + size))

            # Resize to output size
            cell = cell.resize((OUTPUT_SIZE, OUTPUT_SIZE), Image.LANCZOS)

            # Apply rounded corners
            cell = add_rounded_corners(cell)

            # Determine name
            if idx < len(names):
                name = names[idx]
            else:
                name = f"{prefix}_{r_idx}_{c_idx}"

            safe_name = name.replace("/", "_").replace("\\", "_").replace(":", "_")
            out_path = os.path.join(OUTPUT_DIR, f"{safe_name}.png")
            counter = 1
            while os.path.exists(out_path):
                out_path = os.path.join(OUTPUT_DIR, f"{safe_name}_{counter}.png")
                counter += 1

            # Save with optimization
            cell.save(out_path, "PNG", optimize=True)

            # Check file size
            fsize = os.path.getsize(out_path)
            if fsize > MAX_FILE_SIZE:
                # Re-save with more compression (reduce colors if needed)
                cell = cell.quantize(colors=256, method=2).convert("RGBA")
                cell.save(out_path, "PNG", optimize=True)

            saved.append(os.path.basename(out_path))
            idx += 1

    return saved


def crop_variable_grid(img, row_col_configs, names, prefix="sticker"):
    """
    Handle grids where different rows have different column counts.
    row_col_configs: list of n_cols per row. Row heights are auto-detected.
    """
    arr = np.array(img.convert("RGB"))
    h, w, _ = arr.shape

    # Detect row separators
    row_brightness = arr.mean(axis=(1, 2))
    row_seps = find_separator_bands(row_brightness, min_band_width=3, threshold=235)

    def seps_to_segments(separators, total_length):
        segments = []
        prev_end = 0
        for start, end, _ in separators:
            if start > prev_end + 10:
                segments.append((prev_end, start))
            prev_end = end
        if total_length > prev_end + 10:
            segments.append((prev_end, total_length))
        return segments

    row_segments = seps_to_segments(row_seps, h)

    # If row detection doesn't match expected rows, use equal division
    expected_rows = len(row_col_configs)
    if len(row_segments) != expected_rows:
        row_h = h / expected_rows
        row_segments = [(int(i * row_h), int((i + 1) * row_h)) for i in range(expected_rows)]

    saved = []
    idx = 0

    for r_idx, (r_start, r_end) in enumerate(row_segments):
        if r_idx >= len(row_col_configs):
            break
        n_cols = row_col_configs[r_idx]

        # Detect column separators within this row
        row_strip = arr[r_start:r_end, :, :]
        col_brightness = row_strip.mean(axis=(0, 2))
        col_seps = find_separator_bands(col_brightness, min_band_width=3, threshold=235)
        col_segments = seps_to_segments(col_seps, w)

        # Fallback to equal division if detection doesn't match
        if len(col_segments) != n_cols:
            col_w = w / n_cols
            col_segments = [(int(i * col_w), int((i + 1) * col_w)) for i in range(n_cols)]

        for c_idx, (c_start, c_end) in enumerate(col_segments):
            cell = img.crop((c_start, r_start, c_end, r_end))

            cw, ch = cell.size
            size = min(cw, ch)
            left = (cw - size) // 2
            top = (ch - size) // 2
            cell = cell.crop((left, top, left + size, top + size))

            cell = cell.resize((OUTPUT_SIZE, OUTPUT_SIZE), Image.LANCZOS)
            cell = add_rounded_corners(cell)

            if idx < len(names):
                name = names[idx]
            else:
                name = f"{prefix}_{r_idx}_{c_idx}"

            safe_name = name.replace("/", "_").replace("\\", "_").replace(":", "_")
            out_path = os.path.join(OUTPUT_DIR, f"{safe_name}.png")
            counter = 1
            while os.path.exists(out_path):
                out_path = os.path.join(OUTPUT_DIR, f"{safe_name}_{counter}.png")
                counter += 1

            cell.save(out_path, "PNG", optimize=True)
            saved.append(os.path.basename(out_path))
            idx += 1

    return saved


def process_known_grid(filepath, n_rows, n_cols, names, prefix):
    """Process an image with a known grid layout."""
    if not os.path.exists(filepath):
        print(f"  ⚠️  File not found: {filepath}")
        return []

    img = Image.open(filepath)
    w, h = img.size
    print(f"\n[{prefix}] {os.path.basename(filepath)} ({w}x{h}) → {n_rows}×{n_cols} = {n_rows*n_cols}")

    # Try precise detection first
    row_segs, col_segs = detect_grid_precise(img)

    # Validate detection: should match expected grid
    if len(row_segs) == n_rows and len(col_segs) == n_cols:
        print(f"  ✓ Auto-detected {n_rows} rows × {n_cols} cols")
        saved = crop_and_save(img, row_segs, col_segs, names, prefix)
    else:
        # Fallback: use equal division
        print(f"  → Detection got {len(row_segs)}×{len(col_segs)}, using equal {n_rows}×{n_cols} division")
        cell_h = h / n_rows
        cell_w = w / n_cols
        row_segs = [(int(i * cell_h), int((i + 1) * cell_h)) for i in range(n_rows)]
        col_segs = [(int(i * cell_w), int((i + 1) * cell_w)) for i in range(n_cols)]
        saved = crop_and_save(img, row_segs, col_segs, names, prefix)

    print(f"  → Exported {len(saved)} stickers")
    return saved


# ============ STICKER NAMES ============

NAMES_PIG_WORK = [
    "猪猪_早八咖啡续命中",
    "猪猪_改到第8版了还改",
    "猪猪_方案一过稳了",
    "猪猪_嗯嗯你说的都对",
    "猪猪_下班铃响谁也留不住",
    "猪猪_工作堆成山一个个拆",
    "猪猪_周五才需要我",
    "猪猪_放假加班因为太优秀",
    "猪猪_五一出发世界那么大",
    "猪猪_假期模式开启100快乐",
    "猪猪_打卡ing咔咔停不下来",
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
    "团队_Jiaqi小熊猫大美女拍照",
    "团队_Jaymee雪纳瑞全能天才",
    "团队_Binbin小鸟拍鸟大佬",
    "团队_Duan飞机迷拍机专业",
    "团队_FangHan柴犬气氛组担当",
    "团队_YanGao小狮子干练可爱",
    "团队_Bella猪猪努力搬砖快乐",
    "团队_Freda金渐层健身干饭搭子",
    "团队_全员合照感情真好",
    "团队_斗图三人组没有对手",
    "团队_拍照搭档友谊加倍",
    "团队_午餐约会沙拉时间",
    "团队_苏州远程组距离不是问题",
]

NAMES_TEAM_WORK = [
    "团队_领导发话冲就完事",
    "团队_看看哪还能再优化",
    "团队_收到前沿资讯马上同步",
    "团队_电量不足靠咖啡续命",
    "团队_拍照5分钟修图2小时",
    "团队_工作超强爱好也多",
    "团队_好看的鸟咔嚓咔嚓",
    "团队_飞机拍拍拍快乐起飞",
    "团队_哈哈哈哈笑到头掉",
    "团队_交给我吧条理清晰",
    "团队_努力搬砖快乐生活",
    "团队_沙拉使我快乐也减肥",
    "团队_全员集合耶耶耶",
    "团队_斗图三人组只有快乐",
    "团队_干饭搭子沙拉time",
    "团队_苏州远程组精神满满",
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
    "五一_团队一起野餐",
    "五一_烧烤加快乐嗨起来",
    "五一_假期安排睡旅行放松",
    "五一_看看风景放松心情",
    "五一_平凡岗位不平凡坚守",
    "五一_劳动创造美好",
    "五一_致敬每份付出都值得",
    "五一_五一夜晚好惬意",
    "五一_五一快乐",
    "五一_好好休息明天继续",
    "五一_猪猪假期余额不足",
]

NAMES_HOLIDAY_9 = [
    "五一_猪猪劳动最光荣",
    "五一_团结就是力量",
    "五一_兔子向劳动者致敬",
    "五一_树懒劳动最帅",
    "五一_小狗工作计划",
    "五一_小羊五一快乐送花",
    "五一_小熊猫假期吃喝烧烤",
    "五一_小狮子小长假放松",
    "五一_全员五一出游去",
]

NAMES_GROUP_4 = [
    "团队_五一快乐全员合照",
    "团队_放假啦向快乐出发",
    "团队_五一露营烧烤快乐",
    "团队_一起出发坐车兜风",
]


# ============ MAIN: Process each file with known grid ============
if __name__ == "__main__":
    all_saved = []

    print("=" * 60)
    print("🎨 Sticker Cropper v2 - 表情包精确裁切")
    print(f"   Output: {OUTPUT_SIZE}x{OUTPUT_SIZE}px PNG, rounded corners")
    print("=" * 60)

    # --- A4 Images (4x4 grids, 595x842) ---
    saved = process_known_grid(
        os.path.expanduser("~/Desktop/A4 - 1.png"),
        4, 4, NAMES_PIG_WORK, "猪猪工作"
    )
    all_saved.extend(saved)

    saved = process_known_grid(
        os.path.expanduser("~/Desktop/A4 - 2.png"),
        4, 4, NAMES_PIG_TRAVEL, "猪猪旅行"
    )
    all_saved.extend(saved)

    # A4-3: Team intro (3 rows × 4 + 1 row × 5)
    fp = os.path.expanduser("~/Desktop/A4 - 3.png")
    if os.path.exists(fp):
        img = Image.open(fp)
        print(f"\n[团队介绍] {os.path.basename(fp)} ({img.size}) → 3×4 + 1×5 = 17")
        saved = crop_variable_grid(img, [4, 4, 4, 5], NAMES_TEAM_INTRO, "团队介绍")
        all_saved.extend(saved)
        print(f"  → Exported {len(saved)} stickers")

    saved = process_known_grid(
        os.path.expanduser("~/Desktop/A4 - 4.png"),
        4, 4, NAMES_TEAM_WORK, "团队工作"
    )
    all_saved.extend(saved)

    # --- High-res 1254x1254 images ---
    # I'll process each with its correct grid based on visual inspection

    # 5x4 holiday grid (20 stickers)
    # File: 02_05_52 has 4 white column separators → it's a 4-col layout
    # File: 01_08_16 also has white column separators
    # Need to find which one is 5x4

    # Based on my analysis: files with 3 white col seps (254) at 4-col positions
    # AND row separators that are whitish at 4-row positions = 4x4
    # Files where 5-row positions show nothing special but content = 5x4

    # Let me process the files I'm most confident about:

    # 2x2 group photos
    saved = process_known_grid(
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 02_04_01 PM.png"),
        2, 2, NAMES_GROUP_4, "团队合照"
    )
    all_saved.extend(saved)

    # 3x3 holiday (pink background)
    saved = process_known_grid(
        os.path.expanduser("~/Desktop/ChatGPT Image Apr 29, 2026, 02_54_46 PM.png"),
        3, 3, NAMES_HOLIDAY_9, "五一大图"
    )
    all_saved.extend(saved)

    # 5x4 holiday grid (20 stickers)
    # Multiple candidates - try to find the right one
    candidates_5x4 = [
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 02_05_52 PM.png"),
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 02_04_10 PM.png"),
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 01_09_44 PM.png"),
        os.path.expanduser("~/Desktop/42254684-a8bf-4a80-9cdc-2ecf791df602.png"),
    ]

    found_5x4 = False
    for fp in candidates_5x4:
        if not os.path.exists(fp):
            continue
        img = Image.open(fp)
        arr = np.array(img.convert("RGB"))
        h, w = arr.shape[:2]
        # For 5x4: check if 4 row separators at h/5 intervals are visible
        # AND 3 column separators
        col_seps_ok = 0
        for i in range(1, 4):
            x = int(i * w / 4)
            band = arr[:, max(0, x-4):x+4, :].mean()
            if band > 230:
                col_seps_ok += 1

        # Check if content exists at 5-row cell centers (not white)
        cell_has_content = 0
        for r in range(5):
            cy = int((r + 0.5) * h / 5)
            for c in range(4):
                cx = int((c + 0.5) * w / 4)
                patch = arr[cy-10:cy+10, cx-10:cx+10, :].mean()
                if patch < 220:
                    cell_has_content += 1

        if col_seps_ok >= 2 and cell_has_content >= 15:
            print(f"\n  → Identified 5×4 holiday grid: {os.path.basename(fp)}")
            saved = process_known_grid(fp, 5, 4, NAMES_HOLIDAY_20, "五一节日")
            all_saved.extend(saved)
            found_5x4 = True
            break

    if not found_5x4:
        # Fallback: use first candidate with equal division
        for fp in candidates_5x4:
            if os.path.exists(fp):
                saved = process_known_grid(fp, 5, 4, NAMES_HOLIDAY_20, "五一节日")
                all_saved.extend(saved)
                break

    # 4x4 team work (the ones with individual character scenes)
    # Files: 02_11_04, 01_07_59, 42254684
    candidates_4x4 = [
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 02_11_04 PM.png"),
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 02_11_10 PM.png"),
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 01_08_16 PM.png"),
        os.path.expanduser("~/Downloads/ChatGPT Image Apr 30, 2026, 01_07_59 PM.png"),
    ]

    # Process the pig sticker grids from 1254x1254 (higher quality than A4)
    # These should override the A4 versions
    pig_work_done = False
    pig_travel_done = False
    team_work_hires_done = False

    for fp in candidates_4x4:
        if not os.path.exists(fp):
            continue
        img = Image.open(fp)
        arr = np.array(img.convert("RGB"))
        h, w = arr.shape[:2]

        # Check if it has white column separators at 4-col positions
        col_seps_ok = 0
        for i in range(1, 4):
            x = int(i * w / 4)
            band = arr[:, max(0, x-4):x+4, :].mean()
            if band > 230:
                col_seps_ok += 1

        if col_seps_ok >= 2:
            # It's a clear 4x4 grid - determine content type
            # Check top-left cell: if it has pink tones → pig sticker
            top_left = arr[10:int(h/4)-10, 10:int(w/4)-10, :]
            r_mean = top_left[:, :, 0].mean()
            g_mean = top_left[:, :, 1].mean()
            b_mean = top_left[:, :, 2].mean()

            is_pink = (r_mean > g_mean + 10) and (r_mean > b_mean + 10)

            if is_pink and not pig_work_done:
                # Skip - we already have pig stickers from A4 (and 1254 versions will be duplicates)
                pig_work_done = True
                continue
            elif not team_work_hires_done:
                # Team work scenes (higher res)
                team_work_hires_done = True
                # Don't re-process as we already have team work from A4-4
                continue

    print(f"\n{'=' * 60}")
    print(f"✅ Done! Total stickers exported: {len(all_saved)}")
    print(f"📁 Output: {OUTPUT_DIR}")

    # Summary by category
    categories = {}
    for f in all_saved:
        cat = f.split("_")[0] if "_" in f else "other"
        categories[cat] = categories.get(cat, 0) + 1

    print("\nCategories:")
    for cat, count in sorted(categories.items()):
        print(f"  {cat}: {count} stickers")

    # Check file sizes
    import glob
    files = glob.glob(os.path.join(OUTPUT_DIR, "*.png"))
    sizes = [os.path.getsize(f) for f in files]
    print(f"\nFile sizes: {min(sizes)//1024}KB - {max(sizes)//1024}KB (all < 500KB: {all(s < MAX_FILE_SIZE for s in sizes)})")

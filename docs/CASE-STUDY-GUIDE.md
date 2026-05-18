# Portfolio Showcase System

## 核心逻辑：两种模式

| 情况 | 模式 | 网站行为 |
|------|------|----------|
| **已有完整排版的作品集** | Mode A: Slide Showcase | 按原样展示，不拆不改 |
| 只有零散素材需要组织 | Mode B: Modular Case Study | 用 section 组件重构叙事 |

**默认使用 Mode A。** 你的作品集页面本身就是设计成果，网站应该做的是"高质量呈现"，不是"二次改写"。

---

## Mode A: Slide Showcase（默认）

### 适用场景

- 你已经有排版完整的 PDF / Figma 导出 / PPT 页面
- 每一页本身就是完整的叙事板块
- 你不希望网站重新拆解、重组、改写

### 网站行为

- 提取每页为高清图片（PNG/JPG）
- 按原顺序纵向滚动展示
- 保持比例，不裁切、不破坏版式
- 图片 lazy load（前两张 eager）
- Hover 显示页码指示器
- 顶部轻量信息区：标题 + 描述 + 角色/年份/平台 + tags

### 使用方法

```typescript
// src/data.ts
{
  id: 'p-new',
  title: 'Your Project',
  category: 'B-Side',
  platform: 'Web',
  year: '2025',
  role: 'UI/UX Designer',
  shortDescription: '项目一句话介绍',
  coverImage: '/projects/your-project/cover.png',
  tags: ['AI Design', 'Voice UX'],
  slides: [
    '/projects/your-project/01-cover.png',
    '/projects/your-project/02-overview.png',
    '/projects/your-project/03-research.png',
    '/projects/your-project/04-strategy.png',
    '/projects/your-project/05-design.png',
    '/projects/your-project/06-detail.png',
    '/projects/your-project/07-result.png',
  ],
  acts: { ... }  // 卡片预览用的简要信息
}
```

### 准备素材

```bash
mkdir -p public/projects/your-project
```

导出规则：
- 从 Figma / PDF / PPT 按页导出为 PNG
- 建议宽度 1920px 或 2x（保证高清）
- 按顺序命名：`01-xxx.png`, `02-xxx.png`, ...
- 放入 `public/projects/your-project/`

### 优先级

当项目同时有 `slides` 和 `caseSections` 时：
- **`slides` 优先** — 展示为幻灯片模式
- 如果需要回退到模块模式，删除 `slides` 字段即可

---

## Mode B: Modular Case Study（备选）

### 适用场景

- 只有散乱截图，没有完整作品集
- 只有 UI 界面，需要重新组织成项目叙事
- 想要交互增强（动画、响应式、annotated breakdown）

### 使用方法

不使用 `slides`，而是用 `caseSections` 数组组装模块：

```typescript
{
  id: 'p-new',
  title: 'Your Project',
  // ... 基本字段
  caseSections: [
    { type: 'hero', ... },
    { type: 'stats', ... },
    { type: 'editorial-board', ... },
    { type: 'annotated-mockup', ... },
    { type: 'outcomes', ... },
  ]
}
```

### 可用 section 类型

| 类型 | 用途 |
|------|------|
| `hero` | 项目封面（全屏背景 + 标题） |
| `stats` | 数据概览 |
| `personas` | 用户画像 |
| `flow` | 流程步骤 |
| `cards` | 痛点 / 特性卡片 |
| `principles` | 设计原则 |
| `two-column` | 双栏策略对比 |
| `voice-states` | 状态系统 |
| `editorial-board` | 完整作品集板块（full-bleed / contained / immersive） |
| `annotated-mockup` | 引线标注拆解图（x/y 精确锚点） |
| `mockup` | 全宽 UI 截图 |
| `text` | 富文本段落 |
| `interaction-path` | 交互路径 |
| `state-flow` | 状态转换表 |
| `validation` | 用户引述 |
| `design-rationale` | 设计决策说明 |
| `outcomes` | 项目成果 |

详细字段定义见 `src/types.ts`。

---

## 混合策略

一个项目可以混合使用两种模式吗？

- **不可以同时混合。** `slides` 优先，有就用 slide showcase。
- 但在 Mode B 中，可以混合使用 `editorial-board`（保留完整板块）和其他模块。
- 如果你大部分页面是完整设计，只有 1-2 页想加标注拆解 → 用 Mode A，那几张想拆解的页面可以单独做一个 `annotated-mockup` 风格的 slide。

---

## 给 Coding Agent 的指令

### 当用户提供完整作品集材料时

```
我提供了项目 [名称] 的完整作品集（PDF / Figma / PPT）。

请按 Mode A 处理：
1. 按页导出为高清 PNG（宽度 1920px）
2. 放入 public/projects/[project-name]/
3. 在 data.ts 中用 slides 数组按顺序引用
4. 不要拆解、不要重组、不要改写
5. 网站只需要高质量呈现这些页面
```

### 当用户只有零散素材时

```
我只有这个项目的一些截图和文字描述，没有完整作品集。

请按 Mode B 处理：
1. 分析素材，决定用哪些 section 类型
2. 生成 caseSections 结构（EN + ZH）
3. 按阅读节奏组装，注意呼吸感
```

---

## 双语注意事项

- `PROJECTS_EN` 和 `PROJECTS_ZH` 中的项目 `id` 必须一致
- `slides` 数组两边共用（图片路径相同）
- `title`、`shortDescription` 等文字各写各的
- Mode B 的 `caseSections` 长度和 type 顺序两边一致

---

## 项目页结构

### Mode A 的页面结构

```
┌─────────────────────┐
│ 顶部信息区           │  标题 + 描述 + Role/Year + Tags + 页数
├─────────────────────┤
│ Slide 1             │  全宽原样展示
├─────────────────────┤
│ Slide 2             │  纵向无缝连接
├─────────────────────┤
│ Slide 3             │
├─────────────────────┤
│ ...                 │  Lazy load
├─────────────────────┤
│ Slide N             │
└─────────────────────┘
```

### Mode B 的页面结构

```
┌─────────────────────┐
│ hero section        │
├─────────────────────┤
│ stats / personas    │
├─────────────────────┤
│ editorial-board     │
├─────────────────────┤
│ annotated-mockup    │
├─────────────────────┤
│ outcomes            │
└─────────────────────┘
```

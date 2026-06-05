import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { assetUrl } from '../utils/assets';

type Copy = {
  en: string;
  zh: string;
};

type ThemeId = 'infinity' | 'xl' | 'drag';

type Callout = {
  x: number;
  y: number;
  label: Copy;
  detail: Copy;
};

type EvidencePoint = {
  id: string;
  title: Copy;
  sequenceLabel: Copy;
  asset: string;
  alt: Copy;
  userProblem: Copy;
  designDecision: Copy;
  whyItWorks: Copy;
  userBenefit: Copy;
  caption: Copy;
  callouts: Callout[];
};

type LiveDemo = {
  title: Copy;
  subtitle: Copy;
  connection: Copy;
  url: string;
  fallbackImage: string;
  guideTitle: Copy;
  guideSteps: Copy[];
};

type NuwaProject = {
  id: ThemeId;
  label: Copy;
  title: Copy;
  theme: Copy;
  coreQuestion: Copy;
  accent: string;
  secondaryAccent: string;
  heroImage: string;
  sequence: Copy[];
  evidence: EvidencePoint[];
  liveDemo: LiveDemo;
  designValue: Copy;
};

const c = (copy: Copy, isZh: boolean) => (isZh ? copy.zh : copy.en);

const nuwaProjects: NuwaProject[] = [
  {
    id: 'infinity',
    label: { en: 'Project 01 / NUWA-Infinity', zh: 'Project 01 / NUWA-Infinity' },
    title: {
      en: 'Turning outpainting into “continue beyond the image”',
      zh: '把 outpainting 变成“继续向画面外探索”'
    },
    theme: { en: 'Spatial exploration', zh: '空间探索' },
    coreQuestion: {
      en: 'How can users understand that AI can keep generating content beyond an existing image boundary?',
      zh: '用户如何理解 AI 可以继续生成画面边界之外的内容？'
    },
    accent: '#8FB7FF',
    secondaryAccent: '#66E4FF',
    heroImage: '/projects/nuwa-series/evidence/infinity-05-preview.png',
    sequence: [
      { en: 'Landing', zh: 'Landing' },
      { en: 'Prompt / Gallery', zh: 'Prompt / Gallery' },
      { en: 'Current image', zh: '当前图像' },
      { en: 'Boundary', zh: '扩展边界' },
      { en: 'Preview', zh: '预览对比' }
    ],
    evidence: [
      {
        id: 'infinity-landing',
        title: { en: '01-1 / Landing: make the demo feel enterable first', zh: '01-1 / Landing：先建立舞台感，而不是马上塞满说明' },
        sequenceLabel: { en: 'Landing / Enter', zh: 'Landing / Enter' },
        asset: '/projects/nuwa-series/evidence/infinity-01-landing.png',
        alt: { en: 'NUWA-Infinity landing screen with loading complete and Enter action.', zh: 'NUWA-Infinity landing 页面，显示加载完成和 Enter 入口。' },
        userProblem: {
          en: 'A first-time visitor may not know whether this is a paper page or a system they can operate.',
          zh: '第一次进入早期 AI demo 时，用户不知道这是论文展示，还是一个可以操作的系统。'
        },
        designDecision: {
          en: 'I used a staged landing moment with project identity, a short capability line, and a clear Enter action.',
          zh: '我用舞台式入口呈现项目身份、简短能力描述和明确 Enter 动作。'
        },
        whyItWorks: {
          en: 'The first click becomes a transition from reading into trying, which lowers the pressure of starting.',
          zh: '这个转场把用户从“阅读研究项目”带到“我可以尝试”，降低第一次点击压力。'
        },
        userBenefit: {
          en: 'Users know the demo is ready and that they have a concrete first action.',
          zh: '用户知道页面已经准备好，也知道第一步该点哪里。'
        },
        caption: {
          en: 'What to notice: the page defines NUWA-Infinity as an experience users can enter, not only a research description.',
          zh: '看点：我没有让用户一开始面对模型术语，而是先把网页定义成“可以体验的 demo”。'
        },
        callouts: [
          { x: 28, y: 15, label: { en: 'Project identity', zh: 'Project identity' }, detail: { en: 'Microsoft / NUWA appears before the interaction.', zh: '先让用户知道正在进入 NUWA 项目。' } },
          { x: 50, y: 57, label: { en: 'Ready state', zh: 'Ready 状态' }, detail: { en: 'The page shows the demo is loaded.', zh: '加载完成后再引导用户进入。' } },
          { x: 50, y: 77, label: { en: 'Enter action', zh: 'Enter 动作' }, detail: { en: 'A single first action moves users into the demo.', zh: '把阅读状态带入操作状态。' } }
        ]
      },
      {
        id: 'infinity-prompt-gallery',
        title: { en: '01-2 / Prompt + Gallery: give users two starting points', zh: '01-2 / Prompt + Gallery：给用户两个起点' },
        sequenceLabel: { en: 'Prompt / Gallery', zh: 'Prompt / Gallery' },
        asset: '/projects/nuwa-series/evidence/infinity-02-prompt-gallery.png',
        alt: { en: 'NUWA-Infinity prompt and generated result screen.', zh: 'NUWA-Infinity prompt 和生成结果页面。' },
        userProblem: {
          en: 'A blank prompt can make users freeze; a gallery alone makes them passive viewers.',
          zh: '只给空 prompt，用户不知道写什么；只给 gallery，用户又像只是在看案例。'
        },
        designDecision: {
          en: 'Prompt supports active creation; Gallery gives a low-risk example path. Both lead into generation.',
          zh: 'Prompt 给主动创作入口，Gallery 给低风险示例入口，两者都通向后续生成流程。'
        },
        whyItWorks: {
          en: 'It supports two first-use mindsets: “I have an idea” and “show me what this can do.”',
          zh: '它同时照顾两种第一次尝试状态：有人想创作，有人只是想先看系统能做什么。'
        },
        userBenefit: {
          en: 'Users can start without already knowing how to write a good prompt.',
          zh: '用户不需要先会写 prompt，也可以立即开始。'
        },
        caption: {
          en: 'What to notice: Prompt gives authorship; Gallery gives a safe start.',
          zh: '看点：Prompt 给用户创作感，Gallery 给用户安全起点。'
        },
        callouts: [
          { x: 41, y: 88, label: { en: 'Prompt choices', zh: 'Prompt 选择' }, detail: { en: 'Users begin with natural phrases.', zh: '用户用熟悉短语开始。' } },
          { x: 51, y: 45, label: { en: 'Generated image', zh: '生成图像' }, detail: { en: 'Input and output stay connected.', zh: '输入和结果保持在同一屏。' } },
          { x: 95, y: 62, label: { en: 'Result options', zh: '结果缩略图' }, detail: { en: 'Multiple options invite comparison.', zh: '多个结果支持比较。' } }
        ]
      },
      {
        id: 'infinity-current-image',
        title: { en: '01-3 / Image result: show the current world before extending it', zh: '01-3 / Image result：让用户先看到“当前世界”' },
        sequenceLabel: { en: 'Current image', zh: '当前图像' },
        asset: '/projects/nuwa-series/evidence/infinity-03-current-image.png',
        alt: { en: 'NUWA-Infinity current generated image on the original page.', zh: 'NUWA-Infinity 原网页中的当前生成图像。' },
        userProblem: {
          en: 'Outpainting depends on context. If users do not understand the current image, the outer expansion has no meaning.',
          zh: 'Outpainting 依赖上下文。用户如果没理解当前图像，就无法理解“向外继续生成”的价值。'
        },
        designDecision: {
          en: 'I kept the current image as the visual center before guiding attention to the boundary.',
          zh: '我先把当前图像作为视觉中心，再引导用户关注边界之外。'
        },
        whyItWorks: {
          en: 'Users need to know what exists inside the frame before judging what AI adds outside it.',
          zh: '用户需要先看清边界之内，才能判断 AI 在边界之外新增了什么。'
        },
        userBenefit: {
          en: 'The outpainting result becomes a continuation of a known scene, not a disconnected image.',
          zh: '外扩结果变成对已知画面的延续，而不是一张脱节的新图。'
        },
        caption: {
          en: 'What to notice: the interface establishes the visual context before asking users to look beyond it.',
          zh: '看点：在理解“边界之外”之前，界面先让用户看清“边界之内”。'
        },
        callouts: [
          { x: 42, y: 45, label: { en: 'Current image', zh: '当前图像' }, detail: { en: 'The scene anchors the user’s understanding.', zh: '先建立视觉上下文。' } },
          { x: 63, y: 48, label: { en: 'Image boundary', zh: '图像边界' }, detail: { en: 'The edge becomes the later reference point.', zh: '后续扩展要以边界为参照。' } },
          { x: 70, y: 83, label: { en: 'Gallery strip', zh: 'Gallery strip' }, detail: { en: 'Users can switch generated options.', zh: '用户可以切换不同生成结果。' } }
        ]
      },
      {
        id: 'infinity-boundary',
        title: { en: '01-4 / Outpainting: turn a technical term into a spatial action', zh: '01-4 / Outpainting：把技术术语变成空间动作' },
        sequenceLabel: { en: 'Boundary', zh: '扩展边界' },
        asset: '/projects/nuwa-series/evidence/infinity-04-boundary.png',
        alt: { en: 'NUWA-Infinity image outpainting boundary screen.', zh: 'NUWA-Infinity 图像外扩边界页面。' },
        userProblem: {
          en: '“Outpainting” is a model term; users understand expanding a canvas and looking outside the edge.',
          zh: 'Outpainting 是技术词，但用户熟悉的是扩展画布、看看边界之外有什么。'
        },
        designDecision: {
          en: 'I made the image boundary the interaction focus, with a visible edge and an action that points beyond it.',
          zh: '我把图像边界设计成操作焦点，让用户看到边缘，并通过动作进入边界外。'
        },
        whyItWorks: {
          en: 'Canvas expansion is familiar from maps, editors, cropping tools, and design software.',
          zh: '空间扩展来自地图、编辑器、裁切和设计工具，是用户熟悉的动作。'
        },
        userBenefit: {
          en: 'Users can understand the model capability without learning the model vocabulary first.',
          zh: '用户不需要先懂模型术语，也能理解 AI 正在根据上下文补全未知区域。'
        },
        caption: {
          en: 'What to notice: outpainting becomes a familiar action: continue exploring beyond the frame.',
          zh: '看点：我没有要求用户理解 outpainting，而是把它转成“继续向画面外探索”。'
        },
        callouts: [
          { x: 63, y: 46, label: { en: 'Original frame', zh: '原始画面' }, detail: { en: 'The image provides the context.', zh: '已有画面提供上下文。' } },
          { x: 88, y: 34, label: { en: 'Expansion edge', zh: '扩展边界' }, detail: { en: 'The edge hints where AI can continue.', zh: '边缘提示 AI 可继续生成。' } },
          { x: 94, y: 63, label: { en: 'Try action', zh: 'Click me' }, detail: { en: 'The model term becomes an action.', zh: '把概念变成直接动作。' } }
        ]
      },
      {
        id: 'infinity-preview',
        title: { en: '01-5 / Preview + compare: make uncertain AI results judgeable', zh: '01-5 / Preview + compare：让不确定的 AI 结果变成可判断的选择' },
        sequenceLabel: { en: 'Preview', zh: '预览对比' },
        asset: '/projects/nuwa-series/evidence/infinity-05-preview.png',
        alt: { en: 'NUWA-Infinity generated continuation and result preview strip.', zh: 'NUWA-Infinity 生成延展结果和候选预览条。' },
        userProblem: {
          en: 'If users only wait for one final output, the AI feels like a black box.',
          zh: '如果用户只能等待一个最终结果，会觉得 AI 是黑箱，自己失去控制。'
        },
        designDecision: {
          en: 'I treated the result screen as a review moment: preview, compare options, then continue exploring.',
          zh: '我把结果页设计成判断环节：先预览、再比较候选结果，然后继续探索。'
        },
        whyItWorks: {
          en: 'Control in generative AI often comes from seeing, comparing, choosing, and continuing.',
          zh: '生成式 AI 的控制感不一定来自完全预测，而是来自看、比较、选择和继续。'
        },
        userBenefit: {
          en: 'Users can decide whether the continuation matches the scene before moving on.',
          zh: '用户可以判断延展内容是否符合预期，再决定是否继续。'
        },
        caption: {
          en: 'What to notice: preview and comparison turn AI uncertainty into an exploration path.',
          zh: '看点：Preview 和对比让用户重新获得判断权，AI 不确定性变成可继续探索的路径。'
        },
        callouts: [
          { x: 55, y: 45, label: { en: 'Generated continuation', zh: '生成延展结果' }, detail: { en: 'Large enough to inspect.', zh: '结果足够大，便于检查。' } },
          { x: 45, y: 78, label: { en: 'Preview point', zh: '预览 / 对比点' }, detail: { en: 'Users can judge what changed.', zh: '用户能判断哪里发生变化。' } },
          { x: 64, y: 86, label: { en: 'Candidate strip', zh: '候选结果条' }, detail: { en: 'Multiple outputs keep the path open.', zh: '多个结果支持继续比较。' } }
        ]
      }
    ],
    liveDemo: {
      title: { en: 'Try the original NUWA-Infinity demo', zh: 'Try the original NUWA-Infinity demo' },
      subtitle: { en: 'Directly experience the web interaction I designed', zh: '直接体验我当时设计的网页交互' },
      connection: {
        en: 'Now try the same path: Prompt / Gallery -> Image -> Boundary -> Outpainting -> Preview.',
        zh: '现在可以走同一条路径：Prompt / Gallery → 当前图像 → 边界 → Outpainting → 预览。'
      },
      url: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
      fallbackImage: '/projects/nuwa-series/evidence/infinity-01-landing.png',
      guideTitle: { en: 'Try this flow', zh: '你可以这样体验' },
      guideSteps: [
        { en: 'Click Enter to enter the demo', zh: '点击 Enter 进入 demo' },
        { en: 'Start from Prompt or Gallery', zh: '从 Prompt 或 Gallery 选择起点' },
        { en: 'Look for the image boundary', zh: '找到图像边界和 outpainting 区域' },
        { en: 'Compare the generated continuation', zh: '对比生成后的延展结果' }
      ]
    },
    designValue: {
      en: 'NUWA-Infinity shows how I turned infinite visual synthesis into a concrete spatial path: choose a start, understand the current image, expand the boundary, and compare the continuation.',
      zh: 'NUWA-Infinity 体现的是我如何把 infinite visual synthesis 转成具体空间路径：选择起点、理解当前图像、扩展边界、比较延展结果。'
    }
  },
  {
    id: 'xl',
    label: { en: 'Project 02 / NUWA XL', zh: 'Project 02 / NUWA XL' },
    title: {
      en: 'Explaining long video generation as a keyframe-to-timeline process',
      zh: '把长视频生成讲成“从关键帧到时间线”的过程'
    },
    theme: { en: 'Temporal structure', zh: '时间结构' },
    coreQuestion: {
      en: 'How can users understand that a long video is generated across time, not as a single final result?',
      zh: '用户如何理解一个长视频不是单次生成结果，而是跨时间组织出来的生成过程？'
    },
    accent: '#F6C65B',
    secondaryAccent: '#9C7BFF',
    heroImage: '/projects/nuwa-series/evidence/xl-01-intro.png',
    sequence: [
      { en: 'Intro', zh: '项目介绍' },
      { en: 'Sparse keyframes', zh: '稀疏关键帧' },
      { en: 'Coarse-to-fine', zh: '先粗后细' },
      { en: 'Timeline', zh: '时间线' },
      { en: 'Preview', zh: '视频预览' }
    ],
    evidence: [
      {
        id: 'xl-intro',
        title: { en: '02-1 / First impression: explain why long video is different', zh: '02-1 / First impression：先说明长视频生成和普通生成有什么不同' },
        sequenceLabel: { en: 'Intro', zh: '项目介绍' },
        asset: '/projects/nuwa-series/evidence/xl-01-intro.png',
        alt: { en: 'NUWA XL original demo intro screen.', zh: 'NUWA XL 原始 demo 介绍页面。' },
        userProblem: {
          en: 'A final video alone does not show why NUWA XL matters. The hard part lives in time.',
          zh: '如果只看到最终视频，用户看不出 NUWA XL 的意义。长视频生成的难点存在于时间里。'
        },
        designDecision: {
          en: 'I framed the page around long video and coarse-to-fine generation before the final output.',
          zh: '我把介绍重点放在长视频和 coarse-to-fine 过程，而不是只展示最终结果。'
        },
        whyItWorks: {
          en: 'It tells users to look for temporal structure, not only image quality.',
          zh: '它提醒用户关注时间结构，而不是只看画面是否好看。'
        },
        userBenefit: {
          en: 'Users understand that the demo is about generating across duration, rhythm, and continuity.',
          zh: '用户能理解这个 demo 关注的是时长、节奏和连续性。'
        },
        caption: {
          en: 'What to notice: NUWA XL starts by framing the task as long video generation.',
          zh: '看点：NUWA XL 的核心不是展示一个视频，而是先说明长视频如何被组织出来。'
        },
        callouts: [
          { x: 21, y: 8, label: { en: 'NUWA XL route', zh: 'NUWA XL 路由' }, detail: { en: 'The project is a separate demo path.', zh: '这是独立的 demo 路径。' } },
          { x: 33, y: 50, label: { en: 'Long video example', zh: '长视频示例' }, detail: { en: 'A video frame establishes the output target.', zh: '视频画面先建立输出目标。' } },
          { x: 77, y: 78, label: { en: 'Coarse-to-fine line', zh: 'Coarse-to-fine 描述' }, detail: { en: 'The page points users to the generation process.', zh: '页面引导用户关注生成过程。' } }
        ]
      },
      {
        id: 'xl-sparse',
        title: { en: '02-2 / Sparse keyframes: give users a story skeleton first', zh: '02-2 / Sparse keyframes：先给用户一个故事骨架' },
        sequenceLabel: { en: 'Sparse keyframes', zh: '稀疏关键帧' },
        asset: '/projects/nuwa-series/evidence/xl-02-sparse-keyframes.png',
        alt: { en: 'NUWA XL frame showing 16 generated frames.', zh: 'NUWA XL GIF 截帧，显示 16 Frames 阶段。' },
        userProblem: {
          en: 'A long video is too much to understand at once if every frame appears immediately.',
          zh: '长视频很长，如果一开始展示完整帧序列，用户会信息过载。'
        },
        designDecision: {
          en: 'I used sparse keyframes as the first readable layer, like storyboard beats.',
          zh: '我用稀疏关键帧作为第一层理解结构，像 storyboard 的主要节点。'
        },
        whyItWorks: {
          en: 'Animation and editing already use keyframes to summarize change over time.',
          zh: '动画和剪辑都用关键帧概括时间变化，这是用户熟悉的结构。'
        },
        userBenefit: {
          en: 'Users can scan the story before watching or interpreting thousands of frames.',
          zh: '用户先抓住主要节点，再理解完整视频。'
        },
        caption: {
          en: 'What to notice: 16 frames make the long video readable before it becomes dense.',
          zh: '看点：关键帧让长视频先变成可读的故事骨架，而不是无法扫描的结果。'
        },
        callouts: [
          { x: 8, y: 55, label: { en: '16 Frames state', zh: '16 Frames 阶段' }, detail: { en: 'The timeline shows the first sparse layer.', zh: '左侧进度展示第一层稀疏帧。' } },
          { x: 47, y: 20, label: { en: 'Keyframe sequence', zh: '关键帧序列' }, detail: { en: 'Major moments become scannable.', zh: '主要节点变得可扫视。' } },
          { x: 75, y: 74, label: { en: 'Missing time', zh: '待补时间空隙' }, detail: { en: 'The gaps explain what the model still needs to fill.', zh: '空隙说明模型接下来要补齐什么。' } }
        ]
      },
      {
        id: 'xl-coarse',
        title: { en: '02-3 / Coarse-to-fine: show “build the structure, then fill the gaps”', zh: '02-3 / Coarse-to-fine：把生成过程拆成“先搭骨架，再补细节”' },
        sequenceLabel: { en: 'Coarse-to-fine', zh: '先粗后细' },
        asset: '/projects/nuwa-series/evidence/xl-03-coarse-to-fine.png',
        alt: { en: 'Official NUWA XL coarse-to-fine diagram.', zh: 'NUWA XL 官方 coarse-to-fine 示意图。' },
        userProblem: {
          en: '“Coarse-to-fine” is a technical phrase unless the page shows what becomes coarse and what becomes fine.',
          zh: 'Coarse-to-fine 是技术词，如果界面不拆开，用户不知道哪里是粗、哪里是细。'
        },
        designDecision: {
          en: 'I used a two-level structure: global keyframes above, local frame completion below.',
          zh: '我用两层结构解释：上层是全局关键帧，下层是局部补齐。'
        },
        whyItWorks: {
          en: 'The visual hierarchy maps the model process to a familiar “outline then detail” reading pattern.',
          zh: '这个视觉层级把模型过程转成用户熟悉的“先大纲、再细节”。'
        },
        userBenefit: {
          en: 'Users can understand the process without knowing diffusion over diffusion.',
          zh: '用户不用懂 diffusion over diffusion，也能看懂生成逻辑。'
        },
        caption: {
          en: 'What to notice: the process becomes a visible hierarchy: global structure, local completion, continuity.',
          zh: '看点：我把 coarse-to-fine 从论文概念转成界面层级：上层看结构，下层看补齐。'
        },
        callouts: [
          { x: 40, y: 18, label: { en: 'Global structure', zh: '全局故事骨架' }, detail: { en: 'Sparse frames organize the whole duration.', zh: '稀疏帧先组织整体时长。' } },
          { x: 45, y: 52, label: { en: 'Local completion', zh: '局部补齐' }, detail: { en: 'Intermediate frames fill nearby gaps.', zh: '中间帧补齐局部空隙。' } },
          { x: 62, y: 78, label: { en: 'Continuity', zh: '连续性' }, detail: { en: 'Dense frames make motion readable.', zh: '密集帧让运动连续。' } }
        ]
      },
      {
        id: 'xl-timeline',
        title: { en: '02-4 / Timeline: make long duration scannable', zh: '02-4 / Timeline：让长视频可以被扫描' },
        sequenceLabel: { en: 'Timeline', zh: '时间线' },
        asset: '/projects/nuwa-series/evidence/xl-04-timeline.png',
        alt: { en: 'NUWA XL frame showing 3376 generated frames.', zh: 'NUWA XL GIF 截帧，显示 3376 Frames 阶段。' },
        userProblem: {
          en: 'A video player hides length inside playback. Users click play but do not understand scale.',
          zh: '播放器会把长度藏在播放里，用户只会点播放，却不理解“长”的尺度。'
        },
        designDecision: {
          en: 'I used the timeline and dense filmstrip to make frame growth and duration visible.',
          zh: '我用时间线和密集 filmstrip 让帧数量增长和视频跨度可见。'
        },
        whyItWorks: {
          en: 'Timeline is a familiar model from video editors and media players.',
          zh: 'Timeline 来自视频编辑器和播放器，是用户熟悉的时间模型。'
        },
        userBenefit: {
          en: 'Users can scan duration, frame density, and generated coverage before watching the final output.',
          zh: '用户能先扫视时长、帧密度和生成覆盖范围，再看最终视频。'
        },
        caption: {
          en: 'What to notice: 3376 frames make “long video” visible as a time structure.',
          zh: '看点：时间线让“长视频生成”从技术指标变成可浏览的时间结构。'
        },
        callouts: [
          { x: 8, y: 68, label: { en: 'Time axis', zh: '时间轴' }, detail: { en: 'Progress makes duration visible.', zh: '进度线让时长可见。' } },
          { x: 52, y: 36, label: { en: 'Frame density', zh: '帧密度' }, detail: { en: 'The grid shows generation coverage.', zh: '帧网格展示生成覆盖范围。' } },
          { x: 84, y: 82, label: { en: 'Scan area', zh: '可扫描区域' }, detail: { en: 'Users can read the video before playback.', zh: '用户能在播放前先读懂结构。' } }
        ]
      },
      {
        id: 'xl-preview',
        title: { en: '02-5 / Final preview: connect the process back to output', zh: '02-5 / Final preview：把过程重新连接到最终视频' },
        sequenceLabel: { en: 'Final video', zh: '最终预览' },
        asset: '/projects/nuwa-series/evidence/xl-05-final-preview.png',
        alt: { en: 'NUWA XL output video preview frame.', zh: 'NUWA XL 输出视频预览截帧。' },
        userProblem: {
          en: 'After seeing frames and timelines, users still need to connect the structure to the video result.',
          zh: '看完帧和时间线之后，用户还需要把结构和最终视频结果连接起来。'
        },
        designDecision: {
          en: 'I kept the output preview as the final step after the timeline logic.',
          zh: '我把输出预览放在 timeline 逻辑之后，让用户先懂过程，再看结果。'
        },
        whyItWorks: {
          en: 'The final video becomes the payoff of the previous keyframe and timeline steps.',
          zh: '最终视频成为前面关键帧和时间线步骤的结果，而不是孤立展示。'
        },
        userBenefit: {
          en: 'Users can explain why the video is impressive, not only that it looks interesting.',
          zh: '用户能说清视频为什么强，而不只是觉得画面有趣。'
        },
        caption: {
          en: 'What to notice: the final preview is meaningful because the page has already shown how time was built.',
          zh: '看点：最终预览之所以有意义，是因为前面已经让用户看到时间如何被组织。'
        },
        callouts: [
          { x: 8, y: 84, label: { en: 'Output Video state', zh: 'Output Video 状态' }, detail: { en: 'The process reaches the final step.', zh: '流程进入最终输出。' } },
          { x: 69, y: 49, label: { en: 'Video preview', zh: '视频预览' }, detail: { en: 'The generated result becomes watchable.', zh: '生成结果变成可观看视频。' } },
          { x: 73, y: 91, label: { en: 'Prompt connection', zh: 'Prompt 连接' }, detail: { en: 'The caption ties output to the script prompt.', zh: '字幕把输出和脚本提示连接起来。' } }
        ]
      }
    ],
    liveDemo: {
      title: { en: 'Explore NUWA XL through timeline', zh: 'Explore NUWA XL through timeline' },
      subtitle: { en: 'Understand long video generation through keyframes and timeline', zh: '通过关键帧和时间线理解长视频生成' },
      connection: {
        en: 'Now follow the same logic: Keyframes -> Coarse-to-fine fill -> Timeline -> Long video preview.',
        zh: '现在可以沿着同一逻辑看：关键帧 → 先粗后细补齐 → 时间线 → 长视频预览。'
      },
      url: 'https://nuwa-infinity.microsoft.com/#/NUWAXL',
      fallbackImage: '/projects/nuwa-series/evidence/xl-01-intro.png',
      guideTitle: { en: 'Look for', zh: '你可以这样看' },
      guideSteps: [
        { en: 'Where the page introduces long video generation', zh: '页面如何先介绍长视频生成' },
        { en: 'How sparse keyframes appear first', zh: '稀疏关键帧如何先出现' },
        { en: 'How intermediate frames fill the gaps', zh: '中间帧如何补齐时间空隙' },
        { en: 'How timeline makes video length scannable', zh: '时间线如何让长视频长度可浏览' }
      ]
    },
    designValue: {
      en: 'NUWA XL shows how I made time visible. Keyframes, filmstrip, and timeline turn long video generation into a readable process: structure first, gaps filled next, preview last.',
      zh: 'NUWA XL 的设计重点不是让页面更复杂，而是让用户看懂“时间”这个能力维度：先有故事骨架，再补齐中间帧，最后形成可扫描的长时间结果。'
    }
  },
  {
    id: 'drag',
    label: { en: 'Project 03 / DragNUWA', zh: 'Project 03 / DragNUWA' },
    title: {
      en: 'Moving video control from “describe the result” to “draw the motion”',
      zh: '把视频控制从“描述结果”推进到“画出运动”'
    },
    theme: { en: 'Direct motion control', zh: '直接运动控制' },
    coreQuestion: {
      en: 'How can users control direction and rhythm in generated video without relying on prompt text alone?',
      zh: '用户如何不只用文字描述结果，而是直接控制视频里的运动方向和节奏？'
    },
    accent: '#FF665C',
    secondaryAccent: '#78F0A3',
    heroImage: '/projects/nuwa-series/evidence/drag-01-intro.png',
    sequence: [
      { en: 'Intro', zh: '项目介绍' },
      { en: 'Text', zh: '文字意图' },
      { en: 'Image', zh: '图像上下文' },
      { en: 'Trajectory', zh: '轨迹控制' },
      { en: 'Preview', zh: '结果预览' }
    ],
    evidence: [
      {
        id: 'drag-intro',
        title: { en: '03-1 / First impression: show why prompt alone is not enough', zh: '03-1 / First impression：说明 prompt 为什么不够' },
        sequenceLabel: { en: 'Intro', zh: '项目介绍' },
        asset: '/projects/nuwa-series/evidence/drag-01-intro.png',
        alt: { en: 'DragNUWA original demo gallery screen.', zh: 'DragNUWA 原始 demo gallery 页面。' },
        userProblem: {
          en: 'Prompt can describe a scene, but direction, path, speed, and rhythm are hard to control in words.',
          zh: 'Prompt 可以描述场景，但方向、轨迹、速度和节奏很难只靠文字精确控制。'
        },
        designDecision: {
          en: 'I framed DragNUWA around direct motion control, not as another prompt-only video model.',
          zh: '我把 DragNUWA 的重点放在“直接操控运动”，而不是另一个 prompt-based video model。'
        },
        whyItWorks: {
          en: 'Drawing a path combines time and space in a familiar action.',
          zh: '画路径把时间和空间结合在一个熟悉动作里：拖拽 / 绘制路径。'
        },
        userBenefit: {
          en: 'Users see the examples as controllable motion cases, not only gallery thumbnails.',
          zh: '用户看到的是可控运动示例，而不只是生成结果缩略图。'
        },
        caption: {
          en: 'What to notice: DragNUWA introduces motion control through examples users can inspect.',
          zh: '看点：DragNUWA 的关键不是多一个输入，而是让用户用更直接的方式表达运动意图。'
        },
        callouts: [
          { x: 20, y: 8, label: { en: 'DragNUWA route', zh: 'DragNUWA 路由' }, detail: { en: 'The demo is separated from NUWA XL and Infinity.', zh: '这是独立的运动控制 demo。' } },
          { x: 46, y: 42, label: { en: 'Example grid', zh: '示例网格' }, detail: { en: 'Cases show different motion contexts.', zh: '示例展示不同运动场景。' } },
          { x: 84, y: 74, label: { en: 'Motion preview entry', zh: '运动预览入口' }, detail: { en: 'Each tile can become a controllable path case.', zh: '每个 tile 都可进入运动控制理解。' } }
        ]
      },
      {
        id: 'drag-text',
        title: { en: '03-2 / Text: define semantic intent first', zh: '03-2 / Text：先定义语义意图' },
        sequenceLabel: { en: 'Text', zh: '文字意图' },
        asset: '/projects/nuwa-series/evidence/drag-02-text.png',
        alt: { en: 'DragNUWA prompt text captions under image examples.', zh: 'DragNUWA 图像示例下方的 prompt 文案。' },
        userProblem: {
          en: 'Trajectory tells how something moves, but not what the scene, object, or style should be.',
          zh: '轨迹只能说明怎么动，不能说明生成什么、场景是什么、风格是什么。'
        },
        designDecision: {
          en: 'I kept text as the semantic layer: it defines the scene and target before motion control.',
          zh: '我把 text 作为语义层，让用户先表达场景、对象或风格。'
        },
        whyItWorks: {
          en: 'Text answers “what is this?” so trajectory does not need to carry every meaning.',
          zh: 'Text 解决“是什么”的问题，不让轨迹承担所有语义。'
        },
        userBenefit: {
          en: 'Users can separate semantic intent from motion control.',
          zh: '用户能把语义意图和运动控制分开理解。'
        },
        caption: {
          en: 'What to notice: text carries semantic intent; it is not asked to control all motion details.',
          zh: '看点：文字负责语义，不负责承担所有运动控制。'
        },
        callouts: [
          { x: 37, y: 68, label: { en: 'Prompt caption', zh: 'Prompt 文案' }, detail: { en: 'Text describes the scene goal.', zh: '文字描述场景和目标。' } },
          { x: 27, y: 30, label: { en: 'Scene target', zh: '场景目标' }, detail: { en: 'The image and text stay paired.', zh: '图像和文字保持配对。' } },
          { x: 75, y: 73, label: { en: 'Semantic layer', zh: '语义层' }, detail: { en: 'Words define what should be generated.', zh: '文字定义要生成什么。' } }
        ]
      },
      {
        id: 'drag-image',
        title: { en: '03-3 / Image: anchor motion in a concrete scene', zh: '03-3 / Image：用图像固定空间上下文' },
        sequenceLabel: { en: 'Image', zh: '图像上下文' },
        asset: '/projects/nuwa-series/evidence/drag-03-image.png',
        alt: { en: 'DragNUWA source image examples.', zh: 'DragNUWA 源图像示例。' },
        userProblem: {
          en: 'With only text and path, users still do not know where the motion happens.',
          zh: '如果只有文字和轨迹，用户仍然不知道运动发生在哪个空间里。'
        },
        designDecision: {
          en: 'I treated the image as the spatial anchor: object, background, and composition are fixed before drawing motion.',
          zh: '我把 image 作为空间锚点，先固定对象、背景和构图，再表达运动。'
        },
        whyItWorks: {
          en: 'The path becomes meaningful because it sits on a visible scene.',
          zh: '路径之所以有意义，是因为它发生在一个具体画面里。'
        },
        userBenefit: {
          en: 'Users can judge whether a trajectory fits the object and environment.',
          zh: '用户能判断轨迹是否适合画面里的对象和环境。'
        },
        caption: {
          en: 'What to notice: image gives trajectory a spatial reference.',
          zh: '看点：图像让轨迹有了空间参照，用户知道运动发生在什么场景里。'
        },
        callouts: [
          { x: 27, y: 28, label: { en: 'Source image', zh: 'Source image' }, detail: { en: 'The scene is visible before motion control.', zh: '先看到运动发生的场景。' } },
          { x: 63, y: 30, label: { en: 'Object / background', zh: '对象 / 背景' }, detail: { en: 'Context constrains the motion idea.', zh: '上下文约束运动意图。' } },
          { x: 54, y: 78, label: { en: 'Spatial context', zh: '空间参照' }, detail: { en: 'The path will be read against this image.', zh: '轨迹会基于这张图被理解。' } }
        ]
      },
      {
        id: 'drag-trajectory',
        title: { en: '03-4 / Trajectory: let users draw motion directly', zh: '03-4 / Trajectory：用轨迹表达运动' },
        sequenceLabel: { en: 'Trajectory', zh: '轨迹控制' },
        asset: '/projects/nuwa-series/evidence/drag-04-trajectory.png',
        alt: { en: 'DragNUWA trajectory examples with red path overlays.', zh: 'DragNUWA 带红色轨迹线的运动控制示例。' },
        userProblem: {
          en: 'Motion combines space and time. Curves, direction, endpoint, and rhythm are hard to describe precisely.',
          zh: '运动由时间和空间共同构成。曲线、方向、终点和节奏很难用文字精确表达。'
        },
        designDecision: {
          en: 'I used trajectory as the direct control layer: start point, curve, and endpoint are drawn on the image.',
          zh: '我用 trajectory 作为直接控制层：用户在图像上画出起点、曲线和终点。'
        },
        whyItWorks: {
          en: 'Drawing is a lower-friction action than translating spatial motion into complex language.',
          zh: '直接画出来，比把空间运动翻译成复杂语言更自然。'
        },
        userBenefit: {
          en: 'Users can express movement before seeing the generated video.',
          zh: '用户在生成前就能表达运动意图。'
        },
        caption: {
          en: 'What to notice: trajectory turns direction, curve, and endpoint into visible control instructions.',
          zh: '看点：轨迹把 prompt 很难说清楚的方向、曲线和终点，变成用户可以直接画出的控制指令。'
        },
        callouts: [
          { x: 18, y: 41, label: { en: 'Start point', zh: 'Start point' }, detail: { en: 'The motion starts at a visible location.', zh: '运动从明确位置开始。' } },
          { x: 49, y: 50, label: { en: 'Path curve', zh: 'Path curve' }, detail: { en: 'The curve shows how motion changes.', zh: '曲线表达运动如何变化。' } },
          { x: 79, y: 58, label: { en: 'End point', zh: 'End point' }, detail: { en: 'The path gives the model a target.', zh: '终点给模型一个目标。' } }
        ]
      },
      {
        id: 'drag-output',
        title: { en: '03-5 / Output preview: connect input bundle to generated motion', zh: '03-5 / Output preview：让用户看到控制如何影响结果' },
        sequenceLabel: { en: 'Preview', zh: '结果预览' },
        asset: '/projects/nuwa-series/evidence/drag-05-output-preview.png',
        alt: { en: 'DragNUWA original demo gallery as generated motion preview entry.', zh: 'DragNUWA 原始 demo gallery，作为生成运动预览入口。' },
        userProblem: {
          en: 'If users draw a path but cannot inspect the resulting motion, control remains abstract.',
          zh: '如果用户画了轨迹，却看不到它如何影响视频结果，就无法建立控制感。'
        },
        designDecision: {
          en: 'I kept examples and previews close to the input logic so users can compare intention and result.',
          zh: '我让示例和预览靠近输入逻辑，用户可以对照意图和生成结果。'
        },
        whyItWorks: {
          en: 'AI control becomes understandable when users see how each input role affects output.',
          zh: '当用户看到每种输入如何影响输出，AI 控制才变得可解释。'
        },
        userBenefit: {
          en: 'Users can learn which combination of text, image, and trajectory produces the motion they want.',
          zh: '用户能理解 text、image、trajectory 的组合如何导向想要的运动。'
        },
        caption: {
          en: 'What to notice: preview examples make motion control inspectable after the input bundle is defined.',
          zh: '看点：输入和输出并列理解，让用户看到自己画的路径如何转化成视频运动。'
        },
        callouts: [
          { x: 18, y: 36, label: { en: 'Input bundle entry', zh: '输入组合入口' }, detail: { en: 'Each example implies text, image, and motion.', zh: '每个示例都对应输入组合。' } },
          { x: 51, y: 56, label: { en: 'Generated motion cases', zh: '生成运动案例' }, detail: { en: 'The grid shows varied motion contexts.', zh: '网格展示不同运动场景。' } },
          { x: 86, y: 74, label: { en: 'Preview / compare', zh: '预览 / 对比' }, detail: { en: 'Users compare whether output matches intent.', zh: '用户检查结果是否符合意图。' } }
        ]
      }
    ],
    liveDemo: {
      title: { en: 'Try motion control through trajectory', zh: 'Try motion control through trajectory' },
      subtitle: { en: 'Understand controllable video generation through paths', zh: '用轨迹理解可控视频生成' },
      connection: {
        en: 'Now follow the control path: Text -> Image -> Trajectory -> Generated motion.',
        zh: '现在可以沿着控制路径看：Text → Image → Trajectory → Generated motion。'
      },
      url: 'https://nuwa-infinity.microsoft.com/#/DragNUWA',
      fallbackImage: '/projects/nuwa-series/evidence/drag-01-intro.png',
      guideTitle: { en: 'Look for', zh: '你可以这样看' },
      guideSteps: [
        { en: 'How text describes intent', zh: '文字如何描述意图' },
        { en: 'How image anchors the scene', zh: '图像如何固定场景' },
        { en: 'How trajectory shows motion', zh: '轨迹如何表达运动' },
        { en: 'How generated video reflects the path', zh: '生成视频如何回应这条路径' }
      ]
    },
    designValue: {
      en: 'DragNUWA shows how I moved AI video generation from describing an outcome to directly controlling a process. Text defines meaning, Image anchors space, and Trajectory expresses motion through time.',
      zh: 'DragNUWA 的设计价值在于，它把 AI 视频生成从“描述结果”推进到“直接控制过程”。Prompt 负责语义，Image 提供空间上下文，Trajectory 表达时间中的运动。'
    }
  }
];

const themeById = (id: ThemeId) => nuwaProjects.find((project) => project.id === id)!;

const projectCardImages: Record<ThemeId, string> = {
  infinity: '/projects/nuwa-series/evidence/infinity-05-preview.png',
  xl: '/projects/nuwa-series/evidence/xl-04-timeline.png',
  drag: '/projects/nuwa-series/evidence/drag-04-trajectory.png'
};

const BrowserEvidence: React.FC<{
  asset: string;
  alt: string;
  sourceLabel: string;
  accent: string;
  callouts?: Callout[];
  isZh: boolean;
}> = ({ asset, alt, sourceLabel, accent, callouts = [], isZh }) => (
  <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0A0A0B] shadow-[0_24px_72px_rgba(0,0,0,0.32)]">
    <div className="flex min-h-11 items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2">
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
      </div>
      <div className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[11px] text-white/45">
        <span className="block truncate">{sourceLabel}</span>
      </div>
    </div>
    <div className="grid lg:grid-cols-[minmax(0,1fr)_270px]">
      <div className="relative flex min-h-[280px] items-center justify-center bg-black">
        <img src={assetUrl(asset)} alt={alt} className="block max-h-[620px] w-full object-contain" />
        <div className="pointer-events-none absolute inset-0 hidden md:block">
          {callouts.slice(0, 3).map((callout, index) => (
            <span
              key={`${callout.label.en}-${index}`}
              className="absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-black/70 text-xs font-bold text-white ring-4 ring-black/25"
              style={{ left: `${callout.x}%`, top: `${callout.y}%`, boxShadow: `0 0 0 1px ${accent}99` }}
            >
              {index + 1}
            </span>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10 bg-[#101012] p-4 lg:border-l lg:border-t-0">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">
          {isZh ? '看图顺序' : 'What to look at'}
        </p>
        <div className="space-y-4">
          {callouts.slice(0, 3).map((callout, index) => (
            <div key={`${callout.label.en}-rail-${index}`} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full text-xs font-bold text-neutral-950" style={{ backgroundColor: accent }}>
                {index + 1}
              </span>
              <div>
                <p className="text-xs font-semibold text-white">{c(callout.label, isZh)}</p>
                <p className="mt-1 text-xs leading-5 text-white/54">{c(callout.detail, isZh)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const LiveDemoFrame: React.FC<{ demo: LiveDemo; accent: string; isZh: boolean }> = ({ demo, accent, isZh }) => {
  const [isCompact, setIsCompact] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => setIsCompact(query.matches);
    update();
    query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (isCompact) {
      setIsLoading(false);
      setShowFallback(true);
      return;
    }

    setIsLoading(true);
    setShowFallback(false);
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setIsLoading(false);
      setShowFallback(true);
      timer.current = null;
    }, 10000);

    return () => {
      if (timer.current) {
        window.clearTimeout(timer.current);
        timer.current = null;
      }
    };
  }, [demo.url, reloadKey, isCompact]);

  const handleLoad = () => {
    if (timer.current) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
    setIsLoading(false);
    setShowFallback(false);
  };

  return (
    <section className="bg-[#070707] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20 md:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.25fr_0.75fr] lg:items-start">
          <div className="lg:sticky lg:top-8">
            <p className="font-serif text-sm italic tracking-wide" style={{ color: accent }}>{c(demo.subtitle, isZh)}</p>
            <h3 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">{c(demo.title, isZh)}</h3>
            <p className="mt-5 text-sm leading-7 text-white/62">{c(demo.connection, isZh)}</p>
            <div className="mt-8 rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: accent }}>
                {c(demo.guideTitle, isZh)}
              </p>
              <div className="space-y-3">
                {demo.guideSteps.map((step, index) => (
                  <div key={`${step.en}-${index}`} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded-full text-xs font-bold text-neutral-950" style={{ backgroundColor: accent }}>
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-white/76">{c(step, isZh)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-white/10 bg-[#0A0A0B] shadow-[0_24px_72px_rgba(0,0,0,0.32)]">
            <div className="flex min-h-11 items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2">
              <div className="flex shrink-0 items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
              </div>
              <div className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[11px] text-white/45">
                <span className="block truncate">{demo.url}</span>
              </div>
              <a href={demo.url} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-neutral-950 transition hover:bg-neutral-200 sm:inline-flex">
                <ExternalLink size={13} />
                {isZh ? 'Open full demo' : 'Open full demo'}
              </a>
            </div>
            <div className="relative h-[520px] bg-black sm:h-[660px] lg:h-[720px]">
              {!showFallback && !isCompact && (
                <iframe
                  key={reloadKey}
                  src={demo.url}
                  title={c(demo.title, isZh)}
                  className="h-full w-full border-0"
                  loading="lazy"
                  onLoad={handleLoad}
                  allow="fullscreen; autoplay; clipboard-read; clipboard-write"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              )}
              {isLoading && !showFallback && !isCompact && (
                <div className="absolute inset-0 grid place-items-center bg-neutral-950">
                  <div className="text-center">
                    <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                    <p className="text-sm font-medium">{isZh ? '正在加载在线 demo...' : 'Loading live demo...'}</p>
                  </div>
                </div>
              )}
              {showFallback && (
                <div className="absolute inset-0 bg-neutral-950">
                  <img src={assetUrl(demo.fallbackImage)} alt="" className="h-full w-full object-cover opacity-75" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/30 to-black/16" />
                  <div className="absolute inset-x-5 bottom-5 rounded-lg border border-white/10 bg-black/62 p-5 text-white backdrop-blur-md sm:inset-x-auto sm:left-6 sm:max-w-md">
                    <p className="text-sm font-semibold">{isZh ? '原始 demo 托管在外部站点' : 'The original demo is hosted externally'}</p>
                    <p className="mt-2 text-xs leading-5 text-white/62">
                      {isZh
                        ? '如果无法在作品集内加载，可以新窗口打开，或观看录屏版 walkthrough。'
                        : 'If it does not load inside the portfolio, open it in a new tab or use the recorded walkthrough.'}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a href={demo.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200">
                        <ExternalLink size={14} />
                        Open full demo
                      </a>
                      {!isCompact && (
                        <button
                          type="button"
                          onClick={() => {
                            setReloadKey((value) => value + 1);
                            setShowFallback(false);
                            setIsLoading(true);
                          }}
                          className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                        >
                          {isZh ? '重试嵌入' : 'Retry iframe'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroSection: React.FC<{ isZh: boolean }> = ({ isZh }) => (
  <section className="relative min-h-[760px] overflow-hidden bg-[#050505] text-white">
    <img src={assetUrl('/projects/nuwa-series/evidence/infinity-05-preview.png')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.9)_0%,rgba(5,5,5,0.64)_52%,rgba(5,5,5,0.35)_100%),linear-gradient(180deg,rgba(5,5,5,0.14)_0%,rgba(5,5,5,0.95)_96%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:110px_110px]" />
    <div className="relative z-10 mx-auto grid min-h-[760px] max-w-7xl items-end gap-12 px-6 pb-16 pt-32 sm:px-8 md:px-12 lg:grid-cols-[0.58fr_0.42fr]">
      <div>
        <p className="mb-6 font-serif text-sm italic tracking-wide text-white/60">NUWA Series / Interactive Research Demo Case Study</p>
        <h1 className="max-w-4xl font-serif text-4xl leading-[1.04] text-white sm:text-6xl md:text-7xl">
          {isZh ? '为早期生成式 AI 设计可操作的研究 demo 体验' : 'Designing operable research demo experiences for early generative AI'}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-white/74 sm:text-xl">
          {isZh
            ? '从 NUWA-Infinity 到 NUWA XL，再到 DragNUWA，我设计的是陌生 AI 能力与用户熟悉操作之间的桥：从空间扩展，到时间理解，再到直接运动控制。'
            : 'From NUWA-Infinity to NUWA XL to DragNUWA, I designed the bridge between unfamiliar AI capabilities and familiar user actions: spatial expansion, temporal understanding, and direct motion control.'}
        </p>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-white/64">
          {isZh
            ? '这些项目发生在生成式 AI 交互模式还不成熟的阶段。我的工作不是把论文内容搬到网页上，而是把模型能力拆解成用户能亲自操作的路径：输入、选择、生成、扩展、预览、对比和控制。'
            : 'These projects happened before mature AI UX patterns existed. My work was not to move paper content onto a page, but to break model capabilities into paths users could operate: input, choose, generate, expand, preview, compare, and control.'}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#nuwa-series-walkthrough" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200">
            <ArrowRight size={16} />
            {isZh ? 'View interaction walkthrough' : 'View interaction walkthrough'}
          </a>
          <a href="https://nuwa-infinity.microsoft.com/#/NUWAInfinity" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-black/28 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            <ExternalLink size={16} />
            {isZh ? 'Try original demo' : 'Try original demo'}
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-5 text-xs uppercase tracking-[0.18em] text-white/45">
          <span>2022-2023</span>
          <span>Interaction Design / Web Experience Design</span>
          <span>Microsoft Research AI Demo Series</span>
        </div>
      </div>
      <div className="grid gap-4">
        {nuwaProjects.map((project) => (
          <div key={project.id} className="grid grid-cols-[130px_minmax(0,1fr)] gap-4 rounded-lg border border-white/10 bg-black/42 p-3 backdrop-blur-md">
            <div className="aspect-[4/3] overflow-hidden rounded-md bg-black">
              <img src={assetUrl(projectCardImages[project.id])} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="self-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: project.accent }}>{c(project.label, isZh)}</p>
              <p className="mt-2 text-sm leading-6 text-white/78">{c(project.coreQuestion, isZh)}</p>
              <p className="mt-2 text-xs text-white/42">{project.id === 'infinity' ? 'Make generation spatial' : project.id === 'xl' ? 'Make generation temporal' : 'Make generation directable'}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="relative z-10 border-t border-white/10 bg-black/45">
      <div className="mx-auto max-w-7xl px-6 py-5 text-sm leading-7 text-white/74 sm:px-8 md:px-12">
        {isZh
          ? '我设计的是让非技术用户亲手理解 AI 能力的路径，而不是一页被动阅读的研究介绍。'
          : 'I designed interactive paths that helped non-technical viewers understand what early generative AI models could do by trying them, not by reading about them.'}
      </div>
    </div>
  </section>
);

const WhySection: React.FC<{ isZh: boolean }> = ({ isZh }) => {
  const project = themeById('infinity');
  return (
    <section className="bg-[#070707] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 sm:py-24 md:px-12 lg:grid-cols-[0.44fr_0.56fr]">
        <div>
          <p className="font-serif text-sm italic tracking-wide" style={{ color: project.accent }}>Why this project matters</p>
          <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">
            {isZh ? '研究能力很强，但网页必须回答用户的第一问题：我该怎么操作？' : 'The research was strong, but the page had to answer the first user question: what can I do here?'}
          </h2>
          <p className="mt-6 text-sm leading-7 text-white/62">
            {isZh
              ? 'NUWA 系列面对的不是普通网页信息架构问题，而是早期 AI research demo 的理解问题。模型能力很前沿，但用户第一次打开网页时，不会天然理解 prompt、outpainting、长视频生成或 trajectory control。'
              : 'The NUWA series was not a normal website information architecture problem. It was an early AI demo comprehension problem. The model capabilities were new, and visitors did not naturally understand prompt, outpainting, long-video generation, or trajectory control.'}
          </p>
          <div className="mt-8 space-y-3">
            {[
              { en: 'Where can I start?', zh: '我可以从哪里开始？' },
              { en: 'What happens after I input or choose?', zh: '我输入或选择之后会发生什么？' },
              { en: 'Which part do I control, and which part does AI generate?', zh: '哪一部分是我控制的，哪一部分是 AI 生成的？' },
              { en: 'Can I compare, continue, adjust, or explore after the result appears?', zh: '结果出现后，我还能比较、继续、调整或探索吗？' }
            ].map((item, index) => (
              <div key={item.en} className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4">
                <span className="grid h-7 w-7 place-items-center rounded-full text-xs font-bold text-neutral-950" style={{ backgroundColor: project.accent }}>{index + 1}</span>
                <p className="text-sm leading-6 text-white/76">{c(item, isZh)}</p>
              </div>
            ))}
          </div>
        </div>
        <BrowserEvidence
          asset="/projects/nuwa-series/evidence/infinity-01-landing.png"
          alt={isZh ? 'NUWA-Infinity 初始入口页面。' : 'NUWA-Infinity entry screen.'}
          sourceLabel="nuwa-infinity.microsoft.com/#/NUWAInfinity"
          accent={project.accent}
          isZh={isZh}
          callouts={[
            { x: 50, y: 77, label: { en: 'First action', zh: '入口动作' }, detail: { en: 'The page tells users how to begin.', zh: '页面先回答从哪里开始。' } },
            { x: 50, y: 58, label: { en: 'Ready state', zh: 'Ready 状态' }, detail: { en: 'Users see the demo is ready.', zh: '用户知道输入/选择之后系统已准备。' } },
            { x: 28, y: 15, label: { en: 'Project identity', zh: '项目身份' }, detail: { en: 'Research context is present but not overwhelming.', zh: '研究身份存在，但不压过操作入口。' } }
          ]}
        />
      </div>
    </section>
  );
};

const EvolutionSection: React.FC<{ isZh: boolean }> = ({ isZh }) => (
  <section className="bg-[#070707] text-white">
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 md:px-12">
      <p className="font-serif text-sm italic tracking-wide text-white/50">Series evolution</p>
      <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
        {isZh ? '三个项目，不是三个展示页，而是三个交互问题的演进' : 'Three projects, not three display pages: an evolution of interaction control problems'}
      </h2>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {nuwaProjects.map((project, index) => (
          <div key={project.id} className="relative overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
            <div className="aspect-[16/10] overflow-hidden bg-black">
              <img src={assetUrl(project.heroImage)} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="p-5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/35">202{index === 0 ? '2' : '3'} / 0{index + 1}</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{c(project.label, isZh)}</h3>
              <p className="mt-3 text-sm leading-6 text-white/60">{c(project.coreQuestion, isZh)}</p>
              <p className="mt-4 text-sm font-semibold" style={{ color: project.accent }}>
                {project.id === 'infinity' ? 'Make generation spatial' : project.id === 'xl' ? 'Make generation temporal' : 'Make generation directable'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const EvidenceBlock: React.FC<{ project: NuwaProject; point: EvidencePoint; index: number; isZh: boolean }> = ({ project, point, index, isZh }) => (
  <section className="bg-[#070707] text-white">
    <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 sm:px-8 sm:py-20 md:px-12 lg:grid-cols-[0.42fr_0.58fr]">
      <div>
        <div className="border-t border-white/10 pt-7">
          <p className="font-serif text-sm italic tracking-wide" style={{ color: project.accent }}>{c(point.sequenceLabel, isZh)}</p>
          <h3 className="mt-5 text-2xl font-bold leading-tight sm:text-4xl">{c(point.title, isZh)}</h3>
        </div>
        <div className="mt-7 space-y-3">
          {[
            { label: { en: 'User problem', zh: '用户问题' }, body: point.userProblem },
            { label: { en: 'My design decision', zh: '我的设计判断' }, body: point.designDecision },
            { label: { en: 'Why it works', zh: '为什么有效' }, body: point.whyItWorks },
            { label: { en: 'User benefit', zh: '用户效益' }, body: point.userBenefit }
          ].map((item, itemIndex) => (
            <div key={item.label.en} className="rounded-lg border border-white/10 bg-white/[0.04] p-4">
              <div className="mb-2 flex items-center gap-3">
                <span className="grid h-6 w-6 place-items-center rounded-full text-xs font-bold text-neutral-950" style={{ backgroundColor: project.accent }}>
                  {itemIndex + 1}
                </span>
                <p className="text-sm font-semibold text-white">{c(item.label, isZh)}</p>
              </div>
              <p className="text-sm leading-6 text-white/62">{c(item.body, isZh)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="lg:sticky lg:top-8 lg:self-start">
        <BrowserEvidence
          asset={point.asset}
          alt={c(point.alt, isZh)}
          sourceLabel={project.id === 'infinity' ? 'nuwa-infinity.microsoft.com/#/NUWAInfinity' : project.id === 'xl' ? 'nuwa-infinity.microsoft.com/#/NUWAXL' : 'nuwa-infinity.microsoft.com/#/DragNUWA'}
          accent={project.accent}
          callouts={point.callouts}
          isZh={isZh}
        />
        <p className="mt-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-xs leading-5 text-white/52">
          {c(point.caption, isZh)}
        </p>
      </div>
    </div>
  </section>
);

const ProjectSection: React.FC<{ project: NuwaProject; isZh: boolean }> = ({ project, isZh }) => (
  <div id={project.id === 'infinity' ? 'nuwa-series-walkthrough' : undefined}>
    <section className="bg-[#070707] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 sm:py-24 md:px-12 lg:grid-cols-[0.46fr_0.54fr] lg:items-end">
        <div>
          <p className="font-serif text-sm italic tracking-wide" style={{ color: project.accent }}>{c(project.label, isZh)}</p>
          <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">{c(project.title, isZh)}</h2>
          <p className="mt-5 text-base leading-8 text-white/68">{c(project.coreQuestion, isZh)}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {project.sequence.map((step, index) => (
              <React.Fragment key={step.en}>
                <span className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-xs font-semibold text-white/70">{c(step, isZh)}</span>
                {index < project.sequence.length - 1 && <ArrowRight size={16} className="mt-2 text-white/25" />}
              </React.Fragment>
            ))}
          </div>
        </div>
        <BrowserEvidence
          asset={project.heroImage}
          alt={c(project.title, isZh)}
          sourceLabel={project.id === 'infinity' ? 'nuwa-infinity.microsoft.com/#/NUWAInfinity' : project.id === 'xl' ? 'nuwa-infinity.microsoft.com/#/NUWAXL' : 'nuwa-infinity.microsoft.com/#/DragNUWA'}
          accent={project.accent}
          isZh={isZh}
          callouts={[
            { x: 18, y: 22, label: { en: c(project.theme, false), zh: c(project.theme, true) }, detail: { en: c(project.coreQuestion, false), zh: c(project.coreQuestion, true) } },
            { x: 48, y: 58, label: { en: 'Real interface', zh: '真实界面' }, detail: { en: 'The chapter starts from the original demo.', zh: '章节从原始 demo 画面开始。' } },
            { x: 82, y: 78, label: { en: 'Interaction path', zh: '交互路径' }, detail: { en: 'The following blocks unpack this browsing order.', zh: '后续模块按浏览顺序拆解。' } }
          ]}
        />
      </div>
    </section>
    {project.evidence.map((point, index) => (
      <EvidenceBlock key={point.id} project={project} point={point} index={index} isZh={isZh} />
    ))}
    <LiveDemoFrame demo={project.liveDemo} accent={project.accent} isZh={isZh} />
    <section className="bg-[#070707] text-white">
      <div className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 sm:pb-24 md:px-12">
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6 sm:p-8">
          <p className="font-serif text-sm italic tracking-wide" style={{ color: project.accent }}>{isZh ? '设计价值' : 'Design value'}</p>
          <p className="mt-4 max-w-4xl text-xl leading-9 text-white/82 sm:text-3xl sm:leading-tight">{c(project.designValue, isZh)}</p>
        </div>
      </div>
    </section>
  </div>
);

const FrameworkSection: React.FC<{ isZh: boolean }> = ({ isZh }) => (
  <section className="bg-[#070707] text-white">
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 md:px-12">
      <p className="font-serif text-sm italic tracking-wide text-white/50">Interaction translation framework</p>
      <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
        {isZh ? '同一套设计思路：把模型能力转成用户熟悉动作' : 'One shared design logic: translate model capability into familiar actions'}
      </h2>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {nuwaProjects.map((project) => {
          const rows = project.id === 'infinity'
            ? {
                model: { en: 'Continue generating beyond an existing image.', zh: '根据已有图像继续生成边界之外的内容。' },
                action: { en: 'Expand a canvas, move the view, look beyond the edge.', zh: '扩展画布、移动视野、看边界之外。' },
                path: { en: 'Prompt / Gallery -> Current image -> Boundary -> Continuation -> Preview', zh: 'Prompt / Gallery → 当前图像 → 扩展边界 → 生成延展 → 预览对比' },
                value: { en: 'Outpainting becomes spatial exploration.', zh: '让 outpainting 从技术术语变成可操作的空间探索。' }
              }
            : project.id === 'xl'
              ? {
                  model: { en: 'Generate video across a long time range.', zh: '生成跨越长时间范围的视频。' },
                  action: { en: 'Read a timeline, scan keyframes, follow a filmstrip.', zh: '看时间线、看关键帧、扫描 filmstrip。' },
                  path: { en: 'Task intro -> Sparse keyframes -> Frame fill -> Timeline -> Video preview', zh: '介绍任务 → 稀疏关键帧 → 中间帧补齐 → 时间线浏览 → 视频预览' },
                  value: { en: 'Long video becomes a readable time structure.', zh: '让长视频生成从单个结果变成可理解的时间结构。' }
                }
              : {
                  model: { en: 'Control video generation with text, image, and trajectory.', zh: '用 text、image、trajectory 控制视频生成。' },
                  action: { en: 'Write intent, choose an image, draw a path.', zh: '写描述、选图、画路径。' },
                  path: { en: 'Text intent -> Image context -> Draw trajectory -> Generated motion -> Compare', zh: '输入语义 → 固定场景 → 绘制轨迹 → 生成视频 → 对照结果' },
                  value: { en: 'Motion control becomes a path users can draw.', zh: '让运动控制从难以描述的 prompt，变成可以直接画出的路径。' }
                };
          return (
            <div key={project.id} className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.04]">
              <div className="aspect-[16/10] bg-black">
                <img src={assetUrl(projectCardImages[project.id])} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="space-y-4 p-5">
                <h3 className="text-lg font-semibold text-white">{c(project.label, isZh)}</h3>
                {[
                  { label: { en: 'Model capability', zh: '模型能力' }, body: rows.model },
                  { label: { en: 'Familiar user action', zh: '用户熟悉动作' }, body: rows.action },
                  { label: { en: 'Interaction path', zh: '我设计的交互' }, body: rows.path },
                  { label: { en: 'Design value', zh: '设计价值' }, body: rows.value }
                ].map((row) => (
                  <div key={row.label.en}>
                    <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em]" style={{ color: project.accent }}>{c(row.label, isZh)}</p>
                    <p className="text-sm leading-6 text-white/62">{c(row.body, isZh)}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

const DesignWorkSection: React.FC<{ isZh: boolean }> = ({ isZh }) => {
  const items = [
    {
      accent: themeById('infinity').accent,
      title: { en: 'I designed first-use paths for unfamiliar AI demos', zh: '我为陌生 AI demo 设计第一次进入路径' },
      body: { en: 'NUWA-Infinity starts with Enter, Prompt, and Gallery so visitors know where to begin before seeing model terms.', zh: 'NUWA-Infinity 先用 Enter、Prompt 和 Gallery 让用户知道从哪里开始，而不是被技术说明挡住。' }
    },
    {
      accent: themeById('xl').accent,
      title: { en: 'I translated model capability into interface actions', zh: '我把模型能力转成界面动作' },
      body: { en: 'Outpainting becomes boundary expansion; long video becomes timeline browsing; motion control becomes a drawn trajectory.', zh: 'NUWA-Infinity 是扩展画布，NUWA XL 是浏览时间线，DragNUWA 是画运动轨迹。' }
    },
    {
      accent: themeById('drag').accent,
      title: { en: 'I designed around AI uncertainty', zh: '我围绕 AI 结果的不确定性设计' },
      body: { en: 'Preview, gallery, frame sequence, and comparison give users room to judge output instead of accepting one black-box result.', zh: '通过 preview、gallery、frame sequence 和结果对比，让用户有判断和选择空间。' }
    },
    {
      accent: themeById('infinity').secondaryAccent,
      title: { en: 'I made research demos understandable without reading papers', zh: '我让用户不读论文也能理解 research demo' },
      body: { en: 'Each project moves from example to operation to result, so non-technical users learn by trying.', zh: '每个项目都从示例进入操作，再观察结果，让非技术用户通过行动理解模型。' }
    },
    {
      accent: themeById('drag').secondaryAccent,
      title: { en: 'I used playful interaction purposefully', zh: '我有目的地使用 playful interaction' },
      body: { en: 'The playful pieces reduce unfamiliarity: canvas expansion, timeline scanning, and drawing paths are familiar actions for new AI capabilities.', zh: '这些互动不是炫技，而是降低陌生感：扩展画布、扫描时间线、画路径都是用户熟悉的动作。' }
    }
  ];

  return (
    <section className="bg-[#070707] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 md:px-12">
        <p className="font-serif text-sm italic tracking-wide text-white/50">{isZh ? '我的设计工作' : 'My design work'}</p>
        <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
          {isZh ? '这个系列体现了我哪些交互设计能力' : 'What this shows about my design work'}
        </h2>
        <div className="mt-12 space-y-4">
          {items.map((item, index) => (
            <div key={item.title.en} className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.04] p-5 md:grid-cols-[0.08fr_0.32fr_0.6fr] md:items-center">
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-white/35">0{index + 1}</span>
              <h3 className="text-lg font-semibold text-white">{c(item.title, isZh)}</h3>
              <p className="text-sm leading-7 text-white/62">{c(item.body, isZh)}</p>
              <div className="h-1 w-20 rounded-full md:col-start-2 md:col-end-4" style={{ backgroundColor: item.accent }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const NuwaSeriesCaseStudy: React.FC<{ isZh: boolean }> = ({ isZh }) => (
  <div className="bg-[#070707] text-white">
    <HeroSection isZh={isZh} />
    <WhySection isZh={isZh} />
    <EvolutionSection isZh={isZh} />
    {nuwaProjects.map((project) => (
      <ProjectSection key={project.id} project={project} isZh={isZh} />
    ))}
    <FrameworkSection isZh={isZh} />
    <DesignWorkSection isZh={isZh} />
  </div>
);

export default NuwaSeriesCaseStudy;

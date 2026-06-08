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
  assetSource: 'original-nuwa-website' | 'needs-real-screenshot';
  sourceUrl: string;
  status?: 'ready' | 'needs-real-screenshot';
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
    heroImage: '/projects/nuwa-series/verified/infinity-hero-01-project.png',
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
        asset: '/projects/nuwa-series/verified/infinity-01-landing-enter.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
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
        asset: '/projects/nuwa-series/verified/infinity-02-text-to-image-entry.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
        alt: { en: 'NUWA-Infinity text-to-image entry screen from the original site.', zh: 'NUWA-Infinity 原站 text-to-image 入口页面。' },
        userProblem: {
          en: 'If users see only a model description, they still do not know what phrase to try first.',
          zh: '如果用户只看到模型说明，仍然不知道第一句该输入或选择什么。'
        },
        designDecision: {
          en: 'I exposed simple prompt chips and a visible image preview so users could start with familiar language.',
          zh: '我把简单 prompt 选项和可见图像预览放在同一屏，让用户用熟悉的自然语言开始。'
        },
        whyItWorks: {
          en: 'The prompt choices reduce the blank-page problem, while the preview keeps input and output visibly connected.',
          zh: 'Prompt 选项降低空白输入压力，预览图让输入和结果保持可见连接。'
        },
        userBenefit: {
          en: 'Users can start without already knowing how to write a good prompt.',
          zh: '用户不需要先会写 prompt，也可以立即开始。'
        },
        caption: {
          en: 'What to notice: the first creative action is a plain phrase, not a model parameter.',
          zh: '看点：用户的第一个创作动作是一句普通短语，而不是模型参数。'
        },
        callouts: [
          { x: 22, y: 25, label: { en: 'Task label', zh: '任务标签' }, detail: { en: 'The page names the action as text to image.', zh: '页面直接说明这是 text-to-image 动作。' } },
          { x: 47, y: 87, label: { en: 'Prompt chips', zh: 'Prompt 选项' }, detail: { en: 'Users can start from short phrases.', zh: '用户可以从短语开始。' } },
          { x: 82, y: 38, label: { en: 'Preview image', zh: '预览图像' }, detail: { en: 'The output target stays visible.', zh: '输出目标保持可见。' } }
        ]
      },
      {
        id: 'infinity-current-image',
        title: { en: '01-3 / Image result: show the current world before extending it', zh: '01-3 / Image result：让用户先看到“当前世界”' },
        sequenceLabel: { en: 'Current image', zh: '当前图像' },
        asset: '/projects/nuwa-series/verified/infinity-03-current-result.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
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
        asset: '/projects/nuwa-series/verified/infinity-04-outpainting-boundary.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
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
        asset: '/projects/nuwa-series/verified/infinity-05-outpainting-result.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
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
      fallbackImage: '/projects/nuwa-series/verified/infinity-01-landing-enter.png',
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
      en: 'Explaining long video generation through scripts, stages, and examples',
      zh: '用脚本、阶段和示例解释长视频生成'
    },
    theme: { en: 'Temporal structure', zh: '时间结构' },
    coreQuestion: {
      en: 'How can users understand that a long video is generated across time, not as a single final result?',
      zh: '用户如何理解一个长视频不是单次生成结果，而是跨时间组织出来的生成过程？'
    },
    accent: '#F6C65B',
    secondaryAccent: '#9C7BFF',
    heroImage: '/projects/nuwa-series/verified/xl-01-intro.png',
    sequence: [
      { en: 'Intro', zh: '项目介绍' },
      { en: 'Script prompts', zh: '脚本提示' },
      { en: 'Generate stage', zh: '生成阶段' },
      { en: 'Example browsing', zh: '示例浏览' },
      { en: 'Output step', zh: '输出步骤' }
    ],
    evidence: [
      {
        id: 'xl-intro',
        title: { en: '02-1 / First impression: explain why long video is different', zh: '02-1 / First impression：先说明长视频生成和普通生成有什么不同' },
        sequenceLabel: { en: 'Intro', zh: '项目介绍' },
        asset: '/projects/nuwa-series/verified/xl-01-intro.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAXL',
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
          { x: 20, y: 10, label: { en: 'NUWA XL route', zh: 'NUWA XL 路由' }, detail: { en: 'The project is a separate demo path.', zh: '这是独立的 demo 路径。' } },
          { x: 26, y: 48, label: { en: 'Video example', zh: '视频示例' }, detail: { en: 'The output target is visible before the explanation.', zh: '先让用户看到输出目标。' } },
          { x: 77, y: 73, label: { en: 'Process line', zh: '过程描述' }, detail: { en: 'The copy points users to long video generation.', zh: '文案引导用户关注长视频生成。' } }
        ]
      },
      {
        id: 'xl-prompts',
        title: { en: '02-2 / Script prompts: make long video start from readable beats', zh: '02-2 / Script prompts：让长视频从可读的剧情节点开始' },
        sequenceLabel: { en: 'Script prompts', zh: '脚本提示' },
        asset: '/projects/nuwa-series/verified/xl-02-input-prompts.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAXL',
        alt: { en: 'NUWA XL original long video input prompt cards.', zh: 'NUWA XL 原站 long video input prompt 卡片。' },
        userProblem: {
          en: 'A long video can feel abstract if users only see a final clip without knowing what story it follows.',
          zh: '如果用户只看到最终视频，而不知道它依据什么剧情生成，长视频会显得很抽象。'
        },
        designDecision: {
          en: 'I placed script prompt cards beside the process rail so users could read the source structure first.',
          zh: '我把脚本提示卡片放在流程旁边，让用户先读懂视频依据哪些剧情节点生成。'
        },
        whyItWorks: {
          en: 'Script cards are easier to scan than a generated video timeline, and they explain what each segment should depict.',
          zh: '脚本卡片比直接看时间线更容易扫读，也解释每一段视频应该表现什么。'
        },
        userBenefit: {
          en: 'Users can judge whether later generated frames follow the intended story.',
          zh: '用户之后可以判断生成结果是否跟随了这些剧情提示。'
        },
        caption: {
          en: 'What to notice: the video starts from readable script cards, not from an unexplained final output.',
          zh: '看点：长视频先从可读脚本开始，而不是直接丢给用户一个最终结果。'
        },
        callouts: [
          { x: 11, y: 37, label: { en: 'Process rail', zh: '流程轨道' }, detail: { en: 'Users see where input sits in the generation path.', zh: '用户知道 input 位于生成路径的起点。' } },
          { x: 58, y: 31, label: { en: 'Script cards', zh: '脚本卡片' }, detail: { en: 'Each card describes one video beat.', zh: '每张卡片描述一个剧情节点。' } },
          { x: 84, y: 72, label: { en: 'Scannable grid', zh: '可扫读网格' }, detail: { en: 'The story can be read before playback.', zh: '播放前就能先读懂故事结构。' } }
        ]
      },
      {
        id: 'xl-generate-stage',
        title: { en: '02-3 / Generate stage: show that long video is built in steps', zh: '02-3 / Generate stage：把长视频生成显示成分阶段过程' },
        sequenceLabel: { en: 'Generate stage', zh: '生成阶段' },
        asset: '/projects/nuwa-series/verified/xl-03-generate-frames-stage.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAXL',
        alt: { en: 'NUWA XL original page with Generate frames stage selected.', zh: 'NUWA XL 原站 Generate frames 阶段选中状态。' },
        userProblem: {
          en: 'If the page jumps from input prompts to a final video, users cannot tell that generation happens through stages.',
          zh: '如果页面从脚本直接跳到最终视频，用户无法看出长视频是分阶段生成的。'
        },
        designDecision: {
          en: 'I used a visible process rail with named steps so the user can follow input, generation, frame states, and output.',
          zh: '我用可见流程轨道标出 input、generate、frame 状态和 output，让用户沿着阶段理解过程。'
        },
        whyItWorks: {
          en: 'A vertical process rail is a familiar way to read progress while staying inside the web experience.',
          zh: '竖向流程轨道是用户熟悉的进度阅读方式，也让解释停留在网页体验内部。'
        },
        userBenefit: {
          en: 'Users can explain that the page is demonstrating a generation process, not only showing a clip.',
          zh: '用户能说清页面展示的是生成过程，而不只是一个视频片段。'
        },
        caption: {
          en: 'What to notice: the stage is shown through the original web process rail.',
          zh: '看点：生成阶段通过原网页里的流程轨道呈现。'
        },
        callouts: [
          { x: 12, y: 42, label: { en: 'Generate step', zh: 'Generate 阶段' }, detail: { en: 'The current step is visible in the rail.', zh: '当前阶段在流程轨道里可见。' } },
          { x: 58, y: 30, label: { en: 'Prompt source', zh: '脚本来源' }, detail: { en: 'The script cards stay in view.', zh: '脚本卡片仍然可见。' } },
          { x: 14, y: 70, label: { en: 'Later states', zh: '后续状态' }, detail: { en: 'Frame and output steps are previewed as next steps.', zh: '帧和输出步骤作为后续阶段出现。' } }
        ]
      },
      {
        id: 'xl-short-video-carousel',
        title: { en: '02-4 / Example browsing: let users compare generated video cases', zh: '02-4 / Example browsing：让用户横向比较生成视频案例' },
        sequenceLabel: { en: 'Example browsing', zh: '示例浏览' },
        asset: '/projects/nuwa-series/verified/xl-04-short-video-carousel.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAXL',
        alt: { en: 'NUWA XL original short video example carousel.', zh: 'NUWA XL 原站 short video 示例横向浏览区域。' },
        userProblem: {
          en: 'A single generated video can look like a one-off demo, not a repeatable model capability.',
          zh: '单个生成视频容易像一次性展示，而不是可重复的模型能力。'
        },
        designDecision: {
          en: 'I used a horizontal browsing area so users can compare different generated video examples quickly.',
          zh: '我用横向示例浏览区，让用户快速比较不同生成视频案例。'
        },
        whyItWorks: {
          en: 'Cards and carousel navigation are familiar, and they make variation visible directly on the page.',
          zh: '卡片和横向浏览是熟悉模式，能直接在页面里展示生成差异。'
        },
        userBenefit: {
          en: 'Users can see that the model supports multiple prompts and visual styles, not only one clip.',
          zh: '用户能看到模型支持多种 prompt 和视觉风格，而不是只有一个视频。'
        },
        caption: {
          en: 'What to notice: example browsing is part of the original NUWA XL page, not an external research page.',
          zh: '看点：示例浏览来自 NUWA XL 原站页面，不是外部 research page。'
        },
        callouts: [
          { x: 21, y: 27, label: { en: 'Short video label', zh: 'Short video 标签' }, detail: { en: 'The page separates this section from long video.', zh: '页面把 short video 和 long video 区分开。' } },
          { x: 56, y: 48, label: { en: 'Example cards', zh: '示例卡片' }, detail: { en: 'Each card is a browsable generated case.', zh: '每张卡片都是可浏览的生成案例。' } },
          { x: 95, y: 30, label: { en: 'Carousel control', zh: '横向控制' }, detail: { en: 'Users can move through examples.', zh: '用户可以横向切换案例。' } }
        ]
      },
      {
        id: 'xl-output-step',
        title: { en: '02-5 / Output step: keep the final result inside the same path', zh: '02-5 / Output step：把最终结果留在同一条流程里' },
        sequenceLabel: { en: 'Output step', zh: '输出步骤' },
        asset: '/projects/nuwa-series/verified/xl-05-output-step.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAXL',
        alt: { en: 'NUWA XL original page with Output Video step selected.', zh: 'NUWA XL 原站 Output Video 阶段选中状态。' },
        userProblem: {
          en: 'Users need to know that the final video is the last step of the same generation path, not a separate showcase.',
          zh: '用户需要知道最终视频是同一条生成路径的最后一步，而不是另一个独立展示。'
        },
        designDecision: {
          en: 'I kept Output Video in the same process rail after prompts and frame-generation stages.',
          zh: '我把 Output Video 放在同一条流程轨道里，跟在 prompts 和 frame generation 阶段之后。'
        },
        whyItWorks: {
          en: 'The result reads as a conclusion of the process the user has already followed.',
          zh: '最终结果成为用户前面已经跟随过的流程结论。'
        },
        userBenefit: {
          en: 'Users can connect the output back to the script and generation steps.',
          zh: '用户能把最终输出和前面的脚本、生成阶段连接起来。'
        },
        caption: {
          en: 'What to notice: the output remains part of the same process rail, so the final result does not feel disconnected from the prompts.',
          zh: '看点：Output 仍然在同一条流程轨道里，因此最终结果不会和脚本提示脱节。'
        },
        callouts: [
          { x: 11, y: 78, label: { en: 'Output Video state', zh: 'Output Video 状态' }, detail: { en: 'The process reaches the final step.', zh: '流程进入最终输出。' } },
          { x: 58, y: 31, label: { en: 'Script remains visible', zh: '脚本仍然可见' }, detail: { en: 'The result stays tied to input prompts.', zh: '输出仍然和输入提示相关联。' } },
          { x: 12, y: 52, label: { en: 'Frame states', zh: '帧阶段' }, detail: { en: 'Intermediate states remain in the path.', zh: '中间阶段仍留在路径中。' } }
        ]
      }
    ],
    liveDemo: {
      title: { en: 'Explore NUWA XL through the original page', zh: 'Explore NUWA XL through the original page' },
      subtitle: { en: 'Understand long video generation through scripts, stages, and examples', zh: '通过脚本、阶段和示例理解长视频生成' },
      connection: {
        en: 'Now follow the original-page path: Intro -> Script prompts -> Generate stage -> Example browsing -> Output step.',
        zh: '现在可以沿着原站路径看：Intro → 脚本提示 → 生成阶段 → 示例浏览 → 输出步骤。'
      },
      url: 'https://nuwa-infinity.microsoft.com/#/NUWAXL',
      fallbackImage: '/projects/nuwa-series/verified/xl-01-intro.png',
      guideTitle: { en: 'Look for', zh: '你可以这样看' },
      guideSteps: [
        { en: 'Where the page introduces long video generation', zh: '页面如何先介绍长视频生成' },
        { en: 'How script prompts define video beats', zh: '脚本提示如何定义视频节点' },
        { en: 'How the process rail marks generation stages', zh: '流程轨道如何标记生成阶段' },
        { en: 'How example browsing supports comparison', zh: '示例浏览如何支持比较' }
      ]
    },
    designValue: {
      en: 'NUWA XL shows how I made long-video generation readable without relying on paper figures: script prompts define the source, the process rail shows stages, and examples let users compare generated results.',
      zh: 'NUWA XL 的设计重点不是用论文图解释模型，而是用原站页面里的脚本提示、流程轨道和示例浏览，让用户看懂长视频生成的组织方式。'
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
    heroImage: '/projects/nuwa-series/verified/drag-02-intro-video.png',
    sequence: [
      { en: 'Gallery', zh: '示例入口' },
      { en: 'Intro video', zh: '介绍视频' },
      { en: 'Scene selection', zh: '场景选择' },
      { en: 'Camera movement', zh: '镜头运动' },
      { en: 'Text + image + drag', zh: 'Text + image + drag' }
    ],
    evidence: [
      {
        id: 'drag-gallery',
        title: { en: '03-1 / Gallery entry: make motion control browsable first', zh: '03-1 / Gallery entry：先让运动控制变成可浏览案例' },
        sequenceLabel: { en: 'Gallery', zh: '示例入口' },
        asset: '/projects/nuwa-series/verified/drag-01-gallery-grid.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/DragNUWA',
        alt: { en: 'DragNUWA original demo gallery screen.', zh: 'DragNUWA 原始 demo gallery 页面。' },
        userProblem: {
          en: 'Prompt can describe a scene, but direction, path, speed, and rhythm are hard to control in words.',
          zh: 'Prompt 可以描述场景，但方向、轨迹、速度和节奏很难只靠文字精确控制。'
        },
        designDecision: {
          en: 'I opened with a gallery grid so visitors could scan different motion cases before reading details.',
          zh: '我用 gallery grid 作为入口，让用户先浏览不同运动案例，再进入详细说明。'
        },
        whyItWorks: {
          en: 'A grid gives non-technical visitors concrete examples of what “controllable motion” looks like.',
          zh: '网格示例让非技术用户先看到“可控运动”具体长什么样。'
        },
        userBenefit: {
          en: 'Users can choose a visual starting point instead of decoding the paper title first.',
          zh: '用户可以先选择视觉起点，而不是先解读论文标题。'
        },
        caption: {
          en: 'What to notice: the first screen gives users concrete motion cases before asking them to read the research context.',
          zh: '看点：第一屏先给用户具体运动案例，再让他们进入研究背景。'
        },
        callouts: [
          { x: 20, y: 9, label: { en: 'DragNUWA nav', zh: 'DragNUWA 导航' }, detail: { en: 'The user is inside the original NUWA site.', zh: '用户处在 NUWA 原站中。' } },
          { x: 50, y: 42, label: { en: 'Example grid', zh: '示例网格' }, detail: { en: 'Cases show varied motion contexts.', zh: '示例展示不同运动场景。' } },
          { x: 82, y: 72, label: { en: 'Video tiles', zh: '视频 tile' }, detail: { en: 'Each tile suggests motion can be inspected.', zh: '每个 tile 都提示运动可被查看。' } }
        ]
      },
      {
        id: 'drag-intro-video',
        title: { en: '03-2 / Intro video: explain the control problem before the steps', zh: '03-2 / Intro video：先说明为什么需要直接控制运动' },
        sequenceLabel: { en: 'Intro video', zh: '介绍视频' },
        asset: '/projects/nuwa-series/verified/drag-02-intro-video.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/DragNUWA',
        alt: { en: 'DragNUWA original intro video screen.', zh: 'DragNUWA 原站介绍视频页面。' },
        userProblem: {
          en: 'Prompt alone can describe a scene, but it is weak at specifying path, direction, and camera movement.',
          zh: 'Prompt 可以描述场景，但很难精确表达路径、方向和镜头运动。'
        },
        designDecision: {
          en: 'I used an intro video and short description to frame DragNUWA as motion control, not only video generation.',
          zh: '我用介绍视频和简短说明，把 DragNUWA 定义为运动控制，而不只是视频生成。'
        },
        whyItWorks: {
          en: 'Showing movement before the instructions helps users understand why a trajectory input is needed.',
          zh: '在说明操作前先展示运动，用户更容易理解为什么需要 trajectory input。'
        },
        userBenefit: {
          en: 'Users understand the purpose of the upcoming scene and path controls.',
          zh: '用户能理解后续场景选择和路径控制的目的。'
        },
        caption: {
          en: 'What to notice: the original page frames the demo around text, image, and trajectory controls.',
          zh: '看点：原站页面把 demo 明确框定为 text、image、trajectory 三种控制输入。'
        },
        callouts: [
          { x: 32, y: 45, label: { en: 'Motion video', zh: '运动视频' }, detail: { en: 'Movement is shown before instructions.', zh: '先展示运动效果。' } },
          { x: 72, y: 48, label: { en: 'Control framing', zh: '控制框架' }, detail: { en: 'The text names text, image, and trajectory.', zh: '文案点明三种输入。' } },
          { x: 72, y: 73, label: { en: 'Paper link', zh: '论文入口' }, detail: { en: 'Research context stays secondary.', zh: '研究入口保留为次级。' } }
        ]
      },
      {
        id: 'drag-complex-trajectories',
        title: { en: '03-3 / Scene selection: anchor trajectory control in a concrete scene', zh: '03-3 / Scene selection：先把轨迹控制放进具体场景' },
        sequenceLabel: { en: 'Scene selection', zh: '场景选择' },
        asset: '/projects/nuwa-series/verified/drag-03-complex-trajectories.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/DragNUWA',
        alt: { en: 'DragNUWA original complex trajectories scene selection screen.', zh: 'DragNUWA 原站 complex trajectories 场景选择页面。' },
        userProblem: {
          en: 'A trajectory has no meaning until users know which scene and object it applies to.',
          zh: '轨迹必须依附在具体场景和对象上，否则用户不知道它控制什么。'
        },
        designDecision: {
          en: 'I made scene selection an explicit step before drawing or interpreting trajectory.',
          zh: '我把场景选择设计成明确步骤，让用户先确定轨迹要作用在哪个画面上。'
        },
        whyItWorks: {
          en: 'The selected scene becomes the spatial anchor for later path and motion controls.',
          zh: '被选中的场景成为后续路径和运动控制的空间参照。'
        },
        userBenefit: {
          en: 'Users can reason about movement relative to a visible environment.',
          zh: '用户能基于可见环境来理解运动方向和路径。'
        },
        caption: {
          en: 'What to notice: the original interface turns trajectory control into a step-by-step task: select a scene first.',
          zh: '看点：原站把轨迹控制拆成分步任务，第一步就是选择场景。'
        },
        callouts: [
          { x: 22, y: 28, label: { en: 'Capability label', zh: '能力标签' }, detail: { en: 'Complex trajectories are introduced first.', zh: '先引出复杂轨迹能力。' } },
          { x: 72, y: 20, label: { en: 'Scene gallery', zh: '场景库' }, detail: { en: 'Users choose a concrete scene.', zh: '用户选择具体场景。' } },
          { x: 72, y: 59, label: { en: 'Selected scene', zh: '选中场景' }, detail: { en: 'This area anchors the upcoming path.', zh: '这个区域承载后续轨迹。' } }
        ]
      },
      {
        id: 'drag-camera-movement',
        title: { en: '03-4 / Camera movement: separate movement patterns from scene choice', zh: '03-4 / Camera movement：把运动模式和场景选择分开讲清楚' },
        sequenceLabel: { en: 'Camera movement', zh: '镜头运动' },
        asset: '/projects/nuwa-series/verified/drag-04-camera-movement.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/DragNUWA',
        alt: { en: 'DragNUWA original camera movement examples screen.', zh: 'DragNUWA 原站 camera movements 示例页面。' },
        userProblem: {
          en: 'Users may confuse the scene content with the type of motion being demonstrated.',
          zh: '用户容易把场景内容和被展示的运动类型混在一起。'
        },
        designDecision: {
          en: 'I separated camera movement examples into their own browsing area with repeated visual comparison.',
          zh: '我把 camera movement 单独做成可浏览示例区，用重复画面对比不同运动模式。'
        },
        whyItWorks: {
          en: 'Repeated examples make the motion variable easier to notice because the scene remains comparable.',
          zh: '重复示例让用户更容易注意到变化的是运动方式，而不是场景本身。'
        },
        userBenefit: {
          en: 'Users can compare motion patterns before moving into the combined input demo.',
          zh: '用户在进入组合输入 demo 前，可以先比较不同运动模式。'
        },
        caption: {
          en: 'What to notice: the camera movement examples let users compare motion patterns inside the same site flow.',
          zh: '看点：camera movement 示例让用户在同一条网页流程里比较运动模式。'
        },
        callouts: [
          { x: 16, y: 18, label: { en: 'Scene strip', zh: '场景条' }, detail: { en: 'Users can compare available examples.', zh: '用户可以比较可用示例。' } },
          { x: 46, y: 48, label: { en: 'Paired previews', zh: '并列预览' }, detail: { en: 'Repeated frames make movement comparable.', zh: '重复画面让运动差异可比较。' } },
          { x: 13, y: 82, label: { en: 'Movement label', zh: '运动标签' }, detail: { en: 'The section names the interaction focus.', zh: '标题明确当前关注运动。' } }
        ]
      },
      {
        id: 'drag-text-image-drag',
        title: { en: '03-5 / Text + image + drag: show how three inputs work together', zh: '03-5 / Text + image + drag：展示三种输入如何组合' },
        sequenceLabel: { en: 'Text + image + drag', zh: 'Text + image + drag' },
        asset: '/projects/nuwa-series/verified/drag-05-text-image-drag.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/DragNUWA',
        alt: { en: 'DragNUWA original text image drag section.', zh: 'DragNUWA 原站 text image drag 区域。' },
        userProblem: {
          en: 'Users need to understand which role text, image, and drag each play in controllable video generation.',
          zh: '用户需要理解 text、image、drag 在可控视频生成里分别承担什么角色。'
        },
        designDecision: {
          en: 'I placed the input thumbnails, path/control example, and output preview in one visual system.',
          zh: '我把输入缩略图、路径/控制示例和输出预览放在同一个视觉系统里。'
        },
        whyItWorks: {
          en: 'The relationship is visible: text names intent, image anchors space, and drag defines motion.',
          zh: '三者关系变得可见：text 定义意图，image 固定空间，drag 表达运动。'
        },
        userBenefit: {
          en: 'Users can understand controllable generation without reading the paper figure first.',
          zh: '用户不用先看论文图，也能理解可控生成的输入关系。'
        },
        caption: {
          en: 'What to notice: text, image, and drag are shown together, so the control relationship is visible in one place.',
          zh: '看点：text、image、drag 被放在一起，用户可以在同一处看懂控制关系。'
        },
        callouts: [
          { x: 25, y: 32, label: { en: 'Input examples', zh: '输入示例' }, detail: { en: 'Thumbnails define starting states.', zh: '缩略图定义起始状态。' } },
          { x: 45, y: 67, label: { en: 'Drag control', zh: 'Drag 控制' }, detail: { en: 'The control action is shown beside the result.', zh: '控制动作和结果并列出现。' } },
          { x: 79, y: 46, label: { en: 'Output preview', zh: '输出预览' }, detail: { en: 'Users see what the combined inputs produce.', zh: '用户看到组合输入产生什么结果。' } }
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
      fallbackImage: '/projects/nuwa-series/verified/drag-01-gallery-grid.png',
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
  infinity: '/projects/nuwa-series/verified/infinity-hero-01-project.png',
  xl: '/projects/nuwa-series/verified/xl-01-intro.png',
  drag: '/projects/nuwa-series/verified/drag-02-intro-video.png'
};

const heroPreviewCards = [
  {
    image: '/projects/nuwa-series/verified/infinity-hero-01-project.png',
    accent: '#8FB7FF',
    title: { en: 'NUWA-Infinity / Spatial exploration', zh: 'NUWA-Infinity / 空间探索' },
    body: {
      en: 'The project hero frames image outpainting as a web experience users can enter and explore.',
      zh: '项目 hero 把图像外扩呈现成用户可以进入、探索的网页体验。'
    },
    note: { en: 'NUWA-Infinity hero', zh: 'NUWA-Infinity 头图' }
  },
  {
    image: '/projects/nuwa-series/verified/xl-01-intro.png',
    accent: '#F6C65B',
    title: { en: 'NUWA XL / Long video generation', zh: 'NUWA XL / 长视频生成' },
    body: {
      en: 'The NUWA XL hero introduces long video generation before users enter the staged walkthrough.',
      zh: 'NUWA XL hero 先建立长视频生成主题，再让用户进入分阶段浏览。'
    },
    note: { en: 'NUWA XL hero', zh: 'NUWA XL 头图' }
  },
  {
    image: '/projects/nuwa-series/verified/drag-02-intro-video.png',
    accent: '#FF665C',
    title: { en: 'DragNUWA / Direct motion control', zh: 'DragNUWA / 直接运动控制' },
    body: {
      en: 'The DragNUWA hero sets up text, image, and trajectory as controls for generated motion.',
      zh: 'DragNUWA hero 把 text、image、trajectory 设置成控制生成运动的入口。'
    },
    note: { en: 'DragNUWA hero', zh: 'DragNUWA 头图' }
  }
];

const BrowserEvidence: React.FC<{
  asset: string;
  alt: string;
  sourceLabel: string;
  accent: string;
  callouts?: Callout[];
  isZh: boolean;
  status?: EvidencePoint['status'];
}> = ({ asset, alt, sourceLabel, accent, callouts = [], isZh, status }) => (
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
        {status === 'needs-real-screenshot' || !asset ? (
          <div className="grid min-h-[360px] w-full place-items-center border border-dashed border-white/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))] p-8 text-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em]" style={{ color: accent }}>needs real screenshot</p>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/62">
                {isZh
                  ? '这里先保留占位，不使用论文页、外部项目页或来源不确定的图片替代真实 NUWA 网站截图。'
                  : 'This slot is intentionally left as a placeholder until a real NUWA website screenshot is captured.'}
              </p>
            </div>
          </div>
        ) : (
          <>
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
          </>
        )}
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
    <img src={assetUrl('/projects/nuwa-series/verified/infinity-hero-01-project.png')} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
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
        {heroPreviewCards.map((card) => (
          <div key={card.image} className="grid grid-cols-[130px_minmax(0,1fr)] gap-4 rounded-lg border border-white/10 bg-black/42 p-3 backdrop-blur-md">
            <div className="aspect-[4/3] overflow-hidden rounded-md bg-black">
              <img src={assetUrl(card.image)} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="self-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: card.accent }}>{c(card.title, isZh)}</p>
              <p className="mt-2 text-sm leading-6 text-white/78">{c(card.body, isZh)}</p>
              <p className="mt-2 text-xs text-white/42">{c(card.note, isZh)}</p>
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
        <div className="lg:sticky lg:top-8 lg:self-start">
          <BrowserEvidence
            asset="/projects/nuwa-series/verified/infinity-01-landing-enter.png"
            alt={isZh ? 'NUWA-Infinity 初始入口页面。' : 'NUWA-Infinity entry screen.'}
            sourceLabel="https://nuwa-infinity.microsoft.com/#/NUWAInfinity"
            accent={project.accent}
            isZh={isZh}
            callouts={[
              { x: 50, y: 77, label: { en: 'First action', zh: '入口动作' }, detail: { en: 'The page tells users how to begin.', zh: '页面先回答从哪里开始。' } },
              { x: 50, y: 58, label: { en: 'Ready state', zh: 'Ready 状态' }, detail: { en: 'Users see the demo is ready.', zh: '用户知道输入/选择之后系统已准备。' } },
              { x: 28, y: 15, label: { en: 'Project identity', zh: '项目身份' }, detail: { en: 'Research context is present but not overwhelming.', zh: '研究身份存在，但不压过操作入口。' } }
            ]}
          />
          <p className="mt-3 rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-xs leading-5 text-white/52">
            {isZh
              ? '看点：这一屏先回答“我能不能操作、从哪里开始”，再把用户带入后面的 Prompt、Gallery、Outpainting 和 Preview 路径。'
              : 'What to notice: this screen answers whether the demo is operable and where to begin before the page moves into Prompt, Gallery, Outpainting, and Preview.'}
          </p>
        </div>
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
          sourceLabel={point.sourceUrl}
          accent={project.accent}
          callouts={point.callouts}
          isZh={isZh}
          status={point.status}
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
          sourceLabel={project.id === 'infinity' ? 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity' : project.id === 'xl' ? 'https://nuwa-infinity.microsoft.com/#/NUWAXL' : 'https://nuwa-infinity.microsoft.com/#/DragNUWA'}
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
                  action: { en: 'Read script cards, follow process stages, browse examples.', zh: '读脚本卡片、跟随流程阶段、浏览示例。' },
                  path: { en: 'Task intro -> Script prompts -> Generate stage -> Example browsing -> Output step', zh: '介绍任务 → 脚本提示 → 生成阶段 → 示例浏览 → 输出步骤' },
                  value: { en: 'Long video becomes a staged, readable web flow.', zh: '让长视频生成从单个结果变成分阶段可阅读的网页流程。' }
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
      body: { en: 'Outpainting becomes boundary expansion; long video becomes script-and-stage browsing; motion control becomes text, image, and drag in one view.', zh: 'NUWA-Infinity 是扩展边界，NUWA XL 是脚本和阶段浏览，DragNUWA 是把 text、image、drag 放进同一视图。' }
    },
    {
      accent: themeById('drag').accent,
      title: { en: 'I designed around AI uncertainty', zh: '我围绕 AI 结果的不确定性设计' },
      body: { en: 'Preview, gallery, process stages, and example browsing give users room to judge output instead of accepting one black-box result.', zh: '通过 preview、gallery、流程阶段和示例浏览，让用户有判断和选择空间。' }
    },
    {
      accent: themeById('infinity').secondaryAccent,
      title: { en: 'I made research demos understandable without reading papers', zh: '我让用户不读论文也能理解 research demo' },
      body: { en: 'Each project moves from example to operation to result, so non-technical users learn by trying.', zh: '每个项目都从示例进入操作，再观察结果，让非技术用户通过行动理解模型。' }
    },
    {
      accent: themeById('drag').secondaryAccent,
      title: { en: 'I used playful interaction purposefully', zh: '我有目的地使用 playful interaction' },
      body: { en: 'The playful pieces reduce unfamiliarity: canvas expansion, script cards, process rails, galleries, and drag controls are familiar actions for new AI capabilities.', zh: '这些互动不是炫技，而是降低陌生感：扩展画布、脚本卡片、流程轨道、gallery 和 drag control 都是用户熟悉的动作。' }
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

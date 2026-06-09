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
      en: 'Making outpainting feel like extending a picture by hand',
      zh: '把 outpainting 做成“亲手把画面往外扩”'
    },
    theme: { en: 'Spatial exploration', zh: '空间探索' },
    coreQuestion: {
      en: 'How do you help someone see that the model is not making a new picture, but continuing the world outside the edge?',
      zh: '怎样让用户看懂：模型不是重新生成一张图，而是在已有画面的边缘继续往外补？'
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
        title: { en: '01-1 / Landing: show that this is something to enter', zh: '01-1 / Landing：先让用户知道这是可以进入的 demo' },
        sequenceLabel: { en: 'Landing / Enter', zh: 'Landing / Enter' },
        asset: '/projects/nuwa-series/verified/infinity-01-landing-enter.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
        alt: { en: 'NUWA-Infinity landing screen with loading complete and Enter action.', zh: 'NUWA-Infinity landing 页面，显示加载完成和 Enter 入口。' },
        userProblem: {
          en: 'Early AI demos often looked like research pages. A visitor could easily wonder, am I supposed to read this, or can I try it?',
          zh: '早期 AI demo 很容易看起来像研究介绍页。用户第一次进来时会先判断：这是要我阅读，还是可以直接操作？'
        },
        designDecision: {
          en: 'I kept the first screen simple: project name, one short promise, loading state, and a single Enter button.',
          zh: '我把第一屏压到很简单：项目名、一句能力提示、加载状态，以及一个明确的 Enter 按钮。'
        },
        whyItWorks: {
          en: 'That first click changes the mode from “reading about a model” to “stepping into a tool.” It gives the demo a clear beginning.',
          zh: '这个点击把用户从“阅读模型介绍”切到“进入工具”。体验有了一个清楚的开场。'
        },
        userBenefit: {
          en: 'Visitors do not need to parse the research terms first. They know the page is ready and what to do next.',
          zh: '用户不用先消化研究术语，也知道页面已经准备好、下一步该点哪里。'
        },
        caption: {
          en: 'The first screen does not explain everything. It gives the visitor a door.',
          zh: '这一屏不急着解释所有技术，而是先给用户一扇可以进入的门。'
        },
        callouts: [
          { x: 28, y: 15, label: { en: 'Project identity', zh: '项目身份' }, detail: { en: 'The research context is visible, but it does not block the first action.', zh: '研究身份可见，但不会挡住第一步操作。' } },
          { x: 50, y: 57, label: { en: 'Ready state', zh: '加载完成' }, detail: { en: 'The page waits until the demo is ready before asking for input.', zh: '先告诉用户 demo 已准备好，再邀请进入。' } },
          { x: 50, y: 77, label: { en: 'Enter action', zh: 'Enter 按钮' }, detail: { en: 'One clear click starts the experience.', zh: '一个明确点击启动整个体验。' } }
        ]
      },
      {
        id: 'infinity-prompt-gallery',
        title: { en: '01-2 / Prompt + Gallery: give beginners a safe way in', zh: '01-2 / Prompt + Gallery：给第一次尝试的人两个入口' },
        sequenceLabel: { en: 'Prompt / Gallery', zh: 'Prompt / Gallery' },
        asset: '/projects/nuwa-series/verified/infinity-02-text-to-image-entry.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
        alt: { en: 'NUWA-Infinity text-to-image entry screen from the original site.', zh: 'NUWA-Infinity 原站 text-to-image 入口页面。' },
        userProblem: {
          en: 'A blank prompt box can be intimidating. Many users do not know what kind of sentence will produce a useful result.',
          zh: '空白 prompt 输入框会让人犹豫。很多用户不知道第一句该怎么写，才会得到有用结果。'
        },
        designDecision: {
          en: 'I used two entry modes: write a short prompt if you have an idea, or start from Gallery if you want a proven example.',
          zh: '我做了两个入口：有想法就写一句 prompt，不确定就从 Gallery 的现成示例开始。'
        },
        whyItWorks: {
          en: 'Prompt keeps authorship. Gallery removes the fear of writing the “wrong” prompt. Both lead to the same next step.',
          zh: 'Prompt 保留创作感，Gallery 降低“我会不会写错”的压力。两个入口最后都会进入同一条流程。'
        },
        userBenefit: {
          en: 'People can begin by typing, choosing, or simply looking. They are not stuck at the first input.',
          zh: '用户可以输入、选择，或者先看示例，不会卡在第一步。'
        },
        caption: {
          en: 'The first creative action is a plain phrase or a selected example, not a model parameter.',
          zh: '第一个创作动作是一句自然语言或一个示例选择，而不是模型参数。'
        },
        callouts: [
          { x: 22, y: 25, label: { en: 'Task label', zh: '任务标签' }, detail: { en: 'The page says what action the user is about to take.', zh: '先说明接下来要做的是 text-to-image。' } },
          { x: 47, y: 87, label: { en: 'Prompt options', zh: 'Prompt 选项' }, detail: { en: 'Short phrases make the first input less blank.', zh: '短语选项减少空白输入压力。' } },
          { x: 82, y: 38, label: { en: 'Preview image', zh: '结果预览' }, detail: { en: 'Input and expected output stay on the same screen.', zh: '输入和预期结果放在同一屏。' } }
        ]
      },
      {
        id: 'infinity-current-image',
        title: { en: '01-3 / Current image: let users inspect the scene before extending it', zh: '01-3 / 当前图像：外扩之前，先让用户看清画面' },
        sequenceLabel: { en: 'Current image', zh: '当前图像' },
        asset: '/projects/nuwa-series/verified/infinity-03-current-result.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
        alt: { en: 'NUWA-Infinity current generated image on the original page.', zh: 'NUWA-Infinity 原网页中的当前生成图像。' },
        userProblem: {
          en: 'Outpainting only makes sense when users understand what is already inside the frame.',
          zh: 'Outpainting 的前提是用户先看懂画面里已经有什么。'
        },
        designDecision: {
          en: 'I kept the generated image large and central before asking users to think about the outer edge.',
          zh: '我先让生成图像占据视觉中心，再引导用户去看边界之外。'
        },
        whyItWorks: {
          en: 'The user builds a memory of the original scene, which makes the later continuation easier to judge.',
          zh: '用户先记住原始场景，后面才更容易判断延展内容是否合理。'
        },
        userBenefit: {
          en: 'The next result feels like a continuation of this scene, not a random second image.',
          zh: '下一步结果会像这张图的延续，而不是一张随机的新图。'
        },
        caption: {
          en: 'Before asking users to look outside the frame, the interface makes the inside worth inspecting.',
          zh: '在让用户看向边界外之前，界面先让边界内的内容被认真看清。'
        },
        callouts: [
          { x: 42, y: 45, label: { en: 'Current image', zh: '当前图像' }, detail: { en: 'The scene anchors the user’s understanding.', zh: '先建立视觉上下文。' } },
          { x: 63, y: 48, label: { en: 'Image boundary', zh: '图像边界' }, detail: { en: 'The edge becomes the later reference point.', zh: '后续扩展要以边界为参照。' } },
          { x: 70, y: 83, label: { en: 'Gallery strip', zh: 'Gallery strip' }, detail: { en: 'Users can switch generated options.', zh: '用户可以切换不同生成结果。' } }
        ]
      },
      {
        id: 'infinity-boundary',
        title: { en: '01-4 / Boundary: turn “outpainting” into a visible edge', zh: '01-4 / 边界：把 outpainting 变成看得见的边缘' },
        sequenceLabel: { en: 'Boundary', zh: '扩展边界' },
        asset: '/projects/nuwa-series/verified/infinity-04-outpainting-boundary.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
        alt: { en: 'NUWA-Infinity image outpainting boundary screen.', zh: 'NUWA-Infinity 图像外扩边界页面。' },
        userProblem: {
          en: 'The word “outpainting” is not helpful by itself. Users understand edges, canvas space, and the idea of looking beyond the current crop.',
          zh: '“Outpainting” 这个词本身不够直观。用户更熟悉的是边缘、画布空间，以及把视野往外挪。'
        },
        designDecision: {
          en: 'I made the boundary the focus. The edge tells users where the known image stops and where the model can continue.',
          zh: '我把边界变成操作焦点。边缘告诉用户：已知画面到这里结束，AI 可以从这里继续。'
        },
        whyItWorks: {
          en: 'It borrows from tools people already know: maps, cropping, design canvases, and image editors.',
          zh: '这个动作借用了用户熟悉的工具经验：地图、裁切、设计画布和图片编辑器。'
        },
        userBenefit: {
          en: 'Users can understand the behavior before learning the research vocabulary.',
          zh: '用户先理解行为，再理解术语。'
        },
        caption: {
          en: 'The design move is concrete: continue past this edge.',
          zh: '这里的关键设计是：outpainting 变成“从这条边继续往外看”。'
        },
        callouts: [
          { x: 63, y: 46, label: { en: 'Original frame', zh: '原始画面' }, detail: { en: 'The image provides the context.', zh: '已有画面提供上下文。' } },
          { x: 88, y: 34, label: { en: 'Expansion edge', zh: '扩展边界' }, detail: { en: 'The edge hints where AI can continue.', zh: '边缘提示 AI 可继续生成。' } },
          { x: 94, y: 63, label: { en: 'Try action', zh: 'Click me' }, detail: { en: 'The model term becomes an action.', zh: '把概念变成直接动作。' } }
        ]
      },
      {
        id: 'infinity-preview',
        title: { en: '01-5 / Preview: give users a moment to judge the result', zh: '01-5 / 预览：给用户一个判断结果的时刻' },
        sequenceLabel: { en: 'Preview', zh: '预览对比' },
        asset: '/projects/nuwa-series/verified/infinity-05-outpainting-result.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
        alt: { en: 'NUWA-Infinity generated continuation and result preview strip.', zh: 'NUWA-Infinity 生成延展结果和候选预览条。' },
        userProblem: {
          en: 'Generative output is uncertain. If the page only returns one answer, the user has no place to decide whether it worked.',
          zh: '生成结果本来就不确定。如果页面只给一个答案，用户没有机会判断它到底好不好。'
        },
        designDecision: {
          en: 'I treated the result screen as a review step: inspect the continuation, compare candidates, then keep going or choose another direction.',
          zh: '我把结果页设计成 review 环节：检查延展结果、比较候选，再决定继续或换一个方向。'
        },
        whyItWorks: {
          en: 'For early generative AI, control often comes after generation: seeing, comparing, and choosing.',
          zh: '在早期生成式 AI 里，控制感很多时候发生在生成之后：看、比较、选择。'
        },
        userBenefit: {
          en: 'Users can decide whether the new area belongs to the original scene before they move on.',
          zh: '用户可以判断新增区域是否真的接上了原图，再决定下一步。'
        },
        caption: {
          en: 'Preview makes the model output discussable. The user can point to what worked and what did not.',
          zh: 'Preview 让生成结果可以被讨论和判断：哪里接得上，哪里不合适。'
        },
        callouts: [
          { x: 55, y: 45, label: { en: 'Generated continuation', zh: '生成延展结果' }, detail: { en: 'Large enough to inspect.', zh: '结果足够大，便于检查。' } },
          { x: 45, y: 78, label: { en: 'Preview point', zh: '预览 / 对比点' }, detail: { en: 'Users can judge what changed.', zh: '用户能判断哪里发生变化。' } },
          { x: 64, y: 86, label: { en: 'Candidate strip', zh: '候选结果条' }, detail: { en: 'Multiple outputs keep the path open.', zh: '多个结果支持继续比较。' } }
        ]
      }
    ],
    liveDemo: {
      title: { en: 'Try the original NUWA-Infinity demo', zh: '试试原始 NUWA-Infinity demo' },
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
      en: 'Showing long video generation as a sequence, not a final clip',
      zh: '把长视频生成讲成一段过程，而不是只放最终视频'
    },
    theme: { en: 'Temporal structure', zh: '时间结构' },
    coreQuestion: {
      en: 'How do you show that the model is planning and filling time instead of producing one finished video in a single jump?',
      zh: '怎样让用户看懂：模型不是一次性吐出一个视频，而是在规划并补齐时间？'
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
        title: { en: '02-1 / First screen: make users look at time before image polish', zh: '02-1 / 第一屏：先让用户关注时间，而不是只看画质' },
        sequenceLabel: { en: 'Intro', zh: '项目介绍' },
        asset: '/projects/nuwa-series/verified/xl-01-intro.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAXL',
        alt: { en: 'NUWA XL original demo intro screen.', zh: 'NUWA XL 原始 demo 介绍页面。' },
        userProblem: {
          en: 'A polished final video does not explain the design problem. The hard part is how the video stays coherent across time.',
          zh: '只看一个漂亮视频，看不出这个项目难在哪里。难点在于画面如何跨时间保持连续。'
        },
        designDecision: {
          en: 'I introduced NUWA XL as a long video demo first, then used the page flow to point toward stages and examples.',
          zh: '我先把 NUWA XL 定义成长视频 demo，再用页面流程把用户带向阶段和示例。'
        },
        whyItWorks: {
          en: 'It tells visitors what to watch for: not one beautiful frame, but how frames relate to one another.',
          zh: '它提醒用户该看什么：不是单帧好不好看，而是帧和帧之间如何接上。'
        },
        userBenefit: {
          en: 'Users understand that the demo is about generating across duration, rhythm, and continuity.',
          zh: '用户能理解这个 demo 关注的是时长、节奏和连续性。'
        },
        caption: {
          en: 'The page asks users to read the demo as a time problem from the start.',
          zh: '这一屏从一开始就让用户把它当成“时间问题”来读。'
        },
        callouts: [
          { x: 20, y: 10, label: { en: 'NUWA XL route', zh: 'NUWA XL 路由' }, detail: { en: 'The project is a separate demo path.', zh: '这是独立的 demo 路径。' } },
          { x: 26, y: 48, label: { en: 'Video example', zh: '视频示例' }, detail: { en: 'The output target is visible before the explanation.', zh: '先让用户看到输出目标。' } },
          { x: 77, y: 73, label: { en: 'Process line', zh: '过程描述' }, detail: { en: 'The copy points users to long video generation.', zh: '文案引导用户关注长视频生成。' } }
        ]
      },
      {
        id: 'xl-prompts',
        title: { en: '02-2 / Script prompts: give the video a readable plan', zh: '02-2 / 脚本提示：先给长视频一个可读的计划' },
        sequenceLabel: { en: 'Script prompts', zh: '脚本提示' },
        asset: '/projects/nuwa-series/verified/xl-02-input-prompts.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAXL',
        alt: { en: 'NUWA XL original long video input prompt cards.', zh: 'NUWA XL 原站 long video input prompt 卡片。' },
        userProblem: {
          en: 'Without the source prompts, a long video feels like a magic trick. Users cannot tell what the model was trying to follow.',
          zh: '如果没有源 prompt，长视频很像一个魔法结果。用户不知道模型到底在跟随什么。'
        },
        designDecision: {
          en: 'I put script cards next to the process rail. Each card gives one beat of the video before the user watches the result.',
          zh: '我把脚本卡片放在流程旁边。每张卡片先交代一个视频节点，再让用户看生成结果。'
        },
        whyItWorks: {
          en: 'Text cards are quick to scan. They make the timeline feel planned instead of accidental.',
          zh: '文字卡片很容易扫读，也让时间线看起来是有计划的，而不是随机拼出来的。'
        },
        userBenefit: {
          en: 'Later, users can judge whether the generated frames actually follow the intended beats.',
          zh: '后面用户可以判断生成帧有没有跟上这些剧情节点。'
        },
        caption: {
          en: 'The video starts as a readable plan, not an unexplained output.',
          zh: '长视频先是一组可读的计划，而不是一个无法解释的结果。'
        },
        callouts: [
          { x: 11, y: 37, label: { en: 'Process rail', zh: '流程轨道' }, detail: { en: 'Users see where input sits in the generation path.', zh: '用户知道 input 位于生成路径的起点。' } },
          { x: 58, y: 31, label: { en: 'Script cards', zh: '脚本卡片' }, detail: { en: 'Each card describes one video beat.', zh: '每张卡片描述一个剧情节点。' } },
          { x: 84, y: 72, label: { en: 'Scannable grid', zh: '可扫读网格' }, detail: { en: 'The story can be read before playback.', zh: '播放前就能先读懂故事结构。' } }
        ]
      },
      {
        id: 'xl-generate-stage',
        title: { en: '02-3 / Generate stage: keep the process visible while frames are made', zh: '02-3 / 生成阶段：让用户看到视频正在分步生成' },
        sequenceLabel: { en: 'Generate stage', zh: '生成阶段' },
        asset: '/projects/nuwa-series/verified/xl-03-generate-frames-stage.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAXL',
        alt: { en: 'NUWA XL original page with Generate frames stage selected.', zh: 'NUWA XL 原站 Generate frames 阶段选中状态。' },
        userProblem: {
          en: 'If the page jumps straight from prompts to output, users miss the point: the model is building a sequence in stages.',
          zh: '如果页面从 prompt 直接跳到结果，用户会错过重点：模型是在分阶段搭建一段序列。'
        },
        designDecision: {
          en: 'I used a process rail with named steps: input, generate, frame states, and output.',
          zh: '我用流程轨道标出 input、generate、frame states 和 output。'
        },
        whyItWorks: {
          en: 'A rail is simple, but useful here. It lets users see progress without leaving the web demo for a paper diagram.',
          zh: '流程轨道很简单，但在这里有效。用户不用跳到论文图，也能跟住生成过程。'
        },
        userBenefit: {
          en: 'Users can say what stage they are looking at instead of only watching a clip play.',
          zh: '用户能说清自己正在看哪个阶段，而不是只被动看视频播放。'
        },
        caption: {
          en: 'The original web rail turns the generation stage into something users can follow.',
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
        title: { en: '02-4 / Example browsing: show that the model handles more than one case', zh: '02-4 / 示例浏览：让用户看到模型不只会生成一个案例' },
        sequenceLabel: { en: 'Example browsing', zh: '示例浏览' },
        asset: '/projects/nuwa-series/verified/xl-04-short-video-carousel.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAXL',
        alt: { en: 'NUWA XL original short video example carousel.', zh: 'NUWA XL 原站 short video 示例横向浏览区域。' },
        userProblem: {
          en: 'One generated video can look cherry-picked. Visitors need to see variation before they trust the demo.',
          zh: '一个生成视频很容易像被精挑细选过的结果。用户需要看到变化，才会相信这是可重复能力。'
        },
        designDecision: {
          en: 'I used a horizontal browsing area for multiple examples, so the page could show range without breaking the flow.',
          zh: '我用横向示例浏览承载多个案例，让页面在不打断流程的情况下展示范围。'
        },
        whyItWorks: {
          en: 'Cards and carousel controls are familiar. Users can compare clips quickly and move on.',
          zh: '卡片和横向控制很熟悉，用户可以快速比较不同结果，再继续往下看。'
        },
        userBenefit: {
          en: 'Users can see that the model handles multiple prompts and visual styles, beyond a single clip.',
          zh: '用户能看到模型支持多种 prompt 和视觉风格，而不是只有一个视频。'
        },
        caption: {
          en: 'The examples stay inside the demo page, so comparison feels like part of the experience.',
          zh: '示例比较留在 demo 页面里，因此不是额外说明，而是体验的一部分。'
        },
        callouts: [
          { x: 21, y: 27, label: { en: 'Short video label', zh: 'Short video 标签' }, detail: { en: 'The page separates this section from long video.', zh: '页面把 short video 和 long video 区分开。' } },
          { x: 56, y: 48, label: { en: 'Example cards', zh: '示例卡片' }, detail: { en: 'Each card is a browsable generated case.', zh: '每张卡片都是可浏览的生成案例。' } },
          { x: 95, y: 30, label: { en: 'Carousel control', zh: '横向控制' }, detail: { en: 'Users can move through examples.', zh: '用户可以横向切换案例。' } }
        ]
      },
      {
        id: 'xl-output-step',
        title: { en: '02-5 / Output step: make the final video feel earned', zh: '02-5 / 输出步骤：让最终视频成为流程的结果' },
        sequenceLabel: { en: 'Output step', zh: '输出步骤' },
        asset: '/projects/nuwa-series/verified/xl-05-output-step.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAXL',
        alt: { en: 'NUWA XL original page with Output Video step selected.', zh: 'NUWA XL 原站 Output Video 阶段选中状态。' },
        userProblem: {
          en: 'The final video should not feel detached from the prompts and frame stages that came before it.',
          zh: '最终视频不应该和前面的 prompt、frame 阶段脱节。'
        },
        designDecision: {
          en: 'I kept Output Video as the last state in the same rail, after prompts and frame generation.',
          zh: '我把 Output Video 保留在同一条流程轨道里，作为 prompts 和 frame generation 之后的最后状态。'
        },
        whyItWorks: {
          en: 'The result reads as the end of a process the user has already followed.',
          zh: '最终结果会被理解成前面流程的结尾。'
        },
        userBenefit: {
          en: 'Users can connect the output back to the script and generation steps.',
          zh: '用户能把最终输出和前面的脚本、生成阶段连接起来。'
        },
        caption: {
          en: 'The output stays tied to the prompts and frame states that explain where it came from.',
          zh: '输出结果仍然和 prompt、frame 状态连在一起，用户知道它从哪里来。'
        },
        callouts: [
          { x: 11, y: 78, label: { en: 'Output Video state', zh: 'Output Video 状态' }, detail: { en: 'The process reaches the final step.', zh: '流程进入最终输出。' } },
          { x: 58, y: 31, label: { en: 'Script remains visible', zh: '脚本仍然可见' }, detail: { en: 'The result stays tied to input prompts.', zh: '输出仍然和输入提示相关联。' } },
          { x: 12, y: 52, label: { en: 'Frame states', zh: '帧阶段' }, detail: { en: 'Intermediate states remain in the path.', zh: '中间阶段仍留在路径中。' } }
        ]
      }
    ],
    liveDemo: {
      title: { en: 'Follow the original NUWA XL page', zh: '沿着原始 NUWA XL 页面看一遍' },
      subtitle: { en: 'Understand long video generation through scripts, stages, and examples', zh: '通过脚本、阶段和示例理解长视频生成' },
      connection: {
        en: 'Use the original page to follow the same sequence: intro, script prompts, generate stage, examples, output.',
        zh: '可以沿着原站再走一遍：介绍、脚本提示、生成阶段、示例、输出。'
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
      en: 'NUWA XL shows how I made long video generation readable on the page itself. The script cards explain the source, the rail shows the stages, and examples let users compare results before treating the final video as proof.',
      zh: 'NUWA XL 的重点是把长视频生成留在页面里讲清楚。脚本卡片解释来源，流程轨道说明阶段，示例浏览让用户比较结果，最终视频才有说服力。'
    }
  },
  {
    id: 'drag',
    label: { en: 'Project 03 / DragNUWA', zh: 'Project 03 / DragNUWA' },
    title: {
      en: 'Letting users draw motion instead of describing it perfectly',
      zh: '让用户画出运动，而不是逼他们用文字说清楚'
    },
    theme: { en: 'Direct motion control', zh: '直接运动控制' },
    coreQuestion: {
      en: 'How do you help users control direction, path, and camera movement when text alone is too vague?',
      zh: '当文字很难说清方向、路径和镜头运动时，怎样让用户直接控制？'
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
        title: { en: '03-1 / Gallery entry: let people see motion cases before reading theory', zh: '03-1 / Gallery 入口：先让用户看到运动案例' },
        sequenceLabel: { en: 'Gallery', zh: '示例入口' },
        asset: '/projects/nuwa-series/verified/drag-01-gallery-grid.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/DragNUWA',
        alt: { en: 'DragNUWA original demo gallery screen.', zh: 'DragNUWA 原始 demo gallery 页面。' },
        userProblem: {
          en: 'Prompt can describe a scene, but it is bad at precise movement: direction, path, speed, camera angle.',
          zh: 'Prompt 可以描述场景，但很难精确表达运动：方向、路径、速度、镜头角度。'
        },
        designDecision: {
          en: 'I opened with a gallery grid so users could see different motion examples before dealing with the control model.',
          zh: '我用 gallery grid 作为入口，让用户先看不同运动示例，再理解控制方式。'
        },
        whyItWorks: {
          en: 'The grid turns “controllable video generation” into a set of concrete cases users can scan.',
          zh: '网格把“可控视频生成”变成一组用户可以扫读的具体案例。'
        },
        userBenefit: {
          en: 'Users get a visual starting point before they read about trajectory control.',
          zh: '用户在理解 trajectory control 之前，先有一个视觉起点。'
        },
        caption: {
          en: 'The first screen uses examples, not theory, to explain what kind of motion can be controlled.',
          zh: '第一屏用例子，而不是理论，说明哪些运动可以被控制。'
        },
        callouts: [
          { x: 20, y: 9, label: { en: 'DragNUWA nav', zh: 'DragNUWA 导航' }, detail: { en: 'The user is inside the original NUWA site.', zh: '用户处在 NUWA 原站中。' } },
          { x: 50, y: 42, label: { en: 'Example grid', zh: '示例网格' }, detail: { en: 'Cases show varied motion contexts.', zh: '示例展示不同运动场景。' } },
          { x: 82, y: 72, label: { en: 'Video tiles', zh: '视频 tile' }, detail: { en: 'Each tile suggests motion can be inspected.', zh: '每个 tile 都提示运动可被查看。' } }
        ]
      },
      {
        id: 'drag-intro-video',
        title: { en: '03-2 / Intro video: show why motion needs another input', zh: '03-2 / Intro video：先说明为什么运动需要另一种输入' },
        sequenceLabel: { en: 'Intro video', zh: '介绍视频' },
        asset: '/projects/nuwa-series/verified/drag-02-intro-video.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/DragNUWA',
        alt: { en: 'DragNUWA original intro video screen.', zh: 'DragNUWA 原站介绍视频页面。' },
        userProblem: {
          en: 'Users can write “a car moves forward,” but the sentence still does not say the exact path or camera behavior.',
          zh: '用户可以写“车向前移动”，但这句话仍然说不清具体路径和镜头变化。'
        },
        designDecision: {
          en: 'I used an intro video to frame DragNUWA as a control problem, separate from a generic video generation demo.',
          zh: '我用介绍视频把 DragNUWA 定义成控制问题，而不只是另一个视频生成 demo。'
        },
        whyItWorks: {
          en: 'Seeing movement first makes the trajectory input feel necessary instead of decorative.',
          zh: '先看到运动，用户才会理解 trajectory input 不是装饰，而是必要控制。'
        },
        userBenefit: {
          en: 'Users understand the purpose of the upcoming scene and path controls.',
          zh: '用户能理解后续场景选择和路径控制的目的。'
        },
        caption: {
          en: 'The page sets up the three-input idea early: text for intent, image for context, trajectory for motion.',
          zh: '页面很早就建立三种输入关系：text 说意图，image 给上下文，trajectory 控制运动。'
        },
        callouts: [
          { x: 32, y: 45, label: { en: 'Motion video', zh: '运动视频' }, detail: { en: 'Movement is shown before instructions.', zh: '先展示运动效果。' } },
          { x: 72, y: 48, label: { en: 'Control framing', zh: '控制框架' }, detail: { en: 'The text names text, image, and trajectory.', zh: '文案点明三种输入。' } },
          { x: 72, y: 73, label: { en: 'Paper link', zh: '论文入口' }, detail: { en: 'Research context stays secondary.', zh: '研究入口保留为次级。' } }
        ]
      },
      {
        id: 'drag-complex-trajectories',
        title: { en: '03-3 / Scene selection: make the path belong to a real scene', zh: '03-3 / 场景选择：让轨迹依附在具体画面上' },
        sequenceLabel: { en: 'Scene selection', zh: '场景选择' },
        asset: '/projects/nuwa-series/verified/drag-03-complex-trajectories.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/DragNUWA',
        alt: { en: 'DragNUWA original complex trajectories scene selection screen.', zh: 'DragNUWA 原站 complex trajectories 场景选择页面。' },
        userProblem: {
          en: 'A red path means nothing until the user knows what object or camera it controls.',
          zh: '一条红色轨迹本身没有意义，除非用户知道它控制的是哪个物体或镜头。'
        },
        designDecision: {
          en: 'I made scene selection come before trajectory interpretation. First choose the world, then understand the path.',
          zh: '我把场景选择放在理解轨迹之前：先选世界，再理解路径。'
        },
        whyItWorks: {
          en: 'The scene gives the path a coordinate system. Users can reason about where the motion starts and ends.',
          zh: '场景给轨迹一个坐标系，用户才能判断运动从哪里开始、到哪里结束。'
        },
        userBenefit: {
          en: 'Users can reason about movement relative to a visible environment.',
          zh: '用户能基于可见环境来理解运动方向和路径。'
        },
        caption: {
          en: 'The original interface makes trajectory control sequential: select a scene first, then read the path.',
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
        title: { en: '03-4 / Camera movement: separate the motion pattern from the scene', zh: '03-4 / 镜头运动：把运动模式和画面内容分开看' },
        sequenceLabel: { en: 'Camera movement', zh: '镜头运动' },
        asset: '/projects/nuwa-series/verified/drag-04-camera-movement.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/DragNUWA',
        alt: { en: 'DragNUWA original camera movement examples screen.', zh: 'DragNUWA 原站 camera movements 示例页面。' },
        userProblem: {
          en: 'When everything changes at once, users cannot tell whether they are looking at a different scene or a different motion pattern.',
          zh: '如果画面和运动一起变，用户很难判断变化来自场景，还是来自运动模式。'
        },
        designDecision: {
          en: 'I separated camera movement examples and used repeated previews so the motion difference is easier to spot.',
          zh: '我把 camera movement 单独拆出来，用重复预览帮助用户看出运动差异。'
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
          en: 'The repeated previews make the variable clear: here, the thing to compare is movement.',
          zh: '重复预览让变量变清楚：这一屏要比较的是运动。'
        },
        callouts: [
          { x: 16, y: 18, label: { en: 'Scene strip', zh: '场景条' }, detail: { en: 'Users can compare available examples.', zh: '用户可以比较可用示例。' } },
          { x: 46, y: 48, label: { en: 'Paired previews', zh: '并列预览' }, detail: { en: 'Repeated frames make movement comparable.', zh: '重复画面让运动差异可比较。' } },
          { x: 13, y: 82, label: { en: 'Movement label', zh: '运动标签' }, detail: { en: 'The section names the interaction focus.', zh: '标题明确当前关注运动。' } }
        ]
      },
      {
        id: 'drag-text-image-drag',
        title: { en: '03-5 / Text + image + drag: keep all three controls in one view', zh: '03-5 / Text + image + drag：把三种控制关系放在同一屏' },
        sequenceLabel: { en: 'Text + image + drag', zh: 'Text + image + drag' },
        asset: '/projects/nuwa-series/verified/drag-05-text-image-drag.png',
        assetSource: 'original-nuwa-website',
        sourceUrl: 'https://nuwa-infinity.microsoft.com/#/DragNUWA',
        alt: { en: 'DragNUWA original text image drag section.', zh: 'DragNUWA 原站 text image drag 区域。' },
        userProblem: {
          en: 'Users need to see what each input does. Otherwise text, image, and drag feel like three unrelated requirements.',
          zh: '用户需要看懂每种输入负责什么，否则 text、image、drag 会像三个互不相关的要求。'
        },
        designDecision: {
          en: 'I kept the input thumbnails, trajectory example, and output preview together so users can read the relationship at once.',
          zh: '我把输入缩略图、轨迹示例和输出预览放在一起，让用户一次看懂关系。'
        },
        whyItWorks: {
          en: 'The mapping becomes visible: text says intent, image fixes the scene, drag tells the motion.',
          zh: '映射关系变得可见：text 说意图，image 固定场景，drag 说明怎么动。'
        },
        userBenefit: {
          en: 'Users can understand controllable generation without reading the paper figure first.',
          zh: '用户不用先看论文图，也能理解可控生成的输入关系。'
        },
        caption: {
          en: 'This is the clearest interaction proof: the control model is visible without a paper figure.',
          zh: '这是最直接的交互证据：不用论文图，控制模型已经在界面里可见。'
        },
        callouts: [
          { x: 25, y: 32, label: { en: 'Input examples', zh: '输入示例' }, detail: { en: 'Thumbnails define starting states.', zh: '缩略图定义起始状态。' } },
          { x: 45, y: 67, label: { en: 'Drag control', zh: 'Drag 控制' }, detail: { en: 'The control action is shown beside the result.', zh: '控制动作和结果并列出现。' } },
          { x: 79, y: 46, label: { en: 'Output preview', zh: '输出预览' }, detail: { en: 'Users see what the combined inputs produce.', zh: '用户看到组合输入产生什么结果。' } }
        ]
      }
    ],
    liveDemo: {
      title: { en: 'Try motion control through trajectory', zh: '用 trajectory 理解运动控制' },
      subtitle: { en: 'Understand controllable video generation through paths', zh: '用轨迹理解可控视频生成' },
      connection: {
        en: 'Use the original page to look for the control chain: text, image, trajectory, generated motion.',
        zh: '可以在原站里看这条控制链：text、image、trajectory、generated motion。'
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
      en: 'DragNUWA shows a shift I cared about a lot: users should not have to describe motion perfectly in text. They can point, draw, and then judge whether the generated video follows that path.',
      zh: 'DragNUWA 最重要的转变是：用户不必把运动全都用文字说清楚。他们可以指、可以画，再判断生成视频有没有跟上这条路径。'
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
      en: 'The first page makes outpainting feel like a place users can enter, not a term they have to decode.',
      zh: '第一屏把 outpainting 做成用户可以进入的场景，而不是需要先理解的术语。'
    },
    note: { en: 'NUWA-Infinity hero', zh: 'NUWA-Infinity 头图' }
  },
  {
    image: '/projects/nuwa-series/verified/xl-01-intro.png',
    accent: '#F6C65B',
    title: { en: 'NUWA XL / Long video generation', zh: 'NUWA XL / 长视频生成' },
    body: {
      en: 'The page points users toward scripts, stages, and examples before the final video becomes the proof.',
      zh: '页面先把用户带向脚本、阶段和示例，最终视频才成为证明。'
    },
    note: { en: 'NUWA XL hero', zh: 'NUWA XL 头图' }
  },
  {
    image: '/projects/nuwa-series/verified/drag-02-intro-video.png',
    accent: '#FF665C',
    title: { en: 'DragNUWA / Direct motion control', zh: 'DragNUWA / 直接运动控制' },
    body: {
      en: 'The demo makes trajectory visible early, so motion control does not stay trapped inside prompt text.',
      zh: 'Demo 很早就把 trajectory 显示出来，让运动控制不被困在 prompt 里。'
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
  <div className="overflow-hidden rounded-[18px] border border-white/10 bg-[#09090A] shadow-[0_30px_90px_rgba(0,0,0,0.36)]">
    <div className="flex min-h-11 items-center gap-3 border-b border-white/10 bg-white/[0.045] px-4 py-2">
      <div className="flex shrink-0 items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
      </div>
      <div className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/30 px-3 py-1.5 font-mono text-[11px] text-white/45">
        <span className="block truncate">{sourceLabel}</span>
      </div>
      {status === 'needs-real-screenshot' && (
        <span className="hidden rounded-full border border-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/50 sm:inline-flex">
          placeholder
        </span>
      )}
    </div>
    <div className="grid xl:grid-cols-[minmax(0,1fr)_255px]">
      <div className="relative flex min-h-[300px] items-center justify-center bg-[radial-gradient(circle_at_30%_15%,rgba(255,255,255,0.08),transparent_34%),#000] p-3 sm:p-4">
        {status === 'needs-real-screenshot' || !asset ? (
          <div className="grid min-h-[380px] w-full place-items-center rounded-[14px] border border-dashed border-white/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))] p-8 text-center">
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
          <div className="relative w-full overflow-hidden rounded-[14px] border border-white/8 bg-black">
            <img src={assetUrl(asset)} alt={alt} className="block max-h-[680px] w-full object-contain" />
            <div className="pointer-events-none absolute inset-0 hidden md:block">
              {callouts.slice(0, 3).map((callout, index) => (
                <span
                  key={`${callout.label.en}-${index}`}
                  className="absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/75 bg-black/76 text-xs font-bold text-white ring-4 ring-black/28"
                  style={{ left: `${callout.x}%`, top: `${callout.y}%`, boxShadow: `0 0 0 1px ${accent}99` }}
                >
                  {index + 1}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="border-t border-white/10 bg-[#101012] p-4 sm:p-5 xl:border-l xl:border-t-0">
        <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">
          {isZh ? '截图标注' : 'Screenshot notes'}
        </p>
        <div className="space-y-4">
          {callouts.slice(0, 3).map((callout, index) => (
            <div key={`${callout.label.en}-rail-${index}`} className="grid grid-cols-[30px_minmax(0,1fr)] gap-3 border-b border-white/8 pb-4 last:border-b-0 last:pb-0">
              <span className="grid h-7 w-7 place-items-center rounded-full text-xs font-bold text-neutral-950" style={{ backgroundColor: accent }}>
                {index + 1}
              </span>
              <div>
                <p className="text-xs font-semibold text-white">{c(callout.label, isZh)}</p>
                <p className="mt-1 text-xs leading-5 text-white/54">{c(callout.detail, isZh)}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-5 border-t border-white/8 pt-4 text-[11px] leading-5 text-white/38">
          {isZh ? '截图来自原 NUWA 网站；编号只帮助读者定位界面区域。' : 'Screenshot captured from the original NUWA website; numbers only help locate the interface areas.'}
        </p>
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
    }, 18000);

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
        <div className="rounded-[26px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] p-4 shadow-[0_28px_90px_rgba(0,0,0,0.28)] sm:p-6">
          <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="font-serif text-sm italic tracking-wide" style={{ color: accent }}>{c(demo.subtitle, isZh)}</p>
              <h3 className="mt-4 text-3xl font-bold leading-tight sm:text-5xl">{c(demo.title, isZh)}</h3>
              <p className="mt-4 text-sm leading-7 text-white/64">{c(demo.connection, isZh)}</p>
            </div>
            <a href={demo.url} target="_blank" rel="noopener noreferrer" className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200">
              <ExternalLink size={14} />
              {isZh ? '打开完整 demo' : 'Open full demo'}
            </a>
          </div>
          <div className="grid gap-5 lg:grid-cols-[315px_minmax(0,1fr)] lg:items-start">
            <aside className="rounded-[18px] border border-white/10 bg-black/28 p-5 lg:sticky lg:top-8">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: accent }}>
                {c(demo.guideTitle, isZh)}
              </p>
              <div className="mt-5 space-y-4">
                {demo.guideSteps.map((step, index) => (
                  <div key={`${step.en}-${index}`} className="grid grid-cols-[30px_minmax(0,1fr)] gap-3">
                    <span className="grid h-7 w-7 place-items-center rounded-full text-xs font-bold text-neutral-950" style={{ backgroundColor: accent }}>
                      {index + 1}
                    </span>
                    <p className="text-sm leading-6 text-white/74">{c(step, isZh)}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-white/10 pt-4 text-xs leading-5 text-white/45">
                {isZh
                  ? '读者可以按同一条路径验证：入口、输入、边界或阶段、结果判断。'
                  : 'Use this window to verify the same path: entry, input, boundary or stage, and result judgment.'}
              </p>
            </aside>
            <div className="overflow-hidden rounded-[18px] border border-white/10 bg-[#0A0A0B] shadow-[0_24px_72px_rgba(0,0,0,0.32)]">
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
                {isZh ? '打开完整 demo' : 'Open full demo'}
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
                        ? '如果无法在作品集内加载，可以新窗口打开，或先用这张预览图定位对应界面。'
                        : 'If it does not load inside the portfolio, open it in a new tab or use this preview frame to locate the interface.'}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a href={demo.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200">
                        <ExternalLink size={14} />
                        {isZh ? '打开完整 demo' : 'Open full demo'}
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
          {isZh ? '把早期生成式 AI 做成用户真的能试的网页体验' : 'Turning early generative AI demos into web experiences people could actually try'}
        </h1>
        <p className="mt-6 max-w-3xl text-base leading-8 text-white/74 sm:text-xl">
          {isZh
            ? '这组项目不是把研究结果放到网页上，而是把三个难懂的模型能力拆成用户能做的动作：往画面外扩、沿时间看视频、在图上画运动路径。'
            : 'This series was not about putting research results onto a website. I broke three hard-to-read model behaviors into actions people could perform: extend an image, follow time in a video, and draw motion on a picture.'}
        </p>
        <p className="mt-5 max-w-3xl text-sm leading-7 text-white/64">
          {isZh
            ? '当时没有太多成熟的 AI UX pattern 可以参考。我的设计工作更像翻译：理解研究模型能做什么，再把它变成 prompt、gallery、边界、timeline、trajectory 这些用户已经熟悉的界面动作。'
            : 'At the time, there were not many mature AI UX patterns to borrow from. My job was closer to translation: understand what the research model could do, then turn it into familiar interface actions such as prompt, gallery, boundary, timeline, and trajectory.'}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#nuwa-series-walkthrough" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200">
            <ArrowRight size={16} />
            {isZh ? '查看交互拆解' : 'View interaction walkthrough'}
          </a>
          <a href="https://nuwa-infinity.microsoft.com/#/NUWAInfinity" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-black/28 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
            <ExternalLink size={16} />
            {isZh ? '打开原始 demo' : 'Try original demo'}
          </a>
        </div>
        <div className="mt-8 flex flex-wrap gap-5 text-xs uppercase tracking-[0.18em] text-white/45">
          <span>2022-2023</span>
          <span>Interaction Design / Web Experience Design</span>
          <span>Microsoft Research AI Demo Series</span>
        </div>
      </div>
      <div className="grid gap-4 lg:pl-3">
        {heroPreviewCards.map((card) => (
          <div key={card.image} className="grid gap-4 rounded-[18px] border border-white/10 bg-black/46 p-3 backdrop-blur-md sm:grid-cols-[165px_minmax(0,1fr)] lg:grid-cols-[150px_minmax(0,1fr)]">
            <div className="aspect-[16/10] overflow-hidden rounded-[12px] bg-black sm:aspect-[4/3]">
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
          ? '我想证明的是：非技术用户也可以通过亲手操作理解 AI 模型，而不是只能读一段研究说明。'
          : 'The point was simple: non-technical visitors should be able to understand the model by trying it before reading a research description.'}
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
            {isZh ? '模型很强，但用户第一眼关心的是：我能做什么？' : 'The model was strong, but the first user question was much simpler: what can I do here?'}
          </h2>
          <p className="mt-6 text-sm leading-7 text-white/62">
            {isZh
              ? 'NUWA 系列的难点不只是信息架构。真正的问题是，用户第一次打开网页时，不一定知道 prompt 要怎么写、outpainting 发生在哪里、长视频为什么需要时间线，或者 trajectory 到底控制什么。'
              : 'The NUWA series had an information architecture layer, but the real issue was comprehension. On a first visit, people might not know what to type, where outpainting happens, why long video needs a timeline, or what a trajectory actually controls.'}
          </p>
          <div className="mt-8 overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.04]">
            {[
              { en: 'Where can I start?', zh: '我可以从哪里开始？' },
              { en: 'What happens after I input or choose?', zh: '我输入或选择之后会发生什么？' },
              { en: 'Which part do I control, and which part does AI generate?', zh: '哪一部分是我控制的，哪一部分是 AI 生成的？' },
              { en: 'Can I compare, continue, adjust, or explore after the result appears?', zh: '结果出现后，我还能比较、继续、调整或探索吗？' }
            ].map((item, index) => (
              <div key={item.en} className="grid grid-cols-[34px_minmax(0,1fr)] gap-3 border-b border-white/8 p-4 last:border-b-0">
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
          <p className="mt-4 rounded-[14px] border border-white/10 bg-white/[0.035] px-4 py-3 text-xs leading-5 text-white/56">
            {isZh
              ? '这一屏先回答“我能不能操作、从哪里开始”，再把用户带到 Prompt、Gallery、Outpainting 和 Preview。'
              : 'This screen answers two basic questions first: can I operate this, and where do I begin? Only then does the page move into Prompt, Gallery, Outpainting, and Preview.'}
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
        {isZh ? '三个项目对应三个越来越具体的控制问题' : 'Three projects, three increasingly specific control problems'}
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
                {project.id === 'infinity' ? (isZh ? '生成可以往外扩' : 'Generation becomes spatial') : project.id === 'xl' ? (isZh ? '生成可以沿时间读' : 'Generation becomes temporal') : (isZh ? '生成可以被画出来' : 'Generation becomes drawable')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const EvidenceBlock: React.FC<{ project: NuwaProject; point: EvidencePoint; index: number; isZh: boolean }> = ({ project, point, index, isZh }) => {
  const insightRows = [
    { label: { en: 'Where users get stuck', zh: '用户会卡在哪里' }, body: point.userProblem },
    { label: { en: 'Design move', zh: '我的设计动作' }, body: point.designDecision },
    { label: { en: 'Why it helps', zh: '为什么这样有用' }, body: point.whyItWorks },
    { label: { en: 'What users gain', zh: '用户得到什么' }, body: point.userBenefit }
  ];

  return (
    <section className="bg-[#070707] text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:px-8 sm:py-20 md:px-12 lg:grid-cols-[minmax(280px,0.36fr)_minmax(0,0.64fr)] lg:gap-10">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="border-l-2 pl-5" style={{ borderColor: project.accent }}>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/36">
              {c(project.label, isZh)} / {String(index + 1).padStart(2, '0')} of {project.evidence.length}
            </p>
            <p className="mt-4 font-serif text-sm italic tracking-wide" style={{ color: project.accent }}>{c(point.sequenceLabel, isZh)}</p>
            <h3 className="mt-4 text-2xl font-bold leading-tight sm:text-[2.45rem] sm:leading-[1.08]">{c(point.title, isZh)}</h3>
          </div>
          <div className="mt-7 overflow-hidden rounded-[18px] border border-white/10 bg-white/[0.045]">
            {insightRows.map((item, itemIndex) => (
              <div key={item.label.en} className="grid gap-3 border-b border-white/8 p-4 last:border-b-0 sm:grid-cols-[116px_minmax(0,1fr)]">
                <div className="flex items-center gap-2 sm:block">
                  <span className="inline-grid h-6 w-6 place-items-center rounded-full text-[11px] font-bold text-neutral-950 sm:mb-3" style={{ backgroundColor: project.accent }}>
                    {itemIndex + 1}
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/45">{c(item.label, isZh)}</p>
                </div>
                <p className="text-sm leading-6 text-white/68">{c(item.body, isZh)}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <BrowserEvidence
            asset={point.asset}
            alt={c(point.alt, isZh)}
            sourceLabel={point.sourceUrl}
            accent={project.accent}
            callouts={point.callouts}
            isZh={isZh}
            status={point.status}
          />
          <div className="mt-4 grid gap-3 rounded-[14px] border border-white/10 bg-white/[0.035] px-4 py-3 sm:grid-cols-[132px_minmax(0,1fr)] sm:items-start">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: project.accent }}>
              {isZh ? '这张图在说明' : 'This screen shows'}
            </p>
            <p className="text-xs leading-5 text-white/58">{c(point.caption, isZh)}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectSection: React.FC<{ project: NuwaProject; isZh: boolean }> = ({ project, isZh }) => (
  <div id={project.id === 'infinity' ? 'nuwa-series-walkthrough' : undefined}>
    <section className="relative overflow-hidden bg-[#070707] text-white">
      <div className="absolute inset-x-0 top-0 h-px opacity-70" style={{ backgroundColor: project.accent }} />
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 sm:py-24 md:px-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
        <div className="lg:sticky lg:top-8">
          <p className="font-serif text-sm italic tracking-wide" style={{ color: project.accent }}>{c(project.label, isZh)}</p>
          <h2 className="mt-5 text-3xl font-bold leading-tight sm:text-5xl">{c(project.title, isZh)}</h2>
          <p className="mt-5 text-base leading-8 text-white/68">{c(project.coreQuestion, isZh)}</p>
          <ol className="mt-8 grid gap-2 sm:grid-cols-5 lg:grid-cols-1">
            {project.sequence.map((step, index) => (
              <li key={step.en} className="grid grid-cols-[34px_minmax(0,1fr)] items-center gap-3 rounded-[14px] border border-white/10 bg-white/[0.04] px-3 py-3">
                <span className="grid h-7 w-7 place-items-center rounded-full text-[11px] font-bold text-neutral-950" style={{ backgroundColor: project.accent }}>
                  {index + 1}
                </span>
                <span className="text-xs font-semibold leading-5 text-white/72">{c(step, isZh)}</span>
              </li>
            ))}
          </ol>
        </div>
        <div>
          <BrowserEvidence
            asset={project.heroImage}
            alt={c(project.title, isZh)}
            sourceLabel={project.id === 'infinity' ? 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity' : project.id === 'xl' ? 'https://nuwa-infinity.microsoft.com/#/NUWAXL' : 'https://nuwa-infinity.microsoft.com/#/DragNUWA'}
            accent={project.accent}
            isZh={isZh}
            callouts={[
              { x: 18, y: 22, label: { en: c(project.theme, false), zh: c(project.theme, true) }, detail: { en: c(project.coreQuestion, false), zh: c(project.coreQuestion, true) } },
              { x: 48, y: 58, label: { en: 'Real interface', zh: '真实界面' }, detail: { en: 'The chapter starts from the original demo.', zh: '章节从原始 demo 画面开始。' } },
              { x: 82, y: 78, label: { en: 'Browsing order', zh: '浏览顺序' }, detail: { en: 'The following blocks unpack this exact page flow.', zh: '后续模块按这个页面浏览顺序拆解。' } }
            ]}
          />
          <p className="mt-4 rounded-[14px] border border-white/10 bg-white/[0.035] px-4 py-3 text-xs leading-5 text-white/56">
            {isZh
              ? '这一章先看原网页的入口画面，再按左侧顺序拆解五个界面证据点。'
              : 'This chapter starts with the original entry screen, then unpacks five interface evidence points in the order shown on the left.'}
          </p>
        </div>
      </div>
    </section>
    {project.evidence.map((point, index) => (
      <EvidenceBlock key={point.id} project={project} point={point} index={index} isZh={isZh} />
    ))}
    <LiveDemoFrame demo={project.liveDemo} accent={project.accent} isZh={isZh} />
    <section className="bg-[#070707] text-white">
      <div className="mx-auto max-w-7xl px-6 pb-16 sm:px-8 sm:pb-24 md:px-12">
        <div className="rounded-[22px] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.025))] p-6 sm:p-8">
          <div className="border-l-2 pl-5" style={{ borderColor: project.accent }}>
            <p className="font-serif text-sm italic tracking-wide" style={{ color: project.accent }}>{isZh ? '设计价值' : 'Design value'}</p>
            <p className="mt-4 max-w-4xl text-xl leading-9 text-white/82 sm:text-3xl sm:leading-tight">{c(project.designValue, isZh)}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

const FrameworkSection: React.FC<{ isZh: boolean }> = ({ isZh }) => (
  <section className="bg-[#070707] text-white">
    <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 md:px-12">
      <p className="font-serif text-sm italic tracking-wide text-white/50">Interaction translation</p>
      <h2 className="mt-5 max-w-3xl text-3xl font-bold leading-tight sm:text-5xl">
        {isZh ? '我用同一套方法处理三种陌生能力' : 'The same design method across three unfamiliar model behaviors'}
      </h2>
      <div className="mt-12 grid gap-5 lg:grid-cols-3">
        {nuwaProjects.map((project) => {
          const rows = project.id === 'infinity'
            ? {
                model: { en: 'Continue generating beyond an existing image.', zh: '根据已有图像继续生成边界之外的内容。' },
                action: { en: 'Treat the picture like a canvas with an edge users can move past.', zh: '把图片当成一块有边界、可以继续往外看的画布。' },
                path: { en: 'Prompt / Gallery -> Current image -> Boundary -> Continuation -> Preview', zh: 'Prompt / Gallery → 当前图像 → 扩展边界 → 生成延展 → 预览对比' },
                value: { en: 'The user understands outpainting by inspecting where the new area joins the old one.', zh: '用户通过检查新旧画面的接缝，理解 outpainting 到底做了什么。' }
              }
            : project.id === 'xl'
              ? {
                  model: { en: 'Generate video across a long time range.', zh: '生成跨越长时间范围的视频。' },
                  action: { en: 'Read the script, follow the generation stage, then compare examples.', zh: '先读脚本，再跟随生成阶段，最后比较示例。' },
                  path: { en: 'Task intro -> Script prompts -> Generate stage -> Example browsing -> Output step', zh: '介绍任务 → 脚本提示 → 生成阶段 → 示例浏览 → 输出步骤' },
                  value: { en: 'The final video is no longer a black box. Users can see the plan and the stages behind it.', zh: '最终视频不再像黑箱。用户能看到它背后的计划和阶段。' }
                }
              : {
                  model: { en: 'Control video generation with text, image, and trajectory.', zh: '用 text、image、trajectory 控制视频生成。' },
                  action: { en: 'Write the intent, choose the image, draw the path on top of it.', zh: '写下意图，选择图片，再直接在图上画路径。' },
                  path: { en: 'Text intent -> Image context -> Draw trajectory -> Generated motion -> Compare', zh: '输入语义 → 固定场景 → 绘制轨迹 → 生成视频 → 对照结果' },
                  value: { en: 'Motion becomes something users can point to, not something they have to describe perfectly.', zh: '运动变成用户可以指出来的东西，而不是必须用文字精准描述。' }
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
      body: { en: 'In NUWA-Infinity, I used Enter, Prompt, and Gallery to answer the first question before any model term appeared: where do I start?', zh: '在 NUWA-Infinity 里，我先用 Enter、Prompt 和 Gallery 回答最早的问题：我从哪里开始？' }
    },
    {
      accent: themeById('xl').accent,
      title: { en: 'I mapped model behavior to interface actions', zh: '我把模型行为映射成界面动作' },
      body: { en: 'Outpainting became an edge users could extend. Long video became scripts and stages. Motion control became a path drawn on the image.', zh: 'Outpainting 变成可以扩展的边界，长视频变成脚本和阶段，运动控制变成图像上的路径。' }
    },
    {
      accent: themeById('drag').accent,
      title: { en: 'I designed around AI uncertainty', zh: '我围绕 AI 结果的不确定性设计' },
      body: { en: 'The pages give users review moments: preview the result, compare examples, check the stage, and decide whether to keep exploring.', zh: '页面给用户留下 review 的时刻：预览结果、比较示例、查看阶段，再决定是否继续探索。' }
    },
    {
      accent: themeById('infinity').secondaryAccent,
      title: { en: 'I made research demos understandable without reading papers', zh: '我让用户不读论文也能理解 research demo' },
      body: { en: 'The explanation happens on the product surface. A non-technical visitor can learn by entering the demo, not by jumping to the paper first.', zh: '解释发生在产品界面上。非技术用户可以先进入 demo 理解，而不是先跳去读论文。' }
    },
    {
      accent: themeById('drag').secondaryAccent,
      title: { en: 'I used playful interaction purposefully', zh: '我有目的地使用 playful interaction' },
      body: { en: 'The playful parts had a job. Canvas edges, cards, rails, galleries, and drag paths made the new AI behavior less strange.', zh: '这些 playful 的部分都有任务。画布边界、卡片、流程轨道、gallery 和拖拽路径，都是为了让新 AI 行为没那么陌生。' }
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

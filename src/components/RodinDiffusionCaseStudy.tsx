import React, { useMemo, useState } from 'react';
import {
  ArrowRight,
  ExternalLink,
  FileText,
  Layers3,
  MousePointer2,
  Play,
  Rotate3D,
  Sparkles,
} from 'lucide-react';
import { assetUrl } from '../utils/assets';

type LangCopy = {
  zh: string;
  en: string;
};

type RodinDiffusionCaseStudyProps = {
  isZh: boolean;
};

type EvidenceItem = {
  index: string;
  title: LangCopy;
  claim: LangCopy;
  userProblem: LangCopy;
  designDecision: LangCopy;
  value: LangCopy;
  caption: LangCopy;
  mediaType: 'image' | 'video' | 'comparison' | 'gallery' | 'diagram';
  image?: string;
  poster?: string;
  video?: string;
  alt: LangCopy;
  callouts: {
    label: LangCopy;
    detail: LangCopy;
  }[];
};

const SITE_URL = 'https://3d-avatar-diffusion.microsoft.com/';
const PAPER_URL = 'https://arxiv.org/abs/2212.06135';
const ASSET_ROOT = '/projects/rodin-diffusion/original-site';

const t = (copy: LangCopy, isZh: boolean) => (isZh ? copy.zh : copy.en);
const media = (fileName: string) => assetUrl(`${ASSET_ROOT}/${fileName}`);

const promptSamples = [
  {
    id: 'prompt-01',
    title: { zh: '文字生成样例 01', en: 'Text sample 01' },
    prompt: {
      zh: 'A young woman with short hair, cinematic light, neutral expression.',
      en: 'A young woman with short hair, cinematic light, neutral expression.',
    },
    poster: 'prompt-01-cover.jpg',
    video: 'prompt-01-video.mp4',
  },
  {
    id: 'prompt-02',
    title: { zh: '文字生成样例 02', en: 'Text sample 02' },
    prompt: {
      zh: 'A stylized male avatar with silver hair and clean facial details.',
      en: 'A stylized male avatar with silver hair and clean facial details.',
    },
    poster: 'prompt-02-cover.jpg',
    video: 'prompt-02-video.mp4',
  },
  {
    id: 'prompt-03',
    title: { zh: '文字生成样例 03', en: 'Text sample 03' },
    prompt: {
      zh: 'A 3D digital avatar with realistic skin, fashion portrait lighting.',
      en: 'A 3D digital avatar with realistic skin, fashion portrait lighting.',
    },
    poster: 'prompt-03-cover.jpg',
    video: 'prompt-03-video.mp4',
  },
  {
    id: 'prompt-04',
    title: { zh: '文字生成样例 04', en: 'Text sample 04' },
    prompt: {
      zh: 'A character portrait with expressive eyes and high-detail hair.',
      en: 'A character portrait with expressive eyes and high-detail hair.',
    },
    poster: 'prompt-04-cover.jpg',
    video: 'prompt-04-video.mp4',
  },
];

const editOptions = [
  {
    id: 'base',
    label: { zh: '原始结果', en: 'Original' },
    poster: 'portrait-result-cover.jpg',
    video: 'portrait-result-video.mp4',
  },
  {
    id: 'blonde',
    label: { zh: 'Blonde hair', en: 'Blonde hair' },
    poster: 'edit-blonde-cover.jpg',
    video: 'edit-blonde-video.mp4',
  },
  {
    id: 'glasses',
    label: { zh: 'With glasses', en: 'With glasses' },
    poster: 'edit-glasses-cover.jpg',
    video: 'edit-glasses-video.mp4',
  },
  {
    id: 'beards',
    label: { zh: 'With beard', en: 'With beard' },
    poster: 'edit-beards-cover.jpg',
    video: 'edit-beards-video.mp4',
  },
  {
    id: 'smiling',
    label: { zh: 'Smiling', en: 'Smiling' },
    poster: 'edit-smiling-cover.jpg',
    video: 'edit-smiling-video.mp4',
  },
];

const evidenceItems: EvidenceItem[] = [
  {
    index: '01',
    title: {
      zh: '先让读者看到“最后会得到什么”',
      en: 'Start by showing what the visitor can get',
    },
    claim: {
      zh: '我把入口设计成“先看 3D avatar 结果，再进入技术说明”。',
      en: 'I designed the entry around the final 3D avatar before asking readers to absorb the research.',
    },
    userProblem: {
      zh: '第一次打开 research demo 的用户不一定理解 tri-plane、NeRF 或 diffusion，但他们能立刻判断一个 3D 头像是否真实、是否可旋转、是否值得继续看。',
      en: 'First-time visitors may not understand tri-plane, NeRF, or diffusion, but they can quickly read whether a 3D avatar looks real, rotates, and is worth inspecting.',
    },
    designDecision: {
      zh: 'Hero 使用真实渲染头像和简短入口，不先堆论文术语。读者先看到结果，再被引导去看 portrait、text prompt、viewer 和 editing。',
      en: 'The hero uses real rendered avatars and a short entry path. It shows the result first, then guides readers into portrait input, text prompts, viewer, and editing.',
    },
    value: {
      zh: '招聘方能看到我的判断：复杂 AI demo 的第一页要回答“这个模型最后变成什么体验”，而不是只证明技术很复杂。',
      en: 'This shows my design judgment: the first screen of a complex AI demo should answer what the model becomes as an experience, not merely prove the technology is complex.',
    },
    caption: {
      zh: '真实官网 hero 素材：结果先出现，技术说明往后放。',
      en: 'Real official hero asset: result first, technical explanation later.',
    },
    mediaType: 'video',
    poster: 'hero-cover-01.jpg',
    video: 'hero-video-01.mp4',
    alt: {
      zh: 'Rodin Diffusion 官网的 3D avatar hero 视频帧。',
      en: 'RODIN Diffusion official hero video frame showing a generated 3D avatar.',
    },
    callouts: [
      {
        label: { zh: '结果先行', en: 'Result first' },
        detail: { zh: '先展示可检查的头像，而不是从论文概念开始。', en: 'The page starts with an inspectable avatar, not paper terms.' },
      },
      {
        label: { zh: '短路径', en: 'Short path' },
        detail: { zh: '入口把读者带到输入、结果和编辑，而不是停在视觉包装。', en: 'The entry leads toward inputs, output, and editing instead of staying decorative.' },
      },
    ],
  },
  {
    index: '02',
    title: {
      zh: '把输入拆成 Portrait 和 Text 两条清楚路径',
      en: 'Split input into clear Portrait and Text paths',
    },
    claim: {
      zh: '我没有把所有能力塞进一个输入框，而是让用户先选择“从照片来”还是“从文字来”。',
      en: 'I did not collapse every capability into one input. I let users choose whether they start from a portrait or from text.',
    },
    userProblem: {
      zh: '3D avatar generation 的入口很容易变得含糊：用户不知道自己需要上传照片、写 prompt，还是直接看样例。',
      en: 'The entry to 3D avatar generation can feel vague: users may not know whether they should upload a portrait, write a prompt, or browse examples.',
    },
    designDecision: {
      zh: '我把页面内容组织成两种可理解的起点：Portrait-guided creation 说明“从人像到 3D 头像”，Text-guided creation 说明“从描述到角色”。',
      en: 'I organized the page around two understandable starts: Portrait-guided creation explains photo to 3D avatar; Text-guided creation explains description to character.',
    },
    value: {
      zh: '这让非技术读者不用猜模型输入。每一种输入都对应一组真实结果，读者能把“我做什么”和“AI 返回什么”连起来。',
      en: 'Readers do not have to guess the model input. Each input type is paired with real output, so they can connect what they do with what AI returns.',
    },
    caption: {
      zh: '左侧是真实 portrait input，右侧是官网 text-guided 结果素材。',
      en: 'Left: real portrait input. Right: official text-guided output assets.',
    },
    mediaType: 'comparison',
    image: 'portrait-original.jpg',
    poster: 'prompt-01-cover.jpg',
    alt: {
      zh: 'Portrait-guided 和 Text-guided 两种输入路径的对比。',
      en: 'Comparison of portrait-guided and text-guided input paths.',
    },
    callouts: [
      {
        label: { zh: 'Portrait 起点', en: 'Portrait start' },
        detail: { zh: '用户理解为“从照片生成 3D 头像”。', en: 'The user reads it as photo to 3D avatar.' },
      },
      {
        label: { zh: 'Text 起点', en: 'Text start' },
        detail: { zh: '用户理解为“从描述生成角色”。', en: 'The user reads it as description to character.' },
      },
      {
        label: { zh: '样例兜底', en: 'Example fallback' },
        detail: { zh: '不会写 prompt 的读者仍然能从样例进入。', en: 'Visitors who do not want to write can still start from examples.' },
      },
    ],
  },
  {
    index: '03',
    title: {
      zh: '3D 结果不能只用一张平面截图解释',
      en: 'A 3D result cannot be explained with one flat screenshot',
    },
    claim: {
      zh: '我把结果展示设计成“可旋转头像 + mesh/structure 对照”。',
      en: 'I framed the result as a rotatable avatar plus a mesh/structure comparison.',
    },
    userProblem: {
      zh: '如果只放一张漂亮头像，用户看不出它是 3D，也不知道模型生成的是可检查的 avatar，而不是普通 2D 图片。',
      en: 'A single pretty portrait does not prove the result is 3D. Visitors need to see that the model generated an inspectable avatar, not a 2D image.',
    },
    designDecision: {
      zh: '页面用转台视频和 mesh 结果并排解释：一个用于看外观，一个用于理解三维结构。视觉上像一个小型 viewer，而不是静态画廊。',
      en: 'The page uses turntable video and mesh output side by side: one for appearance, one for 3D structure. It reads like a small viewer, not a static gallery.',
    },
    value: {
      zh: '这把“3D-aware generation”落到用户能看懂的证据：旋转、轮廓、体积和结构。',
      en: 'This turns 3D-aware generation into evidence people can read: rotation, contour, volume, and structure.',
    },
    caption: {
      zh: '官网 viewer 素材：avatar 外观与 mesh 结构放在同一个阅读单元里。',
      en: 'Official viewer assets: avatar appearance and mesh structure in the same reading unit.',
    },
    mediaType: 'video',
    poster: 'portrait-result-cover.jpg',
    video: 'viewer-avatar.mp4',
    alt: {
      zh: 'Rodin 3D avatar viewer 的转台展示。',
      en: 'RODIN 3D avatar viewer turntable demonstration.',
    },
    callouts: [
      {
        label: { zh: '转台观看', en: 'Turntable view' },
        detail: { zh: '让用户看到头像不是单张图。', en: 'Shows the avatar is not a single image.' },
      },
      {
        label: { zh: '结构对照', en: 'Structure check' },
        detail: { zh: 'mesh 让 3D 生成结果更可信、更可解释。', en: 'Mesh makes the 3D output easier to trust and explain.' },
      },
    ],
  },
  {
    index: '04',
    title: {
      zh: '把语义编辑做成可点选、可对比的变化',
      en: 'Make semantic editing selectable and comparable',
    },
    claim: {
      zh: '我用编辑 chip 组织“blonde hair / glasses / beard / smiling”等变化，让用户看到文字如何改变同一个 avatar。',
      en: 'I used edit chips for changes like blonde hair, glasses, beard, and smiling, so users can see how text changes the same avatar.',
    },
    userProblem: {
      zh: '“Text-guided avatar editing”很抽象。用户需要知道编辑是换一个人，还是在同一个人身上改属性。',
      en: 'Text-guided avatar editing is abstract. Users need to know whether editing creates a new person or modifies attributes on the same avatar.',
    },
    designDecision: {
      zh: '编辑项保持同一个原始头像上下文，只改变一个语义属性。每个 chip 对应一个结果视频，减少理解负担。',
      en: 'Each edit keeps the same original avatar context and changes one semantic attribute. Every chip maps to one result video.',
    },
    value: {
      zh: '用户能直接比较“原始结果”和“编辑后结果”，理解模型可控性，而不是只看一组随机生成图。',
      en: 'Visitors can compare original and edited results directly, so controllability becomes visible instead of feeling like random image generation.',
    },
    caption: {
      zh: '真实官网 editing 素材：每个语义修改都有对应结果。',
      en: 'Real official editing assets: each semantic change has a matching result.',
    },
    mediaType: 'gallery',
    image: 'edit-original.jpg',
    alt: {
      zh: 'Text-guided avatar editing 的原图与编辑结果。',
      en: 'Text-guided avatar editing source and edited results.',
    },
    callouts: [
      {
        label: { zh: '同一身份', en: 'Same identity' },
        detail: { zh: '先固定头像，再比较属性变化。', en: 'Keep the avatar constant before comparing attributes.' },
      },
      {
        label: { zh: '单一语义', en: 'One semantic change' },
        detail: { zh: '一次只解释一个改动，读者更容易判断效果。', en: 'One edit at a time makes the effect easier to read.' },
      },
      {
        label: { zh: '可对比', en: 'Comparable' },
        detail: { zh: '从原始结果切到编辑结果，控制感更明确。', en: 'Switching from original to edited result makes control explicit.' },
      },
    ],
  },
  {
    index: '05',
    title: {
      zh: '把研究 pipeline 写成读者能跟上的流程',
      en: 'Translate the research pipeline into a readable flow',
    },
    claim: {
      zh: '我把技术说明从论文语言拆成“输入 → 控制信号 → 3D-aware diffusion → avatar viewer → editing”的阅读顺序。',
      en: 'I translated the technical story into input, control signal, 3D-aware diffusion, avatar viewer, and editing.',
    },
    userProblem: {
      zh: '研究页面需要解释模型为什么特殊，但如果一上来就是架构图，非技术读者很快会断开。',
      en: 'A research page has to explain why the model matters, but a raw architecture diagram can lose non-technical readers quickly.',
    },
    designDecision: {
      zh: '先用界面证据建立直觉，再用流程解释：图片或文字进入模型，模型生成可旋转 3D avatar，最后允许语义编辑。',
      en: 'The page builds intuition with UI evidence first, then explains the flow: image or text enters the model, the model generates a rotatable 3D avatar, then semantic editing modifies it.',
    },
    value: {
      zh: '这让项目从“论文展示页”变成可沟通的 research demo。面试官能看到我如何处理技术、内容和前端呈现之间的关系。',
      en: 'This turns the project from a paper display into a communicable research demo. It shows how I connect technology, content, and front-end presentation.',
    },
    caption: {
      zh: '流程图不是论文复刻，而是把官网内容转成作品集里可读的解释顺序。',
      en: 'This flow is not a paper replica. It turns the official content into a readable portfolio explanation.',
    },
    mediaType: 'diagram',
    alt: {
      zh: 'Rodin 从输入到 3D avatar 和语义编辑的流程图。',
      en: 'Flow diagram from input to 3D avatar and semantic editing.',
    },
    callouts: [
      {
        label: { zh: '输入清楚', en: 'Clear input' },
        detail: { zh: '照片和文字是两种起点。', en: 'Portrait and text are two starts.' },
      },
      {
        label: { zh: '结果可检查', en: 'Inspectable output' },
        detail: { zh: '输出被放进 viewer，而不是只放图。', en: 'Output goes into a viewer, not a single image.' },
      },
      {
        label: { zh: '编辑继续发生', en: 'Editing continues' },
        detail: { zh: '结果不是终点，还能继续被语义修改。', en: 'The result is not the endpoint; semantic edits continue the flow.' },
      },
    ],
  },
];

const BrowserFrame: React.FC<{
  urlLabel: string;
  children: React.ReactNode;
  caption?: string;
  className?: string;
}> = ({ urlLabel, children, caption, className = '' }) => (
  <figure className={`overflow-hidden rounded-[18px] border border-white/10 bg-[#0D0E12] shadow-[0_24px_70px_rgba(0,0,0,0.34)] ${className}`}>
    <div className="flex min-h-12 items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2">
      <div className="flex items-center gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
      </div>
      <div className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 font-mono text-[11px] text-white/42">
        <span className="block truncate">{urlLabel}</span>
      </div>
    </div>
    {children}
    {caption ? <figcaption className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-white/50">{caption}</figcaption> : null}
  </figure>
);

const AutoVideo: React.FC<{
  src: string;
  poster: string;
  alt: string;
  className?: string;
}> = ({ src, poster, alt, className = '' }) => (
  <video
    src={media(src)}
    poster={media(poster)}
    className={`h-full w-full object-cover ${className}`}
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    aria-label={alt}
  />
);

const EvidenceVisual: React.FC<{ item: EvidenceItem; isZh: boolean }> = ({ item, isZh }) => {
  const caption = t(item.caption, isZh);

  if (item.mediaType === 'comparison') {
    return (
      <BrowserFrame urlLabel="3d-avatar-diffusion.microsoft.com / input modes" caption={caption}>
        <div className="grid bg-[#07080B] md:grid-cols-2">
          <div className="border-b border-white/10 p-4 md:border-b-0 md:border-r">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/42">Portrait-guided</p>
            <div className="overflow-hidden rounded-xl bg-black">
              <img src={media(item.image || 'portrait-original.jpg')} alt={t(item.alt, isZh)} className="aspect-square w-full object-cover" />
            </div>
          </div>
          <div className="p-4">
            <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/42">Text-guided</p>
            <div className="overflow-hidden rounded-xl bg-black">
              <img src={media(item.poster || 'prompt-01-cover.jpg')} alt={t(item.alt, isZh)} className="aspect-square w-full object-cover" />
            </div>
          </div>
        </div>
      </BrowserFrame>
    );
  }

  if (item.mediaType === 'gallery') {
    return (
      <BrowserFrame urlLabel="3d-avatar-diffusion.microsoft.com / text-guided editing" caption={caption}>
        <div className="bg-[#07080B] p-4">
          <div className="grid gap-3 sm:grid-cols-5">
            {editOptions.map((option) => (
              <div key={option.id} className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                <img src={media(option.poster)} alt={t(option.label, isZh)} className="aspect-square w-full object-cover" />
                <p className="border-t border-white/10 px-2 py-2 text-center text-[11px] font-medium text-white/62">{t(option.label, isZh)}</p>
              </div>
            ))}
          </div>
        </div>
      </BrowserFrame>
    );
  }

  if (item.mediaType === 'diagram') {
    const steps = [
      { icon: FileText, title: { zh: 'Portrait / Text', en: 'Portrait / Text' }, body: { zh: '先让用户选择起点', en: 'Let the visitor choose a start' } },
      { icon: Sparkles, title: { zh: 'Control signal', en: 'Control signal' }, body: { zh: '把输入变成模型控制条件', en: 'Turn input into model control' } },
      { icon: Layers3, title: { zh: '3D-aware diffusion', en: '3D-aware diffusion' }, body: { zh: '解释生成不是单张图', en: 'Explain it is not a single image' } },
      { icon: Rotate3D, title: { zh: 'Avatar viewer', en: 'Avatar viewer' }, body: { zh: '用转台展示体积与轮廓', en: 'Use rotation to show volume' } },
      { icon: MousePointer2, title: { zh: 'Semantic edit', en: 'Semantic edit' }, body: { zh: '继续用文字改变属性', en: 'Keep editing with language' } },
    ];

    return (
      <BrowserFrame urlLabel="portfolio explanation / RODIN interaction translation" caption={caption}>
        <div className="bg-[#07080B] p-4 sm:p-6">
          <div className="grid gap-3 lg:grid-cols-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={t(step.title, isZh)} className="relative rounded-xl border border-white/10 bg-white/[0.04] p-4">
                  {index < steps.length - 1 ? (
                    <ArrowRight className="absolute -right-5 top-1/2 z-10 hidden -translate-y-1/2 text-white/28 lg:block" size={22} />
                  ) : null}
                  <Icon size={22} className="text-[#A996FF]" />
                  <h4 className="mt-4 text-sm font-semibold text-white">{t(step.title, isZh)}</h4>
                  <p className="mt-2 text-xs leading-5 text-white/52">{t(step.body, isZh)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </BrowserFrame>
    );
  }

  return (
    <BrowserFrame urlLabel="3d-avatar-diffusion.microsoft.com / real visual evidence" caption={caption}>
      <div className="relative aspect-[16/10] bg-[#050507]">
        {item.mediaType === 'video' && item.video && item.poster ? (
          <AutoVideo src={item.video} poster={item.poster} alt={t(item.alt, isZh)} />
        ) : (
          <img src={media(item.image || item.poster || 'hero-cover-01.jpg')} alt={t(item.alt, isZh)} className="h-full w-full object-cover" />
        )}
        {item.index === '03' ? (
          <div className="absolute bottom-4 right-4 hidden w-[36%] overflow-hidden rounded-xl border border-white/15 bg-black/65 p-2 shadow-[0_18px_44px_rgba(0,0,0,0.36)] md:block">
            <AutoVideo src="viewer-mesh.mp4" poster="portrait-result-cover.jpg" alt={isZh ? 'Rodin mesh viewer 视频' : 'RODIN mesh viewer video'} />
            <p className="mt-2 px-1 text-[10px] uppercase tracking-[0.16em] text-white/50">Mesh / structure view</p>
          </div>
        ) : null}
      </div>
    </BrowserFrame>
  );
};

const EvidenceSection: React.FC<{ item: EvidenceItem; isZh: boolean }> = ({ item, isZh }) => (
  <section className="border-t border-white/10 py-14 sm:py-20">
    <div className="grid gap-8 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:items-start">
      <div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-white/30">{item.index}</span>
          <span className="h-px flex-1 bg-white/10" />
        </div>
        <h3 className="mt-6 text-2xl font-semibold leading-tight text-white sm:text-4xl">{t(item.title, isZh)}</h3>
        <p className="mt-5 text-lg leading-8 text-white/78">{t(item.claim, isZh)}</p>

        <div className="mt-8 space-y-4">
          {[
            { label: isZh ? '用户会卡在哪里' : 'Where users get stuck', body: t(item.userProblem, isZh) },
            { label: isZh ? '我的设计判断' : 'My design decision', body: t(item.designDecision, isZh) },
            { label: isZh ? '为什么有效' : 'Why it works', body: t(item.value, isZh) },
          ].map((block) => (
            <div key={block.label} className="rounded-[14px] border border-white/10 bg-white/[0.035] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#A996FF]">{block.label}</p>
              <p className="mt-2 text-sm leading-6 text-white/62">{block.body}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <EvidenceVisual item={item} isZh={isZh} />
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {item.callouts.map((callout, index) => (
            <div key={t(callout.label, isZh)} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3 rounded-[14px] border border-white/10 bg-white/[0.035] p-3">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[#A996FF] text-xs font-bold text-[#08080A]">{index + 1}</span>
              <div>
                <p className="text-xs font-semibold text-white">{t(callout.label, isZh)}</p>
                <p className="mt-1 text-xs leading-5 text-white/50">{t(callout.detail, isZh)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const DemoSimulator: React.FC<{ isZh: boolean }> = ({ isZh }) => {
  const [mode, setMode] = useState<'portrait' | 'text'>('portrait');
  const [selectedPromptId, setSelectedPromptId] = useState(promptSamples[0].id);
  const [selectedEditId, setSelectedEditId] = useState(editOptions[0].id);
  const [isGenerating, setIsGenerating] = useState(false);

  const selectedPrompt = useMemo(
    () => promptSamples.find((sample) => sample.id === selectedPromptId) || promptSamples[0],
    [selectedPromptId]
  );
  const selectedEdit = useMemo(
    () => editOptions.find((option) => option.id === selectedEditId) || editOptions[0],
    [selectedEditId]
  );

  const currentVideo = selectedEditId !== 'base'
    ? selectedEdit.video
    : mode === 'portrait'
      ? 'portrait-result-video.mp4'
      : selectedPrompt.video;
  const currentPoster = selectedEditId !== 'base'
    ? selectedEdit.poster
    : mode === 'portrait'
      ? 'portrait-result-cover.jpg'
      : selectedPrompt.poster;

  const handleGenerate = () => {
    setIsGenerating(true);
    window.setTimeout(() => setIsGenerating(false), 900);
  };

  return (
    <section id="rodin-live-demo" className="border-t border-white/10 py-16 sm:py-24">
      <div className="mb-10 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#A996FF]">Try the precomputed interaction</span>
          <h3 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-5xl">
            {isZh ? '把官网 demo 变成可读、可点的交互证据' : 'Turn the official demo into readable, clickable evidence'}
          </h3>
        </div>
        <p className="text-sm leading-7 text-white/58 sm:text-base">
          {isZh
            ? '这里不是实时跑模型。我用官网真实样例做一个 portfolio 内的 demo simulator，让面试官不用离开页面，也能理解输入、生成、检查和编辑的顺序。'
            : 'This does not run real-time inference. It uses real official examples as a portfolio demo simulator, so interviewers can understand input, generation, inspection, and editing without leaving the page.'}
        </p>
      </div>

      <BrowserFrame urlLabel="portfolio sandbox / precomputed RODIN demo" className="bg-[#090A0D]">
        <div className="grid min-h-[720px] bg-[#07080B] lg:grid-cols-[330px_minmax(0,1fr)_290px]">
          <aside className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/38">{isZh ? '选择起点' : 'Choose a start'}</p>
            <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl border border-white/10 bg-black/30 p-1">
              {[
                { id: 'portrait' as const, label: isZh ? 'Portrait' : 'Portrait' },
                { id: 'text' as const, label: isZh ? 'Text' : 'Text' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setMode(tab.id);
                    setSelectedEditId('base');
                  }}
                  className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                    mode === tab.id ? 'bg-white text-[#08080A]' : 'text-white/54 hover:bg-white/8 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mt-5">
              {mode === 'portrait' ? (
                <>
                  <p className="mb-3 text-xs leading-5 text-white/50">
                    {isZh ? '从照片进入时，读者能直接理解“输入人像 → 生成 3D avatar”。' : 'A portrait start makes the path direct: input portrait to generated 3D avatar.'}
                  </p>
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-black">
                    <img src={media('portrait-original.jpg')} alt={isZh ? 'Portrait-guided input' : 'Portrait-guided input'} className="aspect-square w-full object-cover" />
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  {promptSamples.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      onClick={() => {
                        setSelectedPromptId(sample.id);
                        setSelectedEditId('base');
                      }}
                      className={`grid w-full grid-cols-[58px_minmax(0,1fr)] gap-3 rounded-xl border p-2 text-left transition ${
                        selectedPromptId === sample.id ? 'border-[#A996FF] bg-[#A996FF]/12' : 'border-white/10 bg-white/[0.035] hover:bg-white/[0.07]'
                      }`}
                    >
                      <img src={media(sample.poster)} alt={t(sample.title, isZh)} className="h-14 w-14 rounded-lg object-cover" />
                      <span>
                        <span className="block text-xs font-semibold text-white">{t(sample.title, isZh)}</span>
                        <span className="mt-1 line-clamp-2 block text-[11px] leading-4 text-white/48">{t(sample.prompt, isZh)}</span>
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={handleGenerate}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#A996FF] px-4 py-3 text-sm font-semibold text-[#08080A] transition hover:bg-[#C8BFFF]"
            >
              <Play size={16} />
              {isZh ? '生成预览' : 'Generate preview'}
            </button>
          </aside>

          <main className="relative min-h-[520px] bg-black">
            <AutoVideo src={currentVideo} poster={currentPoster} alt={isZh ? 'Rodin 预生成结果视频' : 'RODIN precomputed result video'} />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.16)_0%,rgba(0,0,0,0)_42%,rgba(0,0,0,0.58)_100%)]" />
            {isGenerating ? (
              <div className="absolute inset-0 grid place-items-center bg-black/68 backdrop-blur-sm">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-2 border-white/18 border-t-white" />
                  <p className="text-sm font-semibold text-white">{isZh ? '模拟生成中...' : 'Simulating generation...'}</p>
                  <p className="mt-2 text-xs text-white/45">{isZh ? '使用官网预生成样例，不运行实时模型。' : 'Using official precomputed examples, not live inference.'}</p>
                </div>
              </div>
            ) : null}
            <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/10 bg-black/55 p-4 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A996FF]">
                {mode === 'portrait' ? 'Portrait-guided Avatar Creation' : 'Text-guided Avatar Creation'}
              </p>
              <p className="mt-2 text-sm leading-6 text-white/70">
                {mode === 'portrait'
                  ? isZh
                    ? '这条路径说明用户上传或选择一张人像后，页面如何把结果呈现为可检查的 3D avatar。'
                    : 'This path shows how a portrait input becomes an inspectable 3D avatar on the page.'
                  : t(selectedPrompt.prompt, isZh)}
              </p>
            </div>
          </main>

          <aside className="border-t border-white/10 p-5 lg:border-l lg:border-t-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/38">{isZh ? '4 步阅读方式' : '4-step reading guide'}</p>
            <ol className="mt-4 space-y-4">
              {[
                {
                  title: isZh ? '选择输入模式' : 'Choose input mode',
                  body: isZh ? 'Portrait 解释照片到头像；Text 解释 prompt 到角色。' : 'Portrait explains photo to avatar; Text explains prompt to character.',
                },
                {
                  title: isZh ? '运行预览' : 'Run preview',
                  body: isZh ? '按钮模拟等待状态，说明真实 demo 需要反馈，而不是突然换图。' : 'The button simulates waiting feedback instead of swapping output abruptly.',
                },
                {
                  title: isZh ? '检查 3D 结果' : 'Inspect 3D result',
                  body: isZh ? '转台视频证明这是可观看的三维对象，不只是图片。' : 'The turntable video proves the output is a viewable 3D object, not only an image.',
                },
                {
                  title: isZh ? '尝试语义编辑' : 'Try semantic edit',
                  body: isZh ? '切换 chip 看同一个 avatar 如何按文字改变属性。' : 'Switch chips to see how text changes attributes on the same avatar.',
                },
              ].map((step, index) => (
                <li key={step.title} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-xs font-semibold text-white">{index + 1}</span>
                  <span>
                    <span className="block text-sm font-semibold text-white">{step.title}</span>
                    <span className="mt-1 block text-xs leading-5 text-white/50">{step.body}</span>
                  </span>
                </li>
              ))}
            </ol>

            <div className="mt-6">
              <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/38">{isZh ? '语义编辑' : 'Semantic edits'}</p>
              <div className="flex flex-wrap gap-2">
                {editOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedEditId(option.id)}
                    className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${
                      selectedEditId === option.id
                        ? 'border-[#A996FF] bg-[#A996FF] text-[#08080A]'
                        : 'border-white/10 bg-white/[0.04] text-white/58 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {t(option.label, isZh)}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 rounded-xl border border-[#A996FF]/30 bg-[#A996FF]/10 p-4">
              <p className="text-xs leading-5 text-white/62">
                {isZh
                  ? '说明：这个模块用 Rodin 官网真实素材做交互复现，用来展示我如何组织 demo 体验；它不复制官网代码，也不运行模型。'
                  : 'Note: this module uses real RODIN site assets to recreate the interaction flow for portfolio explanation. It does not copy site code or run the model.'}
              </p>
            </div>

            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white/72 transition hover:bg-white/10 hover:text-white"
            >
              <ExternalLink size={16} />
              {isZh ? '打开原始网站' : 'Open original site'}
            </a>
          </aside>
        </div>
      </BrowserFrame>
    </section>
  );
};

const RodinDiffusionCaseStudy: React.FC<RodinDiffusionCaseStudyProps> = ({ isZh }) => {
  return (
    <article className="bg-[#07080B] text-white">
      <section className="relative min-h-[720px] overflow-hidden">
        <div className="absolute inset-0">
          <AutoVideo src="hero-video-01.mp4" poster="hero-cover-01.jpg" alt={isZh ? 'Rodin Diffusion 官网 hero 视频' : 'RODIN Diffusion official hero video'} className="opacity-82" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,8,11,0.94)_0%,rgba(7,8,11,0.68)_42%,rgba(7,8,11,0.2)_100%),linear-gradient(180deg,rgba(7,8,11,0.18)_0%,rgba(7,8,11,0.92)_92%)]" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-7xl flex-col justify-end px-6 py-14 sm:px-8 md:px-12">
          <div className="max-w-4xl">
            <span className="font-mono text-xs uppercase tracking-[0.26em] text-[#A996FF]">Microsoft Research Asia · 3D Avatar Generation</span>
            <h1 className="mt-7 max-w-4xl text-[2.65rem] font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              {isZh ? 'RODIN Diffusion — 把 3D 头像生成讲成可操作的网页体验' : 'RODIN Diffusion — Making 3D avatar generation readable on the web'}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
              {isZh
                ? '我的工作不是把研究结果包装成漂亮页面，而是把 portrait、text prompt、3D viewer 和 semantic editing 串成一条用户能跟上的 demo 路径。'
                : 'My work was not to wrap a research result in a nice page. It was to connect portrait input, text prompts, 3D viewing, and semantic editing into a demo path people could follow.'}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#rodin-live-demo" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#08080A] transition hover:bg-[#E7E1FF]">
                <Play size={16} />
                {isZh ? '体验页面内 demo' : 'Try in-page demo'}
              </a>
              <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white/74 transition hover:bg-white/12 hover:text-white">
                <ExternalLink size={16} />
                {isZh ? '打开原始网站' : 'Open original site'}
              </a>
            </div>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-3">
            {[
              { label: isZh ? '我的角色' : 'My role', value: isZh ? '交互设计 / 网站体验 / 前端实现' : 'Interaction design / Web experience / Front-end implementation' },
              { label: isZh ? '项目类型' : 'Project type', value: isZh ? 'Microsoft Research 生成式 AI demo' : 'Microsoft Research generative AI demo' },
              { label: isZh ? '核心任务' : 'Core task', value: isZh ? '把复杂 3D 生成能力转成用户可理解路径' : 'Translate complex 3D generation into a readable user path' },
            ].map((item) => (
              <div key={item.label} className="rounded-[14px] border border-white/10 bg-black/34 p-4 backdrop-blur-md">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/36">{item.label}</p>
                <p className="mt-2 text-sm leading-6 text-white/72">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 md:px-12">
        <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#A996FF]">Project context / Design challenge</span>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-5xl">
              {isZh ? '难点不是“展示 3D”，而是让用户知道自己在控制什么。' : 'The hard part was not showing 3D. It was helping users know what they control.'}
            </h2>
          </div>
          <div className="grid gap-4">
            {[
              {
                title: isZh ? '研究能力本身很新' : 'The research capability was new',
                body: isZh
                  ? 'Rodin 可以从 portrait、text 或随机噪声生成高细节 3D avatar。页面需要解释输入方式、结果形态和编辑方式。'
                  : 'RODIN can generate high-detail 3D avatars from portrait, text, or random noise. The page needed to explain input mode, result format, and editing behavior.',
              },
              {
                title: isZh ? '用户第一次访问会不知道看哪里' : 'First-time users may not know where to look',
                body: isZh
                  ? '如果先展示论文术语，用户很难把能力和界面动作连起来。我需要先建立“输入什么、看到什么、还能改什么”的顺序。'
                  : 'If the page starts with paper terms, users struggle to connect the capability with page actions. I needed to establish what to input, what to inspect, and what can still be changed.',
              },
              {
                title: isZh ? '我的设计重点是 interaction translation' : 'My design focus was interaction translation',
                body: isZh
                  ? '我把技术能力转成常见网页动作：选择入口、查看样例、播放转台、对比 mesh、点击语义编辑。'
                  : 'I translated technical capability into familiar web actions: choose an entry, browse examples, play a turntable, compare mesh, and click semantic edits.',
              },
            ].map((item) => (
              <div key={item.title} className="rounded-[14px] border border-white/10 bg-white/[0.035] p-5">
                <h3 className="text-base font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-white/58">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-4 sm:grid-cols-4">
          {[
            { title: '01', body: isZh ? '先看结果' : 'Result first' },
            { title: '02', body: isZh ? '拆清输入' : 'Clarify input' },
            { title: '03', body: isZh ? '检查 3D' : 'Inspect 3D' },
            { title: '04', body: isZh ? '继续编辑' : 'Keep editing' },
          ].map((item) => (
            <div key={item.title} className="rounded-[14px] border border-white/10 bg-[#A996FF]/8 p-5">
              <span className="font-mono text-xs text-[#A996FF]">{item.title}</span>
              <p className="mt-4 text-lg font-semibold text-white">{item.body}</p>
            </div>
          ))}
        </div>

        {evidenceItems.map((item) => (
          <EvidenceSection key={item.index} item={item} isZh={isZh} />
        ))}

        <DemoSimulator isZh={isZh} />

        <section className="border-t border-white/10 py-16 sm:py-24">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-[#A996FF]">What this project shows</span>
              <h2 className="mt-5 text-3xl font-semibold leading-tight text-white sm:text-5xl">
                {isZh ? '这个项目证明的是我的交互组织能力。' : 'This project shows my ability to organize interaction around research.'}
              </h2>
            </div>
            <div className="grid gap-4">
              {[
                {
                  title: isZh ? '我能先读懂模型能力，再设计页面路径' : 'I can read the model capability before designing the page path',
                  body: isZh
                    ? 'Portrait、text、viewer、editing 不是四块孤立内容，而是一条从输入到控制的体验链路。'
                    : 'Portrait, text, viewer, and editing are not isolated blocks. They form a path from input to control.',
                },
                {
                  title: isZh ? '我会把技术证据做成用户可检查的界面' : 'I turn technical evidence into inspectable UI',
                  body: isZh
                    ? '转台、mesh、编辑前后对比让 3D generation 和 semantic editing 不停留在概念层。'
                    : 'Turntable, mesh, and before/after edits keep 3D generation and semantic editing out of abstract language.',
                },
                {
                  title: isZh ? '我不会用 fancy 视觉掩盖交互问题' : 'I do not use fancy visuals to hide interaction problems',
                  body: isZh
                    ? '视觉服务于阅读顺序：先看结果，再看输入，再看控制，再看模型为什么可信。'
                    : 'The visuals serve the reading order: result first, then input, control, and why the model is credible.',
                },
              ].map((item) => (
                <div key={item.title} className="rounded-[14px] border border-white/10 bg-white/[0.035] p-5">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-white/58">{item.body}</p>
                </div>
              ))}
              <div className="flex flex-wrap gap-3 pt-2">
                <a href={SITE_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#08080A] transition hover:bg-[#E7E1FF]">
                  <ExternalLink size={16} />
                  {isZh ? '查看原始 Rodin 网站' : 'View original RODIN site'}
                </a>
                <a href={PAPER_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-sm font-semibold text-white/62 transition hover:bg-white/10 hover:text-white">
                  <FileText size={16} />
                  {isZh ? '查看论文' : 'View paper'}
                </a>
              </div>
            </div>
          </div>
        </section>
      </section>
    </article>
  );
};

export default RodinDiffusionCaseStudy;

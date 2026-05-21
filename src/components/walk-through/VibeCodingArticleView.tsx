import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Clock3,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Github,
  Image as ImageIcon,
  ImagePlus,
  Layers3,
  MousePointerClick,
  Play,
  RefreshCcw,
  Send,
  Server,
  Sparkles,
  Upload,
  Wand2,
  Workflow,
} from 'lucide-react';
import { Project } from '../../types';
import { VibeCodingArticleContent } from './vibeCodingArticles';
import { assetUrl } from '../../utils/assets';

interface VibeCodingArticleViewProps {
  content: VibeCodingArticleContent;
  project: Project;
  isZh: boolean;
}

type Purpose = 'official' | 'professional' | 'studio' | 'outdoor';
type Background = 'white' | 'grey' | 'blue';
type DemoStatus = 'empty' | 'uploaded' | 'generating' | 'done';

const LIVE_APP_URL = 'https://albellatross.github.io/elsewhere/';
const architectureImage = '/projects/vibe-coding/generated/ai-fullstack-workflow.png';
const uploadedPortrait = '/projects/vibe-coding/generated/portrait-professional-v2.png';

const purposeImages: Record<Purpose, string> = {
  official: '/projects/vibe-coding/generated/portrait-official-v2.png',
  professional: '/projects/vibe-coding/generated/portrait-professional-v2.png',
  studio: '/projects/vibe-coding/generated/portrait-studio-v2.png',
  outdoor: '/projects/vibe-coding/generated/portrait-outdoor-v2.png',
};

const backgroundColors: Record<Background, string> = {
  white: '#ffffff',
  grey: '#eeeeee',
  blue: '#dbeafe',
};

const backgroundPromptMap: Record<Background, { zh: string; en: string; chip: string }> = {
  white: {
    zh: '纯白无阴影背景，适合证件照和资料头像',
    en: 'pure white shadowless background for ID and profile use',
    chip: '#ffffff',
  },
  grey: {
    zh: '浅灰摄影棚背景，保留自然肤色和柔和层次',
    en: 'light grey studio background with natural skin tone and soft depth',
    chip: '#eeeeee',
  },
  blue: {
    zh: '浅蓝清爽背景，适合更亲和的职业展示',
    en: 'soft blue clean background for a more approachable professional look',
    chip: '#dbeafe',
  },
};

const figmaAssets = {
  designBase: '/projects/vibe-coding/figma/design-implementation-base.png',
  designOverlay: '/projects/vibe-coding/figma/design-implementation-overlay.png',
  figmaMark: '/projects/vibe-coding/figma/figma-mark.png',
  vscodeWorkflow: '/projects/vibe-coding/figma/vscode-workflow.png',
  vscodeMark: '/projects/vibe-coding/figma/vscode-mark.png',
  backendOptimization: '/projects/vibe-coding/figma/backend-optimization.png',
  antigravityMark: '/projects/vibe-coding/figma/antigravity-mark.png',
  idPhotoWorkspace: '/projects/vibe-coding/figma/id-photo-workspace.png',
  elsewhereBrowser: '/projects/vibe-coding/figma/elsewhere-browser.png',
};

const sectionTransition = (delay: number) => ({ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] as const });

const VibeCodingArticleView: React.FC<VibeCodingArticleViewProps> = ({ content, project, isZh }) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [purpose, setPurpose] = useState<Purpose>('official');
  const [background, setBackground] = useState<Background>('white');
  const [demoStatus, setDemoStatus] = useState<DemoStatus>('empty');

  const labelClass = isZh
    ? 'font-zh-body text-[11px] font-medium tracking-[0.1em] text-neutral-500'
    : 'font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500';
  const titleClass = isZh
    ? 'font-zh-display text-[30px] font-medium leading-[1.14] text-dark-brown sm:text-[40px]'
    : 'font-serif text-[36px] leading-[1.05] text-dark-brown sm:text-[50px]';
  const sectionTitleClass = isZh
    ? 'font-zh-display text-[25px] font-medium leading-[1.2] text-dark-brown sm:text-[31px]'
    : 'font-serif text-[30px] leading-[1.1] text-dark-brown sm:text-[38px]';
  const bodyClass = isZh
    ? 'font-zh-body text-[15px] leading-[1.84] text-neutral-600 sm:text-[16px]'
    : 'font-sans text-[15px] leading-[1.78] text-neutral-600 sm:text-[16px]';
  const smallClass = isZh
    ? 'font-zh-body text-[13px] leading-[1.72] text-neutral-500'
    : 'font-sans text-[13px] leading-[1.64] text-neutral-500';
  const panelClass = 'rounded-[22px] bg-white/72 p-4 shadow-[0_12px_28px_rgba(42,26,10,0.045)]';
  const sectionClass = 'rounded-[30px] bg-white/[0.46] p-5 shadow-[0_18px_44px_rgba(42,26,10,0.05)] sm:p-7';

  const purposeOptions: Array<{ id: Purpose; label: string; caption: string; prompt: string; payloadLabel: string }> = [
    {
      id: 'official',
      label: isZh ? '证件照' : 'ID photo',
      caption: isZh ? '合规、干净、正式' : 'clean and compliant',
      prompt: isZh ? '生成一张正式证件照，保持原始人像身份一致，正面构图，深色西装，表情自然克制。' : 'Generate a formal ID photo, preserve the uploaded person identity, front-facing composition, dark blazer, calm natural expression.',
      payloadLabel: 'id_photo',
    },
    {
      id: 'professional',
      label: isZh ? '职业形象' : 'Professional',
      caption: isZh ? '自然、自信、职场' : 'polished workplace look',
      prompt: isZh ? '生成一张职业头像，保持原始人像身份一致，职场环境光，米色西装，自信但不过度修饰。' : 'Generate a professional headshot, preserve the uploaded person identity, workplace light, beige blazer, confident but not over-retouched.',
      payloadLabel: 'professional_headshot',
    },
    {
      id: 'studio',
      label: isZh ? '棚拍肖像' : 'Studio',
      caption: isZh ? '柔和光线、肖像感' : 'soft portrait light',
      prompt: isZh ? '生成一张摄影棚肖像，保持原始人像身份一致，柔和主光，黑色简洁上衣，质感干净。' : 'Generate a studio portrait, preserve the uploaded person identity, soft key light, simple black top, clean editorial texture.',
      payloadLabel: 'studio_portrait',
    },
    {
      id: 'outdoor',
      label: isZh ? '户外肖像' : 'Outdoor',
      caption: isZh ? '自然光、生活感' : 'natural outdoor energy',
      prompt: isZh ? '生成一张户外自然光肖像，保持原始人像身份一致，浅色针织上衣，背景有柔和天空和绿植。' : 'Generate an outdoor natural-light portrait, preserve the uploaded person identity, light knit top, soft sky and greenery in the background.',
      payloadLabel: 'outdoor_portrait',
    },
  ];

  const backgroundOptions: Array<{ id: Background; label: string }> = [
    { id: 'white', label: isZh ? '白色' : 'White' },
    { id: 'grey', label: isZh ? '灰色' : 'Grey' },
    { id: 'blue', label: isZh ? '蓝色' : 'Blue' },
  ];

  const selectedPurpose = purposeOptions.find((option) => option.id === purpose) || purposeOptions[0];
  const selectedBackground = backgroundOptions.find((option) => option.id === background) || backgroundOptions[0];
  const selectedBackgroundPrompt = backgroundPromptMap[background];

  const evidenceItems = [
    {
      icon: ExternalLink,
      value: isZh ? '真实网页' : 'Live website',
      label: isZh ? 'iframe 从首页开始嵌入，可直接体验 Elsewhere 的动效和交互。' : 'Embedded from the homepage, so the interaction and motion can be reviewed directly.',
    },
    {
      icon: Code2,
      value: isZh ? 'AI 辅助实现' : 'AI-coded build',
      label: isZh ? '用 AI 辅助把设计意图推进到 React 页面、状态流和部署。' : 'AI-assisted coding turns design intent into React pages, state flow, and deployment.',
    },
    {
      icon: Server,
      value: isZh ? '前后端联动' : 'Front-back link',
      label: isZh ? '生成请求、模板参数、结果状态和后台记录被设计成一条产品链路。' : 'Generation request, template parameters, result state, and logs form one product loop.',
    },
  ];

  const designProblems = [
    {
      tag: isZh ? '入口问题' : 'Entry problem',
      image: figmaAssets.idPhotoWorkspace,
      problem: isZh ? '空白 prompt 框会让普通用户卡住：不知道要写什么，也不知道哪些信息会影响结果。' : 'A blank prompt box makes normal users pause: they do not know what to write or what affects the result.',
      decision: isZh ? '把“写 prompt”改成“完成任务”：先上传人像，再选用途、背景和生成。' : 'Turn “write a prompt” into “complete a task”: upload a portrait, choose purpose, choose background, generate.',
      outcome: isZh ? '用户看到的是熟悉的产品步骤，而不是一段需要自己组织的专业指令。' : 'Users see familiar product steps instead of a professional instruction they must compose alone.',
      proof: isZh ? ['上传区说明输入对象', '模板卡说明输出目标', '右侧预览说明结果位置'] : ['Upload area defines input', 'Template cards define output goal', 'Preview area sets result expectation'],
    },
    {
      tag: isZh ? '状态问题' : 'State problem',
      image: '/projects/vibe-coding/elsewhere-id-photo.png',
      problem: isZh ? 'AI 生成不是瞬间完成。如果界面没有反馈，用户会怀疑自己是否点错或系统是否失效。' : 'AI generation is not instant. Without feedback, users wonder whether they clicked wrong or the system failed.',
      decision: isZh ? '把空状态、上传完成、生成中、结果返回做成清楚的连续状态。' : 'Make empty, uploaded, generating, and returned states visible as one continuous flow.',
      outcome: isZh ? '用户每一步都知道现在发生了什么，以及下一步可以做什么。' : 'Users understand what is happening now and what they can do next.',
      proof: isZh ? ['任务图片进入输入区', '生成按钮触发请求状态', '输出框负责承接结果'] : ['Task image enters input area', 'Generate button triggers request state', 'Output frame receives the result'],
    },
    {
      tag: isZh ? '系统问题' : 'System problem',
      image: figmaAssets.backendOptimization,
      problem: isZh ? '如果只有前台页面好看，不能证明这个工具真的可以运营和扩展。' : 'A good-looking front end alone does not prove the tool can be operated or extended.',
      decision: isZh ? '设计后台入口来管理 prompt 模板、素材、provider、强度参数和日志。' : 'Design an admin entry for prompt templates, assets, providers, strength values, and logs.',
      outcome: isZh ? '前台选择会变成后端可管理的参数，case study 可以讲清楚前后端联动能力。' : 'Front-end choices become manageable back-end parameters, making the full-stack logic explainable.',
      proof: isZh ? ['模板不是写死在页面里', 'prompt 参数可以被维护', '日志和 provider 预留运营空间'] : ['Templates are not hard-coded only in UI', 'Prompt parameters can be maintained', 'Logs and providers leave room for operation'],
    },
  ];

  const liveSteps = [
    isZh ? '从首页看视觉与动效' : 'Start from the homepage',
    isZh ? '进入模板/功能页面' : 'Open a template flow',
    isZh ? '体验上传、选择和生成状态' : 'Try upload, selection, and generation states',
    isZh ? '查看结果预览与后续动作' : 'Review preview and next actions',
  ];

  const architectureLayers = [
    {
      icon: Workflow,
      title: isZh ? '设计输入' : 'Design inputs',
      body: isZh ? '页面结构、用户路径、模板分类、状态反馈和视觉语言先被定义清楚。' : 'Page structure, user path, template taxonomy, states, and visual language are defined first.',
    },
    {
      icon: Sparkles,
      title: isZh ? 'AI 辅助编码' : 'AI-assisted coding',
      body: isZh ? '用 AI 把设计拆成组件、状态、路由和可复用数据结构，再人工判断和修正体验细节。' : 'AI helps split the design into components, states, routes, and data structures, while design judgment refines the details.',
    },
    {
      icon: Database,
      title: isZh ? '后端/数据层' : 'Backend layer',
      body: isZh ? '模板参数、生成请求、结果 URL、日志和后台管理入口组成可扩展的产品系统。' : 'Template parameters, generation requests, result URLs, logs, and admin entry form an extensible system.',
    },
  ];

  const processSteps = useMemo(() => content.flowSteps.slice(0, 4), [content.flowSteps]);

  const handleFakeUpload = () => {
    setDemoStatus('uploaded');
  };

  const handleGenerate = () => {
    setDemoStatus('generating');
    window.setTimeout(() => setDemoStatus('done'), 1200);
  };

  const resetDemo = () => {
    setDemoStatus('empty');
    setPurpose('official');
    setBackground('white');
  };

  const generatedPrompt = [
    selectedPurpose.prompt,
    isZh
      ? `背景约束：${selectedBackgroundPrompt.zh}。`
      : `Background constraint: ${selectedBackgroundPrompt.en}.`,
    isZh
      ? '身份约束：保持上传人像的脸型、五官比例、发型和自然表情，不做换脸或过度美化。'
      : 'Identity constraint: preserve face shape, facial proportions, hairstyle, and natural expression from the uploaded portrait. No face swap or over-beautification.',
  ].join('\n\n');

  const requestPayload = {
    route: '/api/generate/portrait-preview',
    sourceAsset: demoStatus === 'empty' ? 'waiting_for_upload' : 'uploaded_portrait.jpg',
    template: selectedPurpose.payloadLabel,
    background,
    backgroundPrompt: isZh ? selectedBackgroundPrompt.zh : selectedBackgroundPrompt.en,
    prompt: generatedPrompt,
    status: demoStatus,
  };

  return (
    <div className="space-y-6 pb-6 text-dark-brown">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={sectionTransition(0.04)}
        className="relative overflow-hidden rounded-[30px] bg-white shadow-[0_30px_90px_rgba(42,26,10,0.12)]"
      >
        <div className="grid min-h-[540px] lg:grid-cols-[0.42fr_1fr]">
          <div className="flex flex-col justify-between gap-7 px-6 py-6 sm:px-8 sm:py-7 lg:px-10">
            <div>
              <div className={labelClass}>{content.heroLabel}</div>
              <h2 className={`mt-4 ${titleClass}`}>{content.heroTitle}</h2>
              <p className={`mt-5 max-w-[390px] ${bodyClass}`}>{content.heroBody}</p>
            </div>

            <div className="grid gap-3">
              {[
                { title: isZh ? '设计出产品感' : 'Shape product feeling', tool: 'Figma', image: figmaAssets.designBase, mark: figmaAssets.figmaMark },
                { title: isZh ? '实现交互状态' : 'Build interaction states', tool: 'React / Vite', image: figmaAssets.vscodeWorkflow, mark: figmaAssets.vscodeMark },
              ].map((item) => (
                <div key={item.title} className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-3 rounded-[18px] bg-[#fff8ef] p-3 shadow-[0_10px_24px_rgba(42,26,10,0.04)]">
                  <div className="h-[56px] overflow-hidden rounded-[12px] bg-[#efe2d1]">
                    <img src={assetUrl(item.image)} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
                  </div>
                  <div>
                    <p className="text-[14px] font-semibold text-dark-brown">{item.title}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <img src={assetUrl(item.mark)} alt="" className="h-4 w-4 object-contain" loading="lazy" />
                      <p className="text-[11px] uppercase tracking-[0.14em] text-neutral-400">{item.tool}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href={LIVE_APP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#3B230E] px-4 py-2 text-xs font-semibold text-[#fffaf2] transition hover:bg-[#5F4E41]"
              >
                <ExternalLink size={14} />
                <span>{content.projectLinkLabel}</span>
              </a>
              <a
                href="https://github.com/albellatross/elsewhere"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#3B230E]/8 px-4 py-2 text-xs font-semibold text-[#3B230E] transition hover:bg-[#3B230E]/12"
              >
                <Github size={14} />
                <span>{content.githubLabel}</span>
              </a>
            </div>
          </div>

          <div className="relative min-h-[500px] overflow-hidden bg-[linear-gradient(142deg,#7f8cf8_2%,#d7b9ff_50%,#b8ede2_100%)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(255,255,255,0.72),rgba(255,255,255,0)_38%)]" />
            <motion.div
              initial={{ opacity: 0, x: 42, y: -22, rotate: 1.2 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              transition={sectionTransition(0.16)}
              className="absolute right-[6%] top-[8%] w-[68%] overflow-hidden rounded-[12px] shadow-[0_28px_80px_rgba(70,53,130,0.28)]"
            >
              <img src={assetUrl(figmaAssets.elsewhereBrowser)} alt="Elsewhere landing page" className="w-full object-cover" loading="eager" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -34, y: 38, rotate: -1.6 }}
              animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
              transition={sectionTransition(0.22)}
              className="absolute bottom-[8%] left-[7%] w-[56%] overflow-hidden rounded-[12px] shadow-[0_24px_70px_rgba(92,60,160,0.22)]"
            >
              <img src={assetUrl(figmaAssets.idPhotoWorkspace)} alt="Elsewhere ID photo workflow" className="w-full object-cover" loading="eager" />
            </motion.div>
            <div className="absolute bottom-5 left-6 right-6 flex flex-wrap gap-2">
              {content.stats.map((stat) => (
                <span key={stat} className="rounded-full bg-white/34 px-3 py-1.5 text-[11px] font-medium text-white shadow-[0_8px_22px_rgba(65,80,180,0.16)] backdrop-blur-md">
                  {stat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={sectionTransition(0.08)}
        className="grid gap-3 sm:grid-cols-3"
      >
        {evidenceItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.value} className={panelClass}>
              <div className="flex items-start gap-3">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#8C5462]/10 text-[#8C5462]">
                  <Icon size={16} />
                </span>
                <div>
                  <p className="text-[15px] font-semibold">{item.value}</p>
                  <p className={`mt-1 ${smallClass}`}>{item.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={sectionTransition(0.12)}
        className={sectionClass}
      >
        <div>
          <div className={labelClass}>{content.liveLabel}</div>
          <h3 className={`mt-3 ${sectionTitleClass}`}>{content.liveTitle}</h3>
        </div>

        <div className="mt-6 overflow-hidden rounded-[24px] bg-[#1d1c1b] shadow-[0_22px_60px_rgba(42,26,10,0.14)]">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff6b6b]" />
              <span className="h-3 w-3 rounded-full bg-[#ffd166]" />
              <span className="h-3 w-3 rounded-full bg-[#75d99a]" />
            </div>
            <div className="min-w-0 flex-1 rounded-full bg-white/10 px-4 py-2 text-center text-[12px] text-white">
              {LIVE_APP_URL}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIframeKey((value) => value + 1)}
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/18"
                aria-label={isZh ? '重新加载网页' : 'Reload website'}
              >
                <RefreshCcw size={15} className="text-white" />
              </button>
              <a
                href={LIVE_APP_URL}
                target="_blank"
                rel="noreferrer"
                className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/18"
                aria-label={content.projectLinkLabel}
              >
                <ExternalLink size={15} className="text-white" />
              </a>
            </div>
          </div>
          <iframe
            key={iframeKey}
            src={LIVE_APP_URL}
            title="Elsewhere live website"
            className="h-[640px] w-full bg-white"
            loading="lazy"
          />
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={sectionTransition(0.16)}
        className={sectionClass}
      >
        <div className={labelClass}>{isZh ? '设计问题' : 'Design problems'}</div>
        <h3 className={`mt-3 ${sectionTitleClass}`}>{isZh ? '这个网站解决的不是“做图”，而是如何让普通用户完成 AI 图像任务' : 'The website solves the product problem behind AI image creation'}</h3>


        <div className="mt-7 grid gap-5">
          {designProblems.map((item, index) => (
            <article
              key={item.problem}
              className="grid overflow-hidden rounded-[26px] border border-[#efe2d1] bg-white/72 shadow-[0_18px_42px_rgba(42,26,10,0.055)] lg:grid-cols-[0.92fr_1.08fr]"
            >
              <div className="relative min-h-[260px] overflow-hidden bg-[#f3eadf]">
                <img src={assetUrl(item.image)} alt="" className="h-full w-full object-cover object-top" loading="lazy" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(30,18,10,0.04),rgba(30,18,10,0.42))]" />
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-white/92 px-3 py-1.5 text-[11px] font-semibold text-[#8C5462] shadow-[0_8px_20px_rgba(42,26,10,0.1)]">
                    {String(index + 1).padStart(2, '0')} / {item.tag}
                  </span>
                  {item.proof.map((proof) => (
                    <span key={proof} className="rounded-full bg-black/36 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                      {proof}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid gap-4 p-5 sm:p-6">
                <div className="grid gap-3 sm:grid-cols-[36px_minmax(0,1fr)]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8C5462]/10 text-[#8C5462]">
                    <MousePointerClick size={16} />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#8C5462]">{isZh ? '用户为什么卡住' : 'Where users get stuck'}</p>
                    <p className={`mt-1 ${bodyClass}`}>{item.problem}</p>
                  </div>
                </div>
                <div className="grid gap-3 rounded-[18px] bg-[#fffaf2] p-4 sm:grid-cols-[36px_minmax(0,1fr)]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#3B230E]/8 text-[#3B230E]">
                    <Layers3 size={16} />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#3B230E]">{isZh ? '我的设计处理' : 'Design decision'}</p>
                    <p className={`mt-1 ${bodyClass}`}>{item.decision}</p>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-[36px_minmax(0,1fr)]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B86B4B]/10 text-[#B86B4B]">
                    <ArrowRight size={16} />
                  </span>
                  <div>
                    <p className="text-[13px] font-semibold text-[#B86B4B]">{isZh ? '实现后用户看到什么' : 'Implemented result'}</p>
                    <p className={`mt-1 ${bodyClass}`}>{item.outcome}</p>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={sectionTransition(0.24)}
        className={sectionClass}
      >
        <div className="grid gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div>
            <div className={labelClass}>{content.buildLabel}</div>
            <h3 className={`mt-3 ${sectionTitleClass}`}>{content.buildTitle}</h3>
            <p className={`mt-4 ${bodyClass}`}>{content.buildIntro}</p>
            <figure className="mt-6 overflow-hidden rounded-[24px] bg-[#fffaf2] shadow-[0_16px_38px_rgba(42,26,10,0.08)]">
              <img src={assetUrl(architectureImage)} alt={isZh ? 'AI 辅助无代码前后端联动架构图' : 'AI assisted full-stack workflow'} className="aspect-[16/9] w-full object-cover" loading="lazy" />
            </figure>
          </div>

          <div className="grid gap-3">
            {architectureLayers.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className={panelClass}>
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#8C5462]/10 text-[#8C5462]">
                      <Icon size={16} />
                    </span>
                    <div>
                      <p className="text-[15px] font-semibold">{item.title}</p>
                      <p className={`mt-2 ${smallClass}`}>{item.body}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="rounded-[20px] bg-[#3B230E] p-4 text-white">
              <p className="text-[11px] uppercase tracking-[0.22em] text-white/62">{isZh ? '证明点' : 'Proof'}</p>
              <p className="mt-2 text-[15px] font-semibold leading-relaxed">
                {isZh
                  ? '这不是单张视觉稿，而是有页面、有状态、有请求结构、有部署入口的产品原型。'
                  : 'This is not a static mockup. It has pages, states, request shape, and a deployed review surface.'}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={sectionTransition(0.28)}
        className="grid gap-5 xl:grid-cols-[1.02fr_0.98fr]"
      >
        <div className={sectionClass}>
          <div className={labelClass}>{content.flowLabel}</div>
          <h3 className={`mt-3 ${sectionTitleClass}`}>{content.flowTitle}</h3>
          <div className="mt-6 grid gap-3">
            {processSteps.map((step, index) => (
              <div key={step.title} className={panelClass}>
                <div className="grid gap-3 sm:grid-cols-[42px_minmax(0,1fr)]">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#8C5462]/10 font-mono text-[11px] text-[#8C5462]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold">{step.title}</p>
                    <p className={`mt-2 ${smallClass}`}>{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={sectionClass}>
          <div className={labelClass}>{isZh ? '功能能力' : 'Feature capability'}</div>
          <h3 className={`mt-3 ${sectionTitleClass}`}>{isZh ? '功能介绍要回到组件解决的问题' : 'Feature explanation tied back to component value'}</h3>
          <div className="mt-6 grid gap-3">
            {content.features.map((feature) => (
              <div key={feature.title} className={panelClass}>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#3B230E]/8 text-[#3B230E]">
                    <Layers3 size={14} />
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold">{feature.title}</p>
                    <p className={`mt-2 ${smallClass}`}>{feature.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={sectionTransition(0.32)}
        className="rounded-[30px] bg-[#3B230E] p-6 text-white shadow-[0_18px_44px_rgba(59,35,14,0.18)] sm:p-7"
      >
        <div className="flex items-center gap-2">
          <Sparkles size={16} />
          <p className="text-[17px] font-semibold">{content.closingTitle}</p>
        </div>
        <p className="mt-3 max-w-3xl text-[15px] leading-[1.78] text-white/76 sm:text-[16px]">{content.closingBody}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a href={LIVE_APP_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#3B230E]">
            <Play size={14} />
            <span>{content.projectLinkLabel}</span>
          </a>
          <a href="https://github.com/albellatross/elsewhere" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-xs font-semibold text-white">
            <Github size={14} />
            <span>{content.githubLabel}</span>
          </a>
        </div>
        <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-white/32">{project.title}</p>
      </motion.section>
    </div>
  );
};

export default VibeCodingArticleView;

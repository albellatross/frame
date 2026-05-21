export type VibeCodingArticleLocale = 'en' | 'zh';

interface VibeHighlight {
  id: string;
  title: string;
  body: string;
  screen: string;
  image: string;
  box: {
    left: string;
    top: string;
    width: string;
    height: string;
  };
}

interface VibeFeature {
  title: string;
  body: string;
}

interface VibeStep {
  title: string;
  body: string;
}

export interface VibeCodingArticleContent {
  eyebrow: string;
  heroLabel: string;
  heroTitle: string;
  heroBody: string;
  projectLinkLabel: string;
  githubLabel: string;
  stats: string[];
  highlightsLabel: string;
  highlightsTitle: string;
  highlightsIntro: string;
  highlights: VibeHighlight[];
  liveLabel: string;
  liveTitle: string;
  liveIntro: string;
  purposeLabel: string;
  backgroundLabel: string;
  generateLabel: string;
  previewLabel: string;
  flowLabel: string;
  flowTitle: string;
  flowSteps: VibeStep[];
  buildLabel: string;
  buildTitle: string;
  buildIntro: string;
  features: VibeFeature[];
  closingTitle: string;
  closingBody: string;
}

type VibeCodingArticleMap = Record<string, Record<VibeCodingArticleLocale, VibeCodingArticleContent>>;

const idPhotoImage = '/projects/vibe-coding/elsewhere-id-photo.png';

export const VIBE_CODING_ARTICLES: VibeCodingArticleMap = {
  'exp-vibe-coding': {
    en: {
      eyebrow: 'Vibe Coding',
      heroLabel: 'Elsewhere: independent website case study',
      heroTitle: 'From product feeling to a working AI template website',
      heroBody:
        'Elsewhere started as a self-initiated AI image product idea. I designed the product structure, visual direction, guided generation flow, and interaction states, then used AI-assisted no-code coding to build a working front-end and back-end linked website.',
      projectLinkLabel: 'Open live app',
      githubLabel: 'GitHub repo',
      stats: ['Independent build', 'Template website', 'Live interaction'],
      highlightsLabel: 'Introduce mode',
      highlightsTitle: 'Open the guided layer to read the product decisions',
      highlightsIntro:
        'The interface is not explained through static screenshot cards. Turn on introduce mode, hover the glowing points, and the key UX decisions appear directly on the product surface.',
      highlights: [
        {
          id: 'task-model',
          title: 'Turn prompting into visible steps',
          body: 'The user does not start from a blank prompt box. The flow converts the AI task into concrete choices: upload a photo, choose the purpose, choose the background, then generate.',
          screen: 'UX flow',
          image: idPhotoImage,
          box: { left: '2%', top: '8%', width: '31%', height: '68%' },
        },
        {
          id: 'template-choice',
          title: 'Template choices replace prompt writing',
          body: 'Purpose cards make the output type understandable before generation. This is the designer value: reduce prompt anxiety and make the next action obvious.',
          screen: 'Template',
          image: idPhotoImage,
          box: { left: '5%', top: '31%', width: '25%', height: '24%' },
        },
        {
          id: 'preview-state',
          title: 'Preview and generation state stay visible',
          body: 'The right side gives users a stable expectation of where the result will appear. Empty, generating, regenerate, and download states are part of the interaction design.',
          screen: 'Preview',
          image: idPhotoImage,
          box: { left: '51%', top: '24%', width: '32%', height: '54%' },
        },
        {
          id: 'product-system',
          title: 'Product system, not one static page',
          body: 'The API key and admin entry hint at the operational layer behind the demo: prompts, providers, assets, and generation logs can be managed as a system.',
          screen: 'System',
          image: idPhotoImage,
          box: { left: '88%', top: '1.5%', width: '10%', height: '6%' },
        },
      ],
      liveLabel: 'Live website embed',
      liveTitle: 'Interact with Elsewhere from the homepage',
      liveIntro:
        'This is the real deployed Elsewhere website embedded into the case study. Start from the homepage, explore the template entry, and review the motion and interaction directly instead of reading a screenshot explanation.',
      purposeLabel: 'Photo purpose',
      backgroundLabel: 'Background',
      generateLabel: 'Generate preview',
      previewLabel: 'Image preview',
      flowLabel: 'Case process',
      flowTitle: 'How I started, designed, and built it',
      flowSteps: [
        {
          title: 'Start from the user problem',
          body: 'AI image tools often start with a blank prompt box. I reframed the experience around templates, so users begin with a recognizable task instead of prompt writing.',
        },
        {
          title: 'Define the UX structure',
          body: 'I mapped the website into landing page, template library, detail flow, upload state, generation state, result state, and admin operation layer.',
        },
        {
          title: 'Design visual and interaction language',
          body: 'The UI uses large visual templates, clear step hierarchy, motion feedback, and preview-first layout so the product feels polished rather than like a prompt form.',
        },
        {
          title: 'Use AI-assisted coding to implement',
          body: 'I moved from design intention into React/Vite implementation, used AI-assisted coding for page behavior, structured request payloads, simulated API responses, and deployed the website for review.',
        },
      ],
      buildLabel: 'Result',
      buildTitle: 'What the finished website proves',
      buildIntro:
        'The result is not only a visual mockup. It is a reviewable website with real navigation, interaction states, request logic, fake API response flow, admin/logging logic, deployment, and source code.',
      features: [
        {
          title: 'Good-looking product surface',
          body: 'Landing page, template browsing, and detail pages show visual taste, hierarchy, motion, and responsive layout. This proves the AI-coded output still meets product-level visual quality.',
        },
        {
          title: 'Complete guided flow',
          body: 'The ID photo path includes upload, purpose selection, background selection, generation status, preview, regenerate, and download states, so users always know the next action.',
        },
        {
          title: 'Front-back interaction logic',
          body: 'Template choices become request parameters, the generate action creates a payload, and the response state returns to the preview. The demo validates product logic even when output images are simulated.',
        },
        {
          title: 'Traceable implementation',
          body: 'The GitHub repo and deployed page make the design process inspectable: from idea, to UX flow, to AI-assisted code, to a working review surface.',
        },
      ],
      closingTitle: 'The takeaway',
      closingBody:
        'In this case, vibe coding is not only making a page fast. It is using design judgment to define the product system, then using AI-assisted implementation to make the front-end, state flow, fake API layer, and deployment real.',
    },
    zh: {
      eyebrow: 'Vibe Coding',
      heroLabel: 'Elsewhere：独立完成的网站 case study',
      heroTitle: '从产品感觉到可运行的 AI 模板网站',
      heroBody:
        'Elsewhere 是我自己发起并独立完成的 AI 图像产品网站。我从产品结构、视觉方向、引导式生成流程和交互状态开始设计，再用 AI 辅助无代码/低代码实现，把它做成一个有前端页面、状态流和后端请求链路的网站。',
      projectLinkLabel: '打开线上页面',
      githubLabel: 'GitHub 仓库',
      stats: ['独立完成', '模板网站', '可交互 demo'],
      highlightsLabel: 'Introduce 模式',
      highlightsTitle: '打开引导层，直接在界面上看设计重点',
      highlightsIntro:
        '这里不再用一堆按钮和卡片解释截图。开启 introduce 模式后，页面上会出现光点，hover 光点就能看到对应的 UX/UI 决策。',
      highlights: [
        {
          id: 'task-model',
          title: '把 prompt 变成可见步骤',
          body: '用户不是从空白 prompt 框开始，而是按“上传照片、选择用途、选择背景、生成结果”完成任务。',
          screen: 'UX 流程',
          image: idPhotoImage,
          box: { left: '2%', top: '8%', width: '31%', height: '68%' },
        },
        {
          id: 'template-choice',
          title: '用模板选择替代写 prompt',
          body: '用途卡片让用户先理解输出类型，再进入生成。这里体现的是设计师价值：降低 prompt 压力，让下一步行动清楚。',
          screen: '模板',
          image: idPhotoImage,
          box: { left: '5%', top: '31%', width: '25%', height: '24%' },
        },
        {
          id: 'preview-state',
          title: '预览和生成状态始终可见',
          body: '右侧区域让用户一直知道结果会出现在哪里。空状态、生成中、重新生成、下载都是交互设计的一部分。',
          screen: '预览',
          image: idPhotoImage,
          box: { left: '51%', top: '24%', width: '32%', height: '54%' },
        },
        {
          id: 'product-system',
          title: '不是静态页，而是产品系统',
          body: 'API key 和后台入口说明这个 demo 背后还有运营层：prompt、provider、素材和生成日志都可以作为系统管理。',
          screen: '系统',
          image: idPhotoImage,
          box: { left: '88%', top: '1.5%', width: '10%', height: '6%' },
        },
      ],
      liveLabel: '真实网页嵌入',
      liveTitle: '从首页开始直接体验 Elsewhere',
      liveIntro: '',
      purposeLabel: '照片用途',
      backgroundLabel: '背景',
      generateLabel: '生成预览',
      previewLabel: '图片预览',
      flowLabel: 'Case 过程',
      flowTitle: '我是怎么开始、设计并做出来的',
      flowSteps: [
        {
          title: '从用户问题开始',
          body: '很多 AI 图像工具从空白 prompt 框开始。我把体验改成模板入口，让用户先选择熟悉的任务，而不是先组织 prompt。',
        },
        {
          title: '定义 UX 结构',
          body: '我把网站拆成首页、模板库、详情流程、上传状态、生成状态、结果状态和后台运营层。',
        },
        {
          title: '设计视觉和交互语言',
          body: '页面用大图模板、清楚的步骤层级、动效反馈和 preview-first 布局，让产品不是 prompt 表单，而是完整体验。',
        },
        {
          title: '用 AI 辅助编码实现',
          body: '我把设计意图推进到 React/Vite 实现，用 AI 辅助编码完成页面行为、请求参数结构、模拟 API 返回状态，并部署成可访问网站。',
        },
      ],
      buildLabel: '结果',
      buildTitle: '最终网站证明了什么',
      buildIntro:
        '这个结果不只是视觉稿，而是一个可以打开、可以交互、可以查看源码的网站，并且包含前端状态、请求结构、模拟 API 返回、后台/日志逻辑和部署验证。',
      features: [
        {
          title: '好看的产品表层',
          body: '首页、模板浏览和详情页体现了视觉品味、信息层级、动效和响应式布局，证明 AI 辅助实现也可以达到产品级视觉质量。',
        },
        {
          title: '完整引导流程',
          body: 'ID photo 路径包含上传、用途选择、背景选择、生成状态、预览、重新生成和下载状态，让用户始终知道下一步做什么。',
        },
        {
          title: '前后端联动逻辑',
          body: '模板选择会变成请求参数，生成按钮触发 payload，返回状态再落到预览区域。即使图片结果是模拟的，也证明产品链路能跑通。',
        },
        {
          title: '实现可被验证',
          body: 'GitHub 仓库和线上页面让过程可以被检查：从想法、到 UX 流程、到 AI 辅助代码、到可运行页面。',
        },
      ],
      closingTitle: '最后的落点',
      closingBody:
        '这个案例里的 vibe coding 不是只求快速做页面，而是用设计判断定义产品系统，再用 AI 辅助实现把前端、状态流、模拟 API 层和部署验证真正做出来。',
    },
  },
};

export type WorkflowArticleLocale = 'en' | 'zh';

interface WorkflowToolCard {
  title: string;
  problem: string;
  input: string;
  output: string;
  example: string;
}

interface WorkflowStage {
  title: string;
  body: string;
}

export interface WorkflowArticleContent {
  eyebrow: string;
  heroLabel: string;
  heroTitle: string;
  heroBody: string;
  stats: string[];
  contextLabel: string;
  contextTitle: string;
  contextBody: string;
  painPoints: string[];
  workflowLabel: string;
  workflowTitle: string;
  workflowStages: WorkflowStage[];
  toolsLabel: string;
  toolsTitle: string;
  toolsIntro: string;
  tools: WorkflowToolCard[];
  exampleLabel: string;
  exampleTitle: string;
  beforeTitle: string;
  beforeBody: string;
  afterTitle: string;
  afterBody: string;
  principleLabel: string;
  principleTitle: string;
  principles: string[];
  closingTitle: string;
  closingBody: string;
}

type WorkflowArticleMap = Record<string, Record<WorkflowArticleLocale, WorkflowArticleContent>>;

export const WORKFLOW_ARTICLES: WorkflowArticleMap = {
  'exp-workflow': {
    en: {
      eyebrow: 'AI Workflow Design',
      heroLabel: 'From complex production work to AI-made tools',
      heroTitle: 'I built focused tools to speed up image and presentation workflows',
      heroBody:
        'In large AIGC production, the slow part is not only generating images. I had to create variants, filter useful outputs, prepare review boards, and turn materials into presentation drafts. I used AI to build focused tools around those repeated steps.',
      stats: ['Batch image generation', '3:4 review board', 'OPG-MXP-Presentation'],
      contextLabel: 'Context',
      contextTitle: 'The bottleneck was selection, not imagination.',
      contextBody:
        'For image-heavy and presentation-heavy work, one good prompt is not enough. I needed many candidates, a fast way to compare them at the right ratio, and a review surface for turning source material into a deck that teams could critique.',
      painPoints: [
        'Manual generation made me spend time operating tools instead of judging images.',
        'Good candidates were hard to compare when every file had a different size and framing.',
        'Deck drafts still required manually arranging source material before the team could review anything.',
        'The workflow had to preserve my design judgment while removing repeated labor.',
      ],
      workflowLabel: 'Workflow',
      workflowTitle: 'The workflow became three clear tools',
      workflowStages: [
        { title: 'Set creative direction', body: 'Define theme, prompt direction, visual constraints, and output ratio.' },
        { title: 'Batch generate', body: 'Let the tool produce many candidates so my work becomes selection and quality control.' },
        { title: 'Normalize to 3:4', body: 'Place selected candidates into a consistent 3:4 display format for quick comparison.' },
        { title: 'Generate PPT draft', body: 'Turn source material into a structured deck draft that can be reviewed immediately.' },
        { title: 'Team review', body: 'Share clear review surfaces so other teams can judge images, slides, and next changes faster.' },
      ],
      toolsLabel: 'Three Tools',
      toolsTitle: 'Three tools, three repeated problems removed',
      toolsIntro: 'The tools are intentionally small. Each one solves one repeated step in my real production workflow.',
      tools: [
        {
          title: 'Batch Image Generator',
          problem: 'Generating one image at a time made the production flow too slow.',
          input: 'A theme, base prompt, variant settings, and target image ratio.',
          output: 'A batch of image candidates ready for designer screening.',
          example: 'The tool shifts my role from manual operator to curator: I spend time judging quality, not clicking generate repeatedly.',
        },
        {
          title: '3:4 Image Review Board',
          problem: 'Desktop image candidates were hard to compare when raw files had inconsistent framing.',
          input: 'Selected images from a batch and the review target.',
          output: 'A 3:4 visual board that other teams can scan and vote on quickly.',
          example: 'The board turns a messy folder into a review-ready surface: the best images become visible immediately.',
        },
        {
          title: 'OPG-MXP-Presentation',
          problem: 'Presentation work still required turning loose review notes, source images, and slide intent into a structured deck manually.',
          input: 'Topic, target audience, outline, source materials, visual direction, and review criteria.',
          output: 'A generated PPT draft with a review surface for checking narrative, slide structure, and visual consistency.',
          example: 'The tool moves the first pass from manual slide assembly to review: I can inspect structure, revise copy, and select which slides need design attention.',
        },
      ],
      exampleLabel: 'Before / After',
      exampleTitle: 'Repeated production tasks became review-ready workflows',
      beforeTitle: 'Before',
      beforeBody: 'Generate one by one, save everything into folders, manually resize screenshots, assemble deck drafts, then ask reviewers to open files one at a time.',
      afterTitle: 'After',
      afterBody: 'Generate candidates in batches, filter visually, place selected outputs into review surfaces, and generate deck drafts that reviewers can critique immediately.',
      principleLabel: 'Design Value',
      principleTitle: 'Why this is still design work',
      principles: [
        'Automation reduces repeated operations, not creative judgment.',
        'The tools make selection, slide structure, and review more visual.',
        'The output is review-ready for people outside the production process.',
        'The designer stays in control of taste, quality, and final choice.',
      ],
      closingTitle: 'The takeaway',
      closingBody: 'This case is about using AI to build tools for my own creative workflow: less manual operation, more time for selection, presentation judgment, and communication.',
    },
    zh: {
      eyebrow: 'AI Workflow 设计',
      heroLabel: '从复杂生产任务到 AI 提效工具',
      heroTitle: '我为生图和 PPT 工作流做了几个提效小工具',
      heroBody:
        '在大批量 AIGC 生产里，慢的不是某一张图，而是反复生成、筛选、整理、做展示和给其他团队 review。我用 AI 做了几个很小但实用的工具：批量生图、批量 3:4 展示图片，以及 OPG-MXP-Presentation。',
      stats: ['批量生图', '3:4 展示板', 'OPG-MXP-Presentation'],
      contextLabel: '背景',
      contextTitle: '瓶颈不是想象力，而是筛选效率。',
      contextBody:
        '当一个任务需要很多候选图或 PPT 初稿时，一个好 prompt 不够。我需要快速生成大量方向，把有潜力的内容整理成统一展示，并让团队可以直接进入 review。',
      painPoints: [
        '手动一张张生成，会把时间消耗在操作工具上。',
        '候选图尺寸和构图不统一，很难快速横向比较。',
        'PPT 第一版也需要手动整理素材、页面逻辑和 review 标准。',
        '我希望保留设计师的审美判断，同时把重复劳动交给工具。',
      ],
      workflowLabel: '工作流',
      workflowTitle: '把真实工作流拆成三个清楚的小工具',
      workflowStages: [
        { title: '确定方向', body: '先明确主题、prompt 方向、画面限制和目标比例。' },
        { title: '批量生成', body: '让工具一次生成大量候选图，我主要负责筛选和判断质量。' },
        { title: '统一 3:4', body: '把有潜力的图片放进统一 3:4 展示格式，方便横向比较。' },
        { title: '生成 PPT 初稿', body: '把主题、素材和结构整理成可 review 的 PPT 初稿。' },
        { title: '团队 review', body: '用清楚的界面让团队更快判断图片、页面结构和后续修改方向。' },
      ],
      toolsLabel: '三个工具',
      toolsTitle: '三个小工具，解决三个真实重复问题',
      toolsIntro: '这些工具都很小，但都对应真实生产里的一个痛点。',
      tools: [
        {
          title: '批量生图工具',
          problem: '一张张生成太慢，设计师时间被工具操作消耗。',
          input: '主题、基础 prompt、变体设置和目标比例。',
          output: '一批可供筛选的候选图。',
          example: '这个工具把我的角色从“反复点生成的人”变成“筛选质量和方向的人”。',
        },
        {
          title: '3:4 图片展示板',
          problem: '候选图构图和比例不统一，别人很难快速判断哪张适合桌面。',
          input: '批量生成后筛出来的候选图。',
          output: '统一 3:4 的视觉展示板，方便其他团队快速扫读和选择。',
          example: '这个工具把混乱文件夹变成 review-ready 的视觉界面，好图会立刻被看见。',
        },
        {
          title: 'OPG-MXP-Presentation',
          problem: '生成 PPT 前仍需要手动整理主题、素材、页面逻辑和评审标准，第一版搭建很耗时。',
          input: '主题、目标观众、内容大纲、素材、视觉方向和 review 标准。',
          output: '一版可进入 review 的 PPT 初稿，以及用于检查叙事、页面结构和视觉一致性的界面。',
          example: '这个工具把“从零搭一版 PPT”变成“先 review 生成结果”，我可以把时间放在结构判断、文案修改和关键页打磨上。',
        },
      ],
      exampleLabel: '之前 / 之后',
      exampleTitle: '重复生产任务变成可被 review 的工作流',
      beforeTitle: '之前',
      beforeBody: '一张张生成，把图放进文件夹，手动截图和改比例，再手动搭 PPT 初稿，让别人逐个打开文件筛选。',
      afterTitle: '之后',
      afterBody: '批量生成候选内容，先由我快速筛一轮，再放进图片或 PPT 的 review 界面，让团队在清楚的视觉界面里判断。',
      principleLabel: '设计价值',
      principleTitle: '为什么这仍然是设计能力',
      principles: [
        '自动化减少重复操作，不替代审美判断。',
        '工具让筛选、页面结构和 review 更直观。',
        '输出形式要能被其他团队直接理解和 review。',
        '设计师仍然控制品味、质量和最终选择。',
      ],
      closingTitle: '最后的落点',
      closingBody: '这个 case 不是泛泛地讲 AI workflow，而是我用 AI 为自己的创作流程做工具：减少手动操作，把更多时间留给筛选、页面判断和沟通。',
    },
  },
};

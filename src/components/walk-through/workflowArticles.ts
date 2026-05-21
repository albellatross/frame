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
      heroLabel: 'From complex image production to AI-made tools',
      heroTitle: 'I built two small tools to speed up complex image-generation work',
      heroBody:
        'In large AIGC production, the slow part is not only generating images. I had to create many variants, filter the useful ones, and prepare review boards for other Microsoft teams. I used AI to build two focused tools around that workflow.',
      stats: ['Batch image generation', '3:4 review board', 'Faster selection workflow'],
      contextLabel: 'Context',
      contextTitle: 'The bottleneck was selection, not imagination.',
      contextBody:
        'For image-heavy work, one good prompt is not enough. I needed many candidates, then a fast way to compare them at the right ratio and invite other teams to choose desktop-worthy images.',
      painPoints: [
        'Manual generation made me spend time operating tools instead of judging images.',
        'Good candidates were hard to compare when every file had a different size and framing.',
        'Other teams needed a simple visual board, not a folder full of raw outputs.',
        'The workflow had to preserve my design judgment while removing repeated labor.',
      ],
      workflowLabel: 'Workflow',
      workflowTitle: 'The workflow became two clear tools',
      workflowStages: [
        { title: 'Set creative direction', body: 'Define theme, prompt direction, visual constraints, and output ratio.' },
        { title: 'Batch generate', body: 'Let the tool produce many candidates so my work becomes selection and quality control.' },
        { title: 'Normalize to 3:4', body: 'Place selected candidates into a consistent 3:4 display format for quick comparison.' },
        { title: 'Team screening', body: 'Share a visual board so other Microsoft teams can quickly identify desktop-quality images.' },
        { title: 'Final selection', body: 'Keep the winning images and continue editing only the strongest directions.' },
      ],
      toolsLabel: 'Two Tools',
      toolsTitle: 'Two tools, two repeated problems removed',
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
      ],
      exampleLabel: 'Before / After',
      exampleTitle: 'A repeated image task became a review-ready workflow',
      beforeTitle: 'Before',
      beforeBody: 'Generate one by one, save everything into folders, manually resize screenshots, then ask reviewers to open files one at a time.',
      afterTitle: 'After',
      afterBody: 'Generate candidates in batches, filter visually, place selected images into a 3:4 board, and let reviewers choose from a clear comparison surface.',
      principleLabel: 'Design Value',
      principleTitle: 'Why this is still design work',
      principles: [
        'Automation reduces repeated operations, not creative judgment.',
        'The tool makes selection faster and more visual.',
        'The output is review-ready for people outside the image-generation process.',
        'The designer stays in control of taste, quality, and final choice.',
      ],
      closingTitle: 'The takeaway',
      closingBody: 'This case is about using AI to build tools for my own creative workflow: less manual operation, more time for selection, judgment, and communication.',
    },
    zh: {
      eyebrow: 'AI Workflow 设计',
      heroLabel: '从复杂生图生产到 AI 提效工具',
      heroTitle: '我为复杂生图工作做了两个提效小工具',
      heroBody:
        '在大批量 AIGC 生产里，慢的不是某一张图，而是反复生成、筛选、整理和给其他团队看。我用 AI 做了两个很小但很实用的工具：批量生图，以及批量 3:4 展示图片。',
      stats: ['批量生图', '3:4 展示板', '更快筛选流程'],
      contextLabel: '背景',
      contextTitle: '瓶颈不是想象力，而是筛选效率。',
      contextBody:
        '当一个任务需要很多候选图时，一个好 prompt 不够。我需要快速生成大量方向，再把有潜力的图整理成统一比例，让其他微软团队可以快速筛选适合做桌面的图片。',
      painPoints: [
        '手动一张张生成，会把时间消耗在操作工具上。',
        '候选图尺寸和构图不统一，很难快速横向比较。',
        '其他团队需要的是可扫读的视觉板，而不是一堆原始文件。',
        '我希望保留设计师的审美判断，同时把重复劳动交给工具。',
      ],
      workflowLabel: '工作流',
      workflowTitle: '把真实工作流拆成两个清楚的小工具',
      workflowStages: [
        { title: '确定方向', body: '先明确主题、prompt 方向、画面限制和目标比例。' },
        { title: '批量生成', body: '让工具一次生成大量候选图，我主要负责筛选和判断质量。' },
        { title: '统一 3:4', body: '把有潜力的图片放进统一 3:4 展示格式，方便横向比较。' },
        { title: '团队筛选', body: '把视觉板分享给其他微软团队，让他们快速选择适合做桌面的图片。' },
        { title: '最终选择', body: '保留最强方向，再继续针对好图做后续编辑。' },
      ],
      toolsLabel: '两个工具',
      toolsTitle: '两个小工具，解决两个真实重复问题',
      toolsIntro: '这两个工具都很小，但都对应真实生产里的一个痛点。',
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
      ],
      exampleLabel: '之前 / 之后',
      exampleTitle: '重复生图任务变成可被筛选的工作流',
      beforeTitle: '之前',
      beforeBody: '一张张生成，把图放进文件夹，手动截图和改比例，再让别人逐个打开文件筛选。',
      afterTitle: '之后',
      afterBody: '批量生成候选图，先由我快速筛一轮，再放进 3:4 展示板，让团队在清楚的视觉界面里选择。',
      principleLabel: '设计价值',
      principleTitle: '为什么这仍然是设计能力',
      principles: [
        '自动化减少重复操作，不替代审美判断。',
        '工具让筛选更快，也让比较更直观。',
        '输出形式要能被其他团队直接 review。',
        '设计师仍然控制品味、质量和最终选择。',
      ],
      closingTitle: '最后的落点',
      closingBody: '这个 case 不是泛泛地讲 AI workflow，而是我用 AI 为自己的创作流程做工具：减少手动操作，把更多时间留给筛选、判断和沟通。',
    },
  },
};

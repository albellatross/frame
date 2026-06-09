import React, { useMemo, useRef, useState } from 'react';
import { Project } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  LayoutGrid,
  MessageCircle,
  Plus,
  Search,
  Send,
  SlidersHorizontal,
  Sparkles,
  X,
} from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { projectCoverAsset } from '../utils/assets';

interface WorkPageProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  selectedProjectIds: string[];
  onToggleSelect: (id: string) => void;
  onReturnToTimeline?: () => void;
}

type WorkMode = 'recommended' | 'all' | 'practice';
type CategoryFilter = 'All' | 'System' | 'C-Side' | 'B-Side';
type LocalizedText = { en: string; zh: string };

interface CapabilitySuggestion {
  id: string;
  label: LocalizedText;
  query: LocalizedText;
  description: LocalizedText;
  projectIds: string[];
  keywords: string[];
}

interface ScoredProject {
  project: Project;
  score: number;
  rank: number;
  matchReason: LocalizedText;
}

const practiceProjectIds = new Set(['p2']);

const featuredProjectOrder = [
  'p1',
  'p21',
  'p3',
  'p20',
  'p5',
  'p13',
  'p15',
  'p12',
  'p17',
  'p6',
  'p4',
  'p7',
  'p11',
  'p9',
  'p16',
  'p18',
  'p19',
  'p8',
  'p14',
  'p2',
];

const priorityRank = new Map(featuredProjectOrder.map((id, index) => [id, index]));

const capabilitySuggestions: CapabilitySuggestion[] = [
  {
    id: 'ai-interaction',
    label: { en: 'AI interaction designer', zh: 'AI 交互设计师' },
    query: {
      en: 'AI interaction designer who can translate research models into usable product experiences',
      zh: '能把 AI 研究模型转译成可操作产品体验的交互设计师',
    },
    description: {
      en: 'Research demos, multimodal AI, controllable generation, and user-facing AI workflows.',
      zh: '研究 demo、多模态 AI、可控生成，以及面向用户的 AI 工作流。',
    },
    projectIds: ['p3', 'p20', 'p5', 'p13', 'p15', 'p1'],
    keywords: ['ai', 'aigc', 'research', 'multimodal', 'interaction', '生成式', '多模态', '研究', '交互'],
  },
  {
    id: 'microsoft-product',
    label: { en: 'Microsoft product UX', zh: '微软产品 UX' },
    query: {
      en: 'Microsoft product UX designer with Office, Copilot, and research demo experience',
      zh: '有 Office、Copilot 和微软研究 demo 经验的产品体验设计师',
    },
    description: {
      en: 'Office voice UX, Copilot patterns, Microsoft Research demos, and internal tooling.',
      zh: 'Office 语音体验、Copilot 交互、Microsoft Research demo 与内部工具。',
    },
    projectIds: ['p1', 'p3', 'p20', 'p5', 'p13', 'p6'],
    keywords: ['microsoft', 'office', 'copilot', 'msra', 'stca', '微软', '研究院', '语音'],
  },
  {
    id: 'vibe-coding',
    label: { en: 'Vibe coding + frontend', zh: 'Vibe Coding 与前端' },
    query: {
      en: 'designer who can use vibe coding to turn a prototype into an interactive web experience',
      zh: '能用 Vibe Coding 把原型做成交互网页体验的设计师',
    },
    description: {
      en: 'Fast prototyping, interaction structure, H5 game flow, and design-to-code thinking.',
      zh: '快速原型、交互结构、H5 小游戏流程，以及 design-to-code 思维。',
    },
    projectIds: ['p21', 'p3', 'p20', 'p5'],
    keywords: ['vibe', 'coding', 'frontend', 'prototype', 'h5', 'game', '前端', '原型', '小游戏'],
  },
  {
    id: 'visual-system',
    label: { en: 'Visual system / branding', zh: '视觉系统与品牌' },
    query: {
      en: 'visual designer with branding, packaging, identity, and system craft',
      zh: '有品牌、包装、视觉系统和精修能力的视觉设计师',
    },
    description: {
      en: 'Brand systems, packaging, editorial visual work, and polished campaign surfaces.',
      zh: '品牌系统、包装、版式视觉，以及完成度较高的商业展示。',
    },
    projectIds: ['p7', 'p15', 'p17', 'p16', 'p18', 'p19', 'p11', 'p9', 'p6'],
    keywords: ['visual', 'brand', 'branding', 'packaging', 'identity', 'graphic', '视觉', '品牌', '包装', '平面'],
  },
  {
    id: 'mobile-flow',
    label: { en: 'Mobile flow / app logic', zh: '移动端流程分析' },
    query: {
      en: 'mobile product designer who can analyze user flows and interaction logic',
      zh: '能分析移动端用户流程和交互逻辑的产品设计师',
    },
    description: {
      en: 'Mobile journeys, app flows, information hierarchy, and product reasoning.',
      zh: '移动端路径、App 流程、信息层级与产品判断。',
    },
    projectIds: ['p4', 'p14', 'p2'],
    keywords: ['mobile', 'app', 'flow', 'journey', 'analysis', '移动端', '流程', '路径', '分析'],
  },
];

const projectSearchHints: Record<string, string[]> = {
  p1: [
    'copilot read aloud',
    'word',
    'office',
    'voice ux',
    'conversation design',
    'accessibility',
    'real time voice',
    '微软',
    'office',
    'copilot',
    '语音交互',
    '朗读',
    '对话设计',
    '可访问性',
  ],
  p2: [
    'keeta',
    'user flow',
    'mobile app analysis',
    'test exercise',
    'personal practice',
    '流程分析',
    '移动端',
    '测试题',
    '个人练习',
    '外卖',
  ],
  p3: [
    'nuwa',
    'nuwa infinity',
    'nuwa xl',
    'dragnuwa',
    'multimodal ai',
    'generative ai',
    'research demo',
    'outpainting',
    'timeline',
    'trajectory',
    'ai interaction',
    '多模态',
    '生成式 ai',
    '研究 demo',
    '图像外扩',
    '长视频生成',
    '轨迹控制',
    '交互转译',
  ],
  p4: ['reme', 'ai companion', 'consumer app', 'c-side', 'companion ux', 'ai 陪伴', 'c 端', '用户体验'],
  p5: ['rd-agent', 'agent', 'research workflow', 'b-side', 'internal tool', '科研工作流', '智能体', '研究工具'],
  p6: [
    'msra 25th anniversary',
    'event visual',
    'microsoft research asia',
    'anniversary',
    'visual design',
    '微软亚洲研究院',
    '周年',
    '活动视觉',
  ],
  p7: ['ioete tea shop', 'tea shop', 'fom studio', 'brand identity', 'packaging', '茶店', '品牌', '包装'],
  p8: ['illustration', 'graphic', 'editorial', 'visual exploration', '插画', '平面', '个人视觉'],
  p9: ['heart printing', 'packaging', 'graphic', 'print', '包装', '印刷', '视觉'],
  p11: ['white elephant', 'poster', 'packaging', 'contest', '白象', '海报', '包装', '视觉'],
  p12: ['baidu ai cloud', 'ai cloud', 'enterprise', 'system', 'b-side', '百度智能云', '企业工具', '系统'],
  p13: ['taskmatrix.ai', 'agent', 'ai system', 'research demo', 'automation', '任务矩阵', '智能体', '研究 demo'],
  p14: ['xiaodu learning tablet', 'education', 'iot', 'children', 'learning', '小度', '教育', '学习机', '儿童'],
  p15: ['value compass', 'visual system', 'information design', 'branding', '价值指南针', '视觉系统', '信息设计'],
  p16: ['salone del mobile', 'milan', 'exhibition', 'editorial', 'furniture', '米兰', '展览', '版式', '家具展'],
  p17: ['batteryml', 'visual design', 'ai research', 'system', 'data visualization', '电池', '机器学习', '视觉系统'],
  p18: ['fera', 'branding', 'identity', 'visual design', '品牌', '识别', '视觉'],
  p19: ['profiltubi', 'rebranding', 'group work', 'identity', 'brand system', '品牌重塑', '视觉识别'],
  p20: [
    'rodin diffusion',
    '3d avatar',
    '3d generation',
    'microsoft research',
    'research demo',
    'ai interaction',
    '3d 头像',
    '三维生成',
    '研究 demo',
    '微软研究院',
  ],
  p21: [
    'lantern night return',
    'spring festival',
    'lantern festival',
    'h5 game',
    'vibe coding',
    'theme translation',
    'ticket sharing',
    '元宵夜归人',
    '春节回家路',
    '节日小游戏',
    '主题转译',
    '票根分享',
    '结局收集',
  ],
};

const projectMatchReasons: Record<string, LocalizedText> = {
  p1: {
    en: 'Shows recent Microsoft product work: voice UX, Office workflows, and Copilot interaction patterns.',
    zh: '展示近期微软产品工作：语音交互、Office 流程与 Copilot 体验模式。',
  },
  p2: {
    en: 'Kept as personal practice because it is a flow-analysis exercise rather than a shipped work project.',
    zh: '归入个人练习：它更像流程分析测试题，不和正式工作项目混在一起。',
  },
  p3: {
    en: 'Best evidence for translating early generative AI research into explorable interaction flows.',
    zh: '最能证明把早期生成式 AI 研究能力转译成可探索网页体验的项目。',
  },
  p4: {
    en: 'A consumer AI companion case that shows product framing beyond enterprise tools.',
    zh: 'C 端 AI 陪伴项目，展示企业工具之外的产品体验判断。',
  },
  p5: {
    en: 'Connects AI agent capability with research workflow, information hierarchy, and tool usability.',
    zh: '把 AI Agent 能力和科研工作流、信息层级、工具可用性连接起来。',
  },
  p6: {
    en: 'A Microsoft Research visual system case with event identity and communication craft.',
    zh: 'Microsoft Research 视觉项目，体现活动识别与传播视觉的完成度。',
  },
  p7: {
    en: 'A polished studio project for brand, packaging, and retail-facing visual systems.',
    zh: '完成度较高的工作室项目，适合展示品牌、包装与零售视觉系统。',
  },
  p8: {
    en: 'A personal visual archive that supports illustration and graphic range.',
    zh: '个人视觉作品集合，补充插画和平面表达能力。',
  },
  p9: {
    en: 'Packaging and print craft with a clear object-focused visual outcome.',
    zh: '包装与印刷方向作品，结果物明确，能展示视觉精修能力。',
  },
  p11: {
    en: 'A focused packaging/poster case with food-brand visual storytelling.',
    zh: '食品品牌相关包装与海报练习，适合补充视觉叙事。',
  },
  p12: {
    en: 'Enterprise AI cloud work that supports B-side system and information design strength.',
    zh: '企业级 AI 云项目，支撑 B 端系统和信息设计能力。',
  },
  p13: {
    en: 'AI agent demo work with system thinking and model-capability communication.',
    zh: 'AI Agent demo 项目，体现系统思考与模型能力表达。',
  },
  p14: {
    en: 'Education and IoT product thinking for children and learning scenarios.',
    zh: '教育和 IoT 场景项目，补充儿童学习产品思考。',
  },
  p15: {
    en: 'A visual-system case with clearer branding and information design value.',
    zh: '视觉系统项目，适合展示品牌与信息设计的组织能力。',
  },
  p16: {
    en: 'Editorial and exhibition visual work from the Milan design context.',
    zh: '米兰设计语境下的展览与版式视觉项目。',
  },
  p17: {
    en: 'Research-facing visual design for technical content and system presentation.',
    zh: '面向研究内容的视觉设计，适合展示技术信息的视觉包装。',
  },
  p18: {
    en: 'Brand identity work with concise visual language and presentation craft.',
    zh: '品牌识别项目，展示简洁视觉语言和提案呈现能力。',
  },
  p19: {
    en: 'Group rebranding work that adds identity-system range to the portfolio.',
    zh: '团队品牌重塑项目，补充品牌识别系统能力。',
  },
  p20: {
    en: 'MSRA 3D generative AI demo that shows how research output becomes a public interaction surface.',
    zh: 'MSRA 3D 生成式 AI demo，展示研究成果如何变成公开可体验界面。',
  },
  p21: {
    en: 'A newer interaction case about theme translation, H5 game flow, and vibe-coding iteration.',
    zh: '较新的交互项目，展示主题转译、H5 小游戏流程和 Vibe Coding 迭代。',
  },
};

const intentBoosters = [
  {
    terms: ['ai', 'aigc', 'generative', 'research', 'multimodal', 'model', 'demo', '生成式', '人工智能', '多模态', '研究', '模型'],
    ids: ['p3', 'p20', 'p5', 'p13', 'p15', 'p17', 'p1', 'p12'],
  },
  {
    terms: ['interaction', 'ux', 'product', 'flow', 'usable', 'prototype', 'control', '交互', '产品体验', '流程', '可操作', '控制'],
    ids: ['p1', 'p3', 'p20', 'p21', 'p5', 'p13', 'p12', 'p14', 'p4'],
  },
  {
    terms: ['microsoft', 'office', 'copilot', 'stca', 'msra', '微软', '研究院', '亚洲研究院', '语音'],
    ids: ['p1', 'p3', 'p20', 'p5', 'p13', 'p6', 'p12'],
  },
  {
    terms: ['visual', 'brand', 'branding', 'packaging', 'identity', 'graphic', 'poster', '视觉', '品牌', '包装', '平面', '海报'],
    ids: ['p7', 'p15', 'p17', 'p16', 'p18', 'p19', 'p11', 'p9', 'p6', 'p8'],
  },
  {
    terms: ['vibe', 'coding', 'frontend', 'h5', 'game', 'festival', 'lantern', 'spring', '前端', '小游戏', '节日', '元宵', '春节'],
    ids: ['p21', 'p3', 'p20'],
  },
  {
    terms: ['mobile', 'app', 'journey', 'analysis', 'exercise', 'test', '移动端', '路径', '分析', '测试题', '练习'],
    ids: ['p2', 'p4', 'p14'],
  },
];

const categoryOptions: CategoryFilter[] = ['All', 'System', 'B-Side', 'C-Side'];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[|/_,.;:()[\]{}"'!?，。；：、（）【】]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const getLocalized = (text: LocalizedText, isZh: boolean) => (isZh ? text.zh : text.en);

const getProjectSearchText = (project: Project) =>
  normalize(
    [
      project.title,
      project.category,
      project.platform,
      project.year,
      project.role,
      project.shortDescription,
      ...(project.tags || []),
      ...(projectSearchHints[project.id] || []),
      project.acts.act1.title,
      project.acts.act1.content,
      project.acts.act2.title,
      project.acts.act2.content,
      ...project.acts.act2.decisionPoints,
      project.acts.act3.title,
      project.acts.act3.content,
      project.acts.act3.impact,
    ].join(' ')
  );

const getTerms = (query: string) =>
  Array.from(
    new Set(
      normalize(query)
        .split(' ')
        .filter((term) => term.length > 1)
    )
  );

const scoreProject = (project: Project, query: string, activeSuggestionId: string | null) => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;

  const searchText = getProjectSearchText(project);
  const terms = getTerms(query);
  let score = 0;

  if (searchText.includes(normalizedQuery)) score += 10;

  terms.forEach((term) => {
    if (searchText.includes(term)) {
      score += term.length > 3 ? 3 : 1.5;
    }
  });

  capabilitySuggestions.forEach((suggestion) => {
    const suggestionTriggered =
      activeSuggestionId === suggestion.id ||
      suggestion.keywords.some((keyword) => normalizedQuery.includes(normalize(keyword)));

    if (suggestionTriggered && suggestion.projectIds.includes(project.id)) {
      score += 8 - suggestion.projectIds.indexOf(project.id) * 0.35;
    }
  });

  intentBoosters.forEach((booster) => {
    const triggered = booster.terms.some((term) => normalizedQuery.includes(normalize(term)));
    if (triggered && booster.ids.includes(project.id)) {
      score += 5 - booster.ids.indexOf(project.id) * 0.25;
    }
  });

  if (practiceProjectIds.has(project.id) && !normalizedQuery.includes('practice') && !normalizedQuery.includes('练习') && !normalizedQuery.includes('测试题')) {
    score -= 3;
  }

  return Math.max(score, 0);
};

const WorkPage: React.FC<WorkPageProps> = ({
  projects,
  onProjectClick,
  selectedProjectIds,
  onToggleSelect,
  onReturnToTimeline,
}) => {
  const { language, t } = useLanguage();
  const isZh = language === 'zh';
  const [mode, setMode] = useState<WorkMode>('recommended');
  const [filter, setFilter] = useState<CategoryFilter>('All');
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [activeSuggestionId, setActiveSuggestionId] = useState<string | null>(null);

  const copy = {
    eyebrow: isZh ? '作品检索台' : 'Work finder',
    title: isZh ? '你想找哪一种设计能力？' : 'What kind of designer are you looking for?',
    description: isZh
      ? '输入中文或英文，我会把最相关的作品排到前面。也可以直接浏览全部作品；测试题和个人练习会单独收纳。'
      : 'Type in English or Chinese. The work index will bring the most relevant projects forward, while tests and personal exercises stay separated.',
    composerLabel: isZh ? '告诉我你想重点看什么' : 'Tell me what you want to evaluate',
    placeholder: isZh
      ? '试试：会做 AI 交互、Microsoft 产品体验和前端原型的设计师'
      : 'Try: AI interaction designer with Microsoft product and frontend prototyping experience',
    submit: isZh ? '筛选项目' : 'Find projects',
    clear: isZh ? '清空' : 'Clear',
    assistantDefault: isZh
      ? '我会根据能力关键词、项目时间、工作相关性和作品完成度排序。近期 Microsoft / AI / 交互项目会优先展示。'
      : 'I sort by capability keywords, recency, work relevance, and portfolio strength. Recent Microsoft, AI, and interaction cases come first.',
    modeTitle: isZh ? '浏览方式' : 'Browse mode',
    resultTitle: isZh ? '匹配项目' : 'Matched projects',
    allResultTitle: isZh ? '全部作品' : 'All projects',
    practiceResultTitle: isZh ? '个人练习' : 'Personal practice',
    noResults: isZh ? '暂时没有匹配项目。换一个能力关键词，或切到全部作品浏览。' : 'No matching projects yet. Try another capability keyword or browse all projects.',
    select: isZh ? '加入生成器' : 'Add to generator',
    selected: isZh ? '已加入' : 'Selected',
    searchHint: isZh ? '支持中文 / English 检索' : 'Supports English / 中文 search',
    category: isZh ? '项目类型' : 'Project type',
    practiceNote: isZh ? '测试题和练习不再混进工作经历项目。' : 'Tests and exercises are separated from work-experience projects.',
  };

  const modeOptions: {
    id: WorkMode;
    title: LocalizedText;
    description: LocalizedText;
  }[] = [
    {
      id: 'recommended',
      title: { en: 'Recommended match', zh: '推荐匹配' },
      description: { en: 'Curated order for hiring review.', zh: '按招聘方阅读优先级排序。' },
    },
    {
      id: 'all',
      title: { en: 'Browse all projects', zh: '浏览全部作品' },
      description: { en: 'Open the full work index.', zh: '查看完整作品索引。' },
    },
    {
      id: 'practice',
      title: { en: 'Personal practice', zh: '个人练习' },
      description: { en: 'Exercises, tests, and self-initiated analysis.', zh: '测试题、自主分析和练习项目。' },
    },
  ];

  const effectiveQuery = query.trim() || submittedQuery.trim();

  const scoredProjects = useMemo<ScoredProject[]>(() => {
    const baseProjects = projects.filter((project) => {
      if (mode === 'practice') return practiceProjectIds.has(project.id);
      if (mode === 'recommended') return !practiceProjectIds.has(project.id);
      return true;
    });

    const hasQuery = Boolean(effectiveQuery);
    const scored = baseProjects
      .map((project) => ({
        project,
        score: scoreProject(project, effectiveQuery, activeSuggestionId),
        rank: priorityRank.get(project.id) ?? 999,
        matchReason: projectMatchReasons[project.id] || {
          en: 'Included for its fit with this portfolio direction.',
          zh: '这个项目符合当前作品集方向。',
        },
      }))
      .filter((item) => {
        if (filter !== 'All' && item.project.category !== filter) return false;
        if (!hasQuery) return true;
        return item.score > 0;
      });

    return scored.sort((a, b) => {
      if (hasQuery && b.score !== a.score) return b.score - a.score;
      return a.rank - b.rank;
    });
  }, [activeSuggestionId, effectiveQuery, filter, mode, projects]);

  const resultTitle =
    mode === 'all' ? copy.allResultTitle : mode === 'practice' ? copy.practiceResultTitle : copy.resultTitle;

  const assistantResponse = effectiveQuery
    ? isZh
      ? `我找到 ${scoredProjects.length} 个相关项目。排序会优先考虑你的检索词，同时把近期、工作相关和更能体现能力的项目放前面。`
      : `I found ${scoredProjects.length} relevant project${scoredProjects.length === 1 ? '' : 's'}. Results prioritize your query, then recency, work relevance, and portfolio strength.`
    : copy.assistantDefault;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittedQuery(query.trim());
    if (mode === 'practice') setMode('recommended');
  };

  const handleSuggestionClick = (suggestion: CapabilitySuggestion) => {
    const nextQuery = getLocalized(suggestion.query, isZh);
    setQuery(nextQuery);
    setSubmittedQuery(nextQuery);
    setActiveSuggestionId(suggestion.id);
    setMode('recommended');
  };

  const handleModeChange = (nextMode: WorkMode) => {
    setMode(nextMode);
    if (nextMode !== 'recommended') {
      setQuery('');
      setSubmittedQuery('');
      setActiveSuggestionId(null);
    }
  };

  const handleClear = () => {
    setQuery('');
    setSubmittedQuery('');
    setActiveSuggestionId(null);
  };

  const ProjectCard: React.FC<{ item: ScoredProject; idx: number; isFeatured: boolean }> = ({ item, idx, isFeatured }) => {
    const { project, matchReason } = item;
    const cardRef = useRef<HTMLDivElement>(null);
    const isSelected = selectedProjectIds.includes(project.id);
    const shouldContainCover = project.coverDisplay === 'contain' || Boolean(project.slideSets || project.slides);
    const coverAspectRatio = shouldContainCover ? project.coverAspectRatio : undefined;

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      x.set((event.clientX - rect.left) / rect.width - 0.5);
      y.set((event.clientY - rect.top) / rect.height - 0.5);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.article
        ref={cardRef}
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(idx * 0.05, 0.35), duration: 0.45 }}
        className={isFeatured ? 'lg:col-span-2' : ''}
        style={{
          perspective: '1100px',
          contentVisibility: 'auto',
          containIntrinsicSize: isFeatured ? '720px' : '560px',
        } as React.CSSProperties}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className={`group relative overflow-hidden rounded-[28px] border border-white/80 bg-white/72 shadow-card backdrop-blur-sm transition-shadow duration-300 hover:shadow-card-hover ${
            isFeatured ? 'lg:grid lg:grid-cols-[1.12fr_0.88fr]' : ''
          }`}
        >
          <button
            type="button"
            onClick={() => onProjectClick(project)}
            className="absolute inset-0 z-10"
            aria-label={`${t('work.viewCase')}: ${project.title}`}
          />

          <div
            className={`relative overflow-hidden ${shouldContainCover ? 'bg-white' : 'bg-cream'} ${
              isFeatured ? 'aspect-[16/9] lg:aspect-auto lg:min-h-[430px]' : 'aspect-[16/10]'
            }`}
            style={!isFeatured && coverAspectRatio ? { aspectRatio: coverAspectRatio } : undefined}
          >
            <img
              src={projectCoverAsset(project)}
              alt={project.title}
              loading={idx < 4 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={idx < 2 ? 'high' : 'auto'}
              sizes={isFeatured ? '(min-width: 1024px) 720px, calc(100vw - 48px)' : '(min-width: 1024px) 560px, calc(100vw - 48px)'}
              className={`h-full w-full transition-transform duration-700 ${
                shouldContainCover ? 'object-contain' : 'object-cover group-hover:scale-105'
              }`}
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/28 to-transparent opacity-70" />
            <div className="absolute left-4 top-4 z-20 rounded-full border border-white/70 bg-white/82 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-dark-brown backdrop-blur">
              {String(idx + 1).padStart(2, '0')} / {project.year}
            </div>

            <motion.button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onToggleSelect(project.id);
              }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={`absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border backdrop-blur transition-all ${
                isSelected
                  ? 'border-dark-brown bg-dark-brown text-white'
                  : 'border-white/80 bg-white/88 text-dark-brown hover:bg-white'
              }`}
              aria-label={isSelected ? copy.selected : copy.select}
            >
              {isSelected ? <Check size={18} strokeWidth={3} /> : <Plus size={18} />}
            </motion.button>
          </div>

          <div className={`relative z-20 flex flex-col p-5 sm:p-6 ${isFeatured ? 'lg:p-8' : ''}`}>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-warm-gray">
              <span className="rounded-full bg-cream px-3 py-1">{project.category}</span>
              <span className="rounded-full bg-cream px-3 py-1">{project.platform}</span>
              {practiceProjectIds.has(project.id) ? (
                <span className="rounded-full bg-dark-brown px-3 py-1 text-white">{isZh ? '个人练习' : 'Practice'}</span>
              ) : null}
            </div>

            <h3 className={`font-serif leading-tight text-dark-brown transition-colors group-hover:text-accent ${isFeatured ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>
              {project.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-warm-gray sm:text-base">
              {project.shortDescription}
            </p>

            <div className="mt-5 border-l-2 border-dark-brown/20 pl-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-dark-brown/60">
                {isZh ? '匹配原因' : 'Why it matches'}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-dark-brown">
                {getLocalized(matchReason, isZh)}
              </p>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {(project.tags || []).slice(0, isFeatured ? 6 : 4).map((tag) => (
                <span key={tag} className="rounded-full border border-cream-dark bg-cream-light px-3 py-1 text-[11px] text-warm-gray">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-cream-dark/80 pt-4 text-sm font-medium text-dark-brown">
              <span>{t('work.viewCase')}</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </motion.div>
      </motion.article>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-cream-light px-6 pb-16 pt-28 sm:pb-24 sm:pt-32 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        {onReturnToTimeline ? (
          <button
            type="button"
            onClick={onReturnToTimeline}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-cream-dark bg-white/70 px-4 py-2.5 text-sm font-medium text-dark-brown shadow-sm transition hover:border-brown hover:bg-white"
          >
            <ArrowLeft size={16} />
            {t('work.backToTimeline')}
          </button>
        ) : null}

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_390px]">
          <div className="relative overflow-hidden rounded-[32px] border border-white/75 bg-white/72 p-6 shadow-card backdrop-blur-sm sm:p-8 lg:p-10">
            <div className="pointer-events-none absolute -right-24 -top-32 h-72 w-72 rounded-full bg-cream blur-3xl" />
            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cream-dark bg-cream-light px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-warm-gray">
                <MessageCircle size={14} />
                {copy.eyebrow}
              </div>
              <h1 className="max-w-4xl font-serif text-4xl leading-[0.98] text-dark-brown sm:text-5xl lg:text-7xl">
                {copy.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-warm-gray sm:text-lg">
                {copy.description}
              </p>

              <form onSubmit={handleSubmit} className="mt-8 rounded-[24px] border border-cream-dark bg-cream-light/90 p-4 shadow-inner">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <label htmlFor="work-query" className="flex items-center gap-2 text-sm font-semibold text-dark-brown">
                    <Search size={16} />
                    {copy.composerLabel}
                  </label>
                  <span className="hidden text-xs text-warm-gray sm:block">{copy.searchHint}</span>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row">
                  <textarea
                    id="work-query"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setActiveSuggestionId(null);
                    }}
                    placeholder={copy.placeholder}
                    rows={3}
                    className="min-h-[112px] flex-1 resize-none rounded-2xl border border-cream-dark bg-white px-4 py-3 text-base leading-relaxed text-dark-brown outline-none transition placeholder:text-warm-gray/55 focus:border-brown focus:ring-4 focus:ring-brown/10"
                  />
                  <div className="flex gap-2 sm:w-40 sm:flex-col">
                    <button
                      type="submit"
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-dark-brown px-4 py-3 text-sm font-semibold text-white shadow-button transition hover:bg-brown hover:shadow-button-hover"
                    >
                      <Send size={16} />
                      {copy.submit}
                    </button>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="inline-flex items-center justify-center gap-2 rounded-2xl border border-cream-dark bg-white px-4 py-3 text-sm font-semibold text-dark-brown transition hover:border-brown"
                    >
                      <X size={16} />
                      {copy.clear}
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {capabilitySuggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`rounded-full border px-3.5 py-2 text-left text-xs font-medium transition ${
                        activeSuggestionId === suggestion.id
                          ? 'border-dark-brown bg-dark-brown text-white'
                          : 'border-cream-dark bg-white text-dark-brown hover:border-brown'
                      }`}
                    >
                      {getLocalized(suggestion.label, isZh)}
                    </button>
                  ))}
                </div>
              </form>

              <div className="mt-5 grid gap-3 sm:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)]">
                {effectiveQuery ? (
                  <div className="rounded-2xl bg-dark-brown px-4 py-3 text-sm leading-relaxed text-white shadow-sm">
                    {effectiveQuery}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-cream-dark px-4 py-3 text-sm leading-relaxed text-warm-gray">
                    {isZh ? '例如：AI 交互 / 品牌视觉 / 微软产品 UX / H5 小游戏' : 'Examples: AI interaction / branding / Microsoft UX / H5 game'}
                  </div>
                )}
                <div className="rounded-2xl border border-cream-dark bg-white px-4 py-3 text-sm leading-relaxed text-dark-brown">
                  {assistantResponse}
                </div>
              </div>
            </div>
          </div>

          <aside className="rounded-[32px] border border-white/75 bg-dark-brown p-5 text-white shadow-card sm:p-6 lg:sticky lg:top-28 lg:self-start">
            <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
              <SlidersHorizontal size={15} />
              {copy.modeTitle}
            </div>
            <div className="mt-5 space-y-3">
              {modeOptions.map((option) => {
                const isActive = mode === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => handleModeChange(option.id)}
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      isActive
                        ? 'border-white bg-white text-dark-brown'
                        : 'border-white/14 bg-white/6 text-white hover:border-white/35 hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-serif text-xl leading-tight">{getLocalized(option.title, isZh)}</span>
                      {option.id === 'recommended' ? <Sparkles size={17} /> : option.id === 'all' ? <LayoutGrid size={17} /> : <Search size={17} />}
                    </span>
                    <span className={`mt-2 block text-sm leading-relaxed ${isActive ? 'text-warm-gray' : 'text-white/62'}`}>
                      {getLocalized(option.description, isZh)}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-white/12 bg-white/8 p-4 text-sm leading-relaxed text-white/72">
              {copy.practiceNote}
            </div>
          </aside>
        </section>

        <section className="mt-10 border-t border-cream-dark pt-8">
          <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-gray">
                {copy.category}
              </p>
              <h2 className="mt-2 font-serif text-3xl text-dark-brown sm:text-4xl">
                {resultTitle}
                <span className="ml-3 font-sans text-base font-normal text-warm-gray">
                  {scoredProjects.length}
                </span>
              </h2>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
              {categoryOptions.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setFilter(category)}
                  className={`rounded-full border px-5 py-2.5 text-sm transition whitespace-nowrap ${
                    filter === category
                      ? 'border-dark-brown bg-dark-brown text-white'
                      : 'border-cream-dark bg-white/65 text-warm-gray hover:border-brown hover:text-dark-brown'
                  }`}
                >
                  {category === 'All' ? t('work.all') : category}
                </button>
              ))}
            </div>
          </div>

          {scoredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {scoredProjects.map((item, idx) => (
                <ProjectCard
                  key={item.project.id}
                  item={item}
                  idx={idx}
                  isFeatured={idx === 0 && mode !== 'practice'}
                />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-cream-dark bg-white/60 px-6 py-16 text-center text-warm-gray">
              {copy.noResults}
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
};

export default WorkPage;

import React, { useMemo, useState } from 'react';
import { Project } from '../types';
import { ArrowLeft, ArrowRight, Check, Plus, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
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
type LocalizedText = { en: string; zh: string };

interface CapabilitySuggestion {
  id: string;
  label: LocalizedText;
  query: LocalizedText;
  projectIds: string[];
  keywords: string[];
}

interface ScoredProject {
  project: Project;
  score: number;
  rawScore: number;
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
  'p7',
  'p16',
  'p18',
  'p19',
  'p4',
  'p14',
  'p11',
  'p9',
  'p8',
  'p2',
];

const priorityRank = new Map(featuredProjectOrder.map((id, index) => [id, index]));
const recommendedDefaultProjectIds = new Set(featuredProjectOrder.slice(0, 12));
const featuredProjectIds = new Set(['p1', 'p21', 'p3', 'p20', 'p5', 'p15', 'p17']);
const coreCapabilityProjectIds = new Set(['p1', 'p3', 'p20', 'p21', 'p5', 'p13', 'p15', 'p17', 'p12']);

const capabilitySuggestions: CapabilitySuggestion[] = [
  {
    id: 'ai-interaction',
    label: { en: 'AI interaction designer', zh: 'AI 交互设计师' },
    query: {
      en: 'AI interaction designer who can translate research models into usable product experiences',
      zh: '能把 AI 研究模型转译成可操作产品体验的交互设计师',
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
    projectIds: ['p1', 'p3', 'p20', 'p5', 'p13', 'p6'],
    keywords: ['microsoft', 'office', 'copilot', 'msra', 'stca', '微软', '研究院', '语音'],
  },
  {
    id: 'vibe-coding',
    label: { en: 'Vibe coding + frontend', zh: 'Vibe Coding 与前端' },
    query: {
      en: 'designer who can use vibe coding and frontend prototyping to turn ideas into interactive web experiences',
      zh: '能用 Vibe Coding 和前端原型把想法做成交互网页体验的设计师',
    },
    projectIds: ['p21', 'p20', 'p3', 'p5'],
    keywords: ['vibe', 'coding', 'frontend', 'prototype', 'react', '前端', '原型', '可运行'],
  },
  {
    id: 'visual-system',
    label: { en: 'Visual system / branding', zh: '视觉系统与品牌' },
    query: {
      en: 'visual designer with branding, packaging, identity, and polished system craft',
      zh: '有品牌、包装、视觉系统和精修能力的视觉设计师',
    },
    projectIds: ['p7', 'p15', 'p17', 'p16', 'p18', 'p19', 'p11', 'p9', 'p6'],
    keywords: ['visual', 'brand', 'branding', 'packaging', 'identity', 'graphic', '视觉', '品牌', '包装', '平面'],
  },
  {
    id: 'mobile-flow',
    label: { en: 'Mobile flow / app logic', zh: '移动端流程与逻辑' },
    query: {
      en: 'mobile product designer who can analyze user flows, app logic, and interaction hierarchy',
      zh: '能分析移动端用户流程、产品逻辑和交互层级的设计师',
    },
    projectIds: ['p4', 'p14', 'p2'],
    keywords: ['mobile', 'app', 'flow', 'journey', 'analysis', '移动端', '流程', '路径', '分析'],
  },
  {
    id: 'h5-campaign',
    label: { en: 'H5 game / campaign', zh: 'H5 小游戏 / 活动' },
    query: {
      en: 'designer who can build an H5 game or campaign flow with story, sharing, and interaction logic',
      zh: '能设计 H5 小游戏、活动流程、剧情互动和分享路径的设计师',
    },
    projectIds: ['p21', 'p7', 'p6', 'p11'],
    keywords: ['h5', 'game', 'campaign', 'festival', 'share', '小游戏', '活动', '节日', '分享', '元宵'],
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
    en: 'Recent Microsoft product work: voice UX, Office workflows, and Copilot interaction patterns.',
    zh: '近期微软产品工作：语音交互、Office 流程与 Copilot 体验模式。',
  },
  p2: {
    en: 'Kept as personal practice because it is a flow-analysis exercise rather than a shipped work project.',
    zh: '归入个人练习：这是流程分析测试题，不和正式工作项目混在一起。',
  },
  p3: {
    en: 'Strong evidence for turning early generative AI research into explorable web interactions.',
    zh: '最能证明把早期生成式 AI 研究能力转成可探索网页交互的项目。',
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
    zh: 'Microsoft Research 视觉项目，体现活动识别与传播视觉完成度。',
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
    en: 'A focused packaging and poster case with food-brand visual storytelling.',
    zh: '食品品牌相关包装与海报项目，适合补充视觉叙事。',
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
    en: 'A visual-system case with clear branding and information design value.',
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
    ids: ['p21', 'p20', 'p3', 'p5'],
  },
  {
    terms: ['mobile', 'app', 'journey', 'analysis', 'exercise', 'test', '移动端', '路径', '分析', '测试题', '练习'],
    ids: ['p2', 'p4', 'p14'],
  },
];

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[|/_,.;:()[\]{}"'!?，。；：、（）【】]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const getLocalized = (text: LocalizedText, isZh: boolean) => (isZh ? text.zh : text.en);

const queryStopWords = new Set([
  'and',
  'can',
  'designer',
  'designers',
  'design',
  'designed',
  'experience',
  'experiences',
  'for',
  'kind',
  'looking',
  'project',
  'projects',
  'role',
  'skills',
  'the',
  'tool',
  'tools',
  'type',
  'usable',
  'who',
  'with',
  'work',
  '作品',
  '会做',
  '工具',
  '经验',
  '角色',
  '类型',
  '能力',
  '设计',
  '设计师',
  '项目',
]);

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
        .filter((term) => term.length > 1 && !queryStopWords.has(term))
    )
  );

const getPrimaryYear = (project: Project) => Number(project.year.match(/\d{4}/)?.[0] || 0);

const isRecentProject = (project: Project) => getPrimaryYear(project) >= 2024;

const scoreProject = (project: Project, query: string, activeSuggestionId: string | null) => {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;

  const searchText = getProjectSearchText(project);
  const terms = getTerms(query);
  let score = 0;

  if (searchText.includes(normalizedQuery)) score += 12;

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
      score += 9 - suggestion.projectIds.indexOf(project.id) * 0.4;
    }
  });

  intentBoosters.forEach((booster) => {
    const triggered = booster.terms.some((term) => normalizedQuery.includes(normalize(term)));
    if (triggered && booster.ids.includes(project.id)) {
      score += 5.5 - booster.ids.indexOf(project.id) * 0.25;
    }
  });

  return Math.max(score, 0);
};

const getProjectSortBoost = (project: Project) => {
  let boost = 0;
  if (featuredProjectIds.has(project.id)) boost += 4;
  if (coreCapabilityProjectIds.has(project.id)) boost += 3;
  if (isRecentProject(project)) boost += 2;
  boost += Math.max(0, 5 - (priorityRank.get(project.id) ?? 999) * 0.2);
  return boost;
};

const getModeLabel = (mode: WorkMode, isZh: boolean) => {
  if (mode === 'all') return isZh ? '全部作品' : 'All projects';
  if (mode === 'practice') return isZh ? '个人练习' : 'Personal practice';
  return isZh ? '推荐匹配' : 'Recommended';
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
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [activeSuggestionId, setActiveSuggestionId] = useState<string | null>(null);

  const copy = {
    badge: isZh ? '作品检索' : 'WORK FINDER',
    title: isZh ? '你在寻找什么样的设计能力？' : 'What kind of designer are you looking for?',
    subtitle: isZh
      ? '输入角色、能力、工具或项目类型，我会把最相关的作品放到前面。'
      : 'Describe the role, skills, tools, or project type. I’ll bring the most relevant work forward.',
    placeholder: isZh
      ? '试试输入“会做 AI 交互、微软产品 UX 和前端原型的设计师”'
      : 'Try “AI interaction designer with Microsoft product UX and frontend prototyping experience”',
    submit: isZh ? '查找作品' : 'Find projects',
    clear: isZh ? '清空' : 'Clear',
    searchHint: isZh ? '支持中文和 English 检索' : 'Supports English and 中文 search',
    recommendedNote: isZh
      ? '默认优先展示近期、Microsoft、AI 交互、产品 UX 和完成度更高的正式作品。'
      : 'By default, recent Microsoft, AI interaction, product UX, and stronger formal cases appear first.',
    queryNote: isZh
      ? '已按你的描述重新排序。你也可以换一个能力、工具、公司或项目类型继续找。'
      : 'Sorted by your description. You can also search another skill, tool, company, or project type.',
    practiceNote: isZh
      ? '测试题、练习和个人实验单独收在这里，不混进正式工作项目。'
      : 'Exercises, tests, and self-initiated explorations stay here, separate from formal work.',
    results: isZh ? '作品结果' : 'Project results',
    noResults: isZh
      ? '暂时没有完全匹配的项目。可以试试输入能力、工具、公司或项目类型。'
      : 'No exact match yet. Try describing a skill, tool, company, or project type.',
    select: isZh ? '加入生成器' : 'Add to generator',
    selected: isZh ? '已加入' : 'Selected',
    featured: isZh ? '精选' : 'Featured',
    recent: isZh ? '近期' : 'Recent',
    practice: isZh ? '练习' : 'Practice',
    matchReason: isZh ? '为什么推荐' : 'Why this appears',
  };

  const modeOptions: { id: WorkMode; label: LocalizedText }[] = [
    { id: 'recommended', label: { en: 'Recommended', zh: '推荐匹配' } },
    { id: 'all', label: { en: 'All projects', zh: '全部作品' } },
    { id: 'practice', label: { en: 'Personal practice', zh: '个人练习' } },
  ];

  const effectiveQuery = submittedQuery.trim();

  const scoredProjects = useMemo<ScoredProject[]>(() => {
    const baseProjects = projects.filter((project) => {
      if (mode === 'practice') return practiceProjectIds.has(project.id);
      if (mode === 'recommended' && !effectiveQuery) {
        return !practiceProjectIds.has(project.id) && recommendedDefaultProjectIds.has(project.id);
      }
      return !practiceProjectIds.has(project.id);
    });

    const hasQuery = Boolean(effectiveQuery);
    const scored = baseProjects
      .map((project) => {
        const matchScore = scoreProject(project, effectiveQuery, activeSuggestionId);
        return {
          project,
          score: matchScore + (hasQuery ? getProjectSortBoost(project) : 0),
          rawScore: matchScore,
          rank: priorityRank.get(project.id) ?? 999,
          matchReason: projectMatchReasons[project.id] || {
            en: 'Included for its fit with this portfolio direction.',
            zh: '这个项目符合当前作品集方向。',
          },
        };
      })
      .filter((item) => {
        if (!hasQuery) return true;
        return item.rawScore >= 3;
      });

    return scored.sort((a, b) => {
      if (hasQuery && b.score !== a.score) return b.score - a.score;
      return a.rank - b.rank;
    });
  }, [activeSuggestionId, effectiveQuery, mode, projects]);

  const helperNote = effectiveQuery
    ? copy.queryNote
    : mode === 'practice'
      ? copy.practiceNote
      : copy.recommendedNote;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextQuery = query.trim();
    setSubmittedQuery(nextQuery);
    if (!nextQuery) {
      setActiveSuggestionId(null);
      setMode('recommended');
    }
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
    setQuery('');
    setSubmittedQuery('');
    setActiveSuggestionId(null);
  };

  const handleClear = () => {
    setQuery('');
    setSubmittedQuery('');
    setActiveSuggestionId(null);
    setMode('recommended');
  };

  const ProjectCard: React.FC<{ item: ScoredProject; idx: number }> = ({ item, idx }) => {
    const { project, matchReason } = item;
    const isSelected = selectedProjectIds.includes(project.id);
    const shouldContainCover = project.coverDisplay === 'contain' || Boolean(project.slideSets || project.slides);
    const coverAspectRatio = shouldContainCover ? project.coverAspectRatio : undefined;
    const badges = [
      practiceProjectIds.has(project.id) ? copy.practice : null,
      !practiceProjectIds.has(project.id) && featuredProjectIds.has(project.id) ? copy.featured : null,
      !practiceProjectIds.has(project.id) && isRecentProject(project) ? copy.recent : null,
    ].filter(Boolean);

    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(idx * 0.035, 0.22), duration: 0.38 }}
        style={{
          contentVisibility: 'auto',
          containIntrinsicSize: '560px',
        } as React.CSSProperties}
      >
        <div className="group relative h-full overflow-hidden rounded-[26px] border border-[#E7DCCB] bg-white/72 shadow-[0_16px_42px_rgba(73,45,24,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#D7C7B2] hover:bg-white/86 hover:shadow-[0_22px_54px_rgba(73,45,24,0.12)]">
          <button
            type="button"
            onClick={() => onProjectClick(project)}
            className="absolute inset-0 z-10"
            aria-label={`${t('work.viewCase')}: ${project.title}`}
          />

          <div
            className={`relative overflow-hidden ${shouldContainCover ? 'bg-[#F8F2EA]' : 'bg-cream'} aspect-[16/10]`}
            style={coverAspectRatio ? { aspectRatio: coverAspectRatio } : undefined}
          >
            <img
              src={projectCoverAsset(project)}
              alt={project.title}
              loading={idx < 4 ? 'eager' : 'lazy'}
              decoding="async"
              fetchPriority={idx < 2 ? 'high' : 'auto'}
              sizes="(min-width: 1280px) 340px, (min-width: 768px) 44vw, calc(100vw - 48px)"
              className={`h-full w-full transition-transform duration-700 ${
                shouldContainCover ? 'object-contain' : 'object-cover group-hover:scale-[1.035]'
              }`}
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#2F1B0D]/24 to-transparent" />

            <div className="absolute left-4 top-4 z-20 flex flex-wrap gap-2">
              {badges.slice(0, 2).map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-white/72 bg-white/84 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#4A2D18] backdrop-blur-sm"
                >
                  {badge}
                </span>
              ))}
            </div>

            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                onToggleSelect(project.id);
              }}
              className={`absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur-sm transition ${
                isSelected
                  ? 'border-[#4A2D18] bg-[#4A2D18] text-white'
                  : 'border-white/76 bg-white/86 text-[#4A2D18] hover:bg-white'
              }`}
              aria-label={isSelected ? copy.selected : copy.select}
              title={isSelected ? copy.selected : copy.select}
            >
              {isSelected ? <Check size={17} strokeWidth={3} /> : <Plus size={17} />}
            </button>
          </div>

          <div className="relative z-20 flex min-h-[286px] flex-col p-5 sm:p-6">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-medium text-[#8C7762]">
              <span>{project.year}</span>
              <span className="h-1 w-1 rounded-full bg-[#C7B8A5]" />
              <span>{project.platform}</span>
              <span className="h-1 w-1 rounded-full bg-[#C7B8A5]" />
              <span>{project.category}</span>
            </div>

            <h3 className="font-serif text-[1.55rem] leading-[1.04] text-[#3B230E] transition-colors group-hover:text-[#8B5A2B]">
              {project.title}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[#756352]">
              {project.shortDescription}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {(project.tags || []).slice(0, 4).map((tag) => (
                <span key={tag} className="rounded-full border border-[#E7DCCB] bg-[#FBF7F1] px-3 py-1 text-[11px] text-[#756352]">
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto pt-6">
              <div className="rounded-[18px] border border-[#EDE3D6] bg-[#FBF7F1]/74 px-4 py-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9A8068]">{copy.matchReason}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-[#4A2D18]">{getLocalized(matchReason, isZh)}</p>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-[#3B230E]">
                <span>{t('work.viewCase')}</span>
                <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[linear-gradient(180deg,#FBF6EE_0%,#F5EBDC_54%,#FBF7F1_100%)] px-5 pb-16 pt-28 sm:px-7 sm:pb-24 sm:pt-32"
    >
      <div className="mx-auto max-w-[1120px]">
        {onReturnToTimeline ? (
          <button
            type="button"
            onClick={onReturnToTimeline}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#E3D5C4] bg-white/64 px-4 py-2.5 text-sm font-medium text-[#4A2D18] shadow-sm transition hover:border-[#C7A789] hover:bg-white"
          >
            <ArrowLeft size={16} />
            {t('work.backToTimeline')}
          </button>
        ) : null}

        <section className="mx-auto max-w-[960px] text-center">
          <div className="inline-flex items-center rounded-full border border-[#E6D8C8] bg-white/58 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8C7762] shadow-sm">
            {copy.badge}
          </div>

          <h1 className="mx-auto mt-6 max-w-[820px] font-serif text-[2.7rem] leading-[0.98] text-[#3B230E] sm:text-6xl lg:text-[4.65rem]">
            {copy.title}
          </h1>
          <p className="mx-auto mt-5 max-w-[690px] text-base leading-relaxed text-[#756352] sm:text-lg">
            {copy.subtitle}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-9 max-w-[860px] rounded-[30px] border border-[#E4D6C5] bg-white/70 p-3 text-left shadow-[0_22px_70px_rgba(73,45,24,0.10)] backdrop-blur-md sm:p-4"
          >
            <label htmlFor="work-query" className="sr-only">
              {copy.title}
            </label>
            <div className="flex min-h-[148px] flex-col">
              <textarea
                id="work-query"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveSuggestionId(null);
                }}
                placeholder={copy.placeholder}
                rows={3}
                className="min-h-[96px] flex-1 resize-none rounded-[24px] border-0 bg-transparent px-4 py-4 text-[1.02rem] leading-relaxed text-[#3B230E] outline-none placeholder:text-[#9D8B79] sm:px-5"
              />

              <div className="flex flex-col gap-3 border-t border-[#EEE3D7] px-2 pb-1 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2 text-xs text-[#8C7762]">
                  <Search size={15} />
                  <span>{copy.searchHint}</span>
                </div>

                <div className="flex items-center gap-2">
                  {query || submittedQuery ? (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#E6D8C8] bg-white/72 text-[#756352] transition hover:border-[#C7A789] hover:text-[#3B230E]"
                      aria-label={copy.clear}
                      title={copy.clear}
                    >
                      <X size={16} />
                    </button>
                  ) : null}
                  <button
                    type="submit"
                    className="inline-flex h-10 items-center justify-center rounded-full bg-[#4A2D18] px-5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(74,45,24,0.18)] transition hover:bg-[#6E4727] hover:shadow-[0_10px_24px_rgba(74,45,24,0.22)]"
                  >
                    {copy.submit}
                  </button>
                </div>
              </div>
            </div>
          </form>

          <div className="mx-auto mt-4 flex max-w-[850px] flex-wrap justify-center gap-2">
            {capabilitySuggestions.map((suggestion) => (
              <button
                key={suggestion.id}
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                className={`rounded-full border px-3.5 py-2 text-xs font-medium transition sm:text-sm ${
                  activeSuggestionId === suggestion.id
                    ? 'border-[#4A2D18] bg-[#4A2D18] text-white'
                    : 'border-[#E3D5C4] bg-white/48 text-[#5B3A22] hover:border-[#C7A789] hover:bg-white/82'
                }`}
              >
                {getLocalized(suggestion.label, isZh)}
              </button>
            ))}
          </div>

          <div className="mx-auto mt-7 flex w-full max-w-[620px] rounded-full border border-[#E3D5C4] bg-white/48 p-1 shadow-sm">
            {modeOptions.map((option) => {
              const isActive = mode === option.id;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => handleModeChange(option.id)}
                  className={`min-h-10 flex-1 rounded-full px-3 text-xs font-semibold transition sm:text-sm ${
                    isActive
                      ? 'bg-white text-[#3B230E] shadow-[0_6px_18px_rgba(73,45,24,0.10)]'
                      : 'text-[#8C7762] hover:text-[#3B230E]'
                  }`}
                >
                  {getLocalized(option.label, isZh)}
                </button>
              );
            })}
          </div>

          <p className="mx-auto mt-4 max-w-[720px] text-sm leading-relaxed text-[#7B6856]">
            {helperNote}
          </p>
        </section>

        <section className="mt-12 sm:mt-16">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#9A8068]">{copy.results}</p>
              <h2 className="mt-2 font-serif text-3xl leading-tight text-[#3B230E] sm:text-4xl">
                {getModeLabel(mode, isZh)}
              </h2>
            </div>
            <p className="text-sm text-[#7B6856]">
              {scoredProjects.length} {isZh ? '个项目' : scoredProjects.length === 1 ? 'project' : 'projects'}
              {effectiveQuery ? ` · “${effectiveQuery}”` : ''}
            </p>
          </div>

          {scoredProjects.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {scoredProjects.map((item, idx) => (
                <ProjectCard key={item.project.id} item={item} idx={idx} />
              ))}
            </div>
          ) : (
            <div className="rounded-[28px] border border-dashed border-[#DCCDBC] bg-white/56 px-6 py-16 text-center text-[#756352] shadow-sm">
              {copy.noResults}
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
};

export default WorkPage;

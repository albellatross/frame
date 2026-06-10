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
const heroProjectIds = new Set(['p1', 'p21', 'p3']);

const capabilitySuggestions: CapabilitySuggestion[] = [
  {
    id: 'ai-interaction',
    label: { en: 'AI interaction', zh: 'AI 交互' },
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
    id: 'frontend-prototype',
    label: { en: 'Frontend prototype', zh: '前端原型' },
    query: {
      en: 'designer who can use frontend prototyping and vibe coding to make interaction ideas testable',
      zh: '能用前端原型和 Vibe Coding 把交互想法做成可测试体验的设计师',
    },
    projectIds: ['p21', 'p20', 'p3', 'p5'],
    keywords: ['vibe', 'coding', 'frontend', 'prototype', 'react', '前端', '原型', '可运行'],
  },
  {
    id: 'visual-system',
    label: { en: 'Visual systems', zh: '视觉系统' },
    query: {
      en: 'visual designer with branding, packaging, identity, and polished system craft',
      zh: '有品牌、包装、视觉系统和精修能力的视觉设计师',
    },
    projectIds: ['p7', 'p15', 'p17', 'p16', 'p18', 'p19', 'p11', 'p9', 'p6'],
    keywords: ['visual', 'brand', 'branding', 'packaging', 'identity', 'graphic', '视觉', '品牌', '包装', '平面'],
  },
  {
    id: 'mobile-flow',
    label: { en: 'Mobile flow', zh: '移动端流程' },
    query: {
      en: 'mobile product designer who can analyze user flows, app logic, and interaction hierarchy',
      zh: '能分析移动端用户流程、产品逻辑和交互层级的设计师',
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
  p2: ['keeta', 'user flow', 'mobile app analysis', 'test exercise', 'personal practice', '流程分析', '移动端', '测试题', '个人练习', '外卖'],
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
  p4: ['reme', 'ai companion', 'consumer app', 'companion ux', 'ai 陪伴', 'c 端', '用户体验'],
  p5: ['rd-agent', 'agent', 'research workflow', 'internal tool', '科研工作流', '智能体', '研究工具'],
  p6: ['msra 25th anniversary', 'event visual', 'microsoft research asia', 'anniversary', 'visual design', '微软亚洲研究院', '周年', '活动视觉'],
  p7: ['ioete tea shop', 'tea shop', 'fom studio', 'brand identity', 'packaging', '茶店', '品牌', '包装'],
  p8: ['illustration', 'graphic', 'editorial', 'visual exploration', '插画', '平面', '个人视觉'],
  p9: ['heart printing', 'packaging', 'graphic', 'print', '包装', '印刷', '视觉'],
  p11: ['white elephant', 'poster', 'packaging', 'contest', '白象', '海报', '包装', '视觉'],
  p12: ['baidu ai cloud', 'ai cloud', 'enterprise', 'system', '百度智能云', '企业工具', '系统'],
  p13: ['taskmatrix.ai', 'agent', 'ai system', 'research demo', 'automation', '任务矩阵', '智能体', '研究 demo'],
  p14: ['xiaodu learning tablet', 'education', 'iot', 'children', 'learning', '小度', '教育', '学习机', '儿童'],
  p15: ['value compass', 'visual system', 'information design', 'branding', '价值指南针', '视觉系统', '信息设计'],
  p16: ['salone del mobile', 'milan', 'exhibition', 'editorial', 'furniture', '米兰', '展览', '版式', '家具展'],
  p17: ['batteryml', 'visual design', 'ai research', 'system', 'data visualization', '电池', '机器学习', '视觉系统'],
  p18: ['fera', 'branding', 'identity', 'visual design', '品牌', '识别', '视觉'],
  p19: ['profiltubi', 'rebranding', 'group work', 'identity', 'brand system', '品牌重塑', '视觉识别'],
  p20: ['rodin diffusion', '3d avatar', '3d generation', 'microsoft research', 'research demo', 'ai interaction', '3d 头像', '三维生成', '研究 demo', '微软研究院'],
  p21: ['lantern night return', 'spring festival', 'lantern festival', 'h5 game', 'vibe coding', 'theme translation', 'ticket sharing', '元宵夜归人', '春节回家路', '节日小游戏', '主题转译', '票根分享', '结局收集'],
};

const projectKinds: Record<string, LocalizedText> = {
  p1: { en: 'AI product UX', zh: 'AI 产品 UX' },
  p2: { en: 'Flow analysis practice', zh: '流程分析练习' },
  p3: { en: 'AI research demo', zh: 'AI 研究 Demo' },
  p4: { en: 'Mobile AI app', zh: '移动端 AI' },
  p5: { en: 'Research workflow', zh: '科研工作流' },
  p6: { en: 'Event identity', zh: '活动视觉' },
  p7: { en: 'Brand identity', zh: '品牌识别' },
  p8: { en: 'Illustration', zh: '插画' },
  p9: { en: 'Packaging', zh: '包装设计' },
  p11: { en: 'Poster / packaging', zh: '海报 / 包装' },
  p12: { en: 'Enterprise AI', zh: '企业级 AI' },
  p13: { en: 'AI agent workflow', zh: 'AI Agent 工作流' },
  p14: { en: 'Education UX', zh: '教育 UX' },
  p15: { en: 'Visual system', zh: '视觉系统' },
  p16: { en: 'Editorial web', zh: '编辑式网页' },
  p17: { en: 'Research visual', zh: '研究视觉' },
  p18: { en: 'Brand identity', zh: '品牌识别' },
  p19: { en: 'Rebranding', zh: '品牌重塑' },
  p20: { en: '3D AI demo', zh: '3D AI Demo' },
  p21: { en: 'H5 game flow', zh: 'H5 小游戏' },
};

const projectDisplayTitles: Record<string, LocalizedText> = {
  p12: { en: 'Baidu AI Cloud', zh: '百度智能云' },
  p14: { en: 'Xiaodu Learning Tablet', zh: '小度学习机' },
  p21: { en: 'Lantern Night Return', zh: '元宵夜归人' },
};

const projectTeasers: Record<string, LocalizedText> = {
  p1: {
    en: 'Voice-first Office reading experience with Copilot interruption, listening, answering, and resume states.',
    zh: '为 Office Read Aloud 设计可打断、可提问、可恢复的 Copilot 语音阅读体验。',
  },
  p2: {
    en: 'A mobile ordering-flow analysis exercise, separated from shipped and work-context projects.',
    zh: '移动端下单流程分析练习，和正式工作项目分开展示。',
  },
  p3: {
    en: 'Turning outpainting, long video generation, and path control into web interactions people could try.',
    zh: '把图像外扩、长视频和轨迹控制做成用户可以直接尝试的网页交互。',
  },
  p4: {
    en: 'A consumer AI companion case around memory, empathy, and mobile product framing.',
    zh: '围绕记忆、陪伴和移动端产品结构的 AI companion 体验。',
  },
  p5: {
    en: 'AI-assisted research workflow for hypothesis generation, hierarchy, and tool usability.',
    zh: '面向科研假设生成的 AI 工作流、信息层级和工具可用性设计。',
  },
  p6: {
    en: 'Microsoft Research anniversary visuals across event identity, objects, and communication surfaces.',
    zh: 'Microsoft Research 周年活动视觉，覆盖纪念物、横幅和传播物料。',
  },
  p7: {
    en: 'A Milan studio brand system for a tea shop, from identity to packaging and retail touchpoints.',
    zh: '米兰工作室茶店品牌系统，从识别到包装与零售触点。',
  },
  p8: {
    en: 'Commercial illustration and character work that extends the portfolio’s visual range.',
    zh: '商业插画与角色视觉作品，补充作品集的图形表达范围。',
  },
  p9: {
    en: 'Packaging-focused visual work with clear object, print, and shelf-facing outcomes.',
    zh: '以包装结果物为核心的视觉项目，强调印刷与货架表达。',
  },
  p11: {
    en: 'A food-brand poster and packaging concept with a focused visual storytelling angle.',
    zh: '食品品牌海报与包装方向，强调清晰的视觉叙事。',
  },
  p12: {
    en: 'Enterprise AI cloud visual upgrade focused on information hierarchy and platform polish.',
    zh: '企业级 AI 云平台视觉升级，聚焦信息层级和平台完成度。',
  },
  p13: {
    en: 'AI agent storytelling workflow, presented as source design pages and interaction structure.',
    zh: 'AI Agent storytelling 工作流，展示设计稿和交互结构。',
  },
  p14: {
    en: 'Learning tablet homepage redesign around study rhythm, hierarchy, and AI entry points.',
    zh: '学习机首页重构，围绕学习节奏、信息层级和 AI 入口。',
  },
  p15: {
    en: 'A value-alignment research interface with visual system and technical communication craft.',
    zh: '价值对齐研究界面与视觉系统，服务技术内容表达。',
  },
  p16: {
    en: 'A Milan design-event concept with editorial rhythm and mobile-first art direction.',
    zh: '米兰设计展移动端网页概念，强调编辑式节奏与艺术指导。',
  },
  p17: {
    en: 'Research-facing visual identity for BatteryML, including technical communication and motion assets.',
    zh: 'BatteryML 研究传播视觉识别，包含技术表达和动态素材。',
  },
  p18: {
    en: 'A concise identity system with logo direction, applications, and presentation craft.',
    zh: '简洁的品牌识别系统，包含 logo、应用和提案展示。',
  },
  p19: {
    en: 'A group rebranding proposal for an industrial brand, from identity to application system.',
    zh: '工业品牌重塑小组提案，从识别到应用系统。',
  },
  p20: {
    en: 'Making a 3D avatar generation model readable through public-facing demo structure and interaction evidence.',
    zh: '把 3D avatar generation 模型整理成可读、可浏览、可验证的公开 demo 体验。',
  },
  p21: {
    en: 'A theme-translation case: from Spring Festival homecoming to Lantern Festival story, quiz, and ticket sharing.',
    zh: '从春节回家路转译到元宵夜归人，组织故事、问答、结局和票根分享。',
  },
};

const intentBoosters = [
  {
    terms: ['ai', 'aigc', 'generative', 'research', 'multimodal', 'model', 'demo', '生成式', '人工智能', '多模态', '研究', '模型'],
    ids: ['p3', 'p20', 'p5', 'p13', 'p15', 'p17', 'p1', 'p12'],
  },
  {
    terms: ['interaction', 'ux', 'product', 'flow', 'prototype', 'control', '交互', '产品体验', '流程', '原型', '控制'],
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

const getProjectKind = (project: Project, isZh: boolean) =>
  getLocalized(projectKinds[project.id] || { en: project.platform, zh: project.platform }, isZh);

const getProjectTitle = (project: Project, isZh: boolean) =>
  getLocalized(projectDisplayTitles[project.id] || { en: project.title, zh: project.title }, isZh);

const getProjectTeaser = (project: Project, isZh: boolean) =>
  getLocalized(projectTeasers[project.id] || { en: project.shortDescription, zh: project.shortDescription }, isZh);

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
    heroBadge: isZh ? '精选作品' : 'SELECTED WORK',
    heroTitle: isZh ? 'AI 产品体验、研究 Demo 与视觉系统。' : 'AI product experience, research demos, and visual systems.',
    heroSubtitle: isZh
      ? '我把复杂技术、产品路径和视觉表达整理成用户能理解、能操作、也愿意继续探索的体验。'
      : 'I turn complex technology, product flows, and visual systems into experiences people can understand, use, and keep exploring.',
    focusTitle: isZh ? '作品主线' : 'Portfolio focus',
    focusBody: isZh
      ? 'Microsoft 产品 UX / AI 交互转译 / 前端原型 / 视觉系统'
      : 'Microsoft product UX / AI interaction translation / frontend prototypes / visual systems',
    finderTitle: isZh ? '想看某一种能力？' : 'Looking for a specific capability?',
    finderSubtitle: isZh ? '这里可以辅助检索，但作品会先按策展顺序展示。' : 'Use this as a light helper. The page still opens with curated work first.',
    placeholder: isZh ? '例如：微软产品 UX、AI 交互、H5 小游戏、品牌视觉' : 'Try: Microsoft product UX, AI interaction, H5 game, visual system',
    submit: isZh ? '查找' : 'Find',
    clear: isZh ? '清空' : 'Clear',
    selectedWork: isZh ? '策展作品' : 'Selected work',
    allWork: isZh ? '全部正式作品' : 'All work',
    practice: isZh ? '个人练习' : 'Practice',
    allSection: isZh ? '完整作品索引' : 'Complete work index',
    selectedSection: isZh ? '更多精选作品' : 'More selected work',
    searchSection: isZh ? '匹配作品' : 'Search matches',
    practiceSection: isZh ? '个人练习' : 'Personal practice',
    noResults: isZh ? '暂时没有完全匹配的项目。试试输入能力、工具、公司或项目类型。' : 'No exact match yet. Try a skill, tool, company, or project type.',
    select: isZh ? '加入生成器' : 'Add to generator',
    selected: isZh ? '已加入' : 'Selected',
    viewCase: isZh ? '查看案例' : 'View case',
  };

  const modeOptions: { id: WorkMode; label: string }[] = [
    { id: 'recommended', label: copy.selectedWork },
    { id: 'all', label: copy.allWork },
    { id: 'practice', label: copy.practice },
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

  const showFeatured = mode === 'recommended' && !effectiveQuery;
  const heroItems = showFeatured ? scoredProjects.filter((item) => heroProjectIds.has(item.project.id)).slice(0, 3) : [];
  const gridItems = showFeatured ? scoredProjects.filter((item) => !heroProjectIds.has(item.project.id)) : scoredProjects;
  const sectionTitle = effectiveQuery
    ? copy.searchSection
    : mode === 'all'
      ? copy.allSection
      : mode === 'practice'
        ? copy.practiceSection
        : copy.selectedSection;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextQuery = query.trim();
    setSubmittedQuery(nextQuery);
    if (!nextQuery) {
      setActiveSuggestionId(null);
      setMode('recommended');
    } else if (mode === 'practice') {
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

  const AddButton: React.FC<{ project: Project; floating?: boolean }> = ({ project, floating = false }) => {
    const isSelected = selectedProjectIds.includes(project.id);
    return (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onToggleSelect(project.id);
        }}
        className={`z-30 inline-flex items-center justify-center rounded-full border transition ${
          floating ? 'absolute right-4 top-4 h-10 w-10 backdrop-blur-sm' : 'h-9 w-9'
        } ${
          isSelected
            ? 'border-[#3B230E] bg-[#3B230E] text-white'
            : 'border-[#E2D0BD] bg-white/86 text-[#4A2D18] hover:border-[#B99071] hover:bg-white'
        }`}
        aria-label={isSelected ? copy.selected : copy.select}
        title={isSelected ? copy.selected : copy.select}
      >
        {isSelected ? <Check size={16} strokeWidth={3} /> : <Plus size={16} />}
      </button>
    );
  };

  const ProjectImage: React.FC<{ project: Project; idx: number; large?: boolean }> = ({ project, idx, large = false }) => {
    const shouldContainCover = project.coverDisplay === 'contain' || Boolean(project.slideSets || project.slides);
    return (
      <img
        src={projectCoverAsset(project)}
        alt={project.title}
        loading={idx < 4 ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={idx < 2 ? 'high' : 'auto'}
        sizes={large ? '(min-width: 1024px) 760px, calc(100vw - 40px)' : '(min-width: 1280px) 360px, (min-width: 768px) 46vw, calc(100vw - 40px)'}
        className={`h-full w-full transition-transform duration-700 ${
          shouldContainCover ? 'object-contain' : 'object-cover group-hover:scale-[1.035]'
        }`}
      />
    );
  };

  const FeaturedCard: React.FC<{ item: ScoredProject; idx: number; large?: boolean }> = ({ item, idx, large = false }) => {
    const project = item.project;
    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.06, duration: 0.45 }}
        className={large ? 'lg:row-span-2' : ''}
      >
        <div
          className={`group relative h-full overflow-hidden rounded-[18px] border border-[#2F1B0D]/12 bg-[#24150D] shadow-[0_24px_70px_rgba(62,38,20,0.16)] ${
            large ? 'min-h-[560px]' : 'min-h-[270px]'
          }`}
        >
          <button type="button" onClick={() => onProjectClick(project)} className="absolute inset-0 z-10" aria-label={`${copy.viewCase}: ${project.title}`} />
          <div className="absolute inset-0">
            <ProjectImage project={project} idx={idx} large={large} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1B0F08]/92 via-[#1B0F08]/26 to-transparent" />
          </div>
          <AddButton project={project} floating />
          <div className="absolute inset-x-0 bottom-0 z-20 p-5 text-white sm:p-7">
            <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-medium text-white/70">
              <span>{project.year}</span>
              <span className="h-1 w-1 rounded-full bg-white/38" />
              <span>{getProjectKind(project, isZh)}</span>
            </div>
            <h2 className={`${large ? 'max-w-2xl text-4xl sm:text-5xl' : 'max-w-[76%] text-2xl'} font-serif leading-[0.98]`}>
              {getProjectTitle(project, isZh)}
            </h2>
            <p className={`${large ? 'max-w-xl text-base' : 'max-w-[82%] text-sm'} mt-3 leading-relaxed text-white/76`}>
              {getProjectTeaser(project, isZh)}
            </p>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#F6D6A8]">
              {copy.viewCase}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </motion.article>
    );
  };

  const ProjectCard: React.FC<{ item: ScoredProject; idx: number }> = ({ item, idx }) => {
    const project = item.project;
    const tags = (project.tags || []).slice(0, 2);
    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(idx * 0.025, 0.18), duration: 0.35 }}
        style={{
          contentVisibility: 'auto',
          containIntrinsicSize: '440px',
        } as React.CSSProperties}
      >
        <div className="group relative h-full overflow-hidden border-t border-[#D9C7B4] pt-4 transition hover:border-[#8F694C]">
          <button type="button" onClick={() => onProjectClick(project)} className="absolute inset-0 z-10" aria-label={`${copy.viewCase}: ${project.title}`} />
          <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] border border-[#E3D2BF] bg-white shadow-[0_10px_30px_rgba(73,45,24,0.06)]">
            <ProjectImage project={project} idx={idx + 4} />
            <AddButton project={project} floating />
          </div>
          <div className="relative z-20 pt-4">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-[12px] text-[#7E6752]">
              <span>{project.year}</span>
              <span className="h-1 w-1 rounded-full bg-[#BDA995]" />
              <span>{getProjectKind(project, isZh)}</span>
            </div>
            <h3 className="font-serif text-[1.55rem] leading-[1.05] text-[#352010] transition-colors group-hover:text-[#7B4E29]">
              {getProjectTitle(project, isZh)}
            </h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-[#6C5948]">
              {getProjectTeaser(project, isZh)}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full border border-[#E3D2BF] px-3 py-1 text-[11px] text-[#715A45]">
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#3B230E]">
              {copy.viewCase}
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
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
      className="min-h-screen bg-[#F8F1E8] px-5 pb-16 pt-28 sm:px-7 sm:pb-24 sm:pt-32"
    >
      <div className="mx-auto max-w-[1240px]">
        {onReturnToTimeline ? (
          <button
            type="button"
            onClick={onReturnToTimeline}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#DCCBB8] bg-white/62 px-4 py-2.5 text-sm font-medium text-[#4A2D18] shadow-sm transition hover:border-[#B99071] hover:bg-white"
          >
            <ArrowLeft size={16} />
            {t('work.backToTimeline')}
          </button>
        ) : null}

        <section className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_360px] lg:items-end">
          <div>
            <div className="mb-5 inline-flex items-center rounded-full border border-[#D9C7B4] bg-white/54 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B6551]">
              {copy.heroBadge}
            </div>
            <h1 className="max-w-4xl font-serif text-[2.48rem] leading-[0.97] text-[#352010] sm:text-6xl lg:text-[4.8rem]">
              {copy.heroTitle}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#675444] sm:text-lg">
              {copy.heroSubtitle}
            </p>
          </div>

          <aside className="hidden border-l border-[#D9C7B4] pl-5 sm:block lg:pl-7">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A8068]">{copy.focusTitle}</p>
            <p className="mt-3 text-xl font-serif leading-snug text-[#3B230E]">{copy.focusBody}</p>
          </aside>
        </section>

        {showFeatured && heroItems.length > 0 ? (
          <section className="mt-9 grid gap-5 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
            <FeaturedCard item={heroItems[0]} idx={0} large />
            <div className="grid gap-5">
              {heroItems.slice(1).map((item, index) => (
                <FeaturedCard key={item.project.id} item={item} idx={index + 1} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-10 rounded-[20px] border border-[#DCCBB8] bg-[#FFFDF9]/66 p-4 shadow-[0_14px_42px_rgba(73,45,24,0.06)] sm:p-5">
          <div className="grid gap-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-center">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A8068]">{copy.finderTitle}</p>
              <p className="mt-2 text-sm leading-6 text-[#6C5948]">{copy.finderSubtitle}</p>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="work-query" className="sr-only">
                  {copy.finderTitle}
                </label>
                <div className="flex min-h-12 flex-1 items-center gap-3 rounded-full border border-[#DCCBB8] bg-white px-4">
                  <Search size={16} className="text-[#8C7762]" />
                  <input
                    id="work-query"
                    value={query}
                    onChange={(event) => {
                      setQuery(event.target.value);
                      setActiveSuggestionId(null);
                    }}
                    placeholder={copy.placeholder}
                    className="h-12 min-w-0 flex-1 bg-transparent text-sm text-[#3B230E] outline-none placeholder:text-[#9D8B79]"
                  />
                  {query || submittedQuery ? (
                    <button type="button" onClick={handleClear} className="relative z-20 text-[#8C7762] transition hover:text-[#3B230E]" aria-label={copy.clear} title={copy.clear}>
                      <X size={16} />
                    </button>
                  ) : null}
                </div>
                <button
                  type="submit"
                  className="inline-flex h-12 self-start items-center justify-center rounded-full bg-[#3B230E] px-5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(74,45,24,0.16)] transition hover:bg-[#68401F] sm:self-auto"
                >
                  {copy.submit}
                </button>
              </form>

              <div className="mt-3 flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                <div className="flex flex-wrap gap-2">
                  {capabilitySuggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className={`rounded-full border px-3 py-1.5 text-xs transition ${
                        activeSuggestionId === suggestion.id
                          ? 'border-[#3B230E] bg-[#3B230E] text-white'
                          : 'border-[#DCCBB8] bg-transparent text-[#5B3A22] hover:border-[#B99071] hover:bg-white'
                      }`}
                    >
                      {getLocalized(suggestion.label, isZh)}
                    </button>
                  ))}
                </div>

                <div className="flex rounded-full border border-[#DCCBB8] bg-[#F8F1E8] p-1">
                  {modeOptions.map((option) => {
                    const isActive = mode === option.id;
                    return (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => handleModeChange(option.id)}
                        className={`min-h-9 rounded-full px-3 text-xs font-semibold transition sm:px-4 ${
                          isActive ? 'bg-white text-[#3B230E] shadow-[0_5px_14px_rgba(73,45,24,0.08)]' : 'text-[#816B57] hover:text-[#3B230E]'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A8068]">{isZh ? '作品' : 'Work'}</p>
              <h2 className="mt-2 font-serif text-3xl leading-tight text-[#352010] sm:text-4xl">
                {sectionTitle}
              </h2>
            </div>
            <p className="text-sm text-[#7B6856]">
              {gridItems.length} {isZh ? '个项目' : gridItems.length === 1 ? 'project' : 'projects'}
              {effectiveQuery ? ` · “${effectiveQuery}”` : ''}
            </p>
          </div>

          {gridItems.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-7 gap-y-12 md:grid-cols-2 xl:grid-cols-3">
              {gridItems.map((item, idx) => (
                <ProjectCard key={item.project.id} item={item} idx={idx} />
              ))}
            </div>
          ) : (
            <div className="rounded-[18px] border border-dashed border-[#DCCDBC] bg-white/56 px-6 py-16 text-center text-[#756352] shadow-sm">
              {copy.noResults}
            </div>
          )}
        </section>
      </div>
    </motion.div>
  );
};

export default WorkPage;

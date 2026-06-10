import React, { useMemo, useState } from 'react';
import { Project } from '../types';
import { ArrowLeft, ArrowRight, Check, Search, X } from 'lucide-react';
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

type ViewMode = 'archive' | 'agent';
type LocalizedText = { en: string; zh: string };
type CoverFamily = 'aiProduct' | 'research' | 'visualSystem' | 'brand' | 'practice';

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
const featuredProjectIds = new Set(['p1', 'p21', 'p3', 'p20', 'p5', 'p15', 'p17']);
const coreCapabilityProjectIds = new Set(['p1', 'p3', 'p20', 'p21', 'p5', 'p13', 'p15', 'p17', 'p12']);
const archiveFeaturedIds = ['p1', 'p5', 'p3', 'p13'];
const agentDefaultIds = ['p1', 'p5', 'p3', 'p20', 'p13'];

const capabilitySuggestions: CapabilitySuggestion[] = [
  {
    id: 'ai-interaction',
    label: { en: 'AI product UX', zh: 'AI 产品 UX' },
    query: {
      en: 'AI interaction designer with Microsoft product UX and research demo experience',
      zh: '会做 AI 交互、微软产品 UX 和研究 demo 的设计师',
    },
    projectIds: ['p1', 'p3', 'p20', 'p5', 'p13', 'p15'],
    keywords: ['ai', 'aigc', 'research', 'multimodal', 'interaction', 'copilot', '生成式', '多模态', '研究', '交互', '微软'],
  },
  {
    id: 'research-demo',
    label: { en: 'Research demos', zh: '研究 Demo' },
    query: {
      en: 'research demo designer who can translate model capability into clear web interaction',
      zh: '能把研究模型能力转成清晰网页交互的设计师',
    },
    projectIds: ['p3', 'p20', 'p5', 'p13', 'p15', 'p17'],
    keywords: ['research', 'demo', 'model', 'technical', 'ai', '研究', '模型', '技术', 'demo'],
  },
  {
    id: 'frontend-prototype',
    label: { en: 'Frontend prototype', zh: '前端原型' },
    query: {
      en: 'designer who can use frontend prototyping and vibe coding to make ideas testable',
      zh: '能用前端原型和 Vibe Coding 把想法做成可测试体验的设计师',
    },
    projectIds: ['p21', 'p20', 'p3', 'p5'],
    keywords: ['vibe', 'coding', 'frontend', 'prototype', 'react', 'h5', '前端', '原型', '可运行', '小游戏'],
  },
  {
    id: 'visual-system',
    label: { en: 'Visual systems', zh: '视觉系统' },
    query: {
      en: 'visual designer with branding, packaging, identity, and polished system craft',
      zh: '有品牌、包装、视觉系统和精修能力的视觉设计师',
    },
    projectIds: ['p17', 'p15', 'p6', 'p7', 'p16', 'p18', 'p19', 'p11', 'p9'],
    keywords: ['visual', 'brand', 'branding', 'packaging', 'identity', 'graphic', '视觉', '品牌', '包装', '平面'],
  },
  {
    id: 'mobile-flow',
    label: { en: 'Mobile flow', zh: '移动端流程' },
    query: {
      en: 'mobile product designer who can analyze app logic, user flow, and interaction hierarchy',
      zh: '能分析移动端用户流程、产品逻辑和交互层级的设计师',
    },
    projectIds: ['p4', 'p14', 'p2', 'p21'],
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
    'microsoft',
    '微软',
    '语音交互',
    '朗读',
    '对话设计',
    '可访问性',
  ],
  p2: ['keeta', 'user flow', 'mobile app analysis', 'test exercise', 'personal practice', '流程分析', '移动端', '测试题', '个人练习'],
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
    en: 'Copilot reading UX for interruption, listening, answering, and resume states.',
    zh: '为 Copilot 朗读设计打断、倾听、回答和恢复状态。',
  },
  p2: {
    en: 'A mobile ordering-flow analysis exercise, separated from shipped work.',
    zh: '移动端下单流程分析练习，和正式项目分开展示。',
  },
  p3: {
    en: 'Web interactions for outpainting, long video, and path-controlled generation.',
    zh: '把图像外扩、长视频和轨迹控制做成可尝试的网页交互。',
  },
  p4: {
    en: 'A consumer AI companion case around memory, empathy, and mobile framing.',
    zh: '围绕记忆、陪伴和移动端结构的 AI companion 体验。',
  },
  p5: {
    en: 'AI-assisted research workflow for hypothesis generation and tool usability.',
    zh: '面向科研假设生成的 AI 工作流和工具可用性设计。',
  },
  p6: {
    en: 'Microsoft Research anniversary visuals across event and communication surfaces.',
    zh: 'Microsoft Research 周年活动视觉与传播物料。',
  },
  p7: {
    en: 'A tea shop brand system from identity to packaging and retail touchpoints.',
    zh: '茶店品牌系统，从识别到包装与零售触点。',
  },
  p8: {
    en: 'Commercial illustration and character work extending the visual range.',
    zh: '商业插画与角色视觉作品，补充图形表达范围。',
  },
  p9: {
    en: 'Packaging-focused visual work with print and shelf-facing outcomes.',
    zh: '以印刷和货架结果物为核心的包装视觉项目。',
  },
  p11: {
    en: 'A food-brand poster and packaging concept with focused visual storytelling.',
    zh: '食品品牌海报与包装概念，强调清晰视觉叙事。',
  },
  p12: {
    en: 'Enterprise AI cloud visual upgrade for hierarchy and platform polish.',
    zh: '企业级 AI 云平台视觉升级，聚焦层级和平台完成度。',
  },
  p13: {
    en: 'Agent workflow storytelling through source design pages and interaction structure.',
    zh: 'AI Agent 工作流叙事，展示设计稿和交互结构。',
  },
  p14: {
    en: 'Learning tablet homepage redesign around study rhythm and AI entry points.',
    zh: '学习机首页重构，围绕学习节奏和 AI 入口。',
  },
  p15: {
    en: 'A value-alignment research interface with visual system craft.',
    zh: '价值对齐研究界面与视觉系统设计。',
  },
  p16: {
    en: 'A Milan design-event concept with editorial rhythm and mobile art direction.',
    zh: '米兰设计展移动网页概念，强调编辑节奏与艺术指导。',
  },
  p17: {
    en: 'Research-facing visual identity for BatteryML and technical communication.',
    zh: 'BatteryML 研究传播视觉识别与技术表达。',
  },
  p18: {
    en: 'A concise identity system with logo direction and applications.',
    zh: '简洁的品牌识别系统，包含 logo 与应用展示。',
  },
  p19: {
    en: 'A group rebranding proposal for an industrial identity system.',
    zh: '工业品牌重塑小组提案，从识别到应用系统。',
  },
  p20: {
    en: 'A public demo structure for reading and testing 3D avatar generation.',
    zh: '把 3D avatar 模型整理成可浏览、可验证的公开 demo。',
  },
  p21: {
    en: 'A theme translation from Spring Festival homecoming to Lantern Festival play.',
    zh: '从春节回家路转译到元宵夜归人的剧情小游戏。',
  },
};

const agentReasons: Record<string, LocalizedText> = {
  p1: {
    en: 'Strong match for Microsoft AI product UX: voice control, recovery states, and Office context.',
    zh: '匹配微软 AI 产品 UX：语音控制、恢复状态和 Office 场景都很直接。',
  },
  p3: {
    en: 'Shows how model capability became prompt, gallery, canvas, timeline, and trajectory interactions.',
    zh: '展示如何把模型能力转成 prompt、gallery、画布、时间线和轨迹交互。',
  },
  p5: {
    en: 'Useful for research workflow roles: complex AI logic is organized into a tool people can scan.',
    zh: '适合科研工作流方向：把复杂 AI 逻辑整理成可浏览的工具结构。',
  },
  p13: {
    en: 'Good evidence for agent workflow thinking and technical storytelling.',
    zh: '能证明 Agent 工作流思考和技术叙事能力。',
  },
  p15: {
    en: 'Connects technical communication with a polished visual system.',
    zh: '把技术沟通和完整视觉系统连接起来。',
  },
  p17: {
    en: 'Useful when the brief asks for research-facing visual systems.',
    zh: '适合展示面向研究传播的视觉系统能力。',
  },
  p20: {
    en: 'Shows 3D AI output through a public demo instead of a raw model screenshot.',
    zh: '展示如何把 3D AI 输出组织成公开 demo，而不是只放模型截图。',
  },
  p21: {
    en: 'Relevant for H5, frontend prototyping, mobile flow, and campaign storytelling.',
    zh: '适合 H5、前端原型、移动流程和活动叙事方向。',
  },
};

const projectSkillChips: Record<string, LocalizedText[]> = {
  p1: [
    { en: 'Microsoft', zh: '微软' },
    { en: 'AI UX', zh: 'AI UX' },
    { en: 'Voice', zh: '语音' },
  ],
  p3: [
    { en: 'Research demo', zh: '研究 Demo' },
    { en: 'Web interaction', zh: '网页交互' },
    { en: 'AIGC', zh: 'AIGC' },
  ],
  p5: [
    { en: 'Agent workflow', zh: 'Agent 工作流' },
    { en: 'Research tooling', zh: '科研工具' },
    { en: 'UX hierarchy', zh: 'UX 层级' },
  ],
  p13: [
    { en: 'AI agent', zh: 'AI Agent' },
    { en: 'Workflow', zh: '工作流' },
    { en: 'Prototype', zh: '原型' },
  ],
  p15: [
    { en: 'Visual system', zh: '视觉系统' },
    { en: 'Technical story', zh: '技术叙事' },
  ],
  p17: [
    { en: 'Research visual', zh: '研究视觉' },
    { en: 'System craft', zh: '系统设计' },
  ],
  p20: [
    { en: '3D AI demo', zh: '3D AI Demo' },
    { en: 'MSRA', zh: 'MSRA' },
    { en: 'Interaction', zh: '交互' },
  ],
  p21: [
    { en: 'H5 game', zh: 'H5 小游戏' },
    { en: 'Vibe coding', zh: 'Vibe Coding' },
    { en: 'Mobile flow', zh: '移动流程' },
  ],
};

const projectCoverFamilies: Record<string, CoverFamily> = {
  p1: 'aiProduct',
  p4: 'aiProduct',
  p12: 'aiProduct',
  p13: 'aiProduct',
  p14: 'aiProduct',
  p3: 'research',
  p5: 'research',
  p15: 'research',
  p20: 'research',
  p6: 'visualSystem',
  p17: 'visualSystem',
  p7: 'brand',
  p8: 'brand',
  p9: 'brand',
  p11: 'brand',
  p16: 'brand',
  p18: 'brand',
  p19: 'brand',
  p21: 'brand',
  p2: 'practice',
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
    ids: ['p2', 'p4', 'p14', 'p21'],
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

const getAgentReason = (project: Project, isZh: boolean) =>
  getLocalized(
    agentReasons[project.id] || {
      en: `Relevant evidence for ${getProjectKind(project, false).toLowerCase()} and ${project.platform.toLowerCase()} delivery.`,
      zh: `适合展示${getProjectKind(project, true)}和${project.platform}落地能力。`,
    },
    isZh
  );

const WorkPage: React.FC<WorkPageProps> = ({
  projects,
  onProjectClick,
  selectedProjectIds,
  onToggleSelect,
  onReturnToTimeline,
}) => {
  const { language, t } = useLanguage();
  const isZh = language === 'zh';
  const [viewMode, setViewMode] = useState<ViewMode>('archive');
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [activeSuggestionId, setActiveSuggestionId] = useState<string | null>(null);

  const copy = {
    pageBadge: isZh ? '作品' : 'WORKS',
    pageTitle: isZh ? 'AI 产品体验、研究 Demo 与视觉系统。' : 'AI product UX, research demos, and visual systems.',
    pageSubtitle: isZh
      ? '我把复杂技术、产品路径和视觉表达整理成用户能理解、能操作、也愿意继续探索的体验。'
      : 'I organize complex technology, product paths, and visual systems into experiences people can understand, use, and keep exploring.',
    agentTitle: isZh ? '找匹配项目' : 'Agent Match',
    agentBody: isZh
      ? '告诉我你在找什么角色、能力或项目类型，我会推荐最相关的案例并解释匹配原因。'
      : 'Tell me the role, capability, or project type you care about. I will recommend a focused set and explain why.',
    archiveTitle: isZh ? '浏览全部项目' : 'Project Archive',
    archiveBody: isZh
      ? '按能力方向浏览完整作品库，看到项目跨度、时间线和正式项目与练习的关系。'
      : 'Browse the full archive by track, with featured cases, compact cards, and a dense project index.',
    agentKicker: isZh ? '作品集向导' : 'PORTFOLIO CONCIERGE',
    agentHeading: isZh ? '你在找什么类型的设计师？' : 'What kind of designer are you looking for?',
    agentSubheading: isZh
      ? '输入角色、能力、工具或项目类型。这里不是普通筛选器，而是根据需求把最相关的作品推到前面。'
      : 'Describe a role, capability, tool, or project type. This is a guided match, not just a filter.',
    placeholder: isZh ? '试试输入“会做 AI 交互、微软产品 UX 和前端原型的设计师”' : 'Try "AI interaction designer with Microsoft product UX and frontend prototyping experience"',
    submit: isZh ? '查找作品' : 'Find projects',
    clear: isZh ? '清空' : 'Clear',
    agentResultsDefault: isZh ? '先从这些代表项目看起' : 'Start with these representative works',
    agentResultsMatched: isZh ? '根据你的需求，先看这些项目' : 'Based on your brief, start with these works',
    noResults: isZh ? '暂时没有完全匹配的项目。试试输入能力、工具、公司或项目类型。' : 'No exact match yet. Try describing a skill, tool, company, or project type.',
    why: isZh ? '匹配原因' : 'Why this matches',
    archiveKicker: isZh ? '完整作品索引' : 'PROJECT ARCHIVE',
    featuredHeading: isZh ? '代表性案例' : 'Featured case studies',
    featuredBody: isZh ? '先展示最能代表当前能力主线的项目，再进入更完整的项目库。' : 'A short curated layer before the full archive.',
    indexHeading: isZh ? '项目索引' : 'Project index',
    indexBody: isZh ? '用更高密度呈现完整作品，不把所有项目都做成同一种大卡片。' : 'A denser view of the full body of work without turning every project into a large card.',
    viewCase: isZh ? '查看案例' : 'View case',
    select: isZh ? '加入生成' : 'Add to PDF',
    selected: isZh ? '已加入' : 'Added',
    featured: isZh ? '重点' : 'Featured',
    recent: isZh ? '近期' : 'Recent',
    practice: isZh ? '练习' : 'Practice',
  };

  const getProjectById = (id: string) => projects.find((project) => project.id === id);
  const formalProjects = projects.filter((project) => !practiceProjectIds.has(project.id));

  const archiveTracks = useMemo(
    () => [
      {
        id: 'ai-research',
        title: isZh ? 'AI 产品与研究 Demo' : 'AI Product & Research Demos',
        subtitle: isZh
          ? '微软产品 UX、研究模型 demo、Agent 工作流和技术转译。'
          : 'Microsoft product UX, research demos, agent workflows, and technical translation.',
        projectIds: ['p1', 'p3', 'p20', 'p5', 'p13', 'p12', 'p15'],
      },
      {
        id: 'visual-systems',
        title: isZh ? '视觉系统与研究传播' : 'Visual Systems & Research Communication',
        subtitle: isZh
          ? '研究传播、品牌系统、活动视觉和技术内容的视觉组织。'
          : 'Research-facing identity, brand systems, event visuals, and technical communication.',
        projectIds: ['p17', 'p6', 'p18', 'p19'],
      },
      {
        id: 'brand-campaign',
        title: isZh ? '品牌、活动与编辑式体验' : 'Brand, Campaign & Editorial Experiences',
        subtitle: isZh
          ? '品牌、包装、展览网页、节日 H5 和更具编辑感的视觉项目。'
          : 'Branding, packaging, exhibition web, festival H5, and editorial visual work.',
        projectIds: ['p21', 'p7', 'p16', 'p11', 'p9', 'p8'],
      },
      {
        id: 'product-mobile',
        title: isZh ? '移动端与产品流程' : 'Mobile & Product Flows',
        subtitle: isZh
          ? '移动端产品结构、教育硬件入口、AI companion 和用户路径。'
          : 'Mobile product structure, education hardware entry points, AI companions, and user paths.',
        projectIds: ['p4', 'p14'],
      },
      {
        id: 'practice',
        title: isZh ? '个人练习与测试题' : 'Practice & Experiments',
        subtitle: isZh
          ? '个人练习、测试题和小型探索放在后段，不和正式项目抢层级。'
          : 'Smaller exercises and tests are visible, but kept below formal work.',
        projectIds: ['p2'],
        practice: true,
      },
    ],
    [isZh]
  );

  const archiveSummary = isZh
    ? `${projects.length} 个项目 · ${archiveTracks.length} 个方向 · ${formalProjects.length} 个正式项目`
    : `${projects.length} works across ${archiveTracks.length} tracks · ${formalProjects.length} formal projects`;

  const scoredMatches = useMemo<ScoredProject[]>(() => {
    const effectiveQuery = submittedQuery.trim();

    if (!effectiveQuery) {
      return agentDefaultIds
        .map(getProjectById)
        .filter((project): project is Project => Boolean(project))
        .map((project) => ({
          project,
          score: getProjectSortBoost(project),
          rawScore: 0,
          rank: priorityRank.get(project.id) ?? 999,
        }));
    }

    return formalProjects
      .map((project) => {
        const rawScore = scoreProject(project, effectiveQuery, activeSuggestionId);
        return {
          project,
          score: rawScore + getProjectSortBoost(project),
          rawScore,
          rank: priorityRank.get(project.id) ?? 999,
        };
      })
      .filter((item) => item.rawScore >= 3)
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.rank - b.rank;
      })
      .slice(0, 6);
  }, [activeSuggestionId, formalProjects, submittedQuery, projects]);

  const featuredProjects = archiveFeaturedIds
    .map(getProjectById)
    .filter((project): project is Project => Boolean(project));

  const indexProjects = [...projects].sort((a, b) => {
    const aPractice = practiceProjectIds.has(a.id) ? 1 : 0;
    const bPractice = practiceProjectIds.has(b.id) ? 1 : 0;
    if (aPractice !== bPractice) return aPractice - bPractice;
    return (priorityRank.get(a.id) ?? 999) - (priorityRank.get(b.id) ?? 999);
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittedQuery(query.trim());
    setViewMode('agent');
    if (!query.trim()) {
      setActiveSuggestionId(null);
    }
  };

  const handleSuggestionClick = (suggestion: CapabilitySuggestion) => {
    const nextQuery = getLocalized(suggestion.query, isZh);
    setQuery(nextQuery);
    setSubmittedQuery(nextQuery);
    setActiveSuggestionId(suggestion.id);
    setViewMode('agent');
  };

  const handleClear = () => {
    setQuery('');
    setSubmittedQuery('');
    setActiveSuggestionId(null);
  };

  const SelectionLink: React.FC<{ project: Project }> = ({ project }) => {
    const isSelected = selectedProjectIds.includes(project.id);
    return (
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onToggleSelect(project.id);
        }}
        className={`relative z-20 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition ${
          isSelected
            ? 'border-[#3B230E] bg-[#3B230E] text-white'
            : 'border-[#E2D0BD] bg-white/70 text-[#5C412B] hover:border-[#B99071] hover:bg-white'
        }`}
        aria-label={isSelected ? copy.selected : copy.select}
      >
        {isSelected ? <Check size={12} strokeWidth={3} /> : null}
        {isSelected ? copy.selected : copy.select}
      </button>
    );
  };

  const ProjectImage: React.FC<{ project: Project; idx: number }> = ({ project, idx }) => {
    const shouldContainCover = project.coverDisplay === 'contain' || Boolean(project.slideSets || project.slides);
    return (
      <img
        src={projectCoverAsset(project)}
        alt={project.title}
        loading={idx < 4 ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={idx < 2 ? 'high' : 'auto'}
        sizes="(min-width: 1200px) 440px, (min-width: 768px) 45vw, calc(100vw - 40px)"
        className={`h-full w-full transition-transform duration-700 ${
          shouldContainCover ? 'object-contain' : 'object-cover group-hover:scale-[1.025]'
        }`}
      />
    );
  };

  const CoverFrame: React.FC<{ project: Project; idx: number; compact?: boolean }> = ({ project, idx, compact = false }) => {
    const family = projectCoverFamilies[project.id] || 'brand';
    const familyClasses: Record<CoverFamily, string> = {
      aiProduct: 'from-[#F8FBFF] via-[#FFFFFF] to-[#EAE4D8] border-[#D7C7B5]',
      research: 'from-[#151B19] via-[#22312D] to-[#5F4B38] border-[#2F332E]',
      visualSystem: 'from-[#FFF8E6] via-[#FFFDF8] to-[#E3D4BF] border-[#DCC8AE]',
      brand: 'from-[#FAF2E8] via-[#FFFDF9] to-[#E8D3BB] border-[#DFCAB5]',
      practice: 'from-[#EFE8DF] via-[#FFFDF9] to-[#D8C7B6] border-[#D8C7B6]',
    };
    const innerIsDark = family === 'research';

    return (
      <div
        className={`relative aspect-[16/10] overflow-hidden rounded-[18px] border bg-gradient-to-br ${familyClasses[family]} ${
          compact ? 'p-2 shadow-[0_10px_24px_rgba(73,45,24,0.06)]' : 'p-3 shadow-[0_18px_42px_rgba(73,45,24,0.09)]'
        }`}
      >
        <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(circle_at_22%_18%,rgba(255,255,255,0.72),transparent_34%),linear-gradient(135deg,rgba(59,35,14,0.05)_0_1px,transparent_1px_34px)]" />
        <div
          className={`relative h-full overflow-hidden rounded-[14px] border ${
            innerIsDark ? 'border-white/12 bg-[#111813]' : 'border-white/80 bg-white'
          }`}
        >
          <ProjectImage project={project} idx={idx} />
        </div>
      </div>
    );
  };

  const ModeCard: React.FC<{ mode: ViewMode; title: string; body: string; meta: string }> = ({ mode, title, body, meta }) => {
    const isActive = viewMode === mode;
    return (
      <button
        type="button"
        onClick={() => setViewMode(mode)}
        className={`group rounded-[24px] border p-5 text-left transition sm:p-6 ${
          isActive
            ? 'border-[#3B230E] bg-[#FFFDF9] shadow-[0_18px_50px_rgba(73,45,24,0.10)]'
            : 'border-[#DDCCBA] bg-white/48 hover:border-[#B99071] hover:bg-white/70'
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.18em] text-[#9A8068]">{meta}</p>
            <h2 className="mt-3 font-serif text-2xl leading-tight text-[#352010]">{title}</h2>
          </div>
          <span className={`mt-1 inline-flex h-10 w-10 items-center justify-center rounded-full transition ${
            isActive ? 'bg-[#3B230E] text-white' : 'bg-[#F4E9DD] text-[#5C412B] group-hover:bg-[#3B230E] group-hover:text-white'
          }`}>
            <ArrowRight size={17} />
          </span>
        </div>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[#6B5948]">{body}</p>
      </button>
    );
  };

  const FeaturedCaseCard: React.FC<{ project: Project; idx: number; wide?: boolean }> = ({ project, idx, wide = false }) => (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.045, duration: 0.42 }}
      className={wide ? 'lg:col-span-2' : ''}
    >
      <div className="group relative h-full rounded-[24px] border border-[#D8C5B2] bg-[#FFFDF9] p-3 shadow-[0_18px_48px_rgba(73,45,24,0.08)] transition hover:-translate-y-0.5 hover:border-[#B99071] hover:shadow-[0_22px_60px_rgba(73,45,24,0.12)]">
        <button type="button" onClick={() => onProjectClick(project)} className="absolute inset-0 z-10" aria-label={`${copy.viewCase}: ${project.title}`} />
        <CoverFrame project={project} idx={idx} />
        <div className="relative z-20 p-3 pt-5 sm:p-4">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-[11px] font-medium text-[#806A56]">
            <span>{project.year}</span>
            <span className="h-1 w-1 rounded-full bg-[#BDA995]" />
            <span>{getProjectKind(project, isZh)}</span>
            {isRecentProject(project) ? (
              <span className="rounded-full border border-[#E2D0BD] px-2 py-0.5 text-[#7B4E29]">{copy.recent}</span>
            ) : null}
          </div>
          <h3 className="font-serif text-[1.85rem] leading-[1.03] text-[#352010] sm:text-[2.2rem]">
            {getProjectTitle(project, isZh)}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#665544]">{getProjectTeaser(project, isZh)}</p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B230E]">
              {copy.viewCase}
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
            </span>
            <SelectionLink project={project} />
          </div>
        </div>
      </div>
    </motion.article>
  );

  const CompactProjectCard: React.FC<{ project: Project; idx: number }> = ({ project, idx }) => {
    const chips = (projectSkillChips[project.id] || []).slice(0, 2);
    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: Math.min(idx * 0.018, 0.16), duration: 0.32 }}
        style={{ contentVisibility: 'auto', containIntrinsicSize: '300px' } as React.CSSProperties}
      >
        <div className="group relative h-full rounded-[18px] border border-[#DDCCBA] bg-[#FFFDF9]/82 p-2.5 transition hover:-translate-y-0.5 hover:border-[#B99071] hover:bg-white hover:shadow-[0_18px_42px_rgba(73,45,24,0.08)]">
          <button type="button" onClick={() => onProjectClick(project)} className="absolute inset-0 z-10" aria-label={`${copy.viewCase}: ${project.title}`} />
          <CoverFrame project={project} idx={idx} compact />
          <div className="relative z-20 px-1.5 pb-2 pt-3.5">
            <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] text-[#806A56]">
              <span>{project.year}</span>
              <span className="h-1 w-1 rounded-full bg-[#BDA995]" />
              <span>{getProjectKind(project, isZh)}</span>
            </div>
            <h3 className="font-serif text-[1.28rem] leading-tight text-[#352010]">{getProjectTitle(project, isZh)}</h3>
            <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-[#6B5948]">{getProjectTeaser(project, isZh)}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {chips.length > 0
                ? chips.map((chip) => (
                    <span key={chip.en} className="rounded-full border border-[#E5D4C1] px-2 py-1 text-[10px] font-medium text-[#715A45]">
                      {getLocalized(chip, isZh)}
                    </span>
                  ))
                : (project.tags || []).slice(0, 2).map((tag) => (
                    <span key={tag} className="rounded-full border border-[#E5D4C1] px-2 py-1 text-[10px] font-medium text-[#715A45]">
                      {tag}
                    </span>
                  ))}
            </div>
            <div className="mt-4 flex items-center gap-3 border-t border-[#E6D7C7] pt-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#3B230E]">
                {copy.viewCase}
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </div>
      </motion.article>
    );
  };

  const AgentResultCard: React.FC<{ item: ScoredProject; idx: number }> = ({ item, idx }) => {
    const project = item.project;
    const chips = (projectSkillChips[project.id] || [{ en: getProjectKind(project, false), zh: getProjectKind(project, true) }]).slice(0, 3);
    return (
      <motion.article
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.04, duration: 0.3 }}
        className="group relative rounded-[18px] border border-[#DCCBB8] bg-[#FFFDF9] p-3 transition hover:border-[#B99071] hover:shadow-[0_16px_36px_rgba(73,45,24,0.08)]"
      >
        <button type="button" onClick={() => onProjectClick(project)} className="absolute inset-0 z-10" aria-label={`${copy.viewCase}: ${project.title}`} />
        <div className="grid gap-4 sm:grid-cols-[160px_minmax(0,1fr)]">
          <CoverFrame project={project} idx={idx} compact />
          <div className="relative z-20 flex min-w-0 flex-col justify-between py-1">
            <div>
              <div className="mb-2 flex flex-wrap items-center gap-2 text-[11px] text-[#806A56]">
                <span>{project.year}</span>
                <span className="h-1 w-1 rounded-full bg-[#BDA995]" />
                <span>{getProjectKind(project, isZh)}</span>
              </div>
              <h3 className="font-serif text-2xl leading-tight text-[#352010]">{getProjectTitle(project, isZh)}</h3>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {chips.map((chip) => (
                  <span key={chip.en} className="rounded-full border border-[#E2D0BD] bg-[#F8F1E8] px-2.5 py-1 text-[11px] font-medium text-[#5C412B]">
                    {getLocalized(chip, isZh)}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-sm leading-6 text-[#6B5948]">
                <span className="font-semibold text-[#3B230E]">{copy.why}: </span>
                {getAgentReason(project, isZh)}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#3B230E]">
                {copy.viewCase}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </span>
              <SelectionLink project={project} />
            </div>
          </div>
        </div>
      </motion.article>
    );
  };

  const ArchiveSection: React.FC = () => (
    <section className="mt-12">
      <div className="mb-7 flex flex-col gap-3 border-b border-[#D9C7B4] pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A8068]">{copy.archiveKicker}</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-[#352010] sm:text-5xl">{copy.archiveTitle}</h2>
        </div>
        <p className="max-w-lg text-sm leading-6 text-[#6B5948] lg:text-right">{archiveSummary}</p>
      </div>

      <section>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-serif text-3xl leading-tight text-[#352010]">{copy.featuredHeading}</h3>
            <p className="mt-2 text-sm text-[#7B6856]">{copy.featuredBody}</p>
          </div>
          <span className="rounded-full border border-[#DCCBB8] bg-white/60 px-3 py-1.5 text-xs font-semibold text-[#5C412B]">
            {featuredProjects.length} {isZh ? '个重点案例' : 'featured cases'}
          </span>
        </div>
        <div className="grid gap-5 lg:grid-cols-2">
          {featuredProjects.map((project, idx) => (
            <FeaturedCaseCard key={project.id} project={project} idx={idx} />
          ))}
        </div>
      </section>

      <div className="mt-14 space-y-12">
        {archiveTracks.map((track) => {
          const trackProjects = track.projectIds.map(getProjectById).filter((project): project is Project => Boolean(project));
          if (!trackProjects.length) return null;
          return (
            <section key={track.id} className={track.practice ? 'rounded-[24px] border border-dashed border-[#D6C4B2] bg-white/38 p-5 sm:p-6' : ''}>
              <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="font-serif text-[2rem] leading-tight text-[#352010]">{track.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#6B5948]">{track.subtitle}</p>
                </div>
                <span className="text-sm font-medium text-[#8B735E]">
                  {trackProjects.length} {isZh ? '个项目' : trackProjects.length === 1 ? 'work' : 'works'}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {trackProjects.map((project, idx) => (
                  <CompactProjectCard key={`${track.id}-${project.id}`} project={project} idx={idx + 4} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <section className="mt-14 rounded-[24px] border border-[#DCCBB8] bg-[#FFFDF9]/72 p-5 shadow-[0_16px_44px_rgba(73,45,24,0.06)] sm:p-6">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="font-serif text-3xl leading-tight text-[#352010]">{copy.indexHeading}</h3>
            <p className="mt-2 text-sm leading-6 text-[#6B5948]">{copy.indexBody}</p>
          </div>
          <span className="text-sm font-semibold text-[#5C412B]">
            {projects.length} {isZh ? '个条目' : 'entries'}
          </span>
        </div>
        <div className="divide-y divide-[#E5D6C7] overflow-hidden rounded-[18px] border border-[#E5D6C7] bg-white/70">
          {indexProjects.map((project) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onProjectClick(project)}
              className="grid w-full gap-2 px-4 py-3 text-left transition hover:bg-[#F8F1E8] sm:grid-cols-[92px_minmax(0,1fr)_220px_96px] sm:items-center"
            >
              <span className="text-xs font-semibold text-[#8A735F]">{project.year}</span>
              <span className="font-serif text-lg leading-tight text-[#352010]">{getProjectTitle(project, isZh)}</span>
              <span className="text-sm text-[#6B5948]">{getProjectKind(project, isZh)}</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#3B230E] sm:justify-end">
                {copy.viewCase}
                <ArrowRight size={13} />
              </span>
            </button>
          ))}
        </div>
      </section>
    </section>
  );

  const AgentSection: React.FC = () => (
    <section className="mt-12 grid gap-6 lg:grid-cols-[minmax(320px,0.86fr)_minmax(0,1.14fr)]">
      <div className="rounded-[28px] border border-[#DCCBB8] bg-[#FFFDF9]/76 p-5 shadow-[0_18px_52px_rgba(73,45,24,0.08)] sm:p-7 lg:sticky lg:top-28 lg:self-start">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A8068]">{copy.agentKicker}</p>
        <h2 className="mt-4 font-serif text-4xl leading-tight text-[#352010]">{copy.agentHeading}</h2>
        <p className="mt-3 text-sm leading-6 text-[#6B5948]">{copy.agentSubheading}</p>

        <form onSubmit={handleSubmit} className="mt-6">
          <label htmlFor="work-agent-query" className="sr-only">
            {copy.agentHeading}
          </label>
          <div className="rounded-[24px] border border-[#DCCBB8] bg-white p-3 shadow-[0_12px_30px_rgba(73,45,24,0.06)]">
            <div className="flex items-start gap-3">
              <Search size={18} className="mt-3 text-[#8C7762]" />
              <textarea
                id="work-agent-query"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setActiveSuggestionId(null);
                }}
                placeholder={copy.placeholder}
                rows={5}
                className="min-h-[132px] flex-1 resize-none bg-transparent py-2 text-[15px] leading-6 text-[#3B230E] outline-none placeholder:text-[#A08B77]"
              />
              {query || submittedQuery ? (
                <button type="button" onClick={handleClear} className="mt-2 rounded-full p-2 text-[#8C7762] transition hover:bg-[#F8F1E8] hover:text-[#3B230E]" aria-label={copy.clear} title={copy.clear}>
                  <X size={16} />
                </button>
              ) : null}
            </div>
            <div className="mt-3 flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-[#3B230E] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(74,45,24,0.16)] transition hover:bg-[#68401F]"
              >
                {copy.submit}
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </form>

        <div className="mt-5 flex flex-wrap gap-2">
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
      </div>

      <div className="min-w-0">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#9A8068]">
              {submittedQuery ? (isZh ? '匹配结果' : 'MATCHED RESULTS') : isZh ? '推荐起点' : 'RECOMMENDED START'}
            </p>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-[#352010] sm:text-4xl">
              {submittedQuery ? copy.agentResultsMatched : copy.agentResultsDefault}
            </h2>
          </div>
          <p className="text-sm text-[#7B6856]">
            {scoredMatches.length} {isZh ? '个项目' : scoredMatches.length === 1 ? 'project' : 'projects'}
          </p>
        </div>

        {submittedQuery ? (
          <div className="mb-5 rounded-[18px] border border-[#DCCBB8] bg-white/50 px-4 py-3 text-sm leading-6 text-[#6B5948]">
            {isZh ? '你正在寻找：' : 'You asked for: '}
            <span className="font-semibold text-[#3B230E]">"{submittedQuery}"</span>
          </div>
        ) : null}

        {scoredMatches.length > 0 ? (
          <div className="space-y-4">
            {scoredMatches.map((item, idx) => (
              <AgentResultCard key={item.project.id} item={item} idx={idx} />
            ))}
          </div>
        ) : (
          <div className="rounded-[22px] border border-dashed border-[#DCCDBC] bg-white/56 px-6 py-16 text-center text-[#756352] shadow-sm">
            {copy.noResults}
          </div>
        )}
      </div>
    </section>
  );

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

        <section className="mx-auto max-w-5xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full border border-[#D9C7B4] bg-white/54 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7B6551]">
            {copy.pageBadge}
          </div>
          <h1 className="mx-auto max-w-4xl font-serif text-[2.55rem] leading-[0.98] text-[#352010] sm:text-6xl lg:text-[4.7rem]">
            {copy.pageTitle}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[#675444] sm:text-lg">
            {copy.pageSubtitle}
          </p>
        </section>

        <section className="mt-10 grid gap-4 lg:grid-cols-2">
          <ModeCard mode="agent" title={copy.agentTitle} body={copy.agentBody} meta={isZh ? '按需求找作品' : 'CASE FINDER'} />
          <ModeCard mode="archive" title={copy.archiveTitle} body={copy.archiveBody} meta={archiveSummary} />
        </section>

        {viewMode === 'agent' ? <AgentSection /> : <ArchiveSection />}
      </div>
    </motion.div>
  );
};

export default WorkPage;

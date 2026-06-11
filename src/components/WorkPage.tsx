import React, { useMemo, useState } from 'react';
import { Project } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
  FilePlus2,
  LibraryBig,
  Search,
  X,
} from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { projectCoverAsset } from '../utils/assets';

interface WorkPageProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  onReturnToTimeline?: () => void;
}

type ViewMode = 'agent' | 'archive';
type LocalizedText = { en: string; zh: string };
type CoverDensity = 'wall' | 'agent' | 'compact' | 'featured' | 'lead';

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

interface ArchiveTrack {
  id: string;
  title: string;
  subtitle: string;
  projectIds: string[];
  tone: CoverFamily;
}

const practiceProjectIds = new Set(['p2']);

const featuredProjectOrder = [
  'p1',
  'p5',
  'p3',
  'p13',
  'p20',
  'p21',
  'p17',
  'p15',
  'p12',
  'p6',
  'p14',
  'p4',
  'p7',
  'p18',
  'p19',
  'p16',
  'p11',
  'p9',
  'p8',
  'p10',
  'p2',
];

const priorityRank = new Map(featuredProjectOrder.map((id, index) => [id, index]));
const featuredProjectIds = new Set(['p1', 'p5', 'p3', 'p13', 'p20', 'p17', 'p15']);
const coreCapabilityProjectIds = new Set(['p1', 'p3', 'p5', 'p13', 'p20', 'p21', 'p17', 'p15', 'p12']);
const archiveFeaturedIds = ['p1', 'p5', 'p3', 'p13'];
const agentDefaultIds = ['p1', 'p5', 'p3', 'p20'];

const capabilitySuggestions: CapabilitySuggestion[] = [
  {
    id: 'ai-interaction',
    label: { en: 'AI product UX', zh: 'AI 产品 UX' },
    query: {
      en: 'AI interaction designer with Microsoft product UX and research demo experience',
      zh: '会做 AI 交互、微软产品 UX 和研究 demo 的设计师',
    },
    projectIds: ['p1', 'p3', 'p20', 'p5', 'p13', 'p12'],
    keywords: ['ai', 'aigc', 'research', 'multimodal', 'interaction', 'copilot', '生成式', '多模态', '研究', '交互', '微软'],
  },
  {
    id: 'research-demo',
    label: { en: 'Research demo', zh: '研究 Demo' },
    query: {
      en: 'research demo designer who can translate model capability into clear web interaction',
      zh: '能把研究模型能力转成清晰网页交互的设计师',
    },
    projectIds: ['p5', 'p3', 'p20', 'p13', 'p15', 'p17'],
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
    label: { en: 'Visual system', zh: '视觉系统' },
    query: {
      en: 'visual designer with branding, research communication, and polished system craft',
      zh: '有品牌、研究传播和完整视觉系统能力的视觉设计师',
    },
    projectIds: ['p17', 'p15', 'p6', 'p18', 'p19', 'p7', 'p16'],
    keywords: ['visual', 'brand', 'branding', 'packaging', 'identity', 'graphic', '视觉', '品牌', '包装', '平面'],
  },
  {
    id: 'b2b-platform',
    label: { en: 'B2B platform', zh: 'B2B 平台' },
    query: {
      en: 'product designer who can structure B2B AI platform flows and complex interface hierarchy',
      zh: '能梳理 B2B AI 平台流程和复杂界面层级的产品设计师',
    },
    projectIds: ['p12', 'p5', 'p13', 'p14', 'p2'],
    keywords: ['b2b', 'platform', 'enterprise', 'workflow', 'hierarchy', 'flow', '企业', '平台', '流程', '层级'],
  },
  {
    id: 'microsoft',
    label: { en: 'Microsoft experience', zh: '微软经验' },
    query: {
      en: 'designer with Microsoft product and research experience across Copilot, Office, and MSRA demos',
      zh: '有 Copilot、Office 和 MSRA 研究 demo 经验的微软设计师',
    },
    projectIds: ['p1', 'p3', 'p20', 'p5', 'p13', 'p6', 'p12'],
    keywords: ['microsoft', 'office', 'copilot', 'stca', 'msra', '微软', '研究院', 'office'],
  },
];

const projectSearchHints: Record<string, string[]> = {
  p1: ['copilot read aloud', 'word', 'office', 'voice ux', 'conversation design', 'accessibility', 'microsoft', '微软', '语音交互', '朗读'],
  p2: ['keeta', 'user flow', 'mobile app analysis', 'test exercise', 'personal practice', '流程分析', '移动端', '测试题', '练习'],
  p3: ['nuwa', 'outpainting', 'long video', 'trajectory', 'multimodal ai', 'generative ai', 'research demo', '多模态', '生成式 ai', '研究 demo'],
  p4: ['reme', 'ai companion', 'consumer app', 'memory', 'empathy', 'ai 陪伴', 'c 端', '用户体验'],
  p5: ['rd-agent', 'agent', 'research workflow', 'internal tool', '科研工作流', '智能体', '研究工具'],
  p6: ['msra 25th anniversary', 'event visual', 'microsoft research asia', 'anniversary', 'visual design', '微软亚洲研究院', '周年', '活动视觉'],
  p7: ['ioete tea shop', 'tea shop', 'brand identity', 'packaging', 'retail', '茶店', '品牌', '包装'],
  p8: ['illustration', 'graphic', 'editorial', 'visual exploration', '插画', '平面', '个人视觉'],
  p9: ['heart printing', 'packaging', 'graphic', 'print', '包装', '印刷', '视觉'],
  p10: ['palette of the dreamer', 'ip design', 'character', 'campaign', 'ip', '角色', '视觉'],
  p11: ['white elephant', 'poster', 'packaging', 'contest', '白象', '海报', '包装', '视觉'],
  p12: ['baidu ai cloud', 'ai cloud', 'enterprise', 'system', 'b2b', '百度智能云', '企业工具', '系统'],
  p13: ['taskmatrix.ai', 'agent', 'ai system', 'research demo', 'automation', '任务矩阵', '智能体', '研究 demo'],
  p14: ['xiaodu learning tablet', 'education', 'iot', 'children', 'learning', '小度', '教育', '学习机', '儿童'],
  p15: ['value compass', 'visual system', 'information design', 'branding', '价值指南针', '视觉系统', '信息设计'],
  p16: ['salone del mobile', 'milan', 'exhibition', 'editorial', 'furniture', '米兰', '展览', '版式', '家具展'],
  p17: ['batteryml', 'visual design', 'ai research', 'system', 'data visualization', '电池', '机器学习', '视觉系统'],
  p18: ['fera', 'branding', 'identity', 'visual design', '品牌', '识别', '视觉'],
  p19: ['profiltubi', 'rebranding', 'group work', 'identity', 'brand system', '品牌重塑', '视觉识别'],
  p20: ['rodin diffusion', '3d avatar', '3d generation', 'microsoft research', 'research demo', 'ai interaction', '3d 头像', '三维生成', '研究 demo'],
  p21: ['lantern night return', 'spring festival', 'lantern festival', 'h5 game', 'vibe coding', 'frontend prototype', '元宵', '春节', '小游戏'],
};

const projectKinds: Record<string, LocalizedText> = {
  p1: { en: 'AI Product UX', zh: 'AI 产品 UX' },
  p2: { en: 'Flow Analysis Practice', zh: '流程分析练习' },
  p3: { en: 'AI Research Demo', zh: 'AI 研究 Demo' },
  p4: { en: 'Mobile AI App', zh: '移动端 AI' },
  p5: { en: 'Research Workflow', zh: '科研工作流' },
  p6: { en: 'Event Visual System', zh: '活动视觉系统' },
  p7: { en: 'Brand Identity', zh: '品牌识别' },
  p8: { en: 'Illustration', zh: '插画' },
  p9: { en: 'Packaging', zh: '包装设计' },
  p10: { en: 'IP Visual Design', zh: 'IP 视觉设计' },
  p11: { en: 'Poster / Packaging', zh: '海报 / 包装' },
  p12: { en: 'Enterprise AI Platform', zh: '企业级 AI 平台' },
  p13: { en: 'AI Agent Workflow', zh: 'AI Agent 工作流' },
  p14: { en: 'Education UX', zh: '教育 UX' },
  p15: { en: 'Research Visual System', zh: '研究视觉系统' },
  p16: { en: 'Editorial Web', zh: '编辑式网页' },
  p17: { en: 'Research Visual Identity', zh: '研究视觉识别' },
  p18: { en: 'Brand Identity', zh: '品牌识别' },
  p19: { en: 'Rebranding', zh: '品牌重塑' },
  p20: { en: '3D AI Demo', zh: '3D AI Demo' },
  p21: { en: 'H5 Game Flow', zh: 'H5 小游戏流程' },
};

const projectDisplayTitles: Record<string, LocalizedText> = {
  p2: { en: 'Keeta User Flow', zh: 'Keeta 用户流程' },
  p12: { en: 'Baidu AI Cloud', zh: '百度智能云' },
  p14: { en: 'Xiaodu Learning Tablet', zh: '小度学习机' },
  p21: { en: 'Lantern Night Return', zh: '元宵夜归人' },
};

const projectTeasers: Record<string, LocalizedText> = {
  p1: {
    en: 'Turns Copilot voice control into a readable Office workflow.',
    zh: '把 Copilot 语音控制转成清晰的 Office 工作流。',
  },
  p2: {
    en: 'Maps ordering friction into a tighter mobile service flow.',
    zh: '把下单摩擦整理成更清楚的移动服务流程。',
  },
  p3: {
    en: 'Makes outpainting, long video, and trajectory control explorable.',
    zh: '让图像外扩、长视频和轨迹控制变得可探索。',
  },
  p4: {
    en: 'Frames AI companionship through memory, empathy, and mobile rhythm.',
    zh: '用记忆、共情和移动节奏组织 AI 陪伴体验。',
  },
  p5: {
    en: 'Shapes agentic research work into a scannable product system.',
    zh: '把 Agent 科研流程整理成可扫读的产品系统。',
  },
  p6: {
    en: 'Extends an anniversary identity across event communication surfaces.',
    zh: '把周年主视觉扩展到活动传播触点。',
  },
  p7: {
    en: 'Builds a tea retail identity from mark to packaging system.',
    zh: '从标志到包装建立茶饮零售识别系统。',
  },
  p8: {
    en: 'Collects illustration work that broadens the visual vocabulary.',
    zh: '收录插画作品，扩展图形表达范围。',
  },
  p9: {
    en: 'Uses print structure and shelf presence to clarify packaging value.',
    zh: '用印刷结构和货架效果说明包装价值。',
  },
  p10: {
    en: 'Explores character-driven IP through a compact visual system.',
    zh: '用紧凑视觉系统探索角色型 IP。',
  },
  p11: {
    en: 'Turns a food-brand brief into a focused poster and pack story.',
    zh: '把食品品牌 brief 转成聚焦的海报与包装叙事。',
  },
  p12: {
    en: 'Clarifies enterprise AI hierarchy through platform visual polish.',
    zh: '通过平台视觉升级梳理企业级 AI 层级。',
  },
  p13: {
    en: 'Explains agent orchestration through workflow and story structure.',
    zh: '用工作流和叙事结构解释 Agent 编排。',
  },
  p14: {
    en: 'Reorganizes education entry points around study rhythm and AI access.',
    zh: '围绕学习节奏和 AI 入口重组教育首页。',
  },
  p15: {
    en: 'Connects value-alignment research with interface and visual system craft.',
    zh: '连接价值对齐研究、界面和视觉系统能力。',
  },
  p16: {
    en: 'Uses editorial pacing to shape a mobile design-event experience.',
    zh: '用编辑节奏组织移动端设计展体验。',
  },
  p17: {
    en: 'Packages BatteryML research as a technical identity system.',
    zh: '把 BatteryML 研究包装成技术识别系统。',
  },
  p18: {
    en: 'Defines a concise identity from logo direction to applications.',
    zh: '从 logo 方向到应用定义简洁识别。',
  },
  p19: {
    en: 'Reframes an industrial brand through identity and application boards.',
    zh: '通过识别和应用板重塑工业品牌。',
  },
  p20: {
    en: 'Makes 3D avatar generation readable through demo states and controls.',
    zh: '用 demo 状态和控制面板讲清 3D 头像生成。',
  },
  p21: {
    en: 'Translates a festival journey into a playable H5 prototype.',
    zh: '把节日回家路转译成可玩的 H5 原型。',
  },
};

const agentReasons: Record<string, LocalizedText> = {
  p1: {
    en: 'Direct evidence for Copilot voice UX, recovery states, and Office context.',
    zh: '直接证明 Copilot 语音 UX、恢复状态和 Office 场景能力。',
  },
  p3: {
    en: 'Turns model capability into prompt, gallery, canvas, timeline, and trajectory actions.',
    zh: '把模型能力转成 prompt、gallery、画布、时间线和轨迹动作。',
  },
  p5: {
    en: 'Organizes agent research logic into a workflow people can scan.',
    zh: '把 Agent 科研逻辑整理成可扫读的工作流。',
  },
  p12: {
    en: 'Shows enterprise AI hierarchy, platform polish, and B2B interface structure.',
    zh: '展示企业级 AI 层级、平台质感和 B2B 界面结构。',
  },
  p13: {
    en: 'Useful for agent workflow thinking and technical storytelling.',
    zh: '适合证明 Agent 工作流思考和技术叙事能力。',
  },
  p15: {
    en: 'Connects research communication with a polished visual system.',
    zh: '把研究沟通和完整视觉系统连接起来。',
  },
  p17: {
    en: 'Strong when the brief asks for research-facing visual systems.',
    zh: '适合展示面向研究传播的视觉系统能力。',
  },
  p20: {
    en: 'Frames 3D AI output through controls, preview states, and demo reading.',
    zh: '用控制、预览状态和 demo 阅读方式组织 3D AI 输出。',
  },
  p21: {
    en: 'Relevant for H5, frontend prototyping, mobile flow, and campaign storytelling.',
    zh: '适合 H5、前端原型、移动流程和活动叙事方向。',
  },
};

const projectSkillChips: Record<string, LocalizedText[]> = {
  p1: [
    { en: 'Microsoft', zh: '微软' },
    { en: 'Voice UX', zh: '语音 UX' },
  ],
  p3: [
    { en: 'Research demo', zh: '研究 Demo' },
    { en: 'AIGC', zh: 'AIGC' },
  ],
  p5: [
    { en: 'Agent workflow', zh: 'Agent 工作流' },
    { en: 'Research tooling', zh: '科研工具' },
  ],
  p12: [
    { en: 'Enterprise AI', zh: '企业 AI' },
    { en: 'Platform UX', zh: '平台 UX' },
  ],
  p13: [
    { en: 'AI agent', zh: 'AI Agent' },
    { en: 'Workflow', zh: '工作流' },
  ],
  p15: [
    { en: 'Visual system', zh: '视觉系统' },
    { en: 'Research comms', zh: '研究传播' },
  ],
  p17: [
    { en: 'Research visual', zh: '研究视觉' },
    { en: 'System craft', zh: '系统设计' },
  ],
  p20: [
    { en: '3D AI demo', zh: '3D AI Demo' },
    { en: 'MSRA', zh: 'MSRA' },
  ],
  p21: [
    { en: 'H5 game', zh: 'H5 小游戏' },
    { en: 'Prototype', zh: '原型' },
  ],
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
    ids: ['p17', 'p15', 'p6', 'p7', 'p18', 'p19', 'p16', 'p11', 'p9', 'p8'],
  },
  {
    terms: ['b2b', 'enterprise', 'platform', 'dashboard', 'workflow', '企业', '平台', '后台', '工作流'],
    ids: ['p12', 'p5', 'p13', 'p14'],
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

const phraseIntentBoosters = [
  {
    terms: ['microsoft product ux', 'office', '微软产品', '微软设计师', '语音'],
    ids: ['p1', 'p3', 'p20', 'p5', 'p13'],
    weight: 8,
  },
  {
    terms: ['research demo', 'model capability', '研究 demo', '模型能力', '技术 demo'],
    ids: ['p5', 'p3', 'p20', 'p13', 'p15'],
    weight: 6.5,
  },
  {
    terms: ['b2b ai platform', 'enterprise ai', 'complex interface', '企业级 ai', '复杂界面'],
    ids: ['p12', 'p5', 'p13', 'p14'],
    weight: 7,
  },
];

const namedProjectBoosters = [
  { terms: ['copilot', 'read aloud', 'office voice', '朗读', '语音阅读'], id: 'p1', weight: 24 },
  { terms: ['rd-agent', 'rd agent', 'research workflow', '科研工作流'], id: 'p5', weight: 20 },
  { terms: ['nuwa', 'outpainting', 'trajectory'], id: 'p3', weight: 20 },
  { terms: ['rodin', '3d avatar', '3d ai'], id: 'p20', weight: 20 },
  { terms: ['taskmatrix', 'taskmatrix.ai', 'agent workflow'], id: 'p13', weight: 18 },
  { terms: ['batteryml', 'battery ml'], id: 'p17', weight: 18 },
  { terms: ['msra 25th', 'anniversary', '微软亚洲研究院'], id: 'p6', weight: 18 },
];

const coverRadiusClasses: Record<CoverDensity, string> = {
  wall: 'rounded-[8px]',
  agent: 'rounded-[10px]',
  compact: 'rounded-[10px]',
  featured: 'rounded-[12px]',
  lead: 'rounded-[12px]',
};

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

  phraseIntentBoosters.forEach((booster) => {
    const triggered = booster.terms.some((term) => normalizedQuery.includes(normalize(term)));
    if (triggered && booster.ids.includes(project.id)) {
      score += booster.weight - booster.ids.indexOf(project.id) * 0.45;
    }
  });

  namedProjectBoosters.forEach((booster) => {
    const triggered = booster.terms.some((term) => normalizedQuery.includes(normalize(term)));
    if (triggered && booster.id === project.id) {
      score += booster.weight;
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

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ');

const AbstractCover: React.FC<{ project: Project; isZh: boolean }> = ({ project, isZh }) => (
  <div
    role="img"
    aria-label={`${getProjectTitle(project, isZh)} cover placeholder`}
    className="relative flex h-full w-full flex-col justify-end overflow-hidden bg-white p-3 text-[var(--work-ink)]"
  >
    <div className="absolute inset-0 grid grid-cols-4 gap-1.5 p-3 opacity-50" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, index) => (
        <span
          key={index}
          className={cn('h-5 rounded-sm bg-black/8', index % 4 === 0 ? 'col-span-2' : '')}
        />
      ))}
    </div>
    <div className="relative">
      <p className="mt-1 line-clamp-2 text-sm font-semibold leading-tight">{getProjectTitle(project, isZh)}</p>
    </div>
  </div>
);

const ProjectImage: React.FC<{
  project: Project;
  idx: number;
  isZh: boolean;
}> = ({ project, idx, isZh }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return <AbstractCover project={project} isZh={isZh} />;
  }

  return (
    <img
      src={projectCoverAsset(project)}
      alt={`${getProjectTitle(project, isZh)} cover`}
      width={1200}
      height={750}
      loading={idx < 6 ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={idx < 2 ? 'high' : 'auto'}
      onError={() => setHasError(true)}
      sizes="(min-width: 1200px) 360px, (min-width: 768px) 45vw, calc(100vw - 48px)"
      className="h-full w-full bg-white object-cover object-top outline outline-1 -outline-offset-1 outline-black/10"
    />
  );
};

const CoverFrame: React.FC<{
  project: Project;
  idx: number;
  isZh: boolean;
  density: CoverDensity;
}> = ({ project, idx, isZh, density }) => {
  return (
    <div
      className={cn(
        'relative aspect-video overflow-hidden bg-white shadow-[var(--work-cover-shadow)]',
        coverRadiusClasses[density]
      )}
    >
      <ProjectImage project={project} idx={idx} isZh={isZh} />
    </div>
  );
};

const WorkPage: React.FC<WorkPageProps> = ({
  projects,
  onProjectClick,
  onReturnToTimeline,
}) => {
  const { language, t } = useLanguage();
  const isZh = language === 'zh';
  const reduceMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<ViewMode>('agent');
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [activeSuggestionId, setActiveSuggestionId] = useState<string | null>(null);

  const projectById = useMemo(() => new Map(projects.map((project) => [project.id, project])), [projects]);
  const getProjectById = (id: string) => projectById.get(id);

  const formalProjects = useMemo(() => projects.filter((project) => !practiceProjectIds.has(project.id)), [projects]);

  const archiveTracks = useMemo<ArchiveTrack[]>(
    () => [
      {
        id: 'ai-research',
        title: isZh ? 'AI 产品与研究 Demo' : 'AI Product & Research Demos',
        subtitle: isZh
          ? '微软产品 UX、研究模型 demo、Agent 工作流和技术转译。'
          : 'Microsoft product UX, research demos, agent workflows, and technical translation.',
        projectIds: ['p1', 'p5', 'p3', 'p20', 'p13'],
        tone: 'research',
      },
      {
        id: 'visual-systems',
        title: isZh ? '视觉系统与研究传播' : 'Visual Systems & Research Communication',
        subtitle: isZh
          ? '研究传播、技术品牌、活动视觉和信息设计系统。'
          : 'Research-facing identity, technical branding, event visuals, and information systems.',
        projectIds: ['p17', 'p15', 'p6'],
        tone: 'visualSystem',
      },
      {
        id: 'product-flows',
        title: isZh ? '产品流程与 B2B 平台' : 'Product Flows & B2B Platforms',
        subtitle: isZh
          ? '企业级 AI、教育入口、移动端路径和复杂产品层级。'
          : 'Enterprise AI, education entry points, mobile paths, and complex product hierarchy.',
        projectIds: ['p12', 'p14', 'p4'],
        tone: 'aiProduct',
      },
      {
        id: 'brand-campaign',
        title: isZh ? '品牌、插画与活动 Campaign' : 'Branding, Illustration & Campaigns',
        subtitle: isZh
          ? '品牌识别、包装、展览网页、节日 H5 和图形表达。'
          : 'Identity, packaging, exhibition web, festival H5, and graphic expression.',
        projectIds: ['p21', 'p7', 'p18', 'p19', 'p16', 'p11', 'p9', 'p8', 'p10'],
        tone: 'brand',
      },
      {
        id: 'practice',
        title: isZh ? '练习与实验' : 'Practice & Experiments',
        subtitle: isZh
          ? '测试题、小型分析和个人探索放在后段，和正式项目区分。'
          : 'Tests, smaller analysis work, and self-initiated explorations stay visible but secondary.',
        projectIds: ['p2'],
        tone: 'practice',
      },
    ],
    [isZh]
  );

  const visibleArchiveTracks = useMemo(
    () =>
      archiveTracks
        .map((track) => ({
          ...track,
          projects: track.projectIds.map(getProjectById).filter((project): project is Project => Boolean(project)),
        }))
        .filter((track) => track.projects.length > 0),
    [archiveTracks, projectById]
  );

  const trackedProjectIds = useMemo(() => new Set(archiveTracks.flatMap((track) => track.projectIds)), [archiveTracks]);
  const untrackedProjects = useMemo(
    () => projects.filter((project) => !trackedProjectIds.has(project.id)).sort((a, b) => (priorityRank.get(a.id) ?? 999) - (priorityRank.get(b.id) ?? 999)),
    [projects, trackedProjectIds]
  );

  const projectTrackById = useMemo(() => {
    const map = new Map<string, string>();
    visibleArchiveTracks.forEach((track) => {
      track.projects.forEach((project) => map.set(project.id, track.title));
    });
    untrackedProjects.forEach((project) => map.set(project.id, isZh ? '补充项目' : 'Additional Archive'));
    return map;
  }, [visibleArchiveTracks, untrackedProjects, isZh]);

  const archiveTrackCount = visibleArchiveTracks.length + (untrackedProjects.length > 0 ? 1 : 0);

  const copy = {
    pageBadge: isZh ? '精选作品' : 'SELECTED WORKS',
    pageTitle: isZh ? 'AI 产品 UX、研究 Demo 与视觉系统。' : 'AI product UX, research demos, and visual systems.',
    pageSubtitle: isZh
      ? '我把复杂技术转成可使用、可探索、也能被团队清楚讨论的产品体验。'
      : 'I turn complex technology into usable, explorable experiences that teams can read, test, and discuss.',
    archiveStat: isZh
      ? `${projects.length} 个可阅读项目 · ${archiveTrackCount} 个方向`
      : `${projects.length} reader-ready works across ${archiveTrackCount} tracks`,
    formalStat: isZh ? `${formalProjects.length} 个正式项目` : `${formalProjects.length} formal works`,
    agentTitle: isZh ? 'Agent' : 'Agent',
    agentBody: isZh
      ? '输入职位、能力或项目类型，获得一组更相关的作品。'
      : 'Describe a role, capability, or project type and get a curated set of matching works.',
    archiveTitle: isZh ? '项目库' : 'Project Library',
    archiveBody: isZh
      ? '直接浏览完整项目库，按能力方向、时间和项目类型扫读。'
      : 'Browse the full archive by track, year, and project type.',
    agentKicker: isZh ? 'AGENT MATCH' : 'AGENT MATCH',
    agentHeading: 'Hi',
    agentSubheading: isZh
      ? '描述角色、能力或项目类型。这里使用本地项目元数据做前端匹配，不伪装成实时 AI 后端。'
      : 'Describe a role, capability, or project type. This uses local project metadata, not a live AI backend.',
    placeholder: isZh
      ? '告诉我你在找的职位、能力或项目类型…'
      : 'Tell me the role, capability, or project type you are looking for…',
    submit: isZh ? '发送' : 'Send',
    clear: isZh ? '清空输入' : 'Clear input',
    promptLabel: isZh ? 'Suggested prompts' : 'Suggested prompts',
    agentResultsDefault: isZh ? '可以先从这些项目看起' : 'Start with these works',
    agentResultsMatched: isZh ? '我找到了这些匹配项目' : 'I found these matching projects',
    noResults: isZh ? '暂时没有完全匹配的项目。试试输入能力、公司、工具或项目类型。' : 'No exact match yet. Try a skill, company, tool, or project type.',
    why: isZh ? '原因' : 'Why',
    archiveKicker: isZh ? 'PROJECT ARCHIVE' : 'PROJECT ARCHIVE',
    archiveHeading: isZh ? '项目库' : 'Project Library',
    archiveBodyLong: isZh
      ? '正式案例、研究 demo、视觉系统、品牌项目和练习被组织成更密集的浏览结构。'
      : 'Formal case studies, research demos, visual systems, branding, and practice work in a denser archive structure.',
    featuredHeading: isZh ? '代表性案例' : 'Featured Case Studies',
    featuredBody: isZh ? '先展示最能代表能力主线的项目。' : 'A sharper layer for the strongest evidence.',
    indexHeading: isZh ? '项目索引' : 'Project Index',
    indexBody: isZh ? '用 Year / Project / Track / Role 的方式保留完整数量感。' : 'A compact Year / Project / Track / Role view of the full body of work.',
    viewCase: isZh ? '查看案例' : 'View case',
    recent: isZh ? '近期' : 'Recent',
    localMatch: isZh ? 'Local metadata match' : 'Local metadata match',
    tableYear: isZh ? 'Year' : 'Year',
    tableProject: isZh ? 'Project' : 'Project',
    tableTrack: isZh ? 'Track' : 'Track',
    tableRole: isZh ? 'Role / Type' : 'Role / Type',
    tableLink: isZh ? 'Link' : 'Link',
  };

  const archiveSummary = isZh
    ? `${projects.length} 个项目 · ${archiveTrackCount} 个方向 · ${formalProjects.length} 个正式项目`
    : `${projects.length} works across ${archiveTrackCount} tracks · ${formalProjects.length} formal works`;

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
      .slice(0, 5);
  }, [activeSuggestionId, formalProjects, submittedQuery, projectById]);

  const featuredProjects = archiveFeaturedIds
    .map(getProjectById)
    .filter((project): project is Project => Boolean(project));

  const indexProjects = useMemo(
    () =>
      [...projects].sort((a, b) => {
        const aPractice = practiceProjectIds.has(a.id) ? 1 : 0;
        const bPractice = practiceProjectIds.has(b.id) ? 1 : 0;
        if (aPractice !== bPractice) return aPractice - bPractice;
        return (priorityRank.get(a.id) ?? 999) - (priorityRank.get(b.id) ?? 999);
      }),
    [projects]
  );

  const wallProjects = useMemo(() => indexProjects.slice(0, 18), [indexProjects]);

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

  const cardMotion = (idx: number, y = 12) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { delay: reduceMotion ? 0 : Math.min(idx * 0.035, 0.18), duration: reduceMotion ? 0 : 0.32 },
  });

  const TopModeToggle = () => (
    <div className="mb-8 flex justify-center">
      <div className="inline-flex max-w-full items-center gap-2 rounded-full bg-white/58 px-2 py-1.5 text-sm shadow-[0_0_0_1px_rgba(23,20,18,0.07),0_10px_30px_rgba(23,20,18,0.035)] backdrop-blur-sm sm:gap-3 sm:px-3">
        <div className="hidden min-w-0 items-center gap-2 sm:flex">
          <span className="font-mono text-[10px] uppercase tracking-normal text-[var(--work-muted)]">Works</span>
          <span className="h-3 w-px bg-[var(--work-line)]" aria-hidden="true" />
          <span className="text-xs text-[var(--work-muted)]">
            {isZh ? `${projects.length} 个项目 · ${archiveTrackCount} 个方向` : `${projects.length} works · ${archiveTrackCount} tracks`}
          </span>
        </div>
        <div className="flex items-center rounded-full bg-[var(--work-bg)] p-0.5 shadow-[inset_0_0_0_1px_rgba(23,20,18,0.06)]" role="group" aria-label={isZh ? '切换作品浏览模式' : 'Switch work browsing mode'}>
        <button
          type="button"
          onClick={() => setViewMode('agent')}
          className={cn(
              'inline-flex h-8 min-w-[82px] items-center justify-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-[background-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--work-accent)]',
              viewMode === 'agent'
                ? 'bg-white text-[var(--work-ink)] shadow-[0_1px_8px_rgba(23,20,18,0.08)]'
                : 'text-[var(--work-muted)] hover:text-[var(--work-ink)]'
          )}
          aria-pressed={viewMode === 'agent'}
        >
            <span
              className={cn(
                'h-1.5 w-1.5 rounded-full transition-colors duration-200 ease-out',
                viewMode === 'agent' ? 'bg-[var(--work-accent)]' : 'bg-[var(--work-line-strong)]'
              )}
              aria-hidden="true"
            />
          <Bot size={14} aria-hidden="true" />
          Agent
        </button>
        <button
          type="button"
          onClick={() => setViewMode('archive')}
          className={cn(
              'inline-flex h-8 min-w-[86px] items-center justify-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-[background-color,color,box-shadow,transform] duration-200 ease-out active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--work-accent)]',
              viewMode === 'archive'
                ? 'bg-white text-[var(--work-ink)] shadow-[0_1px_8px_rgba(23,20,18,0.08)]'
                : 'text-[var(--work-muted)] hover:text-[var(--work-ink)]'
          )}
          aria-pressed={viewMode === 'archive'}
        >
            <span
              className={cn(
                'h-1.5 w-1.5 rounded-full transition-colors duration-200 ease-out',
                viewMode === 'archive' ? 'bg-[var(--work-accent)]' : 'bg-[var(--work-line-strong)]'
              )}
              aria-hidden="true"
            />
          <LibraryBig size={14} aria-hidden="true" />
          Library
        </button>
        </div>
      </div>
    </div>
  );

  const ComposerResultCard: React.FC<{ item: ScoredProject; idx: number }> = ({ item, idx }) => {
    const project = item.project;

    return (
      <motion.article layout {...cardMotion(idx, 8)}>
        <div className="group relative rounded-[14px] bg-white p-2 shadow-[var(--work-shadow-border)] transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[var(--work-shadow-border-hover)]">
          <button
            type="button"
            onClick={() => onProjectClick(project)}
            className="absolute inset-0 z-10 rounded-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--work-accent)]"
            aria-label={`${copy.viewCase}: ${project.title}`}
          />
          <div className="grid gap-3 sm:grid-cols-[132px_minmax(0,1fr)]">
            <CoverFrame project={project} idx={idx} isZh={isZh} density="agent" />
            <div className="relative z-20 flex min-w-0 flex-col justify-between py-1 pr-1">
              <div>
                <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[11px] text-[var(--work-muted)]">
                  <span className="font-mono tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                  <span>{project.year}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--work-line-strong)]" aria-hidden="true" />
                  <span>{getProjectKind(project, isZh)}</span>
                </div>
                <h3 className="font-sans text-lg font-semibold leading-tight text-[var(--work-ink)] text-balance">{getProjectTitle(project, isZh)}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-[var(--work-muted)]">
                  <span className="font-semibold text-[var(--work-ink)]">{copy.why}: </span>
                  {getAgentReason(project, isZh)}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--work-ink)] opacity-80 transition-[opacity,transform] duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100">
                  {copy.viewCase}
                  <ArrowRight size={13} aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  };

  const PromptChips = () => (
    <div className="mx-auto mt-5 flex max-w-[820px] flex-wrap justify-center gap-2">
      {capabilitySuggestions.map((suggestion) => (
        <button
          key={suggestion.id}
          type="button"
          onClick={() => handleSuggestionClick(suggestion)}
          className="min-h-10 shrink-0 rounded-full border border-[var(--work-line)] bg-white/70 px-4 py-2 text-sm font-medium text-[var(--work-muted)] transition-[background-color,border-color,color,transform] duration-200 ease-out hover:border-[var(--work-ink)] hover:bg-white hover:text-[var(--work-ink)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--work-accent)]"
        >
          {getLocalized(suggestion.label, isZh)}
        </button>
      ))}
    </div>
  );

  const AgentInputComposer: React.FC<{ placement: 'center' | 'dock' }> = ({ placement }) => {
    const isDock = placement === 'dock';

    return (
      <form onSubmit={handleSubmit} className={cn('mx-auto max-w-[820px]', isDock ? 'w-full' : 'mt-8')}>
        <label htmlFor="work-agent-query" className="sr-only">
          {copy.agentHeading}
        </label>
        <div
          className={cn(
            'bg-white shadow-[0_0_0_1px_rgba(23,20,18,0.08),0_24px_90px_-52px_rgba(23,20,18,0.38)] focus-within:shadow-[0_0_0_2px_rgba(49,92,255,0.35),0_24px_90px_-52px_rgba(23,20,18,0.38)]',
            isDock ? 'rounded-[24px] p-3 sm:p-3.5' : 'rounded-[28px] p-4'
          )}
        >
          <textarea
            id="work-agent-query"
            name="portfolio-agent-query"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveSuggestionId(null);
            }}
            placeholder={copy.placeholder}
            rows={isDock ? 2 : 3}
            spellCheck={false}
            autoComplete="off"
            className={cn(
              'w-full resize-none bg-transparent px-1 py-1 text-[var(--work-ink)] outline-none placeholder:text-[#8A837B]',
              isDock ? 'min-h-[52px] max-h-[150px] text-base leading-6' : 'min-h-[88px] text-[17px] leading-7'
            )}
          />
          <div className="mt-3 flex items-center justify-between gap-3 border-t border-[var(--work-line)] pt-3">
            <div className="flex min-w-0 items-center gap-2">
              <button
                type="button"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--work-line)] text-[var(--work-ink)] transition-[background-color,transform] duration-200 ease-out hover:bg-[var(--work-bg)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--work-accent)]"
                aria-label={isZh ? '添加更多需求' : 'Add more context'}
                title={isZh ? '添加更多需求' : 'Add more context'}
              >
                <FilePlus2 size={17} aria-hidden="true" />
              </button>
              <span className="inline-flex h-10 min-w-0 items-center truncate rounded-full border border-[var(--work-line)] px-3 text-sm font-medium text-[var(--work-muted)]">
                Portfolio Agent
              </span>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {query || submittedQuery ? (
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[var(--work-muted)] transition-[background-color,color,transform] duration-200 ease-out hover:bg-[var(--work-bg)] hover:text-[var(--work-ink)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--work-accent)]"
                  aria-label={copy.clear}
                  title={copy.clear}
                >
                  <X size={17} aria-hidden="true" />
                </button>
              ) : null}
              <button
                type="submit"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[var(--work-ink)] pl-4 pr-3.5 text-sm font-semibold text-white transition-[background-color,transform] duration-200 ease-out hover:bg-[var(--work-accent)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--work-accent)]"
              >
                {copy.submit}
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  const AgentComposer = () => (
    <section
      className={cn(
        'relative',
        submittedQuery
          ? 'min-h-[calc(100vh-220px)] pb-[190px] pt-4 sm:pb-[200px] sm:pt-6'
          : 'flex min-h-[calc(100vh-220px)] flex-col items-center justify-center py-10'
      )}
    >
      <div className="w-full max-w-[980px]">
        {submittedQuery ? null : (
          <div className="text-center">
            <h1 className="font-sans text-3xl font-semibold leading-tight text-[var(--work-ink)] text-balance sm:text-5xl">
              Hi
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[var(--work-muted)] sm:text-base">
              {isZh
                ? '和我说说你在找什么，我会帮你挑出最相关的项目。'
                : "Tell me what you're looking for, and I'll pull together the most relevant projects."}
            </p>
          </div>
        )}

        {submittedQuery ? (
          <div className="mx-auto max-w-[820px] space-y-5" role="log" aria-live="polite">
            <div className="flex justify-end">
              <div className="max-w-[720px] rounded-[22px] bg-[var(--work-ink)] px-4 py-3 text-sm leading-6 text-white shadow-[0_12px_30px_rgba(23,20,18,0.14)]">
                {submittedQuery}
              </div>
            </div>
            <div className="rounded-[22px] bg-white/74 p-4 shadow-[var(--work-shadow-border)]">
              <div className="mb-4 flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--work-ink)] text-white">
                  <Bot size={16} aria-hidden="true" />
                </span>
                <div>
                  <h2 className="font-sans text-lg font-semibold text-[var(--work-ink)]">{copy.agentResultsMatched}</h2>
                  <p className="mt-1 text-sm leading-6 text-[var(--work-muted)]">
                    {isZh
                      ? `我找到了 ${scoredMatches.length} 个相关项目。你可以继续改写需求，或直接打开案例。`
                      : `I found ${scoredMatches.length} relevant ${scoredMatches.length === 1 ? 'project' : 'projects'}. Refine the brief or open a case directly.`}
                  </p>
                </div>
              </div>
              {scoredMatches.length > 0 ? (
                <div className="space-y-3">
                  {scoredMatches.map((item, idx) => (
                    <ComposerResultCard key={item.project.id} item={item} idx={idx} />
                  ))}
                </div>
              ) : (
                <div className="rounded-[14px] border border-dashed border-[var(--work-line)] px-4 py-8 text-center text-sm text-[var(--work-muted)]">
                  {copy.noResults}
                </div>
              )}
            </div>
          </div>
        ) : null}

        {submittedQuery ? null : (
          <>
            <AgentInputComposer placement="center" />
            <PromptChips />
          </>
        )}
      </div>

      {submittedQuery ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-[var(--work-bg)] via-[var(--work-bg)]/95 to-transparent px-4 pb-4 pt-8 sm:px-6 sm:pb-6">
          <div className="pointer-events-auto mx-auto max-w-[900px]">
            <AgentInputComposer placement="dock" />
          </div>
        </div>
      ) : null}
    </section>
  );

  const WorkHero = () => (
    <section className="grid gap-8 border-b border-[var(--work-line)] pb-10 lg:grid-cols-[minmax(0,0.78fr)_minmax(420px,1fr)] lg:items-end lg:pb-12">
      <div className="max-w-3xl">
        <div className="mb-5 inline-flex items-center gap-2 border border-[var(--work-line)] bg-white/62 px-3 py-1.5 font-mono text-[11px] text-[var(--work-muted)] shadow-[var(--work-shadow-border)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--work-accent)]" aria-hidden="true" />
          {copy.pageBadge}
        </div>
        <h1 className="max-w-[760px] font-serif text-[2.8rem] leading-[0.96] text-[var(--work-ink)] text-balance sm:text-[4.5rem] lg:text-[5.4rem]">
          {copy.pageTitle}
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--work-muted)] text-pretty sm:text-lg">
          {copy.pageSubtitle}
        </p>
        <div className="mt-8 grid max-w-xl grid-cols-2 border-y border-[var(--work-line)] text-sm text-[var(--work-muted)] sm:grid-cols-[1fr_1fr_auto]">
          <div className="border-r border-[var(--work-line)] py-4 pr-4">
            <p className="font-mono text-xs text-[var(--work-ink)]">{projects.length}</p>
            <p>{isZh ? '可阅读项目' : 'reader-ready works'}</p>
          </div>
          <div className="py-4 pl-4 sm:border-r sm:border-[var(--work-line)] sm:pr-4">
            <p className="font-mono text-xs text-[var(--work-ink)]">{archiveTrackCount}</p>
            <p>{isZh ? '项目方向' : 'project tracks'}</p>
          </div>
          <div className="col-span-2 border-t border-[var(--work-line)] py-4 sm:col-span-1 sm:border-t-0 sm:pl-4">
            <p className="font-mono text-xs text-[var(--work-ink)]">{formalProjects.length}</p>
            <p>{isZh ? '正式项目' : 'formal works'}</p>
          </div>
        </div>
      </div>

      <div className="rounded-[16px] bg-[var(--work-surface)] p-2 shadow-[var(--work-shadow-border)]">
        <div className="mb-2 flex items-center justify-between px-2 py-1.5">
          <p className="font-mono text-[11px] text-[var(--work-muted)]">CONTACT SHEET</p>
          <p className="font-mono text-[11px] text-[var(--work-muted)]">{copy.archiveStat}</p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 xl:grid-cols-6">
          {wallProjects.map((project, idx) => (
            <button
              key={project.id}
              type="button"
              onClick={() => onProjectClick(project)}
              className="group min-h-10 rounded-[11px] text-left transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--work-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--work-surface)]"
              aria-label={`${copy.viewCase}: ${project.title}`}
            >
              <CoverFrame project={project} idx={idx} isZh={isZh} density="wall" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );

  const ModeSwitch = () => {
    const modes: Array<{ mode: ViewMode; number: string; title: string; body: string; action: string; icon: React.ReactNode }> = [
      {
        mode: 'agent',
        number: '01',
        title: copy.agentTitle,
        body: copy.agentBody,
        action: isZh ? '进入 Agent' : 'Ask Agent',
        icon: <Bot size={18} aria-hidden="true" />,
      },
      {
        mode: 'archive',
        number: '02',
        title: copy.archiveTitle,
        body: copy.archiveBody,
        action: isZh ? '打开档案库' : 'Open Archive',
        icon: <LibraryBig size={18} aria-hidden="true" />,
      },
    ];

    return (
      <section className="mt-8 overflow-hidden border-y border-[var(--work-line)]">
        {modes.map((item) => {
          const isActive = viewMode === item.mode;
          return (
            <button
              key={item.mode}
              type="button"
              onClick={() => setViewMode(item.mode)}
              className={cn(
                'group grid w-full grid-cols-[44px_minmax(0,1fr)] gap-4 border-b border-[var(--work-line)] px-0 py-5 text-left transition-[background-color,color] duration-200 ease-out last:border-b-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--work-accent)] sm:grid-cols-[72px_minmax(0,1fr)_180px]',
                isActive ? 'bg-white/70' : 'hover:bg-white/44'
              )}
              aria-pressed={isActive}
            >
              <span className="font-mono text-sm text-[var(--work-muted)]">{item.number}</span>
              <span className="min-w-0">
                <span className="flex items-center gap-2 text-lg font-semibold text-[var(--work-ink)]">
                  {item.icon}
                  {item.title}
                </span>
                <span className="mt-1 block max-w-2xl text-sm leading-6 text-[var(--work-muted)]">{item.body}</span>
              </span>
              <span className="col-start-2 inline-flex items-center gap-2 text-sm font-semibold text-[var(--work-ink)] sm:col-start-auto sm:justify-end">
                {item.action}
                <ArrowRight size={15} className="transition-transform duration-200 ease-out group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </button>
          );
        })}
      </section>
    );
  };

  const FeaturedProjectCard: React.FC<{ project: Project; idx: number; variant: 'lead' | 'standard' }> = ({ project, idx, variant }) => {
    const chips = (projectSkillChips[project.id] || []).slice(0, 2);

    return (
      <motion.article
        layout
        {...cardMotion(idx, 14)}
        className={cn(variant === 'lead' ? 'lg:col-span-2' : '', 'min-w-0')}
      >
        <div className="group relative h-full rounded-[14px] bg-[var(--work-surface)] p-3 shadow-[var(--work-shadow-border)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[var(--work-shadow-border-hover)]">
          <button
            type="button"
            onClick={() => onProjectClick(project)}
            className="absolute inset-0 z-10 rounded-[14px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--work-accent)]"
            aria-label={`${copy.viewCase}: ${project.title}`}
          />
          <div className={cn('grid gap-4', variant === 'lead' ? 'lg:grid-cols-[minmax(0,0.98fr)_minmax(220px,0.78fr)] lg:items-center' : '')}>
            <CoverFrame project={project} idx={idx} isZh={isZh} density={variant === 'lead' ? 'lead' : 'featured'} />
            <div className="relative z-20 flex min-w-0 flex-col justify-between px-1 pb-1 pt-1">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[var(--work-muted)]">
                  <span className="font-mono tabular-nums">{project.year}</span>
                  <span className="h-1 w-1 rounded-full bg-[var(--work-line-strong)]" aria-hidden="true" />
                  <span>{getProjectKind(project, isZh)}</span>
                  {isRecentProject(project) ? (
                    <span className="border border-[var(--work-line)] bg-[var(--work-bg)] px-2 py-0.5 text-[11px] text-[var(--work-muted)]">
                      {copy.recent}
                    </span>
                  ) : null}
                </div>
                <h3 className={cn('font-sans font-semibold leading-tight text-[var(--work-ink)] text-balance', variant === 'lead' ? 'text-3xl sm:text-[2.25rem]' : 'text-2xl')}>
                  {getProjectTitle(project, isZh)}
                </h3>
                <p className="mt-3 text-sm leading-6 text-[var(--work-muted)] text-pretty">{getProjectTeaser(project, isZh)}</p>
              </div>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {chips.map((chip) => (
                  <span key={chip.en} className="border border-[var(--work-line)] px-2.5 py-1 text-xs font-medium text-[var(--work-muted)]">
                    {getLocalized(chip, isZh)}
                  </span>
                ))}
                <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--work-ink)] opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-within:opacity-100">
                  {copy.viewCase}
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  };

  const CompactProjectCard: React.FC<{ project: Project; idx: number }> = ({ project, idx }) => {
    const chips = (projectSkillChips[project.id] || (project.tags || []).map((tag) => ({ en: tag, zh: tag }))).slice(0, 2);

    return (
      <motion.article
        layout
        {...cardMotion(idx, 10)}
      >
        <div className="group relative h-full rounded-[12px] bg-[var(--work-surface)] p-2 shadow-[var(--work-shadow-border)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[var(--work-shadow-border-hover)]">
          <button
            type="button"
            onClick={() => onProjectClick(project)}
            className="absolute inset-0 z-10 rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--work-accent)]"
            aria-label={`${copy.viewCase}: ${project.title}`}
          />
          <CoverFrame project={project} idx={idx} isZh={isZh} density="compact" />
          <div className="relative z-20 px-1 pb-2 pt-3">
            <div className="mb-2 flex min-w-0 flex-wrap items-center gap-2 text-[11px] text-[var(--work-muted)]">
              <span className="font-mono tabular-nums">{project.year}</span>
              <span className="h-1 w-1 rounded-full bg-[var(--work-line-strong)]" aria-hidden="true" />
              <span className="min-w-0 truncate">{getProjectKind(project, isZh)}</span>
            </div>
            <h3 className="min-h-[44px] font-sans text-[1.05rem] font-semibold leading-[1.25] text-[var(--work-ink)] text-balance">
              {getProjectTitle(project, isZh)}
            </h3>
            <p className="mt-2 line-clamp-2 min-h-[40px] text-[13px] leading-5 text-[var(--work-muted)]">{getProjectTeaser(project, isZh)}</p>
            <div className="mt-3 flex min-h-[26px] flex-wrap gap-1.5">
              {chips.map((chip) => (
                <span key={chip.en} className="border border-[var(--work-line)] px-2 py-0.5 text-[10px] font-medium text-[var(--work-muted)]">
                  {getLocalized(chip, isZh)}
                </span>
              ))}
            </div>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--work-ink)] opacity-0 transition-[opacity,transform] duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-within:opacity-100">
              {copy.viewCase}
              <ArrowRight size={13} aria-hidden="true" />
            </span>
          </div>
        </div>
      </motion.article>
    );
  };

  const AgentResultRow: React.FC<{ item: ScoredProject; idx: number }> = ({ item, idx }) => {
    const project = item.project;
    const chips = (projectSkillChips[project.id] || [{ en: getProjectKind(project, false), zh: getProjectKind(project, true) }]).slice(0, 3);

    return (
      <motion.article layout {...cardMotion(idx, 8)}>
        <div className="group relative rounded-[12px] bg-white/[0.045] p-2 shadow-[0_0_0_1px_rgba(255,255,255,0.09)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-white/[0.07] hover:shadow-[0_0_0_1px_rgba(143,163,255,0.42)]">
          <button
            type="button"
            onClick={() => onProjectClick(project)}
            className="absolute inset-0 z-10 rounded-[12px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#8FA3FF]"
            aria-label={`${copy.viewCase}: ${project.title}`}
          />
          <div className="grid gap-3 sm:grid-cols-[132px_minmax(0,1fr)]">
            <CoverFrame project={project} idx={idx} isZh={isZh} density="agent" />
            <div className="relative z-20 flex min-w-0 flex-col justify-between py-1 pr-1">
              <div>
                <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[11px] text-white/52">
                  <span className="font-mono tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                  <span>{project.year}</span>
                  <span className="h-1 w-1 rounded-full bg-white/24" aria-hidden="true" />
                  <span>{getProjectKind(project, isZh)}</span>
                </div>
                <h3 className="font-sans text-lg font-semibold leading-tight text-white text-balance">{getProjectTitle(project, isZh)}</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {chips.map((chip) => (
                    <span key={chip.en} className="border border-white/12 bg-white/6 px-2 py-0.5 text-[10px] font-medium text-white/70">
                      {getLocalized(chip, isZh)}
                    </span>
                  ))}
                </div>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/68">
                  <span className="font-semibold text-white/88">{copy.why}: </span>
                  {getAgentReason(project, isZh)}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white opacity-80 transition-[opacity,transform] duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100">
                  {copy.viewCase}
                  <ArrowRight size={13} aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.article>
    );
  };

  const AgentMatchPanel = () => (
    <section className="mt-10 rounded-[16px] bg-[var(--work-agent-bg)] p-4 text-white shadow-[var(--work-agent-shadow)] sm:p-6 lg:p-7">
      <div className="grid gap-6 lg:grid-cols-[minmax(300px,0.92fr)_minmax(0,1.08fr)]">
        <div className="min-w-0">
          <div className="mb-5 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="font-mono text-[11px] text-[#8FA3FF]">{copy.agentKicker}</p>
              <h2 className="mt-3 max-w-xl font-sans text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl">
                {copy.agentHeading}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/68 text-pretty">{copy.agentSubheading}</p>
            </div>
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#315CFF] text-white shadow-[0_12px_30px_rgba(49,92,255,0.32)] sm:inline-flex">
              <Bot size={19} aria-hidden="true" />
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="work-agent-query" className="mb-2 block text-xs font-semibold text-white/76">
              {copy.agentHeading}
            </label>
            <div className="rounded-[12px] bg-[#1C1D22] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.10)] focus-within:shadow-[0_0_0_2px_rgba(143,163,255,0.70)]">
              <div className="flex items-start gap-3">
                <Search size={18} className="mt-2.5 shrink-0 text-white/52" aria-hidden="true" />
                <textarea
                  id="work-agent-query"
                  name="portfolio-agent-query"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActiveSuggestionId(null);
                  }}
                  placeholder={copy.placeholder}
                  rows={5}
                  spellCheck={false}
                  autoComplete="off"
                  className="min-h-[128px] flex-1 resize-none bg-transparent py-1.5 text-[15px] leading-6 text-white outline-none placeholder:text-white/58"
                />
                {query || submittedQuery ? (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white/56 transition-[background-color,color,transform] duration-200 ease-out hover:bg-white/10 hover:text-white active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FA3FF]"
                    aria-label={copy.clear}
                    title={copy.clear}
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                ) : null}
              </div>
              <div className="mt-3 flex flex-col gap-2 border-t border-white/8 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-mono text-[10px] text-white/64">{copy.localMatch}</span>
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#315CFF] pl-4 pr-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(49,92,255,0.32)] transition-[background-color,transform,box-shadow] duration-200 ease-out hover:bg-[#5B5CFF] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AEBBFF]"
                >
                  {copy.submit}
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold text-white/64">{copy.promptLabel}</p>
            <div className="flex flex-wrap gap-2">
              {capabilitySuggestions.map((suggestion) => {
                const isActive = activeSuggestionId === suggestion.id;
                return (
                  <button
                    key={suggestion.id}
                    type="button"
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={cn(
                      'min-h-10 rounded-full border px-3 py-1.5 text-xs font-medium transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FA3FF]',
                      isActive
                        ? 'border-[#8FA3FF] bg-[#315CFF] text-white'
                        : 'border-white/14 bg-white/[0.03] text-white/72 hover:border-white/28 hover:bg-white/[0.08] hover:text-white'
                    )}
                  >
                    {getLocalized(suggestion.label, isZh)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="min-w-0 rounded-[14px] bg-[#0F1014] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.08)] sm:p-4">
          <div className="mb-4 flex flex-col gap-3 border-b border-white/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-mono text-[11px] text-white/58">
                {submittedQuery ? (isZh ? 'MATCHED WORKS' : 'MATCHED WORKS') : isZh ? 'RECOMMENDED SET' : 'RECOMMENDED SET'}
              </p>
              <h3 className="mt-1 font-sans text-2xl font-semibold leading-tight text-white text-balance">
                {submittedQuery ? copy.agentResultsMatched : copy.agentResultsDefault}
              </h3>
            </div>
            <p className="font-mono text-xs text-white/58">
              {scoredMatches.length} {isZh ? '个项目' : scoredMatches.length === 1 ? 'work' : 'works'}
            </p>
          </div>

          {submittedQuery ? (
            <div className="mb-4 rounded-[10px] bg-white/[0.045] px-3 py-2 text-sm leading-6 text-white/66 shadow-[0_0_0_1px_rgba(255,255,255,0.07)]">
              {isZh ? 'Brief: ' : 'Brief: '}
              <span className="font-medium text-white">"{submittedQuery}"</span>
            </div>
          ) : null}

          {scoredMatches.length > 0 ? (
            <div className="space-y-3">
              {scoredMatches.map((item, idx) => (
                <AgentResultRow key={item.project.id} item={item} idx={idx} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[220px] items-center justify-center rounded-[12px] border border-dashed border-white/14 px-5 text-center text-sm leading-6 text-white/58">
              {copy.noResults}
            </div>
          )}
        </div>
      </div>
    </section>
  );

  const ProjectTrackSection: React.FC<{ track: ArchiveTrack & { projects: Project[] }; offset: number }> = ({ track, offset }) => (
    <section className="border-t border-[var(--work-line)] pt-7">
      <div className="mb-5 grid gap-3 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="font-mono text-[11px] text-[var(--work-muted)]">{track.id.toUpperCase()}</p>
          <h3 className="mt-2 font-sans text-2xl font-semibold leading-tight text-[var(--work-ink)] text-balance">{track.title}</h3>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-[var(--work-muted)]">{track.subtitle}</p>
        <span className="font-mono text-xs text-[var(--work-muted)]">
          {track.projects.length} {isZh ? '个项目' : track.projects.length === 1 ? 'work' : 'works'}
        </span>
      </div>
      <div className={cn('grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4', track.projects.length === 1 ? 'max-w-[360px] sm:grid-cols-1 xl:grid-cols-1' : '')}>
        {track.projects.map((project, idx) => (
          <CompactProjectCard key={`${track.id}-${project.id}`} project={project} idx={offset + idx} />
        ))}
      </div>
    </section>
  );

  const ProjectIndex = () => (
    <section className="mt-14 rounded-[14px] bg-[var(--work-surface)] p-4 shadow-[var(--work-shadow-border)] sm:p-5">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-mono text-[11px] text-[var(--work-muted)]">INDEX</p>
          <h3 className="mt-2 font-sans text-2xl font-semibold leading-tight text-[var(--work-ink)]">{copy.indexHeading}</h3>
          <p className="mt-2 text-sm leading-6 text-[var(--work-muted)]">{copy.indexBody}</p>
        </div>
        <span className="font-mono text-xs text-[var(--work-muted)]">
          {projects.length} {isZh ? '个条目' : 'entries'}
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-[760px] w-full border-collapse text-left">
          <caption className="sr-only">{copy.indexHeading}</caption>
          <thead>
            <tr className="border-y border-[var(--work-line)] font-mono text-[11px] text-[var(--work-muted)]">
              <th scope="col" className="w-[90px] py-3 pr-4 font-medium">{copy.tableYear}</th>
              <th scope="col" className="py-3 pr-4 font-medium">{copy.tableProject}</th>
              <th scope="col" className="w-[250px] py-3 pr-4 font-medium">{copy.tableTrack}</th>
              <th scope="col" className="w-[190px] py-3 pr-4 font-medium">{copy.tableRole}</th>
              <th scope="col" className="w-[90px] py-3 text-right font-medium">{copy.tableLink}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--work-line)]">
            {indexProjects.map((project) => (
              <tr key={project.id} className="group">
                <td className="py-3 pr-4 font-mono text-xs tabular-nums text-[var(--work-muted)]">{project.year}</td>
                <td className="py-3 pr-4">
                  <button
                    type="button"
                    onClick={() => onProjectClick(project)}
                    className="max-w-[280px] text-left font-sans text-sm font-semibold leading-tight text-[var(--work-ink)] transition-colors duration-200 ease-out hover:text-[var(--work-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--work-accent)]"
                  >
                    {getProjectTitle(project, isZh)}
                  </button>
                </td>
                <td className="py-3 pr-4 text-sm text-[var(--work-muted)]">{projectTrackById.get(project.id) || getProjectKind(project, isZh)}</td>
                <td className="py-3 pr-4 text-sm text-[var(--work-muted)]">{project.role || getProjectKind(project, isZh)}</td>
                <td className="py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onProjectClick(project)}
                    className="inline-flex min-h-10 items-center justify-end gap-1.5 text-sm font-semibold text-[var(--work-ink)] transition-colors duration-200 ease-out hover:text-[var(--work-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--work-accent)]"
                  >
                    {copy.viewCase}
                    <ArrowUpRight size={13} aria-hidden="true" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );

  const ArchiveSection = () => (
    <section className="mt-10" id="project-archive">
      <div className="mb-8 grid gap-4 border-b border-[var(--work-line)] pb-7 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="font-mono text-[11px] text-[var(--work-muted)]">{copy.archiveKicker}</p>
          <h2 className="mt-3 font-sans text-4xl font-semibold leading-tight text-[var(--work-ink)] text-balance sm:text-5xl">
            {copy.archiveHeading}
          </h2>
        </div>
        <p className="max-w-2xl text-sm leading-6 text-[var(--work-muted)]">{copy.archiveBodyLong}</p>
        <span className="font-mono text-xs text-[var(--work-muted)]">{archiveSummary}</span>
      </div>

      <section>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[11px] text-[var(--work-muted)]">FEATURED</p>
            <h3 className="mt-2 font-sans text-2xl font-semibold leading-tight text-[var(--work-ink)]">{copy.featuredHeading}</h3>
            <p className="mt-2 text-sm text-[var(--work-muted)]">{copy.featuredBody}</p>
          </div>
          <span className="font-mono text-xs text-[var(--work-muted)]">
            {featuredProjects.length} {isZh ? '个重点案例' : 'featured cases'}
          </span>
        </div>
        <div className="grid gap-4 lg:grid-cols-4">
          {featuredProjects.map((project, idx) => (
            <FeaturedProjectCard key={project.id} project={project} idx={idx} variant={idx === 0 ? 'lead' : 'standard'} />
          ))}
        </div>
      </section>

      <div className="mt-14 space-y-12">
        {visibleArchiveTracks.map((track, trackIndex) => (
          <ProjectTrackSection key={track.id} track={track} offset={trackIndex * 10 + 4} />
        ))}

        {untrackedProjects.length > 0 ? (
          <ProjectTrackSection
            track={{
              id: 'additional',
              title: isZh ? '补充项目' : 'Additional Archive',
              subtitle: isZh ? '未归入主分类但仍保留在完整作品库中。' : 'Projects kept visible outside the main track taxonomy.',
              projectIds: untrackedProjects.map((project) => project.id),
              projects: untrackedProjects,
              tone: 'practice',
            }}
            offset={90}
          />
        ) : null}
      </div>

      <ProjectIndex />
    </section>
  );

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.28 }}
      className="work-page min-h-screen overflow-x-hidden bg-[var(--work-bg)] px-5 pb-16 pt-28 font-sans text-[var(--work-ink)] sm:px-7 sm:pb-24 sm:pt-32"
    >
      <div className="mx-auto max-w-[1180px]">
        {onReturnToTimeline ? (
          <button
            type="button"
            onClick={onReturnToTimeline}
            className="mb-8 inline-flex min-h-10 items-center gap-2 rounded-full bg-white/70 pl-3.5 pr-4 text-sm font-medium text-[var(--work-ink)] shadow-[var(--work-shadow-border)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:bg-white hover:shadow-[var(--work-shadow-border-hover)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--work-accent)]"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {t('work.backToTimeline')}
          </button>
        ) : null}

        <TopModeToggle />
        {viewMode === 'agent' ? <AgentComposer /> : <ArchiveSection />}
      </div>
    </motion.div>
  );
};

export default WorkPage;

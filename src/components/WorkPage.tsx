import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Project } from '../types';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bot,
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
  onViewModeChange?: (viewMode: ViewMode) => void;
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
}

type AgentRole = 'user' | 'assistant';
type AgentStatus = 'idle' | 'loading' | 'ready' | 'error';

interface AgentMessage {
  id: string;
  role: AgentRole;
  content: string;
  mode?: 'openai' | 'github' | 'local';
  model?: string | null;
}

interface PortfolioAgentReply {
  answer: string;
  projectIds: string[];
  followUps: string[];
  mode: 'openai' | 'github' | 'local';
  model?: string | null;
  confidence?: 'high' | 'medium' | 'low';
  embeddingUsed?: boolean;
  keyConfigured?: boolean;
  error?: string;
}

const practiceProjectIds = new Set(['p2', 'p12', 'p14']);

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
  'p22',
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
    projectIds: ['p17', 'p15', 'p6', 'p18', 'p19', 'p7', 'p16', 'p22'],
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
    projectIds: ['p1', 'p3', 'p20', 'p5', 'p13', 'p6', 'p12', 'p22'],
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
  p22: ['probts', 'time series', 'probabilistic time series', 'visual identity', 'logo guideline', 'research brand', 'msra', '概率时间序列', '视觉识别', 'logo 规范', '研究品牌'],
};

const projectContextHints: Record<string, string[]> = {
  p1: ['stca', 'stac', 'microsoft stca', 'copilot', 'office', '微软 stca', '微软产品'],
  p21: ['stca', 'stac', 'microsoft stca', 'lantern night return', 'h5', 'prototype', '元宵夜归人', '节日 h5'],
  p3: ['msra', 'microsoft research asia', '微软亚洲研究院', '研究院项目'],
  p4: ['msra', 'microsoft research asia', '微软亚洲研究院', '研究院项目'],
  p5: ['msra', 'microsoft research asia', '微软亚洲研究院', '研究院项目'],
  p6: ['msra', 'microsoft research asia', '微软亚洲研究院', '研究院项目'],
  p8: ['msra', 'microsoft research asia', '微软亚洲研究院', 'illustration', '插画', '研究院项目'],
  p13: ['msra', 'microsoft research asia', '微软亚洲研究院', '研究院项目'],
  p15: ['msra', 'microsoft research asia', 'value compass', 'visual system web', '微软亚洲研究院', '视觉系统网页'],
  p17: ['msra', 'microsoft research asia', 'batteryml', '微软亚洲研究院', '研究院项目'],
  p20: ['msra', 'microsoft research asia', 'rodin', '微软亚洲研究院', '研究院项目'],
  p22: ['msra', 'microsoft research asia', 'probts', 'visual identity', 'early brand exploration', '微软亚洲研究院', '早期品牌探索', '研究院项目'],
  p2: ['design test', 'test exercise', 'product design test', '测试题', '练习', '产品设计测试'],
  p12: ['design test', 'test exercise', 'product design test', '测试题', '企业平台测试'],
  p14: ['design test', 'test exercise', 'product design test', '测试题', '教育产品测试'],
  p7: ['fom', 'fom studio', 'milan studio', 'brand studio', '米兰工作室', '品牌工作室'],
  p18: ['fom', 'fom studio', 'milan studio', 'brand studio', '米兰工作室', '品牌工作室'],
  p9: ['hand drawing', 'drawing', 'illustration', 'packaging drawing', '手绘', '绘画', '包装绘画'],
  p11: ['hand drawing', 'drawing', 'poster drawing', '手绘', '绘画', '海报绘画'],
  p10: ['naba', 'naba milano', 'school project', 'design academy', '学校项目', '米兰新美院'],
  p16: ['naba', 'naba milano', 'school project', 'design academy', '学校项目', '米兰新美院'],
  p19: ['naba', 'naba milano', 'school project', 'design academy', '学校项目', '米兰新美院'],
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
  p22: { en: 'Early Research Identity', zh: '早期研究视觉识别' },
};

const projectDisplayTitles: Record<string, LocalizedText> = {
  p1: { en: 'Copilot Read Aloud', zh: 'Copilot 朗读体验' },
  p2: { en: 'Keeta User Flow', zh: 'Keeta 用户流程' },
  p3: { en: 'NUWA Series', zh: 'NUWA 系列研究 Demo' },
  p4: { en: 'ReMe - AI Companion', zh: 'ReMe AI 陪伴' },
  p5: { en: 'RD-Agent', zh: 'RD-Agent 科研工作流' },
  p6: { en: 'MSRA 25th Anniversary', zh: '微软亚洲研究院 25 周年' },
  p7: { en: 'Ioete Tea Shop', zh: 'Ioete 茶店品牌' },
  p8: { en: 'Illustration Works', zh: '插画作品' },
  p9: { en: '"Heart Printing" Packaging', zh: '心相印包装设计' },
  p10: { en: 'Palette of the Dreamer', zh: 'Palette of the Dreamer IP 视觉' },
  p11: { en: '"White Elephant Soup Tastes Good"', zh: '白象汤好喝海报与包装' },
  p12: { en: 'Baidu AI Cloud', zh: '百度智能云' },
  p13: { en: 'TaskMatrix.AI Storytelling Agent', zh: 'TaskMatrix.AI Storytelling Agent' },
  p14: { en: 'Xiaodu Learning Tablet', zh: '小度学习机' },
  p15: { en: 'Value Compass & Visual System Web', zh: 'Value Compass 视觉系统网页' },
  p16: { en: 'Salone del Mobile', zh: '米兰国际家具展移动网页' },
  p17: { en: 'BatteryML Visual Design', zh: 'BatteryML 视觉设计' },
  p18: { en: 'Fera', zh: 'Fera 品牌识别' },
  p19: { en: 'PROFILTUBI Rebranding', zh: 'PROFILTUBI 品牌重塑' },
  p20: { en: 'RODIN Diffusion', zh: 'RODIN Diffusion 3D AI Demo' },
  p21: { en: 'Lantern Night Return', zh: '元宵夜归人' },
  p22: { en: 'ProbTS Visual Identity', zh: 'ProbTS 视觉识别探索' },
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
    en: 'Connects value-alignment research with interface and web visual system craft.',
    zh: '连接价值对齐研究、界面和网页视觉系统能力。',
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
  p22: {
    en: 'Keeps an early MSRA research-brand exploration in the archive layer.',
    zh: '把一组早期 MSRA 研究品牌探索放在归档层。',
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
    en: 'Connects research communication with interface and companion web-system design.',
    zh: '把研究沟通、界面和配套网页视觉系统连接起来。',
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
  p22: {
    en: 'A smaller archive item for logo guidelines and research communication.',
    zh: '作为较轻量的归档项目，展示 Logo 规范和研究传播能力。',
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
  p22: [
    { en: 'Research brand', zh: '研究品牌' },
    { en: 'Logo system', zh: 'Logo 系统' },
  ],
};

const intentBoosters = [
  {
    terms: ['ai', 'aigc', 'generative', 'research', 'multimodal', 'model', 'demo', 'ai product', 'ai产品', '生成式', '生成式 ai', '人工智能', '多模态', '研究', '研究 demo', '研究demo', '技术 demo', '模型', '模型能力'],
    ids: ['p3', 'p20', 'p5', 'p13', 'p15', 'p17', 'p1', 'p12'],
  },
  {
    terms: ['interaction', 'ux', 'product', 'flow', 'prototype', 'control', 'writing', 'communication', '交互', '用户体验', '产品体验', '体验', '流程', '原型', '控制', '输入', '书写', '交流'],
    ids: ['p1', 'p3', 'p20', 'p21', 'p5', 'p13', 'p12', 'p14', 'p4'],
  },
  {
    terms: ['microsoft', 'office', 'copilot', 'stca', 'msra', '微软', '微软经验', '微软项目', '研究院', '亚洲研究院', '语音'],
    ids: ['p1', 'p3', 'p20', 'p5', 'p13', 'p6', 'p12', 'p22'],
  },
  {
    terms: ['visual', 'brand', 'branding', 'packaging', 'identity', 'graphic', 'poster', '视觉', '视觉系统', '设计系统', '品牌', '包装', '平面', '海报'],
    ids: ['p17', 'p15', 'p6', 'p7', 'p18', 'p19', 'p16', 'p11', 'p9', 'p8', 'p22'],
  },
  {
    terms: ['b2b', 'enterprise', 'platform', 'dashboard', 'workflow', '企业', '企业级', '平台', '后台', '复杂系统', '复杂界面', '工作流'],
    ids: ['p12', 'p5', 'p13', 'p14'],
  },
  {
    terms: ['vibe', 'coding', 'frontend', 'h5', 'game', 'festival', 'lantern', 'spring', '前端', '可运行', '互动原型', '小游戏', '节日', '元宵', '春节'],
    ids: ['p21', 'p20', 'p3', 'p5'],
  },
  {
    terms: ['mobile', 'app', 'journey', 'analysis', 'exercise', 'test', '移动端', '路径', '分析', '测试题', '练习'],
    ids: ['p2', 'p4', 'p14', 'p21'],
  },
  {
    terms: ['chinese', 'bilingual', 'writing', 'communication', 'storytelling', '中文', '中英', '中英文', '中文交流', '写作', '文案', '沟通', '叙事', '讲述'],
    ids: ['p1', 'p13', 'p15', 'p17', 'p3', 'p5'],
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
  { terms: ['probts', 'prob ts', 'probabilistic time series', '概率时间序列'], id: 'p22', weight: 18 },
  { terms: ['msra 25th', 'anniversary', '微软亚洲研究院'], id: 'p6', weight: 18 },
];

const queryTermAliases = [
  'ai',
  'aigc',
  'b2b',
  'copilot',
  'h5',
  'msra',
  'office',
  'stca',
  '3d',
  'agent',
  '中文',
  '中英',
  '中英文',
  '中文交流',
  '写作',
  '文案',
  '沟通',
  '产品体验',
  '用户体验',
  '交互',
  '语音',
  '朗读',
  '微软',
  '微软亚洲研究院',
  '研究院',
  '研究',
  '科研',
  '研究 demo',
  '研究demo',
  '技术 demo',
  '模型能力',
  '生成式',
  '多模态',
  '智能体',
  '工作流',
  '编排',
  '平台',
  '企业',
  '复杂界面',
  '层级',
  '流程',
  '前端',
  '原型',
  '可运行',
  '小游戏',
  '移动端',
  '教育',
  '学习机',
  '品牌',
  '视觉',
  '视觉系统',
  '设计系统',
  '包装',
  '插画',
  '平面',
  '手绘',
  'ip',
  '头像',
  '陪伴',
  '情感',
  '无障碍',
  '可访问性',
  'nuwa',
  'rodin',
  'rd-agent',
  'taskmatrix',
  'batteryml',
  'probts',
  '百度',
  '小度',
  'keeta',
  '元宵',
  '春节',
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
const containsChinese = (value: string) => /[\u3400-\u9FFF]/.test(value);

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
      ...(projectContextHints[project.id] || []),
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

const getTerms = (query: string) => {
  const normalizedQuery = normalize(query);
  const aliasTerms = queryTermAliases
    .map((term) => normalize(term))
    .filter((term) => term.length > 1 && normalizedQuery.includes(term));

  return Array.from(
    new Set(
      [...normalizedQuery.split(' '), ...aliasTerms]
        .filter((term) => term.length > 1 && !queryStopWords.has(term))
    )
  );
};

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
const portfolioAgentApiUrl = import.meta.env.VITE_PORTFOLIO_AGENT_API_URL || '/api/portfolio-agent';
const shouldUseClientOnlyAgent = () =>
  portfolioAgentApiUrl === '/api/portfolio-agent' &&
  typeof window !== 'undefined' &&
  window.location.hostname.endsWith('github.io');

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
      className="h-full w-full scale-[1.04] bg-white object-cover object-top outline outline-1 -outline-offset-1 outline-black/10 transition-transform duration-300 ease-out group-hover:scale-[1.06]"
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
  onViewModeChange,
}) => {
  const { language, t } = useLanguage();
  const isZh = language === 'zh';
  const reduceMotion = useReducedMotion();
  const [viewMode, setViewMode] = useState<ViewMode>('agent');
  const [query, setQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [activeSuggestionId, setActiveSuggestionId] = useState<string | null>(null);
  const [agentMessages, setAgentMessages] = useState<AgentMessage[]>([]);
  const [agentReply, setAgentReply] = useState<PortfolioAgentReply | null>(null);
  const [agentStatus, setAgentStatus] = useState<AgentStatus>('idle');
  const [agentError, setAgentError] = useState('');
  const centerComposerTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const dockComposerTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const isComposingQueryRef = useRef(false);
  const agentRespondsInZh = isZh || containsChinese(query) || containsChinese(submittedQuery);

  useEffect(() => {
    onViewModeChange?.(viewMode);
  }, [onViewModeChange, viewMode]);

  const projectById = useMemo(() => new Map(projects.map((project) => [project.id, project])), [projects]);
  const getProjectById = (id: string) => projectById.get(id);

  const formalProjects = useMemo(() => projects.filter((project) => !practiceProjectIds.has(project.id)), [projects]);

  const archiveTracks = useMemo<ArchiveTrack[]>(
    () => [
      {
        id: 'stca',
        title: 'Microsoft STCA',
        subtitle: isZh
          ? 'Copilot 语音阅读体验和 STCA 阶段的交互原型项目。'
          : 'Copilot voice UX and interaction prototypes from the STCA stage.',
        projectIds: ['p1', 'p21'],
      },
      {
        id: 'msra',
        title: 'Microsoft Research Asia',
        subtitle: isZh
          ? '研究 Demo、Agent 工作流、AI 伴侣、视觉系统、周年视觉和插画项目。'
          : 'Research demos, agent workflows, AI companion work, visual systems, anniversary visuals, and illustration.',
        projectIds: ['p5', 'p3', 'p13', 'p20', 'p17', 'p15', 'p6', 'p4', 'p8', 'p22'],
      },
      {
        id: 'design-tests',
        title: isZh ? '产品设计测试题' : 'Product Design Tests',
        subtitle: isZh
          ? 'Keeta、小度学习机和百度智能云等测试题，单独放置，避免和正式工作经历混在一起。'
          : 'Keeta, Xiaodu Learning Tablet, and Baidu AI Cloud test exercises kept separate from formal work.',
        projectIds: ['p2', 'p14', 'p12'],
      },
      {
        id: 'fom-studio',
        title: 'FOM Studio',
        subtitle: isZh
          ? '米兰 FOM Studio 期间的品牌识别和商业视觉系统项目。'
          : 'Brand identity and commercial visual system work from FOM Studio in Milan.',
        projectIds: ['p7', 'p18'],
      },
      {
        id: 'hand-drawing',
        title: isZh ? '手绘与包装绘画' : 'Hand Drawing & Packaging Illustration',
        subtitle: isZh
          ? '白象汤好喝和心相印包装设计归为手绘绘画项目。'
          : 'White Elephant and Heart Printing packaging work grouped as hand-drawing and illustration projects.',
        projectIds: ['p11', 'p9'],
      },
      {
        id: 'naba',
        title: isZh ? 'NABA 学校项目' : 'NABA School Projects',
        subtitle: isZh
          ? '米兰新美院阶段的品牌、展览网页和 IP 视觉项目。'
          : 'Branding, exhibition web, and IP visual projects from NABA Milano.',
        projectIds: ['p19', 'p16', 'p10'],
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
      ? `${projects.length} 个可阅读项目 · ${archiveTrackCount} 个来源`
      : `${projects.length} reader-ready works across ${archiveTrackCount} contexts`,
    formalStat: isZh ? `${formalProjects.length} 个正式项目` : `${formalProjects.length} formal works`,
    agentTitle: 'Chat',
    agentBody: isZh
      ? '像面试一样提问，Agent 会基于作品集回答并推荐相关案例。'
      : 'Ask interview-style questions and get portfolio-grounded answers with matching cases.',
    archiveTitle: isZh ? '项目库' : 'Project Library',
    archiveBody: isZh
      ? '直接浏览完整项目库，按工作来源、时间和项目类型扫读。'
      : 'Browse the full archive by work context, year, and project type.',
    agentKicker: isZh ? 'AGENT MATCH' : 'AGENT MATCH',
    agentHeading: 'Hi',
    agentSubheading: isZh
      ? '可以像面试一样提问。Agent 会基于作品知识库回答，并在没有 API key 时自动回到本地模式。'
      : 'Ask interview-style questions. The agent answers from portfolio knowledge and falls back locally when no API key is configured.',
    placeholder: isZh
      ? '告诉我你在找的职位、能力或项目类型…'
      : 'Tell me in English or Chinese what role, capability, or project type you are looking for…',
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
      ? '按 STCA、MSRA、测试题、FOM Studio、手绘绘画和 NABA 学校项目重新整理，避免不同来源混在同一层级里。'
      : 'Grouped by STCA, MSRA, design tests, FOM Studio, hand-drawing work, and NABA school projects.',
    featuredHeading: isZh ? '代表性案例' : 'Featured Case Studies',
    featuredBody: isZh ? '先展示最能代表能力主线的项目。' : 'A sharper layer for the strongest evidence.',
    indexHeading: isZh ? '项目索引' : 'Project Index',
    indexBody: isZh ? '用 Year / Project / Track / Role 的方式保留完整数量感。' : 'A compact Year / Project / Track / Role view of the full body of work.',
    viewCase: isZh ? '查看案例' : 'View case',
    recent: isZh ? '近期' : 'Recent',
    localMatch: isZh ? 'Portfolio knowledge grounded' : 'Portfolio knowledge grounded',
    tableYear: isZh ? 'Year' : 'Year',
    tableProject: isZh ? 'Project' : 'Project',
    tableTrack: isZh ? 'Track' : 'Track',
    tableRole: isZh ? 'Role / Type' : 'Role / Type',
    tableLink: isZh ? 'Link' : 'Link',
  };

  const agentCopy = {
    greeting: agentRespondsInZh ? '你好' : 'Hi',
    inputLabel: agentRespondsInZh ? '作品 Agent 输入' : 'Portfolio Agent input',
    placeholder: agentRespondsInZh
      ? '可以直接用中文描述：职位、能力、项目类型、公司或技术方向…'
      : copy.placeholder,
    submit: agentRespondsInZh ? '发送' : 'Send',
    clear: agentRespondsInZh ? '清空输入' : 'Clear input',
    promptLabel: agentRespondsInZh ? '可直接点击，也可以用中文改写' : 'Suggested prompts',
    agentName: agentRespondsInZh ? '作品 Agent' : 'Portfolio Agent',
    addContext: agentRespondsInZh ? '添加更多需求' : 'Add more context',
    intro: agentRespondsInZh
      ? '可以直接像面试官一样问我：做过哪些 Agent？AI UX 方法是什么？某个项目里怎么做决策？'
      : 'Ask like an interviewer: agent work, AI UX methods, project decisions, or which cases best prove a skill.',
    matchedHeading: agentRespondsInZh ? '相关案例' : 'Relevant cases',
    matchedSummary: (count: number) =>
      agentRespondsInZh
        ? `我会基于作品知识库回答，并推荐 ${count} 个可打开的相关项目。`
        : `I answer from the portfolio knowledge base and recommend ${count} relevant ${count === 1 ? 'case' : 'cases'}.`,
    noResults: agentRespondsInZh
      ? '暂时没有完全匹配的项目。你可以继续用中文描述能力、公司、工具、项目类型或想看的案例方向。'
      : 'No exact match yet. Try a skill, company, tool, or project type.',
    why: agentRespondsInZh ? '原因' : 'Why',
    viewCase: agentRespondsInZh ? '查看案例' : 'View case',
    responseHeading: agentRespondsInZh ? 'Agent 回答' : 'Agent answer',
    loading: agentRespondsInZh ? '正在检索作品并生成回答…' : 'Retrieving portfolio context and drafting an answer...',
    sending: agentRespondsInZh ? '生成中' : 'Thinking',
    localFallback: agentRespondsInZh ? '作品知识库模式' : 'Portfolio knowledge mode',
    modelLabel: agentRespondsInZh ? '模型' : 'Model',
    groundedLabel: agentRespondsInZh ? '作品知识库' : 'Portfolio knowledge',
    followUpLabel: agentRespondsInZh ? '可以继续追问' : 'Suggested follow-ups',
    errorTitle: agentRespondsInZh ? 'Agent 暂时没有连上' : 'Agent is not connected yet',
    errorBody: agentRespondsInZh
      ? '我先保留本地项目匹配。检查本地 API 服务和模型 token 后可以继续提问。'
      : 'Local project matching is still available. Check the local API service and model token, then ask again.',
  };

  const archiveSummary = isZh
    ? `${projects.length} 个项目 · ${archiveTrackCount} 个来源 · ${formalProjects.length} 个正式项目`
    : `${projects.length} works across ${archiveTrackCount} contexts · ${formalProjects.length} formal works`;

  const getLocalMatchesForQuery = (effectiveQuery: string, suggestionId: string | null): ScoredProject[] => {
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

    return projects
      .map((project) => {
        const rawScore = scoreProject(project, effectiveQuery, suggestionId);
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
  };

  const scoredMatches = useMemo<ScoredProject[]>(() => {
    const effectiveQuery = submittedQuery.trim();
    return getLocalMatchesForQuery(effectiveQuery, activeSuggestionId);
  }, [activeSuggestionId, projects, submittedQuery, projectById]);

  const displayedMatches = useMemo<ScoredProject[]>(() => {
    if (!submittedQuery.trim() || !agentReply?.projectIds?.length) return scoredMatches;

    const existingById = new Map(scoredMatches.map((item) => [item.project.id, item]));
    const selected = agentReply.projectIds
      .map((projectId, index) => {
        const existing = existingById.get(projectId);
        if (existing) return existing;

        const project = getProjectById(projectId);
        if (!project) return null;

        return {
          project,
          score: 100 - index,
          rawScore: 100 - index,
          rank: priorityRank.get(project.id) ?? 999,
        };
      })
      .filter((item): item is ScoredProject => Boolean(item));

    scoredMatches.forEach((item) => {
      if (!selected.some((selectedItem) => selectedItem.project.id === item.project.id)) {
        selected.push(item);
      }
    });

    return selected.slice(0, 5);
  }, [agentReply, projectById, scoredMatches, submittedQuery]);

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

  const buildClientFallbackReply = (
    message: string,
    locale: 'zh' | 'en',
    candidateProjectIds: string[],
    localMatches: ScoredProject[]
  ): PortfolioAgentReply => {
    const fallbackMatches = localMatches.length > 0 ? localMatches : getLocalMatchesForQuery('', null);
    const topMatches = fallbackMatches.slice(0, 3);
    const isReplyZh = locale === 'zh';
    const projectIds = candidateProjectIds.length > 0
      ? candidateProjectIds
      : topMatches.map(({ project }) => project.id);
    const projectLines = topMatches
      .map(({ project }, index) => {
        const title = getProjectTitle(project, isReplyZh);
        const reason = getAgentReason(project, isReplyZh);
        return `${index + 1}. ${title}: ${reason}`;
      })
      .join('\n');

    return {
      mode: 'local',
      model: isReplyZh ? '作品知识库' : 'Portfolio knowledge',
      projectIds,
      confidence: topMatches.length > 0 ? 'medium' : 'low',
      embeddingUsed: false,
      keyConfigured: false,
      followUps: isReplyZh
        ? [
            '她做过哪些 Agent 或 AI 工作流项目？',
            '哪个项目最能证明 AI 产品 UX 能力？',
            '她如何把研究模型能力转成可用 Demo？',
          ]
        : [
            'Which agent or AI workflow projects has she done?',
            'Which case best proves her AI product UX ability?',
            'How does she turn model capability into a usable demo?',
          ],
      answer: isReplyZh
        ? `我先基于作品集内置知识库回答。针对「${message}」，最相关的证据是：\n\n${projectLines}\n\n如果面试官想更快判断匹配度，可以重点看这些项目里的问题拆解、交互状态、研究能力转译和最终可展示的界面结果。`
        : `I can answer from the built-in portfolio knowledge. For "${message}", the strongest evidence is:\n\n${projectLines}\n\nFor an interview, these cases are the fastest way to judge problem framing, interaction decisions, research translation, and the final interface craft.`,
    };
  };

  const appendAgentReply = (reply: PortfolioAgentReply) => {
    setAgentReply(reply);
    setAgentMessages((messages) => [
      ...messages,
      {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: reply.answer,
        mode: reply.mode,
        model: reply.model,
      },
    ]);
    setAgentStatus('ready');
  };

  const requestPortfolioAgent = async (message: string, suggestionId: string | null) => {
    const locale = isZh || containsChinese(message) ? 'zh' : 'en';
    const localMatches = getLocalMatchesForQuery(message, suggestionId);
    const candidateProjectIds = localMatches.map((item) => item.project.id);
    const userMessage: AgentMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
    };
    const history = [...agentMessages.slice(-6), userMessage].map(({ role, content }) => ({ role, content }));

    setAgentMessages((messages) => [...messages, userMessage]);
    setAgentStatus('loading');
    setAgentError('');

    if (shouldUseClientOnlyAgent()) {
      appendAgentReply(buildClientFallbackReply(message, locale, candidateProjectIds, localMatches));
      return;
    }

    try {
      const response = await fetch(portfolioAgentApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          locale,
          candidateProjectIds,
          history,
        }),
      });

      if (!response.ok) {
        throw new Error(`Agent API returned ${response.status}`);
      }

      const data = (await response.json()) as PortfolioAgentReply;
      const normalizedReply: PortfolioAgentReply = {
        answer: data.answer || (locale === 'zh' ? '我暂时没有生成出有效回答。' : 'I could not generate a useful answer yet.'),
        projectIds: Array.isArray(data.projectIds) ? data.projectIds : candidateProjectIds,
        followUps: Array.isArray(data.followUps) ? data.followUps : [],
        mode: data.mode || 'local',
        model: data.model || null,
        confidence: data.confidence,
        embeddingUsed: data.embeddingUsed,
        keyConfigured: data.keyConfigured,
        error: data.error,
      };

      appendAgentReply(normalizedReply);
    } catch (error) {
      const fallbackReply = buildClientFallbackReply(message, locale, candidateProjectIds, localMatches);
      appendAgentReply(fallbackReply);
      setAgentError(error instanceof Error ? error.message : 'Agent request failed.');
    }
  };

  const submitAgentQuery = () => {
    if (agentStatus === 'loading') return;

    const trimmedQuery = query.trim();
    setSubmittedQuery(trimmedQuery);
    setViewMode('agent');

    if (!trimmedQuery) {
      setActiveSuggestionId(null);
      return;
    }

    setQuery('');
    void requestPortfolioAgent(trimmedQuery, activeSuggestionId);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    submitAgentQuery();
  };

  const handleSuggestionClick = (suggestion: CapabilitySuggestion) => {
    const nextQuery = getLocalized(suggestion.query, agentRespondsInZh);
    setQuery('');
    setSubmittedQuery(nextQuery);
    setActiveSuggestionId(suggestion.id);
    setViewMode('agent');
    void requestPortfolioAgent(nextQuery, suggestion.id);
  };

  const handleFollowUpClick = (nextQuery: string) => {
    setQuery('');
    setSubmittedQuery(nextQuery);
    setActiveSuggestionId(null);
    setViewMode('agent');
    void requestPortfolioAgent(nextQuery, null);
  };

  const handleClear = () => {
    setQuery('');
    setSubmittedQuery('');
    setActiveSuggestionId(null);
    setAgentMessages([]);
    setAgentReply(null);
    setAgentStatus('idle');
    setAgentError('');
  };

  const cardMotion = (idx: number, y = 12) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { delay: reduceMotion ? 0 : Math.min(idx * 0.035, 0.18), duration: reduceMotion ? 0 : 0.32 },
  });

  const WorkSubpageNav = () => {
    const items: Array<{ mode: ViewMode; label: string }> = [
      {
        mode: 'agent',
        label: isZh ? 'Chat' : 'Chat',
      },
      {
        mode: 'archive',
        label: isZh ? '项目库' : 'Library',
      },
    ];

    return (
      <nav className="mb-7 flex justify-center" aria-label={isZh ? 'Work 子页面' : 'Work subpages'}>
        <div className="relative inline-flex min-h-12 items-center gap-1 rounded-full bg-white/50 p-1 shadow-[0_0_0_1px_rgba(22,21,19,0.055),0_18px_48px_-42px_rgba(22,21,19,0.48)] backdrop-blur-md">
          {items.map((item) => {
            const isActive = viewMode === item.mode;
            return (
              <button
                key={item.mode}
                type="button"
                onClick={() => setViewMode(item.mode)}
                className={cn(
                  'group relative isolate min-h-10 min-w-[104px] rounded-full px-5 text-sm font-medium transition-[color,transform] duration-200 ease-out active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--work-accent)]',
                  isActive
                    ? 'text-[var(--work-agent-ink)]'
                    : 'text-[var(--work-muted)] hover:text-[var(--work-agent-ink)]'
                )}
                aria-pressed={isActive}
                aria-current={isActive ? 'page' : undefined}
                title={item.label}
              >
                {isActive ? (
                  <motion.span
                    layoutId="work-subpage-active"
                    className="absolute inset-0 -z-10 rounded-full bg-white shadow-[0_0_0_1px_rgba(22,21,19,0.075),0_12px_28px_-24px_rgba(22,21,19,0.42)]"
                    transition={{ type: 'spring', duration: reduceMotion ? 0 : 0.36, bounce: 0 }}
                  />
                ) : (
                  <span className="absolute inset-0 -z-10 rounded-full bg-white/0 transition-[background-color,box-shadow] duration-200 ease-out group-hover:bg-white/48 group-hover:shadow-[0_0_0_1px_rgba(22,21,19,0.045)]" aria-hidden="true" />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    );
  };

  const renderAgentInputComposer = (placement: 'center' | 'dock') => {
    const isDock = placement === 'dock';
    const inputId = `work-agent-query-${placement}`;
    const textareaRef = isDock ? dockComposerTextareaRef : centerComposerTextareaRef;
    const canSubmit = query.trim().length > 0 && agentStatus !== 'loading';

    return (
      <form onSubmit={handleSubmit} className={cn('mx-auto w-full max-w-[744px]', isDock ? '' : 'mt-7')}>
        <label htmlFor={inputId} className="sr-only">
          {agentCopy.inputLabel}
        </label>
        <div
          onClick={(event) => {
            const target = event.target;
            if (target instanceof HTMLElement && target.closest('button, a')) return;
            textareaRef.current?.focus({ preventScroll: true });
          }}
          className={cn(
            'group flex min-h-14 cursor-text items-end rounded-[32px] bg-[var(--work-agent-elevated)] px-2 shadow-[var(--work-agent-shadow)] transition-[box-shadow,transform] duration-200 ease-out hover:-translate-y-px hover:shadow-[0_0_0_1px_rgba(22,21,19,0.105),0_24px_64px_-48px_rgba(22,21,19,0.56)] focus-within:-translate-y-0.5 focus-within:shadow-[0_0_0_2px_rgba(49,92,255,0.20),0_24px_64px_-42px_rgba(22,21,19,0.54)]',
            isDock ? 'backdrop-blur-md' : ''
          )}
        >
          <textarea
            ref={textareaRef}
            id={inputId}
            name="portfolio-agent-query"
            data-testid={inputId}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveSuggestionId(null);
            }}
            onCompositionStart={() => {
              isComposingQueryRef.current = true;
            }}
            onCompositionEnd={() => {
              isComposingQueryRef.current = false;
            }}
            placeholder={agentCopy.placeholder}
            lang={agentRespondsInZh ? 'zh-CN' : 'en'}
            dir="auto"
            rows={1}
            spellCheck={false}
            autoComplete="off"
            onKeyDown={(event) => {
              const nativeEvent = event.nativeEvent as KeyboardEvent & { isComposing?: boolean; keyCode?: number };
              const isImeComposing =
                isComposingQueryRef.current || nativeEvent.isComposing || nativeEvent.keyCode === 229;

              if (event.key === 'Enter' && !event.shiftKey && !isImeComposing) {
                event.preventDefault();
                submitAgentQuery();
              }
            }}
            className="min-h-[52px] flex-1 resize-none overflow-y-auto bg-transparent py-[14px] pl-4 pr-2 text-[16px] leading-7 text-[var(--work-agent-ink)] outline-none placeholder:text-[#8B857D]"
          />
          <button
            type="submit"
            disabled={!canSubmit}
            className="mb-2 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--work-agent-ink)] text-white shadow-[0_12px_26px_-18px_rgba(22,21,19,0.82)] transition-[background-color,box-shadow,opacity,transform] duration-200 ease-out group-hover:shadow-[0_16px_32px_-20px_rgba(22,21,19,0.86)] hover:bg-[var(--work-agent-blue)] hover:translate-x-0.5 active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--work-agent-blue)] disabled:translate-x-0 disabled:cursor-not-allowed disabled:bg-[#E9E4DC] disabled:text-[#9B9389] disabled:shadow-none"
            aria-label={agentStatus === 'loading' ? agentCopy.sending : agentCopy.submit}
          >
            {agentStatus === 'loading' ? (
              <span className="h-2.5 w-2.5 rounded-full bg-current animate-pulse" aria-hidden="true" />
            ) : (
              <ArrowRight size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </form>
    );
  };

  const AgentConversation = () => {
    const renderAssistantContent = (content: string) =>
      content.split(/\n{2,}/).map((block, index) => (
        <p key={`${block.slice(0, 24)}-${index}`} className="whitespace-pre-line text-pretty">
          {block}
        </p>
      ));

    return (
      <section className="mx-auto w-full max-w-[744px]">
        <div className="space-y-8" role="log" aria-live="polite">
          {agentMessages.map((message) => {
            const isAssistant = message.role === 'assistant';
            return (
              <article key={message.id} className={cn('flex', isAssistant ? 'justify-start' : 'justify-end')}>
                <div
                  className={cn(
                    'text-[15px] leading-7 sm:text-[16px]',
                    isAssistant
                      ? 'w-full space-y-4 text-[var(--work-agent-ink)]'
                      : 'max-w-[580px] rounded-[16px] bg-[#ECE8E0] px-4 py-2.5 text-[var(--work-agent-ink)] shadow-[0_0_0_1px_rgba(22,21,19,0.045)]'
                  )}
                  lang={agentRespondsInZh ? 'zh-CN' : 'en'}
                  dir="auto"
                >
                  {isAssistant ? (
                    <>
                      <div className="flex items-center gap-2 text-[12px] font-medium text-[var(--work-agent-muted)]">
                        <span>{agentCopy.agentName}</span>
                        {(message.mode === 'openai' || message.mode === 'github') && message.model ? <span>· {message.model}</span> : null}
                        {message.mode === 'local' ? <span>· {agentCopy.localFallback}</span> : null}
                      </div>
                      <div className="space-y-4">{renderAssistantContent(message.content)}</div>
                    </>
                  ) : (
                    <p className="whitespace-pre-line text-pretty">{message.content}</p>
                  )}
                </div>
              </article>
            );
          })}

          {agentStatus === 'loading' ? (
            <article className="flex justify-start">
              <div className="rounded-[18px] bg-white/72 px-4 py-3 text-sm leading-6 text-[var(--work-agent-muted)] shadow-[0_0_0_1px_rgba(22,21,19,0.055),0_16px_42px_-34px_rgba(22,21,19,0.42)]">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-flex gap-1" aria-hidden="true">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--work-agent-blue)] animate-pulse" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#6D8AFF] animate-pulse [animation-delay:120ms]" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#A7B7FF] animate-pulse [animation-delay:240ms]" />
                  </span>
                  {agentCopy.loading}
                </span>
              </div>
            </article>
          ) : null}

          {agentStatus === 'error' ? (
            <div className="rounded-[18px] bg-[#FFF7F3] px-4 py-3 text-sm leading-6 text-[#7B341E] shadow-[0_0_0_1px_rgba(183,87,44,0.22)]">
              <p className="font-semibold">{agentCopy.errorTitle}</p>
              <p className="mt-1">{agentCopy.errorBody}</p>
              {agentError ? <p className="mt-2 font-mono text-[11px] text-[#9A5A42]">{agentError}</p> : null}
            </div>
          ) : null}
        </div>

        {agentReply && displayedMatches.length > 0 ? (
          <div className="mt-8 border-t border-[var(--work-agent-line)] pt-5">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="text-[12px] font-semibold text-[var(--work-agent-muted)]">
                {agentRespondsInZh ? '引用案例' : 'Evidence'}
              </p>
              <span className="text-[12px] text-[var(--work-agent-muted)] tabular-nums">
                {displayedMatches.length} {agentRespondsInZh ? '个案例' : displayedMatches.length === 1 ? 'case' : 'cases'}
              </span>
            </div>
            <div className="grid gap-2">
              {displayedMatches.slice(0, 3).map((item, idx) => {
                const project = item.project;
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => onProjectClick(project)}
                    className="group flex min-h-[76px] items-center gap-3 rounded-[16px] bg-white/72 p-2 pr-3 text-left shadow-[0_0_0_1px_rgba(22,21,19,0.055)] transition-[background-color,box-shadow,transform] duration-200 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_0_0_1px_rgba(22,21,19,0.085),0_16px_34px_-28px_rgba(22,21,19,0.42)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--work-agent-blue)]"
                  >
                    <span className="w-[82px] shrink-0">
                      <CoverFrame project={project} idx={idx} isZh={isZh} density="agent" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="line-clamp-1 block text-sm font-semibold leading-5 text-[var(--work-agent-ink)]">
                        {getProjectTitle(project, agentRespondsInZh)}
                      </span>
                      <span className="mt-1 line-clamp-1 block text-xs text-[var(--work-agent-muted)]">
                        {String(idx + 1).padStart(2, '0')} · {getProjectKind(project, agentRespondsInZh)}
                      </span>
                    </span>
                    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--work-agent-muted)] transition-[background-color,color,transform] duration-200 ease-out group-hover:bg-[var(--work-agent-ink)] group-hover:text-white group-hover:translate-x-0.5">
                      <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ) : null}

        {agentReply?.followUps?.length ? (
          <div className="mt-6">
            <p className="mb-2 text-[12px] font-semibold text-[var(--work-agent-muted)]">{agentCopy.followUpLabel}</p>
            <div className="flex flex-wrap gap-2">
              {agentReply.followUps.map((followUp) => (
                <button
                  key={followUp}
                  type="button"
                  onClick={() => handleFollowUpClick(followUp)}
                  className="min-h-10 rounded-full bg-white/52 px-3.5 py-2 text-xs font-medium text-[var(--work-agent-muted)] shadow-[0_0_0_1px_rgba(22,21,19,0.055)] transition-[background-color,box-shadow,color,transform] duration-200 ease-out hover:bg-white hover:text-[var(--work-agent-ink)] hover:shadow-[0_0_0_1px_rgba(49,92,255,0.18)] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--work-agent-blue)]"
                >
                  {followUp}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </section>
    );
  };

  const renderAgentComposer = () => (
    <section
      className={cn(
        'relative isolate -mx-5 overflow-hidden bg-[var(--work-agent-canvas)] px-5 sm:-mx-7 sm:px-7 lg:mx-0 lg:px-0',
        submittedQuery
          ? 'min-h-[calc(100vh-168px)] pb-[156px] pt-4 sm:pb-[172px] lg:pb-[164px]'
          : 'flex min-h-[calc(100vh-220px)] flex-col pb-12 pt-0 sm:min-h-[calc(100vh-250px)] sm:pb-14 lg:min-h-[calc(100vh-280px)]'
      )}
    >
      <div className="w-full">
        {submittedQuery ? null : (
          <div className="mx-auto flex w-full max-w-[744px] flex-1 flex-col justify-center pb-[12vh] pt-[16vh] sm:pt-[18vh]">
            <h1 className="text-[28px] font-normal leading-[34px] text-[var(--work-agent-ink)] text-balance">
              {agentRespondsInZh ? '想了解 Geli 的哪些作品？' : "Ask Geli's portfolio."}
            </h1>
            {renderAgentInputComposer('center')}
            <p className="mt-4 max-w-[620px] text-sm leading-6 text-[var(--work-agent-muted)]">
              {agentRespondsInZh ? '可以像面试官一样问：Agent 项目、AI UX 方法、项目决策或某项能力的证据。' : 'Ask about agent work, AI UX methods, project decisions, or which cases best prove a skill.'}
            </p>
          </div>
        )}

        {submittedQuery ? (
          <div className="mx-auto w-full max-w-[744px] pb-10 pt-8" lang={agentRespondsInZh ? 'zh-CN' : 'en'}>
            <AgentConversation />
          </div>
        ) : null}
      </div>

      {submittedQuery ? (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-[var(--work-agent-canvas)] via-[var(--work-agent-canvas)]/97 to-transparent px-4 pb-3 pt-10 sm:px-6 sm:pb-4 lg:pb-5">
          <div className="pointer-events-auto mx-auto w-full max-w-[744px]">
            {renderAgentInputComposer('dock')}
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
            <p>{isZh ? '项目来源' : 'project contexts'}</p>
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
            aria-label={`${agentCopy.viewCase}: ${getProjectTitle(project, agentRespondsInZh)}`}
          />
          <div className="grid gap-3 sm:grid-cols-[132px_minmax(0,1fr)]">
            <CoverFrame project={project} idx={idx} isZh={isZh} density="agent" />
            <div className="relative z-20 flex min-w-0 flex-col justify-between py-1 pr-1">
              <div>
                <div className="mb-1.5 flex flex-wrap items-center gap-2 text-[11px] text-white/52">
                  <span className="font-mono tabular-nums">{String(idx + 1).padStart(2, '0')}</span>
                  <span>{project.year}</span>
                  <span className="h-1 w-1 rounded-full bg-white/24" aria-hidden="true" />
                  <span>{getProjectKind(project, agentRespondsInZh)}</span>
                </div>
                <h3 className="font-sans text-lg font-semibold leading-tight text-white text-balance">{getProjectTitle(project, agentRespondsInZh)}</h3>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {chips.map((chip) => (
                    <span key={chip.en} className="border border-white/12 bg-white/6 px-2 py-0.5 text-[10px] font-medium text-white/70">
                      {getLocalized(chip, agentRespondsInZh)}
                    </span>
                  ))}
                </div>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/68">
                  <span className="font-semibold text-white/88">{agentCopy.why}: </span>
                  {getAgentReason(project, agentRespondsInZh)}
                </p>
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-white opacity-80 transition-[opacity,transform] duration-200 ease-out group-hover:translate-x-0.5 group-hover:opacity-100">
                  {agentCopy.viewCase}
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
    <section className="mt-10 rounded-[16px] bg-[var(--work-agent-bg)] p-4 text-white shadow-[var(--work-agent-dark-shadow)] sm:p-6 lg:p-7">
      <div className="grid gap-6 lg:grid-cols-[minmax(300px,0.92fr)_minmax(0,1.08fr)]">
        <div className="min-w-0">
          <div className="mb-5 flex items-start justify-between gap-4 border-b border-white/10 pb-5">
            <div>
              <p className="font-mono text-[11px] text-[#8FA3FF]">{copy.agentKicker}</p>
              <h2 className="mt-3 max-w-xl font-sans text-3xl font-semibold leading-tight text-white text-balance sm:text-4xl">
                {agentCopy.greeting}
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-6 text-white/68 text-pretty">{agentCopy.intro}</p>
            </div>
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#315CFF] text-white shadow-[0_12px_30px_rgba(49,92,255,0.32)] sm:inline-flex">
              <Bot size={19} aria-hidden="true" />
            </span>
          </div>

          <form onSubmit={handleSubmit}>
            <label htmlFor="work-agent-panel-query" className="mb-2 block text-xs font-semibold text-white/76">
              {agentCopy.inputLabel}
            </label>
            <div className="rounded-[12px] bg-[#1C1D22] p-3 shadow-[0_0_0_1px_rgba(255,255,255,0.10)] focus-within:shadow-[0_0_0_2px_rgba(143,163,255,0.70)]">
              <div className="flex items-start gap-3">
                <Search size={18} className="mt-2.5 shrink-0 text-white/52" aria-hidden="true" />
                <textarea
                  id="work-agent-panel-query"
                  name="portfolio-agent-query"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActiveSuggestionId(null);
                  }}
                  placeholder={agentCopy.placeholder}
                  lang={agentRespondsInZh ? 'zh-CN' : 'en'}
                  dir="auto"
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
                    aria-label={agentCopy.clear}
                    title={agentCopy.clear}
                  >
                    <X size={16} aria-hidden="true" />
                  </button>
                ) : null}
              </div>
              <div className="mt-3 flex flex-col gap-2 border-t border-white/8 pt-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="font-mono text-[10px] text-white/64">{agentRespondsInZh ? '本地项目元数据匹配' : copy.localMatch}</span>
                <button
                  type="submit"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-[#315CFF] pl-4 pr-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(49,92,255,0.32)] transition-[background-color,transform,box-shadow] duration-200 ease-out hover:bg-[#5B5CFF] active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#AEBBFF]"
                >
                  {agentCopy.submit}
                  <ArrowRight size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          </form>

          <div className="mt-5">
            <p className="mb-2 text-xs font-semibold text-white/64">{agentCopy.promptLabel}</p>
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
                    {getLocalized(suggestion.label, agentRespondsInZh)}
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
                {submittedQuery ? (agentRespondsInZh ? '匹配项目' : 'MATCHED WORKS') : agentRespondsInZh ? '推荐项目' : 'RECOMMENDED SET'}
              </p>
              <h3 className="mt-1 font-sans text-2xl font-semibold leading-tight text-white text-balance">
                {submittedQuery ? agentCopy.matchedHeading : agentRespondsInZh ? '可以先从这些项目看起' : copy.agentResultsDefault}
              </h3>
            </div>
            <p className="font-mono text-xs text-white/58">
              {scoredMatches.length} {agentRespondsInZh ? '个项目' : scoredMatches.length === 1 ? 'work' : 'works'}
            </p>
          </div>

          {submittedQuery ? (
            <div className="mb-4 rounded-[10px] bg-white/[0.045] px-3 py-2 text-sm leading-6 text-white/66 shadow-[0_0_0_1px_rgba(255,255,255,0.07)]" lang={agentRespondsInZh ? 'zh-CN' : 'en'} dir="auto">
              {agentRespondsInZh ? '需求：' : 'Brief: '}
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
              {agentCopy.noResults}
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
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

        <WorkSubpageNav />
        {viewMode === 'agent' ? renderAgentComposer() : <ArchiveSection />}
      </div>
    </motion.div>
  );
};

export default WorkPage;

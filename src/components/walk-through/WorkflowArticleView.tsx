import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ClipboardCheck,
  GalleryHorizontalEnd,
  Image as ImageIcon,
  Layers3,
  MousePointerClick,
  Sparkles,
  Users,
  Wand2,
} from 'lucide-react';
import { Project } from '../../types';
import { WorkflowArticleContent } from './workflowArticles';
import { assetUrl } from '../../utils/assets';

interface WorkflowArticleViewProps {
  content: WorkflowArticleContent;
  project: Project;
  isZh: boolean;
}

type WorkflowTool = 'batch' | 'board';

const sampleImages = [
  '/AI images/20251010%20Images%20for%20Creator%20Gallery%20-%20Halloween__image16.webp',
  '/AI images/20251211%20Images%20for%20Imagine%20-Christmas__image30.webp',
  '/AI images/20251117%20Images%20for%20Imagine%20-thanksgiving__image23.webp',
  '/AI images/20250829%20Images%20for%20Creator%20Gallery__image31.webp',
  '/AI images/20250826%20Images%20for%20Creator%20Gallery__image42.webp',
  '/AI images/20250820%20Images%20for%20Creator%20Gallery__image12.webp',
];

const evidenceImages = {
  batch: '/Frame.png',
  board: '/Frame-2.png',
};

const sectionTransition = (delay: number) => ({ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] as const });

const WorkflowArticleView: React.FC<WorkflowArticleViewProps> = ({ content, project, isZh }) => {
  const [activeTool, setActiveTool] = useState<WorkflowTool>('batch');

  const labelClass = isZh
    ? 'font-zh-body text-[11px] font-medium tracking-[0.1em] text-[#8C5462]'
    : 'font-mono text-[10px] uppercase tracking-[0.3em] text-[#8C5462]';
  const titleClass = isZh
    ? 'font-zh-display text-[31px] font-medium leading-[1.12] text-[#3B230E] sm:text-[42px]'
    : 'font-serif text-[36px] leading-[1.05] text-[#3B230E] sm:text-[50px]';
  const sectionTitleClass = isZh
    ? 'font-zh-display text-[25px] font-medium leading-[1.2] text-[#3B230E] sm:text-[32px]'
    : 'font-serif text-[30px] leading-[1.1] text-[#3B230E] sm:text-[39px]';
  const bodyClass = isZh
    ? 'font-zh-body text-[15px] leading-[1.84] text-neutral-600 sm:text-[16px]'
    : 'font-sans text-[15px] leading-[1.78] text-neutral-600 sm:text-[16px]';
  const smallClass = isZh
    ? 'font-zh-body text-[13px] leading-[1.72] text-neutral-500'
    : 'font-sans text-[13px] leading-[1.64] text-neutral-500';
  const panelClass = 'rounded-[24px] border border-[#eadcca] bg-white/74 p-5 shadow-[0_18px_46px_rgba(59,35,14,0.065)]';
  const sectionClass = 'rounded-[30px] border border-[#eadcca] bg-white/58 p-5 shadow-[0_20px_50px_rgba(59,35,14,0.06)] sm:p-7';

  const tools = {
    batch: {
      icon: Wand2,
      title: isZh ? '工具 1：批量生图' : 'Tool 1: Batch image generation',
      short: isZh ? '我只做筛选，不再反复点生成。' : 'I screen results instead of repeatedly clicking generate.',
      problem: isZh ? '复杂主题需要很多候选图，一张张生成会把时间消耗在机械操作上。' : 'Complex themes need many candidates; generating one by one wastes time on mechanical operation.',
      input: isZh ? '主题方向、基础 prompt、模型/比例、变体数量。' : 'Theme, base prompt, model/ratio, and variant count.',
      output: isZh ? '一批可以直接进入初筛的候选图。' : 'A batch of candidates ready for first-pass screening.',
      image: evidenceImages.batch,
    },
    board: {
      icon: GalleryHorizontalEnd,
      title: isZh ? '工具 2：批量 3:4 展示板' : 'Tool 2: Batch 3:4 review board',
      short: isZh ? '把文件夹变成别人能快速扫读的视觉板。' : 'Turn a folder into a visual board people can scan quickly.',
      problem: isZh ? '候选图构图和尺寸不统一，其他团队很难判断哪张适合做桌面。' : 'Candidates have inconsistent framing and size, making desktop selection hard for other teams.',
      input: isZh ? '我初筛后的图片和桌面评审目标。' : 'My shortlisted images and the desktop-review target.',
      output: isZh ? '统一 3:4 的 review surface，方便团队快速比较和选择。' : 'A unified 3:4 review surface for fast team comparison and selection.',
      image: evidenceImages.board,
    },
  };

  const activeToolData = tools[activeTool];
  const ActiveIcon = activeToolData.icon;

  const workflowSteps = [
    {
      icon: Sparkles,
      title: isZh ? '定义方向' : 'Define direction',
      body: isZh ? '先定主题、画面标准、比例和筛选标准。' : 'Set theme, visual standard, ratio, and selection criteria.',
    },
    {
      icon: Bot,
      title: isZh ? 'AI 做工具' : 'AI builds tools',
      body: isZh ? '用 AI 把重复操作做成小工具，而不是只让 AI 生图。' : 'Use AI to build small tools, not only generate images.',
    },
    {
      icon: MousePointerClick,
      title: isZh ? '我负责筛选' : 'I screen quality',
      body: isZh ? '时间从点击操作转移到审美判断和质量控制。' : 'Time moves from clicking to taste and quality control.',
    },
    {
      icon: Users,
      title: isZh ? '团队评审' : 'Team review',
      body: isZh ? '统一 3:4 展示，让其他团队快速选桌面图。' : 'A unified 3:4 board helps teams choose desktop images faster.',
    },
  ];

  return (
    <div className="space-y-6 pb-6 text-[#3B230E]">
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={sectionTransition(0.08)}
        className={sectionClass}
      >
        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
          <div>
            <div className={labelClass}>{content.contextLabel}</div>
            <h3 className={`mt-3 ${sectionTitleClass}`}>{content.contextTitle}</h3>
            <p className={`mt-4 ${bodyClass}`}>{content.contextBody}</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {content.painPoints.map((point, index) => (
              <div key={point} className="rounded-[22px] bg-white/76 p-4 shadow-[0_12px_30px_rgba(59,35,14,0.05)]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#8C5462]/10 font-mono text-[11px] text-[#8C5462]">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className={`mt-3 ${smallClass}`}>{point}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={sectionTransition(0.12)}
        className={sectionClass}
      >
        <div className={labelClass}>{content.workflowLabel}</div>
        <h3 className={`mt-3 ${sectionTitleClass}`}>{content.workflowTitle}</h3>

        <div className="mt-6 grid gap-3 lg:grid-cols-4">
          {workflowSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative rounded-[24px] bg-white/76 p-4 shadow-[0_12px_30px_rgba(59,35,14,0.05)]">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#8C5462]/10 text-[#8C5462]">
                    <Icon size={17} />
                  </span>
                  {index < workflowSteps.length - 1 ? <ArrowRight className="hidden text-[#8C5462]/42 lg:block" size={17} /> : null}
                </div>
                <p className="mt-4 text-[15px] font-semibold text-[#3B230E]">{step.title}</p>
                <p className={`mt-2 ${smallClass}`}>{step.body}</p>
              </div>
            );
          })}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={sectionTransition(0.16)}
        className={sectionClass}
      >
        <div className="grid gap-6 xl:grid-cols-[0.42fr_0.58fr]">
          <div>
            <div className={labelClass}>{content.toolsLabel}</div>
            <h3 className={`mt-3 ${sectionTitleClass}`}>{content.toolsTitle}</h3>
            <p className={`mt-4 ${bodyClass}`}>{content.toolsIntro}</p>

            <div className="mt-6 grid gap-3">
              {(Object.keys(tools) as WorkflowTool[]).map((toolId) => {
                const tool = tools[toolId];
                const ToolIcon = tool.icon;
                return (
                  <button
                    key={toolId}
                    type="button"
                    onClick={() => setActiveTool(toolId)}
                    className={`rounded-[22px] p-4 text-left transition ${
                      activeTool === toolId
                        ? 'bg-[#3B230E] text-white shadow-[0_18px_42px_rgba(59,35,14,0.18)]'
                        : 'bg-white/76 text-[#3B230E] shadow-[0_12px_30px_rgba(59,35,14,0.05)] hover:bg-white'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${activeTool === toolId ? 'bg-white/12 text-white' : 'bg-[#8C5462]/10 text-[#8C5462]'}`}>
                        <ToolIcon size={16} />
                      </span>
                      <div>
                        <p className="text-[15px] font-semibold">{tool.title}</p>
                        <p className={`mt-1 text-[13px] leading-6 ${activeTool === toolId ? 'text-white/72' : 'text-neutral-500'}`}>{tool.short}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className={panelClass}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <ActiveIcon size={18} className="text-[#8C5462]" />
                <p className="text-[17px] font-semibold text-[#3B230E]">{activeToolData.title}</p>
              </div>
              <span className="rounded-full bg-[#8C5462]/10 px-3 py-1.5 text-[11px] font-semibold text-[#8C5462]">
                {activeTool === 'batch' ? (isZh ? '生产提效' : 'Production') : (isZh ? '评审提效' : 'Review')}
              </span>
            </div>

            <figure className="mt-4 overflow-hidden rounded-[22px] bg-[#f3eadf] shadow-inner">
              <img src={assetUrl(activeToolData.image)} alt="" className="aspect-[16/9] w-full object-cover object-top" loading="lazy" />
            </figure>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                { label: isZh ? '问题' : 'Problem', text: activeToolData.problem, icon: ImageIcon },
                { label: 'Input', text: activeToolData.input, icon: Layers3 },
                { label: 'Output', text: activeToolData.output, icon: CheckCircle2 },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="rounded-[18px] bg-[#fffaf2] p-4">
                    <Icon size={15} className="text-[#8C5462]" />
                    <p className="mt-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#8C5462]">{item.label}</p>
                    <p className={`mt-2 ${smallClass}`}>{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={sectionTransition(0.2)}
        className="grid gap-5 lg:grid-cols-[1fr_1fr]"
      >
        <div className={sectionClass}>
          <div className={labelClass}>{content.exampleLabel}</div>
          <h3 className={`mt-3 ${sectionTitleClass}`}>{content.exampleTitle}</h3>
          <div className="mt-6 grid gap-4">
            <div className="rounded-[24px] border border-red-100 bg-red-50/60 p-5">
              <p className="text-[17px] font-semibold text-[#3B230E]">{content.beforeTitle}</p>
              <p className={`mt-3 ${bodyClass}`}>{content.beforeBody}</p>
            </div>
            <div className="rounded-[24px] border border-[#8C5462]/16 bg-[#8C5462]/[0.07] p-5">
              <p className="text-[17px] font-semibold text-[#3B230E]">{content.afterTitle}</p>
              <p className={`mt-3 ${bodyClass}`}>{content.afterBody}</p>
            </div>
          </div>
        </div>

        <div className={sectionClass}>
          <div className={labelClass}>{isZh ? '数据验证' : 'Validation'}</div>
          <h3 className={`mt-3 ${sectionTitleClass}`}>
            {isZh ? '提效不是口号，要能被结果证明' : 'Efficiency has to be proven by output'}
          </h3>
          <figure className="mt-5 overflow-hidden rounded-[24px] bg-white shadow-inner">
            <img src={assetUrl(evidenceImages.board)} alt="" className="aspect-[16/9] w-full object-cover" loading="lazy" />
          </figure>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { value: '230 / 429', label: isZh ? '生成图来自我的生产工作' : 'generated images from my production work' },
              { value: '54%+', label: isZh ? '内容贡献被项目验证' : 'content contribution validated' },
            ].map((item) => (
              <div key={item.value} className="rounded-[20px] bg-white/74 p-4 shadow-[0_12px_30px_rgba(59,35,14,0.05)]">
                <p className="text-[25px] font-semibold text-[#8C5462]">{item.value}</p>
                <p className={`mt-1 ${smallClass}`}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={sectionTransition(0.24)}
        className={sectionClass}
      >
        <div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div>
            <div className={labelClass}>{content.principleLabel}</div>
            <h3 className={`mt-3 ${sectionTitleClass}`}>{content.principleTitle}</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {content.principles.map((principle) => (
              <div key={principle} className="flex items-start gap-3 rounded-[20px] bg-white/74 p-4 shadow-[0_12px_30px_rgba(59,35,14,0.05)]">
                <ClipboardCheck size={17} className="mt-1 flex-shrink-0 text-[#8C5462]" />
                <p className={smallClass}>{principle}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={sectionTransition(0.28)}
        className="rounded-[30px] bg-[#3B230E] p-6 text-white shadow-[0_20px_50px_rgba(59,35,14,0.18)] sm:p-7"
      >
        <p className="text-[18px] font-semibold">{content.closingTitle}</p>
        <p className="mt-3 max-w-3xl text-[15px] leading-[1.78] text-white/74 sm:text-[16px]">{content.closingBody}</p>
        <p className="mt-6 text-[10px] uppercase tracking-[0.28em] text-white/28">{project.title}</p>
      </motion.section>
    </div>
  );
};

export default WorkflowArticleView;

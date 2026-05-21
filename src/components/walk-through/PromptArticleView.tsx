import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  CheckCircle2,
  GitCompareArrows,
  Image as ImageIcon,
  ListTree,
  PanelLeftClose,
  PanelLeftOpen,
  Quote,
  Sparkles,
} from 'lucide-react';
import { Project } from '../../types';
import { ExplorationArticleContent } from './explorationArticles';

interface PromptArticleViewProps {
  content: ExplorationArticleContent;
  project: Project;
  isZh: boolean;
}

type ArticleVisual = ExplorationArticleContent['visualizations'][number];

const sectionTransition = (delay: number) => ({ duration: 0.42, delay, ease: [0.22, 1, 0.36, 1] as const });

const modelLogoThemes: Record<string, { cardClass: string; providerClass: string; titleClass: string }> = {
  Gemini: {
    cardClass: 'border-[#d5ddff] bg-[linear-gradient(135deg,#edf4ff_0%,#f8f2ff_100%)]',
    providerClass: 'text-[#556cd6]',
    titleClass: 'text-[#6a7280]',
  },
  OpenAI: {
    cardClass: 'border-[#ddd6c8] bg-[linear-gradient(135deg,#f7f5ef_0%,#ffffff_100%)]',
    providerClass: 'text-[#262626]',
    titleClass: 'text-[#7a7469]',
  },
  Jimeng: {
    cardClass: 'border-[#ecd4c8] bg-[linear-gradient(135deg,#fff2eb_0%,#fffaf6_100%)]',
    providerClass: 'text-[#b76640]',
    titleClass: 'text-[#8d7569]',
  },
  Qwen: {
    cardClass: 'border-[#d8daf6] bg-[linear-gradient(135deg,#f0f2ff_0%,#fbfbff_100%)]',
    providerClass: 'text-[#5662ce]',
    titleClass: 'text-[#747ca0]',
  },
};

const PromptArticleView: React.FC<PromptArticleViewProps> = ({ content, project, isZh }) => {
  const [activeSection, setActiveSection] = useState('prompt-overview');
  const [isOutlineOpen, setIsOutlineOpen] = useState(false);

  const labelClass = isZh
    ? 'font-zh-body text-[11px] font-medium tracking-[0.11em] text-neutral-500'
    : 'font-mono text-[10px] uppercase tracking-[0.3em] text-neutral-500';
  const titleClass = isZh
    ? 'font-zh-display text-[32px] font-medium leading-[1.12] text-dark-brown sm:text-[42px]'
    : 'font-serif text-[38px] leading-[1.04] text-dark-brown sm:text-[52px]';
  const sectionTitleClass = isZh
    ? 'font-zh-display text-[25px] font-medium leading-[1.2] text-dark-brown sm:text-[31px]'
    : 'font-serif text-[30px] leading-[1.1] text-dark-brown sm:text-[38px]';
  const bodyClass = isZh
    ? 'font-zh-body text-[15px] leading-[1.85] text-neutral-600 sm:text-[16px]'
    : 'font-sans text-[15px] leading-[1.78] text-neutral-600 sm:text-[16px]';
  const smallClass = isZh
    ? 'font-zh-body text-[13px] leading-[1.72] text-neutral-500'
    : 'font-sans text-[13px] leading-[1.65] text-neutral-500';
  const promptClass = isZh
    ? 'whitespace-pre-wrap font-zh-body text-[14px] leading-[1.78] text-dark-brown'
    : 'whitespace-pre-wrap font-sans text-[14px] leading-[1.72] text-dark-brown';
  const collapsedOutlineLabelClass = isZh
    ? '[writing-mode:vertical-rl] font-zh-body text-[11px] tracking-[0.12em] text-neutral-400'
    : '[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] uppercase tracking-[0.26em] text-neutral-400';
  const sectionShellClass = 'scroll-mt-8 rounded-[28px] bg-white/[0.42] p-5 shadow-[0_18px_44px_rgba(42,26,10,0.045)] sm:p-7';
  const panelClass = 'rounded-[20px] bg-white/72 p-4 shadow-[0_10px_26px_rgba(42,26,10,0.04)]';

  const outlineItems = useMemo(() => [
    { id: 'prompt-overview', label: isZh ? '核心观点' : 'Core idea' },
    { id: 'prompt-problem', label: isZh ? '问题定义' : 'Problem' },
    { id: 'prompt-logic', label: isZh ? '写作逻辑' : 'Writing logic' },
    { id: 'prompt-stability', label: isZh ? '稳定原则' : 'Stability' },
    { id: 'prompt-examples', label: isZh ? '三种写法' : 'Prompt moves' },
    { id: 'prompt-framework', label: isZh ? '复用框架' : 'Framework' },
    { id: 'prompt-models', label: isZh ? '模型对比' : 'Model scan' },
    { id: 'prompt-sample', label: isZh ? '完整示例' : 'Full example' },
  ], [isZh]);

  useEffect(() => {
    const sections = outlineItems
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: '-18% 0px -62% 0px', threshold: [0.1, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [outlineItems]);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const sectionHeader = (label: string, title: string, intro?: string, takeaway?: string) => (
    <header className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px] lg:items-start">
      <div className="max-w-3xl">
        <div className={labelClass}>{label}</div>
        <h3 className={`mt-3 ${sectionTitleClass}`}>{title}</h3>
        {intro ? <p className={`mt-4 ${bodyClass}`}>{intro}</p> : null}
      </div>
      {takeaway ? (
        <blockquote className="relative rounded-[18px] bg-[#fffaf2]/86 p-4 pl-5 shadow-[0_12px_28px_rgba(42,26,10,0.05)]">
          <span className="absolute left-0 top-4 h-[calc(100%-2rem)] w-1 rounded-full bg-[#8C5462]" />
          <Quote className="text-[#8C5462]/50" size={18} />
          <p className="mt-3 text-[15px] font-semibold leading-relaxed text-[#4A3D33]">{takeaway}</p>
        </blockquote>
      ) : null}
    </header>
  );

  const renderVisual = (visual: ArticleVisual, loading: 'eager' | 'lazy' = 'lazy') => (
    <figure className="prompt-visual">
      <div className="prompt-visual-media relative aspect-[16/9] overflow-hidden rounded-[20px] bg-[#f7efe3] shadow-[0_14px_32px_rgba(42,26,10,0.07)]">
        <img
          src={visual.image}
          alt={visual.alt}
          className="h-full w-full object-cover opacity-100 mix-blend-normal"
          loading={loading}
        />
      </div>
      <figcaption className="mt-3 rounded-[18px] bg-[#fffaf2]/72 p-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#8C5462]" />
          <p className="text-[15px] font-semibold leading-snug text-dark-brown">{visual.title}</p>
        </div>
        <p className={`mt-2 ${smallClass}`}>{visual.body}</p>
      </figcaption>
    </figure>
  );

  const modelLogoImages: Record<string, string> = {
    Gemini: '/logo/nanobanana.jpg',
    OpenAI: '/logo/chatgpt.jpg',
    Jimeng: '/logo/jimeng.jpeg',
    Qwen: '/logo/Qwen.jpeg',
  };

  const renderComparisonLogo = (title: string, provider?: string, image?: string) => {
    const logoSrc = provider ? modelLogoImages[provider] : undefined;
    if (logoSrc || image) {
      return <img src={logoSrc || image} alt={provider || title} className="h-[104px] w-full rounded-[16px] object-cover" loading="lazy" />;
    }

    const theme = modelLogoThemes[provider || ''] || {
      cardClass: 'border-[#dfd0bf] bg-[linear-gradient(135deg,#fffaf2_0%,#fffdf9_100%)]',
      providerClass: 'text-[#3B230E]',
      titleClass: 'text-[#7b6c5f]',
    };

    return (
      <div className={`grid h-[112px] w-full max-w-[144px] place-items-center rounded-[16px] border shadow-[0_10px_24px_rgba(42,26,10,0.04)] sm:h-[104px] sm:max-w-none ${theme.cardClass}`}>
        <div className="px-3 text-center">
          <p className={`text-[18px] font-semibold tracking-[-0.03em] ${theme.providerClass}`}>{provider || title}</p>
          <p className={`mt-1 font-mono text-[10px] uppercase tracking-[0.18em] ${theme.titleClass}`}>{title}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={`prompt-article grid gap-8 pb-8 xl:items-start ${isOutlineOpen ? 'xl:grid-cols-[232px_minmax(0,1fr)]' : 'xl:grid-cols-[56px_minmax(0,1fr)]'}`}>
      <aside className="hidden xl:sticky xl:top-4 xl:block">
        <nav className={`max-h-[calc(100vh-2rem)] overflow-y-auto rounded-[24px] bg-white/48 p-3 shadow-[0_12px_28px_rgba(42,26,10,0.04)] transition-all ${isOutlineOpen ? 'w-[232px]' : 'w-[56px]'}`}>
          <div className={`flex items-center ${isOutlineOpen ? 'justify-between gap-3' : 'justify-center'}`}>
            {isOutlineOpen ? (
              <div className={labelClass}>{isZh ? '页面大纲' : 'Outline'}</div>
            ) : null}
            <button
              type="button"
              onClick={() => setIsOutlineOpen((value) => !value)}
              className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-white/74 text-[#5F4E41] shadow-[0_8px_18px_rgba(42,26,10,0.05)] transition hover:bg-white"
              aria-label={isOutlineOpen ? (isZh ? '收起大纲' : 'Collapse outline') : (isZh ? '展开大纲' : 'Expand outline')}
            >
              {isOutlineOpen ? <PanelLeftClose size={15} /> : <PanelLeftOpen size={15} />}
            </button>
          </div>
          {isOutlineOpen ? (
            <div className="mt-5 grid gap-1">
              {outlineItems.map((item, index) => {
                const isActive = activeSection === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`group grid grid-cols-[30px_minmax(0,1fr)] items-center gap-3 rounded-[12px] px-2 py-2.5 text-left transition ${
                      isActive ? 'bg-white text-dark-brown shadow-[0_8px_20px_rgba(42,26,10,0.06)]' : 'text-neutral-500 hover:bg-white/64 hover:text-dark-brown'
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 items-center justify-center rounded-full font-mono text-[10px] transition ${
                        isActive ? 'bg-dark-brown text-white' : 'bg-[#efe2d1] text-neutral-500 group-hover:bg-[#e7d8c8]'
                      }`}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[13px] leading-tight">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-4 grid justify-center gap-3">
              <ListTree size={18} className="text-[#8C5462]" />
              <span className={collapsedOutlineLabelClass}>
                {isZh ? '大纲' : 'Outline'}
              </span>
            </div>
          )}
        </nav>
      </aside>

      <article className="min-w-0 space-y-8">
        <motion.section
          id="prompt-overview"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={sectionTransition(0.04)}
          className={sectionShellClass}
        >
          <div className="grid gap-8 lg:grid-cols-[1.06fr_0.94fr]">
            <div>
              <div className={labelClass}>{content.heroLabel}</div>
              <h2 className={`mt-4 ${titleClass}`}>{content.heroTitle}</h2>
              <p className={`mt-6 max-w-2xl ${bodyClass}`}>{content.heroBody}</p>
            </div>

            <div className="self-end">
              <div className={labelClass}>{isZh ? '读这页时抓住三件事' : 'Read this page through three points'}</div>
              <div className="mt-5 grid gap-3">
                {content.heroHighlights.map((highlight, index) => (
                  <div key={highlight.title} className={`grid grid-cols-[34px_minmax(0,1fr)] gap-3 rounded-[18px] p-4 ${
                    index === 1 ? 'bg-[#8C5462] text-white shadow-[0_14px_28px_rgba(140,84,98,0.14)]' : 'bg-white/70'
                  }`}>
                    <span className={`mt-0.5 flex h-7 w-7 items-center justify-center rounded-full font-mono text-[11px] ${
                      index === 1 ? 'bg-white/16 text-white' : 'bg-[#8C5462]/12 text-[#8C5462]'
                    }`}>
                      {index + 1}
                    </span>
                    <div>
                      <p className={`text-[15px] font-semibold ${index === 1 ? 'text-white' : 'text-dark-brown'}`}>{highlight.title}</p>
                      <p className={`mt-1 ${index === 1 ? 'text-[13px] leading-[1.72] text-white/72' : smallClass}`}>{highlight.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-7 grid gap-3 md:grid-cols-3">
            {[
              { icon: ImageIcon, value: isZh ? '风格' : 'Style', label: isZh ? '少而准的风格词，作为视觉锚点' : 'fewer style words as visual anchors' },
              { icon: GitCompareArrows, value: isZh ? '构图' : 'Composition', label: isZh ? '用位置、视角和空间关系控制画面' : 'control placement, angle, and hierarchy' },
              { icon: CheckCircle2, value: isZh ? '光线' : 'Lighting', label: isZh ? '把情绪写成方向、光比和色温' : 'translate mood into direction, ratio, and color' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.value} className="flex items-start gap-3 rounded-[18px] bg-white/62 p-4">
                  <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#8C5462]/10 text-[#8C5462]">
                    <Icon size={15} />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-dark-brown">{item.value}</p>
                    <p className={`mt-1 ${smallClass}`}>{item.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          id="prompt-problem"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={sectionTransition(0.08)}
          className={sectionShellClass}
        >
          {sectionHeader(
            content.problemLabel,
            content.problemTitle,
            undefined,
            isZh ? '随机不是模型突然失控，而是 prompt 没有写清楚要控制哪些视觉条件。' : 'Randomness usually means the prompt never named the visual conditions it wanted to control.'
          )}
          <div className="mt-7 grid gap-7 lg:grid-cols-[0.88fr_1.12fr]">
            <ul className="grid gap-3">
              {content.problemPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 rounded-[16px] bg-white/58 p-4">
                  <span className="mt-[9px] h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8C5462]" />
                  <span className={bodyClass}>{point}</span>
                </li>
              ))}
            </ul>

            <div className="grid gap-3 md:grid-cols-2">
              <div className={`${panelClass} border border-[#8C5462]/12`}>
                <div className={labelClass}>{content.genericPromptLabel}</div>
                <p className={`mt-3 ${promptClass}`}>{content.genericPrompt}</p>
                <p className={`mt-4 ${smallClass}`}>{content.genericPromptNote}</p>
              </div>
              <div className={`${panelClass} bg-[#8C5462]/[0.07]`}>
                <div className={labelClass}>{content.structuredPromptLabel}</div>
                <p className={`mt-3 ${promptClass}`}>{content.structuredPrompt}</p>
                <p className={`mt-4 ${smallClass}`}>{content.structuredPromptNote}</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="prompt-logic"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={sectionTransition(0.12)}
          className={sectionShellClass}
        >
          {sectionHeader(
            content.coreIdeaLabel,
            content.coreIdeaTitle,
            undefined,
            isZh ? '把“我想要什么感觉”翻译成“画面里具体发生什么”。' : 'Translate “what it should feel like” into “what visibly happens in the frame.”'
          )}
          <div className="mt-7 grid gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            {renderVisual(content.visualizations[0], 'eager')}
            <div className="grid gap-3">
              {content.coreIdeaStatements.map((statement, index) => (
                <div key={statement} className={`${panelClass} grid grid-cols-[42px_minmax(0,1fr)] gap-3 ${index === 1 ? 'bg-[#8C5462] text-white shadow-[0_14px_28px_rgba(140,84,98,0.14)]' : ''}`}>
                  <span className={`font-mono text-[12px] ${index === 1 ? 'text-white/62' : 'text-neutral-400'}`}>{String(index + 1).padStart(2, '0')}</span>
                  <p className={index === 1 ? 'text-[15px] leading-[1.78] text-white/86 sm:text-[16px]' : bodyClass}>{statement}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="prompt-stability"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={sectionTransition(0.16)}
          className={sectionShellClass}
        >
          {sectionHeader(
            content.principlesLabel,
            content.principlesTitle,
            undefined,
            isZh ? '先锁定主体、构图和光线，再测试风格或模型，才知道变化来自哪里。' : 'Lock subject, composition, and light first; then style or model changes become comparable.'
          )}
          <div className="mt-7 grid gap-7 lg:grid-cols-[0.98fr_1.02fr] lg:items-start">
            {renderVisual(content.principlesVisual)}
            <div className="grid gap-3">
              {content.principles.map((principle, index) => (
                <div key={principle.title} className={`${panelClass} grid gap-3 sm:grid-cols-[44px_minmax(0,1fr)]`}>
                  <span className={`flex h-8 w-8 items-center justify-center rounded-full font-mono text-[11px] ${
                    index % 2 === 0 ? 'bg-[#8C5462]/12 text-[#8C5462]' : 'bg-[#5F4E41]/10 text-[#5F4E41]'
                  }`}>
                    {index + 1}
                  </span>
                  <div>
                    <p className="text-[16px] font-semibold text-dark-brown">{principle.title}</p>
                    {principle.body ? <p className={`mt-1 ${smallClass}`}>{principle.body}</p> : null}
                    <ul className="mt-3 grid gap-2">
                      {principle.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5">
                          <ArrowRight className="mt-1 flex-shrink-0 text-[#8C5462]" size={13} />
                          <span className={smallClass}>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="prompt-examples"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={sectionTransition(0.2)}
          className={sectionShellClass}
        >
          {sectionHeader(
            content.examplesLabel,
            content.examplesTitle,
            undefined,
            isZh ? '好的 prompt 要能在画面里被看见：位置、角度、光线都应该有结果。' : 'A good prompt should become visible: position, angle, and light all need an observable result.'
          )}
          <div className="mt-7 grid gap-7 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
            {renderVisual(content.examplesVisual)}
            <div className="grid gap-3">
              {content.examples.map((example, index) => (
                <div key={example.title} className={panelClass}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[11px] text-neutral-400">{String(index + 1).padStart(2, '0')}</span>
                    <p className="text-[16px] font-semibold text-dark-brown">{example.title}</p>
                  </div>
                  <p className={`mt-3 rounded-[14px] bg-[#fffaf2] p-3 ${promptClass}`}>
                    {example.prompt}
                  </p>
                  <p className={`mt-2 ${smallClass}`}>{example.note}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="prompt-framework"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={sectionTransition(0.24)}
          className={sectionShellClass}
        >
          {sectionHeader(
            content.frameworkLabel,
            content.frameworkTitle,
            content.frameworkIntro,
            isZh ? '模板不是限制创意，而是让每次变化都有可追踪的变量。' : 'The template does not limit creativity; it makes each change traceable.'
          )}
          <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_1fr] lg:items-start">
            {renderVisual(content.frameworkVisual)}
            <div>
              <div className="grid gap-3 sm:auto-rows-fr sm:grid-cols-2">
                {content.frameworkNodes.map((node, index) => (
                  <div key={node.title} className={`${panelClass} h-full`}>
                    <span className="font-mono text-[11px] text-neutral-400">{String(index + 1).padStart(2, '0')}</span>
                    <p className="mt-2 text-[15px] font-semibold text-dark-brown">{node.title}</p>
                    <p className={`mt-1 ${smallClass}`}>{node.body}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[18px] bg-[#8C5462]/[0.075] p-4">
                <div className={labelClass}>{content.frameworkTemplateLabel}</div>
                <p className={`mt-3 ${promptClass}`}>{content.frameworkTemplate}</p>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          id="prompt-models"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={sectionTransition(0.28)}
          className={sectionShellClass}
        >
          {sectionHeader(
            content.comparisonLabel,
            content.comparisonTitle,
            content.comparisonIntro,
            isZh ? '模型对比要看任务匹配度：一致性、对话迭代、编辑精度和文字处理。' : 'Compare models by task fit: consistency, conversational iteration, edit precision, and text handling.'
          )}
          <div className="mt-7 grid gap-4 lg:grid-cols-2 lg:items-stretch">
            <div className="lg:col-span-2">{renderVisual(content.comparisonVisual)}</div>
            {content.comparisons.map((comparison) => (
              <div key={comparison.title} className={`${panelClass} grid h-full gap-4 sm:grid-cols-[104px_minmax(0,1fr)]`}>
                <div className="overflow-hidden rounded-[16px] bg-transparent">
                  {renderComparisonLogo(comparison.title, comparison.logo, comparison.image)}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[16px] font-semibold text-dark-brown">{comparison.title}</p>
                  </div>
                  <p className={`mt-2 ${smallClass}`}>{comparison.body}</p>
                  {comparison.example ? <p className={`mt-2 ${smallClass}`}>{comparison.example}</p> : null}
                  {comparison.strengths ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {comparison.strengths.map((strength) => (
                        <span key={strength} className="rounded-full bg-[#8C5462]/10 px-2.5 py-1 text-[11px] text-[#8C5462]">
                          {strength}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          id="prompt-sample"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={sectionTransition(0.32)}
          className={`${sectionShellClass} pb-7`}
        >
          {sectionHeader(
            content.promptSectionLabel,
            content.promptSectionTitle,
            content.promptSectionIntro,
            isZh ? '完整 prompt 负责定规格，后续 prompt 只负责改变量。' : 'The full prompt sets the spec; follow-up prompts should only change variables.'
          )}
          <div className="mt-7 grid gap-7 lg:grid-cols-[0.96fr_1.04fr] lg:items-start">
            {renderVisual(content.promptVisual)}
            <div className="grid gap-4">
              <div className={panelClass}>
                <div className={labelClass}>{content.englishPromptLabel}</div>
                <p className={`mt-3 ${promptClass}`}>{content.englishPrompt}</p>
              </div>
              <div className={panelClass}>
                <div className={labelClass}>{content.chinesePromptLabel}</div>
                <p className={`mt-3 ${promptClass}`}>{content.chinesePrompt}</p>
              </div>
              <div className="rounded-[18px] bg-[#8C5462]/[0.075] p-4">
                <div className={labelClass}>{content.refinementLabel}</div>
                <p className={`mt-3 ${promptClass}`}>{content.refinementPrompt}</p>
              </div>
              <div className="relative rounded-[18px] bg-[#fffaf2]/86 p-4 pl-5 shadow-[0_12px_28px_rgba(42,26,10,0.05)]">
                <span className="absolute left-0 top-4 h-[calc(100%-2rem)] w-1 rounded-full bg-[#8C5462]" />
                <div className="flex items-center gap-2 text-[#8C5462]">
                  <Sparkles size={15} />
                  <p className="text-[15px] font-semibold text-dark-brown">{isZh ? '最后的落点' : 'Closing take'}</p>
                </div>
                <p className={`mt-2 ${smallClass}`}>{content.closingNote}</p>
              </div>
            </div>
          </div>
          <p className="mt-8 text-[10px] uppercase tracking-[0.28em] text-neutral-400">{project.title}</p>
        </motion.section>
      </article>
    </div>
  );
};

export default PromptArticleView;

import React, { useEffect, useState, useRef } from 'react';
import { Project, CaseSection } from '../types';
import { ArrowRight, ExternalLink, ChevronUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { assetUrl } from '../utils/assets';
import PortfolioReader from './PortfolioReader';
import LanguageToggle from './LanguageToggle';
import NuwaSeriesCaseStudy from './NuwaSeriesCaseStudy';
import RodinDiffusionCaseStudy from './RodinDiffusionCaseStudy';
import LanternHomecomingCaseStudy from './LanternHomecomingCaseStudy';

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

// ======= CaseSection Renderers =======
const CategoryLabel: React.FC<{ category?: string }> = ({ category }) =>
  category ? <span className="text-sm sm:text-base font-serif italic tracking-wide mb-6 block" style={{ color: '#7B61FF' }}>{category}</span> : null;

const SectionLabel: React.FC<{ label?: string }> = ({ label }) =>
  label ? <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest mb-3 block" style={{ color: '#7B61FF' }}>{label}</span> : null;

const SectionWrapper: React.FC<{ children: React.ReactNode; bg?: string; className?: string }> = ({ children, bg = '#F8F8FA', className = '' }) => (
  <div style={{ backgroundColor: bg }} className={className}>
    <div className="max-w-5xl mx-auto px-6 sm:px-8 md:px-12 py-14 sm:py-20">
      {children}
    </div>
  </div>
);

const LiveDemoWindow: React.FC<{ section: CaseSection; isZh: boolean }> = ({ section, isZh }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [isCompactViewport, setIsCompactViewport] = useState(false);
  const fallbackTimerRef = useRef<number | null>(null);
  const demoUrl = section.demoUrl || section.content || '';
  const isNuwaDemo = section.variant === 'infinity';

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 639px)');
    const updateViewportMode = () => setIsCompactViewport(mediaQuery.matches);
    updateViewportMode();

    mediaQuery.addEventListener('change', updateViewportMode);
    return () => mediaQuery.removeEventListener('change', updateViewportMode);
  }, []);

  useEffect(() => {
    if (!demoUrl || isCompactViewport) {
      setIsLoading(false);
      setShowFallback(false);
      return;
    }

    setIsLoading(true);
    setShowFallback(false);

    if (fallbackTimerRef.current) {
      window.clearTimeout(fallbackTimerRef.current);
    }

    fallbackTimerRef.current = window.setTimeout(() => {
      setShowFallback(true);
      setIsLoading(false);
      fallbackTimerRef.current = null;
    }, 9000);

    return () => {
      if (fallbackTimerRef.current) {
        window.clearTimeout(fallbackTimerRef.current);
        fallbackTimerRef.current = null;
      }
    };
  }, [demoUrl, reloadKey, isCompactViewport]);

  const handleIframeLoad = () => {
    if (fallbackTimerRef.current) {
      window.clearTimeout(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
    setIsLoading(false);
    setShowFallback(false);
  };

  const retryIframe = () => {
    setReloadKey((value) => value + 1);
    setShowFallback(false);
    setIsLoading(true);
  };

  return (
    <div className={`overflow-hidden rounded-2xl border shadow-[0_18px_48px_rgba(15,23,42,0.12)] ${isNuwaDemo ? 'border-white/10 bg-[#0B0B0D] shadow-[0_24px_70px_rgba(0,0,0,0.32)]' : 'border-neutral-200 bg-white'}`}>
      <div className={`flex min-h-12 items-center gap-3 border-b px-3 py-2 sm:px-4 ${isNuwaDemo ? 'border-white/10 bg-white/[0.04]' : 'border-neutral-100 bg-neutral-50'}`}>
        <div className="flex flex-shrink-0 items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className={`min-w-0 flex-1 rounded-full border px-3 py-1.5 font-mono text-[11px] ${isNuwaDemo ? 'border-white/10 bg-black/28 text-white/42' : 'border-neutral-200 bg-white text-neutral-500'}`}>
          <span className="block truncate">{demoUrl}</span>
        </div>
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden flex-shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium transition sm:inline-flex ${isNuwaDemo ? 'bg-white text-neutral-950 hover:bg-neutral-200' : 'bg-neutral-900 text-white hover:bg-neutral-700'}`}
            aria-label={isZh ? '在新标签页打开 NUWA Infinity 在线演示' : 'Open NUWA Infinity live demo in a new tab'}
          >
            <ExternalLink size={13} />
            {section.buttonLabel || (isZh ? '打开原始 demo' : 'Open full demo')}
          </a>
        )}
      </div>

      <div className={`relative bg-neutral-950 ${isNuwaDemo ? 'h-[520px] sm:h-[660px] lg:h-[720px]' : 'h-[420px] sm:h-[560px] lg:h-[640px]'}`}>
        {isCompactViewport && (
          <div className="absolute inset-0 bg-neutral-950">
            {section.fallbackImage && (
              <img
                src={assetUrl(section.fallbackImage)}
                alt={section.fallbackAlt || section.title || ''}
                className="h-full w-full object-cover opacity-70"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/10" />
            <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/62 p-4 text-white backdrop-blur-md">
              <p className="text-sm font-semibold">{isZh ? '移动端建议新标签页打开' : 'Best opened in a new tab on mobile'}</p>
              <p className="mt-2 text-xs leading-5 text-white/65">
                {isZh ? '原始 NUWA demo 更适合桌面浏览。这里保留预览图和外部入口，避免窄屏 iframe 影响阅读。' : 'The original NUWA demo is desktop-oriented, so this view keeps a preview and launch path instead of squeezing the live site.'}
              </p>
              {demoUrl && (
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200"
                >
                  <ExternalLink size={14} />
                  {section.buttonLabel || (isZh ? '打开原始 demo' : 'Open full demo')}
                </a>
              )}
            </div>
          </div>
        )}

        {demoUrl && !showFallback && !isCompactViewport && (
          <iframe
            key={reloadKey}
            src={demoUrl}
            title={section.title || (isZh ? 'NUWA Infinity 在线演示' : 'NUWA Infinity live demo')}
            className="h-full w-full border-0"
            loading="lazy"
            onLoad={handleIframeLoad}
            allow="fullscreen; autoplay; clipboard-read; clipboard-write"
            referrerPolicy="no-referrer-when-downgrade"
          />
        )}

        {isLoading && !showFallback && !isCompactViewport && (
          <div className="absolute inset-0 grid place-items-center bg-neutral-950 text-white">
            <div className="text-center">
              <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              <p className="text-sm font-medium">{isZh ? '正在加载在线演示...' : 'Loading live demo...'}</p>
              <p className="mt-2 max-w-xs text-xs leading-5 text-white/45">
                {isZh ? '如果目标网站不允许 iframe 嵌入，将自动显示预览图。' : 'If the target site blocks iframe embedding, a preview fallback will appear.'}
              </p>
            </div>
          </div>
        )}

        {showFallback && !isCompactViewport && (
          <div className="absolute inset-0 bg-neutral-950">
            {section.fallbackImage && (
              <img
                src={assetUrl(section.fallbackImage)}
                alt={section.fallbackAlt || section.title || ''}
                className="h-full w-full object-cover opacity-80"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
            <div className="absolute inset-x-5 bottom-5 rounded-2xl border border-white/10 bg-black/55 p-5 text-white backdrop-blur-md sm:inset-x-auto sm:left-6 sm:max-w-md">
              <p className="text-sm font-semibold">{isZh ? '在线演示可能无法嵌入' : 'The live demo may not be embeddable'}</p>
              <p className="mt-2 text-xs leading-5 text-white/62">
                {isZh ? '原始 demo 托管在外部站点。如果无法在作品集内加载，可以新窗口打开，或观看录屏版交互 walkthrough。' : 'The original demo is hosted externally. If it does not load inside the portfolio, open it in a new tab or watch the recorded walkthrough.'}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {demoUrl && (
                  <a
                    href={demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-neutral-950 transition hover:bg-neutral-200"
                  >
                    <ExternalLink size={14} />
                    {section.buttonLabel || (isZh ? '打开原始 demo' : 'Open full demo')}
                  </a>
                )}
                <button
                  type="button"
                  onClick={retryIframe}
                  className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition hover:bg-white/10 hover:text-white"
                >
                  {isZh ? '重试嵌入' : 'Retry iframe'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className={`border-t px-4 py-3 ${isNuwaDemo ? 'border-white/10 bg-[#0B0B0D]' : 'border-neutral-100 bg-white'}`}>
        <p className={`text-xs leading-5 ${isNuwaDemo ? 'text-white/48' : 'text-neutral-500'}`}>
          {section.caption || (isZh ? '作为证据模块嵌入真实项目，帮助读者验证交互体验，而不是只看静态截图。' : 'Embedded as an evidence module so readers can verify the interaction experience beyond screenshots.')}
        </p>
      </div>
    </div>
  );
};

const getNuwaTheme = (variant?: CaseSection['variant']) => {
  switch (variant) {
    case 'xl':
      return { accent: '#F5C45E', soft: '#FFF4D1', name: 'NUWA XL' };
    case 'drag':
      return { accent: '#FF6A5C', soft: '#FFE3DF', name: 'DragNUWA' };
    case 'infinity':
      return { accent: '#A8BCFF', soft: '#E7ECFF', name: 'NUWA-Infinity' };
    default:
      return { accent: '#8C73FF', soft: '#EEE9FF', name: 'NUWA Series' };
  }
};

const NuwaSectionShell: React.FC<{ section: CaseSection; children: React.ReactNode; wide?: boolean; showContent?: boolean }> = ({ section, children, wide = false, showContent = true }) => {
  const theme = getNuwaTheme(section.variant);

  return (
    <div className="bg-[#070707] text-white">
      <div className={`mx-auto px-6 py-16 sm:px-8 sm:py-24 md:px-12 ${wide ? 'max-w-7xl' : 'max-w-6xl'}`}>
        <div className="mb-10 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              {section.category && (
                <span className="mb-5 block font-serif text-sm italic tracking-wide sm:text-base" style={{ color: theme.accent }}>
                  {section.category}
                </span>
              )}
              <h3 className="text-2xl font-bold leading-tight sm:text-4xl">{section.title}</h3>
              {section.subtitle && <p className="mt-4 text-sm leading-7 text-white/58 sm:text-base">{section.subtitle}</p>}
              {showContent && section.content && <p className="mt-6 text-base leading-8 text-white/72">{section.content}</p>}
            </div>
            {section.label && (
              <span className="font-mono text-xs uppercase tracking-[0.24em] text-white/28 lg:pt-2">
                {section.label}
              </span>
            )}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

const NuwaCallouts: React.FC<{ section: CaseSection; accent: string }> = ({ section, accent }) => {
  if (!section.annotations?.length) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
      {section.annotations.map((annotation, index) => {
        const color = annotation.color || accent;
        const x = annotation.x ?? 50;
        const y = annotation.y;
        const isRight = annotation.side === 'right';

        return (
          <button
            key={`${annotation.label}-${index}`}
            type="button"
            className="group pointer-events-auto absolute max-w-[220px] text-left outline-none"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: isRight ? 'translate(16px, -50%)' : 'translate(calc(-100% - 16px), -50%)',
            }}
            aria-label={`${annotation.label}${annotation.detail ? `: ${annotation.detail}` : ''}`}
          >
            <span
              className={`absolute top-1/2 h-3 w-3 -translate-y-1/2 rounded-full ring-4 ring-black/40 transition duration-200 group-hover:scale-150 group-focus-visible:scale-150 ${isRight ? '-left-5' : '-right-5'}`}
              style={{ backgroundColor: color }}
            />
            <div
              className="rounded-xl border bg-black/72 px-3 py-2 text-white shadow-[0_18px_48px_rgba(0,0,0,0.36)] backdrop-blur-md transition duration-200 group-hover:-translate-y-0.5 group-hover:bg-black/88 group-focus-visible:-translate-y-0.5 group-focus-visible:bg-black/88 group-focus-visible:ring-2"
              style={{
                borderColor: `${color}90`,
                boxShadow: `0 18px 48px rgba(0,0,0,0.36), 0 0 0 0 rgba(0,0,0,0)`,
              }}
            >
              <span className="block text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color }}>{annotation.label}</span>
              {annotation.detail && <span className="mt-1 block text-xs leading-5 text-white/68">{annotation.detail}</span>}
            </div>
          </button>
        );
      })}
    </div>
  );
};

const NuwaPins: React.FC<{ section: CaseSection; accent: string }> = ({ section, accent }) => {
  if (!section.annotations?.length) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
      {section.annotations.slice(0, 3).map((annotation, index) => {
        const color = annotation.color || accent;
        return (
          <span
            key={`${annotation.label}-${index}`}
            className="absolute grid h-7 w-7 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-black/70 text-xs font-bold text-white shadow-[0_10px_28px_rgba(0,0,0,0.38)] ring-4 ring-black/25"
            style={{ left: `${annotation.x ?? 50}%`, top: `${annotation.y}%`, boxShadow: `0 0 0 1px ${color}66, 0 10px 28px rgba(0,0,0,0.38)` }}
          >
            {index + 1}
          </span>
        );
      })}
    </div>
  );
};

const NuwaCalloutRail: React.FC<{ section: CaseSection; accent: string; isZh: boolean }> = ({ section, accent, isZh }) => {
  if (!section.annotations?.length) return null;

  return (
    <div className="border-t border-white/10 bg-[#111113] p-4 lg:border-l lg:border-t-0">
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/38">
        {isZh ? '看图顺序' : 'Screen notes'}
      </p>
      <div className="space-y-3">
        {section.annotations.slice(0, 3).map((annotation, index) => {
          const color = annotation.color || accent;
          return (
            <div key={`${annotation.label}-rail-${index}`} className="grid grid-cols-[28px_minmax(0,1fr)] gap-3">
              <span className="grid h-6 w-6 place-items-center rounded-full text-xs font-bold text-neutral-950" style={{ backgroundColor: color }}>
                {index + 1}
              </span>
              <div>
                <p className="text-xs font-semibold text-white">{annotation.label}</p>
                {annotation.detail && <p className="mt-1 text-xs leading-5 text-white/54">{annotation.detail}</p>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const NuwaEvidenceVisual: React.FC<{ section: CaseSection; isZh: boolean }> = ({ section, isZh }) => {
  const theme = getNuwaTheme(section.variant);
  const isInfinity = section.variant === 'infinity' && section.demoUrl;
  const sourceImage = section.fallbackImage ? assetUrl(section.fallbackImage) : '';
  const sourceLabel = section.variant === 'xl'
    ? 'microsoft.com/research/articles/nuwa-xl'
    : section.variant === 'drag'
      ? 'microsoft.com/research/project/dragnuwa'
      : 'nuwa-infinity.microsoft.com/#/NUWAInfinity';

  if (isInfinity) {
    return <LiveDemoWindow section={section} isZh={isZh} />;
  }

  const renderInfinityFrame = (children: React.ReactNode) => (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0D] shadow-[0_24px_70px_rgba(0,0,0,0.32)]">
      <div className="flex min-h-12 items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="min-w-0 flex-1 rounded-full border border-white/10 bg-black/28 px-3 py-1.5 font-mono text-[11px] text-white/42">
          <span className="block truncate">{sourceLabel}</span>
        </div>
      </div>
      <div className="grid lg:grid-cols-[minmax(0,1fr)_270px]">
        <div className="relative">
          {children}
          <NuwaPins section={section} accent={theme.accent} />
        </div>
        <NuwaCalloutRail section={section} accent={theme.accent} isZh={isZh} />
      </div>
      {section.caption && (
        <div className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-white/48">{section.caption}</div>
      )}
    </div>
  );

  const renderInfinityScreenshotVisual = () => renderInfinityFrame(
    <div className="relative aspect-[16/10] overflow-hidden bg-[#050505]">
      {sourceImage && (
        <img
          src={sourceImage}
          alt={section.fallbackAlt || ''}
          className="absolute inset-0 h-full w-full object-contain"
        />
      )}
    </div>
  );

  const renderInfinityCanvasVisual = () => renderInfinityFrame(
    <div className="relative h-[360px] overflow-hidden bg-[#050505] sm:h-[460px]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_22%,rgba(168,188,255,0.18),transparent_34%),linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:100%_100%,64px_64px,64px_64px]" />
      <div className="absolute left-[7%] top-[16%] h-[58%] w-[40%] overflow-hidden rounded-xl border border-white/40 bg-white/8 shadow-[0_24px_64px_rgba(0,0,0,0.38)]">
        {sourceImage && <img src={sourceImage} alt="" className="h-full w-full object-cover opacity-82" />}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(0,0,0,0.68)_100%)]" />
        <span className="absolute bottom-3 left-3 rounded-full bg-black/62 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/70">
          {isZh ? '原始画面边界' : 'Original frame'}
        </span>
      </div>
      <div className="absolute left-[47%] top-[16%] h-[58%] w-[40%] overflow-hidden rounded-xl border border-dashed bg-[#10121A]/70 shadow-[0_24px_64px_rgba(0,0,0,0.25)]" style={{ borderColor: `${theme.accent}CC` }}>
        {sourceImage && <img src={sourceImage} alt="" className="h-full w-full object-cover opacity-28 mix-blend-screen" />}
        <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${theme.accent}1F, rgba(0,0,0,0.18))` }} />
        <span className="absolute bottom-3 left-3 rounded-full border bg-black/62 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/72" style={{ borderColor: `${theme.accent}66` }}>
          {isZh ? '模型继续生成区域' : 'Generated continuation'}
        </span>
      </div>
      <div className="absolute left-[46.8%] top-[16%] h-[58%] w-px" style={{ backgroundColor: `${theme.accent}DD` }} />
      <svg className="absolute left-[39%] top-[36%] h-24 w-48" viewBox="0 0 190 96" aria-hidden="true">
        <path d="M12 48 C 64 8, 118 88, 174 42" fill="none" stroke={theme.accent} strokeWidth="3" strokeLinecap="round" strokeDasharray="7 9" />
        <path d="M162 32 L176 42 L160 52" fill="none" stroke={theme.accent} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-3 text-xs text-white/64">
        <span>{isZh ? '1. 从已生成画面开始' : '1. Start from the generated image'}</span>
        <span>{isZh ? '2. 标出边界可继续向外' : '2. Make the expandable edge visible'}</span>
        <span>{isZh ? '3. 预览边界外的新内容' : '3. Preview what appears beyond it'}</span>
      </div>
    </div>
  );

  const renderInfinityPreviewVisual = () => renderInfinityFrame(
    <div className="relative h-[360px] overflow-hidden bg-[#050505] sm:h-[460px]">
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[length:72px_100%]" />
      <div className="absolute left-5 right-5 top-6 flex items-center gap-2 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] uppercase tracking-[0.16em] text-white/55">
        <span>{isZh ? 'Prompt' : 'Prompt'}</span>
        <ArrowRight size={13} />
        <span>{isZh ? '生成' : 'Generate'}</span>
        <ArrowRight size={13} />
        <span>{isZh ? '扩展' : 'Expand'}</span>
        <ArrowRight size={13} />
        <span style={{ color: theme.accent }}>{isZh ? '预览选择' : 'Preview & select'}</span>
      </div>
      <div className="absolute left-5 right-5 top-[84px] grid grid-cols-3 gap-3">
        {[
          isZh ? '原始结果' : 'Original result',
          isZh ? '扩展候选 A' : 'Expanded option A',
          isZh ? '扩展候选 B' : 'Expanded option B'
        ].map((label, index) => (
          <div key={label} className={`relative aspect-[4/3] overflow-hidden rounded-xl border bg-white/8 ${index === 1 ? 'border-[color:var(--nuwa-accent)]' : 'border-white/12'}`} style={{ ['--nuwa-accent' as string]: theme.accent }}>
            {sourceImage && <img src={sourceImage} alt="" className="h-full w-full object-cover opacity-55" style={{ objectPosition: `${48 + index * 10}% center` }} />}
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_42%,rgba(0,0,0,0.78)_100%)]" />
            <span className="absolute bottom-2 left-2 right-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/72">{label}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-5 right-5 overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
        <div className="grid grid-cols-2 divide-x divide-white/10">
          <div className="p-4">
            <span className="text-[10px] uppercase tracking-[0.18em] text-white/38">{isZh ? 'Before' : 'Before'}</span>
            <p className="mt-2 text-sm text-white/72">{isZh ? '只看到原始生成边界内的内容' : 'Only the generated content inside the first frame is visible.'}</p>
          </div>
          <div className="p-4">
            <span className="text-[10px] uppercase tracking-[0.18em]" style={{ color: theme.accent }}>{isZh ? 'After' : 'After'}</span>
            <p className="mt-2 text-sm text-white/72">{isZh ? '用户能比较边界外新增内容，再决定是否继续探索' : 'The visitor can compare new outer content before continuing.'}</p>
          </div>
        </div>
      </div>
    </div>
  );

  if (section.variant === 'infinity') {
    if (section.layout === 'immersive') return renderInfinityCanvasVisual();
    if (section.layout === 'contained') return renderInfinityPreviewVisual();
    return renderInfinityScreenshotVisual();
  }

  if (section.fallbackImage) {
    return renderInfinityScreenshotVisual();
  }

  const renderXlVisual = () => (
    <div className="relative h-[360px] overflow-hidden bg-[#070707] sm:h-[440px]">
      {section.fallbackImage && (
        <img src={assetUrl(section.fallbackImage)} alt={section.fallbackAlt || ''} className="absolute inset-0 h-full w-full object-cover opacity-28" />
      )}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:56px_100%]" />
      <div className="absolute left-5 right-5 top-8">
        <div className="mb-4 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-white/45">
          <span>{isZh ? '稀疏关键帧' : 'Sparse keyframes'}</span>
          <span>{isZh ? '完整长视频' : 'Dense long video'}</span>
        </div>
        <div className="grid grid-cols-8 gap-2 sm:grid-cols-12">
          {Array.from({ length: 24 }).map((_, index) => {
            const isKeyFrame = index % 5 === 0 || index === 23;
            return (
              <div key={index} className={`aspect-[9/12] rounded border ${isKeyFrame ? 'border-white/70 bg-white/16' : 'border-white/10 bg-white/7'}`}>
                <div className="h-full w-full rounded-sm" style={{ backgroundColor: isKeyFrame ? `${theme.accent}26` : 'rgba(255,255,255,0.04)' }} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-8 left-5 right-5">
        <div className="mb-4 h-1 rounded-full bg-white/10">
          <div className="h-full w-[74%] rounded-full" style={{ backgroundColor: theme.accent }} />
        </div>
        <div className="grid grid-cols-3 gap-3 text-xs text-white/70">
          <span>{isZh ? '全局扩散生成故事骨架' : 'Global diffusion creates the story spine'}</span>
          <span>{isZh ? '局部扩散补齐中间帧' : 'Local diffusion fills intermediate frames'}</span>
          <span>{isZh ? '并行生成降低等待感' : 'Parallel generation reduces perceived waiting'}</span>
        </div>
      </div>
    </div>
  );

  const renderDragVisual = () => (
    <div className="relative h-[360px] overflow-hidden bg-[#070707] sm:h-[440px]">
      {section.fallbackImage && (
        <img src={assetUrl(section.fallbackImage)} alt={section.fallbackAlt || ''} className="absolute inset-0 h-full w-full object-cover opacity-32" />
      )}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute left-5 right-5 top-5 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.18em] text-white/65">
        <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5">Text</span>
        <span className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5">Image</span>
        <span className="rounded-full border px-3 py-1.5" style={{ borderColor: `${theme.accent}80`, color: theme.accent }}>Trajectory</span>
      </div>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 640 440" role="img" aria-label={isZh ? '拖拽轨迹控制视频运动的示意图' : 'Trajectory control visual for generated motion'}>
        <path d="M116 292 C 202 188, 276 326, 376 210 S 494 148, 552 226" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="18" strokeLinecap="round" />
        <path d="M116 292 C 202 188, 276 326, 376 210 S 494 148, 552 226" fill="none" stroke={theme.accent} strokeWidth="4" strokeLinecap="round" strokeDasharray="8 10" />
        <circle cx="116" cy="292" r="12" fill="#fff" />
        <circle cx="552" cy="226" r="14" fill={theme.accent} />
        <path d="M538 212 L552 226 L532 231" fill="none" stroke="#050505" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="absolute bottom-5 left-5 right-5 grid grid-cols-1 gap-3 text-xs text-white/70 sm:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/8 p-3">
          <span className="block font-semibold text-white">{isZh ? '语义' : 'Semantic'}</span>
          <span>{isZh ? '文字描述意图' : 'Text describes intent'}</span>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/8 p-3">
          <span className="block font-semibold text-white">{isZh ? '空间' : 'Spatial'}</span>
          <span>{isZh ? '图像提供场景' : 'Image anchors the scene'}</span>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/8 p-3">
          <span className="block font-semibold text-white">{isZh ? '时间' : 'Temporal'}</span>
          <span>{isZh ? '轨迹表达运动' : 'Trajectory directs motion'}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B0B0D] shadow-[0_24px_70px_rgba(0,0,0,0.32)]">
      <div className="flex min-h-12 items-center gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="min-w-0 flex-1 font-mono text-[11px] text-white/45">{theme.name} / interaction evidence</div>
        {section.demoUrl && (
          <a href={section.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-neutral-950 transition hover:bg-neutral-200">
            <ExternalLink size={13} />
            {section.buttonLabel || (isZh ? '打开来源' : 'Open source')}
          </a>
        )}
      </div>
      <div className="relative">
        {section.variant === 'drag' ? renderDragVisual() : renderXlVisual()}
        <NuwaCallouts section={section} accent={theme.accent} />
      </div>
      {section.caption && (
        <div className="border-t border-white/10 px-4 py-3 text-xs leading-5 text-white/48">{section.caption}</div>
      )}
    </div>
  );
};

const SeriesTimelineSection: React.FC<{ section: CaseSection; isZh: boolean }> = ({ section, isZh }) => (
  <div className="bg-[#070707] text-white">
    <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-24 md:px-12">
      <CategoryLabel category={section.category} />
      <SectionLabel label={section.label} />
      <div className="max-w-3xl">
        <h3 className="text-2xl font-bold leading-tight sm:text-4xl">{section.title}</h3>
        {section.subtitle && <p className="mt-4 text-sm leading-7 text-white/58 sm:text-base">{section.subtitle}</p>}
      </div>
      {section.items && (
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {section.items.map((item, index) => {
            const variant = index === 0 ? 'infinity' : index === 1 ? 'xl' : 'drag';
            const theme = getNuwaTheme(variant);
            return (
              <div key={item.title} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                <div className="mb-8 flex items-center justify-between">
                  <span className="font-mono text-xs text-white/42">{item.number || `0${index + 1}`}</span>
                  <span className="h-2 w-16 rounded-full" style={{ backgroundColor: theme.accent }} />
                </div>
                <h4 className="text-xl font-semibold">{item.title}</h4>
                {item.subtitle && <p className="mt-2 text-sm font-medium" style={{ color: theme.accent }}>{item.subtitle}</p>}
                <p className="mt-5 text-sm leading-6 text-white/58">{item.description}</p>
              </div>
            );
          })}
        </div>
      )}
      {section.content && <p className="mt-10 max-w-3xl text-sm leading-7 text-white/52">{section.content}</p>}
    </div>
  </div>
);

const EvidenceSection: React.FC<{ section: CaseSection; isZh: boolean }> = ({ section, isZh }) => {
  const theme = getNuwaTheme(section.variant);
  return (
    <div id={section.label === '02' ? 'nuwa-walkthrough' : undefined} className="bg-[#070707] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:px-8 sm:py-24 md:px-12 lg:grid-cols-[0.92fr_1.18fr]">
        <div>
          <div className="border-t border-white/10 pt-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              {section.category && (
                <span className="font-serif text-sm italic tracking-wide sm:text-base" style={{ color: theme.accent }}>
                  {section.category}
                </span>
              )}
              {section.label && <span className="font-mono text-xs uppercase tracking-[0.24em] text-white/28">{section.label}</span>}
            </div>
            <h3 className="text-2xl font-bold leading-tight sm:text-4xl">{section.title}</h3>
            {section.subtitle && <p className="mt-4 text-sm leading-7 text-white/58 sm:text-base">{section.subtitle}</p>}
            {section.content && <p className="mt-6 text-base leading-8 text-white/72">{section.content}</p>}
          </div>

          {section.items && (
            <div className="mt-8 grid grid-cols-1 gap-3">
              {section.items.map((item, index) => (
                <div key={`${item.title}-${index}`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-neutral-950" style={{ backgroundColor: theme.accent }}>
                      {item.number || index + 1}
                    </span>
                    <div>
                      {item.subtitle && <span className="block text-[10px] font-mono uppercase tracking-[0.18em] text-white/38">{item.subtitle}</span>}
                      <span className="block text-sm font-semibold text-white">{item.title}</span>
                    </div>
                  </div>
                  <p className="text-sm leading-6 text-white/60">{item.description}</p>
                </div>
              ))}
            </div>
          )}

          {section.rows && (
            <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
              <div className="border-b border-white/10 bg-white/[0.04] px-5 py-4">
                <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/55">
                  {isZh ? '关键交互拆解' : 'Key interaction breakdown'}
                </span>
              </div>
              <div className="grid grid-cols-1 divide-y divide-white/10 md:grid-cols-3 md:divide-x md:divide-y-0">
                {section.rows.map((row, index) => (
                  <div key={`${row.action}-${index}`} className="bg-white/[0.03] p-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: theme.accent }}>{row.action}</span>
                    <p className="mt-3 text-sm font-semibold text-white">{row.feedback}</p>
                    <p className="mt-3 text-xs leading-5 text-white/52">{row.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-8 lg:self-start">
          <NuwaEvidenceVisual section={section} isZh={isZh} />
        </div>
      </div>
    </div>
  );
};

const LiveDemoShowcaseSection: React.FC<{ section: CaseSection; isZh: boolean }> = ({ section, isZh }) => {
  const theme = getNuwaTheme(section.variant);

  return (
    <div className="bg-[#070707] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-24 md:px-12">
        <div className="border-t border-white/10 pt-8">
          {section.category && (
            <span className="mb-5 block font-serif text-sm italic tracking-wide sm:text-base" style={{ color: theme.accent }}>
              {section.category}
            </span>
          )}
          <div className="grid gap-8 lg:grid-cols-[0.28fr_0.72fr] lg:items-start">
            <div className="lg:sticky lg:top-8">
              <h3 className="text-3xl font-bold leading-tight sm:text-5xl">{section.title}</h3>
              {section.subtitle && <p className="mt-5 text-sm leading-7 text-white/62 sm:text-base">{section.subtitle}</p>}
              {section.content && <p className="mt-5 text-sm leading-7 text-white/72 sm:text-base">{section.content}</p>}
              {section.items && (
                <div className="mt-7 rounded-2xl border border-white/10 bg-white/[0.04] p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: theme.accent }}>
                    {isZh ? '你可以这样看' : 'Try this'}
                  </p>
                  <ol className="mt-4 space-y-3">
                    {section.items.map((item, index) => (
                      <li key={item.title} className="grid grid-cols-[26px_minmax(0,1fr)] gap-3 text-sm leading-6 text-white/72">
                        <span className="grid h-6 w-6 place-items-center rounded-full text-xs font-bold text-neutral-950" style={{ backgroundColor: theme.accent }}>
                          {index + 1}
                        </span>
                        <span>{item.title}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
            <LiveDemoWindow section={section} isZh={isZh} />
          </div>
        </div>
      </div>
    </div>
  );
};

const collectReaderPages = (project: Project, language: 'en' | 'zh') => {
  const localizedSlides = project.slideSets?.[language] || project.slideSets?.zh || project.slideSets?.en;
  const directPages = localizedSlides || project.slides || project.gallery;

  if (directPages && directPages.length > 0) {
    return Array.from(new Set(directPages));
  }

  return [];
};

const CaseSectionRenderer: React.FC<{ section: CaseSection; isZh: boolean }> = ({ section, isZh }) => {
  switch (section.type) {
    case 'hero':
      if (section.variant === 'series') {
        return (
          <div className="relative min-h-[620px] overflow-hidden bg-[#050505] text-white">
            {section.bgImage && <img src={assetUrl(section.bgImage)} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.58]" />}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[length:120px_120px]" />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.82)_0%,rgba(5,5,5,0.52)_48%,rgba(5,5,5,0.18)_100%),linear-gradient(180deg,rgba(5,5,5,0.08)_0%,rgba(5,5,5,0.78)_88%)]" />
            <div className="relative z-10 mx-auto flex min-h-[620px] max-w-6xl flex-col justify-end px-6 pb-16 pt-36 sm:px-8 md:px-12">
              <span className="mb-6 font-serif text-sm italic tracking-wide text-white/58">
                {section.title?.includes('NUWA-Infinity') ? (isZh ? 'NUWA-Infinity 案例研究' : 'NUWA-INFINITY CASE STUDY') : (isZh ? 'NUWA 系列案例研究' : 'NUWA SERIES CASE STUDY')}
              </span>
              {section.tags && (
                <div className="mb-6 flex flex-wrap gap-2">
                  {section.tags.map((t, i) => <span key={i} className="rounded-full border border-white/20 bg-black/18 px-4 py-1.5 text-xs text-white/82 backdrop-blur-sm">{t}</span>)}
                </div>
              )}
              <h1 className={`max-w-4xl font-serif text-white ${isZh ? 'text-[2.08rem] leading-[1.08] sm:text-5xl md:text-6xl' : 'text-4xl leading-[0.98] sm:text-6xl md:text-7xl'}`}>{section.title}</h1>
              {section.subtitle && <p className="mt-6 max-w-3xl text-base leading-8 text-white/72 sm:text-xl">{section.subtitle}</p>}
              {section.content && <p className="mt-5 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">{section.content}</p>}
              {section.demoUrl && (
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={section.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-neutral-950 transition hover:bg-neutral-200"
                  >
                    <ExternalLink size={16} />
                    {section.buttonLabel || (isZh ? '打开原始 demo' : 'Try the original demo')}
                  </a>
                  <a
                    href="#nuwa-walkthrough"
                    className="inline-flex items-center gap-2 rounded-full border border-white/22 bg-black/28 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                  >
                    <ArrowRight size={16} />
                    {isZh ? '查看交互 walkthrough' : 'View interaction walkthrough'}
                  </a>
                </div>
              )}
              <div className="mt-8 flex flex-wrap gap-5 text-xs uppercase tracking-[0.18em] text-white/45">
                {section.date && <span>{section.date}</span>}
                {section.role && <span>{section.role}</span>}
              </div>
            </div>
          </div>
        );
      }
      return (
        <div className="relative w-full overflow-hidden" style={{ minHeight: '480px' }}>
          {section.bgImage && <img src={assetUrl(section.bgImage)} alt="" className="absolute inset-0 w-full h-full object-cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col justify-end h-full pb-14 pt-40">
            <span className="text-sm font-serif italic tracking-wide text-white/60 mb-6">PROJECT OVERVIEW</span>
            {section.tags && (
              <div className="flex flex-wrap gap-2 mb-5">
                {section.tags.map((t, i) => <span key={i} className="text-xs px-4 py-1.5 rounded-full border border-white/30 text-white/90 backdrop-blur-sm">{t}</span>)}
              </div>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white mb-3 leading-tight">{section.title}</h1>
            {section.subtitle && <p className="text-lg sm:text-xl text-white/80 mb-5 italic">{section.subtitle}</p>}
            <div className="flex flex-wrap gap-6 text-sm text-white/60 mt-2">
              {section.date && <span>{isZh ? '项目时间：' : 'Duration: '}{section.date}</span>}
              {section.role && <span>{isZh ? '项目角色：' : 'Role: '}{section.role}</span>}
            </div>
          </div>
        </div>
      );

    case 'stats':
      if (section.variant === 'series') {
        return (
          <NuwaSectionShell section={section}>
            {section.stats && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {section.stats.map((s, i) => {
                  const theme = getNuwaTheme(i === 0 ? 'infinity' : i === 1 ? 'xl' : i === 2 ? 'drag' : 'series');
                  return (
                    <div key={i} className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                      <div className="absolute inset-x-0 top-0 h-1" style={{ backgroundColor: theme.accent }} />
                      <span className="block font-serif text-4xl text-white sm:text-5xl">{s.value}</span>
                      <span className="mt-4 block text-sm leading-6 text-white/58">{s.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </NuwaSectionShell>
        );
      }
      return (
        <SectionWrapper bg="#ffffff">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">{section.title}</h3>
          {section.subtitle && <p className="text-base text-neutral-500 mb-6">{section.subtitle}</p>}
          {section.content && <p className="text-neutral-600 leading-relaxed text-base sm:text-lg mb-10 max-w-3xl">{section.content}</p>}
          {section.stats && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {section.stats.map((s, i) => (
                <div key={i} className="rounded-2xl p-8 border" style={{ backgroundColor: '#F0EDFF', borderColor: '#E0DBFF' }}>
                  <span className="text-4xl sm:text-5xl font-serif block mb-2" style={{ color: '#7B61FF' }}>{s.value}</span>
                  <span className="text-sm text-neutral-500 leading-relaxed">{s.label}</span>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'personas':
      return (
        <SectionWrapper bg="#F8F8FA">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-8">{section.title}</h3>
          {section.items && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {section.items.map((p, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 shadow-sm overflow-hidden relative">
                  {p.color && <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: p.color }} />}
                  <div className="flex items-center gap-4 mb-4 mt-1">
                    <span className="text-4xl">{p.icon}</span>
                    <div>
                      <span className="text-lg font-semibold text-neutral-900 block">{p.title}</span>
                      {p.subtitle && <span className="text-sm text-neutral-400">{p.subtitle}</span>}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">{p.description}</p>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'flow':
      return (
        <SectionWrapper bg="#ffffff">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.content && <p className="text-neutral-600 leading-relaxed mb-10 max-w-3xl">{section.content}</p>}
          {section.steps && (
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6">
              {section.steps.map((s, i) => (
                <React.Fragment key={i}>
                  <div className="rounded-xl px-6 py-4 text-sm font-medium text-neutral-700 border" style={{ backgroundColor: '#F0EDFF', borderColor: '#E0DBFF' }}>{s.label}</div>
                  {i < section.steps!.length - 1 && <ArrowRight size={18} className="flex-shrink-0" style={{ color: '#7B61FF' }} />}
                </React.Fragment>
              ))}
            </div>
          )}
          {section.subtitle && <p className="text-center text-sm font-mono tracking-wider" style={{ color: '#7B61FF' }}>{section.subtitle}</p>}
          {section.image && (
            <div className="rounded-2xl overflow-hidden shadow-md mt-10">
              <img src={assetUrl(section.image)} alt="" className="w-full h-auto block" />
            </div>
          )}
        </SectionWrapper>
      );

    case 'cards':
      if (section.variant === 'series') {
        return (
          <NuwaSectionShell section={section}>
            {section.items && (
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                {section.items.map((c, i) => {
                  const theme = getNuwaTheme(i % 3 === 0 ? 'infinity' : i % 3 === 1 ? 'xl' : 'drag');
                  return (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                      <div className="mb-5 h-2 w-16 rounded-full" style={{ backgroundColor: theme.accent }} />
                      <span className="block text-lg font-semibold text-white">{c.title}</span>
                      <span className="mt-4 block text-sm leading-7 text-white/58">{c.description}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </NuwaSectionShell>
        );
      }
      return (
        <SectionWrapper bg="#F8F8FA">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-8">{section.title}</h3>
          {section.content && <p className="text-neutral-600 leading-relaxed mb-8 max-w-3xl">{section.content}</p>}
          {section.items && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {section.items.map((c, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="flex gap-4">
                    {c.icon && <span className="text-3xl flex-shrink-0">{c.icon}</span>}
                    <div>
                      <span className="text-base font-semibold text-neutral-900 block mb-2">{c.title}</span>
                      <span className="text-sm text-neutral-500 leading-relaxed block">{c.description}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'principles':
      return (
        <SectionWrapper bg="#ffffff">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-8">{section.title}</h3>
          {section.items && (
            <div className="space-y-5">
              {section.items.map((p, i) => (
                <div key={i} className="rounded-2xl p-7 border" style={{ backgroundColor: '#FAFAFF', borderColor: '#EEEAFF' }}>
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0" style={{ backgroundColor: '#7B61FF' }}>{p.number || i + 1}</span>
                    <div>
                      <span className="text-lg font-semibold text-neutral-900">{p.title}</span>
                      {p.subtitle && <span className="text-sm ml-3" style={{ color: '#7B61FF' }}>{p.subtitle}</span>}
                    </div>
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed ml-12">{p.description}</p>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'two-column':
      return (
        <SectionWrapper bg="#F8F8FA">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.subtitle && <p className="text-neutral-500 text-sm leading-relaxed mb-10 max-w-3xl">{section.subtitle}</p>}
          {section.columns && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {section.columns.map((col, i) => (
                <div key={i} className="bg-white rounded-2xl p-7 shadow-sm">
                  <h4 className="text-base font-semibold text-neutral-900 mb-5 pb-3 border-b border-neutral-100">{col.title}</h4>
                  <ul className="space-y-3">
                    {col.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-3 text-sm text-neutral-600">
                        <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#7B61FF' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'voice-states':
      return (
        <SectionWrapper bg="#ffffff">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">{section.title}</h3>
          {section.subtitle && <p className="text-sm font-mono mb-4" style={{ color: '#7B61FF' }}>{section.subtitle}</p>}
          {section.content && <p className="text-neutral-600 leading-relaxed mb-10 max-w-3xl">{section.content}</p>}
          {section.items && (
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-5">
              {section.items.map((s, i) => (
                <div key={i} className="text-center bg-white rounded-2xl p-5 shadow-sm">
                  <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: s.color + '15' }}>
                    <div className="w-6 h-6 rounded-full" style={{ backgroundColor: s.color }} />
                  </div>
                  <span className="text-sm font-semibold text-neutral-800 block">{s.title}</span>
                  <span className="text-xs text-neutral-400 block mt-2 leading-relaxed">{s.description}</span>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'editorial-board': {
      const layoutMode = section.layout || 'full-bleed';
      const maxW = section.maxWidth || (layoutMode === 'contained' ? '1200px' : '100%');
      const isImmersive = layoutMode === 'immersive';
      return (
        <div style={{ backgroundColor: isImmersive ? '#111' : '#F8F8FA' }} className={isImmersive ? 'py-0' : ''}>
          <div
            className={`mx-auto ${layoutMode === 'contained' ? 'px-4 sm:px-6 py-14 sm:py-20' : layoutMode === 'immersive' ? 'py-0' : 'px-0 py-10 sm:py-16'}`}
            style={{ maxWidth: maxW }}
          >
            {(section.category || section.title) && (
              <div className={`${layoutMode === 'full-bleed' ? 'px-4 sm:px-6 max-w-6xl mx-auto' : ''} mb-6`}>
                <CategoryLabel category={section.category} />
                {section.title && (
                  <h3 className={`text-xl sm:text-2xl font-bold mb-1 ${isImmersive ? 'text-white' : 'text-neutral-900'}`}>{section.title}</h3>
                )}
                {section.subtitle && (
                  <p className={`text-sm ${isImmersive ? 'text-neutral-400' : 'text-neutral-500'}`}>{section.subtitle}</p>
                )}
              </div>
            )}
            {section.image && (
              <div className={layoutMode === 'contained' ? 'rounded-2xl overflow-hidden shadow-xl' : ''}>
                <img
                  src={assetUrl(section.image)}
                  alt={section.title || 'Portfolio board'}
                  className="w-full h-auto block"
                  style={{ maxWidth: maxW }}
                />
              </div>
            )}
            {section.caption && (
              <div className={`${layoutMode === 'full-bleed' ? 'px-4 sm:px-6 max-w-6xl mx-auto' : ''} mt-4`}>
                <p className={`text-xs italic ${isImmersive ? 'text-neutral-500' : 'text-neutral-400'}`}>{section.caption}</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    case 'mockup':
      return (
        <div style={{ backgroundColor: '#F8F8FA' }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <CategoryLabel category={section.category} />
            {section.title && (
              <div className="text-center mb-10">
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">{section.title}</h3>
                {section.subtitle && <p className="text-sm text-neutral-500 max-w-2xl mx-auto">{section.subtitle}</p>}
              </div>
            )}
            {section.image && (
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={assetUrl(section.image)} alt={section.title || ''} className="w-full h-auto block" />
              </div>
            )}
          </div>
        </div>
      );

    case 'annotated-mockup': {
      const leftAnnotations = (section.annotations || []).filter(a => a.side === 'left');
      const rightAnnotations = (section.annotations || []).filter(a => a.side === 'right');
      return (
        <div style={{ backgroundColor: '#F8F8FA' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
            <CategoryLabel category={section.category} />
            {section.title && (
              <div className="text-center mb-4">
                <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">{section.title}</h3>
                {section.subtitle && <p className="text-sm text-neutral-500 max-w-2xl mx-auto">{section.subtitle}</p>}
              </div>
            )}
            {/* Annotated layout: labels — image — labels */}
            <div className="flex items-stretch gap-0 mt-8">
              {/* Left annotations column */}
              <div className="hidden lg:block w-48 flex-shrink-0 relative">
                {leftAnnotations.map((a, i) => (
                  <div key={i} className="absolute right-0 flex items-center" style={{ top: `${a.y}%`, transform: 'translateY(-50%)' }}>
                    <div className="text-right mr-3 max-w-[160px]">
                      <span className="text-[11px] font-semibold text-neutral-800 block leading-tight">{a.label}</span>
                      {a.detail && <span className="text-[10px] text-neutral-400 block leading-tight mt-0.5">{a.detail}</span>}
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: a.color || '#7B61FF' }} />
                  </div>
                ))}
              </div>

              {/* Central image with anchor dots and connector lines */}
              <div className="flex-1 relative">
                <div className="rounded-2xl overflow-hidden shadow-xl relative">
                  <img src={assetUrl(section.image)} alt={section.title || ''} className="w-full h-auto block" />
                </div>
                {/* SVG connector lines overlay */}
                <svg className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                  {leftAnnotations.map((a, i) => {
                    const cy = a.y;
                    const cx = a.x != null ? a.x : 0;
                    return (
                      <g key={`l${i}`}>
                        <circle cx={`${cx}%`} cy={`${cy}%`} r="3" fill={a.color || '#7B61FF'} opacity="0.6" />
                        <line x1={`${cx}%`} y1={`${cy}%`} x2="-12" y2={`${cy}%`} stroke={a.color || '#7B61FF'} strokeWidth="0.75" opacity="0.35" />
                      </g>
                    );
                  })}
                  {rightAnnotations.map((a, i) => {
                    const cy = a.y;
                    const cx = a.x != null ? a.x : 100;
                    return (
                      <g key={`r${i}`}>
                        <circle cx={`${cx}%`} cy={`${cy}%`} r="3" fill={a.color || '#7B61FF'} opacity="0.6" />
                        <line x1={`${cx}%`} y1={`${cy}%`} x2="100%" y2={`${cy}%`} stroke={a.color || '#7B61FF'} strokeWidth="0.75" opacity="0.35" style={{ transform: 'translateX(12px)' }} />
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Right annotations column */}
              <div className="hidden lg:block w-48 flex-shrink-0 relative">
                {rightAnnotations.map((a, i) => (
                  <div key={i} className="absolute left-0 flex items-center" style={{ top: `${a.y}%`, transform: 'translateY(-50%)' }}>
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: a.color || '#7B61FF' }} />
                    <div className="ml-3 max-w-[160px]">
                      <span className="text-[11px] font-semibold text-neutral-800 block leading-tight">{a.label}</span>
                      {a.detail && <span className="text-[10px] text-neutral-400 block leading-tight mt-0.5">{a.detail}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: show annotations as chips below image */}
            <div className="lg:hidden mt-6 flex flex-wrap gap-2 justify-center">
              {(section.annotations || []).map((a, i) => (
                <span key={i} className="text-[10px] px-3 py-1.5 rounded-full border font-medium" style={{ borderColor: (a.color || '#7B61FF') + '40', color: a.color || '#7B61FF', backgroundColor: (a.color || '#7B61FF') + '08' }}>
                  {a.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      );
    }

    case 'text':
      return (
        <SectionWrapper bg="#ffffff">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <CategoryLabel category={section.category} />
              <SectionLabel label={section.label} />
              <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-4">{section.title}</h3>
              {section.content && <p className="text-neutral-600 leading-relaxed text-base sm:text-lg max-w-3xl">{section.content}</p>}
            </div>
            {(section.image || section.secondaryImage) && (
              <div className="flex-shrink-0 flex items-center gap-2">
                {section.image && <img src={assetUrl(section.image)} alt="" className="w-12 h-12 sm:w-16 sm:h-16 object-contain drop-shadow-md" />}
                {section.secondaryImage && <img src={assetUrl(section.secondaryImage)} alt="" className="w-10 h-10 sm:w-14 sm:h-14 object-contain drop-shadow-md" />}
              </div>
            )}
          </div>
        </SectionWrapper>
      );

    case 'interaction-path':
      return (
        <SectionWrapper bg="#F8F8FA">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.subtitle && <p className="text-neutral-500 text-sm mb-10 max-w-3xl">{section.subtitle}</p>}
          {/* Top flow: Listen → Ask → Resume */}
          {section.steps && (
            <div className="flex items-center justify-center gap-3 mb-10">
              {section.steps.map((s, i) => (
                <React.Fragment key={i}>
                  <div className="rounded-full px-6 py-2.5 text-sm font-semibold text-white" style={{ backgroundColor: '#7B61FF' }}>{s.label}</div>
                  {i < section.steps!.length - 1 && <ArrowRight size={20} style={{ color: '#7B61FF' }} />}
                </React.Fragment>
              ))}
            </div>
          )}
          {/* Table */}
          {section.rows && (
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
              <div className="grid grid-cols-3 text-sm font-semibold text-neutral-900 border-b" style={{ backgroundColor: '#F0EDFF' }}>
                <div className="px-6 py-4">{isZh ? '用户行为' : 'User Action'}</div>
                <div className="px-6 py-4">{isZh ? '系统反馈' : 'System Feedback'}</div>
                <div className="px-6 py-4">{isZh ? '用户价值' : 'User Value'}</div>
              </div>
              {section.rows.map((r, i) => (
                <div key={i} className="grid grid-cols-3 text-sm border-b border-neutral-100 last:border-0">
                  <div className="px-6 py-4 text-neutral-700 font-medium">{r.action}</div>
                  <div className="px-6 py-4 text-neutral-500">{r.feedback}</div>
                  <div className="px-6 py-4 font-medium" style={{ color: '#7B61FF' }}>{r.value}</div>
                </div>
              ))}
            </div>
          )}
          {section.content && <p className="text-sm text-neutral-500 mt-8 max-w-3xl leading-relaxed">{section.content}</p>}
        </SectionWrapper>
      );

    case 'interaction-mapping':
      if (section.variant === 'series') {
        return (
          <NuwaSectionShell section={section} wide>
            {section.rows && (
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                <div className="hidden grid-cols-[0.24fr_0.28fr_0.48fr] border-b border-white/10 bg-white/[0.06] text-xs font-semibold uppercase tracking-[0.14em] text-white/52 md:grid">
                  <div className="px-5 py-4">{isZh ? 'AI 能力' : 'AI capability'}</div>
                  <div className="px-5 py-4">{isZh ? '页面控制' : 'Page control'}</div>
                  <div className="px-5 py-4">{isZh ? '页面动作与界面证据' : 'Page action & interface evidence'}</div>
                </div>
                {section.rows.map((row, index) => {
                  const theme = getNuwaTheme(index === 0 ? 'infinity' : index === 1 ? 'xl' : index === 2 ? 'drag' : 'series');
                  return (
                    <div
                      key={`${row.action}-${index}`}
                      className="grid gap-4 border-b border-white/10 p-5 last:border-0 md:grid-cols-[0.24fr_0.28fr_0.48fr] md:gap-0 md:p-0"
                    >
                      <div className="md:border-r md:border-white/10 md:px-5 md:py-5">
                        <span className="mb-2 block text-[10px] font-mono uppercase tracking-[0.18em] text-white/34 md:hidden">{isZh ? 'AI 能力' : 'AI capability'}</span>
                        <p className="text-sm font-semibold" style={{ color: theme.accent }}>{row.action}</p>
                      </div>
                      <div className="md:border-r md:border-white/10 md:px-5 md:py-5">
                        <span className="mb-2 block text-[10px] font-mono uppercase tracking-[0.18em] text-white/34 md:hidden">{isZh ? '页面控制' : 'Page control'}</span>
                        <p className="text-sm text-white/64">{row.feedback}</p>
                      </div>
                      <div className="md:px-5 md:py-5">
                        <span className="mb-2 block text-[10px] font-mono uppercase tracking-[0.18em] text-white/34 md:hidden">{isZh ? '页面动作与界面证据' : 'Interface evidence'}</span>
                        <p className="text-sm leading-6 text-white/64">{row.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </NuwaSectionShell>
        );
      }
      return (
        <SectionWrapper bg="#ffffff">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.subtitle && <p className="text-neutral-500 text-sm mb-6 max-w-3xl leading-relaxed">{section.subtitle}</p>}
          {section.content && <p className="text-neutral-600 leading-relaxed mb-8 max-w-3xl">{section.content}</p>}
          {section.rows && (
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
              <div className="hidden grid-cols-[0.24fr_0.28fr_0.48fr] border-b border-neutral-200 bg-neutral-950 text-xs font-semibold uppercase tracking-[0.14em] text-white/72 md:grid">
                <div className="px-5 py-4">{isZh ? 'AI 能力' : 'AI capability'}</div>
                <div className="px-5 py-4">{isZh ? '页面控制' : 'Page control'}</div>
                <div className="px-5 py-4">{isZh ? '页面动作与界面证据' : 'Page action & interface evidence'}</div>
              </div>
              {section.rows.map((row, index) => (
                <div
                  key={`${row.action}-${index}`}
                  className="grid gap-3 border-b border-neutral-100 p-5 last:border-0 md:grid-cols-[0.24fr_0.28fr_0.48fr] md:gap-0 md:p-0"
                >
                  <div className="md:border-r md:border-neutral-100 md:px-5 md:py-5">
                    <span className="mb-2 block text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-400 md:hidden">{isZh ? 'AI 能力' : 'AI capability'}</span>
                    <p className="text-sm font-semibold text-neutral-950">{row.action}</p>
                  </div>
                  <div className="md:border-r md:border-neutral-100 md:px-5 md:py-5">
                    <span className="mb-2 block text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-400 md:hidden">{isZh ? '页面控制' : 'Page control'}</span>
                    <p className="text-sm text-neutral-600">{row.feedback}</p>
                  </div>
                  <div className="md:px-5 md:py-5">
                    <span className="mb-2 block text-[10px] font-mono uppercase tracking-[0.18em] text-neutral-400 md:hidden">{isZh ? '页面动作与界面证据' : 'Interface evidence'}</span>
                    <p className="text-sm leading-6 text-neutral-600">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'series-timeline':
      return <SeriesTimelineSection section={section} isZh={isZh} />;

    case 'evidence':
      if (section.variant === 'infinity' && section.demoUrl) {
        return <LiveDemoShowcaseSection section={section} isZh={isZh} />;
      }
      return <EvidenceSection section={section} isZh={isZh} />;

    case 'live-demo':
      return (
        <SectionWrapper bg="#F8F8FA" className="live-demo-section">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.subtitle && <p className="text-neutral-500 text-sm mb-6 max-w-3xl leading-relaxed">{section.subtitle}</p>}
          {section.content && <p className="text-neutral-600 leading-relaxed mb-8 max-w-3xl">{section.content}</p>}
          <LiveDemoWindow section={section} isZh={isZh} />
        </SectionWrapper>
      );

    case 'state-flow':
      return (
        <SectionWrapper bg="#ffffff">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.content && <p className="text-neutral-600 leading-relaxed mb-10 max-w-3xl">{section.content}</p>}
          {section.items && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {section.items.map((s, i) => (
                <div key={i} className="relative">
                  {/* Card */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 text-center">
                    {/* Mini waveform visualization */}
                    <div className="flex items-center justify-center gap-1 h-16 mb-3">
                      {[0.4, 0.7, 1, 0.8, 0.5].map((h, bi) => (
                        <div key={bi} className="w-2 rounded-full transition-all" style={{ height: `${h * 32}px`, backgroundColor: s.color, opacity: 0.8 }} />
                      ))}
                    </div>
                    <span className="text-xs font-semibold text-neutral-800 block">{s.title}</span>
                    <span className="text-[10px] text-neutral-400 block mt-1">{s.description}</span>
                  </div>
                  {/* Arrow between cards */}
                  {i < section.items!.length - 1 && (
                    <div className="hidden sm:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                      <ArrowRight size={14} style={{ color: '#7B61FF' }} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'validation':
      return (
        <SectionWrapper bg="#F8F8FA">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.subtitle && <p className="text-neutral-500 text-sm mb-10 max-w-3xl">{section.subtitle}</p>}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Metrics */}
            {section.stats && (
              <div className="space-y-5">
                {section.stats.map((s, i) => (
                  <div key={i} className="bg-white rounded-2xl p-7 shadow-sm text-center">
                    <span className="text-5xl sm:text-6xl font-serif block mb-2" style={{ color: '#7B61FF' }}>{s.value}</span>
                    <span className="text-sm text-neutral-500">{s.label}</span>
                    {s.description && <p className="text-xs text-neutral-400 mt-2">{s.description}</p>}
                  </div>
                ))}
              </div>
            )}
            {/* User Quotes */}
            {section.quotes && (
              <div className="space-y-4">
                {section.quotes.map((q, i) => (
                  <div key={i} className="bg-white rounded-2xl p-5 shadow-sm flex gap-3">
                    <span className="text-2xl flex-shrink-0">{q.avatar}</span>
                    <p className="text-sm text-neutral-600 leading-relaxed italic">"{q.text}"</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {section.content && <p className="text-sm text-neutral-500 mt-8 max-w-3xl leading-relaxed">{section.content}</p>}
        </SectionWrapper>
      );

    case 'design-rationale':
      return (
        <SectionWrapper bg="#ffffff">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.content && <p className="text-neutral-600 leading-relaxed mb-6 max-w-3xl">{section.content}</p>}
          {/* Left: flow steps, Right: image */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
            {section.steps && (
              <div className="space-y-3">
                {section.subtitle && <p className="text-sm font-semibold mb-4" style={{ color: '#7B61FF' }}>{isZh ? '🎯 设计价值' : '🎯 Design Value'}</p>}
                {section.steps.map((s, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs text-white flex-shrink-0" style={{ backgroundColor: '#7B61FF' }}>{i + 1}</div>
                    <div className="flex-1 rounded-xl px-5 py-3 text-sm text-neutral-700 border" style={{ backgroundColor: '#FAFAFF', borderColor: '#EEEAFF' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            )}
            {section.image && (
              <div className="rounded-2xl overflow-hidden shadow-md">
                <img src={assetUrl(section.image)} alt="" className="w-full h-auto block" />
              </div>
            )}
          </div>
          {section.items && section.items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
              {section.items.map((item, i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-neutral-100">
                  <span className="text-sm font-semibold text-neutral-800 block mb-1">{item.title}</span>
                  <span className="text-sm text-neutral-500 leading-relaxed">{item.description}</span>
                </div>
              ))}
            </div>
          )}
        </SectionWrapper>
      );

    case 'outcomes':
      if (section.variant === 'series') {
        const theme = getNuwaTheme('series');
        return (
          <NuwaSectionShell section={section} showContent={false}>
            {section.content && (
              <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.05] p-6 sm:p-8">
                <span className="block max-w-3xl font-serif text-2xl leading-tight text-white sm:text-4xl">
                  {section.content}
                </span>
                <div className="mt-6 h-1 w-24 rounded-full" style={{ backgroundColor: theme.accent }} />
              </div>
            )}
            {section.items && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {section.items.map((o, i) => {
                  const itemTheme = getNuwaTheme(i % 3 === 0 ? 'infinity' : i % 3 === 1 ? 'xl' : 'drag');
                  return (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
                      <span className="mb-4 block h-2 w-12 rounded-full" style={{ backgroundColor: itemTheme.accent }} />
                      <span className="block text-base font-semibold text-white">{o.title}</span>
                      <span className="mt-3 block text-sm leading-7 text-white/58">{o.description}</span>
                    </div>
                  );
                })}
              </div>
            )}
            {section.image && (
              <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
                <img src={assetUrl(section.image)} alt="" className="block h-auto w-full" />
              </div>
            )}
          </NuwaSectionShell>
        );
      }
      return (
        <SectionWrapper bg="#F8F8FA">
          <CategoryLabel category={section.category} />
          <SectionLabel label={section.label} />
          <h3 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">{section.title}</h3>
          {section.subtitle && <p className="text-neutral-500 text-sm mb-6">{section.subtitle}</p>}
          {section.content && (
            <div className="text-white p-7 sm:p-8 rounded-2xl mb-8" style={{ backgroundColor: '#7B61FF' }}>
              <span className="text-2xl sm:text-3xl font-serif">{section.content}</span>
            </div>
          )}
          {section.items && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {section.items.map((o, i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
                  <span className="text-base font-semibold text-neutral-900 block mb-2">{o.title}</span>
                  <span className="text-sm text-neutral-500 leading-relaxed block">{o.description}</span>
                </div>
              ))}
            </div>
          )}
          {section.image && (
            <div className="rounded-2xl overflow-hidden shadow-md mt-8">
              <img src={assetUrl(section.image)} alt="" className="w-full h-auto block" />
            </div>
          )}
        </SectionWrapper>
      );

    default:
      return null;
  }
};

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const readerPages = project ? collectReaderPages(project, language) : [];
  const hasReaderPages = readerPages.length > 0;

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
      setShowStickyBar(false);
      setShowBackToTop(false);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [project]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const handleScroll = () => {
      setShowStickyBar(container.scrollTop > 300);
      setShowBackToTop(container.scrollTop > 800);
    };
    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [project]);

  if (!project) return null;

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const renderLanguageToggle = () => <LanguageToggle />;

  return (
    <>
      {/* Dark backdrop - can see content underneath */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Detail panel */}
      <motion.div
        initial={hasReaderPages ? { opacity: 0, scale: 0.985 } : { y: '100%' }}
        animate={hasReaderPages ? { opacity: 1, scale: 1 } : { y: 0 }}
        exit={hasReaderPages ? { opacity: 0, scale: 0.985 } : { y: '100%' }}
        transition={hasReaderPages ? { duration: 0.22, ease: [0.2, 0, 0, 1] } : { type: 'spring', damping: 30, stiffness: 300 }}
        className={hasReaderPages ? 'fixed inset-0 z-[60] flex flex-col' : 'fixed inset-x-0 bottom-0 z-[60] flex flex-col'}
        style={hasReaderPages ? undefined : { top: '120px' }}
      >
        {/* Rounded top container */}
        <div className={`relative flex flex-col h-full overflow-hidden shadow-2xl ${hasReaderPages ? 'bg-[#202124]' : 'bg-white rounded-t-2xl'}`}>

          {/* Drag handle / top bar */}
          {!hasReaderPages && (
            <div className="flex-shrink-0 sticky top-0 z-10 bg-white rounded-t-2xl">
              <div className="flex justify-center pt-3 pb-2">
                <div className="w-10 h-1 rounded-full bg-neutral-300" />
              </div>
              <div className="px-4 sm:px-6 md:px-8 pb-2 flex items-center justify-between gap-3">
                <span className="min-w-0 truncate text-sm font-medium text-neutral-900">{project.title}</span>
                <div className="flex shrink-0 items-center gap-2">
                  {renderLanguageToggle()}
                  <button
                    type="button"
                    aria-label={isZh ? '关闭项目详情' : 'Close project detail'}
                    onClick={onClose}
                    className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                  >
                    <X size={16} className="text-neutral-500" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Sticky bar that appears on scroll */}
          <AnimatePresence>
            {showStickyBar && !hasReaderPages && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-md rounded-t-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
              >
                <div className="flex justify-center pt-3 pb-2">
                  <div className="w-10 h-1 rounded-full bg-neutral-300" />
                </div>
                <div className="px-4 sm:px-6 md:px-8 pb-2 flex items-center justify-between">
                  <span className="min-w-0 truncate text-sm font-medium text-neutral-900">{project.title}</span>
                  <div className="flex shrink-0 items-center gap-2">
                    {renderLanguageToggle()}
                    <button
                      type="button"
                      aria-label={isZh ? '关闭项目详情' : 'Close project detail'}
                      onClick={onClose}
                      className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-colors"
                    >
                      <X size={16} className="text-neutral-500" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scrollable content */}
          <div ref={scrollRef} className={`flex-1 overflow-y-auto scroll-smooth ${hasReaderPages ? 'bg-[#2F3033]' : 'bg-cream'}`}>

            {/* Mode A: Portfolio/PDF Reader — finished pages exported from Figma */}
            {hasReaderPages ? (
              <PortfolioReader
                project={project}
                pages={readerPages}
                isZh={isZh}
                onClose={onClose}
                scrollRootRef={scrollRef}
              />
            ) : project.id === 'p3' ? (
              <NuwaSeriesCaseStudy isZh={isZh} />
            ) : project.id === 'p20' ? (
              <RodinDiffusionCaseStudy isZh={isZh} />
            ) : project.id === 'p21' ? (
              <LanternHomecomingCaseStudy isZh={isZh} />
            ) : project.caseSections && project.caseSections.length > 0 ? (
              /* Mode B: Modular Case Study — for projects built from sections */
              <>
                {project.caseSections.map((section, sIdx) => (
                  <CaseSectionRenderer key={sIdx} section={section} isZh={isZh} />
                ))}
              </>
            ) : (
              <>
                {/* Legacy: Hero Cover Image */}
                <div className="relative w-full bg-neutral-100 overflow-hidden" style={{ maxHeight: '480px' }}>
                  <img src={assetUrl(project.coverImage)} alt={project.title} className="w-full h-auto object-cover" style={{ maxHeight: '480px', objectPosition: 'center' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Legacy: Project Info */}
                <div className="bg-white">
                  <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 py-8 sm:py-10">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif text-neutral-900 mb-2">{project.title}</h1>
                    <p className="text-neutral-500 text-sm sm:text-base leading-relaxed max-w-xl italic">{project.shortDescription}</p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-neutral-100">
                        {project.tags.map((tag, idx) => (
                          <span key={idx} className="text-xs px-3 py-1.5 rounded-full bg-neutral-100 text-neutral-600">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Legacy: Acts */}
                <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 py-12">
                  <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm mb-8">
                    <h3 className="text-xl font-serif text-neutral-900 mb-4">{project.acts.act1.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{project.acts.act1.content}</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm mb-8">
                    <h3 className="text-xl font-serif text-neutral-900 mb-4">{project.acts.act2.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{project.acts.act2.content}</p>
                  </div>
                  <div className="bg-white rounded-xl p-6 sm:p-8 shadow-sm">
                    <h3 className="text-xl font-serif text-neutral-900 mb-4">{project.acts.act3.title}</h3>
                    <p className="text-neutral-600 leading-relaxed">{project.acts.act3.content}</p>
                  </div>
                </div>
              </>
            )}

            {/* External Links */}
            {!hasReaderPages && project.externalLinks && Object.keys(project.externalLinks).length > 0 && (
              <div className="bg-white border-t border-neutral-100">
                <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 py-10">
                  <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4">{isZh ? '查看更多' : 'View More'}</p>
                  <div className="flex flex-wrap gap-3">
                    {project.externalLinks.behance && (
                      <a href={project.externalLinks.behance} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#2E4D4D] hover:bg-[#434D46] text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                        <ExternalLink size={15} /> {project.externalLinks.behance.includes('figma.com') ? 'Figma' : 'Behance'}
                      </a>
                    )}
                    {project.externalLinks.zcool && (
                      <a href={project.externalLinks.zcool} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-dark-brown hover:bg-brown text-white px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                        <ExternalLink size={15} /> Zcool
                      </a>
                    )}
                    {project.externalLinks.live && (
                      <a href={project.externalLinks.live} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-neutral-300 hover:border-neutral-400 text-neutral-700 px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                        <ExternalLink size={15} /> {isZh ? '在线项目' : 'Live Project'}
                      </a>
                    )}
                    {project.externalLinks.github && (
                      <a href={project.externalLinks.github} target="_blank" rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 border border-neutral-300 hover:border-neutral-400 text-neutral-700 px-5 py-2.5 rounded-full text-sm font-medium transition-colors">
                        <ExternalLink size={15} /> GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Footer */}
            {!hasReaderPages && <div className="bg-white border-t border-neutral-100">
              <div className="max-w-4xl mx-auto px-6 sm:px-8 md:px-12 py-10 flex flex-col sm:flex-row justify-between items-center gap-4">
                <span className="text-sm text-neutral-400">{isZh ? '案例结束' : 'End of Case Study'}</span>
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors group"
                >
                  {isZh ? '返回作品集' : 'Back to Portfolio'}
                  <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>}
          </div>
        </div>
      </motion.div>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-[70] w-10 h-10 bg-dark-brown text-white rounded-full flex items-center justify-center shadow-lg hover:bg-brown transition-colors"
          >
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProjectDetail;

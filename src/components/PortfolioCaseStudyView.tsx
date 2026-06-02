import React from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Bot,
  CheckCircle2,
  ChevronDown,
  Circle,
  CircleDot,
  FileText,
  FlaskConical,
  Grid2X2,
  Maximize2,
  Mic2,
  MousePointer2,
  Pause,
  Play,
  Search,
  Sparkles,
  Volume2,
  Wand2,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { Project, CaseSection } from '../types';
import { assetUrl } from '../utils/assets';

interface PortfolioCaseStudyViewProps {
  project: Project;
  isZh: boolean;
}

interface CaseTheme {
  key: 'read' | 'rd';
  accent: string;
  accent2: string;
  accent3: string;
  ink: string;
  muted: string;
  paper: string;
  soft: string;
  dark: string;
}

interface CasePage {
  id: string;
  label: string;
  title: string;
  subtitle?: string;
  eyebrow?: string;
  node: React.ReactNode;
}

const readTheme: CaseTheme = {
  key: 'read',
  accent: '#425BFF',
  accent2: '#F16F4A',
  accent3: '#28A56A',
  ink: '#111827',
  muted: '#667085',
  paper: '#F7F8FF',
  soft: '#E9EDFF',
  dark: '#11131F',
};

const rdTheme: CaseTheme = {
  key: 'rd',
  accent: '#0D8F67',
  accent2: '#75A7FF',
  accent3: '#F4B740',
  ink: '#0B1F1A',
  muted: '#5E706A',
  paper: '#F4FAF7',
  soft: '#DDF4EA',
  dark: '#071D18',
};

const sectionTransition = (delay = 0) => ({
  duration: 0.48,
  delay,
  ease: [0.22, 1, 0.36, 1] as const,
});

const getSection = (sections: CaseSection[], type: CaseSection['type']) =>
  sections.find((section) => section.type === type);

const getSections = (sections: CaseSection[], type: CaseSection['type']) =>
  sections.filter((section) => section.type === type);

const PageHeader: React.FC<{
  eyebrow?: string;
  title: string;
  subtitle?: string;
  theme: CaseTheme;
  dark?: boolean;
}> = ({ eyebrow, title, subtitle, theme, dark }) => (
  <div>
    {eyebrow ? (
      <p
        className={`font-mono text-[10px] font-semibold uppercase tracking-[0.28em] ${dark ? 'text-white/45' : 'text-neutral-400'}`}
        style={{ color: dark ? undefined : theme.accent }}
      >
        {eyebrow}
      </p>
    ) : null}
    <h2 className={`mt-3 max-w-3xl font-serif text-[32px] leading-[1.02] sm:text-[46px] lg:text-[56px] ${dark ? 'text-white' : 'text-neutral-950'}`}>
      {title}
    </h2>
    {subtitle ? (
      <p className={`mt-4 max-w-3xl text-[14px] leading-6 sm:text-[16px] sm:leading-7 ${dark ? 'text-white/58' : 'text-neutral-500'}`}>
        {subtitle}
      </p>
    ) : null}
  </div>
);

const BrowserChrome: React.FC<{ children: React.ReactNode; dark?: boolean; className?: string }> = ({ children, dark, className = '' }) => (
  <div className={`overflow-hidden rounded-[18px] border shadow-[0_22px_70px_rgba(15,23,42,0.16)] ${dark ? 'border-white/10 bg-white/[0.05]' : 'border-black/[0.07] bg-white'} ${className}`}>
    <div className={`flex h-9 items-center gap-2 border-b px-4 ${dark ? 'border-white/10 bg-white/[0.04]' : 'border-neutral-100 bg-neutral-50'}`}>
      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
      <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
    </div>
    {children}
  </div>
);

const VoiceWave: React.FC<{ color: string; compact?: boolean }> = ({ color, compact }) => (
  <div className={`flex items-center justify-center gap-1.5 ${compact ? 'h-9' : 'h-14'}`}>
    {[0.45, 0.72, 1, 0.62, 0.82, 0.52, 0.95].map((height, index) => (
      <span
        key={index}
        className="case-wave-bar w-1.5 rounded-full sm:w-2"
        style={{
          height: `${height * (compact ? 26 : 44)}px`,
          backgroundColor: color,
          animationDelay: `${index * 0.12}s`,
          opacity: 0.35 + height / 2,
        }}
      />
    ))}
  </div>
);

const PdfToolbar: React.FC<{ project: Project; pages: CasePage[]; theme: CaseTheme; isZh: boolean }> = ({ project, pages, theme, isZh }) => (
  <div className="sticky top-0 z-30 border-b border-black/10 bg-[#2B2B2B]/95 text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] backdrop-blur-xl">
    <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-3 px-4 py-3 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <span className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg" style={{ backgroundColor: theme.accent }}>
          <FileText size={16} />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{project.title}</p>
          <p className="text-[11px] text-white/42">{isZh ? '作品集文档浏览' : 'Portfolio document view'}</p>
        </div>
      </div>

      <div className="hidden items-center overflow-hidden rounded-full border border-white/10 bg-white/[0.06] p-1 text-xs md:flex">
        <button className="grid h-8 w-8 place-items-center rounded-full text-white/62 transition hover:bg-white/10 hover:text-white" type="button" aria-label="Zoom out">
          <ZoomOut size={15} />
        </button>
        <span className="px-3 font-mono text-white/70">Fit width</span>
        <button className="grid h-8 w-8 place-items-center rounded-full text-white/62 transition hover:bg-white/10 hover:text-white" type="button" aria-label="Zoom in">
          <ZoomIn size={15} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <span className="hidden rounded-full border border-white/10 px-3 py-1.5 text-[11px] text-white/55 sm:inline-flex">
          {pages.length} {isZh ? '页' : 'pages'}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-[11px] text-white/70">
          <Circle className="fill-current" size={8} style={{ color: theme.accent3 }} />
          {isZh ? '动效版' : 'Interactive'}
        </span>
      </div>
    </div>
  </div>
);

const ThumbnailRail: React.FC<{ pages: CasePage[]; theme: CaseTheme }> = ({ pages, theme }) => (
  <aside className="sticky top-[72px] hidden h-[calc(100vh-96px)] w-[178px] flex-shrink-0 overflow-y-auto border-r border-black/10 bg-[#3A3A3A] px-4 py-5 lg:block">
    <div className="space-y-4">
      {pages.map((page, index) => (
        <a key={page.id} href={`#${page.id}`} className="group block">
          <div className="rounded-[10px] border border-white/12 bg-white p-2 shadow-sm transition duration-200 group-hover:-translate-y-0.5 group-hover:border-white/40 group-hover:shadow-[0_14px_34px_rgba(0,0,0,0.24)]">
            <div className="aspect-[4/3] rounded-[6px] p-2" style={{ backgroundColor: index === 0 ? theme.paper : '#F7F7F7' }}>
              <div className="mb-2 h-1.5 w-1/2 rounded-full" style={{ backgroundColor: theme.accent }} />
              <div className="mb-1.5 h-1.5 w-4/5 rounded-full bg-neutral-200" />
              <div className="mb-3 h-1.5 w-2/3 rounded-full bg-neutral-200" />
              <div className="grid grid-cols-2 gap-1.5">
                <div className="h-8 rounded bg-neutral-100" />
                <div className="h-8 rounded" style={{ backgroundColor: `${theme.accent}22` }} />
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-start gap-2">
            <span className="font-mono text-[10px] text-white/35">{String(index + 1).padStart(2, '0')}</span>
            <p className="line-clamp-2 text-[11px] leading-4 text-white/62 transition group-hover:text-white">{page.label}</p>
          </div>
        </a>
      ))}
    </div>
  </aside>
);

const MobileThumbs: React.FC<{ pages: CasePage[]; theme: CaseTheme }> = ({ pages, theme }) => (
  <div className="sticky top-[57px] z-20 flex gap-2 overflow-x-auto border-b border-black/10 bg-[#343434] px-4 py-3 lg:hidden">
    {pages.map((page, index) => (
      <a
        key={page.id}
        href={`#${page.id}`}
        className="flex min-w-[112px] items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-[11px] text-white/62"
      >
        <span className="font-mono" style={{ color: index === 0 ? theme.accent3 : undefined }}>{String(index + 1).padStart(2, '0')}</span>
        <span className="truncate">{page.label}</span>
      </a>
    ))}
  </div>
);

const DocumentPage: React.FC<{ page: CasePage; index: number; total: number; theme: CaseTheme; children: React.ReactNode }> = ({ page, index, total, theme, children }) => (
  <motion.section
    id={page.id}
    initial={{ opacity: 0, y: 18 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.16 }}
    transition={sectionTransition(0.02)}
    className="scroll-mt-28 rounded-[22px] bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.22)] sm:p-8 lg:p-10"
  >
    <div className="mb-6 flex items-center justify-between border-b border-neutral-100 pb-4">
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-full text-[11px] font-semibold text-white" style={{ backgroundColor: theme.accent }}>
          {index + 1}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">{page.label}</span>
      </div>
      <span className="font-mono text-[11px] text-neutral-300">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}</span>
    </div>
    {children}
  </motion.section>
);

const MetricGrid: React.FC<{ stats?: CaseSection['stats']; theme: CaseTheme }> = ({ stats = [], theme }) => (
  <div className="grid gap-3 sm:grid-cols-2">
    {stats.map((item) => (
      <div key={item.label} className="rounded-[18px] border border-black/[0.04] p-5 transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.11)]" style={{ backgroundColor: theme.paper }}>
        <p className="font-serif text-[42px] leading-none" style={{ color: theme.accent }}>{item.value}</p>
        <p className="mt-3 text-sm font-semibold text-neutral-950">{item.label}</p>
        {item.description ? <p className="mt-2 text-xs leading-5 text-neutral-500">{item.description}</p> : null}
      </div>
    ))}
  </div>
);

const ReadHeroVisual: React.FC<{ theme: CaseTheme }> = ({ theme }) => (
  <div className="relative min-h-[330px] sm:min-h-[430px]">
    <div className="absolute inset-x-8 top-4 overflow-hidden rounded-[28px] bg-white shadow-[0_32px_90px_rgba(66,91,255,0.18)]">
      <img src={assetUrl('/projects/read-aloud/cover-bg-1.png')} alt="" className="h-[320px] w-full object-cover sm:h-[410px]" />
    </div>
    <div className="absolute bottom-2 left-0 w-[78%] rounded-[24px] bg-[#10121E] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
      <img src={assetUrl('/projects/read-aloud/player-ui.png')} alt="" className="aspect-[16/9] w-full rounded-[18px] object-cover" />
    </div>
    <div className="absolute right-0 top-0 rounded-[22px] border border-white/80 bg-white/90 p-4 shadow-[0_22px_60px_rgba(66,91,255,0.18)] backdrop-blur-xl">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-full text-white" style={{ backgroundColor: theme.accent }}>
          <Volume2 size={18} />
        </span>
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">Voice mode</p>
          <p className="text-[14px] font-semibold text-neutral-950">Ask while listening</p>
        </div>
      </div>
    </div>
  </div>
);

const RdHeroVisual: React.FC<{ theme: CaseTheme }> = ({ theme }) => (
  <BrowserChrome dark className="mt-3">
    <div className="grid min-h-[390px] grid-cols-[0.34fr_0.66fr] bg-[#0B1714] text-white">
      <div className="border-r border-white/10 p-5">
        <div className="mb-8 flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ backgroundColor: theme.accent }}>
            <Bot size={16} />
          </span>
          <span className="text-sm font-semibold">RD-Agent</span>
        </div>
        {['Hypothesis', 'Experiment', 'Report', 'Benchmark'].map((item, index) => (
          <div key={item} className={`mb-2 rounded-xl px-3 py-2 text-[12px] transition ${index === 0 ? 'bg-white text-[#0B1F1A]' : 'text-white/55 hover:bg-white/10 hover:text-white'}`}>
            {item}
          </div>
        ))}
      </div>
      <div className="p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">Research workspace</p>
            <h3 className="mt-2 text-2xl font-semibold">Run candidate ideas as a loop</h3>
          </div>
          <span className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] text-white/70">Live trace</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            ['Hypothesis', '23', theme.accent],
            ['Experiments', '08', theme.accent2],
            ['Reports', '05', theme.accent3],
          ].map(([label, value, color]) => (
            <div key={label} className="rounded-2xl bg-white/[0.06] p-4 transition hover:-translate-y-1 hover:bg-white/[0.1]">
              <p className="text-3xl font-semibold" style={{ color }}>{value}</p>
              <p className="mt-1 text-[11px] text-white/45">{label}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 rounded-2xl bg-white p-4 text-[#0B1F1A]">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-semibold">Agent plan</span>
            <span className="rounded-full bg-[#E7F7EF] px-2.5 py-1 text-[10px] font-semibold" style={{ color: theme.accent }}>Validated</span>
          </div>
          {[
            ['Find weak signals', 'Data mining', '82%'],
            ['Generate hypothesis', 'LLM reasoning', '64%'],
            ['Build experiment', 'Code + metric', '41%'],
          ].map(([title, meta, width]) => (
            <div key={title} className="mb-3 last:mb-0">
              <div className="mb-1 flex items-center justify-between text-[11px]">
                <span>{title}</span>
                <span className="text-neutral-400">{meta}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                <div className="case-progress h-full rounded-full" style={{ '--target-width': width, backgroundColor: theme.accent } as React.CSSProperties} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </BrowserChrome>
);

const FlowVisual: React.FC<{ projectId: string; theme: CaseTheme }> = ({ projectId, theme }) => {
  const isRd = projectId === 'p5';
  const steps = isRd
    ? [
        ['Idea', Search],
        ['Hypothesis', Sparkles],
        ['Experiment', FlaskConical],
        ['Report', FileText],
      ]
    : [
        ['Listen', Volume2],
        ['Ask', Mic2],
        ['Answer', Bot],
        ['Resume', Play],
      ];

  return (
    <div className="grid gap-3 sm:grid-cols-4">
      {steps.map(([label, Icon], index) => {
        const TypedIcon = Icon as typeof Search;
        return (
          <div key={label as string} className="relative rounded-[18px] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.12)]">
            <span className="grid h-11 w-11 place-items-center rounded-full text-white" style={{ backgroundColor: index === 2 ? theme.accent2 : theme.accent }}>
              <TypedIcon size={18} />
            </span>
            <p className="mt-5 text-[17px] font-semibold text-neutral-950">{label as string}</p>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-neutral-100">
              <div className="case-progress h-full rounded-full" style={{ '--target-width': `${(index + 1) * 24}%`, backgroundColor: theme.accent } as React.CSSProperties} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ReadAloudMotionDemo: React.FC<{ theme: CaseTheme }> = ({ theme }) => (
  <BrowserChrome className="h-full">
    <div className="grid gap-4 bg-[#F7F8FC] p-4 lg:grid-cols-[0.58fr_0.42fr]">
      <div className="rounded-2xl bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <span className="h-3 w-3 rounded-full" style={{ backgroundColor: theme.accent3 }} />
          <span className="text-sm font-semibold text-neutral-900">Document reading</span>
        </div>
        <div className="space-y-3">
          {[92, 74, 86].map((width, index) => (
            <div key={index} className="h-3 rounded-full bg-neutral-100" style={{ width: `${width}%` }} />
          ))}
        </div>
        <div className="case-highlight mt-5 rounded-xl p-4" style={{ backgroundColor: theme.soft }}>
          <div className="h-3 w-2/3 rounded-full" style={{ backgroundColor: theme.accent }} />
          <p className="mt-3 text-xs leading-5 text-neutral-500">The highlighted line follows the reading position while Copilot Voice remains active.</p>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          {['Original', 'Summary', 'Ask'].map((item, index) => (
            <button
              key={item}
              type="button"
              className={`rounded-full border px-3 py-2 text-xs font-semibold transition ${index === 0 ? 'text-white' : 'bg-white text-neutral-500 hover:-translate-y-0.5 hover:border-[#425BFF]/30 hover:text-[#425BFF]'}`}
              style={index === 0 ? { backgroundColor: theme.accent, borderColor: theme.accent } : { borderColor: '#E5E7EB' }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="rounded-2xl bg-[#121522] p-5 text-white shadow-[0_18px_60px_rgba(0,0,0,0.2)]">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-sm font-semibold">Copilot Voice</span>
          <span className="rounded-full bg-white/10 px-2.5 py-1 text-[10px] text-white/60">Listening</span>
        </div>
        <VoiceWave color={theme.accent3} />
        <div className="mt-5 space-y-2">
          {['What is the key point?', 'Summarize this section', 'Continue reading'].map((item) => (
            <button key={item} type="button" className="block w-full rounded-full bg-white/10 px-3 py-2 text-left text-[12px] text-white/68 transition hover:bg-white hover:text-[#11131F]">
              {item}
            </button>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between rounded-full bg-white px-3 py-2 text-[#11131F]">
          <Pause size={16} />
          <div className="mx-3 h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-200">
            <div className="case-progress h-full rounded-full" style={{ '--target-width': '68%', backgroundColor: theme.accent } as React.CSSProperties} />
          </div>
          <button type="button" className="grid h-8 w-8 place-items-center rounded-full transition hover:scale-110 hover:text-white" style={{ backgroundColor: `${theme.accent2}22` }}>
            <Mic2 size={16} />
          </button>
        </div>
      </div>
    </div>
  </BrowserChrome>
);

const RDAgentMotionDemo: React.FC<{ theme: CaseTheme }> = ({ theme }) => (
  <BrowserChrome dark>
    <div className="grid min-h-[500px] bg-[#081512] text-white lg:grid-cols-[210px_1fr]">
      <aside className="border-b border-white/10 p-5 lg:border-b-0 lg:border-r">
        <div className="mb-8 flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ backgroundColor: theme.accent }}>
            <FlaskConical size={16} />
          </span>
          <span className="text-sm font-semibold">Research OS</span>
        </div>
        {['Overview', 'Idea Lab', 'Experiment Trace', 'Reports'].map((item, index) => (
          <button key={item} type="button" className={`mb-2 block w-full rounded-xl px-3 py-2 text-left text-[12px] transition ${index === 1 ? 'bg-white text-[#0B1F1A]' : 'text-white/48 hover:bg-white/10 hover:text-white'}`}>
            {item}
          </button>
        ))}
      </aside>
      <main className="p-5">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.24em] text-white/38">Hypothesis detail</p>
            <h3 className="mt-2 text-2xl font-semibold">Can signal fusion improve forecast stability?</h3>
          </div>
          <button type="button" className="rounded-full bg-white/10 px-3 py-1.5 text-[11px] text-white/58 transition hover:bg-white hover:text-[#0B1F1A]">Agent running</button>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_0.68fr]">
          <div className="rounded-2xl bg-white p-5 text-[#0B1F1A]">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-semibold">Experiment pipeline</span>
              <span className="text-xs text-neutral-400">4 stages</span>
            </div>
            {[
              ['Data discovery', 'completed', '100%'],
              ['Feature proposal', 'completed', '100%'],
              ['Backtest script', 'running', '66%'],
              ['Metric report', 'queued', '24%'],
            ].map(([title, status, width]) => (
              <div key={title} className="mb-4 rounded-xl p-2 transition hover:bg-neutral-50 last:mb-0">
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span>{title}</span>
                  <span className="capitalize text-neutral-400">{status}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-neutral-100">
                  <div className="case-progress h-full rounded-full" style={{ '--target-width': width, backgroundColor: theme.accent } as React.CSSProperties} />
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-white/[0.07] p-5">
            <p className="mb-4 text-sm font-semibold">Agent reasoning</p>
            {['Pull prior experiments', 'Compare metric drift', 'Recommend next run'].map((item, index) => (
              <button key={item} type="button" className="mb-3 flex w-full items-center gap-3 rounded-xl bg-white/[0.06] p-3 text-left text-sm text-white/70 transition hover:-translate-y-0.5 hover:bg-white/[0.12] hover:text-white">
                <span className="grid h-6 w-6 place-items-center rounded-full text-[11px]" style={{ backgroundColor: index === 2 ? theme.accent3 : theme.accent }}>
                  {index + 1}
                </span>
                {item}
              </button>
            ))}
          </div>
        </div>
      </main>
    </div>
  </BrowserChrome>
);

const HoverStateBoard: React.FC<{ theme: CaseTheme; isZh: boolean; isRd: boolean }> = ({ theme, isZh, isRd }) => (
  <div className="grid gap-5 lg:grid-cols-[0.48fr_0.52fr]">
    <div className="rounded-[22px] border border-black/[0.06] bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center gap-2">
        <MousePointer2 size={18} style={{ color: theme.accent }} />
        <p className="text-sm font-semibold text-neutral-950">{isZh ? '按钮状态' : 'Button states'}</p>
      </div>
      <div className="space-y-3">
        {[
          ['Default', 'bg-white text-neutral-700 border-neutral-200'],
          ['Hover', 'text-white shadow-[0_14px_30px_rgba(15,23,42,0.16)]'],
          ['Pressed', 'text-white translate-y-[1px] shadow-inner'],
          ['Focus', 'bg-white text-neutral-900 ring-4'],
        ].map(([label, className], index) => (
          <div key={label} className="flex items-center justify-between rounded-2xl bg-neutral-50 p-3">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-400">{label}</span>
            <button
              type="button"
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${className}`}
              style={index === 0 ? undefined : index === 3 ? { borderColor: theme.accent, boxShadow: `0 0 0 4px ${theme.accent}20` } : { backgroundColor: theme.accent, borderColor: theme.accent }}
            >
              {isRd ? <Wand2 size={15} /> : <Mic2 size={15} />}
              {isRd ? 'Run agent' : 'Ask Copilot'}
            </button>
          </div>
        ))}
      </div>
    </div>

    <div className="rounded-[22px] border border-black/[0.06] p-5 shadow-sm" style={{ backgroundColor: theme.paper }}>
      <div className="mb-5 flex items-center gap-2">
        <Grid2X2 size={18} style={{ color: theme.accent }} />
        <p className="text-sm font-semibold text-neutral-950">{isZh ? '可交互组件' : 'Interactive components'}</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <button type="button" className="group rounded-2xl bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,0.13)]">
          <div className="mb-5 flex items-center justify-between">
            <span className="grid h-10 w-10 place-items-center rounded-full text-white transition group-hover:scale-110" style={{ backgroundColor: theme.accent }}>
              {isRd ? <Bot size={17} /> : <Volume2 size={17} />}
            </span>
            <ArrowRight className="text-neutral-300 transition group-hover:translate-x-1 group-hover:text-neutral-950" size={17} />
          </div>
          <p className="text-sm font-semibold text-neutral-950">{isRd ? 'Hypothesis card' : 'Voice card'}</p>
          <p className="mt-2 text-xs leading-5 text-neutral-500">{isZh ? '鼠标悬停时提升、阴影和图标反馈。' : 'Lift, shadow, and icon feedback on hover.'}</p>
        </button>

        <div className="rounded-2xl bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-neutral-950">{isZh ? '状态切换' : 'State switch'}</p>
          <div className="mt-4 flex rounded-full bg-neutral-100 p-1">
            {['A', 'B', 'C'].map((item, index) => (
              <button
                key={item}
                type="button"
                className={`h-8 flex-1 rounded-full text-xs font-semibold transition ${index === 1 ? 'text-white shadow-sm' : 'text-neutral-500 hover:bg-white hover:text-neutral-900'}`}
                style={index === 1 ? { backgroundColor: theme.accent } : undefined}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-xl border border-dashed border-neutral-200 p-3 text-xs leading-5 text-neutral-500">
            {isZh ? '用于展示模式切换、Agent 状态或 Voice 状态。' : 'For mode switches, agent states, or voice states.'}
          </div>
        </div>
      </div>
    </div>
  </div>
);

const StateSystem: React.FC<{ section?: CaseSection; theme: CaseTheme }> = ({ section, theme }) => (
  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
    {(section?.items || []).map((item) => (
      <div key={item.title} className="rounded-[18px] border border-black/[0.05] bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-[0_18px_42px_rgba(15,23,42,0.12)]">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-neutral-50">
          <span className="case-pulse h-7 w-7 rounded-full" style={{ backgroundColor: item.color || theme.accent }} />
        </div>
        <p className="mt-4 text-sm font-semibold text-neutral-950">{item.title}</p>
        <p className="mt-2 text-xs leading-5 text-neutral-500">{item.description}</p>
      </div>
    ))}
  </div>
);

const buildPages = (project: Project, isZh: boolean): { pages: CasePage[]; theme: CaseTheme } => {
  const sections = project.caseSections || [];
  const isRd = project.id === 'p5';
  const theme = isRd ? rdTheme : readTheme;
  const hero = getSection(sections, 'hero');
  const stats = getSection(sections, 'stats');
  const personas = getSection(sections, 'personas');
  const pain = getSection(sections, 'cards');
  const flow = getSection(sections, 'flow');
  const principles = getSection(sections, 'principles');
  const strategy = getSection(sections, 'two-column');
  const system = getSection(sections, 'voice-states');
  const mockups = getSections(sections, 'annotated-mockup');
  const interaction = getSection(sections, 'interaction-path');
  const rhythm = getSection(sections, 'state-flow');
  const validation = getSection(sections, 'validation');
  const role = getSection(sections, 'text');
  const outcomes = getSection(sections, 'outcomes');

  const pages: CasePage[] = [
    {
      id: 'case-cover',
      label: isZh ? '封面' : 'Cover',
      eyebrow: 'Project overview',
      title: project.title,
      subtitle: hero?.subtitle,
      node: (
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
          <div>
            <PageHeader eyebrow="Project overview" title={project.title} subtitle={hero?.title} theme={theme} />
            <div className="mt-6 flex flex-wrap gap-2">
              {(hero?.tags || project.tags || []).map((tag) => (
                <span key={tag} className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-[11px] font-medium text-neutral-600">
                  {tag}
                </span>
              ))}
            </div>
            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-500">{hero?.subtitle || project.shortDescription}</p>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                [isZh ? '角色' : 'Role', hero?.role || project.role],
                [isZh ? '时间' : 'Duration', hero?.date || project.year],
                [isZh ? '平台' : 'Platform', project.platform],
              ].map(([label, value]) => (
                <div key={label} className="border-t border-black/10 pt-3">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-neutral-400">{label}</p>
                  <p className="mt-1 text-[13px] font-semibold text-neutral-800">{value}</p>
                </div>
              ))}
            </div>
          </div>
          {isRd ? <RdHeroVisual theme={theme} /> : <ReadHeroVisual theme={theme} />}
        </div>
      ),
    },
    {
      id: 'case-overview',
      label: isZh ? '背景与数据' : 'Context',
      title: stats?.title || 'Background',
      subtitle: stats?.content || stats?.subtitle,
      node: (
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <PageHeader eyebrow={stats?.category || stats?.label} title={stats?.title || 'Background'} subtitle={stats?.content || stats?.subtitle} theme={theme} />
          <MetricGrid stats={stats?.stats} theme={theme} />
        </div>
      ),
    },
    {
      id: 'case-users',
      label: isZh ? '用户与痛点' : 'Users',
      title: personas?.title || pain?.title || 'Target users',
      subtitle: pain?.content,
      node: (
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <PageHeader eyebrow={personas?.label} title={personas?.title || 'Target users'} subtitle={personas?.subtitle} theme={theme} />
            <div className="mt-6 space-y-3">
              {(personas?.items || []).map((item) => (
                <div key={item.title} className="rounded-[18px] border border-black/[0.05] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_16px_38px_rgba(15,23,42,0.11)]">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-full text-[22px]" style={{ backgroundColor: `${item.color || theme.accent}18` }}>
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-[17px] font-semibold">{item.title}</p>
                      {item.subtitle ? <p className="mt-1 text-xs font-medium" style={{ color: item.color || theme.accent }}>{item.subtitle}</p> : null}
                      <p className="mt-2 text-sm leading-6 text-neutral-500">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <PageHeader eyebrow={pain?.label} title={pain?.title || 'Pain points'} subtitle={pain?.content} theme={theme} />
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {(pain?.items || []).map((item, index) => (
                <div key={item.title} className="rounded-[18px] p-5 shadow-sm transition hover:-translate-y-1" style={{ backgroundColor: theme.paper }}>
                  <span className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: theme.accent }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="mt-4 text-[16px] font-semibold text-neutral-950">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-neutral-500">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'case-flow',
      label: isZh ? '工作流' : 'Workflow',
      title: flow?.title || 'Workflow',
      subtitle: flow?.content || flow?.subtitle,
      node: (
        <div>
          <PageHeader eyebrow={flow?.label} title={flow?.title || 'Workflow'} subtitle={flow?.content || flow?.subtitle} theme={theme} />
          <div className="mt-8">
            <FlowVisual projectId={project.id} theme={theme} />
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {(principles?.items || []).map((item, index) => (
              <div key={item.title} className="border-t pt-5" style={{ borderColor: `${theme.accent}40` }}>
                <p className="font-serif text-[52px] leading-none" style={{ color: theme.accent }}>
                  {String(item.number || index + 1).padStart(2, '0')}
                </p>
                <p className="mt-4 text-xl font-semibold text-neutral-950">{item.title}</p>
                {item.subtitle ? <p className="mt-1 text-sm font-semibold" style={{ color: theme.accent }}>{item.subtitle}</p> : null}
                <p className="mt-3 text-sm leading-6 text-neutral-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      ),
    },
    {
      id: 'case-system',
      label: isZh ? '策略与系统' : 'System',
      title: strategy?.title || system?.title || 'Design system',
      subtitle: strategy?.subtitle || system?.content,
      node: (
        <div>
          <PageHeader eyebrow={strategy?.label} title={strategy?.title || 'Design strategy'} subtitle={strategy?.subtitle} theme={theme} />
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {(strategy?.columns || []).map((column) => (
              <div key={column.title} className="rounded-[18px] p-5 text-white" style={{ backgroundColor: theme.dark }}>
                <p className="text-xl font-semibold">{column.title}</p>
                <div className="mt-5 space-y-3">
                  {column.items.map((item) => (
                    <div key={item} className="flex items-start gap-3 text-sm leading-6 text-white/62">
                      <CheckCircle2 className="mt-1 flex-shrink-0" size={16} style={{ color: theme.accent3 }} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <PageHeader eyebrow={system?.category || system?.label} title={system?.title || 'State system'} subtitle={system?.content || system?.subtitle} theme={theme} />
            <div className="mt-6">
              <StateSystem section={system} theme={theme} />
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'case-motion',
      label: isZh ? '动效展示' : 'Motion',
      title: isZh ? '把动图和关键状态放进页面里' : 'Motion and live states inside the document',
      subtitle: isZh ? '这里不是静态截图，波形、进度条、按钮 hover 都保留为真实网页状态。' : 'This page keeps motion, progress, and hoverable UI states as real web interactions rather than flat screenshots.',
      node: (
        <div>
          <PageHeader
            eyebrow={mockups[0]?.category || 'Interaction demo'}
            title={isZh ? '动效与产品界面展示' : 'Motion and product UI demo'}
            subtitle={isZh ? '鼠标悬停按钮、建议项和卡片时可以看到组件反馈。' : 'Hover buttons, chips, and cards to see component feedback.'}
            theme={theme}
          />
          <div className="mt-8">
            {isRd ? <RDAgentMotionDemo theme={theme} /> : <ReadAloudMotionDemo theme={theme} />}
          </div>
        </div>
      ),
    },
    {
      id: 'case-hover',
      label: isZh ? 'Hover 状态' : 'Hover states',
      title: isZh ? '按钮与组件状态' : 'Button and component states',
      subtitle: isZh ? '专门把 hover、pressed、focus 和组件切换状态展示出来，便于看交互细节。' : 'A dedicated page for hover, pressed, focus, and component transition states.',
      node: (
        <div>
          <PageHeader eyebrow="Component states" title={isZh ? '按钮与组件状态展示' : 'Button and component states'} subtitle={isZh ? '这页可以直接用来展示设计规范里的状态变化。' : 'Use this page as a compact interaction-spec surface.'} theme={theme} />
          <div className="mt-8">
            <HoverStateBoard theme={theme} isZh={isZh} isRd={isRd} />
          </div>
        </div>
      ),
    },
    {
      id: 'case-validation',
      label: isZh ? '验证与影响' : 'Impact',
      title: validation?.title || outcomes?.title || 'Impact',
      subtitle: validation?.subtitle || outcomes?.subtitle,
      node: (
        <div className="grid gap-8 lg:grid-cols-[0.52fr_0.48fr]">
          <div>
            <PageHeader eyebrow={validation?.category || validation?.label} title={validation?.title || 'Validation'} subtitle={validation?.subtitle || validation?.content} theme={theme} />
            <div className="mt-6">
              <MetricGrid stats={validation?.stats} theme={theme} />
            </div>
            <div className="mt-5 grid gap-3">
              {(validation?.quotes || []).slice(0, 3).map((quote) => (
                <div key={quote.text} className="rounded-[18px] bg-neutral-50 p-4">
                  <div className="flex gap-3">
                    <span className="text-2xl">{quote.avatar}</span>
                    <p className="text-sm leading-6 text-neutral-600">"{quote.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[24px] p-6 text-white" style={{ backgroundColor: theme.dark }}>
            <PageHeader eyebrow={role?.label || outcomes?.label || 'Outcome'} title={outcomes?.content || outcomes?.title || 'Outcome'} subtitle={outcomes?.subtitle || role?.content} theme={theme} dark />
            <div className="mt-8 grid gap-3">
              {(outcomes?.items || []).map((item) => (
                <div key={item.title} className="rounded-[16px] bg-white/[0.07] p-4 transition hover:bg-white/[0.12]">
                  <p className="text-sm font-semibold text-white">{item.title}</p>
                  <p className="mt-1 text-xs leading-5 text-white/46">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ),
    },
  ];

  return { pages, theme };
};

const PortfolioCaseStudyView: React.FC<PortfolioCaseStudyViewProps> = ({ project, isZh }) => {
  const { pages, theme } = buildPages(project, isZh);

  return (
    <div className="case-document bg-[#3A3A3A] text-neutral-950">
      <style>
        {`
          .case-wave-bar { animation: caseWave 1.35s ease-in-out infinite; transform-origin: center; }
          .case-progress { width: 0; animation: caseProgress 1.8s ease-out forwards; }
          .case-highlight { animation: caseHighlight 2.4s ease-in-out infinite; }
          .case-pulse { animation: casePulse 1.8s ease-in-out infinite; }
          @keyframes caseWave {
            0%, 100% { transform: scaleY(.48); }
            50% { transform: scaleY(1.05); }
          }
          @keyframes caseProgress {
            from { width: 0; }
            to { width: var(--target-width, 70%); }
          }
          @keyframes caseHighlight {
            0%, 100% { box-shadow: inset 0 0 0 1px rgba(66,91,255,.12); }
            50% { box-shadow: inset 0 0 0 1px rgba(66,91,255,.28), 0 14px 34px rgba(66,91,255,.12); }
          }
          @keyframes casePulse {
            0%, 100% { transform: scale(.84); opacity: .62; }
            50% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
      <PdfToolbar project={project} pages={pages} theme={theme} isZh={isZh} />
      <MobileThumbs pages={pages} theme={theme} />
      <div className="mx-auto flex max-w-[1500px]">
        <ThumbnailRail pages={pages} theme={theme} />
        <main className="min-w-0 flex-1 px-3 py-5 sm:px-6 sm:py-8 lg:px-10">
          <div className="mx-auto max-w-[1180px] space-y-8 pb-12">
            {pages.map((page, index) => (
              <DocumentPage key={page.id} page={page} index={index} total={pages.length} theme={theme}>
                {page.node}
              </DocumentPage>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default PortfolioCaseStudyView;

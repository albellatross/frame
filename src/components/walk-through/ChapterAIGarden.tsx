import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, MessageCircle, Palette, Wand2, Workflow } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { zhWalkthroughType } from './typography';

interface Props {
  data: {
    whyAI: string;
    explorations: Array<{ label: string; desc: string }>;
    artworks: string[];
  };
  onNext: () => void;
  onPrev: () => void;
}

const ChapterAIGarden: React.FC<Props> = ({ data }) => {
  const { language } = useLanguage();
  const items = data.explorations.slice(0, 5);
  const icons = [Palette, Wand2, MessageCircle, Workflow, Code2];
  const sectionLabel = language === 'zh' ? 'AI 花园' : 'AI Garden';
  const cardSize = { width: 'clamp(250px, 16.5vw, 298px)', height: 'clamp(250px, 27vh, 290px)' } as const;
  const desktopCardLayouts: React.CSSProperties[] = [
    { left: '0%', top: '30%', ...cardSize },
    { left: '35%', top: '0%', ...cardSize },
    { left: '70%', top: '12%', ...cardSize },
    { left: '35%', top: '55%', ...cardSize },
    { left: '70%', top: '57%', ...cardSize },
  ];
  const mediumCardLayouts = [
    'col-start-1 row-start-2',
    'col-start-2 row-start-1',
    'col-start-2 row-start-2 mt-2',
    'col-start-1 row-start-3',
    'col-start-2 row-start-3',
  ];
  const introCopy = language === 'zh'
    ? (
        <>
          我喜欢 AI。
          <br />
          我一直在探索它如何帮助我们
          <br />
          以更人的方式去创造、理解与连接。
        </>
      )
    : data.whyAI;
  const sectionLabelClass = language === 'zh'
    ? `${zhWalkthroughType.micro} text-[11px] text-[#6c5740]`
    : 'font-mono text-[11px] uppercase tracking-[0.18em] text-[#6c5740]';
  const desktopTextClass = 'absolute left-[64px] top-[192px] z-10 w-[392px]';
  const desktopCardsCanvasClass = 'absolute right-[130px] top-[130px] h-[min(74vh,780px)] w-[min(58vw,900px)] 2xl:right-[170px]';
  const desktopGlowClass = 'absolute -left-18 -top-18 -z-10 h-[430px] w-[560px] rounded-full bg-[radial-gradient(circle_at_center,rgba(248,244,236,0.88),rgba(248,244,236,0.62)_34%,rgba(248,244,236,0.24)_54%,transparent_78%)] blur-[24px]';
  const desktopTitleClass = language === 'zh'
    ? 'font-zh-display font-medium tracking-[-0.02em] leading-[0.98] text-[64px] text-[#402313]'
    : 'font-serif text-[72px] italic tracking-[-0.02em] leading-[0.98] text-[#402313]';
  const mediumTitleClass = language === 'zh'
    ? 'font-zh-display font-medium tracking-[-0.02em] leading-[1.02] text-[62px] text-[#402313]'
    : 'font-serif text-[62px] italic tracking-[-0.02em] leading-[1.02] text-[#402313]';
  const introBodyClass = language === 'zh'
    ? 'mt-6 max-w-[430px] font-zh-body text-[18px] font-normal tracking-[0.01em] leading-[1.72] text-[rgba(64,35,19,0.82)]'
    : 'mt-6 max-w-[460px] font-sans text-[20px] font-normal leading-[1.72] text-[rgba(64,35,19,0.82)]';
  const cardClass = language === 'zh'
    ? 'overflow-hidden rounded-[34px] border border-white/58 bg-[linear-gradient(165deg,rgba(247,241,231,0.76)_0%,rgba(238,229,212,0.6)_100%)] px-8 pb-6 pt-6 shadow-[0_20px_44px_rgba(84,53,28,0.12),inset_0_1px_0_rgba(255,255,255,0.54)] backdrop-blur-[18px]'
    : 'overflow-hidden rounded-[34px] border border-white/58 bg-[linear-gradient(165deg,rgba(247,241,231,0.72)_0%,rgba(238,229,212,0.56)_100%)] px-8 pb-6 pt-6 shadow-[0_20px_44px_rgba(84,53,28,0.12),inset_0_1px_0_rgba(255,255,255,0.54)] backdrop-blur-[18px]';
  const cardHighlightClass = 'pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.4),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.08),transparent_36%)]';
  const cardTitleClass = language === 'zh'
    ? 'mt-5 font-zh-body text-[19px] font-medium tracking-[0.01em] leading-[1.34] text-[#3b2416]'
    : 'mt-5 font-sans text-[19px] font-semibold leading-[1.32] text-[#3b2416]';
  const cardDescClass = language === 'zh'
    ? 'mt-3.5 font-zh-body text-[14px] font-normal tracking-[0.01em] leading-[1.72] text-[rgba(59,36,22,0.78)]'
    : 'mt-3.5 font-sans text-[14px] font-normal leading-[1.72] text-[rgba(59,36,22,0.78)]';
  const arrowButtonClass = 'mt-auto flex h-[50px] w-[50px] min-h-[50px] min-w-[50px] shrink-0 items-center justify-center self-end rounded-full border border-white/72 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(246,240,231,0.84))] text-[#6a4a2b] shadow-[0_10px_20px_rgba(84,53,28,0.09),inset_0_1px_0_rgba(255,255,255,0.88)]';
  const mediumCardClass = language === 'zh'
    ? 'relative overflow-hidden rounded-[30px] border border-white/54 bg-[linear-gradient(165deg,rgba(245,238,225,0.78)_0%,rgba(236,226,209,0.64)_100%)] px-6 pb-6 pt-6 shadow-[0_14px_32px_rgba(84,53,28,0.11),inset_0_1px_0_rgba(255,255,255,0.52)] backdrop-blur-[18px]'
    : 'relative overflow-hidden rounded-[30px] border border-white/54 bg-[linear-gradient(165deg,rgba(245,238,225,0.72)_0%,rgba(236,226,209,0.6)_100%)] px-6 pb-6 pt-6 shadow-[0_14px_32px_rgba(84,53,28,0.11),inset_0_1px_0_rgba(255,255,255,0.52)] backdrop-blur-[18px]';
  const mediumCardTitleClass = language === 'zh'
    ? 'mt-4 font-zh-body text-[17px] font-medium tracking-[0.01em] leading-[1.32] text-[#3b2416]'
    : 'mt-4 font-sans text-[17px] font-semibold leading-[1.32] text-[#3b2416]';
  const mediumCardDescClass = language === 'zh'
    ? 'mt-3 font-zh-body text-[14px] font-normal tracking-[0.01em] leading-[1.64] text-[rgba(59,36,22,0.78)]'
    : 'mt-3 font-sans text-[14px] font-normal leading-[1.64] text-[rgba(59,36,22,0.78)]';
  const mediumArrowButtonClass = 'mt-auto flex h-[44px] w-[44px] min-h-[44px] min-w-[44px] shrink-0 items-center justify-center self-end rounded-full border border-white/72 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(246,240,231,0.84))] text-[#6a4a2b] shadow-[0_10px_20px_rgba(84,53,28,0.09),inset_0_1px_0_rgba(255,255,255,0.88)]';
  const mobileIntroClass = language === 'zh'
    ? 'rounded-[30px] border border-white/58 bg-[linear-gradient(145deg,rgba(242,234,220,0.78),rgba(236,227,213,0.62))] p-6 shadow-[0_16px_40px_rgba(84,53,28,0.1)] backdrop-blur-[16px]'
    : 'rounded-[30px] border border-white/58 bg-[linear-gradient(145deg,rgba(242,234,220,0.74),rgba(236,227,213,0.58))] p-6 shadow-[0_16px_40px_rgba(84,53,28,0.1)] backdrop-blur-[16px]';
  const mobileLabelClass = language === 'zh'
    ? `${zhWalkthroughType.micro} text-[11px] text-[#6c5740]`
    : 'font-mono text-[11px] uppercase tracking-[0.18em] text-[#6c5740]';
  const mobileTitleClass = language === 'zh'
    ? 'mt-4 font-zh-display text-[40px] font-medium tracking-[-0.02em] leading-[1.04] text-[#402313] sm:text-[46px]'
    : 'mt-4 font-serif text-[42px] italic text-dark-brown';
  const mobileBodyClass = language === 'zh'
    ? 'mt-5 whitespace-pre-line font-zh-body text-[17px] leading-[1.7] text-[rgba(64,35,19,0.82)]'
    : 'mt-5 whitespace-pre-line font-sans text-[17px] leading-[1.7] text-[rgba(64,35,19,0.82)]';
  const mobileCardClass = language === 'zh'
    ? 'relative overflow-hidden rounded-[30px] border border-white/56 bg-[linear-gradient(165deg,rgba(245,238,225,0.8)_0%,rgba(236,226,209,0.68)_100%)] px-6 pb-6 pt-6 shadow-[0_14px_34px_rgba(84,53,28,0.11),inset_0_1px_0_rgba(255,255,255,0.54)] backdrop-blur-[18px]'
    : 'relative overflow-hidden rounded-[30px] border border-white/56 bg-[linear-gradient(165deg,rgba(245,238,225,0.76)_0%,rgba(236,226,209,0.64)_100%)] px-6 pb-6 pt-6 shadow-[0_14px_34px_rgba(84,53,28,0.11),inset_0_1px_0_rgba(255,255,255,0.54)] backdrop-blur-[18px]';
  const mobileCardTitleClass = language === 'zh'
    ? 'mt-4 font-zh-body text-[18px] font-medium leading-[1.34] text-[#3b2416]'
    : 'mt-4 font-sans text-[18px] font-semibold leading-[1.34] text-[#3b2416]';
  const mobileCardDescClass = language === 'zh'
    ? 'mt-3 font-zh-body text-[14px] leading-[1.68] text-[rgba(59,36,22,0.78)]'
    : 'mt-3 font-sans text-[14px] leading-[1.68] text-[rgba(59,36,22,0.78)]';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.6 }}
      className="relative h-full w-full overflow-y-auto overflow-x-hidden overscroll-contain xl:overflow-hidden"
    >
      <video src="/background/04.mp4" autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover brightness-[0.94] saturate-[0.92]" />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(248,244,236,0.76)_0%,rgba(248,244,236,0.62)_22%,rgba(248,244,236,0.28)_46%,rgba(248,244,236,0.06)_64%,rgba(59,35,14,0.1)_100%)]" />
      <div className="absolute inset-y-0 left-0 w-[62%] bg-[linear-gradient(90deg,rgba(248,244,236,0.88)_0%,rgba(248,244,236,0.72)_24%,rgba(248,244,236,0.42)_48%,rgba(248,244,236,0)_72%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_42%,rgba(249,245,238,0.9),rgba(249,245,238,0.56)_28%,rgba(249,245,238,0.1)_48%,transparent_66%),radial-gradient(circle_at_80%_22%,rgba(255,248,235,0.18),transparent_26%),radial-gradient(circle_at_center,rgba(255,250,241,0.14),rgba(255,250,241,0.04)_34%,rgba(41,31,16,0.14)_84%,rgba(41,31,16,0.22)_100%)]" />

      <div className="relative z-10 h-full w-full">
        <div className="hidden xl:block">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className={desktopTextClass}
          >
            <div className={desktopGlowClass} />
            <div className={sectionLabelClass}>{sectionLabel}</div>
            <h2 className={`mt-5 ${desktopTitleClass}`}>
              {language === 'zh' ? (
                <>
                  <span className="block">
                    AI 让想象
                    <br />
                    可触。
                  </span>
                </>
              ) : (
                'AI makes imagination tangible.'
              )}
            </h2>
            <p className={introBodyClass}>{introCopy}</p>
          </motion.div>

          <div className={desktopCardsCanvasClass}>
            {items.map((item, index) => {
              const Icon = icons[index] || Palette;

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28 + index * 0.08 }}
                  style={desktopCardLayouts[index]}
                  className={`absolute flex flex-col ${cardClass}`}
                >
                  <div className={cardHighlightClass} />
                  <Icon size={27} strokeWidth={2} className="text-[rgba(59,36,22,0.92)]" />
                  <h3 className={cardTitleClass}>{item.label}</h3>
                  <p className={cardDescClass}>{item.desc}</p>
                  <div className={arrowButtonClass}>
                    <ArrowRight size={19} strokeWidth={2.2} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="hidden px-10 pb-16 pt-20 lg:grid lg:grid-cols-[minmax(320px,380px)_minmax(0,1fr)] lg:gap-8 xl:hidden">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="relative"
          >
            <div className="absolute -left-8 top-[-36px] -z-10 h-[340px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(248,244,236,0.82),rgba(248,244,236,0.5)_42%,transparent_78%)] blur-[18px]" />
            <div className={sectionLabelClass}>{sectionLabel}</div>
            <h2 className={`mt-5 ${mediumTitleClass}`}>
              {language === 'zh' ? (
                <>
                  AI 让想象
                  <br />
                  可触。
                </>
              ) : (
                'AI makes imagination tangible.'
              )}
            </h2>
            <p className={introBodyClass}>{introCopy}</p>
          </motion.div>

          <div className="grid max-w-[560px] grid-cols-2 gap-x-4 gap-y-4 justify-self-end pt-2">
            {items.map((item, index) => {
              const Icon = icons[index] || Palette;

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + index * 0.07 }}
                  className={`flex min-h-[220px] flex-col ${mediumCardLayouts[index]} ${mediumCardClass}`}
                >
                  <div className={cardHighlightClass} />
                  <Icon size={22} strokeWidth={1.9} className="text-[rgba(59,36,22,0.92)]" />
                  <h3 className={mediumCardTitleClass}>{item.label}</h3>
                  <p className={mediumCardDescClass}>{item.desc}</p>
                  <div className={mediumArrowButtonClass}>
                    <ArrowRight size={17} strokeWidth={2.2} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="px-5 pb-28 pt-24 sm:px-8 sm:pt-28 lg:hidden">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className={mobileIntroClass}
          >
            <div className={mobileLabelClass}>{sectionLabel}</div>
            <h2 className={mobileTitleClass}>
              {language === 'zh' ? 'AI 让想象可触。' : 'AI makes imagination tangible.'}
            </h2>
            <p className={mobileBodyClass}>{introCopy}</p>
          </motion.div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {items.map((item, index) => {
              const Icon = icons[index] || Palette;

              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22 + index * 0.07 }}
                  className={`flex min-h-[214px] flex-col ${mobileCardClass}`}
                >
                  <div className={cardHighlightClass} />
                  <Icon size={22} strokeWidth={1.9} className="text-[rgba(59,36,22,0.92)]" />
                  <h3 className={mobileCardTitleClass}>{item.label}</h3>
                  <p className={mobileCardDescClass}>{item.desc}</p>
                  <div className={arrowButtonClass}>
                    <ArrowRight size={18} strokeWidth={2.2} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChapterAIGarden;

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import { assetUrl } from '../../utils/assets';
import { IpUniverseModal } from './CreativeArchiveModal';
import { IP_UNIVERSE_ASSETS } from './creativeArchiveAssets';
import { zhWalkthroughType } from './typography';

interface Props {
  data: {
    intro: string;
    ipStory: string;
    characters: Array<{ name: string; image: string; desc: string }>;
    applications: string[];
  };
  onNext: () => void;
  onPrev: () => void;
}

const ChapterVisualStudio: React.FC<Props> = ({ data, onNext, onPrev }) => {
  const { language } = useLanguage();
  const [isIpOpen, setIsIpOpen] = useState(false);
  const swatches = ['#f4eee3', '#c6c6a0', '#b8b18b', '#e4d6bd', '#f1d2b2', '#daa875', '#a6bfd6'];
  const usageCards = language === 'zh'
    ? ['头像', '横幅', '贴纸']
    : ['Avatar', 'Banner', 'Stickers'];
  const sectionLabels = language === 'zh'
    ? {
        evolution: '角色进化',
        before: '之前',
        after: '现在',
        usage: '我的 IP 用法',
        palette: '色彩与氛围',
        cta: '进入我的 IP 宇宙 →',
      }
    : {
        evolution: 'Character Evolution',
        before: 'Before',
        after: 'After',
        usage: 'Ways I Use My IP',
        palette: 'Color Palette & Mood',
        cta: 'Explore My IP Corner →',
      };
  const titleClass = language === 'zh'
    ? `${zhWalkthroughType.displayL} text-[48px] text-dark-brown sm:text-[56px] lg:text-[64px]`
    : 'font-serif text-5xl italic tracking-tight leading-[0.98] text-dark-brown sm:text-6xl lg:text-[68px]';
  const sectionLabelClass = language === 'zh'
    ? `${zhWalkthroughType.micro} text-[11px] text-neutral-500`
    : 'font-mono text-sm uppercase tracking-[0.18em] text-neutral-500';
  const subLabelClass = language === 'zh'
    ? `${zhWalkthroughType.microTight} text-[10px] text-neutral-400`
    : 'font-mono text-xs uppercase tracking-[0.14em] text-neutral-400';
  const afterLabelClass = language === 'zh'
    ? `${zhWalkthroughType.microTight} text-[10px] text-neutral-500`
    : 'font-mono text-xs uppercase tracking-[0.14em] text-neutral-500';
  const pillLabelClass = language === 'zh'
    ? `rounded-full bg-dark-brown px-2 py-1 ${zhWalkthroughType.microTight} text-[10px] text-white`
    : 'rounded-full bg-dark-brown px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white';
  const pillLabelDesktopClass = language === 'zh'
    ? `rounded-full bg-dark-brown px-2.5 py-1 ${zhWalkthroughType.microTight} text-[10px] text-white`
    : 'rounded-full bg-dark-brown px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white';
  const itemLabelClass = language === 'zh'
    ? `${zhWalkthroughType.microTight} text-[11px] text-neutral-500`
    : 'font-mono text-xs uppercase tracking-[0.14em] text-neutral-400';
  const bodyClass = language === 'zh'
    ? `${zhWalkthroughType.bodyL} mx-auto mt-5 max-w-[760px] whitespace-pre-line text-[18px] text-neutral-600 sm:text-[20px] lg:text-[22px]`
    : 'mx-auto mt-5 max-w-2xl whitespace-pre-line font-sans text-lg leading-relaxed text-neutral-600';
  const ctaClass = language === 'zh'
    ? `mt-8 rounded-full bg-dark-brown px-8 py-4 ${zhWalkthroughType.ui} text-[15px] text-white shadow-button hover:shadow-button-hover`
    : 'mt-8 rounded-full bg-dark-brown px-8 py-4 font-sans text-base font-medium text-white shadow-button hover:shadow-button-hover';
  const helperTextClass = language === 'zh'
    ? `${zhWalkthroughType.bodyM} text-[14px] text-neutral-500`
    : 'font-sans text-sm text-neutral-500';
  const detailListClass = language === 'zh'
    ? `mt-3 space-y-1.5 ${zhWalkthroughType.bodyM} text-[14px] text-neutral-600`
    : 'mt-3 space-y-1.5 font-sans';
  const detailListDesktopClass = language === 'zh'
    ? `mt-3 space-y-2 ${zhWalkthroughType.bodyM} text-[15px] text-neutral-600`
    : 'mt-3 space-y-2 font-sans';
  const storyClass = language === 'zh'
    ? `mt-4 ${zhWalkthroughType.bodyM} text-[15px] text-neutral-600`
    : 'mt-4 font-sans text-sm leading-6 text-neutral-600';
  const usageCardClass = language === 'zh'
    ? `rounded-2xl bg-[#f8f3ea] p-3 text-center ${zhWalkthroughType.bodyM} text-[14px] text-neutral-600`
    : 'rounded-2xl bg-[#f8f3ea] p-3 text-center font-sans text-sm text-neutral-600';
  const usageCardDesktopClass = language === 'zh'
    ? `rounded-2xl bg-[#f8f3ea] p-4 text-center ${zhWalkthroughType.bodyM} text-[14px] text-neutral-600`
    : 'rounded-2xl bg-[#f8f3ea] p-4 text-center font-sans text-sm text-neutral-600';
  const bottomQuoteClass = language === 'zh'
    ? `absolute bottom-[112px] left-1/2 z-10 -translate-x-1/2 text-center ${zhWalkthroughType.bodyL} text-[17px] text-white/92 drop-shadow-[0_3px_12px_rgba(0,0,0,0.22)] sm:bottom-12 lg:bottom-9`
    : 'absolute bottom-[112px] left-1/2 z-10 -translate-x-1/2 text-center font-sans text-base leading-relaxed text-white/92 drop-shadow-[0_3px_12px_rgba(0,0,0,0.22)] sm:bottom-12 lg:bottom-9';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.6 }}
      className="relative h-full w-full overflow-y-auto overflow-x-hidden overscroll-contain lg:overflow-hidden"
    >
      <video src={assetUrl('/background/05.mp4')} autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,250,242,0.7),rgba(255,250,242,0.16)_38%,rgba(59,35,14,0.18)_82%,rgba(59,35,14,0.26)_100%)]" />

      <div className="relative z-10 min-h-full w-full px-6 pb-36 pt-28 sm:px-10 lg:h-full lg:px-12 lg:pb-16 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mx-auto max-w-3xl text-center"
        >
          <h2 className={titleClass}>
            {language === 'zh' ? '搭建我的视觉小宇宙。' : 'Building my little visual universe.'}
          </h2>
          <p className={bodyClass}>
            {data.intro}
          </p>
          <button
            onClick={() => setIsIpOpen(true)}
            className={ctaClass}
          >
            {sectionLabels.cta}
          </button>
        </motion.div>

        <div className={bottomQuoteClass}>
          {language === 'zh'
            ? '一个带着温度和想象力的小世界。'
            : 'A small world with warmth, imagination, and a bit of myself in it.'}
        </div>
      </div>

      <AnimatePresence>
        {isIpOpen ? (
          <IpUniverseModal isZh={language === 'zh'} onClose={() => setIsIpOpen(false)} />
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChapterVisualStudio;

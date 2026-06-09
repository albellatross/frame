import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Download, SendHorizontal, Sprout } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { zhWalkthroughType } from './typography';
import { assetUrl } from '../../utils/assets';

interface Props {
  data: {
    keywords: string[];
    closing: string;
    cta: { portfolio: string; resume: string; home: string };
    links: { email: string; linkedin: string };
  };
  onClose: () => void;
  onPrev: () => void;
  onExploreWork?: () => void;
  onOpenResume?: () => void;
}

const ChapterFinalFrame: React.FC<Props> = ({ data, onClose, onPrev, onExploreWork, onOpenResume }) => {
  const { language } = useLanguage();
  const titleClass = language === 'zh'
    ? `${zhWalkthroughType.displayXL} text-[48px] text-dark-brown sm:text-[56px] lg:text-[68px]`
    : 'font-serif text-5xl italic tracking-tight leading-[0.98] text-dark-brown sm:text-6xl lg:text-[74px]';
  const introClass = language === 'zh'
    ? `mx-auto mt-6 max-w-[760px] whitespace-pre-line ${zhWalkthroughType.bodyL} text-[18px] text-neutral-600 sm:text-[21px] lg:text-[22px]`
    : 'mx-auto mt-5 max-w-2xl whitespace-pre-line font-sans text-lg leading-relaxed text-neutral-600 sm:text-2xl';
  const keywordClass = language === 'zh'
    ? `rounded-full border border-white/85 bg-white/90 px-5 py-3 ${zhWalkthroughType.ui} text-[14px] text-[#3b230e] shadow-[0_10px_28px_rgba(59,35,14,0.1)] backdrop-blur-lg`
    : 'rounded-full border border-white/75 bg-white/78 px-5 py-3 font-sans text-sm font-medium text-dark-brown shadow-button backdrop-blur-md';
  const closingClass = language === 'zh'
    ? `mt-12 max-w-[760px] whitespace-pre-line ${zhWalkthroughType.bodyL} text-[18px] text-neutral-600 sm:text-[21px] lg:text-[22px]`
    : 'mt-12 max-w-2xl whitespace-pre-line font-sans text-lg leading-relaxed text-neutral-600 sm:text-2xl';
  const primaryButtonClass = language === 'zh'
    ? `flex items-center gap-2 rounded-full bg-dark-brown px-8 py-4 ${zhWalkthroughType.ui} text-[15px] text-cream shadow-button hover:shadow-button-hover`
    : 'flex items-center gap-2 rounded-full bg-dark-brown px-8 py-4 font-sans text-sm font-medium tracking-wide text-cream shadow-button hover:shadow-button-hover';
  const secondaryButtonClass = language === 'zh'
    ? `flex items-center gap-2 rounded-full border border-white/75 bg-white/78 px-7 py-4 ${zhWalkthroughType.ui} text-[15px] text-dark-brown shadow-button backdrop-blur-md hover:bg-white/90`
    : 'flex items-center gap-2 rounded-full border border-white/75 bg-white/78 px-7 py-4 font-sans text-sm text-dark-brown shadow-button backdrop-blur-md hover:bg-white/90';
  const footerClass = language === 'zh'
    ? `mt-16 text-center ${zhWalkthroughType.bodyM} text-[14px] text-white/92 drop-shadow-[0_2px_10px_rgba(0,0,0,0.22)]`
    : 'mt-16 text-center font-sans text-sm leading-relaxed text-white/92 drop-shadow-[0_2px_10px_rgba(0,0,0,0.22)]';
  const thanksClass = language === 'zh'
    ? `${zhWalkthroughType.microTight} mt-5 text-[11px] text-white/86`
    : 'mt-5 font-mono text-[11px] uppercase tracking-[0.26em] text-white/86';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative h-full w-full overflow-hidden"
    >
      <video src={assetUrl('/background/03.mp4')} autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,251,242,0.72),rgba(255,251,242,0.18)_38%,rgba(59,35,14,0.14)_82%,rgba(59,35,14,0.24)_100%)]" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl"
        >
          <h2 className={titleClass}>
            {language === 'zh' ? '构成我的那些线索。' : <>What <span className="italic">frames</span> me</>}
          </h2>
          <p className={introClass}>
            {language === 'zh'
              ? '一个热爱 AI 和视觉叙事，\n也想把想法真的做出来的设计师。'
              : 'A designer who loves AI, visual storytelling,\nand making ideas real enough to touch.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-8 flex max-w-4xl flex-wrap justify-center gap-3"
        >
          {data.keywords.map((kw, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 + i * 0.12 }}
              className={keywordClass}
            >
              {kw}
            </motion.span>
          ))}
        </motion.div>

        {data.closing ? (
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className={closingClass}
          >
            {data.closing}
          </motion.p>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            onClick={onExploreWork || onClose}
            className={primaryButtonClass}
          >
            <ArrowUpRight size={15} />
            {data.cta.portfolio}
          </button>
          <button
            onClick={onOpenResume || onClose}
            className={secondaryButtonClass}
          >
            <Download size={15} />
            {data.cta.resume}
          </button>
          <a
            href={`mailto:${data.links.email}`}
            className={secondaryButtonClass}
          >
            <SendHorizontal size={15} />
            {language === 'zh' ? '联系我' : 'Contact Me'}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.45 }}
          className={footerClass}
        >
          <div className="mb-3 flex items-center justify-center gap-2 text-[#f2e8d5]">
            <Sprout size={15} />
          </div>
          <div>{language === 'zh' ? '设计是我理解世界的方式。' : 'Design is how I understand the world.'}</div>
          <div>{language === 'zh' ? 'AI 帮我多想一步，也多试一步。' : 'AI helps me imagine one more step, then try it.'}</div>
          <div className={thanksClass}>
            {language === 'zh' ? '感谢你陪我走完这一程。 ♥' : 'THANKS FOR WALKING WITH ME. ♥'}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ChapterFinalFrame;

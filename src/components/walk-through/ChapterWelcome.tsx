import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Clock3 } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { zhWalkthroughType } from './typography';
import { assetUrl } from '../../utils/assets';

interface Props {
  data: {
    greeting: string;
    subtitle: string;
    message: string;
    cta: string;
  };
  onNext: () => void;
}

const ChapterWelcome: React.FC<Props> = ({ data, onNext }) => {
  const { language } = useLanguage();
  const [exiting, setExiting] = useState(false);

  const handleStart = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(() => onNext(), 1800);
  }, [exiting, onNext]);
  const titleClass = language === 'zh'
    ? 'max-w-3xl font-serif text-[68px] italic tracking-tight leading-[0.95] text-dark-brown sm:text-[92px] lg:text-[110px]'
    : 'max-w-3xl font-serif text-[68px] italic tracking-tight leading-[0.95] text-dark-brown sm:text-[92px] lg:text-[110px]';
  const titleLeadClass = language === 'zh'
    ? 'block font-serif text-[42px] italic tracking-tight leading-none text-dark-brown sm:text-[50px] lg:text-[58px]'
    : '';
  const titleNameClass = language === 'zh'
    ? `mt-2 block ${zhWalkthroughType.displayXL} text-[52px] text-dark-brown sm:text-[72px] lg:text-[88px]`
    : '';
  const subtitleClass = language === 'zh'
    ? `mb-2 mt-6 max-w-[680px] ${zhWalkthroughType.bodyL} text-[17px] text-neutral-700 sm:text-[20px] lg:text-[22px]`
    : 'mb-2 mt-6 max-w-2xl font-sans text-lg leading-relaxed text-neutral-700 sm:text-[28px]';
  const messageClass = language === 'zh'
    ? `mb-10 mt-4 max-w-[680px] whitespace-pre-line ${zhWalkthroughType.bodyM} text-[15px] text-neutral-600 sm:text-[18px]`
    : 'mb-10 mt-4 max-w-2xl whitespace-pre-line font-sans text-base leading-relaxed text-neutral-600 sm:text-xl';
  const buttonClass = language === 'zh'
    ? `rounded-full bg-dark-brown px-10 py-4 ${zhWalkthroughType.ui} text-[15px] text-cream shadow-button hover:shadow-button-hover`
    : 'rounded-full bg-dark-brown px-10 py-4 font-sans text-base font-medium tracking-wide text-cream shadow-button hover:shadow-button-hover';
  const footnoteClass = language === 'zh'
    ? `mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 ${zhWalkthroughType.bodyM} text-[14px] text-neutral-500`
    : 'mt-5 inline-flex items-center gap-2 rounded-full px-4 py-2 font-sans text-sm text-neutral-500';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.6 }}
      className="relative h-full w-full overflow-hidden"
    >
      <motion.div
        animate={exiting ? { scale: 1.14, y: -15 } : { scale: 1, y: 0 }}
        transition={exiting ? { duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] } : { duration: 0 }}
        className="absolute inset-[-20px]"
      >
        <video
          src={assetUrl('/background/01.mp4')}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,251,240,0.88),rgba(255,249,238,0.42)_34%,rgba(44,31,16,0.08)_72%,rgba(44,31,16,0.18)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-white/55 via-white/20 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#3b230e]/10 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={exiting ? { opacity: 0, y: -25 } : { opacity: 1, y: 0 }}
        transition={exiting ? { duration: 0.5, delay: 0.2, ease: 'easeIn' } : { delay: 0.3, duration: 0.8 }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 pl-20 text-center"
      >
        <div className="absolute left-1/2 top-1/2 -z-10 h-[380px] w-[min(92vw,920px)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,251,243,0.96),rgba(255,251,243,0.52)_38%,transparent_74%)] blur-2xl" />

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.48, duration: 0.6 }}
          className={titleClass}
        >
          {"Hi, I'm Bella."}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className={subtitleClass}
        >
          {language === 'zh' ? (
            <>
              我是一个相信 AI 是这个时代最大魔法的
              <br className="hidden sm:block" />
              UI/UX 设计师。
            </>
          ) : (
            data.subtitle
          )}
        </motion.p>

        {data.message ? (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.6 }}
            className={messageClass}
          >
            {data.message}
          </motion.p>
        ) : null}

        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleStart}
          className={buttonClass}
        >
          {data.cta}
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.35 }}
          className={footnoteClass}
        >
          <Clock3 size={15} />
          <span>{language === 'zh' ? '一个 5 分钟的互动式自我介绍' : 'A 5-minute interactive introduction'}</span>
        </motion.div>
      </motion.div>

      {/* Warm light dissolve */}
      <motion.div
        animate={exiting ? { opacity: 1 } : { opacity: 0 }}
        transition={exiting ? { duration: 0.5, delay: 1.3, ease: 'easeIn' } : { duration: 0 }}
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,rgba(255,250,240,1),rgba(255,248,235,0.98)_50%,rgba(255,245,230,0.95)_100%)]"
      />
    </motion.div>
  );
};

export default ChapterWelcome;

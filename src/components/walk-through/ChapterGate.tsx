import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock3, Sparkles } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { zhWalkthroughType } from './typography';
import { assetUrl } from '../../utils/assets';

interface Props {
  onStart: () => void;
  onExploreWork?: () => void;
  onLeftButton?: () => void;
  onRightButton?: () => void;
}

type Phase = 'idle' | 'exit';
type HoveredPath = 'left' | 'right' | null;
type SelectedPath = 'left' | 'right' | null;

const ChapterGate: React.FC<Props> = ({ onStart, onExploreWork, onLeftButton, onRightButton }) => {
  const { language } = useLanguage();
  const [hovered, setHovered] = useState<HoveredPath>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [selected, setSelected] = useState<SelectedPath>(null);

  const eyebrowClass = language === 'zh'
    ? `mb-4 inline-flex items-center gap-2 ${zhWalkthroughType.micro} text-xs text-[#9f7f53]`
    : 'mb-4 inline-flex items-center gap-2 font-mono text-sm uppercase tracking-[0.28em] text-[#9f7f53]';
  const titleClass = language === 'zh'
    ? `${zhWalkthroughType.displayXL} text-[50px] text-dark-brown sm:text-[58px] lg:text-[84px]`
    : 'font-serif text-5xl italic tracking-tight leading-[0.98] text-dark-brown sm:text-6xl lg:text-[74px]';
  const bodyClass = language === 'zh'
    ? `mx-auto mt-6 max-w-xl ${zhWalkthroughType.bodyL} text-[18px] text-neutral-600 sm:text-[24px]`
    : 'mx-auto mt-6 max-w-xl font-sans text-lg leading-relaxed text-neutral-600 sm:text-2xl';
  const primaryButtonClass = language === 'zh'
    ? `rounded-full bg-dark-brown px-8 py-4 ${zhWalkthroughType.ui} text-base text-white shadow-button`
    : 'rounded-full bg-dark-brown px-8 py-4 font-sans text-base font-medium text-white shadow-button';
  const secondaryButtonClass = language === 'zh'
    ? `rounded-full border border-white/70 bg-white/78 px-8 py-4 ${zhWalkthroughType.ui} text-base text-dark-brown shadow-button backdrop-blur-md`
    : 'rounded-full border border-white/70 bg-white/78 px-8 py-4 font-sans text-base font-medium text-dark-brown shadow-button backdrop-blur-md';
  const footnoteClass = language === 'zh'
    ? `mt-5 inline-flex items-center gap-2 ${zhWalkthroughType.bodyM} text-sm text-neutral-500`
    : 'mt-5 inline-flex items-center gap-2 font-sans text-sm text-neutral-500';

  // Camera transform based on hover/selected state
  const getCameraTransform = () => {
    if (phase === 'exit') {
      const dir = selected === 'left' ? -1 : 1;
      return { scale: 1.16, x: dir * -40, y: -20 };
    }
    if (hovered === 'left') return { scale: 1.02, x: 5, y: 0 };
    if (hovered === 'right') return { scale: 1.02, x: -5, y: 0 };
    return { scale: 1, x: 0, y: 0 };
  };

  const camera = getCameraTransform();

  const handleClick = useCallback((path: 'left' | 'right') => {
    if (phase !== 'idle') return;
    setSelected(path);
    setPhase('exit');

    // After full exit animation (~2s), trigger the parent callback
    setTimeout(() => {
      if (path === 'left') {
        (onLeftButton || onExploreWork)?.();
      } else {
        (onRightButton || onStart)?.();
      }
    }, 2000);
  }, [phase, onLeftButton, onExploreWork, onRightButton, onStart]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="relative h-full w-full overflow-hidden"
    >
      {/* Background video with camera movement */}
      <motion.div
        animate={{
          scale: camera.scale,
          x: camera.x,
          y: camera.y,
        }}
        transition={
          phase === 'exit'
            ? { duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }
            : { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
        }
        className="absolute inset-[-20px]"
      >
        <video
          src={assetUrl('/background/02.mp4')}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
        />
      </motion.div>

      {/* Atmospheric overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,251,241,0.82),rgba(255,250,242,0.3)_36%,rgba(59,35,14,0.12)_80%,rgba(59,35,14,0.2)_100%)]" />

      {/* Path glow - left */}
      <motion.div
        animate={{
          opacity: hovered === 'left' || selected === 'left' ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_30%_55%,rgba(255,240,210,0.35),transparent_70%)]"
      />
      {/* Path glow - right */}
      <motion.div
        animate={{
          opacity: hovered === 'right' || selected === 'right' ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_60%_at_70%_55%,rgba(255,240,210,0.35),transparent_70%)]"
      />

      {/* UI Content - fades out during exit */}
      <motion.div
        animate={phase === 'exit' ? { opacity: 0, y: -30 } : { opacity: 1, y: 0 }}
        transition={phase === 'exit' ? { duration: 0.5, delay: 0.3, ease: 'easeIn' } : { duration: 0.7, delay: 0.2 }}
        className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center"
      >
        <div className="max-w-3xl">
          <div className={eyebrowClass}>
            <Sparkles size={15} />
            <span>{language === 'zh' ? '选择你的入口' : 'Choose Your Path'}</span>
          </div>
          <h1 className={titleClass}>
            {language === 'zh' ? '你想从哪里开始？' : 'Where would you like to begin?'}
          </h1>
          <p className={bodyClass}>
            {language === 'zh'
              ? '选择一条路径，我会带你看作品、思考和我的小宇宙。'
              : 'Choose a path and I will walk you through my work, my thinking, and the little worlds I make.'}
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            {/* Left button - Explore My Work */}
            <motion.button
              onMouseEnter={() => phase === 'idle' && setHovered('left')}
              onMouseLeave={() => phase === 'idle' && setHovered(null)}
              onClick={() => handleClick('left')}
              animate={
                phase === 'exit' && selected === 'left'
                  ? { scale: 0.95, opacity: 0 }
                  : phase === 'exit'
                  ? { opacity: 0 }
                  : hovered === 'left'
                  ? { scale: 1.03, y: -2 }
                  : { scale: 1, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.3 }}
              className={primaryButtonClass}
            >
              {language === 'zh' ? '看看我的作品 →' : 'Explore My Work →'}
            </motion.button>
            {/* Right button - Meet Bella */}
            <motion.button
              onMouseEnter={() => phase === 'idle' && setHovered('right')}
              onMouseLeave={() => phase === 'idle' && setHovered(null)}
              onClick={() => handleClick('right')}
              animate={
                phase === 'exit' && selected === 'right'
                  ? { scale: 0.95, opacity: 0 }
                  : phase === 'exit'
                  ? { opacity: 0 }
                  : hovered === 'right'
                  ? { scale: 1.03, y: -2 }
                  : { scale: 1, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.3 }}
              className={secondaryButtonClass}
            >
              {language === 'zh' ? '5 分钟认识 Bella →' : 'Meet Bella in 5 Minutes →'}
            </motion.button>
          </div>

          <div className={footnoteClass}>
            <Clock3 size={15} />
            <span>
              {language === 'zh'
                ? '一个轻量、个性化的互动式自我介绍'
                : 'A lightweight interactive introduction'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Warm light dissolve overlay - appears at end of exit animation */}
      <motion.div
        animate={phase === 'exit' ? { opacity: 1 } : { opacity: 0 }}
        transition={phase === 'exit' ? { duration: 0.5, delay: 1.5, ease: 'easeIn' } : { duration: 0 }}
        className="pointer-events-none absolute inset-0 z-20 bg-[radial-gradient(circle_at_center,rgba(255,250,240,1),rgba(255,248,235,0.98)_50%,rgba(255,245,230,0.95)_100%)]"
      />
    </motion.div>
  );
};

export default ChapterGate;

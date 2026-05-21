import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageToggle from '../LanguageToggle';
import ExplorationGallery from './ExplorationGallery';
import { WALK_DATA } from './data';
import { zhWalkthroughType } from './typography';
import { EXPLORATIONS_EN, EXPLORATIONS_ZH } from '../../data';
import { Project } from '../../types';
import ChapterGate from './ChapterGate';
import ChapterWelcome from './ChapterWelcome';
import ChapterAIGarden from './ChapterAIGarden';
import ChapterVisualStudio from './ChapterVisualStudio';
import ChapterHobbies from './ChapterHobbies';
import ChapterFinalFrame from './ChapterFinalFrame';
import { assetUrl } from '../../utils/assets';

interface WalkThroughProps {
  onClose: () => void;
  onExploreWork?: () => void;
  onOpenResume?: () => void;
}

const TOTAL_CHAPTERS = 5;

const sceneVariants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 90 : -90,
    scale: 0.985,
    filter: 'blur(10px)',
  }),
  center: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -90 : 90,
    scale: 1.015,
    filter: 'blur(10px)',
    transition: {
      duration: 0.56,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const WalkThrough: React.FC<WalkThroughProps> = ({ onClose, onExploreWork, onOpenResume }) => {
  const { language } = useLanguage();
  const [chapter, setChapter] = useState(-1);
  const [direction, setDirection] = useState(1);
  const [transitionVideo, setTransitionVideo] = useState<string | null>(null);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [activeExploration, setActiveExploration] = useState<Project | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pendingActionRef = useRef<(() => void) | null>(null);
  const chapterRef = useRef(-1);
  const data = language === 'zh' ? WALK_DATA.zh : WALK_DATA.en;
  const explorations = language === 'zh' ? EXPLORATIONS_ZH : EXPLORATIONS_EN;
  const navItems = language === 'zh'
    ? ['欢迎', 'AI 花园', 'IP 宇宙', '日常灵感', '最后一帧']
    : ['Welcome', 'AI Garden', 'IP World', 'Daily Sparks', 'Final Frame'];
  const activeNav = chapter >= 0 ? chapter : -1;
  const navTargets = [0, 1, 2, 3, 4];
  const scrollHintText = chapter === 0
    ? (language === 'zh' ? '向下滚动开始' : 'SCROLL TO BEGIN')
    : chapter === 1 || chapter === 3
    ? (language === 'zh' ? '向下滚动继续' : 'SCROLL TO EXPLORE')
    : null;
  const hintClass = language === 'zh'
    ? `pointer-events-none absolute bottom-8 left-1/2 z-40 -translate-x-1/2 text-center ${zhWalkthroughType.micro} text-[11px] text-white/90 sm:bottom-10`
    : 'pointer-events-none absolute bottom-8 left-1/2 z-40 -translate-x-1/2 text-center font-mono text-[10px] uppercase tracking-[0.32em] text-white/90 sm:bottom-10';
  const backButtonClass = language === 'zh'
    ? `flex items-center gap-2 rounded-full bg-white/70 px-3.5 py-2.5 ${zhWalkthroughType.ui} text-[14px] text-dark-brown shadow-button backdrop-blur-md hover:bg-white/85`
    : 'flex items-center gap-2 rounded-full bg-white/70 px-3 py-2 font-sans text-xs font-medium text-dark-brown shadow-button backdrop-blur-md hover:bg-white/85';
  const navButtonClass = (isActive: boolean) => language === 'zh'
    ? `rounded-full px-4 py-2.5 ${zhWalkthroughType.ui} text-[14px] transition-all ${isActive ? 'bg-white text-dark-brown shadow-sm' : 'text-neutral-500 hover:text-dark-brown'}`
    : `rounded-full px-3 py-2 font-sans text-[13px] transition-all ${isActive ? 'bg-white text-dark-brown shadow-sm' : 'text-neutral-500 hover:text-dark-brown'}`;
  const navNumberClass = language === 'zh'
    ? `mr-1.5 ${zhWalkthroughType.microTight} text-[10px] opacity-60`
    : 'mr-2 font-mono text-[11px] opacity-70';
  const wheelLockedRef = useRef(false);
  const wheelAccumRef = useRef(0);

  const goToChapter = (target: number) => {
    const currentChapter = chapterRef.current;
    const nextChapter = Math.max(-1, Math.min(target, TOTAL_CHAPTERS - 1));

    if (nextChapter === currentChapter) {
      return;
    }

    chapterRef.current = nextChapter;
    setDirection(nextChapter > currentChapter ? 1 : -1);
    setChapter(nextChapter);
  };

  const playTransitionThen = (videoSrc: string, action: () => void) => {
    pendingActionRef.current = action;
    setTransitionVideo(videoSrc);
  };

  const handleTransitionEnd = () => {
    setTransitionVideo(null);
    if (pendingActionRef.current) {
      pendingActionRef.current();
      pendingActionRef.current = null;
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) {
      const audio = new Audio(assetUrl('/ambient-bgm.mp3'));
      audio.loop = true;
      audio.volume = 0.4;
      audioRef.current = audio;
    }
    if (audioPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setAudioPlaying(!audioPlaying);
  };

  // Auto-play audio on mount
  useEffect(() => {
    const audio = new Audio('/ambient-bgm.mp3');
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    audio.play().then(() => {
      setAudioPlaying(true);
    }).catch(() => {
      // Browser may block autoplay without user interaction
    });
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    chapterRef.current = chapter;
  }, [chapter]);

  const next = () => {
    // Gate → Welcome: play transition video
    if (chapterRef.current === -1) {
      playTransitionThen(assetUrl('/background/01（1）.mp4'), () => goToChapter(0));
      return;
    }
    // Welcome → AI Garden: play transition video
    if (chapterRef.current === 0) {
      playTransitionThen(assetUrl('/background/01（1）.mp4'), () => goToChapter(1));
      return;
    }
    goToChapter(chapter + 1);
  };
  const prev = () => goToChapter(chapter - 1);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (activeExploration) {
        return;
      }

      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) {
        return;
      }

      event.preventDefault();

      if (wheelLockedRef.current || transitionVideo) {
        return;
      }

      wheelAccumRef.current += event.deltaY;

      if (Math.abs(wheelAccumRef.current) < 90) {
        return;
      }

      const scrollDirection = wheelAccumRef.current > 0 ? 1 : -1;
      const currentChapter = chapterRef.current;
      const target = Math.max(-1, Math.min(currentChapter + scrollDirection, TOTAL_CHAPTERS - 1));

      wheelAccumRef.current = 0;

      if (target === currentChapter) {
        return;
      }

      wheelLockedRef.current = true;

      // Gate → Welcome or Welcome → AI Garden: play transition video
      if ((currentChapter === -1 && target === 0) || (currentChapter === 0 && target === 1)) {
        playTransitionThen(assetUrl('/background/01（1）.mp4'), () => goToChapter(target));
        window.setTimeout(() => { wheelLockedRef.current = false; }, 3000);
      } else {
        goToChapter(target);
        window.setTimeout(() => { wheelLockedRef.current = false; }, 820);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [activeExploration, transitionVideo]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] overflow-hidden bg-[#f8f3e8]"
    >
      <div className="fixed left-6 top-6 z-[10020] sm:left-10 lg:left-12">
        <motion.button
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          onClick={onClose}
          className={backButtonClass}
        >
          <ArrowLeft size={13} />
          <span>{language === 'zh' ? '返回主页' : 'Back Home'}</span>
        </motion.button>
      </div>

      <div className="pointer-events-none fixed inset-x-0 top-6 z-40 hidden justify-center px-6 sm:flex sm:px-10 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="pointer-events-auto rounded-full border border-white/70 bg-white/60 px-2 py-2 shadow-button backdrop-blur-xl sm:flex sm:items-center sm:gap-1"
        >
          {navItems.map((label, index) => (
            <button
              key={label}
              onClick={() => goToChapter(navTargets[index])}
              className={navButtonClass(activeNav === index)}
            >
              <span className={navNumberClass}>{String(index + 1).padStart(2, '0')}</span>
              {label}
            </button>
          ))}
        </motion.div>
      </div>

      <div className="fixed right-6 top-6 z-[10020] sm:right-10 lg:right-12">
        <motion.div
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <div>
            <LanguageToggle trackClassName="bg-white/90 backdrop-blur-md shadow-sm border border-neutral-200/50" />
          </div>
          <button
            onClick={toggleAudio}
            className="flex items-center gap-1.5 rounded-full border border-white/70 bg-white/90 px-3 py-2 font-sans text-xs text-neutral-600 shadow-sm backdrop-blur-md transition-colors hover:bg-white/100"
          >
            {audioPlaying ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
        </motion.div>
      </div>



      <AnimatePresence mode="wait">
        {scrollHintText && (
          <motion.div
            key={scrollHintText}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35 }}
            className={hintClass}
          >
            <div>{scrollHintText}</div>
            <motion.div
              animate={{ y: [0, 7, 0], opacity: [0.65, 1, 0.65] }}
              transition={{ repeat: Infinity, duration: 1.9, ease: 'easeInOut' }}
              className="mx-auto mt-2 h-8 w-px bg-white/70"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chapter content */}
      <AnimatePresence mode="wait" custom={direction}>
        {chapter === -1 && (
          <motion.div
            key="gate"
            custom={direction}
            variants={sceneVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <ChapterGate
              onStart={next}
              onExploreWork={onExploreWork}
              onLeftButton={() => playTransitionThen(assetUrl('/background/02 （2）.mp4'), () => { onExploreWork?.(); })}
              onRightButton={() => playTransitionThen(assetUrl('/background/02 （1）.mp4'), () => goToChapter(0))}
            />
          </motion.div>
        )}
        {chapter === 0 && (
          <motion.div
            key="welcome"
            custom={direction}
            variants={sceneVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <ChapterWelcome data={data.welcome} onNext={next} />
          </motion.div>
        )}
        {chapter === 1 && (
          <motion.div
            key="ai-garden"
            custom={direction}
            variants={sceneVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <ChapterAIGarden data={data.aiGarden} onNext={next} onPrev={prev} onExplorationClick={(index) => setActiveExploration(explorations[index])} />
          </motion.div>
        )}
        {chapter === 2 && (
          <motion.div
            key="visual-studio"
            custom={direction}
            variants={sceneVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <ChapterVisualStudio data={data.visualStudio} onNext={next} onPrev={prev} />
          </motion.div>
        )}
        {chapter === 3 && (
          <motion.div
            key="hobbies"
            custom={direction}
            variants={sceneVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <ChapterHobbies data={data.hobbies} onNext={next} onPrev={prev} />
          </motion.div>
        )}
        {chapter === 4 && (
          <motion.div
            key="final"
            custom={direction}
            variants={sceneVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <ChapterFinalFrame
              data={data.finalFrame}
              onClose={onClose}
              onPrev={prev}
              onExploreWork={onExploreWork}
              onOpenResume={onOpenResume}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Transition video overlay - warm dissolve */}
      <AnimatePresence>
        {transitionVideo && (
          <motion.div
            key="transition-video"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 z-50"
          >
            {/* Warm base that matches Gate's dissolve glow */}
            <div className="absolute inset-0 bg-[#fffaf0]" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-full w-full"
            >
              <video
                src={transitionVideo}
                autoPlay
                muted
                playsInline
                onEnded={handleTransitionEnd}
                ref={(el) => { if (el) el.playbackRate = 1.8; }}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Exploration detail overlay */}
      <AnimatePresence>
        {activeExploration && (
          <ExplorationGallery
            project={activeExploration}
            onClose={() => setActiveExploration(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WalkThrough;

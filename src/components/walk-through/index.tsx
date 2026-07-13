import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';
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
  const backButtonClass = language === 'zh'
    ? `inline-flex min-h-10 w-fit items-center rounded-full bg-transparent px-2.5 ${zhWalkthroughType.ui} text-[14px] font-medium text-dark-brown/70 transition-[background-color,color,transform] duration-200 ease-out hover:bg-white/58 hover:text-dark-brown active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8fb7ff]`
    : 'inline-flex min-h-10 w-fit items-center rounded-full bg-transparent px-2.5 font-sans text-sm font-medium text-dark-brown/70 transition-[background-color,color,transform] duration-200 ease-out hover:bg-white/58 hover:text-dark-brown active:scale-[0.96] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8fb7ff]';
  const navButtonClass = (isActive: boolean) => language === 'zh'
    ? `rounded-full px-4 py-2.5 ${zhWalkthroughType.ui} text-[14px] transition-[background-color,color,box-shadow,transform] duration-200 ease-out ${isActive ? 'bg-white text-dark-brown shadow-sm' : 'text-neutral-500 hover:text-dark-brown'}`
    : `rounded-full px-3 py-2 font-sans text-[13px] transition-[background-color,color,box-shadow,transform] duration-200 ease-out ${isActive ? 'bg-white text-dark-brown shadow-sm' : 'text-neutral-500 hover:text-dark-brown'}`;
  const navNumberClass = language === 'zh'
    ? `mr-1.5 ${zhWalkthroughType.microTight} text-[10px] opacity-60`
    : 'mr-2 font-mono text-[11px] opacity-70';
  const mobileControlsVisible = chapter >= 0 && !activeExploration;
  const mobileCheckinProgress = activeNav >= 0 && TOTAL_CHAPTERS > 1
    ? (activeNav / (TOTAL_CHAPTERS - 1)) * 100
    : 0;
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
    const audio = new Audio(assetUrl('/ambient-bgm.mp3'));
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
          {language === 'zh' ? '首页' : 'Home'}
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

      {mobileControlsVisible && (
        <div
          className="pointer-events-none fixed inset-x-0 bottom-0 z-[10020] bg-gradient-to-t from-[#2f2112]/14 via-[#2f2112]/3 to-transparent px-3 pt-3 sm:hidden"
          style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
        >
          <div className="pointer-events-auto mx-auto max-w-[430px] rounded-[18px] bg-[rgba(255,250,238,0.8)] px-2 py-1.5 shadow-[0_0_0_1px_rgba(255,248,232,0.66),0_8px_20px_rgba(54,34,15,0.13),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl">
            <div className="grid grid-cols-[40px_minmax(0,1fr)_40px] items-center gap-2">
              <button
                type="button"
                onClick={prev}
                disabled={Boolean(transitionVideo)}
                className="grid h-10 w-10 place-items-center rounded-full bg-[#fff8ec]/76 text-[#4a2c12] shadow-[0_0_0_1px_rgba(92,63,32,0.1),0_6px_14px_rgba(62,39,18,0.08)] transition-[background-color,opacity,transform] duration-200 ease-out active:scale-[0.96] disabled:opacity-35"
                aria-label={language === 'zh' ? '上一页' : 'Previous chapter'}
              >
                <ChevronLeft size={17} />
              </button>

              <div className="min-w-0">
                <div
                  className="relative flex h-10 items-center justify-between px-1"
                  aria-label={`${language === 'zh' ? '章节打卡时间轴' : 'Chapter check-in timeline'}: ${String(chapter + 1).padStart(2, '0')} / ${String(TOTAL_CHAPTERS).padStart(2, '0')} ${navItems[chapter]}`}
                >
                  <div className="absolute left-5 right-5 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full bg-[repeating-linear-gradient(90deg,rgba(123,93,54,0.26)_0,rgba(123,93,54,0.26)_5px,transparent_5px,transparent_10px)]" aria-hidden="true">
                    <span
                      className="block h-full rounded-full bg-[#3b230e]/66 transition-[width] duration-300 ease-out"
                      style={{ width: `${mobileCheckinProgress}%` }}
                    />
                  </div>
                  {navTargets.map((target, index) => {
                    const isCurrent = activeNav === index;
                    const isCompleted = activeNav > index;

                    return (
                      <button
                        key={target}
                        type="button"
                        onClick={() => goToChapter(target)}
                        disabled={Boolean(transitionVideo)}
                        className="relative z-10 grid h-10 w-9 place-items-center rounded-full transition-[opacity,transform] duration-200 ease-out active:scale-[0.96] disabled:opacity-35"
                        aria-label={`${language === 'zh' ? '前往' : 'Go to'} ${navItems[index]}`}
                        aria-current={isCurrent ? 'page' : undefined}
                      >
                        {isCurrent ? (
                          <span className="grid h-7 w-7 -rotate-3 place-items-center rounded-[8px] bg-[#3b230e] font-mono text-[10px] text-[#fff7e8] shadow-[0_0_0_3px_rgba(255,249,236,0.78),0_8px_18px_rgba(62,39,18,0.2)]">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        ) : isCompleted ? (
                          <span className="grid h-5 w-5 place-items-center rounded-full bg-[#8a643c] text-[#fff7e8] shadow-[0_0_0_2px_rgba(255,249,236,0.72)]">
                            <Check size={12} strokeWidth={2.4} />
                          </span>
                        ) : (
                          <span className="h-3.5 w-3.5 rounded-full bg-[#fffaf0] shadow-[0_0_0_1px_rgba(92,63,32,0.18),0_4px_10px_rgba(62,39,18,0.08)]" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {chapter < TOTAL_CHAPTERS - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={Boolean(transitionVideo)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#3b230e] text-[#fff7e8] shadow-[0_9px_20px_rgba(62,39,18,0.2),inset_0_1px_0_rgba(255,255,255,0.18)] transition-[background-color,opacity,transform] duration-200 ease-out active:scale-[0.96] disabled:opacity-35"
                  aria-label={language === 'zh' ? '下一页' : 'Next chapter'}
                >
                  <ChevronRight size={17} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onExploreWork || onClose}
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#3b230e] text-[#fff7e8] shadow-[0_9px_20px_rgba(62,39,18,0.2),inset_0_1px_0_rgba(255,255,255,0.18)] transition-[background-color,transform] duration-200 ease-out active:scale-[0.96]"
                  aria-label={language === 'zh' ? '查看作品' : 'View work'}
                >
                  <ChevronRight size={17} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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

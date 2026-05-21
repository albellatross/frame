import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Pencil, BookOpen, Music, Camera } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { DailySparkModal } from './CreativeArchiveModal';
import { assetUrl } from '../../utils/assets';
import { DailySparkKind } from './creativeArchiveAssets';
import { zhWalkthroughType } from './typography';

interface HobbySection {
  title: string;
  message: string;
  images?: string[];
  books?: string[];
  style?: string;
  places?: string[];
}

interface Props {
  data: {
    drawing: HobbySection;
    reading: HobbySection;
    dance: HobbySection;
    travel: HobbySection;
  };
  onNext: () => void;
  onPrev: () => void;
}

const hobbyIcons = [Pencil, BookOpen, Music, Camera];
const hobbyKinds: DailySparkKind[] = ['painting', 'reading', 'dance', 'travel'];

const ChapterHobbies: React.FC<Props> = ({ data, onNext, onPrev }) => {
  const { language } = useLanguage();
  const [activeKind, setActiveKind] = useState<DailySparkKind | null>(null);
  const hobbies = [data.drawing, data.reading, data.dance, data.travel];
  const activeIndex = activeKind ? hobbyKinds.indexOf(activeKind) : -1;
  const activeHobby = activeIndex >= 0 ? hobbies[activeIndex] : null;
  const titleClass = language === 'zh'
    ? `${zhWalkthroughType.displayL} text-[36px] text-dark-brown sm:text-[42px] lg:text-[50px] whitespace-nowrap`
    : 'font-serif text-5xl italic tracking-tight leading-[0.98] text-dark-brown sm:text-6xl lg:text-[68px]';
  const itemTitleClass = language === 'zh' ? `${zhWalkthroughType.displayM} text-[18px] text-white` : 'font-serif text-2xl font-medium';
  const itemTitleMobileClass = language === 'zh' ? `${zhWalkthroughType.displayM} text-[16px] text-dark-brown` : 'font-serif text-base text-dark-brown';
  const bodyClass = language === 'zh'
    ? `mx-auto mt-5 max-w-[760px] ${zhWalkthroughType.bodyL} text-[18px] text-neutral-600 sm:text-[20px]`
    : 'mx-auto mt-5 max-w-2xl font-sans text-lg leading-relaxed text-neutral-600';
  const captionClass = language === 'zh'
    ? `mt-2 ${zhWalkthroughType.bodyM} text-[15px] text-white/92`
    : 'mt-1 font-sans text-lg leading-7 text-white/92';
  const mobileDescClass = language === 'zh'
    ? `mt-2 ${zhWalkthroughType.bodyM} text-[14px] text-neutral-600`
    : 'mt-2 font-sans text-sm leading-6 text-neutral-600';
  const desktopPositions = [
    'left-[18%] top-[46%]',
    'left-[38%] top-[72%]',
    'left-[67%] top-[48%]',
    'left-[77%] top-[66%]',
  ];
  const hobbyCaptions = language === 'zh'
    ? [
        '把看见和感受到的东西画下来。',
        '影响我思考方式的故事。',
        '在身体里找到自己的节奏。',
        '收集沿途片刻，也把它们剪成记忆。',
      ]
    : [
        'Sketching what I see and feel.',
        'Stories that shape how I think.',
        'Moving to find my own rhythm.',
        'Collecting moments, crafting memories.',
      ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.6 }}
      className="relative h-full w-full overflow-hidden"
    >
      <video src={assetUrl('/background/06.mp4')} autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,250,242,0.74),rgba(255,250,242,0.2)_34%,rgba(59,35,14,0.14)_82%,rgba(59,35,14,0.22)_100%)]" />

      <div className="relative z-10 h-full w-full px-6 pb-16 pt-28 sm:px-10 lg:px-12 lg:pt-32">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`mx-auto max-w-3xl text-center ${language === 'zh' ? 'translate-x-4' : ''}`}
        >
          <h2 className={titleClass}>
            {language === 'zh' ? '那些让我保持灵感的小事情。' : 'The little things that keep me inspired.'}
          </h2>
          <p className={bodyClass}>
            {language === 'zh'
              ? '画画、阅读、节奏、旅行和视频，组成了我理解世界的方式。'
              : 'I collect ideas through drawing, books, rhythm, travel, and short videos.'}
          </p>
        </motion.div>

        <div className="hidden lg:block">
          {hobbies.map((hobby, index) => {
            const Icon = hobbyIcons[index];

            return (
              <motion.button
                key={hobby.title}
                type="button"
                onClick={() => setActiveKind(hobbyKinds[index])}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04, y: -4 }}
                whileTap={{ scale: 0.97 }}
                transition={{ delay: 0.4 + index * 0.08 }}
                className={`absolute ${desktopPositions[index]} flex items-start gap-3 rounded-[28px] p-3 text-left transition hover:bg-white/10`}
              >
                <div>
                  <div className="relative isolate mt-1 h-4 w-4 transform-gpu">
                    <motion.div
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.32, 0.16, 0.32],
                      }}
                      transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.28 }}
                      className="absolute inset-[-6px] rounded-full bg-white/70 blur-[3px] will-change-transform"
                    />
                    <div className="absolute inset-0 rounded-full border border-white bg-white shadow-[0_0_10px_rgba(255,255,255,0.82)]" />
                  </div>
                  <div className="ml-[7px] mt-2 h-16 w-px border-l border-dashed border-white/70" />
                </div>
                <div className="max-w-[220px] text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.28)]">
                  <div className={`flex items-center gap-2 ${itemTitleClass}`}>
                    <Icon size={18} />
                    <span>{hobby.title}</span>
                  </div>
                  <p className={captionClass}>{hobbyCaptions[index]}</p>
                  <p className="mt-3 inline-flex rounded-full bg-white/20 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                    {language === 'zh' ? '打开子页面' : 'Open page'}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-3 lg:hidden">
          {hobbies.map((hobby, index) => {
            const Icon = hobbyIcons[index];

            return (
              <button
                key={hobby.title}
                type="button"
                onClick={() => setActiveKind(hobbyKinds[index])}
                className="rounded-3xl border border-white/70 bg-white/78 p-4 text-left shadow-card backdrop-blur-md transition hover:-translate-y-1 hover:bg-white"
              >
                <div className="flex items-start gap-3">
                  <Icon size={18} className="mt-1 text-[#72542e]" />
                  <div>
                    <div className={itemTitleMobileClass}>{hobby.title}</div>
                    <p className={mobileDescClass}>{hobby.message}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {activeKind && activeHobby ? (
          <DailySparkModal
            kind={activeKind}
            title={activeHobby.title}
            message={activeHobby.message}
            isZh={language === 'zh'}
            onClose={() => setActiveKind(null)}
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
};

export default ChapterHobbies;

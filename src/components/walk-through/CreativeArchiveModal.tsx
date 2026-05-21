import React, { ChangeEvent, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BadgeCheck,
  BarChart3,
  BookOpen,
  Brush,
  Camera,
  Clapperboard,
  Download,
  Image as ImageIcon,
  Images,
  Layers3,
  LineChart,
  Map,
  Music,
  Palette,
  Pencil,
  PencilLine,
  PlayCircle,
  Plus,
  Quote,
  Route,
  Save,
  Send,
  Smartphone,
  Sparkles,
  Sticker,
  Trash2,
  Trophy,
  Upload,
  X,
} from 'lucide-react';
import { DAILY_SPARK_ASSETS, DailySparkKind, IP_UNIVERSE_ASSETS, READING_EXCERPTS } from './creativeArchiveAssets';
import { zhWalkthroughType } from './typography';
import { assetUrl } from '../../utils/assets';

interface IpUniverseModalProps {
  isZh: boolean;
  onClose: () => void;
}

interface DailySparkModalProps {
  kind: DailySparkKind;
  title: string;
  message: string;
  isZh: boolean;
  onClose: () => void;
}

const ModalPortal: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  if (typeof document === 'undefined') {
    return <>{children}</>;
  }

  return createPortal(children, document.body);
};

const overlayTransition = { duration: 0.36, ease: [0.22, 1, 0.36, 1] as const };

const mediaClass = 'h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]';

const isVideo = (src: string) => /^data:video\//i.test(src) || /\.(mp4|mov|webm)$/i.test(src);

type ReadingExcerpt = (typeof READING_EXCERPTS.zh)[number];

const safeReadJson = <T,>(key: string, fallback: T): T => {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const safeWriteJson = (key: string, value: unknown) => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    window.alert('这个文件太大了，浏览器本地存储放不下。可以先压缩后再上传。');
  }
};

const readFilesAsDataUrls = (files: FileList): Promise<string[]> =>
  Promise.all(
    Array.from(files).map(
      (file) =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(reader.error);
          reader.readAsDataURL(file);
        }),
    ),
  );

const MediaTile: React.FC<{
  src: string;
  className?: string;
  imgClassName?: string;
  controls?: boolean;
}> = ({ src, className = '', imgClassName = mediaClass, controls = false }) => {
  const resolvedSrc = assetUrl(src);
  if (isVideo(src)) {
    return (
      <video
        src={resolvedSrc}
        autoPlay={!controls}
        loop
        muted
        playsInline
        controls={controls}
        className={`${imgClassName} bg-[#f5eadb]`}
      />
    );
  }

  return <img src={resolvedSrc} alt="" className={`${imgClassName} ${className}`} loading="lazy" />;
};

const EmptyVisualShelf: React.FC<{ isZh: boolean; kind: DailySparkKind }> = ({ isZh, kind }) => {
  const copy = {
    painting: isZh ? '绘画作品会在这里形成一面小画墙。' : 'Painting works will become a small gallery wall here.',
    reading: isZh ? '阅读选段会被整理成灵感卡片。' : 'Reading excerpts are organized as inspiration cards.',
    dance: isZh ? '舞蹈视频会以可播放的短片形式展示。' : 'Dance videos will appear as playable clips.',
    travel: isZh ? '旅行照片和视频会组成一条记忆路线。' : 'Travel photos and videos become a memory route.',
  };

  return (
    <div className="grid min-h-[360px] place-items-center rounded-[28px] border border-dashed border-[#d5c3b0] bg-[#fffaf2]/76 p-8 text-center">
      <div>
        <motion.div
          animate={{ rotate: [-3, 3, -3], y: [0, -5, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-[24px] bg-[#8C5462]/10 text-[#8C5462]"
        >
          <Sparkles size={24} />
        </motion.div>
        <p className="mt-5 text-[17px] font-semibold text-[#3B230E]">{copy[kind]}</p>
        <p className="mx-auto mt-2 max-w-[360px] text-[13px] leading-6 text-neutral-500">
          {isZh
            ? '这里会像一个小抽屉一样继续收纳新的作品、片段和记忆。'
            : 'This shelf keeps collecting new works, clips, and memories like a small drawer.'}
        </p>
      </div>
    </div>
  );
};

export const IpUniverseModal: React.FC<IpUniverseModalProps> = ({ isZh, onClose }) => {
  const [activeTab, setActiveTab] = useState<'main' | 'team' | 'stickers'>('main');
  const tabs = [
    { id: 'main' as const, label: isZh ? '主 IP' : 'Main IP', icon: Sparkles },
    { id: 'team' as const, label: isZh ? '延展角色' : 'Extensions', icon: Layers3 },
    { id: 'stickers' as const, label: isZh ? '表情包' : 'Stickers', icon: Sticker },
  ];
  const titleClass = isZh
    ? `${zhWalkthroughType.displayL} text-[34px] leading-[1.08] text-[#3B230E] sm:text-[44px]`
    : 'font-serif text-[38px] leading-[1.04] text-[#3B230E] sm:text-[52px]';
  const bodyClass = isZh
    ? `${zhWalkthroughType.bodyM} text-[15px] leading-[1.82] text-neutral-600`
    : 'font-sans text-[15px] leading-[1.78] text-neutral-600';
  const mainIpPrinciples = [
    {
      title: isZh ? '角色定位' : 'Role',
      body: isZh
        ? '把“我”翻译成一个亲和、轻盈、能被记住的视觉角色，用在个人介绍、项目入口和社交表达里。'
        : 'Translates “me” into a warm, lightweight, memorable character for intros, project entrances, and social moments.',
    },
    {
      title: isZh ? '视觉规则' : 'Visual rules',
      body: isZh
        ? '圆润体块、柔软材质、粉色主识别、小表情变化，保证每次生成或延展时都还能像同一个角色。'
        : 'Rounded volume, soft material, pink recognition, and small expression shifts keep every extension in the same family.',
    },
    {
      title: isZh ? '情绪系统' : 'Mood system',
      body: isZh
        ? '从“认真上班”到“灵感来了”“再改一版”，把抽象工作情绪变成可以被发送和复用的表情。'
        : 'Turns abstract work moods into reusable stickers, from focused work to fresh ideas and one-more-revision moments.',
    },
    {
      title: isZh ? '使用场景' : 'Use cases',
      body: isZh
        ? '头像、横幅、动效、团队角色、聊天表情包都来自同一个角色母体，降低后续内容生产成本。'
        : 'Avatars, banners, motion, team characters, and chat stickers all grow from one character base.',
    },
  ];
  const mainIpRules = [
    isZh ? '柔软圆润的体块' : 'Soft rounded volume',
    isZh ? '粉色与暖白主识别' : 'Pink and warm-white identity',
    isZh ? '可爱的工作情绪' : 'Cute work emotions',
    isZh ? '头像到动效可延展' : 'Expandable from avatar to motion',
    isZh ? '同事形象可系列化' : 'Team variants can scale',
  ];
  const mainIpFlow = [
    { label: isZh ? '主角色' : 'Core character', detail: isZh ? '建立第一眼识别' : 'Creates first-sight recognition' },
    { label: isZh ? '动效' : 'Motion', detail: isZh ? '让角色有性格和节奏' : 'Adds personality and timing' },
    { label: isZh ? '表情包' : 'Stickers', detail: isZh ? '进入真实聊天场景' : 'Moves into real chat use' },
    { label: isZh ? '延展角色' : 'Extensions', detail: isZh ? '形成可持续的 IP 宇宙' : 'Builds a sustainable IP world' },
  ];
  const performance = IP_UNIVERSE_ASSETS.performance;
  const heroBanners = IP_UNIVERSE_ASSETS.showcase.slice(0, 3);
  const mainIpStats = [
    {
      label: isZh ? '已上架专辑' : 'Published albums',
      value: `${performance.totals.albums}`,
      detail: isZh ? '覆盖工作、假期、主角色与同伴延展' : 'Work, holiday, main character, and companion sets',
      icon: BadgeCheck,
    },
    {
      label: isZh ? '累计下载' : 'Total downloads',
      value: `${performance.totals.downloads}`,
      detail: isZh ? '来自 5 套原创表情专辑' : 'Across 5 original sticker albums',
      icon: Download,
    },
    {
      label: isZh ? '累计发送' : 'Total sends',
      value: `${performance.totals.sends}`,
      detail: isZh ? '证明角色进入了真实聊天场景' : 'Shows the character entered real chat scenarios',
      icon: Send,
    },
    {
      label: isZh ? '单套最高发送' : 'Best single-set sends',
      value: `${performance.totals.bestSends}`,
      detail: isZh ? '粉鼻子Bella：95 下载 / 475 发送' : 'Pink-nose Bella: 95 downloads / 475 sends',
      icon: Trophy,
    },
  ];
  const evidenceCards = [
    {
      title: isZh ? '上架作品后台' : 'Published works dashboard',
      src: IP_UNIVERSE_ASSETS.metricsScreenshots.worksTable,
      icon: BarChart3,
      copy: isZh ? '展示每套表情包的下载、发送、状态和更新时间。' : 'Shows downloads, sends, status, and update date for each set.',
    },
    {
      title: isZh ? '单套数据走势' : 'Single-set performance trend',
      src: IP_UNIVERSE_ASSETS.metricsScreenshots.analyticsChart,
      icon: LineChart,
      copy: isZh ? '“粉鼻子Bella”30 天内累计 95 次下载、475 次发送。' : 'Pink-nose Bella reached 95 downloads and 475 sends over 30 days.',
    },
  ];

  return (
    <ModalPortal>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={overlayTransition}
      className="fixed inset-0 z-[99999] bg-[#2a190c]/44 p-3 backdrop-blur-xl sm:p-6"
      onWheelCapture={(event) => event.stopPropagation()}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.985 }}
        transition={overlayTransition}
        className="relative mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[34px] bg-[#fbf2e5] shadow-[0_40px_120px_rgba(42,25,12,0.28)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={isZh ? '关闭' : 'Close'}
          className="absolute right-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#dfd0bf] bg-white/86 text-[#3B230E] shadow-sm transition hover:bg-white"
        >
          <X size={17} />
        </button>

        <div className="flex-1 overflow-y-auto">
          <section className="relative grid min-h-[500px] gap-6 overflow-hidden px-5 pb-8 pt-16 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:px-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_8%,rgba(246,198,133,0.42),rgba(246,198,133,0)_34%),radial-gradient(circle_at_86%_18%,rgba(140,84,98,0.2),rgba(140,84,98,0)_30%)]" />
            <div className="relative z-10 flex flex-col justify-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.32em] text-[#8C5462]">
                {isZh ? 'IP 宇宙' : 'IP Universe'}
              </p>
              <h2 className={`mt-4 ${titleClass}`}>
                {isZh ? '把角色做成一个可以生长的小世界' : 'A character world that can keep growing'}
              </h2>
              <p className={`mt-5 max-w-xl ${bodyClass}`}>
                {isZh
                  ? '这个子页面展示我的主 IP、同事形象延展、动画和工作表情包。它不是单张角色图，而是一套可以用在头像、横幅、聊天、工作情绪和小动画里的视觉资产系统。'
                  : 'This page shows my main IP, team-character extensions, motion pieces, and work stickers. It is not a single character image, but a visual asset system for avatars, banners, chat, work moods, and short animations.'}
              </p>
              <div className="mt-7 flex flex-wrap gap-2">
                {[isZh ? '角色设定' : 'Character system', isZh ? '工作表情包' : 'Work stickers', isZh ? '动画延展' : 'Motion extension'].map((item) => (
                  <span key={item} className="rounded-full bg-white/72 px-3 py-1.5 text-[12px] font-medium text-[#6f6257] shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative z-10 grid content-center gap-3">
              <motion.figure
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08, ...overlayTransition }}
                className="group overflow-hidden rounded-[28px] border border-white/74 bg-white p-2 shadow-[0_22px_58px_rgba(59,35,14,0.13)]"
              >
                <MediaTile src={IP_UNIVERSE_ASSETS.showcase[0]} imgClassName="aspect-[2.5/1] h-full w-full rounded-[22px] object-cover transition duration-500 group-hover:scale-[1.025]" />
              </motion.figure>
            </div>
          </section>

          <section className="px-5 pb-12 sm:px-8 lg:px-10">
            <div className="sticky top-0 z-20 -mx-5 mb-5 border-y border-[#e7d7c4] bg-[#fbf2e5]/86 px-5 py-3 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-10 lg:px-10">
              <div className="flex flex-wrap gap-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTab(tab.id)}
                      className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold transition ${
                        activeTab === tab.id ? 'bg-[#3B230E] text-white' : 'bg-white/70 text-[#5F4E41] hover:bg-white'
                      }`}
                    >
                      <Icon size={15} />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'main' ? (
                <motion.div
                  key="main"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={overlayTransition}
                  className="space-y-6"
                >
                  <div className="grid gap-5 xl:grid-cols-[0.72fr_1.28fr]">
                    <aside className="rounded-[30px] bg-white/78 p-5 shadow-[0_18px_48px_rgba(59,35,14,0.08)]">
                      <div className="flex items-start gap-4">
                        <figure className="h-24 w-24 shrink-0 overflow-hidden rounded-[24px] bg-[#fff7ef] p-1 shadow-inner sm:h-32 sm:w-32">
                          <MediaTile src={IP_UNIVERSE_ASSETS.hero[0]} imgClassName="h-full w-full rounded-[20px] object-cover" />
                        </figure>
                        <div>
                          <p className="text-[18px] font-semibold text-[#3B230E]">{isZh ? '主 IP 是个人品牌的角色入口' : 'The main IP is the character entrance to my brand'}</p>
                          <p className={`mt-2 ${bodyClass}`}>
                            {isZh
                              ? '它不是单张头像，而是一套可以被上架、发送、延展和复用的内容系统。角色先建立识别，再通过表情包和 banner 进入真实使用场景。'
                              : 'It is not one avatar, but a content system that can be published, sent, extended, and reused. The character builds recognition first, then enters real use through stickers and banners.'}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 rounded-[24px] bg-[#3B230E] p-5 text-white shadow-[0_18px_44px_rgba(59,35,14,0.18)]">
                        <Quote size={22} className="text-[#F6C685]" />
                        <p className={`${isZh ? zhWalkthroughType.displayM : 'font-serif'} mt-3 text-[22px] leading-[1.3]`}>
                          {isZh
                            ? '核心能力不是“画得可爱”，而是把一个角色做成能被持续使用的品牌资产。'
                            : 'The core ability is not making something cute, but turning a character into a reusable brand asset.'}
                        </p>
                      </div>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {mainIpRules.map((rule) => (
                          <span key={rule} className="rounded-full border border-[#ead8c6] bg-[#fff9f1] px-3 py-1.5 text-[12px] font-medium text-[#6f6257]">
                            {rule}
                          </span>
                        ))}
                      </div>
                    </aside>

                    <div>
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 text-[#8C5462]">
                          <Images size={18} />
                          <p className="text-[13px] font-semibold">{isZh ? '小型瀑布流预览' : 'Compact waterfall preview'}</p>
                        </div>
                        <span className="rounded-full bg-white/70 px-3 py-1 text-[12px] font-medium text-neutral-500">
                          {isZh ? 'banner / 表情 / 团队延展' : 'banners / stickers / team extension'}
                        </span>
                      </div>
                      <div className="columns-2 gap-3 md:columns-3">
                        {IP_UNIVERSE_ASSETS.showcase.map((src, index) => (
                          <motion.figure
                            key={src}
                            whileHover={{ y: -6, rotate: index % 2 === 0 ? -0.8 : 0.8 }}
                            className="group mb-3 break-inside-avoid overflow-hidden rounded-[22px] bg-white p-1.5 shadow-[0_14px_34px_rgba(59,35,14,0.09)]"
                          >
                            <MediaTile
                              src={src}
                              imgClassName={`${index >= 3 ? 'aspect-square' : 'aspect-[4/3]'} max-h-[230px] w-full rounded-[17px] object-cover transition duration-500 group-hover:scale-[1.035]`}
                            />
                          </motion.figure>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                    {mainIpStats.map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <article key={stat.label} className="rounded-[24px] bg-white/78 p-5 shadow-[0_14px_36px_rgba(59,35,14,0.07)]">
                          <div className="flex items-center justify-between gap-3">
                            <span className="grid h-10 w-10 place-items-center rounded-full bg-[#8C5462]/10 text-[#8C5462]">
                              <Icon size={18} />
                            </span>
                            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#B67655]">{isZh ? '数据证据' : 'Evidence'}</p>
                          </div>
                          <p className="mt-5 text-[34px] font-semibold leading-none text-[#3B230E]">{stat.value}</p>
                          <p className="mt-3 text-[14px] font-semibold text-[#3B230E]">{stat.label}</p>
                          <p className="mt-1 text-[12px] leading-5 text-neutral-500">{stat.detail}</p>
                        </article>
                      );
                    })}
                  </div>

                  <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
                    <div className="grid gap-4">
                      {evidenceCards.map((card) => {
                        const Icon = card.icon;
                        return (
                          <article key={card.title} className="overflow-hidden rounded-[28px] bg-white/78 shadow-[0_18px_48px_rgba(59,35,14,0.08)]">
                            <div className="flex items-start justify-between gap-4 p-5">
                              <div>
                                <div className="flex items-center gap-2 text-[#8C5462]">
                                  <Icon size={18} />
                                  <p className="text-[15px] font-semibold text-[#3B230E]">{card.title}</p>
                                </div>
                                <p className="mt-2 text-[13px] leading-6 text-neutral-500">{card.copy}</p>
                              </div>
                            </div>
                            <figure className="border-t border-[#ead8c6] bg-[#fdfaf5] p-3">
                              <MediaTile src={card.src} imgClassName="max-h-[280px] w-full rounded-[18px] object-contain" />
                            </figure>
                          </article>
                        );
                      })}
                    </div>

                    <div className="space-y-4">
                      <article className="rounded-[28px] bg-white/78 p-5 shadow-[0_18px_48px_rgba(59,35,14,0.08)]">
                        <div className="flex items-center gap-2 text-[#8C5462]">
                          <Route size={18} />
                          <p className="text-[15px] font-semibold text-[#3B230E]">{isZh ? '从角色到真实使用' : 'From character to real use'}</p>
                        </div>
                        <div className="mt-4 space-y-3">
                          {mainIpFlow.map((item, index) => (
                            <div key={item.label} className="grid grid-cols-[32px_1fr] gap-3">
                              <span className="grid h-8 w-8 place-items-center rounded-full bg-[#F6C685]/36 text-[12px] font-bold text-[#7B4C2F]">{index + 1}</span>
                              <div className="border-b border-[#ead8c6] pb-3 last:border-b-0 last:pb-0">
                                <p className="text-[14px] font-semibold text-[#3B230E]">{item.label}</p>
                                <p className="mt-1 text-[12px] leading-5 text-neutral-500">{item.detail}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </article>

                      <article className="rounded-[28px] bg-white/78 p-5 shadow-[0_18px_48px_rgba(59,35,14,0.08)]">
                        <div className="flex items-center gap-2 text-[#8C5462]">
                          <BarChart3 size={18} />
                          <p className="text-[15px] font-semibold text-[#3B230E]">{isZh ? '5 套上架作品表现' : 'Performance of 5 published sets'}</p>
                        </div>
                        <div className="mt-4 space-y-2">
                          {performance.albums.map((album) => (
                            <div key={album.name} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-[16px] bg-[#fffaf2] px-3 py-2">
                              <div>
                                <p className="text-[13px] font-semibold text-[#3B230E]">{album.name}</p>
                                <p className="mt-0.5 text-[11px] text-neutral-400">{album.updated}</p>
                              </div>
                              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#6f6257]">
                                <Download size={13} />
                                {album.downloads}
                              </span>
                              <span className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#6f6257]">
                                <Send size={13} />
                                {album.sends}
                              </span>
                            </div>
                          ))}
                        </div>
                      </article>
                    </div>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-[0.72fr_1.28fr]">
                    <article className="rounded-[28px] bg-[#3B230E] p-6 text-white shadow-[0_20px_58px_rgba(59,35,14,0.18)]">
                      <Smartphone size={23} className="text-[#F6C685]" />
                      <p className="mt-4 text-[20px] font-semibold">{isZh ? '用户看到的是一个可添加、可发送的表情专辑' : 'Users see an addable, sendable sticker set'}</p>
                      <p className="mt-3 text-[13px] leading-6 text-white/72">
                        {isZh
                          ? '我把 AI 生成图像继续加工成真实平台可用的专辑结构：封面、单张表情、命名、主题文案和使用场景都要统一。'
                          : 'I turned AI-generated images into a real platform-ready set: cover, individual stickers, naming, theme copy, and usage context all stay coherent.'}
                      </p>
                    </article>
                    <div className="grid grid-cols-2 gap-4">
                      {[IP_UNIVERSE_ASSETS.metricsScreenshots.mobileMain, IP_UNIVERSE_ASSETS.metricsScreenshots.mobileHoliday].map((src) => (
                        <figure key={src} className="overflow-hidden rounded-[28px] bg-white p-2 shadow-[0_18px_48px_rgba(59,35,14,0.08)]">
                          <MediaTile src={src} imgClassName="max-h-[460px] w-full rounded-[22px] object-contain" />
                        </figure>
                      ))}
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    {IP_UNIVERSE_ASSETS.videos.map((src) => (
                      <figure key={src} className="overflow-hidden rounded-[28px] bg-[#1f1712] shadow-[0_20px_54px_rgba(59,35,14,0.16)]">
                        <MediaTile src={src} controls imgClassName="aspect-[4/3] h-full w-full object-cover" />
                      </figure>
                    ))}
                  </div>
                </motion.div>
              ) : null}

              {activeTab === 'team' ? (
                <motion.div
                  key="team"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={overlayTransition}
                  className="space-y-5"
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    {IP_UNIVERSE_ASSETS.teamShowcase.map((src, index) => (
                      <motion.figure
                        key={src}
                        whileHover={{ y: -6, rotate: index % 2 === 0 ? -0.8 : 0.8 }}
                        className="group overflow-hidden rounded-[26px] bg-white p-2 shadow-[0_16px_42px_rgba(59,35,14,0.09)]"
                      >
                        <MediaTile src={src} imgClassName="aspect-[2.35/1] h-full w-full rounded-[20px] object-cover transition duration-500 group-hover:scale-[1.035]" />
                      </motion.figure>
                    ))}
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {IP_UNIVERSE_ASSETS.colleagues.map((src, index) => (
                      <motion.figure
                        key={src}
                        whileHover={{ y: -8, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
                        className={`${index === 0 ? 'sm:col-span-2 lg:col-span-2' : ''} group overflow-hidden rounded-[26px] bg-white p-2 shadow-[0_16px_42px_rgba(59,35,14,0.09)]`}
                      >
                        <MediaTile src={src} imgClassName={`${index === 0 ? 'aspect-[3/2]' : 'aspect-square'} h-full w-full rounded-[20px] object-cover transition duration-500 group-hover:scale-[1.035]`} />
                      </motion.figure>
                    ))}
                  </div>
                </motion.div>
              ) : null}

              {activeTab === 'stickers' ? (
                <motion.div
                  key="stickers"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={overlayTransition}
                  className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]"
                >
                  <div className="rounded-[28px] bg-white/74 p-5 shadow-[0_18px_48px_rgba(59,35,14,0.08)]">
                    <Sticker className="text-[#8C5462]" size={24} />
                    <p className="mt-4 text-[18px] font-semibold text-[#3B230E]">{isZh ? '把工作情绪变成表情包' : 'Turning work moods into stickers'}</p>
                    <p className={`mt-3 ${bodyClass}`}>
                      {isZh
                        ? '这些表情包覆盖开工、开会、赶方案、DDL、摸鱼、收工等办公室情绪。它让 IP 不只停在角色设定里，而是进入真实使用场景。'
                        : 'These stickers cover office moments like starting work, meetings, deadlines, focus time, and wrapping up. The IP moves from character design into real use.'}
                    </p>
                    <figure className="mt-5 overflow-hidden rounded-[24px] bg-[#fffaf2]">
                      <MediaTile src={IP_UNIVERSE_ASSETS.roundedStickers[0]} imgClassName="w-full object-cover" />
                    </figure>
                  </div>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5">
                    {IP_UNIVERSE_ASSETS.stickers.map((src, index) => (
                      <motion.figure
                        key={src}
                        whileHover={{ y: -7, rotate: index % 2 === 0 ? -3 : 3, scale: 1.04 }}
                        whileTap={{ scale: 0.94 }}
                        className="group aspect-square overflow-hidden rounded-[24px] bg-white p-2 shadow-[0_12px_30px_rgba(59,35,14,0.08)]"
                      >
                        <MediaTile src={src} imgClassName="h-full w-full rounded-[18px] object-cover" />
                      </motion.figure>
                    ))}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </section>
        </div>
      </motion.div>
    </motion.div>
    </ModalPortal>
  );
};

export const DailySparkModal: React.FC<DailySparkModalProps> = ({ kind, title, message, isZh, onClose }) => {
  const assets = DAILY_SPARK_ASSETS[kind];
  const languageKey = isZh ? 'zh' : 'en';
  const uploadStorageKey = `daily-spark:${kind}:uploads`;
  const hiddenStorageKey = `daily-spark:${kind}:hidden`;
  const readingStorageKey = `daily-spark:reading:${languageKey}`;
  const [isManaging, setIsManaging] = useState(false);
  const [uploadedAssets, setUploadedAssets] = useState<string[]>(() => safeReadJson<string[]>(uploadStorageKey, []));
  const [hiddenAssets, setHiddenAssets] = useState<string[]>(() => safeReadJson<string[]>(hiddenStorageKey, []));
  const [readingItems, setReadingItems] = useState<ReadingExcerpt[]>(() =>
    safeReadJson<ReadingExcerpt[]>(readingStorageKey, isZh ? READING_EXCERPTS.zh : READING_EXCERPTS.en),
  );
  const [editingExcerptIndex, setEditingExcerptIndex] = useState<number | null>(null);
  const [excerptDraft, setExcerptDraft] = useState<ReadingExcerpt>({ title: '', body: '', note: '' });
  const excerpts = readingItems;
  const iconMap = {
    painting: Pencil,
    reading: BookOpen,
    dance: Music,
    travel: Camera,
  };
  const Icon = iconMap[kind];
  const titleClass = isZh
    ? `${zhWalkthroughType.displayL} text-[34px] leading-[1.08] text-[#3B230E] sm:text-[44px]`
    : 'font-serif text-[38px] leading-[1.04] text-[#3B230E] sm:text-[52px]';
  const bodyClass = isZh
    ? `${zhWalkthroughType.bodyM} text-[15px] leading-[1.82] text-neutral-600`
    : 'font-sans text-[15px] leading-[1.78] text-neutral-600';

  const mediaAssets = useMemo(
    () => [...assets.filter((src) => Boolean(src) && !hiddenAssets.includes(src)), ...uploadedAssets],
    [assets, hiddenAssets, uploadedAssets],
  );

  const persistUploads = (nextUploads: string[]) => {
    setUploadedAssets(nextUploads);
    safeWriteJson(uploadStorageKey, nextUploads);
  };

  const persistHidden = (nextHidden: string[]) => {
    setHiddenAssets(nextHidden);
    safeWriteJson(hiddenStorageKey, nextHidden);
  };

  const persistReading = (nextItems: ReadingExcerpt[]) => {
    setReadingItems(nextItems);
    safeWriteJson(readingStorageKey, nextItems);
  };

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;
    const nextUploads = [...uploadedAssets, ...(await readFilesAsDataUrls(files))];
    persistUploads(nextUploads);
    event.target.value = '';
  };

  const deleteMedia = (src: string) => {
    if (uploadedAssets.includes(src)) {
      persistUploads(uploadedAssets.filter((item) => item !== src));
      return;
    }
    persistHidden([...hiddenAssets, src]);
  };

  const replaceMedia = async (src: string, event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files?.length) return;
    const [replacement] = await readFilesAsDataUrls(files);
    if (uploadedAssets.includes(src)) {
      persistUploads(uploadedAssets.map((item) => (item === src ? replacement : item)));
    } else {
      persistHidden([...hiddenAssets, src]);
      persistUploads([...uploadedAssets, replacement]);
    }
    event.target.value = '';
  };

  const openExcerptEditor = (index: number | null) => {
    setEditingExcerptIndex(index);
    setExcerptDraft(index === null ? { title: '', body: '', note: '' } : excerpts[index]);
  };

  const saveExcerpt = () => {
    if (!excerptDraft.title.trim() || !excerptDraft.body.trim()) return;
    const nextDraft = {
      title: excerptDraft.title.trim(),
      body: excerptDraft.body.trim(),
      note: excerptDraft.note.trim(),
    };
    const nextItems =
      editingExcerptIndex === null
        ? [...excerpts, nextDraft]
        : excerpts.map((item, index) => (index === editingExcerptIndex ? nextDraft : item));
    persistReading(nextItems);
    setEditingExcerptIndex(null);
  };

  const deleteExcerpt = (index: number) => {
    persistReading(excerpts.filter((_, itemIndex) => itemIndex !== index));
    if (editingExcerptIndex === index) setEditingExcerptIndex(null);
  };
  const sparkCopy = {
    painting: {
      mode: isZh ? '像翻一本速写本' : 'Like opening a sketchbook',
      role: isZh
        ? '绘画保存的是我对构图、颜色和情绪的直觉。它们会反过来影响我做产品视觉、AI 图像和故事表达。'
        : 'Drawing keeps my intuition for composition, color, and mood. It feeds back into product visuals, AI imagery, and storytelling.',
      labels: [isZh ? '构图练习' : 'Composition', isZh ? '颜色情绪' : 'Color mood', isZh ? '角色/海报' : 'Character/poster', isZh ? '手作质感' : 'Handmade texture'],
      accent: 'text-[#8C5462]',
      soft: 'bg-[#8C5462]/10',
      icon: Brush,
    },
    reading: {
      mode: isZh ? '把句子转成设计判断' : 'Turning sentences into design judgment',
      role: isZh
        ? '阅读不是装饰性的兴趣，它帮助我把“为什么这样设计”说清楚：观看、行动、城市和记忆都会变成设计素材。'
        : 'Reading is not decorative. It helps me explain why a design should work: seeing, action, cities, and memory all become design material.',
      labels: [isZh ? '观点摘录' : 'Point of view', isZh ? '设计判断' : 'Design judgment', isZh ? '叙事素材' : 'Narrative material', isZh ? '语言灵感' : 'Language'],
      accent: 'text-[#6C5A8A]',
      soft: 'bg-[#6C5A8A]/10',
      icon: Quote,
    },
    dance: {
      mode: isZh ? '用身体理解节奏' : 'Understanding rhythm through the body',
      role: isZh
        ? '跳舞让我更敏感地判断动效的节奏、停顿和力量。它也训练我对“动作如何被观看”的感知。'
        : 'Dance makes me more sensitive to motion rhythm, pauses, and force. It trains how I understand actions being watched.',
      labels: [isZh ? '动作记忆' : 'Motion memory', isZh ? '节奏控制' : 'Rhythm control', isZh ? '舞台镜头' : 'Stage frame', isZh ? '情绪释放' : 'Release'],
      accent: 'text-[#2E6378]',
      soft: 'bg-[#2E6378]/10',
      icon: PlayCircle,
    },
    travel: {
      mode: isZh ? '把地点收进视觉地图' : 'Collecting places as a visual map',
      role: isZh
        ? '旅行素材不是单纯的风景照。我会收集光线、街角、距离感和偶然的构图，作为之后做叙事视觉的资料库。'
        : 'Travel material is not just scenery. I collect light, corners, distance, and accidental compositions for later visual storytelling.',
      labels: [isZh ? '城市切片' : 'City fragments', isZh ? '光线收藏' : 'Light archive', isZh ? '路线记忆' : 'Route memory', isZh ? '偶然构图' : 'Accidental frames'],
      accent: 'text-[#B67655]',
      soft: 'bg-[#B67655]/10',
      icon: Map,
    },
  }[kind];
  const SparkModeIcon = sparkCopy.icon;
  const acceptedMediaTypes = kind === 'dance' ? 'video/*' : kind === 'reading' ? undefined : 'image/*,video/*';

  const renderMediaActions = (src: string) => {
    if (!isManaging) return null;

    return (
      <div className="absolute inset-x-3 top-3 z-20 flex items-center justify-end gap-2">
        <label className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-white/30 bg-black/55 px-2.5 py-1 text-[11px] font-semibold text-white shadow-[0_8px_18px_rgba(0,0,0,0.22)] backdrop-blur-md transition hover:bg-black/70">
          <PencilLine size={12} />
          <span>{isZh ? '替换' : 'Replace'}</span>
          <input type="file" accept={acceptedMediaTypes} className="sr-only" onChange={(event) => replaceMedia(src, event)} />
        </label>
        <button
          type="button"
          onClick={() => deleteMedia(src)}
          className="inline-flex items-center gap-1 rounded-full border border-red-200/30 bg-red-500/70 px-2.5 py-1 text-[11px] font-semibold text-white shadow-[0_8px_18px_rgba(0,0,0,0.22)] backdrop-blur-md transition hover:bg-red-500"
        >
          <Trash2 size={12} />
          <span>{isZh ? '删除' : 'Delete'}</span>
        </button>
      </div>
    );
  };

  const renderPainting = () => {
    if (!mediaAssets.length) {
      return <EmptyVisualShelf isZh={isZh} kind={kind} />;
    }

    const featuredWorks = mediaAssets.slice(0, 4);
    const galleryWorks = mediaAssets.slice(4);

    return (
      <div className="space-y-5">
        <div className="rounded-[34px] bg-[#2f2119] p-4 shadow-[0_28px_72px_rgba(59,35,14,0.2)]">
          <div className="grid gap-4 xl:grid-cols-[1.08fr_0.92fr]">
            <motion.figure
              whileHover={{ y: -6, rotate: -0.6 }}
              className="group relative overflow-hidden rounded-[28px] bg-[#fffaf2] p-3 shadow-[0_18px_44px_rgba(0,0,0,0.16)]"
            >
              {renderMediaActions(featuredWorks[0])}
              <MediaTile src={featuredWorks[0]} imgClassName="mx-auto max-h-[560px] w-auto max-w-full rounded-[22px] object-contain transition duration-500 group-hover:scale-[1.015]" />
            </motion.figure>
            <div className="grid gap-4 sm:grid-cols-2">
              {featuredWorks.slice(1).map((src, index) => (
                <motion.figure
                  key={src}
                  whileHover={{ y: -6, rotate: index % 2 === 0 ? 0.8 : -0.8 }}
                  className="group relative overflow-hidden rounded-[26px] bg-[#fffaf2] p-3 shadow-[0_16px_38px_rgba(0,0,0,0.14)]"
                >
                  {renderMediaActions(src)}
                  <MediaTile src={src} imgClassName="mx-auto max-h-[240px] w-auto max-w-full rounded-[20px] object-contain transition duration-500 group-hover:scale-[1.015]" />
                </motion.figure>
              ))}
              <article className="rounded-[26px] bg-[#f8d089] p-5 text-[#3B230E] shadow-[0_16px_38px_rgba(0,0,0,0.12)] sm:col-span-2">
                <Palette size={22} />
                <p className={`${isZh ? zhWalkthroughType.displayM : 'font-serif'} mt-4 text-[24px] leading-[1.28]`}>
                  {isZh ? '我想让别人先看到作品本身的完成度。' : 'I want the work itself to show the craft first.'}
                </p>
                <p className="mt-3 text-[13px] leading-6 text-[#5f4a34]">
                  {isZh ? '所以这里不裁剪画面：完整保留构图、边界、笔触和版式，让作品像被挂在展墙上一样被观看。' : 'So the images are not cropped: composition, edges, brushwork, and layout stay intact, like works on a gallery wall.'}
                </p>
              </article>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] bg-white/72 px-4 py-3 shadow-[0_12px_30px_rgba(59,35,14,0.06)]">
          <div className="flex items-center gap-2 text-[#8C5462]">
            <Brush size={17} />
            <p className="text-[13px] font-semibold">{isZh ? '完整比例作品墙' : 'Full-ratio gallery wall'}</p>
          </div>
          <p className="text-[12px] leading-5 text-neutral-500">
            {isZh ? '每一张都按原图比例展示，不裁切画面。' : 'Every piece keeps its original ratio without cropping.'}
          </p>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 xl:columns-3">
          {galleryWorks.map((src, index) => (
            <motion.figure
              key={src}
              whileHover={{ y: -7, rotate: index % 2 === 0 ? -0.6 : 0.6 }}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-[28px] bg-white p-3 shadow-[0_16px_42px_rgba(59,35,14,0.08)]"
            >
              {renderMediaActions(src)}
              <MediaTile src={src} imgClassName="h-auto w-full rounded-[22px] object-contain transition duration-500 group-hover:scale-[1.012]" />
            </motion.figure>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <article className="rounded-[26px] bg-white/76 p-5 shadow-[0_14px_36px_rgba(59,35,14,0.07)]">
            <p className="text-[15px] font-semibold text-[#3B230E]">{isZh ? '构图能力' : 'Composition'}</p>
            <p className="mt-2 text-[13px] leading-6 text-neutral-500">
              {isZh ? '海报、静物和插画练习展示了不同画面结构的控制能力。' : 'Poster, still-life, and illustration studies show control across different visual structures.'}
            </p>
          </article>
          <article className="rounded-[26px] bg-white/76 p-5 shadow-[0_14px_36px_rgba(59,35,14,0.07)]">
            <p className="text-[15px] font-semibold text-[#3B230E]">{isZh ? '色彩判断' : 'Color judgment'}</p>
            <p className="mt-2 text-[13px] leading-6 text-neutral-500">
              {isZh ? '从高饱和橙色到黑白素描，能看出我对情绪和明暗的处理。' : 'From saturated orange studies to monochrome sketches, the work shows mood and value control.'}
            </p>
          </article>
          <article className="rounded-[26px] bg-white/76 p-5 shadow-[0_14px_36px_rgba(59,35,14,0.07)]">
            <p className="text-[15px] font-semibold text-[#3B230E]">{isZh ? '视觉转译' : 'Visual translation'}</p>
            <p className="mt-2 text-[13px] leading-6 text-neutral-500">
              {isZh ? '这些手绘经验会继续迁移到 AI 图像、品牌视觉和产品界面判断里。' : 'These drawing skills transfer into AI images, brand visuals, and product interface decisions.'}
            </p>
          </article>
        </div>
      </div>
    );
  };

  const renderReading = () => (
    <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
      <article className="rounded-[30px] bg-[#34263f] p-7 text-white shadow-[0_24px_64px_rgba(52,38,63,0.2)]">
        <Quote size={28} className="text-[#F6C685]" />
        <p className={`${isZh ? zhWalkthroughType.displayM : 'font-serif'} mt-6 text-[30px] leading-[1.22] sm:text-[38px]`}>
          {isZh ? '阅读帮助我把感受变成能被解释的设计语言。' : 'Reading helps turn feeling into explainable design language.'}
        </p>
        <p className="mt-5 text-[14px] leading-7 text-white/72">{sparkCopy.role}</p>
      </article>
      <div className="space-y-4">
        {isManaging ? (
          <div className="rounded-[26px] border border-[#d9c4b0] bg-white/82 p-4 shadow-[0_14px_34px_rgba(59,35,14,0.07)]">
            <div className="grid gap-3">
              <input
                value={excerptDraft.title}
                onChange={(event) => setExcerptDraft({ ...excerptDraft, title: event.target.value })}
                placeholder={isZh ? '标题' : 'Title'}
                className="rounded-[16px] border border-[#ead8c6] bg-[#fffaf2] px-4 py-3 text-[13px] text-[#3B230E] outline-none focus:border-[#8C5462]"
              />
              <textarea
                value={excerptDraft.body}
                onChange={(event) => setExcerptDraft({ ...excerptDraft, body: event.target.value })}
                placeholder={isZh ? '摘录内容' : 'Excerpt'}
                rows={3}
                className="rounded-[16px] border border-[#ead8c6] bg-[#fffaf2] px-4 py-3 text-[13px] leading-6 text-[#3B230E] outline-none focus:border-[#8C5462]"
              />
              <textarea
                value={excerptDraft.note}
                onChange={(event) => setExcerptDraft({ ...excerptDraft, note: event.target.value })}
                placeholder={isZh ? '设计联想 / 备注' : 'Design note'}
                rows={2}
                className="rounded-[16px] border border-[#ead8c6] bg-[#fffaf2] px-4 py-3 text-[13px] leading-6 text-[#3B230E] outline-none focus:border-[#8C5462]"
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={saveExcerpt}
                className="inline-flex items-center gap-2 rounded-full bg-[#3B230E] px-4 py-2 text-[12px] font-semibold text-white transition hover:bg-[#54331a]"
              >
                <Save size={14} />
                {editingExcerptIndex === null ? (isZh ? '添加摘录' : 'Add excerpt') : isZh ? '保存修改' : 'Save changes'}
              </button>
              <button
                type="button"
                onClick={() => openExcerptEditor(null)}
                className="inline-flex items-center gap-2 rounded-full border border-[#ead8c6] bg-white px-4 py-2 text-[12px] font-semibold text-[#6f6257] transition hover:bg-[#fffaf2]"
              >
                <Plus size={14} />
                {isZh ? '新建' : 'New'}
              </button>
            </div>
          </div>
        ) : null}
        {excerpts.map((excerpt, index) => (
          <motion.article
            key={excerpt.title}
            whileHover={{ x: 8 }}
            className="relative grid gap-4 rounded-[26px] bg-white/78 p-5 shadow-[0_16px_42px_rgba(59,35,14,0.08)] md:grid-cols-[0.28fr_1fr]"
          >
            {isManaging ? (
              <div className="absolute right-4 top-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openExcerptEditor(index)}
                  className="grid h-8 w-8 place-items-center rounded-full bg-[#34263f]/10 text-[#34263f] transition hover:bg-[#34263f]/16"
                  aria-label={isZh ? '编辑摘录' : 'Edit excerpt'}
                >
                  <PencilLine size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => deleteExcerpt(index)}
                  className="grid h-8 w-8 place-items-center rounded-full bg-red-500/10 text-red-600 transition hover:bg-red-500/16"
                  aria-label={isZh ? '删除摘录' : 'Delete excerpt'}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : null}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#B67655]">{String(index + 1).padStart(2, '0')}</p>
              <p className="mt-3 text-[17px] font-semibold text-[#3B230E]">{excerpt.title}</p>
            </div>
            <div>
              <blockquote className={`border-l-2 border-[#6C5A8A] pl-4 ${bodyClass}`}>{excerpt.body}</blockquote>
              <p className="mt-4 rounded-[18px] bg-[#fffaf2] p-4 text-[13px] leading-6 text-neutral-500">{excerpt.note}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );

  const renderDance = () => {
    if (!mediaAssets.length) {
      return <EmptyVisualShelf isZh={isZh} kind={kind} />;
    }

    return (
      <div className="space-y-4">
        <div className="grid gap-4 xl:grid-cols-[1.18fr_0.82fr]">
          <figure className="relative overflow-hidden rounded-[32px] bg-[#101418] p-2 shadow-[0_24px_64px_rgba(16,20,24,0.22)]">
            {renderMediaActions(mediaAssets[0])}
            <MediaTile src={mediaAssets[0]} controls imgClassName="aspect-video h-full w-full rounded-[26px] object-cover" />
          </figure>
          <div className="grid gap-4">
            <article className="rounded-[28px] bg-white/78 p-5 shadow-[0_16px_42px_rgba(59,35,14,0.08)]">
              <Music size={22} className="text-[#2E6378]" />
              <p className="mt-4 text-[20px] font-semibold text-[#3B230E]">{isZh ? '动作也是一种交互设计参考' : 'Movement is also interaction reference'}</p>
              <p className={`mt-3 ${bodyClass}`}>{sparkCopy.role}</p>
            </article>
            <div className="grid grid-cols-2 gap-3">
              {sparkCopy.labels.map((label) => (
                <div key={label} className="rounded-[22px] bg-white/70 p-4 text-center shadow-[0_12px_30px_rgba(59,35,14,0.06)]">
                  <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-[#2E6378]/10 text-[#2E6378]">
                    <Clapperboard size={16} />
                  </span>
                  <p className="mt-3 text-[13px] font-semibold text-[#3B230E]">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mediaAssets.slice(1).map((src, index) => (
            <motion.figure
              key={src}
              whileHover={{ y: -7 }}
              className="relative overflow-hidden rounded-[26px] bg-[#101418] p-2 shadow-[0_16px_42px_rgba(16,20,24,0.14)]"
            >
              {renderMediaActions(src)}
              <MediaTile src={src} controls imgClassName={`${index % 3 === 0 ? 'aspect-[4/5]' : 'aspect-video'} h-full w-full rounded-[20px] object-cover`} />
            </motion.figure>
          ))}
        </div>
      </div>
    );
  };

  const renderTravel = () => {
    if (!mediaAssets.length) {
      return <EmptyVisualShelf isZh={isZh} kind={kind} />;
    }

    const routeStops = [
      isZh ? '看到一束光' : 'Find a light',
      isZh ? '停在一个街角' : 'Pause at a corner',
      isZh ? '收下一段距离' : 'Keep a sense of distance',
      isZh ? '带回一个画面' : 'Bring back a frame',
    ];

    return (
      <div className="space-y-4">
        <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <figure className="group relative min-h-[430px] overflow-hidden rounded-[32px] bg-white p-2 shadow-[0_24px_64px_rgba(59,35,14,0.11)]">
            {renderMediaActions(mediaAssets[0])}
            <MediaTile src={mediaAssets[0]} imgClassName="h-full min-h-[410px] w-full rounded-[26px] object-cover transition duration-500 group-hover:scale-[1.035]" />
            <div className="absolute inset-x-6 bottom-6 rounded-[24px] bg-[#2a190c]/62 p-5 text-white backdrop-blur-md">
              <Map size={20} className="text-[#F6C685]" />
              <p className="mt-3 text-[20px] font-semibold">{isZh ? '旅行不是风景清单，是视觉记忆路线。' : 'Travel is not a scenery list, but a visual memory route.'}</p>
              <p className="mt-2 text-[13px] leading-6 text-white/72">{sparkCopy.role}</p>
            </div>
          </figure>
          <div className="rounded-[30px] bg-white/78 p-5 shadow-[0_18px_48px_rgba(59,35,14,0.08)]">
            <div className="flex items-center gap-2 text-[#B67655]">
              <Route size={18} />
              <p className="text-[13px] font-semibold">{isZh ? '我的采集路径' : 'My collecting route'}</p>
            </div>
            <div className="mt-6 space-y-5">
              {routeStops.map((stop, index) => (
                <div key={stop} className="relative grid grid-cols-[38px_1fr] gap-3">
                  {index < routeStops.length - 1 ? <span className="absolute left-[18px] top-9 h-[calc(100%+10px)] w-px bg-[#ead8c6]" /> : null}
                  <span className="relative z-10 grid h-9 w-9 place-items-center rounded-full bg-[#F6C685]/40 text-[12px] font-bold text-[#7B4C2F]">{index + 1}</span>
                  <div>
                    <p className="text-[15px] font-semibold text-[#3B230E]">{stop}</p>
                    <p className="mt-1 text-[12px] leading-5 text-neutral-500">
                      {isZh ? '把这个瞬间留作之后做画面、叙事和空间感的参考。' : 'Keep this moment as reference for future image, narrative, and spatial feeling.'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid auto-rows-[180px] grid-cols-2 gap-4 md:grid-cols-4">
          {mediaAssets.slice(1).map((src, index) => (
            <motion.figure
              key={src}
              whileHover={{ y: -7, rotate: index % 2 === 0 ? -0.8 : 0.8 }}
              className={`${index % 5 === 0 ? 'row-span-2' : ''} ${index % 8 === 0 ? 'md:col-span-2' : ''} group relative overflow-hidden rounded-[26px] bg-white p-2 shadow-[0_14px_36px_rgba(59,35,14,0.08)]`}
            >
              {renderMediaActions(src)}
              <MediaTile src={src} imgClassName="h-full w-full rounded-[20px] object-cover transition duration-500 group-hover:scale-[1.035]" />
            </motion.figure>
          ))}
        </div>
      </div>
    );
  };

  const renderBody = () => {
    if (kind === 'reading') return renderReading();
    if (kind === 'dance') return renderDance();
    if (kind === 'travel') return renderTravel();
    return renderPainting();
  };

  return (
    <ModalPortal>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={overlayTransition}
      className="fixed inset-0 z-[99999] bg-[#2a190c]/44 p-3 backdrop-blur-xl sm:p-6"
      onWheelCapture={(event) => event.stopPropagation()}
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.985 }}
        transition={overlayTransition}
        className="relative mx-auto flex h-full max-w-7xl flex-col overflow-hidden rounded-[34px] bg-[#fbf2e5] shadow-[0_40px_120px_rgba(42,25,12,0.28)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={isZh ? '关闭' : 'Close'}
          className="absolute right-4 top-4 z-30 grid h-10 w-10 place-items-center rounded-full border border-[#dfd0bf] bg-white/86 text-[#3B230E] shadow-sm transition hover:bg-white"
        >
          <X size={17} />
        </button>

        <div className="flex-1 overflow-y-auto px-5 pb-12 pt-16 sm:px-8 lg:px-10">
          <section className={`grid gap-6 ${kind === 'painting' ? 'xl:grid-cols-[260px_1fr]' : 'xl:grid-cols-[320px_1fr]'}`}>
            <aside className="xl:sticky xl:top-8 xl:self-start">
              <div className="rounded-[30px] bg-white/78 p-5 shadow-[0_18px_48px_rgba(59,35,14,0.08)]">
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[12px] font-semibold shadow-sm ${sparkCopy.soft} ${sparkCopy.accent}`}>
                  <Icon size={15} />
                  <span>{isZh ? '日常灵感' : 'Daily Spark'}</span>
                </div>
                <h2 className={`mt-5 ${titleClass}`}>{title}</h2>
                <p className={`mt-4 ${bodyClass}`}>{message}</p>
                <div className="my-5 h-px bg-[#ead8c6]" />
                <div className="flex items-start gap-3">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${sparkCopy.soft} ${sparkCopy.accent}`}>
                    <SparkModeIcon size={18} />
                  </span>
                  <div>
                    <p className="text-[15px] font-semibold text-[#3B230E]">{sparkCopy.mode}</p>
                    <p className="mt-2 text-[13px] leading-6 text-neutral-500">{sparkCopy.role}</p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-2 gap-2">
                  {sparkCopy.labels.map((label) => (
                    <span key={label} className="rounded-[16px] bg-[#fffaf2] px-3 py-2 text-[12px] font-semibold text-[#6f6257]">
                      {label}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-2 text-[12px] font-semibold text-neutral-500">
                  <ImageIcon size={15} />
                  <span>
                    {kind === 'reading'
                      ? isZh ? `${excerpts.length} 条阅读摘录` : `${excerpts.length} excerpts`
                      : isZh ? `${mediaAssets.length} 个素材` : `${mediaAssets.length} assets`}
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsManaging((value) => !value);
                      if (kind === 'reading' && !isManaging) openExcerptEditor(null);
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold transition ${
                      isManaging ? 'bg-[#3B230E] text-white' : 'border border-[#ead8c6] bg-white text-[#6f6257] hover:bg-[#fffaf2]'
                    }`}
                  >
                    <PencilLine size={14} />
                    {isManaging ? (isZh ? '完成管理' : 'Done') : isZh ? '编辑 / 删除' : 'Edit / delete'}
                  </button>
                  {kind === 'reading' ? (
                    <button
                      type="button"
                      onClick={() => {
                        setIsManaging(true);
                        openExcerptEditor(null);
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-[#ead8c6] bg-white px-4 py-2 text-[12px] font-semibold text-[#6f6257] transition hover:bg-[#fffaf2]"
                    >
                      <Plus size={14} />
                      {isZh ? '添加' : 'Add'}
                    </button>
                  ) : (
                    <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#ead8c6] bg-white px-4 py-2 text-[12px] font-semibold text-[#6f6257] transition hover:bg-[#fffaf2]">
                      <Upload size={14} />
                      {isZh ? '上传' : 'Upload'}
                      <input type="file" multiple accept={acceptedMediaTypes} className="sr-only" onChange={handleUpload} />
                    </label>
                  )}
                </div>
              </div>
            </aside>

            <div>{renderBody()}</div>
          </section>
        </div>
      </motion.div>
    </motion.div>
    </ModalPortal>
  );
};

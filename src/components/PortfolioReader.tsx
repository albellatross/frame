import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  PanelLeftClose,
  PanelLeftOpen,
  ChevronUp,
  FileText,
  Maximize2,
  Minimize2,
  RotateCcw,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { Project } from '../types';
import { assetUrl } from '../utils/assets';

interface PortfolioReaderProps {
  project: Project;
  pages: string[];
  isZh: boolean;
  onClose: () => void;
  scrollRootRef?: React.RefObject<HTMLDivElement | null>;
}

interface PageVideoOverlay {
  src: string;
  left: number;
  top: number;
  width: number;
  height: number;
  borderRadius: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const isPdf = (src: string) => src.split('?')[0].toLowerCase().endsWith('.pdf');

const getPageVideoOverlay = (project: Project, page: string): PageVideoOverlay | null => {
  if (project.id !== 'p23' || !page.includes('/copilot-cmc-image-editing/page-05.png')) return null;

  return {
    src: '/projects/figma-portfolio/copilot-cmc-image-editing/desktop-01.mp4',
    left: (246 / 1920) * 100,
    top: (45 / 1080) * 100,
    width: (1428 / 1920) * 100,
    height: (990 / 1080) * 100,
    borderRadius: (8 / 1920) * 100,
  };
};

const PortfolioReader: React.FC<PortfolioReaderProps> = ({ project, pages, isZh, onClose, scrollRootRef }) => {
  const readerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLElement | null)[]>([]);
  const [zoom, setZoom] = useState(1);
  const [activePage, setActivePage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSlideMode, setIsSlideMode] = useState(true);
  const [isThumbRailCollapsed, setIsThumbRailCollapsed] = useState(false);
  const uniquePages = useMemo(() => pages.filter(Boolean), [pages]);

  useEffect(() => {
    setZoom(1);
    setActivePage(0);
    setIsSlideMode(true);
  }, [project.id]);

  useEffect(() => {
    setActivePage((page) => clamp(page, 0, Math.max(uniquePages.length - 1, 0)));
  }, [uniquePages.length]);

  useEffect(() => {
    if (isSlideMode) return;

    const root = scrollRootRef?.current || null;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        const index = Number(visible?.target.getAttribute('data-page-index'));
        if (Number.isFinite(index)) setActivePage(index);
      },
      { root, rootMargin: '-18% 0px -58% 0px', threshold: [0.12, 0.28, 0.5, 0.72] }
    );

    pageRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [isSlideMode, scrollRootRef, uniquePages.length]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const zoomBy = (step: number) => {
    setZoom((value) => clamp(Number((value + step).toFixed(2)), 0.5, 2.25));
  };

  const resetZoom = () => {
    setZoom(1);
  };

  const scrollToPage = (index: number) => {
    if (isSlideMode) {
      setActivePage(clamp(index, 0, Math.max(uniquePages.length - 1, 0)));
      return;
    }

    pageRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => {
    pageRefs.current[0]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleFullscreen = async () => {
    const element = readerRef.current;
    if (!element) return;

    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }

    await element.requestFullscreen();
  };

  const goToPreviousPage = () => {
    setActivePage((page) => clamp(page - 1, 0, Math.max(uniquePages.length - 1, 0)));
  };

  const goToNextPage = () => {
    setActivePage((page) => clamp(page + 1, 0, Math.max(uniquePages.length - 1, 0)));
  };

  const toggleReaderMode = () => {
    setIsSlideMode((value) => {
      const nextMode = !value;
      if (!nextMode) {
        window.setTimeout(() => {
          pageRefs.current[activePage]?.scrollIntoView({ block: 'start' });
        }, 0);
      }
      return nextMode;
    });
  };

  useEffect(() => {
    if (!isSlideMode) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.closest('input, textarea, select, [contenteditable="true"]')) return;

      if (event.key === 'ArrowLeft' || event.key === 'PageUp') {
        event.preventDefault();
        goToPreviousPage();
      }
      if (event.key === 'ArrowRight' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        goToNextPage();
      }
      if (event.key === 'Home') {
        event.preventDefault();
        setActivePage(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        setActivePage(Math.max(uniquePages.length - 1, 0));
      }
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSlideMode, onClose, uniquePages.length]);

  const pageCount = uniquePages.length;
  const currentPage = uniquePages[activePage] || uniquePages[0] || '';
  const presentationProgress = pageCount > 0 ? ((activePage + 1) / pageCount) * 100 : 0;
  const canGoPrevious = activePage > 0;
  const canGoNext = activePage < pageCount - 1;

  return (
    <div ref={readerRef} className="min-h-full bg-[#2F3033] text-white">
      <div className="sticky top-0 z-30 border-b border-white/10 bg-[#242528]/95 shadow-[0_12px_32px_rgba(0,0,0,0.24)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1680px] items-center gap-3 px-3 py-2.5 sm:px-5">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg bg-white/10 text-white">
              <FileText size={17} />
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold leading-5">{project.title}</p>
              <p className="font-mono text-[11px] text-white/45">
                {String(activePage + 1).padStart(2, '0')} / {String(uniquePages.length).padStart(2, '0')}
              </p>
            </div>
          </div>

          <div className={`${isSlideMode ? 'hidden' : 'hidden sm:flex'} items-center rounded-full border border-white/10 bg-white/[0.06] p-1`}>
            <button
              type="button"
              onClick={() => zoomBy(-0.15)}
              className="grid h-8 w-8 place-items-center rounded-full text-white/68 transition hover:bg-white/10 hover:text-white"
              aria-label={isZh ? '缩小' : 'Zoom out'}
              title={isZh ? '缩小' : 'Zoom out'}
            >
              <ZoomOut size={15} />
            </button>
            <button
              type="button"
              onClick={resetZoom}
              className="h-8 min-w-[58px] rounded-full px-3 font-mono text-[11px] text-white/72 transition hover:bg-white/10 hover:text-white"
              aria-label={isZh ? '适应宽度' : 'Fit width'}
              title={isZh ? '适应宽度' : 'Fit width'}
            >
              {Math.round(zoom * 100)}%
            </button>
            <button
              type="button"
              onClick={() => zoomBy(0.15)}
              className="grid h-8 w-8 place-items-center rounded-full text-white/68 transition hover:bg-white/10 hover:text-white"
              aria-label={isZh ? '放大' : 'Zoom in'}
              title={isZh ? '放大' : 'Zoom in'}
            >
              <ZoomIn size={15} />
            </button>
          </div>

          <button
            type="button"
            onClick={toggleReaderMode}
            className="hidden h-9 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 text-xs font-medium text-white/68 transition-[background-color,color,transform] duration-200 ease-out hover:bg-white/10 hover:text-white active:scale-[0.96] sm:inline-flex"
            aria-pressed={isSlideMode}
            aria-label={isSlideMode ? (isZh ? '切换为纵向阅读' : 'Switch to scroll reading') : (isZh ? '切换为演示模式' : 'Switch to presentation mode')}
            title={isSlideMode ? (isZh ? '纵向阅读' : 'Scroll reading') : (isZh ? '演示模式' : 'Presentation mode')}
          >
            {isSlideMode ? <FileText size={15} /> : <Maximize2 size={15} />}
            <span className="hidden xl:inline">{isSlideMode ? (isZh ? '纵向' : 'Scroll') : (isZh ? '演示' : 'Present')}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsThumbRailCollapsed((value) => !value)}
            className={`${isSlideMode ? 'hidden' : 'hidden lg:inline-flex'} h-9 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 text-xs font-medium text-white/68 transition-[background-color,color,transform] duration-200 ease-out hover:bg-white/10 hover:text-white active:scale-[0.96]`}
            aria-label={isThumbRailCollapsed ? (isZh ? '展开缩略图' : 'Show thumbnails') : (isZh ? '折叠缩略图' : 'Hide thumbnails')}
            aria-pressed={!isThumbRailCollapsed}
            title={isThumbRailCollapsed ? (isZh ? '展开缩略图' : 'Show thumbnails') : (isZh ? '折叠缩略图' : 'Hide thumbnails')}
          >
            {isThumbRailCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            <span className="hidden xl:inline">{isThumbRailCollapsed ? (isZh ? '缩略图' : 'Thumbs') : (isZh ? '收起' : 'Hide')}</span>
          </button>

          <button
            type="button"
            onClick={resetZoom}
            className={`${isSlideMode ? 'hidden' : 'grid'} h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/68 transition-[background-color,color,transform] duration-200 ease-out hover:bg-white/10 hover:text-white active:scale-[0.96] sm:hidden`}
            aria-label={isZh ? '重置缩放' : 'Reset zoom'}
            title={isZh ? '重置缩放' : 'Reset zoom'}
          >
            <RotateCcw size={16} />
          </button>
          <button
            type="button"
            onClick={toggleFullscreen}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/68 transition hover:bg-white/10 hover:text-white"
            aria-label={isZh ? '全屏' : 'Fullscreen'}
            title={isZh ? '全屏' : 'Fullscreen'}
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/68 transition hover:bg-white/10 hover:text-white"
            aria-label={isZh ? '关闭' : 'Close'}
            title={isZh ? '关闭' : 'Close'}
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {isSlideMode ? (
        <div className="flex h-[calc(100svh-58px)] min-h-[520px] flex-col bg-[#202124]">
          <main className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden px-3 py-4 sm:px-6 sm:py-6">
            <button
              type="button"
              onClick={goToPreviousPage}
              disabled={!canGoPrevious}
              className="absolute left-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/36 text-white shadow-[0_18px_42px_rgba(0,0,0,0.28)] backdrop-blur-md transition-[background-color,opacity,transform] duration-200 ease-out hover:bg-black/56 active:scale-[0.96] disabled:pointer-events-none disabled:opacity-25 sm:grid"
              aria-label={isZh ? '上一页' : 'Previous page'}
              title={isZh ? '上一页' : 'Previous page'}
            >
              <ChevronLeft size={22} />
            </button>

            <section
              className="relative aspect-video w-full max-w-[1560px] overflow-hidden bg-white shadow-[0_28px_82px_rgba(0,0,0,0.42)]"
              style={{ maxHeight: 'calc(100svh - 178px)' }}
              aria-label={`${project.title} ${isZh ? '第' : 'page '}${activePage + 1}${isZh ? '页' : ''}`}
            >
              {currentPage && isPdf(currentPage) ? (
                <object data={assetUrl(currentPage)} type="application/pdf" className="block h-full w-full bg-white">
                  <a className="grid h-full place-items-center p-8 text-center text-neutral-700" href={assetUrl(currentPage)} target="_blank" rel="noopener noreferrer">
                    {project.title}
                  </a>
                </object>
              ) : currentPage ? (
                <div className="relative h-full w-full">
                  <img
                    src={assetUrl(currentPage)}
                    alt={`${project.title} ${isZh ? '第' : 'page '}${activePage + 1}${isZh ? '页' : ''}`}
                    className="block h-full w-full select-none object-contain"
                    loading="eager"
                    decoding="async"
                    draggable={false}
                  />
                  {getPageVideoOverlay(project, currentPage) ? (
                    <div
                      className="absolute z-10 overflow-hidden border border-black/10 bg-black shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
                      style={{
                        left: `${getPageVideoOverlay(project, currentPage)?.left}%`,
                        top: `${getPageVideoOverlay(project, currentPage)?.top}%`,
                        width: `${getPageVideoOverlay(project, currentPage)?.width}%`,
                        height: `${getPageVideoOverlay(project, currentPage)?.height}%`,
                        borderRadius: `${getPageVideoOverlay(project, currentPage)?.borderRadius}%`,
                      }}
                    >
                      <video
                        src={assetUrl(getPageVideoOverlay(project, currentPage)?.src || '')}
                        controls
                        playsInline
                        preload="metadata"
                        className="h-full w-full bg-black object-cover"
                        aria-label={isZh ? 'Copilot CMC 桌面交互录屏' : 'Copilot CMC desktop interaction recording'}
                      />
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="grid h-full place-items-center bg-neutral-100 p-8 text-center text-neutral-600">
                  {isZh ? '暂无可预览页面' : 'No preview pages available'}
                </div>
              )}
            </section>

            <button
              type="button"
              onClick={goToNextPage}
              disabled={!canGoNext}
              className="absolute right-4 top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-black/36 text-white shadow-[0_18px_42px_rgba(0,0,0,0.28)] backdrop-blur-md transition-[background-color,opacity,transform] duration-200 ease-out hover:bg-black/56 active:scale-[0.96] disabled:pointer-events-none disabled:opacity-25 sm:grid"
              aria-label={isZh ? '下一页' : 'Next page'}
              title={isZh ? '下一页' : 'Next page'}
            >
              <ChevronRight size={22} />
            </button>
          </main>

          <div className="flex-shrink-0 border-t border-white/10 bg-[#242528]/96 px-3 py-3 shadow-[0_-18px_54px_rgba(0,0,0,0.22)] backdrop-blur-xl sm:px-5">
            <div className="mx-auto h-1 max-w-[1040px] overflow-hidden rounded-full bg-white/10">
              <span className="block h-full rounded-full bg-white transition-[width] duration-200 ease-out" style={{ width: `${presentationProgress}%` }} />
            </div>
            <div className="mx-auto mt-3 flex max-w-[1040px] items-center gap-2">
              <button
                type="button"
                onClick={goToPreviousPage}
                disabled={!canGoPrevious}
                className="inline-flex h-11 min-w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-3 text-white/74 transition-[background-color,color,opacity,transform] duration-200 ease-out hover:bg-white/12 hover:text-white active:scale-[0.96] disabled:opacity-32"
                aria-label={isZh ? '上一页' : 'Previous page'}
              >
                <ChevronLeft size={18} />
                <span className="hidden pl-1 text-xs font-semibold sm:inline">{isZh ? '上一页' : 'Prev'}</span>
              </button>

              <div className="flex min-w-0 flex-1 gap-2 overflow-x-auto px-1" aria-label={isZh ? '页面导航' : 'Page navigation'}>
                {uniquePages.map((page, index) => (
                  <button
                    key={`${page}-presentation-${index}`}
                    type="button"
                    onClick={() => scrollToPage(index)}
                    className={`h-10 min-w-10 flex-shrink-0 rounded-full border px-3 font-mono text-[11px] transition-[background-color,border-color,color,transform] duration-200 ease-out active:scale-[0.96] ${
                      activePage === index
                        ? 'border-white bg-white text-[#242528]'
                        : 'border-white/10 bg-white/[0.05] text-white/58 hover:bg-white/10 hover:text-white'
                    }`}
                    aria-current={activePage === index ? 'page' : undefined}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={goToNextPage}
                disabled={!canGoNext}
                className="inline-flex h-11 min-w-11 items-center justify-center rounded-full bg-white px-3 text-[#242528] shadow-[0_12px_30px_rgba(0,0,0,0.24)] transition-[background-color,opacity,transform] duration-200 ease-out hover:bg-neutral-200 active:scale-[0.96] disabled:opacity-32"
                aria-label={isZh ? '下一页' : 'Next page'}
              >
                <span className="hidden pr-1 text-xs font-semibold sm:inline">{isZh ? '下一页' : 'Next'}</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
      <div className="sticky top-[58px] z-20 flex gap-2 overflow-x-auto border-b border-white/10 bg-[#343538] px-3 py-2 lg:hidden">
        {uniquePages.map((page, index) => (
          <button
            key={`${page}-${index}`}
            type="button"
            onClick={() => scrollToPage(index)}
            className={`h-8 flex-shrink-0 rounded-full border px-3 font-mono text-[11px] transition ${
              activePage === index
                ? 'border-white bg-white text-[#242528]'
                : 'border-white/10 bg-white/[0.05] text-white/58 hover:bg-white/10 hover:text-white'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </button>
        ))}
      </div>

      <div className="mx-auto flex max-w-[1680px]">
        <aside
          className={`sticky top-[58px] hidden h-[calc(100vh-58px)] flex-shrink-0 overflow-y-auto border-r border-white/10 bg-[#343538] transition-[width,padding] duration-300 ease-out lg:block ${
            isThumbRailCollapsed ? 'w-[52px] px-2 py-4' : 'w-[168px] px-4 py-5'
          }`}
          aria-label={isZh ? '页面缩略图' : 'Page thumbnails'}
        >
          <div className={isThumbRailCollapsed ? 'flex justify-center' : 'mb-4 flex justify-end'}>
            <button
              type="button"
              onClick={() => setIsThumbRailCollapsed((value) => !value)}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/68 transition hover:bg-white/10 hover:text-white"
              aria-label={isThumbRailCollapsed ? (isZh ? '展开缩略图' : 'Show thumbnails') : (isZh ? '折叠缩略图' : 'Hide thumbnails')}
              title={isThumbRailCollapsed ? (isZh ? '展开缩略图' : 'Show thumbnails') : (isZh ? '折叠缩略图' : 'Hide thumbnails')}
            >
              {isThumbRailCollapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
            </button>
          </div>
          {!isThumbRailCollapsed ? (
            <div className="space-y-4">
              {uniquePages.map((page, index) => (
                <button
                  key={`${page}-${index}`}
                  type="button"
                  onClick={() => scrollToPage(index)}
                  className="group block w-full text-left"
                  aria-label={`${isZh ? '第' : 'Page '}${index + 1}${isZh ? '页' : ''}`}
                >
                  <span
                    className={`block overflow-hidden rounded-[8px] border bg-white p-1.5 shadow-sm transition ${
                      activePage === index ? 'border-white shadow-[0_16px_34px_rgba(0,0,0,0.34)]' : 'border-white/16 group-hover:border-white/55'
                    }`}
                  >
                    {isPdf(page) ? (
                      <span className="grid aspect-[4/3] place-items-center rounded-[5px] bg-neutral-100 text-neutral-500">
                        <FileText size={22} />
                      </span>
                    ) : (
                      <img
                        src={assetUrl(page)}
                        alt=""
                        className="aspect-[4/3] w-full rounded-[5px] object-contain"
                        loading="lazy"
                        decoding="async"
                      />
                    )}
                  </span>
                  <span className={`mt-2 block text-center font-mono text-[10px] ${activePage === index ? 'text-white' : 'text-white/42'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
          ) : null}
        </aside>

        <main className="min-w-0 flex-1 overflow-x-auto">
          <div className="mx-auto flex min-h-screen flex-col items-center gap-5 px-3 py-5 sm:gap-7 sm:px-6 sm:py-8 lg:px-10">
            {uniquePages.map((page, index) => {
              const src = assetUrl(page);
              const pdf = isPdf(page);
              const videoOverlay = getPageVideoOverlay(project, page);

              return (
                <section
                  key={`${page}-${index}`}
                  ref={(node) => {
                    pageRefs.current[index] = node;
                  }}
                  data-page-index={index}
                  className="scroll-mt-24"
                  style={{
                    width: `${zoom * 100}%`,
                    maxWidth: `${zoom * 1920}px`,
                    minWidth: zoom > 1 ? `${Math.min(760, zoom * 420)}px` : undefined,
                  }}
                >
                  <div className="overflow-hidden bg-white shadow-[0_18px_54px_rgba(0,0,0,0.32)]">
                    {pdf ? (
                      <object data={src} type="application/pdf" className="block h-[82vh] w-full bg-white">
                        <a className="block p-8 text-center text-neutral-700" href={src} target="_blank" rel="noopener noreferrer">
                          {project.title}
                        </a>
                      </object>
                    ) : (
                      <div className="relative">
                        <img
                          src={src}
                          alt={`${project.title} ${isZh ? '第' : 'page '}${index + 1}${isZh ? '页' : ''}`}
                          className="block h-auto w-full select-none"
                          loading={index < 1 ? 'eager' : 'lazy'}
                          decoding="async"
                          draggable={false}
                        />
                        {videoOverlay ? (
                          <div
                            className="absolute z-10 overflow-hidden border border-black/10 bg-black shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
                            style={{
                              left: `${videoOverlay.left}%`,
                              top: `${videoOverlay.top}%`,
                              width: `${videoOverlay.width}%`,
                              height: `${videoOverlay.height}%`,
                              borderRadius: `${videoOverlay.borderRadius}%`,
                            }}
                          >
                            <video
                              src={assetUrl(videoOverlay.src)}
                              controls
                              playsInline
                              preload="metadata"
                              className="h-full w-full bg-black object-cover"
                              aria-label={isZh ? 'Copilot CMC 桌面交互录屏' : 'Copilot CMC desktop interaction recording'}
                            />
                          </div>
                        ) : null}
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </main>
      </div>
        </>
      )}

      {!isSlideMode && activePage > 0 ? (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-[#242528]/90 text-white shadow-[0_14px_30px_rgba(0,0,0,0.3)] backdrop-blur transition hover:bg-[#111]"
          aria-label={isZh ? '回到顶部' : 'Back to top'}
          title={isZh ? '回到顶部' : 'Back to top'}
        >
          <ChevronUp size={18} />
        </button>
      ) : null}
    </div>
  );
};

export default PortfolioReader;

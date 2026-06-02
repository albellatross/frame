import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
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

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const isPdf = (src: string) => src.split('?')[0].toLowerCase().endsWith('.pdf');

const PortfolioReader: React.FC<PortfolioReaderProps> = ({ project, pages, isZh, onClose, scrollRootRef }) => {
  const readerRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLElement | null)[]>([]);
  const [zoom, setZoom] = useState(1);
  const [activePage, setActivePage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const uniquePages = useMemo(() => pages.filter(Boolean), [pages]);

  useEffect(() => {
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
  }, [scrollRootRef, uniquePages.length]);

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

          <div className="hidden items-center rounded-full border border-white/10 bg-white/[0.06] p-1 sm:flex">
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

          <div className="hidden items-center overflow-hidden rounded-full border border-white/10 bg-white/[0.06] p-1 md:flex">
            <span className="rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-[#242528]">中</span>
            <span className="px-3 py-1.5 text-[11px] text-white/38">EN</span>
          </div>

          <button
            type="button"
            onClick={resetZoom}
            className="grid h-9 w-9 place-items-center rounded-full border border-white/10 bg-white/[0.06] text-white/68 transition hover:bg-white/10 hover:text-white sm:hidden"
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
        <aside className="sticky top-[58px] hidden h-[calc(100vh-58px)] w-[168px] flex-shrink-0 overflow-y-auto border-r border-white/10 bg-[#343538] px-4 py-5 lg:block">
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
        </aside>

        <main className="min-w-0 flex-1 overflow-x-auto">
          <div className="mx-auto flex min-h-screen flex-col items-center gap-5 px-3 py-5 sm:gap-7 sm:px-6 sm:py-8 lg:px-10">
            {uniquePages.map((page, index) => {
              const src = assetUrl(page);
              const pdf = isPdf(page);

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
                      <img
                        src={src}
                        alt={`${project.title} ${isZh ? '第' : 'page '}${index + 1}${isZh ? '页' : ''}`}
                        className="block h-auto w-full select-none"
                        loading={index < 1 ? 'eager' : 'lazy'}
                        decoding="async"
                        draggable={false}
                      />
                    )}
                  </div>
                </section>
              );
            })}
          </div>
        </main>
      </div>

      {activePage > 0 ? (
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

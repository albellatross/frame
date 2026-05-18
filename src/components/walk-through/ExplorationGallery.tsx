import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Image as ImageIcon,
  ImagePlus,
  Plus,
  Save,
  Trash2,
  X,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Project } from '../../types';

interface ExplorationGalleryProps {
  project: Project;
  onClose: () => void;
}

const STORAGE_KEY_PREFIX = 'exploration-gallery-';

const ExplorationGallery: React.FC<ExplorationGalleryProps> = ({ project, onClose }) => {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const isAigc = project.id === 'exp-aigc';
  const storageKey = `${STORAGE_KEY_PREFIX}${project.id}`;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [images, setImages] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        return JSON.parse(saved) as string[];
      }
    } catch {
      // Ignore malformed saved data and fall back to bundled slides.
    }

    return project.slides || [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        setImages(JSON.parse(saved) as string[]);
      } else {
        setImages(project.slides || []);
      }
    } catch {
      setImages(project.slides || []);
    }

    setIsEditing(false);
    setDragIndex(null);
    setHasUnsaved(false);
    setPreviewIndex(null);
  }, [project.id, project.slides, storageKey]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousHtmlOverflow;
    };
  }, []);

  const saveImages = (nextImages: string[]) => {
    localStorage.setItem(storageKey, JSON.stringify(nextImages));
    setHasUnsaved(false);
  };

  const handleSave = () => {
    saveImages(images);
  };

  const handleClose = () => {
    if (hasUnsaved) {
      saveImages(images);
    }

    setPreviewIndex(null);
    onClose();
  };

  const handlePreviewStep = (direction: 1 | -1) => {
    if (images.length < 2) {
      return;
    }

    setPreviewIndex((current) => {
      if (current === null) {
        return null;
      }

      return (current + direction + images.length) % images.length;
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (previewIndex !== null) {
          setPreviewIndex(null);
          return;
        }

        handleClose();
        return;
      }

      if (previewIndex === null || images.length < 2) {
        return;
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        handlePreviewStep(1);
      }

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePreviewStep(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [images.length, previewIndex]);

  const handleAddImage = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (!files) {
      return;
    }

    Array.from(files).forEach((file) => {
      const reader = new FileReader();

      reader.onload = (loadEvent) => {
        const dataUrl = loadEvent.target?.result;

        if (typeof dataUrl !== 'string') {
          return;
        }

        setImages((prev) => [...prev, dataUrl]);
        setHasUnsaved(true);
      };

      reader.readAsDataURL(file);
    });

    event.target.value = '';
  };

  const handleRemove = (index: number) => {
    setImages((prev) => prev.filter((_, currentIndex) => currentIndex !== index));
    setPreviewIndex((current) => {
      if (current === null) {
        return null;
      }

      if (current === index) {
        return null;
      }

      if (current > index) {
        return current - 1;
      }

      return current;
    });
    setHasUnsaved(true);
  };

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (event: React.DragEvent, index: number) => {
    event.preventDefault();

    if (dragIndex === null || dragIndex === index) {
      return;
    }

    const nextImages = [...images];
    const [draggedImage] = nextImages.splice(dragIndex, 1);

    nextImages.splice(index, 0, draggedImage);

    setImages(nextImages);
    setDragIndex(index);
    setHasUnsaved(true);
  };

  const handleDragEnd = () => {
    setDragIndex(null);
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>, index: number) => {
    event.currentTarget.src = `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" fill="#111111"><rect width="1200" height="800"/><text x="600" y="400" text-anchor="middle" fill="#888888" font-family="sans-serif" font-size="30">Image ${index + 1}</text></svg>`,
    )}`;
  };

  const handleToggleEdit = () => {
    if (isEditing && hasUnsaved) {
      handleSave();
    }

    setPreviewIndex(null);
    setIsEditing((prev) => !prev);
  };

  const previewImage = previewIndex !== null ? images[previewIndex] : null;
  const previewStartIndex =
    previewIndex === null
      ? 0
      : Math.max(0, Math.min(previewIndex - 2, Math.max(0, images.length - 5)));
  const previewThumbnails =
    previewIndex === null ? [] : images.slice(previewStartIndex, previewStartIndex + 5);
  const eyebrow = isAigc
    ? isZh
      ? 'AIGC 图像画廊'
      : 'AIGC Image Board'
    : isZh
      ? '探索画廊'
      : 'Exploration Gallery';

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[10000] bg-black/82 backdrop-blur-md"
        onClick={handleClose}
        onWheelCapture={(event) => event.stopPropagation()}
      />

      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed inset-x-0 bottom-0 z-[10001] flex flex-col"
        style={{ top: '104px' }}
      >
        <div
          className="relative flex h-full flex-col overflow-hidden rounded-t-[30px] border border-white/10 bg-[#050505] text-white shadow-[0_-30px_90px_rgba(0,0,0,0.55)]"
          onClick={(event) => event.stopPropagation()}
          onWheelCapture={(event) => event.stopPropagation()}
        >
          <div className="sticky top-0 z-20 border-b border-white/10 bg-black/88 backdrop-blur-xl">
            <div className="flex justify-center pb-2 pt-3">
              <div className="h-1 w-10 rounded-full bg-white/20" />
            </div>

            <div className="flex flex-col gap-5 px-4 pb-4 pt-1 sm:px-6 md:px-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-white/40">
                    {eyebrow}
                  </p>
                  <h1 className="mt-3 font-serif text-[28px] leading-tight text-white sm:text-[38px]">
                    {project.title}
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58 sm:text-base">
                    {project.shortDescription}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2 lg:justify-end">
                  <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.26em] text-white/55">
                    {String(images.length).padStart(2, '0')} {isZh ? '张' : 'shots'}
                  </span>

                  <button
                    onClick={handleToggleEdit}
                    className={`rounded-full px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] transition ${
                      isEditing
                        ? 'bg-white text-black hover:bg-white/85'
                        : 'border border-white/10 bg-white/[0.05] text-white/78 hover:bg-white/[0.12]'
                    }`}
                  >
                    {isEditing ? (isZh ? '完成编辑' : 'Done') : isZh ? '编辑模式' : 'Edit Mode'}
                  </button>

                  {isEditing && (
                    <button
                      onClick={handleAddImage}
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-white/78 transition hover:bg-white/[0.12]"
                    >
                      <ImagePlus size={14} />
                      <span>{isZh ? '添加图片' : 'Add Images'}</span>
                    </button>
                  )}

                  {isEditing && hasUnsaved && (
                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-medium uppercase tracking-[0.24em] text-black transition hover:bg-white/85"
                    >
                      <Save size={14} />
                      <span>{isZh ? '保存变更' : 'Save Changes'}</span>
                    </button>
                  )}

                  <button
                    onClick={handleClose}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/78 transition hover:bg-white/[0.12]"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/48"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div
            className="flex-1 overflow-y-auto overscroll-contain bg-[#050505]"
            onWheelCapture={(event) => event.stopPropagation()}
          >
            <div className="mx-auto max-w-7xl px-4 pb-16 pt-7 sm:px-6 lg:px-8">
              {images.length > 0 ? (
                isEditing ? (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {images.map((src, index) => (
                      <motion.div
                        key={`${src.slice(0, 40)}-${index}`}
                        layout
                        className={`group relative overflow-hidden rounded-[24px] border border-white/10 bg-[#101010] ${dragIndex === index ? 'opacity-45' : ''}`}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(event) => handleDragOver(event, index)}
                        onDragEnd={handleDragEnd}
                      >
                        <img
                          src={src}
                          alt={`${project.title} - ${isZh ? '第' : 'Image '}${index + 1}${isZh ? '张' : ''}`}
                          className="h-[340px] w-full object-cover"
                          loading={index < 4 ? 'eager' : 'lazy'}
                          onError={(event) => handleImageError(event, index)}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/18 to-transparent" />

                        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
                          <div className="flex cursor-grab items-center gap-2 rounded-full border border-white/12 bg-black/35 px-3 py-1.5 text-xs text-white/78 backdrop-blur-md">
                            <GripVertical size={14} />
                            <span>{isZh ? '拖拽排序' : 'Drag to sort'}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setPreviewIndex(index)}
                              className="rounded-full border border-white/12 bg-black/35 px-3 py-1.5 text-xs text-white/78 backdrop-blur-md transition hover:bg-black/55"
                            >
                              {isZh ? '预览' : 'Preview'}
                            </button>
                            <button
                              onClick={() => handleRemove(index)}
                              className="flex items-center gap-1 rounded-full border border-red-400/25 bg-red-500/20 px-3 py-1.5 text-xs text-red-100 transition hover:bg-red-500/35"
                            >
                              <Trash2 size={13} />
                              <span>{isZh ? '删除' : 'Delete'}</span>
                            </button>
                          </div>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/45">
                              {isZh ? '编辑中的画面' : 'Editing frame'}
                            </p>
                            <p className="mt-1 text-sm text-white/80">{project.title}</p>
                          </div>
                          <span className="rounded-full border border-white/12 bg-black/35 px-3 py-1 text-xs text-white/72 backdrop-blur-md">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>
                      </motion.div>
                    ))}

                    <motion.button
                      type="button"
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={handleAddImage}
                      className="flex min-h-[340px] w-full flex-col items-center justify-center gap-4 rounded-[24px] border border-dashed border-white/18 bg-white/[0.03] text-white/55 transition hover:border-white/28 hover:bg-white/[0.07] hover:text-white/82"
                    >
                      <Plus size={28} />
                      <div className="space-y-1 text-center">
                        <p className="text-sm font-medium">{isZh ? '添加新的灵感图像' : 'Add a new gallery image'}</p>
                        <p className="text-xs text-white/40">
                          {isZh
                            ? '支持多选，自动保存到当前探索卡片'
                            : 'Multi-select is supported and saved to this exploration'}
                        </p>
                      </div>
                    </motion.button>
                  </div>
                ) : (
                  <div className="columns-1 gap-5 sm:columns-2 xl:columns-3">
                    {images.map((src, index) => (
                      <button
                        key={`${src.slice(0, 40)}-${index}`}
                        type="button"
                        onClick={() => setPreviewIndex(index)}
                        className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-[26px] border border-white/10 bg-[#111111] text-left shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1.5 hover:border-white/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.34)]"
                      >
                        <img
                          src={src}
                          alt={`${project.title} - ${isZh ? '第' : 'Image '}${index + 1}${isZh ? '张' : ''}`}
                          className="block h-auto w-full"
                          loading={index < 6 ? 'eager' : 'lazy'}
                          onError={(event) => handleImageError(event, index)}
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/18 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 opacity-0 transition duration-300 group-hover:opacity-100">
                          <span className="rounded-full border border-white/12 bg-black/35 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.28em] text-white/65 backdrop-blur-md">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          <span className="rounded-full border border-white/12 bg-black/35 px-3 py-1 text-[11px] text-white/72 backdrop-blur-md">
                            {isZh ? '点击预览' : 'Open Preview'}
                          </span>
                        </div>

                        <div className="absolute inset-x-0 bottom-0 p-5 opacity-0 transition duration-300 group-hover:opacity-100">
                          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-white/48">
                            {isAigc ? 'AIGC Visual Board' : isZh ? '探索画廊' : 'Exploration Gallery'}
                          </p>
                          <div className="mt-2 flex items-end justify-between gap-4">
                            <div>
                              <p className="text-sm font-medium text-white">{project.title}</p>
                              <p className="mt-1 text-xs leading-5 text-white/62">
                                {isZh ? '点击进入沉浸式预览' : 'Tap into an immersive preview'}
                              </p>
                            </div>
                            <span className="rounded-full border border-white/12 bg-white/[0.07] px-3 py-1 text-xs text-white/72">
                              {isZh ? '预览' : 'Preview'}
                            </span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )
              ) : (
                <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[28px] border border-dashed border-white/14 bg-white/[0.03] px-6 text-center text-white/58">
                  <ImageIcon size={48} strokeWidth={1.25} />
                  <h2 className="mt-6 font-serif text-2xl text-white">
                    {isZh ? '还没有内容，先放进第一张图吧' : 'Nothing here yet. Add the first image.'}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-white/45 sm:text-base">
                    {isZh
                      ? '这一页会保留你的图片顺序和内容。进入编辑模式后，可以添加图片、删除图片，也能继续拖拽调整。'
                      : 'This page keeps its own image set and order. Switch to edit mode to add, delete, and rearrange your gallery.'}
                  </p>
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      handleAddImage();
                    }}
                    className="mt-8 flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/85"
                  >
                    <Plus size={16} />
                    <span>{isZh ? '开始添加图片' : 'Start Adding Images'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {previewImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[10012] bg-black/92 backdrop-blur-md"
            onClick={() => setPreviewIndex(null)}
            onWheelCapture={(event) => event.stopPropagation()}
          >
            <div className="absolute inset-x-0 top-[88px] z-10 flex items-center justify-between px-4 sm:px-6 lg:px-8">
              <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.28em] text-white/58 backdrop-blur-md">
                {String((previewIndex ?? 0) + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </div>
              <button
                onClick={() => setPreviewIndex(null)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/78 transition hover:bg-white/[0.12]"
              >
                <X size={18} />
              </button>
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handlePreviewStep(-1);
                  }}
                  className="absolute left-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/82 backdrop-blur-md transition hover:bg-black/65 sm:left-6"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handlePreviewStep(1);
                  }}
                  className="absolute right-4 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/45 text-white/82 backdrop-blur-md transition hover:bg-black/65 sm:right-6"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            <div
              className="flex h-full items-center justify-center px-4 pb-28 pt-32 sm:px-8 sm:pt-36"
              onClick={(event) => event.stopPropagation()}
            >
              <motion.img
                key={`${previewImage}-${previewIndex}`}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22 }}
                src={previewImage}
                alt={`${project.title} preview ${previewIndex !== null ? previewIndex + 1 : ''}`}
                className="max-h-full max-w-full rounded-[24px] object-contain shadow-[0_28px_90px_rgba(0,0,0,0.52)]"
                onError={(event) => handleImageError(event, previewIndex ?? 0)}
              />
            </div>

            <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-black/50 px-4 py-4 backdrop-blur-md sm:px-6 lg:px-8">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-serif text-lg text-white">{project.title}</p>
                  <p className="mt-1 text-sm text-white/52">
                    {isAigc
                      ? isZh
                        ? 'AIGC 图像创作预览'
                        : 'AIGC image creation preview'
                      : isZh
                        ? '探索子页面预览'
                        : 'Exploration preview'}
                  </p>
                </div>

                <div className="hidden items-center gap-2 md:flex">
                  {previewThumbnails.map((src, index) => {
                    const actualIndex = previewStartIndex + index;

                    return (
                      <button
                        key={`${src.slice(0, 24)}-${actualIndex}`}
                        onClick={(event) => {
                          event.stopPropagation();
                          setPreviewIndex(actualIndex);
                        }}
                        className={`overflow-hidden rounded-2xl border transition ${
                          actualIndex === previewIndex
                            ? 'border-white/55 opacity-100'
                            : 'border-white/10 opacity-55 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={src}
                          alt={`${project.title} thumbnail ${actualIndex + 1}`}
                          className="h-14 w-14 object-cover"
                          onError={(event) => handleImageError(event, actualIndex)}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};

export default ExplorationGallery;

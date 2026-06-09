import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  GripVertical,
  Image as ImageIcon,
  Plus,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Project } from '../../types';
import { assetUrl } from '../../utils/assets';
import {
  AIGC_GALLERY_IMAGE_MAP,
  AIGC_GALLERY_IMAGES,
  getAigcGalleryLabel,
  getAigcGalleryPrompt,
} from './aigcGallery';
import PromptArticleView from './PromptArticleView';
import VibeCodingArticleView from './VibeCodingArticleView';
import WorkflowArticleView from './WorkflowArticleView';
import { EXPLORATION_ARTICLES } from './explorationArticles';
import { VIBE_CODING_ARTICLES } from './vibeCodingArticles';
import { WORKFLOW_ARTICLES } from './workflowArticles';

interface ExplorationGalleryProps {
  project: Project;
  onClose: () => void;
}

const STORAGE_KEY_PREFIX = 'exploration-gallery-';
const AIGC_UPLOAD_STORAGE_KEY = `${STORAGE_KEY_PREFIX}exp-aigc-uploads`;
const AIGC_HIDDEN_STORAGE_KEY = `${STORAGE_KEY_PREFIX}exp-aigc-hidden`;

interface AigcUploadedItem {
  src: string;
  prompt: string;
  label: string;
  createdAt: number;
  width?: number;
  height?: number;
}

interface CompressedImage {
  src: string;
  width: number;
  height: number;
}

const shuffleImages = (items: string[]) => {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
};

const cleanUploadLabel = (fileName: string) =>
  fileName
    .replace(/\.(png|jpe?g|webp|gif|avif)$/i, '')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim() || 'Uploaded image';

const isAigcUploadedItem = (item: unknown): item is AigcUploadedItem => {
  if (!item || typeof item !== 'object') {
    return false;
  }

  const candidate = item as Partial<AigcUploadedItem>;
  return (
    typeof candidate.src === 'string' &&
    typeof candidate.prompt === 'string' &&
    typeof candidate.label === 'string' &&
    typeof candidate.createdAt === 'number'
  );
};

const readAigcUploads = () => {
  try {
    const saved = localStorage.getItem(AIGC_UPLOAD_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed.filter(isAigcUploadedItem) : [];
  } catch {
    return [];
  }
};

const readAigcHiddenImages = () => {
  try {
    const saved = localStorage.getItem(AIGC_HIDDEN_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];

    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
};

const compressImageFile = (file: File) =>
  new Promise<CompressedImage>((resolve, reject) => {
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read image file.'));
    reader.onload = () => {
      const originalSrc = reader.result;

      if (typeof originalSrc !== 'string') {
        reject(new Error('Invalid image file.'));
        return;
      }

      const image = new Image();

      image.onerror = () => reject(new Error('Failed to decode image file.'));
      image.onload = () => {
        const naturalWidth = image.naturalWidth || 1024;
        const naturalHeight = image.naturalHeight || 1024;
        const maxSize = 1600;
        const scale = Math.min(1, maxSize / Math.max(naturalWidth, naturalHeight));
        const width = Math.max(1, Math.round(naturalWidth * scale));
        const height = Math.max(1, Math.round(naturalHeight * scale));
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (!context) {
          resolve({ src: originalSrc, width: naturalWidth, height: naturalHeight });
          return;
        }

        canvas.width = width;
        canvas.height = height;
        context.fillStyle = '#ffffff';
        context.fillRect(0, 0, width, height);
        context.drawImage(image, 0, 0, width, height);
        resolve({ src: canvas.toDataURL('image/jpeg', 0.88), width, height });
      };

      image.src = originalSrc;
    };

    reader.readAsDataURL(file);
  });

const ExplorationGallery: React.FC<ExplorationGalleryProps> = ({ project, onClose }) => {
  const { language } = useLanguage();
  const isZh = language === 'zh';
  const isAigc = project.id === 'exp-aigc';
  const articleContent = EXPLORATION_ARTICLES[project.id]?.[language];
  const workflowContent = WORKFLOW_ARTICLES[project.id]?.[language];
  const vibeCodingContent = VIBE_CODING_ARTICLES[project.id]?.[language];
  const isArticleMode = Boolean(articleContent || workflowContent || vibeCodingContent);
  const canEditGallery = !isArticleMode && !isAigc;
  const storageKey = `${STORAGE_KEY_PREFIX}${project.id}`;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const aigcFileInputRef = useRef<HTMLInputElement>(null);
  const bundledImages = useMemo(
    () => (isAigc ? AIGC_GALLERY_IMAGES.map((image) => image.src) : project.slides || []),
    [isAigc, project.slides],
  );
  const [aigcUploads, setAigcUploads] = useState<AigcUploadedItem[]>(() =>
    isAigc ? readAigcUploads() : [],
  );
  const [aigcHiddenImages, setAigcHiddenImages] = useState<Set<string>>(() =>
    new Set(isAigc ? readAigcHiddenImages() : []),
  );
  const aigcUploadMap = useMemo(
    () => new Map(aigcUploads.map((item) => [item.src, item])),
    [aigcUploads],
  );

  const [images, setImages] = useState<string[]>(() => {
    if (isAigc) {
      const uploads = readAigcUploads();
      const hidden = new Set(readAigcHiddenImages());
      return shuffleImages([...uploads.map((item) => item.src), ...bundledImages.filter((src) => !hidden.has(src))]);
    }

    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        return JSON.parse(saved) as string[];
      }
    } catch {
      // Ignore malformed saved data and fall back to bundled slides.
    }

    return bundledImages;
  });
  const [isEditing, setIsEditing] = useState(false);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [headerOpacity, setHeaderOpacity] = useState(1);
  const [editNotice, setEditNotice] = useState<string | null>(null);
  const [isAigcUploadOpen, setIsAigcUploadOpen] = useState(false);
  const [aigcUploadFile, setAigcUploadFile] = useState<File | null>(null);
  const [aigcUploadPreview, setAigcUploadPreview] = useState<string | null>(null);
  const [aigcUploadDimensions, setAigcUploadDimensions] = useState<CompressedImage | null>(null);
  const [aigcUploadPrompt, setAigcUploadPrompt] = useState('');
  const [isProcessingAigcUpload, setIsProcessingAigcUpload] = useState(false);
  const [isAigcManaging, setIsAigcManaging] = useState(false);
  const [selectedAigcImages, setSelectedAigcImages] = useState<Set<string>>(() => new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const initializedProjectRef = useRef(project.id);
  const [viewportSize, setViewportSize] = useState(() => ({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  }));
  const [previewMeasuredDimensions, setPreviewMeasuredDimensions] = useState<{ width: number; height: number } | null>(null);
  const [lockedPreviewStageWidth, setLockedPreviewStageWidth] = useState<number | null>(null);

  useEffect(() => {
    if (initializedProjectRef.current === project.id) {
      return;
    }

    initializedProjectRef.current = project.id;

    if (isAigc) {
      const uploads = readAigcUploads();
      const hidden = new Set(readAigcHiddenImages());

      setAigcUploads(uploads);
      setAigcHiddenImages(hidden);
      setImages(shuffleImages([...uploads.map((item) => item.src), ...bundledImages.filter((src) => !hidden.has(src))]));
      setIsEditing(false);
      setIsAigcUploadOpen(false);
      setAigcUploadFile(null);
      setAigcUploadPreview(null);
      setAigcUploadDimensions(null);
      setAigcUploadPrompt('');
      setDragIndex(null);
      setHasUnsaved(false);
      setPreviewIndex(null);
      setHeaderOpacity(1);
      setIsAigcManaging(false);
      setSelectedAigcImages(new Set());
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
      return;
    }

    setAigcUploads([]);
    setAigcHiddenImages(new Set());
    try {
      const saved = localStorage.getItem(storageKey);

      if (saved) {
        setImages(JSON.parse(saved) as string[]);
      } else {
        setImages(bundledImages);
      }
    } catch {
      setImages(bundledImages);
    }

    setIsEditing(false);
    setDragIndex(null);
    setHasUnsaved(false);
    setPreviewIndex(null);
    setHeaderOpacity(1);
    setIsAigcManaging(false);
    setSelectedAigcImages(new Set());
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [bundledImages, isAigc, project.id, storageKey]);

  useEffect(() => {
    const node = scrollContainerRef.current;
    if (!node) return;
    const handleScroll = () => {
      const top = node.scrollTop;
      const fadeRange = 160;
      const next = Math.max(0, Math.min(1, 1 - top / fadeRange));
      setHeaderOpacity(next);
    };
    handleScroll();
    node.addEventListener('scroll', handleScroll, { passive: true });
    return () => node.removeEventListener('scroll', handleScroll);
  }, [project.id, isArticleMode, isEditing, images.length]);

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

  useEffect(() => {
    const handleResize = () => {
      setViewportSize({ width: window.innerWidth, height: window.innerHeight });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const saveImages = (nextImages: string[]) => {
    if (!canEditGallery) {
      return;
    }

    localStorage.setItem(storageKey, JSON.stringify(nextImages));
    setHasUnsaved(false);
  };

  const handleSave = () => {
    saveImages(images);
  };

  const handleClose = () => {
    if (hasUnsaved && canEditGallery) {
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

  const getNextPreviewIndexAfterRemoval = (currentIndex: number, totalImages: number) => {
    if (totalImages <= 1) {
      return null;
    }

    if (currentIndex >= totalImages - 1) {
      return totalImages - 2;
    }

    return currentIndex;
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

  const showNotice = (message: string) => {
    setEditNotice(message);
    window.setTimeout(() => setEditNotice(null), 2200);
  };

  const getAigcPromptForImage = (src: string) =>
    aigcUploadMap.get(src)?.prompt || getAigcGalleryPrompt(src);

  const getAigcLabelForImage = (src: string) =>
    aigcUploadMap.get(src)?.label || getAigcGalleryLabel(src);

  const getAigcDimensionsForImage = (src: string) => {
    const uploaded = aigcUploadMap.get(src);

    if (uploaded?.width && uploaded?.height) {
      return { width: uploaded.width, height: uploaded.height };
    }

    const bundled = AIGC_GALLERY_IMAGE_MAP.get(src);
    return bundled ? { width: bundled.width, height: bundled.height } : undefined;
  };

  const getAigcImageKey = (src: string) => {
    const uploaded = aigcUploadMap.get(src);
    return uploaded ? `upload-${uploaded.createdAt}-${uploaded.label}` : src;
  };

  const handleAigcUploadSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setIsProcessingAigcUpload(true);
    setAigcUploadFile(file);
    setAigcUploadDimensions(null);

    try {
      const compressed = await compressImageFile(file);
      setAigcUploadPreview(compressed.src);
      setAigcUploadDimensions(compressed);
    } catch {
      setAigcUploadFile(null);
      setAigcUploadPreview(null);
      setAigcUploadDimensions(null);
      showNotice(isZh ? '图片读取失败，请换一张图片' : 'Could not read this image');
    } finally {
      setIsProcessingAigcUpload(false);
      event.target.value = '';
    }
  };

  const handleAigcUploadCancel = () => {
    setIsAigcUploadOpen(false);
    setAigcUploadFile(null);
    setAigcUploadPreview(null);
    setAigcUploadDimensions(null);
    setAigcUploadPrompt('');
  };

  const handleAigcUploadSave = () => {
    const prompt = aigcUploadPrompt.trim();

    if (!aigcUploadPreview || !aigcUploadFile || !prompt) {
      showNotice(isZh ? '请先选择图片并填写 Prompt' : 'Choose an image and add a prompt first');
      return;
    }

    const nextItem: AigcUploadedItem = {
      src: aigcUploadPreview,
      prompt,
      label: cleanUploadLabel(aigcUploadFile.name),
      createdAt: Date.now(),
      width: aigcUploadDimensions?.width,
      height: aigcUploadDimensions?.height,
    };
    const nextUploads = [nextItem, ...aigcUploads];

    try {
      localStorage.setItem(AIGC_UPLOAD_STORAGE_KEY, JSON.stringify(nextUploads));
    } catch {
      showNotice(isZh ? '图片太大，浏览器本地空间不够保存' : 'This image is too large to save locally');
      return;
    }

    setAigcUploads(nextUploads);
    setImages((prev) => [nextItem.src, ...prev]);
    setAigcUploadFile(null);
    setAigcUploadPreview(null);
    setAigcUploadDimensions(null);
    setAigcUploadPrompt('');
    setIsAigcUploadOpen(false);
    showNotice(isZh ? '已添加到画廊' : 'Added to gallery');
  };

  const toggleAigcSelection = (src: string) => {
    setSelectedAigcImages((current) => {
      const next = new Set(current);

      if (next.has(src)) {
        next.delete(src);
      } else {
        next.add(src);
      }

      return next;
    });
  };

  const handleDeleteSelectedAigcImages = () => {
    if (selectedAigcImages.size === 0) {
      return;
    }

    const selected = selectedAigcImages;
    const nextUploads = aigcUploads.filter((item) => !selected.has(item.src));

    try {
      localStorage.setItem(AIGC_UPLOAD_STORAGE_KEY, JSON.stringify(nextUploads));
    } catch {
      showNotice(isZh ? '删除失败，请稍后再试' : 'Could not delete selected images');
      return;
    }

    setAigcUploads(nextUploads);
    setImages((prev) => prev.filter((src) => !selected.has(src)));
    setPreviewIndex(null);
    setSelectedAigcImages(new Set());
    showNotice(isZh ? `已删除 ${selected.size} 张图片` : `${selected.size} images removed`);
  };

  const handleRemoveAigcUpload = (src: string, event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    const nextUploads = aigcUploads.filter((item) => item.src !== src);

    try {
      localStorage.setItem(AIGC_UPLOAD_STORAGE_KEY, JSON.stringify(nextUploads));
    } catch {
      showNotice(isZh ? '删除失败，请稍后再试' : 'Could not remove this upload');
      return;
    }

    setAigcUploads(nextUploads);
    setImages((prev) => prev.filter((imageSrc) => imageSrc !== src));
    setSelectedAigcImages((current) => {
      const next = new Set(current);
      next.delete(src);
      return next;
    });
    setPreviewIndex((current) => {
      if (current !== null && images[current] === src) {
        return null;
      }

      return current;
    });
    showNotice(isZh ? '已移除上传图片' : 'Upload removed');
  };

  const handleDeletePreviewImage = () => {
    if (previewIndex === null) {
      return;
    }

    const currentIndex = previewIndex;
    const currentImage = images[currentIndex];
    const nextPreviewIndex = getNextPreviewIndexAfterRemoval(currentIndex, images.length);

    if (isAigc) {
      if (aigcUploadMap.has(currentImage)) {
        const nextUploads = aigcUploads.filter((item) => item.src !== currentImage);

        try {
          localStorage.setItem(AIGC_UPLOAD_STORAGE_KEY, JSON.stringify(nextUploads));
        } catch {
          showNotice(isZh ? '删除失败，请稍后再试' : 'Could not delete this image');
          return;
        }

        setAigcUploads(nextUploads);
      } else {
        const nextHiddenImages = new Set(aigcHiddenImages);
        nextHiddenImages.add(currentImage);

        try {
          localStorage.setItem(AIGC_HIDDEN_STORAGE_KEY, JSON.stringify(Array.from(nextHiddenImages)));
        } catch {
          showNotice(isZh ? '删除失败，请稍后再试' : 'Could not delete this image');
          return;
        }

        setAigcHiddenImages(nextHiddenImages);
      }

      setImages((prev) => prev.filter((_, index) => index !== currentIndex));
      setSelectedAigcImages((current) => {
        const next = new Set(current);
        next.delete(currentImage);
        return next;
      });
      setPreviewIndex(nextPreviewIndex);
      showNotice(isZh ? '已删除当前图片' : 'Image deleted');
      return;
    }

    if (!canEditGallery) {
      return;
    }

    const nextImages = images.filter((_, index) => index !== currentIndex);

    try {
      localStorage.setItem(storageKey, JSON.stringify(nextImages));
    } catch {
      showNotice(isZh ? '删除失败，请稍后再试' : 'Could not delete this image');
      return;
    }

    setImages(nextImages);
    setHasUnsaved(false);
    setPreviewIndex(nextPreviewIndex);
    showNotice(isZh ? '已删除当前图片' : 'Image deleted');
  };

  const handleToggleEdit = () => {
    if (!canEditGallery) {
      return;
    }

    if (isEditing && hasUnsaved) {
      handleSave();
    }

    setPreviewIndex(null);
    setIsEditing((prev) => !prev);
  };

  const previewImage = previewIndex !== null ? images[previewIndex] : null;
  const previewImageSrc = previewImage ? assetUrl(previewImage) : null;
  const previewPrompt = previewImage && isAigc ? getAigcPromptForImage(previewImage) : null;
  const previewLabel = previewImage && isAigc ? getAigcLabelForImage(previewImage) : null;
  const previewDimensions = previewImage && isAigc ? getAigcDimensionsForImage(previewImage) : undefined;
  const resolvedPreviewDimensions = previewDimensions || previewMeasuredDimensions;
  const isDesktopPreviewLayout = viewportSize.width >= 1024;
  const previewStagePaddingTotal = viewportSize.width >= 640 ? 48 : 32;
  const overlayPadding = isDesktopPreviewLayout ? 64 : viewportSize.width >= 640 ? 40 : 24;
  const modalWidth = Math.min(1480, Math.max(320, viewportSize.width - overlayPadding));
  const asideWidth = isDesktopPreviewLayout ? 380 : 0;
  const previewStageMaxWidth = Math.max(220, modalWidth - asideWidth - previewStagePaddingTotal);
  const previewStageMaxHeight = Math.max(220, viewportSize.height - (isDesktopPreviewLayout ? 128 : 132));
  const previewFrameSize = useMemo(() => {
    if (!resolvedPreviewDimensions || viewportSize.width === 0 || viewportSize.height === 0) {
      return null;
    }

    const scale = Math.min(
      previewStageMaxWidth / resolvedPreviewDimensions.width,
      previewStageMaxHeight / resolvedPreviewDimensions.height,
    );

    return {
      width: Math.round(resolvedPreviewDimensions.width * scale),
      height: Math.round(resolvedPreviewDimensions.height * scale),
    };
  }, [resolvedPreviewDimensions, viewportSize.width, viewportSize.height, previewStageMaxWidth, previewStageMaxHeight]);
  const currentPreviewStageWidth = isDesktopPreviewLayout && previewFrameSize
    ? previewFrameSize.width + previewStagePaddingTotal
    : undefined;
  const previewStageWidth = isDesktopPreviewLayout
    ? lockedPreviewStageWidth ?? currentPreviewStageWidth
    : undefined;
  const previewStartIndex =
    previewIndex === null
      ? 0
      : Math.max(0, Math.min(previewIndex - 2, Math.max(0, images.length - 5)));
  const previewThumbnails =
    previewIndex === null ? [] : images.slice(previewStartIndex, previewStartIndex + 5);
  const galleryEyebrow = isAigc
    ? isZh
      ? 'AIGC 图像画廊'
      : 'AIGC Image Board'
    : isZh
      ? '探索画廊'
      : 'Exploration Gallery';
  const eyebrow = articleContent?.eyebrow || workflowContent?.eyebrow || vibeCodingContent?.eyebrow || galleryEyebrow;
  const selectedAigcCount = selectedAigcImages.size;

  useEffect(() => {
    setPreviewMeasuredDimensions(null);
  }, [previewImage]);

  useEffect(() => {
    if (previewIndex === null || !isDesktopPreviewLayout) {
      setLockedPreviewStageWidth(null);
      return;
    }

    if (!currentPreviewStageWidth) {
      return;
    }

    const maxAllowedStageWidth = previewStageMaxWidth + previewStagePaddingTotal;

    setLockedPreviewStageWidth((current) => {
      if (current === null) {
        return Math.min(currentPreviewStageWidth, maxAllowedStageWidth);
      }

      return Math.min(Math.max(current, currentPreviewStageWidth), maxAllowedStageWidth);
    });
  }, [
    currentPreviewStageWidth,
    isDesktopPreviewLayout,
    previewIndex,
    previewStageMaxWidth,
    previewStagePaddingTotal,
  ]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[10000] bg-[#2a1a0a]/26 backdrop-blur-md"
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
          className="relative flex h-full flex-col overflow-hidden rounded-t-[30px] border border-white/70 bg-[#f8f1e6] text-[#3B230E] shadow-[0_-30px_90px_rgba(59,35,14,0.22)]"
          onClick={(event) => event.stopPropagation()}
          onWheelCapture={(event) => event.stopPropagation()}
        >
          <div
            className="relative z-10 grid border-[#dfd0bf]/80 bg-[#fffaf2]/88 backdrop-blur-xl transition-[grid-template-rows,opacity,border-color] duration-300 ease-out"
            style={{
              gridTemplateRows: headerOpacity > 0.05 ? '1fr' : '0fr',
              opacity: headerOpacity,
              borderBottomWidth: headerOpacity > 0.05 ? 1 : 0,
              pointerEvents: headerOpacity < 0.05 ? 'none' : 'auto',
            }}
          >
            <div className="overflow-hidden">
            <div className="flex justify-center pb-2 pt-3">
              <div className="h-1 w-10 rounded-full bg-[#3B230E]/18" />
            </div>

            <div className="flex flex-col gap-5 px-4 pb-4 pt-1 sm:px-6 md:px-8">
              <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                <div className="max-w-3xl">
                  <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#7b6c5f]">
                    {eyebrow}
                  </p>
                  <h1 className="mt-3 font-serif text-[28px] leading-tight text-[#3B230E] sm:text-[38px]">
                    {project.title}
                  </h1>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6f6257] sm:text-base">
                    {project.shortDescription}
                  </p>
                </div>

                {isAigc ? (
                  <div className="flex flex-wrap gap-2 pr-12 sm:pr-14 lg:justify-end">
                    <button
                      type="button"
                      onClick={() => setIsAigcUploadOpen((prev) => !prev)}
                      className="inline-flex items-center gap-2 rounded-full bg-[#3B230E] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#5F4E41]"
                    >
                      <Upload size={14} />
                      <span>{isZh ? '上传图片' : 'Upload'}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAigcManaging((prev) => !prev);
                        setSelectedAigcImages(new Set());
                      }}
                      className="inline-flex items-center gap-2 rounded-full border border-[#dfd0bf]/90 bg-white/72 px-4 py-2 text-xs font-medium text-[#3B230E] transition hover:bg-white"
                    >
                      <span>{isAigcManaging ? (isZh ? '完成' : 'Done') : isZh ? '批量编辑' : 'Batch edit'}</span>
                    </button>
                    {isAigcManaging ? (
                      <button
                        type="button"
                        onClick={handleDeleteSelectedAigcImages}
                        disabled={selectedAigcCount === 0}
                        className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2 text-xs font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        <Trash2 size={14} />
                        <span>
                          {isZh ? `删除已选 ${selectedAigcCount}` : `Delete ${selectedAigcCount}`}
                        </span>
                      </button>
                    ) : null}
                  </div>
                ) : null}
              </div>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 6).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-[#dfd0bf]/85 bg-white/58 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-[#6f6257]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            </div>
          </div>

          <button
            type="button"
            aria-label={isZh ? '关闭' : 'Close'}
            onClick={handleClose}
            className="absolute right-4 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full border border-[#dfd0bf]/90 bg-white/82 text-[#3B230E]/72 backdrop-blur-md transition hover:border-[#3B230E]/20 hover:bg-white hover:text-[#3B230E] sm:right-6"
          >
            <X size={16} />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto overscroll-contain bg-[linear-gradient(180deg,#f8f1e6_0%,#f3e7d8_100%)]"
            onWheelCapture={(event) => event.stopPropagation()}
          >
            <div className="mx-auto max-w-7xl px-4 pb-16 pt-7 sm:px-6 lg:px-8">
              {articleContent ? (
                <PromptArticleView content={articleContent!} project={project} isZh={isZh} />
              ) : workflowContent ? (
                <WorkflowArticleView content={workflowContent} project={project} isZh={isZh} />
              ) : vibeCodingContent ? (
                <VibeCodingArticleView content={vibeCodingContent} project={project} isZh={isZh} />
              ) : images.length > 0 ? (
                isAigc ? (
                  <>
                    <AnimatePresence initial={false}>
                        {isAigcUploadOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.22, ease: 'easeOut' }}
                            className="mb-5 overflow-hidden rounded-[22px] border border-[#dfd0bf]/80 bg-white/76 shadow-[0_18px_46px_rgba(59,35,14,0.08)]"
                          >
                            <div className="grid gap-4 p-4 md:grid-cols-[240px_minmax(0,1fr)]">
                              <button
                                type="button"
                                onClick={() => aigcFileInputRef.current?.click()}
                                className="group flex min-h-[180px] w-full items-center justify-center overflow-hidden rounded-[18px] border border-dashed border-[#cbb8a5] bg-[#fffaf2]/78 text-[#6f6257] transition hover:border-[#3B230E]/24 hover:bg-white hover:text-[#3B230E]"
                              >
                                {aigcUploadPreview ? (
                                  <img
                                    src={aigcUploadPreview}
                                    alt={isZh ? '上传预览' : 'Upload preview'}
                                    width={aigcUploadDimensions?.width}
                                    height={aigcUploadDimensions?.height}
                                    className="h-full max-h-[260px] w-full object-contain"
                                  />
                                ) : (
                                  <div className="flex flex-col items-center gap-3 px-4 text-center">
                                    <ImageIcon size={30} strokeWidth={1.4} />
                                    <span className="text-sm font-medium">
                                      {isProcessingAigcUpload ? (isZh ? '正在处理图片' : 'Processing image') : isZh ? '选择图片' : 'Choose image'}
                                    </span>
                                  </div>
                                )}
                              </button>

                              <div className="min-w-0">
                                <div className="flex items-center justify-between gap-3">
                                  <label
                                    htmlFor="aigc-upload-prompt"
                                    className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#7b6c5f]"
                                  >
                                    Prompt
                                  </label>
                                  {aigcUploadFile ? (
                                    <span className="truncate text-xs text-[#7b6c5f]">
                                      {cleanUploadLabel(aigcUploadFile.name)}
                                    </span>
                                  ) : null}
                                </div>
                                <textarea
                                  id="aigc-upload-prompt"
                                  value={aigcUploadPrompt}
                                  onChange={(event) => setAigcUploadPrompt(event.target.value)}
                                  placeholder="Create an image of..."
                                  rows={5}
                                  className="mt-2 min-h-[132px] w-full resize-y rounded-[18px] border border-[#dfd0bf] bg-white/78 px-4 py-3 text-sm leading-6 text-[#3B230E] outline-none transition placeholder:text-[#7b6c5f]/45 focus:border-[#3B230E]/30 focus:ring-2 focus:ring-[#3B230E]/10"
                                />
                                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
                                  <button
                                    type="button"
                                    onClick={handleAigcUploadCancel}
                                    className="rounded-full border border-[#dfd0bf] px-4 py-2 text-xs font-medium text-[#6f6257] transition hover:border-[#3B230E]/20 hover:text-[#3B230E]"
                                  >
                                    {isZh ? '取消' : 'Cancel'}
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleAigcUploadSave}
                                    disabled={!aigcUploadPreview || !aigcUploadPrompt.trim() || isProcessingAigcUpload}
                                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#3B230E] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#5F4E41] disabled:cursor-not-allowed disabled:bg-[#d9c9b8] disabled:text-[#7b6c5f]"
                                  >
                                    <Plus size={14} />
                                    <span>{isZh ? '保存到画廊' : 'Save to gallery'}</span>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="columns-2 gap-3 sm:columns-3 lg:columns-4 2xl:columns-5">
                    {images.map((src, index) => {
                      const prompt = getAigcPromptForImage(src);
                      const label = getAigcLabelForImage(src);
                      const isUploadedImage = aigcUploadMap.has(src);
                      const dimensions = getAigcDimensionsForImage(src);
                      const isSelected = selectedAigcImages.has(src);

                      return (
                        <div
                          key={getAigcImageKey(src)}
                          className={`group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-[20px] border bg-white text-left shadow-[0_14px_34px_rgba(59,35,14,0.11)] outline-none transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_54px_rgba(59,35,14,0.18)] focus-visible:border-[#3B230E]/35 focus-visible:ring-2 focus-visible:ring-[#3B230E]/16 sm:mb-4 ${
                            isSelected ? 'border-[#3B230E]/50 ring-2 ring-[#3B230E]/16' : 'border-[#dfd0bf]/85 hover:border-[#3B230E]/22'
                          }`}
                        >
                          <img
                            src={assetUrl(src)}
                            alt={`${project.title} - ${label}`}
                            width={dimensions?.width}
                            height={dimensions?.height}
                            className="block h-auto w-full transition duration-500 group-hover:scale-[1.03]"
                            loading={index < 12 ? 'eager' : 'lazy'}
                            onError={(event) => handleImageError(event, index)}
                          />

                          <button
                            type="button"
                            aria-label={isAigcManaging ? (isZh ? '选择图片' : 'Select image') : isZh ? '预览图片' : 'Preview image'}
                            onClick={() => {
                              if (isAigcManaging) {
                                toggleAigcSelection(src);
                                return;
                              }

                              setPreviewIndex(index);
                            }}
                            className={`absolute inset-0 z-10 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#3B230E]/30 ${
                              isAigcManaging ? 'cursor-pointer' : 'cursor-zoom-in'
                            }`}
                          />

                          <div className={`pointer-events-none absolute inset-0 z-20 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.88))] transition duration-300 ${
                            isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`} />

                          {isAigcManaging ? (
                            <div className="pointer-events-none absolute left-3 top-3 z-40 flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-black/55 text-white shadow-[0_10px_24px_rgba(0,0,0,0.28)] backdrop-blur-md">
                              {isSelected ? <Check size={15} strokeWidth={2.4} /> : null}
                            </div>
                          ) : null}

                          <div className={`pointer-events-none absolute inset-x-0 top-0 z-30 flex items-start justify-end gap-2 p-3 transition duration-300 ${
                            isAigcManaging ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}>
                            <span className="rounded-full border border-white/24 bg-black/55 px-2.5 py-1 text-[10px] text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] backdrop-blur-md">
                              {isAigcManaging
                                ? isSelected
                                  ? isZh ? '已选择' : 'Selected'
                                  : isZh ? '选择' : 'Select'
                                : isUploadedImage
                                  ? isZh ? '我的上传' : 'Uploaded'
                                  : isZh ? '点击预览' : 'Preview'}
                            </span>
                            {isUploadedImage && !isAigcManaging ? (
                              <button
                                type="button"
                                onPointerDown={(event) => event.stopPropagation()}
                                onMouseDown={(event) => event.stopPropagation()}
                                onClick={(event) => handleRemoveAigcUpload(src, event)}
                                className="pointer-events-auto inline-flex items-center gap-1 rounded-full border border-red-300/22 bg-red-500/16 px-2.5 py-1 text-[10px] text-red-100/82 backdrop-blur-md transition hover:border-red-200/45 hover:bg-red-500/25 hover:text-red-50"
                              >
                                <Trash2 size={10} />
                                <span>{isZh ? '移除' : 'Remove'}</span>
                              </button>
                            ) : null}
                          </div>

                          <div className={`aigc-prompt-overlay pointer-events-none absolute inset-x-0 bottom-0 z-30 p-4 transition duration-300 ${
                            isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                          }`}>
                            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/62">
                              Generated prompt
                            </p>
                            <p className="mt-2 line-clamp-5 text-[12px] leading-[1.55] text-white">
                              {prompt}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                    </div>
                  </>
                ) : isEditing ? (
                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {images.map((src, index) => (
                      <motion.div
                        key={`${src.slice(0, 40)}-${index}`}
                        layout
                        className={`group relative overflow-hidden rounded-[24px] border border-[#dfd0bf]/85 bg-white shadow-[0_14px_34px_rgba(59,35,14,0.1)] ${dragIndex === index ? 'opacity-45' : ''}`}
                        draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragOver={(event) => handleDragOver(event, index)}
                        onDragEnd={handleDragEnd}
                      >
                        <img
                          src={assetUrl(src)}
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
                      className="flex min-h-[340px] w-full flex-col items-center justify-center gap-4 rounded-[24px] border border-dashed border-[#cbb8a5] bg-white/58 text-[#6f6257] transition hover:border-[#3B230E]/24 hover:bg-white hover:text-[#3B230E]"
                    >
                      <Plus size={28} />
                      <div className="space-y-1 text-center">
                        <p className="text-sm font-medium">{isZh ? '添加新的灵感图像' : 'Add a new gallery image'}</p>
                        <p className="text-xs text-[#7b6c5f]">
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
                        className="group relative mb-5 block w-full break-inside-avoid overflow-hidden rounded-[26px] border border-[#dfd0bf]/85 bg-white text-left shadow-[0_18px_40px_rgba(59,35,14,0.1)] transition duration-300 hover:-translate-y-1.5 hover:border-[#3B230E]/22 hover:shadow-[0_24px_60px_rgba(59,35,14,0.16)]"
                      >
                        <img
                          src={assetUrl(src)}
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
                <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[28px] border border-dashed border-[#cbb8a5] bg-white/58 px-6 text-center text-[#6f6257]">
                  <ImageIcon size={48} strokeWidth={1.25} />
                  <h2 className="mt-6 font-serif text-2xl text-[#3B230E]">
                    {isZh ? '还没有内容，先放进第一张图吧' : 'Nothing here yet. Add the first image.'}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#7b6c5f] sm:text-base">
                    {isZh
                      ? '这一页会保留你的图片顺序和内容。进入编辑模式后，可以添加图片、删除图片，也能继续拖拽调整。'
                      : 'This page keeps its own image set and order. Switch to edit mode to add, delete, and rearrange your gallery.'}
                  </p>
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      handleAddImage();
                    }}
                    className="mt-8 flex items-center gap-2 rounded-full bg-[#3B230E] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#5F4E41]"
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
        {previewImage && previewImageSrc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 z-[10012] bg-[#1d120b]/86 p-3 backdrop-blur-2xl sm:p-5 lg:p-8"
            onClick={() => setPreviewIndex(null)}
            onWheelCapture={(event) => event.stopPropagation()}
          >
            <div
              className="flex min-h-full items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="relative grid max-h-[calc(100vh-24px)] w-full max-w-[1480px] overflow-y-auto rounded-[30px] border border-white/24 bg-[#fffaf2] shadow-[0_34px_120px_rgba(0,0,0,0.42)] lg:w-fit lg:max-h-[calc(100vh-64px)] lg:max-w-[calc(100vw-64px)] lg:grid-cols-[auto_minmax(320px,380px)] lg:overflow-hidden">
                <button
                  onClick={() => setPreviewIndex(null)}
                  className="absolute right-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-full border border-[#dfd0bf]/80 bg-white/88 text-[#3B230E] shadow-[0_12px_28px_rgba(59,35,14,0.14)] backdrop-blur-md transition hover:bg-white"
                >
                  <X size={18} />
                </button>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handlePreviewStep(-1);
                      }}
                      className="absolute left-3 top-[42%] z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/44 text-white shadow-[0_12px_28px_rgba(0,0,0,0.24)] backdrop-blur-md transition hover:bg-black/64 sm:left-5 lg:top-1/2"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        handlePreviewStep(1);
                      }}
                      className="absolute right-3 top-[42%] z-30 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/44 text-white shadow-[0_12px_28px_rgba(0,0,0,0.24)] backdrop-blur-md transition hover:bg-black/64 sm:right-5 lg:right-[400px] lg:top-1/2"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                <div
                  className="relative flex min-h-[62vh] items-center justify-center bg-[#efe2d1]/65 p-4 sm:p-6 lg:min-h-[calc(100vh-64px)]"
                  style={previewStageWidth ? { width: `${previewStageWidth}px` } : undefined}
                >
                  <motion.img
                    key={`${previewImage}-${previewIndex}`}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.22 }}
                    src={previewImageSrc}
                    alt={`${project.title} preview ${previewIndex !== null ? previewIndex + 1 : ''}`}
                    width={previewDimensions?.width}
                    height={previewDimensions?.height}
                    style={previewFrameSize ? { width: `${previewFrameSize.width}px`, height: `${previewFrameSize.height}px` } : undefined}
                    className="rounded-[22px] object-contain shadow-[0_24px_70px_rgba(59,35,14,0.2)]"
                    onLoad={(event) => {
                      setPreviewMeasuredDimensions({
                        width: event.currentTarget.naturalWidth,
                        height: event.currentTarget.naturalHeight,
                      });
                    }}
                    onError={(event) => handleImageError(event, previewIndex ?? 0)}
                  />
                  <div className="pointer-events-none absolute bottom-4 left-4 max-w-[min(520px,calc(100%-32px))] rounded-full border border-white/35 bg-black/42 px-4 py-2 text-sm text-white shadow-[0_12px_28px_rgba(0,0,0,0.2)] backdrop-blur-md">
                    {previewLabel || project.title}
                  </div>
                </div>

                <aside className="flex min-h-0 flex-col border-t border-[#dfd0bf] bg-white/84 p-5 pr-16 lg:border-l lg:border-t-0 lg:pr-5">
                  <p className="font-serif text-[22px] leading-tight text-[#3B230E]">{previewLabel || project.title}</p>
                  <p className="mt-1 text-sm text-[#7b6c5f]">
                    {isAigc
                      ? isZh ? 'AIGC 图像创作预览' : 'AIGC image preview'
                      : isZh ? '探索子页面预览' : 'Exploration preview'}
                  </p>
                  <button
                    type="button"
                    onClick={handleDeletePreviewImage}
                    className="mt-4 inline-flex items-center justify-center gap-2 self-start rounded-full bg-[#3B230E] px-4 py-2 text-xs font-medium text-white transition hover:bg-[#5F4E41]"
                  >
                    <Trash2 size={14} />
                    <span>{isZh ? '删除图片' : 'Delete image'}</span>
                  </button>
                  {previewPrompt ? (
                    <div className="mt-5 max-h-[34vh] overflow-y-auto rounded-[18px] border border-[#dfd0bf] bg-[#fffaf2] p-4 lg:max-h-none lg:min-h-0">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#7b6c5f]">
                        Prompt
                      </p>
                      <p className="mt-3 text-sm leading-6 text-[#3B230E]">{previewPrompt}</p>
                    </div>
                  ) : null}
                  {previewThumbnails.length > 0 ? (
                    <div className="mt-auto pt-5">
                      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-[#7b6c5f]">
                        {isZh ? '附近图片' : 'Nearby images'}
                      </p>
                      <div className="flex gap-2 overflow-x-auto">
                        {previewThumbnails.map((src, index) => {
                          const actualIndex = previewStartIndex + index;

                          return (
                            <button
                              key={`${src.slice(0, 24)}-${actualIndex}`}
                              onClick={(event) => {
                                event.stopPropagation();
                                setPreviewIndex(actualIndex);
                              }}
                              className={`h-14 w-14 flex-shrink-0 overflow-hidden rounded-[14px] border transition ${
                                actualIndex === previewIndex
                                  ? 'border-[#3B230E] opacity-100'
                                  : 'border-[#dfd0bf] opacity-60 hover:opacity-100'
                              }`}
                            >
                              <img
                                src={assetUrl(src)}
                                alt={`${project.title} thumbnail ${actualIndex + 1}`}
                                className="h-full w-full object-cover"
                                onError={(event) => handleImageError(event, actualIndex)}
                              />
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
                </aside>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editNotice && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="fixed right-4 top-[112px] z-[10030] rounded-full border border-[#d6a96c]/35 bg-black/70 px-4 py-2 text-xs font-medium text-[#f1d2a2] shadow-[0_14px_34px_rgba(0,0,0,0.32)] backdrop-blur-md sm:right-6"
          >
            {editNotice}
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
      <input
        ref={aigcFileInputRef}
        type="file"
        accept="image/*"
        onChange={handleAigcUploadSelect}
        className="hidden"
      />
    </>
  );
};

export default ExplorationGallery;

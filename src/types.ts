export interface CaseSection {
  type: 'hero' | 'stats' | 'personas' | 'flow' | 'cards' | 'principles' | 'two-column' | 'voice-states' | 'mockup' | 'text' | 'outcomes' | 'interaction-path' | 'interaction-mapping' | 'series-timeline' | 'evidence' | 'state-flow' | 'validation' | 'design-rationale' | 'annotated-mockup' | 'editorial-board' | 'live-demo';
  category?: string; // e.g. "DESIGN RATIONALE", "DESIGN FOUNDATION", "DESIGN VALIDATION"
  label?: string;
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  secondaryImage?: string;
  bgImage?: string;
  dark?: boolean;
  variant?: 'series' | 'infinity' | 'xl' | 'drag';
  accent?: string;
  items?: {
    icon?: string;
    number?: string;
    title: string;
    subtitle?: string;
    description: string;
    color?: string;
  }[];
  stats?: {
    value: string;
    label: string;
    description?: string;
  }[];
  steps?: {
    label: string;
    active?: boolean;
  }[];
  columns?: {
    title: string;
    items: string[];
  }[];
  rows?: {
    action: string;
    feedback: string;
    value: string;
  }[];
  quotes?: {
    avatar: string;
    text: string;
  }[];
  tags?: string[];
  role?: string;
  date?: string;
  annotations?: {
    x?: number;      // 0-100, percentage from left of image (default: 0 for left, 100 for right)
    y: number;       // 0-100, percentage from top of image
    label: string;   // Short label text
    detail?: string; // Optional secondary text
    side: 'left' | 'right';
    color?: string;  // Accent color override
  }[];
  layout?: 'full-bleed' | 'contained' | 'immersive'; // editorial-board layout mode
  caption?: string; // editorial-board caption text
  maxWidth?: string; // e.g. '1440px', '100%'
  demoUrl?: string; // live-demo URL
  fallbackImage?: string; // live-demo preview/fallback image
  fallbackAlt?: string; // accessible alt text for fallback image
  buttonLabel?: string; // live-demo external link label
}

export interface Project {
  id: string;
  title: string;
  category: 'B-Side' | 'C-Side' | 'System';
  platform: 'Web' | 'Mobile' | 'IoT' | 'Print & Digital' | 'Digital';
  year: string;
  role: string;
  shortDescription: string;
  coverImage: string;
  // Cover behavior for source-design screenshots/PDF-style pages.
  // These should be shown without cropping or stretching.
  coverDisplay?: 'cover' | 'contain';
  coverAspectRatio?: number;
  // Slide showcase mode — when present, renders as full-page slide viewer
  slides?: string[];
  // Reserved for future localized exports. These are separate source files,
  // never auto-translated from the current image content.
  slideSets?: {
    zh?: string[];
    en?: string[];
  };
  // 新增字段
  gallery?: string[]; // 项目图片集
  externalLinks?: {
    behance?: string;
    zcool?: string;
    live?: string;
    github?: string;
  };
  tags?: string[]; // 项目标签
  caseSections?: CaseSection[]; // 完整案例展示（替代 acts 3幕结构）
  overview?: {
    statement: string;
    metrics?: { label: string; value: string; description?: string }[];
  };
  acts: {
    act1: {
      title: string;
      content: string;
      highlights?: { title: string; description: string; icon?: string }[];
      image?: string;
    };
    act2: {
      title: string;
      content: string;
      decisionPoints: string[];
      principles?: { title: string; subtitle?: string; description: string }[];
      image?: string;
    };
    act3: {
      title: string;
      content: string;
      impact: string;
      outcomes?: { label: string; value: string }[];
      image?: string;
    };
  };
}

export interface CareerStage {
  id: string;
  period: string;
  company: string;
  role: string;
  oneLiner: string;
  skills: string[];
  image: string; // New field for the sticky timeline visual
  relatedProjectIds: string[];
}

export interface PortfolioState {
  selectedProjectIds: string[];
  isGeneratorOpen: boolean;
}

export type SectionId = 'hero' | 'timeline' | 'work' | 'profile' | 'contact';

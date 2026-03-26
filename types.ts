export interface Project {
  id: string;
  title: string;
  category: 'B-Side' | 'C-Side' | 'System';
  platform: 'Web' | 'Mobile' | 'IoT' | 'Print & Digital' | 'Digital';
  year: string;
  role: string;
  shortDescription: string;
  coverImage: string;
  // 新增字段
  gallery?: string[]; // 项目图片集
  externalLinks?: {
    behance?: string;
    zcool?: string;
    live?: string;
    github?: string;
  };
  tags?: string[]; // 项目标签
  acts: {
    act1: { title: string; content: string }; // The Problem
    act2: { title: string; content: string; decisionPoints: string[] }; // The Decision
    act3: { title: string; content: string; impact: string }; // The Result
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
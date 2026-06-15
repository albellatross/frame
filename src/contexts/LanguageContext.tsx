import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.narrative': 'Narrative',
    'nav.home': 'Home',
    'nav.timeline': 'Timeline',
    'nav.work': 'Work',
    'nav.profile': 'Profile',
    'nav.navigation': 'Navigation',
    'nav.connect': 'Connect',
    
    // Hero
    'hero.subtitle': 'The Narrative Portfolio',
    'hero.title1': "Design isn't",
    'hero.title2': 'just output.',
    'hero.title3': "It's the",
    'hero.title4': 'frame',
    'hero.description': "AI Product Experience Designer at Microsoft. I believe AI is the greatest magic of our era — and I\'m quietly designing it to feel a little warmer.",
    'hero.enterFrame': 'Enter the frame',
    'hero.scroll': 'Scroll Narrative',
    'hero.figure': 'Fig. 01',
    'hero.figureTitle': 'Structure & Void',
    
    // Introduction
    'intro.label': 'About Me',
    'intro.name': 'Bella',
    'intro.paragraph1': "I'm Bella, an AI Product Experience Designer with a background in brand design, visual design, and UI/UX. Currently focused on AI product experience, generative AI, and creator tools — working on projects like Copilot Imagine and Word Read Aloud at Microsoft.",
    'intro.paragraph2': 'Educated in',
    'intro.highlight1': 'Visual Communication Design',
    'intro.paragraph2b': 'in Italy (NABA Milan & Rome Academy of Fine Arts). I transform complex AI capabilities into experiences users can understand and control, while continuously exploring',
    'intro.highlight2': 'AI Workflow, Design-to-Code',
    'intro.paragraph2c': 'and new creative paradigms.',
    'intro.tools': 'Tools I Use',
    'intro.wantMore': 'Want to know more?',
    'intro.viewResume': 'View Full Resume',
    
    // Skills
    'skill.uiux': 'UI/UX Design',
    'skill.systems': 'Design Systems',
    'skill.research': 'User Research',
    'skill.frontend': 'Frontend Dev',
    'skill.motion': 'Motion Design',
    'skill.leadership': 'Team Leadership',
    
    // Timeline
    'timeline.journey': 'The Journey',
    'timeline.title': 'Career Timeline',
    'timeline.viewCase': 'View Case Study',
    'timeline.featuredWork': 'Featured Work',
    'timeline.selectedWorks': 'Selected Works',
    'timeline.viewAllWorks': 'View all works',
    'timeline.hiddenOne': '1 more project is kept in the work index.',
    'timeline.hiddenMany': '{count} more projects are kept in the work index.',
    
    // Work Page
    'work.title': 'Work Index.',
    'work.description': 'A collection of case studies focusing on systemic complexity, user behavior, and strategic trade-offs.',
    'work.all': 'All',
    'work.viewCase': 'View Case',
    'work.noProjects': 'No projects found for this category.',
    'work.backToTimeline': 'Back to Timeline',
    
    // Resume Page
    'resume.title': 'FRAME.',
    'resume.role': 'Lead Product Designer & System Architect',
    'resume.about': 'About',
    'resume.aboutText': 'A product designer obsessed with the "why" behind the "what". I specialize in untangling complex B2B workflows and building scalable design systems that bridge the gap between design and engineering.',
    'resume.competencies': 'Core Competencies',
    'resume.tools': 'Tools',
    'resume.education': 'Education',
    'resume.experience': 'Experience',
    'resume.recognition': 'Recognition',
    'resume.download': 'Download PDF Resume',
    
    // Project Detail
    'project.role': 'Role',
    'project.year': 'Year',
    'project.platform': 'Platform',
    'project.type': 'Type',
    'project.act1': 'Act I : The Context',
    'project.act2': 'Act II : The Frame',
    'project.act3': 'Act III : The Outcome',
    'project.decisions': 'Key Decisions:',
    'project.impact': 'Primary Metric Impact',
    'project.end': 'End of Case Study',
    'project.back': 'Back to Timeline',
    
    // Footer
    'footer.title': "Let's Frame",
    'footer.title2': 'the Future.',
    'footer.meta': 'Designed and built as a meta-case study.',
    'footer.exploration': 'This portfolio is an open exploration of narrative design.',
    'footer.copyright': '© 2024 FRAME Portfolio.',
    
    // Quote
    'quote.eames': '"The details are not the details. They make the design."',
    'quote.author': '— Charles Eames',
  },
  zh: {
    // Navigation
    'nav.narrative': '叙事',
    'nav.home': '首页',
    'nav.timeline': '时间线',
    'nav.work': '作品',
    'nav.profile': '简介',
    'nav.navigation': '导航',
    'nav.connect': '联系',
    
    // Hero
    'hero.subtitle': '叙事作品集',
    'hero.title1': '设计不仅仅是',
    'hero.title2': '产出。',
    'hero.title3': '它是',
    'hero.title4': '框架',
    'hero.description': '微软 AI 产品体验设计师。我相信 AI 是这个时代最伟大的魔法，也一直在把复杂技术偷偷设计得更温暖一点。',
    'hero.enterFrame': '进入框架',
    'hero.scroll': '滚动浏览',
    'hero.figure': '图 01',
    'hero.figureTitle': '结构与空间',
    
    // Introduction
    'intro.label': '关于我',
    'intro.name': 'Bella',
    'intro.paragraph1': '我是 Bella，拥有品牌设计、视觉设计与 UI/UX 背景的 AI 产品体验设计师。目前专注于 AI 产品体验、生成式 AI 与创作者工具方向，参与过 Copilot Imagine、Word Read Aloud 等项目。',
    'intro.paragraph2': '在意大利接受过',
    'intro.highlight1': '视觉传达设计',
    'intro.paragraph2b': '教育（NABA 米兰新美院 & 罗马美院）。我将复杂的 AI 能力转化为用户可理解、可控制的产品体验，同时持续探索',
    'intro.highlight2': 'AI Workflow、Design-to-Code',
    'intro.paragraph2c': '等新型创作方式。',
    'intro.tools': '我使用的工具',
    'intro.wantMore': '想了解更多？',
    'intro.viewResume': '查看完整简历',
    
    // Skills
    'skill.uiux': 'UI/UX 设计',
    'skill.systems': '设计系统',
    'skill.research': '用户研究',
    'skill.frontend': '前端开发',
    'skill.motion': '动效设计',
    'skill.leadership': '团队管理',
    
    // Timeline
    'timeline.journey': '成长历程',
    'timeline.title': '职业时间线',
    'timeline.viewCase': '查看案例',
    'timeline.featuredWork': '重点作品',
    'timeline.selectedWorks': '精选项目',
    'timeline.viewAllWorks': '查看全部作品',
    'timeline.hiddenOne': '还有 1 个项目收在作品索引里。',
    'timeline.hiddenMany': '还有 {count} 个项目收在作品索引里。',
    
    // Work Page
    'work.title': '作品索引',
    'work.description': '一系列聚焦于系统复杂性、用户行为和战略权衡的案例研究。',
    'work.all': '全部',
    'work.viewCase': '查看案例',
    'work.noProjects': '该分类下暂无项目。',
    'work.backToTimeline': '返回时间线',
    
    // Resume Page
    'resume.title': 'FRAME.',
    'resume.role': '首席产品设计师 & 系统架构师',
    'resume.about': '关于',
    'resume.aboutText': '一个痴迷于探究"为什么"的产品设计师。我专注于理清复杂的 B2B 工作流程，构建可扩展的设计系统，弥合设计与工程之间的差距。',
    'resume.competencies': '核心能力',
    'resume.tools': '工具',
    'resume.education': '教育背景',
    'resume.experience': '工作经历',
    'resume.recognition': '荣誉认可',
    'resume.download': '下载 PDF 简历',
    
    // Project Detail
    'project.role': '角色',
    'project.year': '年份',
    'project.platform': '平台',
    'project.type': '类型',
    'project.act1': '第一幕：背景',
    'project.act2': '第二幕：框架',
    'project.act3': '第三幕：成果',
    'project.decisions': '关键决策：',
    'project.impact': '核心指标影响',
    'project.end': '案例结束',
    'project.back': '返回时间线',
    
    // Footer
    'footer.title': '让我们一起',
    'footer.title2': '构建未来。',
    'footer.meta': '作为元案例研究设计和构建。',
    'footer.exploration': '这个作品集是对叙事设计的开放探索。',
    'footer.copyright': '© 2024 FRAME 作品集。',
    
    // Quote
    'quote.eames': '"细节不只是细节，它们构成了设计。"',
    'quote.author': '— 查尔斯·伊姆斯',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Update html lang attribute when language changes
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'zh' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

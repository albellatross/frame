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
    'nav.timeline': 'Timeline',
    'nav.work': 'Work',
    'nav.profile': 'Profile',
    'nav.navigation': 'Navigation',
    'nav.connect': 'Connect',
    'nav.generate': 'Generate',
    
    // Hero
    'hero.subtitle': 'The Narrative Portfolio',
    'hero.title1': "Design isn't",
    'hero.title2': 'just output.',
    'hero.title3': "It's the",
    'hero.title4': 'frame',
    'hero.description': "I'm a Product Designer focusing on the decision architecture behind pixels. This site frames how I think, structure problems, and arrive at solutions.",
    'hero.enterFrame': 'Enter the frame',
    'hero.scroll': 'Scroll Narrative',
    'hero.figure': 'Fig. 01',
    'hero.figureTitle': 'Structure & Void',
    
    // Introduction
    'intro.label': 'About Me',
    'intro.name': 'Bella',
    'intro.paragraph1': "I'm Bella, a designer who combines thoughtful UI design with strong brand identity. I'm dedicated to transforming user needs and product goals into captivating visual experiences and smooth web and app workflows. I strive to help brands stand out in competitive markets by delivering interfaces that are not only beautiful but also easy to use.",
    'intro.paragraph2': 'I was educated in',
    'intro.highlight1': 'Graphic & Visual Communication Design',
    'intro.paragraph2b': 'in Italy, with a solid foundation in visual design and user experience design. I focus on combining aesthetics with usability to create',
    'intro.highlight2': 'user-centered',
    'intro.paragraph2c': 'design solutions with depth.',
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
    
    // Work Page
    'work.title': 'Work Index.',
    'work.description': 'A collection of case studies focusing on systemic complexity, user behavior, and strategic trade-offs.',
    'work.all': 'All',
    'work.viewCase': 'View Case',
    'work.noProjects': 'No projects found for this category.',
    
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
    
    // Portfolio Generator
    'generator.title': 'Generate Portfolio',
    'generator.description': 'Curate a specific PDF version of this portfolio tailored to your recruitment needs.',
    'generator.coverStyle': 'Cover Style',
    'generator.minimal': 'Minimal',
    'generator.bold': 'Bold',
    'generator.typographic': 'Typographic',
    'generator.image': 'Image',
    'generator.cancel': 'Cancel and Close',
    'generator.included': 'Included Projects',
    'generator.reorder': 'Drag to reorder (Simulated)',
    'generator.empty': 'No projects selected. Add them from the Work section.',
    'generator.generating': 'Generating PDF...',
    'generator.generate': 'Generate Portfolio',
    'generator.ready': 'Portfolio Ready',
    'generator.success': 'Your curated portfolio has been generated successfully with',
    'generator.projects': 'projects.',
    'generator.edit': 'Edit Selection',
    'generator.download': 'Download PDF',
    
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
    'nav.timeline': '时间线',
    'nav.work': '作品',
    'nav.profile': '简介',
    'nav.navigation': '导航',
    'nav.connect': '联系',
    'nav.generate': '生成',
    
    // Hero
    'hero.subtitle': '叙事作品集',
    'hero.title1': '设计不仅仅是',
    'hero.title2': '产出。',
    'hero.title3': '它是',
    'hero.title4': '框架',
    'hero.description': '我是一名产品设计师，专注于像素背后的决策架构。这个网站展示了我如何思考、构建问题，以及如何找到解决方案。',
    'hero.enterFrame': '进入框架',
    'hero.scroll': '滚动浏览',
    'hero.figure': '图 01',
    'hero.figureTitle': '结构与空间',
    
    // Introduction
    'intro.label': '关于我',
    'intro.name': 'Bella',
    'intro.paragraph1': '我是Bella，一名将深思熟虑的UI设计与强有力品牌形象相结合的设计师，致力于将用户需求和产品目标转化为引人入胜的视觉效果和流畅的网页及应用流程。我努力帮助品牌在竞争激烈的市场中脱颖而出，提供不仅美观且易于使用的界面。',
    'intro.paragraph2': '我在意大利接受过',
    'intro.highlight1': '图形与视觉传达设计',
    'intro.paragraph2b': '的教育，拥有扎实的视觉设计和用户体验设计基础。我专注于将美学与可用性相结合，创造出富有深度、',
    'intro.highlight2': '以用户为中心',
    'intro.paragraph2c': '的设计解决方案。',
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
    
    // Work Page
    'work.title': '作品索引',
    'work.description': '一系列聚焦于系统复杂性、用户行为和战略权衡的案例研究。',
    'work.all': '全部',
    'work.viewCase': '查看案例',
    'work.noProjects': '该分类下暂无项目。',
    
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
    
    // Portfolio Generator
    'generator.title': '生成作品集',
    'generator.description': '为您的招聘需求定制一份专属的 PDF 作品集。',
    'generator.coverStyle': '封面风格',
    'generator.minimal': '极简',
    'generator.bold': '大胆',
    'generator.typographic': '字体',
    'generator.image': '图片',
    'generator.cancel': '取消并关闭',
    'generator.included': '已选项目',
    'generator.reorder': '拖拽排序（模拟）',
    'generator.empty': '未选择项目。请从作品区添加。',
    'generator.generating': '正在生成 PDF...',
    'generator.generate': '生成作品集',
    'generator.ready': '作品集已就绪',
    'generator.success': '您的定制作品集已成功生成，包含',
    'generator.projects': '个项目。',
    'generator.edit': '编辑选择',
    'generator.download': '下载 PDF',
    
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

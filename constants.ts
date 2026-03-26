import { CareerStage, Project } from './types';

// ===== CAREER TIMELINE - English =====
export const CAREER_TIMELINE_EN: CareerStage[] = [
  {
    id: 'c1',
    period: 'Feb 2025 - Present',
    company: 'Microsoft STCA',
    role: 'UI/UX Designer',
    oneLiner: 'Designing voice-driven AI experiences for Office Copilot.',
    skills: ['Voice Interaction', 'AI UX', 'Cross-timezone Collaboration'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200',
    relatedProjectIds: ['p1', 'p2']
  },
  {
    id: 'c2',
    period: 'Jun 2022 - Feb 2025',
    company: 'Microsoft Research Asia',
    role: 'UI/UX Designer, Graphic Designer',
    oneLiner: 'Led 10+ AI product designs from AIGC tools to research platforms.',
    skills: ['AIGC Design', 'B2B Tools', 'Visual Systems', 'Graphic Design'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200',
    relatedProjectIds: ['p3', 'p4', 'p5', 'p6', 'p9', 'p10', 'p11']
  },
  {
    id: 'c3',
    period: '2020 - 2021',
    company: 'NABA Milan & Study in Italy',
    role: 'Visual Communication Design',
    oneLiner: "Master's degree, QS Top 100, focusing on UX and branding.",
    skills: ['Visual Design', 'Branding', 'User Research', 'Illustration'],
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=1200',
    relatedProjectIds: ['p7', 'p8']
  }
];

// ===== CAREER TIMELINE - 中文 =====
export const CAREER_TIMELINE_ZH: CareerStage[] = [
  {
    id: 'c1',
    period: '2025年2月 - 至今',
    company: 'Microsoft STCA',
    role: 'UI/UX 设计师',
    oneLiner: '为 Office Copilot 设计语音驱动的 AI 体验。',
    skills: ['语音交互', 'AI 用户体验', '跨时区协作'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1200',
    relatedProjectIds: ['p1', 'p2']
  },
  {
    id: 'c2',
    period: '2022年6月 - 2025年2月',
    company: 'Microsoft Research Asia',
    role: 'UI/UX 设计师, 平面设计师',
    oneLiner: '主导 10+ AI 产品设计，从 AIGC 工具到研究平台。',
    skills: ['AIGC 设计', 'B2B 工具', '视觉系统', '平面设计'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200',
    relatedProjectIds: ['p3', 'p4', 'p5', 'p6', 'p9', 'p10', 'p11']
  },
  {
    id: 'c3',
    period: '2020 - 2021',
    company: 'NABA 米兰与意大利留学',
    role: '视觉传达设计',
    oneLiner: '硕士学位，QS全球前100，专注UX和品牌设计。',
    skills: ['视觉设计', '品牌设计', '用户研究', '插画'],
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=1200',
    relatedProjectIds: ['p7', 'p8']
  }
];

// 保持向后兼容
export const CAREER_TIMELINE = CAREER_TIMELINE_EN;

// ===== PROJECTS - English =====
export const PROJECTS_EN: Project[] = [
  {
    id: 'p1',
    title: 'Copilot Read Aloud',
    category: 'B-Side',
    platform: 'Web',
    year: '2025',
    role: 'UI/UX Designer',
    shortDescription: 'Real-time voice interaction for Office documents.',
    coverImage: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800',
    tags: ['Voice UX', 'AI Design', 'Accessibility', 'Figma', 'Microsoft Office', 'Conversation Design'],
    acts: {
      act1: {
        title: 'The Challenge',
        content: 'Traditional read-aloud features offered passive listening without interaction or comprehension support.'
      },
      act2: {
        title: 'Voice-First Design',
        content: 'Designed real-time voice conversation that transforms document interaction. Collaborated across US design teams and Beijing engineering.',
        decisionPoints: ['Real-time dialogue', 'Seamless integration', 'Accessible patterns']
      },
      act3: {
        title: 'Enhanced Understanding',
        content: 'Successfully launched Dogfood version. Transformed passive reading into active dialogue.',
        impact: 'Dogfood Launch'
      }
    }
  },
  {
    id: 'p2',
    title: 'Office AI Internal Tools',
    category: 'B-Side',
    platform: 'Web',
    year: '2025',
    role: 'Lead Designer',
    shortDescription: 'Dashboard and metrics system for Office AI team.',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    tags: ['B2B Dashboard', 'Data Visualization', 'Information Architecture', 'Figma', 'User Research'],
    acts: {
      act1: {
        title: 'Data Complexity',
        content: 'Internal teams needed efficient tools to track AI metrics and generate insights.'
      },
      act2: {
        title: 'User-Centered B2B',
        content: 'Designed dashboard, reports, and metrics preview through deep user research.',
        decisionPoints: ['Streamlined visualization', 'Intuitive navigation', 'Focus on usability']
      },
      act3: {
        title: 'High Satisfaction',
        content: 'Received highly positive feedback for ease of use and operational convenience.',
        impact: '30% Usage Increase'
      }
    }
  },
  {
    id: 'p3',
    title: 'NUWA - AIGC Platform',
    category: 'C-Side',
    platform: 'Web',
    year: '2023',
    role: 'Lead Designer',
    shortDescription: 'AI-powered content generation showcase.',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    tags: ['AIGC', 'AI Design', 'Visual Design', 'Web Design', 'Figma', 'Marketing'],
    acts: {
      act1: {
        title: 'Emerging Technology',
        content: 'Showcase NUWA\'s capabilities: image expansion, text-to-image, image-to-video generation.'
      },
      act2: {
        title: 'Technical Excellence',
        content: 'Combined technical features with user needs for optimal interaction and visual design.',
        decisionPoints: ['Intuitive AIGC workflows', 'Engaging visuals', 'Clear communication']
      },
      act3: {
        title: 'Viral Success',
        content: 'Achieved 10K+ views and engagement on social media, boosting NUWA\'s market presence.',
        impact: '10K+ Social Engagement'
      }
    }
  },
  {
    id: 'p4',
    title: 'ReMe - AI Companion',
    category: 'C-Side',
    platform: 'Mobile',
    year: '2023',
    role: 'Lead UI/UX & Brand Designer',
    shortDescription: 'AI chatbot helping Alzheimer\'s patients.',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    tags: ['Mobile App', 'Healthcare', 'Brand Design', 'UI System', 'User Research', 'Empathy Design'],
    acts: {
      act1: {
        title: 'Empathy Required',
        content: 'Designing for elderly Alzheimer\'s patients required simplicity and emotional warmth.'
      },
      act2: {
        title: 'Human-Centered',
        content: '0-to-1 collaboration with PM and researchers. Built scalable UI component library.',
        decisionPoints: ['Simple warm interface', 'Easy interactions', 'Emotional connection']
      },
      act3: {
        title: 'Meaningful Impact',
        content: 'Improved quality of life for Alzheimer\'s patients through AI conversation.',
        impact: 'Improved Patient QoL'
      }
    }
  },
  {
    id: 'p5',
    title: 'RD-Agent',
    category: 'B-Side',
    platform: 'Web',
    year: '2024',
    role: 'UI/UX Designer',
    shortDescription: 'AI-assisted hypothesis generation for researchers.',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    tags: ['B2B Tool', 'Research Platform', 'AI Integration', 'Design System', 'Figma'],
    acts: {
      act1: {
        title: 'Research Efficiency',
        content: 'Researchers needed tools for hypothesis generation. Legacy systems had poor UX.'
      },
      act2: {
        title: 'Streamlined Platform',
        content: 'Analyzed user journeys and established comprehensive design specs.',
        decisionPoints: ['Clear hierarchy', 'Improved consistency', 'Enhanced productivity']
      },
      act3: {
        title: 'Better Workflow',
        content: 'Significantly improved usability for AI-assisted research.',
        impact: 'Enhanced Productivity'
      }
    }
  },
  {
    id: 'p6',
    title: 'MSRA 25th Anniversary',
    category: 'System',
    platform: 'Print & Digital',
    year: '2023',
    role: 'Graphic Designer',
    shortDescription: 'Fridge magnets and banners celebrating 25 years.',
    coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
    tags: ['Graphic Design', 'Brand Identity', 'Print Design', 'Adobe Illustrator', 'Visual Communication'],
    externalLinks: {
      zcool: 'https://www.zcool.com.cn/u/18429743'
    },
    acts: {
      act1: {
        title: 'Anniversary Celebration',
        content: 'Create memorable merchandise for Microsoft Research Asia\'s 25th anniversary.'
      },
      act2: {
        title: 'Seasonal Design',
        content: 'Integrated Microsoft logo with four-season views of the building. Hourglass-inspired banners.',
        decisionPoints: ['Iconic imagery', 'Meaningful symbolism', 'Brand consistency']
      },
      act3: {
        title: 'Viral Popularity',
        content: 'Achieved 30K+ views and 500+ likes on social media.',
        impact: '30K+ Social Views'
      }
    }
  },
  {
    id: 'p7',
    title: 'Ioete Tea Shop',
    category: 'C-Side',
    platform: 'Print & Digital',
    year: '2021',
    role: 'Brand Designer',
    shortDescription: 'Complete brand identity for Milan tea shop.',
    coverImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800',
    tags: ['Brand Identity', 'Packaging Design', 'Visual System', 'Print Design', 'Adobe Creative Suite'],
    externalLinks: {
      behance: 'https://www.behance.net/albellatrocb95'
    },
    acts: {
      act1: {
        title: 'Brand Identity',
        content: 'New Milan tea shop needed distinctive branding to stand out.'
      },
      act2: {
        title: 'Modern Tea Culture',
        content: 'Led full design from concept to delivery. Clean, modern packaging with emotional resonance.',
        decisionPoints: ['Minimalist aesthetic', 'Cultural connection', 'Extensible system']
      },
      act3: {
        title: 'Still In Use',
        content: 'Shop continues using the complete visual system today.',
        impact: 'Lasting Brand Impact'
      }
    }
  },
  {
    id: 'p8',
    title: 'Illustration Works',
    category: 'C-Side',
    platform: 'Digital',
    year: '2021-2023',
    role: 'Illustrator',
    shortDescription: 'Commercial illustrations and IP character design.',
    coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
    tags: ['Illustration', 'Character Design', 'Digital Art', 'Commercial Art', 'Visual Storytelling'],
    externalLinks: {
      zcool: 'https://www.zcool.com.cn/u/18429743',
      behance: 'https://www.behance.net/albellatrocb95'
    },
    acts: {
      act1: {
        title: 'Creative Expression',
        content: 'Personal illustration projects exploring imagination and storytelling.'
      },
      act2: {
        title: 'Diverse Styles',
        content: 'Commercial illustrations, IP characters, and poster designs for brands like Baixiang.',
        decisionPoints: ['Playful narratives', 'Brand collaboration', 'Visual storytelling']
      },
      act3: {
        title: 'Community Engagement',
        content: 'Published on Zcool with positive community feedback.',
        impact: '250+ Views'
      }
    }
  },
  {
    id: 'p9',
    title: '"心相印" Jump into Freedom',
    category: 'C-Side',
    platform: 'Digital',
    year: '2023',
    role: 'Illustrator',
    shortDescription: 'Commercial illustration for Heart Printing Package Creative Contest.',
    coverImage: 'https://img.zcool.cn/community/0114ff642e87130002c37bd4a1f7d4.jpg',
    gallery: [
      'https://img.zcool.cn/community/0114ff642e87130002c37bd4a1f7d4.jpg'
    ],
    tags: ['Commercial Illustration', 'Contest', 'Visual Storytelling', 'Brand Collaboration'],
    externalLinks: {
      zcool: 'https://www.zcool.com.cn/u/18429743'
    },
    acts: {
      act1: {
        title: 'Creative Challenge',
        content: 'Participated in "用心创世界" Heart Printing Package Creative Illustration Contest, seeking "support points for work and life".'
      },
      act2: {
        title: 'Visual Narrative',
        content: 'Created playful illustration exploring the theme of freedom and support in daily life.',
        decisionPoints: ['Emotional resonance', 'Brand alignment', 'Creative storytelling']
      },
      act3: {
        title: 'Community Recognition',
        content: 'Published on Zcool with 66 views and 2 recommendations.',
        impact: '66 Views, 2 Recommendations'
      }
    }
  },
  {
    id: 'p10',
    title: 'Palette of the Dreamer',
    category: 'C-Side',
    platform: 'Digital',
    year: '2023',
    role: 'Character/IP Designer',
    shortDescription: 'Character design for Alibaba Philanthropy Trendy Toy Collection.',
    coverImage: 'https://img.zcool.cn/community/01394f641965960002c440eb2b24e9.jpg',
    gallery: [
      'https://img.zcool.cn/community/01394f641965960002c440eb2b24e9.jpg'
    ],
    tags: ['Character Design', 'IP Design', 'Trendy Toy', 'Digital Art', 'Alibaba'],
    externalLinks: {
      zcool: 'https://www.zcool.com.cn/u/18429743'
    },
    acts: {
      act1: {
        title: 'IP Design Challenge',
        content: 'Participated in Alibaba Philanthropy Trendy Toy Design Collection with the theme "Paint your own imagined world".'
      },
      act2: {
        title: 'Creative Character Development',
        content: 'Designed imaginative character using creative character design principles, exploring dreamlike aesthetics.',
        decisionPoints: ['Unique personality', 'Visual appeal', 'Toy adaptability']
      },
      act3: {
        title: 'Positive Reception',
        content: 'Published on Zcool with 88 views and 1 recommendation.',
        impact: '88 Views, 1 Recommendation'
      }
    }
  },
  {
    id: 'p11',
    title: '"White Elephant Soup Tastes Good"',
    category: 'System',
    platform: 'Print & Digital',
    year: '2022',
    role: 'Poster Designer',
    shortDescription: 'Creative poster design for White Elephant Soup brand.',
    coverImage: 'https://img.zcool.cn/community/01ca1463a42b330002c37bd42ba210.jpg',
    gallery: [
      'https://img.zcool.cn/community/01ca1463a42b330002c37bd42ba210.jpg'
    ],
    tags: ['Poster Design', 'Brand Design', 'Visual Communication', 'Contest'],
    externalLinks: {
      zcool: 'https://www.zcool.com.cn/u/18429743'
    },
    acts: {
      act1: {
        title: 'Brand Poster Challenge',
        content: 'Participated in White Elephant Soup Creative Poster Design Contest, featuring broth companion for late-night work.'
      },
      act2: {
        title: 'Visual Communication',
        content: 'Created engaging poster design highlighting the product\'s value proposition for busy professionals.',
        decisionPoints: ['Clear messaging', 'Visual impact', 'Brand consistency']
      },
      act3: {
        title: 'Top Engagement',
        content: 'Achieved highest engagement among portfolio items with 106 views and 3 recommendations.',
        impact: '106 Views, 3 Recommendations'
      }
    }
  }
];

// ===== PROJECTS - 中文 =====
export const PROJECTS_ZH: Project[] = [
  {
    id: 'p1',
    title: 'Copilot Read Aloud',
    category: 'B-Side',
    platform: 'Web',
    year: '2025',
    role: 'UI/UX 设计师',
    shortDescription: 'Office 文档的实时语音交互。',
    coverImage: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800',
    acts: {
      act1: {
        title: '挑战',
        content: '传统朗读功能只能被动听取，缺乏互动和理解支持。'
      },
      act2: {
        title: '语音优先设计',
        content: '设计实时语音对话，改变文档互动方式。与美国设计团队和北京工程团队协作。',
        decisionPoints: ['实时对话', '无缝集成', '无障碍模式']
      },
      act3: {
        title: '增强理解',
        content: '成功上线 Dogfood 版本。将被动阅读转为主动对话。',
        impact: 'Dogfood 上线'
      }
    }
  },
  {
    id: 'p2',
    title: 'Office AI 内部工具',
    category: 'B-Side',
    platform: 'Web',
    year: '2025',
    role: '主导设计师',
    shortDescription: 'Office AI 团队的仪表盘和指标系统。',
    coverImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    acts: {
      act1: {
        title: '数据复杂性',
        content: '内部团队需要高效工具来跟踪 AI 指标和生成洞察。'
      },
      act2: {
        title: '以用户为中心的 B2B',
        content: '通过深入用户研究设计仪表盘、报告和指标预览。',
        decisionPoints: ['简化可视化', '直观导航', '聚焦可用性']
      },
      act3: {
        title: '高满意度',
        content: '在易用性和操作便捷性方面获得高度积极反馈。',
        impact: '使用量增长30%'
      }
    }
  },
  {
    id: 'p3',
    title: 'NUWA - AIGC 平台',
    category: 'C-Side',
    platform: 'Web',
    year: '2023',
    role: '主导设计师',
    shortDescription: 'AI 驱动的内容生成展示平台。',
    coverImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    acts: {
      act1: {
        title: '新兴技术',
        content: '展示 NUWA 的能力：AI扩图、文字生成图像、图像生成视频。'
      },
      act2: {
        title: '技术卓越',
        content: '结合技术特征和用户需求，实现最优交互和视觉设计。',
        decisionPoints: ['直观的 AIGC 工作流', '引人入胜的视觉', '清晰传达']
      },
      act3: {
        title: '病毒式成功',
        content: '在社交媒体上获得 1万+ 浏览和互动，提升 NUWA 市场影响力。',
        impact: '万级社交互动'
      }
    }
  },
  {
    id: 'p4',
    title: 'ReMe - AI 陪伴',
    category: 'C-Side',
    platform: 'Mobile',
    year: '2023',
    role: 'UI/UX 与品牌主导设计师',
    shortDescription: '帮助阿尔茨海默病患者的 AI 聊天机器人。',
    coverImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800',
    acts: {
      act1: {
        title: '需要共情',
        content: '为患有阿尔茨海默病的老年患者设计需要简洁和情感温暖。'
      },
      act2: {
        title: '以人为本',
        content: '与产品经理和研究员从 0 到 1 协作。构建可扩展 UI 组件库。',
        decisionPoints: ['简洁温暖界面', '简易交互', '情感连接']
      },
      act3: {
        title: '有意义的影响',
        content: '通过 AI 对话改善阿尔茨海默病患者的生活质量。',
        impact: '改善患者生活质量'
      }
    }
  },
  {
    id: 'p5',
    title: 'RD-Agent',
    category: 'B-Side',
    platform: 'Web',
    year: '2024',
    role: 'UI/UX 设计师',
    shortDescription: 'AI 辅助研究员假设生成工具。',
    coverImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
    acts: {
      act1: {
        title: '研究效率',
        content: '研究员需要假设生成工具。旧系统用户体验差。'
      },
      act2: {
        title: '精简平台',
        content: '分析用户旅程并建立全面的设计规范。',
        decisionPoints: ['清晰层级', '提高一致性', '增强生产力']
      },
      act3: {
        title: '更好的工作流',
        content: '显著提高 AI 辅助研究的可用性。',
        impact: '提升生产力'
      }
    }
  },
  {
    id: 'p6',
    title: 'MSRA 25 周年',
    category: 'System',
    platform: 'Print & Digital',
    year: '2023',
    role: '平面设计师',
    shortDescription: '庆祝 25 周年的冰箱贴和条幅。',
    coverImage: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800',
    acts: {
      act1: {
        title: '周年庆典',
        content: '为微软亚洲研究院 25 周年创作纪念品。'
      },
      act2: {
        title: '季节设计',
        content: '融合微软标志与四季大厦景色。沙漏灵感的条幅设计。',
        decisionPoints: ['标志性意象', '有意义的象征', '品牌一致性']
      },
      act3: {
        title: '病毒式流行',
        content: '在社交媒体上获得 3万+ 浏览和 500+ 点赞。',
        impact: '3万+ 社交浏览'
      }
    }
  },
  {
    id: 'p7',
    title: 'Ioete 茶店',
    category: 'C-Side',
    platform: 'Print & Digital',
    year: '2021',
    role: '品牌设计师',
    shortDescription: '米兰茶店的完整品牌识别。',
    coverImage: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&q=80&w=800',
    acts: {
      act1: {
        title: '品牌识别',
        content: '米兰新茶店需要独特品牌来脱颖而出。'
      },
      act2: {
        title: '现代茶文化',
        content: '主导从概念到交付的全流程设计。简洁现代的包装，情感共鸣。',
        decisionPoints: ['极简美学', '文化连接', '可扩展系统']
      },
      act3: {
        title: '至今在用',
        content: '店铺至今仍在使用完整的视觉系统。',
        impact: '持久品牌影响'
      }
    }
  },
  {
    id: 'p8',
    title: '插画作品',
    category: 'C-Side',
    platform: 'Digital',
    year: '2021-2023',
    role: '插画师',
    shortDescription: '商业插画和 IP 角色设计。',
    coverImage: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
    acts: {
      act1: {
        title: '创意表达',
        content: '探索想象力和叙事的个人插画项目。'
      },
      act2: {
        title: '多样风格',
        content: '商业插画、IP 角色和海报设计，为白象等品牌创作。',
        decisionPoints: ['趣味叙事', '品牌合作', '视觉叙事']
      },
      act3: {
        title: '社区参与',
        content: '在站酷发布，获得社区积极反馈。',
        impact: '250+ 浏览量'
      }
    }
  },
  {
    id: 'p9',
    title: '心相印 Jump into Freedom',
    category: 'C-Side',
    platform: 'Digital',
    year: '2023',
    role: '插画师',
    shortDescription: '心相印创意包装设计比赛商业插画作品。',
    coverImage: 'https://img.zcool.cn/community/0114ff642e87130002c37bd4a1f7d4.jpg',
    gallery: [
      'https://img.zcool.cn/community/0114ff642e87130002c37bd4a1f7d4.jpg'
    ],
    tags: ['商业插画', '设计比赛', '视觉叙事', '品牌合作'],
    externalLinks: {
      zcool: 'https://www.zcool.com.cn/u/18429743'
    },
    acts: {
      act1: {
        title: '创意挑战',
        content: '参加"用心创世界"心相印创意包装插画比赛，寻找"工作和生活的支撑点"。'
      },
      act2: {
        title: '视觉叙事',
        content: '创作趣味插画，探索日常生活中的自由与支撑主题。',
        decisionPoints: ['情感共鸣', '品牌契合', '创意叙事']
      },
      act3: {
        title: '社区认可',
        content: '在站酷发布，获得 66 次浏览和 2 次推荐。',
        impact: '66 浏览量，2 次推荐'
      }
    }
  },
  {
    id: 'p10',
    title: '梦想家的调色盘',
    category: 'C-Side',
    platform: 'Digital',
    year: '2023',
    role: '角色/IP 设计师',
    shortDescription: '阿里巴巴公益潮玩设计征集作品。',
    coverImage: 'https://img.zcool.cn/community/01394f641965960002c440eb2b24e9.jpg',
    gallery: [
      'https://img.zcool.cn/community/01394f641965960002c440eb2b24e9.jpg'
    ],
    tags: ['角色设计', 'IP 设计', '潮玩', '数字艺术', '阿里巴巴'],
    externalLinks: {
      zcool: 'https://www.zcool.com.cn/u/18429743'
    },
    acts: {
      act1: {
        title: 'IP 设计挑战',
        content: '参加阿里巴巴公益潮玩设计征集，主题为"描绘自己想象的世界"。'
      },
      act2: {
        title: '创意角色开发',
        content: '运用创意角色设计原则设计富有想象力的角色，探索梦幻美学。',
        decisionPoints: ['独特个性', '视觉吸引力', '玩具适配性']
      },
      act3: {
        title: '积极反响',
        content: '在站酷发布，获得 88 次浏览和 1 次推荐。',
        impact: '88 浏览量，1 次推荐'
      }
    }
  },
  {
    id: 'p11',
    title: '白象汤好喝',
    category: 'System',
    platform: 'Print & Digital',
    year: '2022',
    role: '海报设计师',
    shortDescription: '白象汤品牌创意海报设计。',
    coverImage: 'https://img.zcool.cn/community/01ca1463a42b330002c37bd42ba210.jpg',
    gallery: [
      'https://img.zcool.cn/community/01ca1463a42b330002c37bd42ba210.jpg'
    ],
    tags: ['海报设计', '品牌设计', '视觉传达', '设计比赛'],
    externalLinks: {
      zcool: 'https://www.zcool.com.cn/u/18429743'
    },
    acts: {
      act1: {
        title: '品牌海报挑战',
        content: '参加白象汤创意海报设计比赛，为深夜工作者打造高汤伴侣。'
      },
      act2: {
        title: '视觉传达',
        content: '创作引人入胜的海报设计，突出产品对忙碌专业人士的价值主张。',
        decisionPoints: ['清晰信息', '视觉冲击力', '品牌一致性']
      },
      act3: {
        title: '最高参与度',
        content: '在作品集中获得最高互动，106 次浏览和 3 次推荐。',
        impact: '106 浏览量，3 次推荐'
      }
    }
  }
];

// 保持向后兼容
export const PROJECTS = PROJECTS_EN;

// Walk Through My Frame — Content Data
// All text content is configurable here. Replace placeholders with real assets.

export const WALK_DATA = {
  en: {
    // Chapter 1: Welcome
    welcome: {
      greeting: "Hi, I'm Bella.",
      subtitle: "I'm a UI/UX designer who believes AI is the greatest magic of our time.",
      message: "",
      cta: "Start the Walk →",
    },
    // Chapter 2: AI Garden
    aiGarden: {
      whyAI: "I love AI. I explore how it helps us create,\nunderstand, and connect — in more human ways.",
      explorations: [
        { label: 'AIGC Image Creation', desc: 'From ideas to visuals — exploring AI-generated art and creative expression.' },
        { label: 'AI Editing Experience', desc: 'Smart editing, effortless flow. Rethinking how we refine and perfect.' },
        { label: 'Prompt & Template Thinking', desc: 'Good prompts shape great results. I design systems that make prompting easier.' },
        { label: 'AI Workflow Design', desc: 'Designing human-centered AI workflows that inspire clarity and productivity.' },
        { label: 'Vibe Coding', desc: 'Where code meets vibe. Building with AI to turn ideas into life.' },
      ],
      // Replace with real AIGC artwork paths
      artworks: [
        '/projects/walk-through/aigc-01.png',
        '/projects/walk-through/aigc-02.png',
        '/projects/walk-through/aigc-03.png',
        '/projects/walk-through/aigc-04.png',
      ],
    },
    // Chapter 3: Visual Studio / IP Corner
    visualStudio: {
      intro: "I love visual expression.\nAI helps me refine and bring my IP characters to life.",
      ipStory: "From avatars to banners and stickers, I keep shaping a small world that feels warm, collectible, and full of story.",
      characters: [
        { name: 'Bella Pig', image: '/projects/walk-through/ip-bella-pig.png', desc: 'My main IP character — soft, warm, a little magical' },
        { name: 'Lele Cat', image: '/projects/walk-through/ip-lele-cat.png', desc: 'The curious companion in my universe' },
      ],
      applications: [
        '/projects/walk-through/ip-app-01.png',
        '/projects/walk-through/ip-app-02.png',
        '/projects/walk-through/ip-app-03.png',
      ],
    },
    // Chapter 4: Hobbies
    hobbies: {
      drawing: {
        title: 'Drawing',
        message: "Sketching what I see and feel.",
        images: ['/projects/walk-through/draw-01.png', '/projects/walk-through/draw-02.png', '/projects/walk-through/draw-03.png'],
      },
      reading: {
        title: 'Reading',
        message: "Stories that shape how I think.",
        books: ['"Thinking, Fast and Slow"', '"The Design of Everyday Things"', '"Invisible Cities"', '"Ways of Seeing"'],
      },
      dance: {
        title: 'Dancing',
        message: "Moving to find my own rhythm.",
        style: 'Contemporary & Street Jazz',
      },
      travel: {
        title: 'Travel & Video Editing',
        message: "Collecting moments, crafting memories.",
        places: ['Italy', 'Japan', 'Iceland', 'Thailand'],
        images: ['/projects/walk-through/travel-01.png', '/projects/walk-through/travel-02.png', '/projects/walk-through/travel-03.png'],
      },
    },
    // Chapter 5: Final Frame
    finalFrame: {
      keywords: ['AI Explorer', 'Visual Thinker', 'IP World Builder', 'Curious Maker', 'Life Collector'],
      closing: "",
      cta: {
        portfolio: 'View Selected Works',
        resume: 'Download Resume',
        home: 'Back to Home',
      },
      links: {
        email: 'geliguo.design@gmail.com',
        linkedin: 'https://www.linkedin.com/in/geli-guo-239807164/',
      },
    },
  },
  zh: {
    welcome: {
      greeting: "Hi，我是 Bella。",
      subtitle: "我是一个相信 AI 是这个时代最大魔法的 UI/UX 设计师。",
      message: "",
      cta: "开始这段漫游 →",
    },
    aiGarden: {
      whyAI: "我喜欢 AI。\n我也在探索它如何帮助我们以更人的方式去创造、理解与连接。",
      explorations: [
        { label: 'AIGC 图像创作', desc: '从想法到视觉，探索 AI 生成艺术与创作表达。' },
        { label: 'AI 编辑体验', desc: '更聪明的编辑，更流畅的过程。重新思考精修与打磨。' },
        { label: 'Prompt 与模板思维', desc: '好的提示词会带来好的结果，我也在设计让 prompting 更轻松的系统。' },
        { label: 'AI Workflow 设计', desc: '设计以人为中心的 AI 工作流，让清晰度与效率一起提升。' },
        { label: 'Vibe Coding', desc: '当代码遇见 vibe，用 AI 把想法更快地带到现实里。' },
      ],
      artworks: [
        '/projects/walk-through/aigc-01.png',
        '/projects/walk-through/aigc-02.png',
        '/projects/walk-through/aigc-03.png',
        '/projects/walk-through/aigc-04.png',
      ],
    },
    visualStudio: {
      intro: "我喜欢视觉表达。\nAI 也帮我持续打磨和带活我的 IP 角色。",
      ipStory: "从头像、横幅到贴纸，我一直在搭建一个温暖、可收藏、也有故事感的小宇宙。",
      characters: [
        { name: 'Bella 小猪', image: '/projects/walk-through/ip-bella-pig.png', desc: '我的主 IP 角色 — 柔软、温暖、带点魔法感' },
        { name: '乐乐小猫', image: '/projects/walk-through/ip-lele-cat.png', desc: '宇宙里好奇的小伙伴' },
      ],
      applications: [
        '/projects/walk-through/ip-app-01.png',
        '/projects/walk-through/ip-app-02.png',
        '/projects/walk-through/ip-app-03.png',
      ],
    },
    hobbies: {
      drawing: {
        title: '画画',
        message: "把我看到和感受到的东西画下来。",
        images: ['/projects/walk-through/draw-01.png', '/projects/walk-through/draw-02.png', '/projects/walk-through/draw-03.png'],
      },
      reading: {
        title: '阅读',
        message: "那些塑造我思考方式的故事。",
        books: ['《思考，快与慢》', '《设计心理学》', '《看不见的城市》', '《观看之道》'],
      },
      dance: {
        title: '跳舞',
        message: "在身体里找到属于自己的节奏。",
        style: '现代舞 & 爵士',
      },
      travel: {
        title: '旅行与视频剪辑',
        message: "收集旅途里的片刻，再把它们剪成记忆。",
        places: ['意大利', '日本', '冰岛', '泰国'],
        images: ['/projects/walk-through/travel-01.png', '/projects/walk-through/travel-02.png', '/projects/walk-through/travel-03.png'],
      },
    },
    finalFrame: {
      keywords: ['AI 探索者', '视觉思考者', 'IP 世界搭建者', '好奇的创作者', '生活采样者'],
      closing: '',
      cta: {
        portfolio: '查看精选作品',
        resume: '下载简历',
        home: '返回首页',
      },
      links: {
        email: 'geliguo.design@gmail.com',
        linkedin: 'https://www.linkedin.com/in/geli-guo-239807164/',
      },
    },
  },
};

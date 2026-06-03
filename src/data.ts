import { CareerStage, Project } from './types';

const FIGMA_READ_ALOUD_SLIDES = Array.from(
  { length: 18 },
  (_, index) => `/projects/figma-portfolio/read-aloud/page-${String(index + 1).padStart(2, '0')}.png`
);

const FIGMA_KEETA_SLIDES = Array.from(
  { length: 6 },
  (_, index) => `/projects/figma-portfolio/keeta-user-flow/page-${String(index + 1).padStart(2, '0')}.png`
);

const FIGMA_REME_SLIDES = Array.from(
  { length: 15 },
  (_, index) => `/projects/figma-portfolio/reme-ai-companion/page-${String(index + 1).padStart(2, '0')}.png`
);

const FIGMA_RD_AGENT_SLIDES = Array.from(
  { length: 12 },
  (_, index) => `/projects/figma-portfolio/rd-agent/page-${String(index + 1).padStart(2, '0')}.png`
);

const FIGMA_TASKMATRIX_SLIDES = Array.from(
  { length: 11 },
  (_, index) => `/projects/figma-portfolio/taskmatrix-ai/page-${String(index + 1).padStart(2, '0')}.png`
);

const FIGMA_XIAODU_SLIDES = Array.from(
  { length: 13 },
  (_, index) => `/projects/figma-portfolio/xiaodu-learning-tablet/page-${String(index + 1).padStart(2, '0')}.png`
);

const FIGMA_BAIDU_AI_CLOUD_SLIDES = Array.from(
  { length: 11 },
  (_, index) => `/projects/figma-portfolio/baidu-ai-cloud/page-${String(index + 1).padStart(2, '0')}.png`
);

const FIGMA_HEART_PRINTING_SLIDES = Array.from(
  { length: 7 },
  (_, index) => `/projects/figma-portfolio/heart-printing-packaging/page-${String(index + 1).padStart(2, '0')}.png`
);

const FIGMA_WHITE_ELEPHANT_SLIDES = Array.from(
  { length: 10 },
  (_, index) => `/projects/figma-portfolio/white-elephant-packaging/page-${String(index + 1).padStart(2, '0')}.png`
);

const FIGMA_MSRA_25TH_SLIDES = Array.from(
  { length: 9 },
  (_, index) => `/projects/figma-portfolio/msra-25th-anniversary/page-${String(index + 1).padStart(2, '0')}.png`
);

const FIGMA_VALUE_COMPASS_SLIDES = Array.from(
  { length: 7 },
  (_, index) => `/projects/figma-portfolio/value-compass/page-${String(index + 1).padStart(2, '0')}.png`
);

const FIGMA_IOETE_SLIDES = Array.from(
  { length: 1 },
  (_, index) => `/projects/figma-portfolio/ioete-tea-shop/page-${String(index + 1).padStart(2, '0')}.png`
);

const FIGMA_ILLUSTRATION_SLIDES = Array.from(
  { length: 3 },
  (_, index) => `/projects/figma-portfolio/illustration-works/page-${String(index + 1).padStart(2, '0')}.png`
);

// ===== CAREER TIMELINE - English =====
export const CAREER_TIMELINE_EN: CareerStage[] = [
  {
    id: 'c1',
    period: 'Feb 2025 - Present',
    company: 'Microsoft STCA',
    role: 'UI/UX Designer',
    oneLiner: 'Designing Copilot voice, creator, and education experiences that turn AI into controllable product flows.',
    skills: ['Copilot Voice', 'Generative AI', 'Creator Tools', 'Education UX'],
    image: '/projects/figma-portfolio/read-aloud/page-01.png',
    relatedProjectIds: ['p1']
  },
  {
    id: 'c2',
    period: 'Jun 2022 - Feb 2025',
    company: 'Microsoft Research Asia',
    role: 'UI/UX Designer, Graphic Designer',
    oneLiner: 'Led AI-native product design across research tooling, agents, cognitive companionship, and visual systems.',
    skills: ['AI Agents', 'Research Tooling', 'AIGC UX', 'Visual Systems'],
    image: '/projects/figma-portfolio/rd-agent/page-01.png',
    relatedProjectIds: ['p3', 'p5', 'p13', 'p15', 'p4', 'p6']
  },
  {
    id: 'c3',
    period: 'Aug 2021 - Dec 2021',
    company: 'FOM Studio Milan',
    role: 'Design Intern',
    oneLiner: 'Built brand and packaging systems for real-world retail and energy clients in Milan.',
    skills: ['Brand Identity', 'Packaging', 'Retail Visuals'],
    image: '/projects/figma-portfolio/ioete-tea-shop/page-01.png',
    relatedProjectIds: ['p7']
  },
  {
    id: 'c4',
    period: '2020 - 2021',
    company: 'NABA Milan & Study in Italy',
    role: 'Visual Communication Design',
    oneLiner: "Master's degree in Italy, grounding product thinking in branding, visual systems, and illustration.",
    skills: ['Visual Design', 'Branding', 'User Research', 'Illustration'],
    image: '/projects/figma-portfolio/illustration-works/page-01.png',
    relatedProjectIds: []
  }
];

// ===== CAREER TIMELINE - 中文 =====
export const CAREER_TIMELINE_ZH: CareerStage[] = [
  {
    id: 'c1',
    period: '2025年2月 - 至今',
    company: 'Microsoft STCA',
    role: 'UI/UX 设计师',
    oneLiner: '围绕 Copilot 语音、创作者工具与教育场景，把 AI 能力转化为用户可控的产品流程。',
    skills: ['Copilot Voice', '生成式 AI', '创作者工具', '教育 UX'],
    image: '/projects/figma-portfolio/read-aloud/page-01.png',
    relatedProjectIds: ['p1']
  },
  {
    id: 'c2',
    period: '2022年6月 - 2025年2月',
    company: 'Microsoft Research Asia',
    role: 'UI/UX 设计师, 平面设计师',
    oneLiner: '主导多个 AI-native 产品体验，覆盖研究工具、Agent、认知陪伴与视觉系统。',
    skills: ['AI Agent', '研究工具', 'AIGC UX', '视觉系统'],
    image: '/projects/figma-portfolio/rd-agent/page-01.png',
    relatedProjectIds: ['p3', 'p5', 'p13', 'p15', 'p4', 'p6']
  },
  {
    id: 'c3',
    period: '2021年8月 - 2021年12月',
    company: 'FOM Studio Milan',
    role: '设计实习生',
    oneLiner: '在米兰参与真实商业项目，将品牌识别、包装与线下视觉系统落地。',
    skills: ['品牌识别', '包装设计', '零售视觉'],
    image: '/projects/figma-portfolio/ioete-tea-shop/page-01.png',
    relatedProjectIds: ['p7']
  },
  {
    id: 'c4',
    period: '2020 - 2021',
    company: 'NABA 米兰与意大利留学',
    role: '视觉传达设计',
    oneLiner: '在意大利完成视觉传达硕士训练，以品牌、视觉系统与插画建立设计底盘。',
    skills: ['视觉设计', '品牌设计', '用户研究', '插画'],
    image: '/projects/figma-portfolio/illustration-works/page-01.png',
    relatedProjectIds: []
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
    coverImage: '/projects/figma-portfolio/read-aloud/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_READ_ALOUD_SLIDES,
    },
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
    },
    externalLinks: {
      behance: 'https://www.figma.com/design/1MdXjP52UK8cwvVo6VgzHD/Portfolio?node-id=455-35981&m=dev'
    },
    caseSections: [
      {
        type: 'hero',
        title: 'Interactive ReadAloud with Copilot Voice',
        subtitle: 'Redefining How We Listen',
        bgImage: '/projects/read-aloud/cover-bg-1.png',
        tags: ['Voice UX', 'AI Design', 'Accessibility', 'Conversation Design'],
        role: 'Visual & Interaction Designer',
        date: '2024.08 - 2025.02'
      },
      {
        type: 'stats',
        category: 'PROJECT OVERVIEW',
        label: '01',
        title: 'Background',
        subtitle: 'Microsoft Word Read Aloud',
        content: 'Word Read Aloud has accumulated 10M+ MAU and is an important gateway to document accessibility. However, existing read-aloud is still limited to passive linear playback, unable to meet users\' deep comprehension needs.',
        stats: [
          { value: '10M+', label: 'Monthly Active Users' },
          { value: '78%', label: 'Users want interactive reading' },
          { value: '4.2→4.6', label: 'Satisfaction improvement target' },
          { value: '40%', label: 'Content not fully absorbed' }
        ]
      },
      {
        type: 'personas',
        label: '02',
        title: 'Target Users',
        items: [
          { icon: '\uD83D\uDCBC', title: 'Information Worker', subtitle: 'Knowledge-intensive professional', description: 'Needs to quickly grasp key information from long documents, often multitasking. Wants voice reading to support Q&A for on-demand understanding.', color: '#7B61FF' },
          { icon: '\u270D\uFE0F', title: 'Content Creator', subtitle: 'Writers, editors & reviewers', description: 'Uses read-aloud for proofreading and rhythm checks. Needs pause/question capability to verify content accuracy and flow.', color: '#E97548' }
        ]
      },
      {
        type: 'flow',
        label: '03',
        title: 'Current Experience: Passive \u00B7 Linear \u00B7 One-Way',
        content: 'Before Copilot Voice, the reading experience followed a rigid linear path with no ability to interact or ask questions.',
        steps: [
          { label: 'Open Document' },
          { label: 'Click Play' },
          { label: 'Listen Passively' },
          { label: 'Finish or Stop' }
        ],
        subtitle: 'Passive \u00B7 One-Way \u00B7 Linear',
        image: '/projects/read-aloud/player-ui.png'
      },
      {
        type: 'cards',
        label: '04',
        title: 'Key Pain Points',
        items: [
          { icon: '\uD83D\uDE24', title: 'Cannot Interrupt', description: 'Users cannot pause to ask questions during reading, forced to listen passively.' },
          { icon: '\uD83D\uDE35', title: 'Information Overload', description: 'Long documents cause cognitive fatigue with no way to focus on key sections.' },
          { icon: '\uD83D\uDE10', title: 'No Interaction', description: 'Read-aloud is purely one-way output, lacking any dialogue or feedback mechanism.' },
          { icon: '\uD83E\uDD2C', title: 'Context Loss', description: 'After interruption, users lose their place and must restart from the beginning.' }
        ]
      },
      {
        type: 'principles',
        label: '05',
        title: 'Design Principles',
        items: [
          { number: 1, title: 'Interruptibility', subtitle: 'Pause & Ask Anytime', description: 'Users can naturally interrupt reading at any point to ask questions, with the system seamlessly handling the transition.' },
          { number: 2, title: 'Comprehensibility', subtitle: 'Understand, Not Just Hear', description: 'Voice interaction helps users truly understand content through Q&A, summaries, and contextual explanations.' },
          { number: 3, title: 'Resumability', subtitle: 'Never Lose Your Place', description: 'After any interruption or Q&A session, reading automatically resumes from the exact position.' }
        ]
      },
      {
        type: 'two-column',
        label: '06',
        title: 'Design Goals & Strategy',
        subtitle: 'Balancing product innovation with visual system consistency across Word\'s existing design language.',
        columns: [
          { title: 'Product Strategy', items: ['Transform passive reading into active dialogue', 'Support natural language questions during playback', 'Provide intelligent summaries on demand', 'Seamless mode switching between reading modes'] },
          { title: 'Visual Strategy', items: ['Integrate with Rocksteady design system tokens', 'Maintain Word UI consistency and familiarity', 'Design clear voice state indicators', 'Create intuitive mode toggle patterns'] }
        ]
      },
      {
        type: 'editorial-board',
        category: 'DESIGN STRATEGY',
        title: 'From Passive Playback to Active Dialogue',
        subtitle: 'Complete interaction framework showing the transformation of the reading experience',
        image: '/projects/read-aloud/cover-bg-2.png',
        layout: 'contained',
        maxWidth: '1200px',
        caption: 'Strategy overview board — preserved from original portfolio presentation.'
      },
      {
        type: 'voice-states',
        category: 'DESIGN SYSTEM',
        label: '07',
        title: 'Design System',
        subtitle: 'Rocksteady Token Integration',
        content: 'Five distinct voice states provide clear feedback throughout the interaction, each with unique visual indicators following the Rocksteady design system.',
        items: [
          { title: 'Working', color: '#6B7280', description: 'System initializing' },
          { title: 'Speaking', color: '#2DA562', description: 'Reading aloud' },
          { title: 'Waiting', color: '#E97548', description: 'Ready for input' },
          { title: 'Thinking', color: '#8B5CF6', description: 'Processing query' },
          { title: 'Listening', color: '#E97548', description: 'Capturing voice' }
        ]
      },
      {
        type: 'annotated-mockup',
        category: 'DESIGN RATIONALE',
        title: 'Copilot Voice in Word',
        subtitle: 'Interactive voice companion embedded within the familiar Word reading experience',
        image: '/projects/read-aloud/word-mockup-1.png',
        annotations: [
          { y: 8, label: 'Word Ribbon', detail: 'Familiar Office toolbar context', side: 'left' },
          { y: 22, label: 'Copilot Voice Panel', detail: 'Persistent toolbar with voice state', side: 'right', color: '#2DA562' },
          { y: 38, label: 'Reading Highlight', detail: 'Synchronized text tracking', side: 'left', color: '#7B61FF' },
          { y: 55, label: 'Voice Waveform', detail: 'Real-time audio visualization', side: 'right', color: '#E97548' },
          { y: 68, label: 'Suggestion Pills', detail: '"You Can Say..." prompts', side: 'left' },
          { y: 82, label: 'Playback Controls', detail: 'Play / Pause / Speed / Mode', side: 'right' },
          { y: 93, label: 'Mic Button', detail: 'One-tap voice activation', side: 'left', color: '#E97548' }
        ]
      },
      {
        type: 'annotated-mockup',
        category: 'DESIGN RATIONALE',
        label: '08',
        title: 'From Suggestions to Voice States: Elevating the Visual Entry for Active Interaction',
        subtitle: 'This design effectively guides users to speak up, improving the discoverability and usage of voice entry points.',
        image: '/projects/read-aloud/word-mockup-2.png',
        annotations: [
          { y: 18, label: 'Dynamic Waveform', detail: 'Visual cue draws attention', side: 'right', color: '#2DA562' },
          { y: 35, label: 'Guided Prompt', detail: '"You Can Say..." suggestion', side: 'left' },
          { y: 52, label: 'Suggestion Chips', detail: 'Tappable example questions', side: 'right' },
          { y: 70, label: 'Mode Toggle', detail: 'Document / Summary switch', side: 'left', color: '#8B5CF6' },
          { y: 85, label: 'Mic Activation', detail: 'Primary voice entry point', side: 'right', color: '#E97548' }
        ]
      },
      {
        type: 'annotated-mockup',
        category: 'DESIGN RATIONALE',
        label: '09',
        title: 'From Playback Control to Customization: Building Tempo Ownership for Voice Reading',
        subtitle: 'Flexible model switching entry points help users control reading density and voice reading experience.',
        image: '/projects/read-aloud/word-mockup-1.png',
        annotations: [
          { y: 15, label: 'Reading Goal', detail: 'User determines current objective', side: 'left' },
          { y: 32, label: 'Full Document Mode', detail: 'Complete original text playback', side: 'right' },
          { y: 50, label: 'Summary Mode', detail: 'AI-condensed quick focus', side: 'left', color: '#8B5CF6' },
          { y: 68, label: 'Model Selection', detail: 'Choose appropriate voice model', side: 'right' },
          { y: 85, label: 'Interactive Expectation', detail: 'From passive listening to active engagement', side: 'left', color: '#2DA562' }
        ]
      },
      {
        type: 'annotated-mockup',
        category: 'DESIGN RATIONALE',
        title: 'Summary Reading with AI-Generated Summaries',
        subtitle: 'Copilot Voice generates and reads document summaries, transforming long documents into digestible audio content',
        image: '/projects/read-aloud/word-mockup-2.png',
        annotations: [
          { y: 20, label: 'Summary Panel', detail: 'AI-generated content overview', side: 'right', color: '#8B5CF6' },
          { y: 40, label: 'Key Points', detail: 'Extracted main arguments', side: 'left' },
          { y: 60, label: 'Voice Reading', detail: 'Natural TTS of summary', side: 'right', color: '#2DA562' },
          { y: 80, label: 'Full Doc Toggle', detail: 'Switch back to original text', side: 'left' }
        ]
      },
      {
        type: 'interaction-path',
        category: 'DESIGN FOUNDATION',
        label: '10',
        title: 'From Pain Points to Breakthrough: Building ReadAloud\'s New Interaction Path',
        subtitle: 'Users don\'t just need to "hear documents" \u2014 they need to "understand content". Understanding depends on active participation and real-time feedback.',
        steps: [
          { label: '\uD83C\uDFA7 Listen' },
          { label: '\u2753 Ask / Answer' },
          { label: '\uD83D\uDD01 Resume' }
        ],
        rows: [
          { action: 'Click Read Aloud', feedback: 'Launch Copilot Voice toolbar, begin reading', value: 'Immersive reading, improved focus' },
          { action: 'Switch mode (Original / Summary)', feedback: 'UI shows current reading mode, content switches in real-time', value: 'Choose info density per task' },
          { action: 'Click microphone to ask', feedback: 'Pause playback, recognize speech, deliver voice answer', value: 'Get explanations or summaries needed' },
          { action: 'Resume playback', feedback: 'System prompts "Continue Reading", auto/manual resume', value: 'Maintain continuity, return to task flow' }
        ],
        content: 'In questioning scenarios, users can ask any natural language question: "What is the key argument?" "What does this mean?" "Can you simplify this?"'
      },
      {
        type: 'state-flow',
        category: 'DESIGN RATIONALE',
        label: '11',
        title: 'From Playback to Question to Resumption: The Rhythm of Conversational Reading',
        content: 'Before Copilot Voice, Word\'s ReadAloud was a passive listen-only feature. Here is the new conversational flow:',
        items: [
          { title: 'Speaking', color: '#2DA562', description: 'Reading document aloud' },
          { title: 'Mic Activated', color: '#E97548', description: 'User clicks mic button' },
          { title: 'Listening', color: '#E97548', description: 'Capturing voice input' },
          { title: 'Thinking', color: '#8B5CF6', description: 'Processing via Copilot' },
          { title: 'Answering', color: '#2DA562', description: 'Speaking the response' },
          { title: 'Auto Resume', color: '#2DA562', description: 'Returns to reading' }
        ]
      },
      {
        type: 'validation',
        category: 'DESIGN VALIDATION',
        label: '12',
        title: 'From Usage Growth to Behavior Change: Validating the Real Value of Voice Experience',
        subtitle: 'Multi-dimensional user behavior data covering usage frequency, feature engagement, and user sentiment changes.',
        stats: [
          { value: '+37%', label: 'Overall Utilization Rate' },
          { value: '+92%', label: 'Mic Usage Rate Growth' },
          { value: '62%', label: 'Active Questioning Users' }
        ],
        quotes: [
          { avatar: '\uD83D\uDE0A', text: 'It lets me think while doing other things. This approach makes me more engaged with the document content.' },
          { avatar: '\uD83E\uDD29', text: 'This is the first time a reading tool can "talk back to me." It has truly changed how I use Word.' },
          { avatar: '\uD83D\uDE42', text: 'Processing long documents is so much easier now. Copilot is like having a thoughtful voice assistant.' },
          { avatar: '\uD83D\uDE04', text: 'We can pause and ask questions anytime, then continue listening. It feels as natural as having a conversation.' }
        ],
        content: 'User satisfaction score rose from 3.4 (Read Aloud) to 4.6 (Copilot Voice).'
      },
      {
        type: 'text',
        category: 'DESIGN VALIDATION',
        label: '13',
        title: 'From Collaboration to Leadership: My Role Value in Copilot Voice',
        content: 'As the sole visual and interaction design representative in the Beijing region, I drove multiple key milestones from requirements to final delivery throughout the entire project cycle.',
        image: '/projects/read-aloud/megaphone-3d.png',
        secondaryImage: '/projects/read-aloud/emoji-hearts.png'
      },
      {
        type: 'outcomes',
        label: '14',
        title: 'Results & Impact',
        subtitle: 'Successfully launched Dogfood version, transforming passive reading into active dialogue.',
        content: 'Dogfood Launch \u00B7 10M+ MAU',
        image: '/projects/read-aloud/cover-bg-2.png',
        items: [
          { title: 'Product Delivery', description: 'Voice interruption, mode switching, and natural voice feedback system shipped in Dogfood' },
          { title: 'Visual Consistency', description: 'Full Rocksteady design system integration with Word UI token compliance' },
          { title: 'Interaction Model', description: '5 voice states with seamless transitions' },
          { title: 'Scalability', description: 'Extensible architecture ready for podcast, accessibility, and future voice capabilities' }
        ]
      }
    ]
  },
  {
    id: 'p2',
    title: 'Keeta User Flow Analysis & Design Optimization',
    category: 'B-Side',
    platform: 'Mobile',
    year: '2025',
    role: 'UI/UX Designer',
    shortDescription: 'User-flow analysis and design optimization from store page to order submission.',
    coverImage: '/projects/figma-portfolio/keeta-user-flow/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_KEETA_SLIDES,
    },
    tags: ['User Flow', 'Mobile UX', 'Design Optimization', 'Figma'],
    acts: {
      act1: {
        title: 'Flow Analysis',
        content: 'Mapped the original journey from store discovery to order submission.'
      },
      act2: {
        title: 'Design Optimization',
        content: 'Organized the project as a Figma-exported reader to preserve the original case pages.',
        decisionPoints: ['Original page order', 'Source-design fidelity', 'Responsive viewing']
      },
      act3: {
        title: 'Reader Delivery',
        content: 'Displayed the final Chinese Figma pages without rebuilding the design in HTML.',
        impact: '6 Source Pages'
      }
    }
  },
  {
    id: 'p3',
    title: 'NUWA Series',
    category: 'C-Side',
    platform: 'Web',
    year: '2022-2023',
    role: 'Interaction Designer / Web Experience Designer',
    shortDescription: 'A series case study on translating early generative AI research into familiar, explorable, and controllable interactions.',
    coverImage: '/projects/nuwa-infinity/live-preview.png',
    tags: ['Early AI UX', 'NUWA Series', 'Multimodal AI', 'Interaction Translation', 'Generative AI', 'Microsoft Research'],
    externalLinks: {
      live: 'https://nuwa-infinity.microsoft.com/#/',
      github: 'https://github.com/microsoft/NUWA/blob/main/NUWAInfinity.md'
    },
    caseSections: [
      {
        type: 'hero',
        variant: 'series',
        title: 'NUWA Series — Designing Interaction Patterns for Early Generative AI',
        subtitle: 'Across NUWA-Infinity, NUWA XL, and DragNUWA, I designed the bridge between unfamiliar AI capabilities and familiar human interactions: spatial exploration, temporal understanding, and directable motion.',
        bgImage: '/projects/nuwa-infinity/live-preview.png',
        tags: ['Early AI Interaction', 'Emerging Technology UX', 'Research Demo Experience', 'Microsoft Research'],
        role: 'Interaction Designer / Web Experience Designer',
        date: '2022-2023'
      },
      {
        type: 'stats',
        category: 'PROJECT CONTEXT',
        label: '01',
        title: 'The design problem was not visual polish. It was interaction literacy.',
        subtitle: 'These were early multimodal AI research demos, created before today’s generative AI interaction patterns became familiar.',
        content: 'The core challenge was turning abstract model capabilities into experiences that non-technical visitors could understand through action: type, select, drag, expand, preview, compare, and continue exploring.',
        stats: [
          { value: '01', label: 'NUWA-Infinity: spatial exploration' },
          { value: '02', label: 'NUWA XL: temporal continuity' },
          { value: '03', label: 'DragNUWA: directable motion' },
          { value: '0→1', label: 'Interaction logic defined before mature AI UX patterns' }
        ]
      },
      {
        type: 'series-timeline',
        category: 'SERIES EVOLUTION',
        label: '02',
        title: 'Three projects, one interaction language',
        subtitle: 'The series evolved from helping users understand what AI can generate, to how generation extends across time, to how users can directly control motion.',
        content: 'This framing keeps NUWA-Infinity as the origin of the case study while showing how the interaction problem became more precise across the series.',
        items: [
          {
            number: '01',
            title: 'NUWA-Infinity',
            subtitle: 'Spatial exploration',
            description: 'How can users understand infinite visual synthesis when outpainting and arbitrary-size generation are not familiar product concepts?'
          },
          {
            number: '02',
            title: 'NUWA XL',
            subtitle: 'Temporal continuity',
            description: 'How can a long video generation model be explained as a structure over time, not only as a final generated result?'
          },
          {
            number: '03',
            title: 'DragNUWA',
            subtitle: 'Directable motion',
            description: 'How can users move beyond prompt descriptions and directly show where an object or camera should move?'
          }
        ]
      },
      {
        type: 'cards',
        category: 'DESIGN PRINCIPLES',
        label: '03',
        title: 'Principles for making early AI capabilities tangible',
        content: 'The playful layer was never decoration. It was a way to make unfamiliar AI capabilities feel approachable, explorable, and controllable.',
        items: [
          {
            title: 'Familiar first, magical second',
            description: 'Use known behaviors such as typing, dragging, expanding, previewing, and comparing as the entry point before revealing the surprising AI capability.'
          },
          {
            title: 'Explain through interaction',
            description: 'Let users learn the model by manipulating examples and seeing results, rather than depending on research terminology or long documentation.'
          },
          {
            title: 'Make capability visible',
            description: 'Represent space, time, and motion through interface structures that can be seen and manipulated.'
          },
          {
            title: 'Give users a sense of control',
            description: 'Use clear steps, previews, before/after relationships, and continuation paths so generation feels less like a black box.'
          }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: 'CHAPTER 01 / NUWA-INFINITY',
        label: '04',
        title: 'From unknown AI capability to spatial exploration',
        subtitle: 'NUWA-Infinity made infinite visual synthesis understandable by turning abstract generation into a familiar spatial experience.',
        content: 'The design challenge was not to make a fancy website. It was to let users feel what the model could do through familiar interactions: entering a prompt, seeing a generated visual world, expanding beyond the frame, and continuing to explore.',
        demoUrl: 'https://nuwa-infinity.microsoft.com/#/',
        fallbackImage: '/projects/nuwa-infinity/live-preview.png',
        fallbackAlt: 'NUWA-Infinity website preview showing a generated visual gallery.',
        buttonLabel: 'Open live demo',
        caption: 'Interactive evidence: desktop readers can try the original NUWA-Infinity page inside the case study; mobile readers see a preview with an external launch path.',
        items: [
          {
            number: '1',
            title: 'Users did not know how to start an AI generation task',
            subtitle: 'Design question',
            description: 'A research demo could not assume that visitors already knew prompting, outpainting, or arbitrary-size generation workflows.'
          },
          {
            number: '2',
            title: 'I used familiar creative actions as the control layer',
            subtitle: 'Interaction decision',
            description: 'Typing, selecting examples, expanding a visual boundary, and previewing results became the user-facing language for the model.'
          },
          {
            number: '3',
            title: 'The demo shows generation as an expandable visual world',
            subtitle: 'Interaction evidence',
            description: 'The embedded page makes the model observable through the gallery, navigation, generated examples, and exploration flow.'
          },
          {
            number: '4',
            title: 'The AI capability became approachable and controllable',
            subtitle: 'Design value',
            description: 'The playful interaction helped users understand the model by acting inside the experience, not by reading a technical explanation first.'
          }
        ],
        rows: [
          {
            action: 'Prompt',
            feedback: 'Start from language',
            value: 'Text-to-image becomes a familiar creative brief rather than a technical command.'
          },
          {
            action: 'Expand',
            feedback: 'Continue beyond the frame',
            value: 'Outpainting becomes a spatial action users already understand from canvases and editors.'
          },
          {
            action: 'Explore',
            feedback: 'Preview and compare results',
            value: 'Uncertainty becomes an invitation to keep testing the model.'
          }
        ]
      },
      {
        type: 'evidence',
        variant: 'xl',
        category: 'CHAPTER 02 / NUWA XL',
        label: '05',
        title: 'From spatial expansion to temporal continuity',
        subtitle: 'NUWA XL shifted the design problem from “what can AI generate?” to “how can a long generated video be understood over time?”',
        content: 'A long video model is hard to understand if the interface only shows a final result. I framed the capability around a filmstrip and timeline logic: sparse keyframes, coarse-to-fine filling, and visible temporal structure.',
        demoUrl: 'https://msra-nuwa.azurewebsites.net/#/NUWAXL',
        fallbackImage: '/projects/nuwa-series/nuwa-xl-preview.png',
        fallbackAlt: 'NUWA XL page preview showing a long video generation demo.',
        buttonLabel: 'Open NUWA XL page',
        caption: 'Visual evidence: the timeline and filmstrip treatment ties the design explanation to NUWA XL’s long-video generation theme.',
        items: [
          {
            number: '1',
            title: 'A final video alone does not explain the model difference',
            subtitle: 'Design question',
            description: 'Users needed a way to understand long-duration generation as a temporal process, not just an impressive output.'
          },
          {
            number: '2',
            title: 'I used timeline and filmstrip mental models',
            subtitle: 'Interaction decision',
            description: 'Keyframes, progress, and frame sequences made the coarse-to-fine process easier to follow.'
          },
          {
            number: '3',
            title: 'The evidence connects video structure to generation logic',
            subtitle: 'Interaction evidence',
            description: 'The visual module shows sparse-to-dense frames and a progress spine instead of dropping a disconnected screenshot into the page.'
          },
          {
            number: '4',
            title: 'Long video generation became readable',
            subtitle: 'Design value',
            description: 'The model capability becomes a time-based structure viewers can scan, preview, and reason about.'
          }
        ],
        rows: [
          {
            action: 'Keyframes',
            feedback: 'Story spine',
            value: 'A sparse frame sequence gives users a first mental model for the generated timeline.'
          },
          {
            action: 'Coarse-to-fine',
            feedback: 'Progressive fill',
            value: 'Intermediate frames become understandable as the model completing temporal gaps.'
          },
          {
            action: 'Long timeline',
            feedback: 'Scannable duration',
            value: 'The scale of long video generation becomes visible without relying only on technical claims.'
          }
        ]
      },
      {
        type: 'evidence',
        variant: 'drag',
        category: 'CHAPTER 03 / DragNUWA',
        label: '06',
        title: 'From prompt description to direct motion control',
        subtitle: 'DragNUWA advanced the interaction from describing what users want to directly showing how things should move.',
        content: 'Prompting can express semantic intent, but it is weak at specifying motion direction, path, and rhythm. I framed trajectory as a direct manipulation layer that combines text, image, and path control.',
        demoUrl: 'https://www.microsoft.com/en-us/research/project/dragnuwa/',
        fallbackImage: '/projects/nuwa-series/dragnuwa-preview.png',
        fallbackAlt: 'DragNUWA Microsoft Research page preview.',
        buttonLabel: 'Open DragNUWA page',
        caption: 'Visual evidence: trajectory overlays make the control model explicit without pretending the portfolio can modify the original research page.',
        items: [
          {
            number: '1',
            title: 'Prompts are not precise enough for motion',
            subtitle: 'Design question',
            description: 'Text can describe a scene, but users often need to specify where an object or camera should move.'
          },
          {
            number: '2',
            title: 'I used trajectory as a direct control language',
            subtitle: 'Interaction decision',
            description: 'Dragging a path on the image turns motion intent into a spatial and temporal instruction.'
          },
          {
            number: '3',
            title: 'The interface binds text, image, and trajectory',
            subtitle: 'Interaction evidence',
            description: 'The visual layer shows the three control factors together, so the reader can understand how motion control differs from ordinary prompting.'
          },
          {
            number: '4',
            title: 'Users can show motion instead of translating it into language',
            subtitle: 'Design value',
            description: 'The model becomes more controllable because the interface accepts a familiar human action: drawing the path you want.'
          }
        ],
        rows: [
          {
            action: 'Text',
            feedback: 'Semantic intent',
            value: 'The prompt describes what the generated video should be about.'
          },
          {
            action: 'Image',
            feedback: 'Spatial anchor',
            value: 'The still image defines the scene and object context.'
          },
          {
            action: 'Trajectory',
            feedback: 'Motion direction',
            value: 'The drag path translates human intent into controllable camera or object motion.'
          }
        ]
      },
      {
        type: 'interaction-mapping',
        category: 'INTERACTION TRANSLATION FRAMEWORK',
        label: '07',
        title: 'A shared framework across the NUWA series',
        subtitle: 'Each project translated a technical capability into a familiar mental model and a concrete interaction pattern.',
        rows: [
          {
            action: 'NUWA-Infinity',
            feedback: 'Canvas, maps, image editors',
            value: 'Infinite visual synthesis became spatial exploration: prompt, expand, preview, continue.'
          },
          {
            action: 'NUWA XL',
            feedback: 'Filmstrip, timeline, keyframes',
            value: 'Long video generation became temporal structure: sparse keyframes, progressive filling, scannable duration.'
          },
          {
            action: 'DragNUWA',
            feedback: 'Dragging, drawing paths, motion arrows',
            value: 'Controllable video generation became direct manipulation: text plus image plus trajectory.'
          },
          {
            action: 'Series value',
            feedback: 'Interaction as explanation',
            value: 'The research demos became easier to understand because every technical idea was tied to an action users already knew.'
          }
        ]
      },
      {
        type: 'outcomes',
        category: 'DESIGN VALUE',
        label: '08',
        title: 'What this series shows about my interaction design approach',
        subtitle: 'The strongest design contribution was not making the pages look futuristic. It was making unfamiliar AI capabilities tangible.',
        content: 'I designed the bridge between unfamiliar AI capabilities and familiar human interactions.',
        items: [
          {
            title: 'Emerging technology UX',
            description: 'I designed interaction logic before mature AI product patterns existed.'
          },
          {
            title: 'Interaction translation',
            description: 'I translated model capabilities into spatial, temporal, and motion-control mental models.'
          },
          {
            title: 'Purposeful play',
            description: 'I used playful interactions to reduce intimidation and invite exploration, not as visual decoration.'
          },
          {
            title: 'Qualitative design impact',
            description: 'The series reduced reliance on technical explanation and helped viewers understand research demos through direct evidence.'
          }
        ]
      }
    ],
    acts: {
      act1: {
        title: 'NUWA Series Evolution',
        content: 'Organized NUWA-Infinity, NUWA XL, and DragNUWA as a progression of early generative AI interaction problems.'
      },
      act2: {
        title: 'Interaction Translation',
        content: 'Translated spatial generation, long-video generation, and motion control into familiar mental models.',
        decisionPoints: ['Spatial exploration', 'Temporal continuity', 'Directable motion']
      },
      act3: {
        title: 'Understandable Research Demos',
        content: 'Connected text, visuals, and interactive evidence so hiring readers can see the design reasoning behind each demo.',
        impact: 'AI Interaction Language'
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
    coverImage: '/projects/figma-portfolio/reme-ai-companion/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_REME_SLIDES,
    },
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
    coverImage: '/projects/figma-portfolio/rd-agent/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_RD_AGENT_SLIDES,
    },
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
    coverImage: '/projects/figma-portfolio/msra-25th-anniversary/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_MSRA_25TH_SLIDES,
    },
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
    coverImage: '/projects/figma-portfolio/ioete-tea-shop/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_IOETE_SLIDES,
    },
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
    coverImage: '/projects/figma-portfolio/illustration-works/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_ILLUSTRATION_SLIDES,
    },
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
    title: '"心相印" Packaging Design',
    category: 'C-Side',
    platform: 'Digital',
    year: '2023',
    role: 'Packaging Designer',
    shortDescription: 'Source Figma pages for the Heart Printing packaging design project.',
    coverImage: '/projects/figma-portfolio/heart-printing-packaging/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_HEART_PRINTING_SLIDES,
    },
    gallery: FIGMA_HEART_PRINTING_SLIDES,
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
    coverImage: '/project-covers/palette-of-the-dreamer.svg',
    gallery: [
      '/project-covers/palette-of-the-dreamer.svg'
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
    coverImage: '/project-covers/white-elephant-soup-tastes-good.png',
    coverDisplay: 'contain',
    coverAspectRatio: 1814 / 1304,
    slideSets: {
      zh: FIGMA_WHITE_ELEPHANT_SLIDES,
    },
    gallery: FIGMA_WHITE_ELEPHANT_SLIDES,
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
  },
  {
    id: 'p12',
    title: 'Baidu AI Cloud Knowledge Platform Visual Upgrade',
    category: 'B-Side',
    platform: 'Web',
    year: '2024',
    role: 'UI/UX Designer',
    shortDescription: 'Source Figma pages for the Baidu AI Cloud knowledge platform visual upgrade.',
    coverImage: '/projects/figma-portfolio/baidu-ai-cloud/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_BAIDU_AI_CLOUD_SLIDES,
    },
    gallery: FIGMA_BAIDU_AI_CLOUD_SLIDES,
    tags: ['B2B Platform', 'Visual Upgrade', 'Knowledge Platform', 'Figma'],
    acts: {
      act1: {
        title: 'Platform Context',
        content: 'Organized the visual upgrade case as exported source pages from Figma.'
      },
      act2: {
        title: 'Source-Design Reader',
        content: 'The website preserves the original Figma pages as high-resolution images.',
        decisionPoints: ['Original ordering', 'No HTML reconstruction', 'Responsive reader']
      },
      act3: {
        title: 'Reader Delivery',
        content: 'Displayed the final Chinese design pages in the Works reader.',
        impact: '11 Source Pages'
      }
    }
  },
  {
    id: 'p13',
    title: 'TaskMatrix.AI Storytelling Agent',
    category: 'B-Side',
    platform: 'Web',
    year: '2023',
    role: 'UI/UX Designer',
    shortDescription: 'Source Figma pages for TaskMatrix.AI storytelling agent and AI workflow design.',
    coverImage: '/projects/figma-portfolio/taskmatrix-ai/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_TASKMATRIX_SLIDES,
    },
    gallery: FIGMA_TASKMATRIX_SLIDES,
    tags: ['AI Agent', 'Workflow Design', 'B2B Platform', 'Figma'],
    acts: {
      act1: {
        title: 'Agent Workflow',
        content: 'TaskMatrix.AI needed a clear way to explain agent-driven storytelling and task orchestration.'
      },
      act2: {
        title: 'Source-Design Reader',
        content: 'Preserved the original Figma pages as a high-resolution case reader.',
        decisionPoints: ['Original ordering', 'AI workflow clarity', 'Responsive reader']
      },
      act3: {
        title: 'Reader Delivery',
        content: 'Displayed the complete exported design story in the Works reader.',
        impact: '11 Source Pages'
      }
    }
  },
  {
    id: 'p14',
    title: 'Xiaodu Learning Tablet Homepage Redesign',
    category: 'C-Side',
    platform: 'Digital',
    year: '2024',
    role: 'UI/UX Designer',
    shortDescription: 'Learning tablet homepage redesign focused on hierarchy, study rhythm, and AI entry points.',
    coverImage: '/projects/figma-portfolio/xiaodu-learning-tablet/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_XIAODU_SLIDES,
    },
    gallery: FIGMA_XIAODU_SLIDES,
    tags: ['Homepage Redesign', 'Education UX', 'AI Entry', 'Figma'],
    acts: {
      act1: {
        title: 'Homepage Complexity',
        content: 'The learning tablet homepage needed stronger hierarchy for study content, product features, and AI capabilities.'
      },
      act2: {
        title: 'Structured Redesign',
        content: 'Organized the redesign case as exported Figma pages to keep the original presentation intact.',
        decisionPoints: ['Information hierarchy', 'Study rhythm', 'AI entry points']
      },
      act3: {
        title: 'Reader Delivery',
        content: 'Displayed the full homepage redesign flow in the Works reader.',
        impact: '13 Source Pages'
      }
    }
  },
  {
    id: 'p15',
    title: 'Value Compass',
    category: 'B-Side',
    platform: 'Web',
    year: '2024',
    role: 'UI/UX Designer',
    shortDescription: 'AI value-alignment research interface and visual system.',
    coverImage: '/projects/figma-portfolio/value-compass/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_VALUE_COMPASS_SLIDES,
    },
    gallery: FIGMA_VALUE_COMPASS_SLIDES,
    tags: ['AI Research', 'Value Alignment', 'Visual System', 'Figma'],
    acts: {
      act1: {
        title: 'Research Communication',
        content: 'The project needed a concise visual system for communicating AI value-alignment research.'
      },
      act2: {
        title: 'Interface & System',
        content: 'Exported the source pages from Figma to preserve the research narrative and visual direction.',
        decisionPoints: ['Research clarity', 'Interface structure', 'Visual consistency']
      },
      act3: {
        title: 'Reader Delivery',
        content: 'Displayed the complete Figma case pages as a high-resolution reader.',
        impact: '7 Source Pages'
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
    coverImage: '/projects/figma-portfolio/read-aloud/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_READ_ALOUD_SLIDES,
    },
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
    },
    externalLinks: {
      behance: 'https://www.figma.com/design/1MdXjP52UK8cwvVo6VgzHD/Portfolio?node-id=455-35981&m=dev'
    },
    caseSections: [
      {
        type: 'hero',
        title: 'Interactive ReadAloud with Copilot Voice',
        subtitle: '重新定义我们的聆听方式',
        bgImage: '/projects/read-aloud/cover-bg-1.png',
        tags: ['Voice UX', 'AI Design', 'Accessibility', 'Conversation Design'],
        role: '视觉与交互设计师',
        date: '2024.08 - 2025.02'
      },
      {
        type: 'stats',
        category: 'PROJECT OVERVIEW',
        label: '01',
        title: '背景',
        subtitle: 'Microsoft Word Read Aloud',
        content: 'Word Read Aloud 已积累超过 1000万 MAU，是文档无障碍访问的重要入口。然而，现有的朗读仍局限于被动线性播放，无法满足用户深度理解的需求。',
        stats: [
          { value: '1000万+', label: '月活跃用户' },
          { value: '78%', label: '用户希望交互式阅读' },
          { value: '4.2→4.6', label: '满意度提升目标' },
          { value: '40%', label: '内容未被充分吸收' }
        ]
      },
      {
        type: 'personas',
        label: '02',
        title: '目标用户',
        items: [
          { icon: '💼', title: '信息工作者', subtitle: '知识密集型专业人士', description: '需要从长文档中快速掌握关键信息，常常多任务进行。希望语音阅读支持问答，按需理解。', color: '#7B61FF' },
          { icon: '✍️', title: '内容创作者', subtitle: '作家、编辑与审阅者', description: '使用朗读进行校对和节奏检查。需要暂停/提问能力来验证内容准确性和流畅度。', color: '#E97548' }
        ]
      },
      {
        type: 'flow',
        label: '03',
        title: '当前体验：被动 · 单向 · 线性',
        content: '在 Copilot Voice 之前，阅读体验遵循严格的线性路径，无法交互或提问。',
        steps: [
          { label: '打开文档' },
          { label: '点击播放' },
          { label: '被动听取' },
          { label: '结束或停止' }
        ],
        subtitle: '被动 · 单向 · 线性',
        image: '/projects/read-aloud/player-ui.png'
      },
      {
        type: 'cards',
        label: '04',
        title: '核心痛点',
        items: [
          { icon: '😤', title: '无法中断', description: '用户在阅读过程中无法暂停提问，只能被动听取。' },
          { icon: '😵', title: '信息过载', description: '长文档导致认知疲劳，无法聚焦关键段落。' },
          { icon: '😐', title: '无交互', description: '朗读是纯粹的单向输出，缺乏任何对话或反馈机制。' },
          { icon: '🤬', title: '上下文丢失', description: '中断后用户会丢失位置，必须从头开始。' }
        ]
      },
      {
        type: 'principles',
        label: '05',
        title: '设计原则',
        items: [
          { number: 1, title: '可中断性', subtitle: '随时暂停与提问', description: '用户可以在任何时刻自然地中断阅读提问，系统无缝处理过渡。' },
          { number: 2, title: '可理解性', subtitle: '理解，而不仅仅是听', description: '语音交互通过问答、摘要和上下文解释帮助用户真正理解内容。' },
          { number: 3, title: '可回溯性', subtitle: '永不丢失位置', description: '任何中断或问答后，阅读自动从精确位置恢复。' }
        ]
      },
      {
        type: 'two-column',
        label: '06',
        title: '设计目标与策略',
        subtitle: '在产品创新与 Word 现有设计语言的视觉系统一致性之间取得平衡。',
        columns: [
          { title: '产品策略', items: ['将被动阅读转化为主动对话', '支持播放过程中的自然语言提问', '按需提供智能摘要', '阅读模式间无缝切换'] },
          { title: '视觉策略', items: ['集成 Rocksteady 设计系统 token', '保持 Word UI 一致性和熟悉感', '设计清晰的语音状态指示器', '创建直觉的模式切换模式'] }
        ]
      },
      {
        type: 'editorial-board',
        category: 'DESIGN STRATEGY',
        title: '从被动播放到主动对话',
        subtitle: '完整的交互框架展示阅读体验的转变',
        image: '/projects/read-aloud/cover-bg-2.png',
        layout: 'contained',
        maxWidth: '1200px',
        caption: '策略概览板块 — 保留自原始作品集排版。'
      },
      {
        type: 'voice-states',
        category: 'DESIGN SYSTEM',
        label: '07',
        title: '设计系统',
        subtitle: 'Rocksteady Token 集成',
        content: '五种独特的语音状态在整个交互过程中提供清晰反馈，每种状态都有独特的视觉指示器，遵循 Rocksteady 设计系统。',
        items: [
          { title: 'Working 工作中', color: '#6B7280', description: '系统初始化' },
          { title: 'Speaking 播放中', color: '#2DA562', description: '正在朗读' },
          { title: 'Waiting 等待中', color: '#E97548', description: '准备接受输入' },
          { title: 'Thinking 思考中', color: '#8B5CF6', description: '处理查询' },
          { title: 'Listening 聆听中', color: '#E97548', description: '捕捉语音' }
        ]
      },
      {
        type: 'annotated-mockup',
        category: 'DESIGN RATIONALE',
        title: 'Word 中的 Copilot Voice',
        subtitle: '嵌入熟悉的 Word 阅读体验中的智能语音伴读',
        image: '/projects/read-aloud/word-mockup-1.png',
        annotations: [
          { y: 8, label: 'Word 工具栏', detail: '熟悉的 Office 操作环境', side: 'left' },
          { y: 22, label: 'Copilot Voice 面板', detail: '常驻工具栏与语音状态', side: 'right', color: '#2DA562' },
          { y: 38, label: '阅读高亮', detail: '同步文本追踪定位', side: 'left', color: '#7B61FF' },
          { y: 55, label: '语音波形', detail: '实时音频可视化反馈', side: 'right', color: '#E97548' },
          { y: 68, label: '建议语', detail: '"You Can Say..." 提示', side: 'left' },
          { y: 82, label: '播放控制', detail: '播放 / 暂停 / 速度 / 模式', side: 'right' },
          { y: 93, label: '麦克风按钮', detail: '一键语音激活', side: 'left', color: '#E97548' }
        ]
      },
      {
        type: 'annotated-mockup',
        category: 'DESIGN RATIONALE',
        label: '08',
        title: '从建议语到语音状态：提升主动交互的视觉入口',
        subtitle: '该设计有效引导用户开口发言，提升语音入口的可发现性和使用率。',
        image: '/projects/read-aloud/word-mockup-2.png',
        annotations: [
          { y: 18, label: '动态波形', detail: '视觉线索吸引注意力', side: 'right', color: '#2DA562' },
          { y: 35, label: '引导提示语', detail: '"You Can Say..." 建议', side: 'left' },
          { y: 52, label: '建议标签', detail: '可点击的示例问题', side: 'right' },
          { y: 70, label: '模式切换', detail: '文档 / 摘要模式', side: 'left', color: '#8B5CF6' },
          { y: 85, label: '麦克风激活', detail: '主要语音入口', side: 'right', color: '#E97548' }
        ]
      },
      {
        type: 'annotated-mockup',
        category: 'DESIGN RATIONALE',
        label: '09',
        title: '从控制播放到定制体验：构建语音阅读的节奏主控权',
        subtitle: '针对两类阅读需求提供灵活切换的模型入口，帮助用户把控阅读密度。',
        image: '/projects/read-aloud/word-mockup-1.png',
        annotations: [
          { y: 15, label: '阅读目标', detail: '用户确定当前目的', side: 'left' },
          { y: 32, label: '完整文档模式', detail: '原文逐字播放', side: 'right' },
          { y: 50, label: '摘要模式', detail: 'AI 精炼快速聚焦', side: 'left', color: '#8B5CF6' },
          { y: 68, label: '模型选择', detail: '选择合适的语音模型', side: 'right' },
          { y: 85, label: '交互期待', detail: '从被动听读到主动参与', side: 'left', color: '#2DA562' }
        ]
      },
      {
        type: 'annotated-mockup',
        category: 'DESIGN RATIONALE',
        title: '摘要模式阅读与 AI 生成摘要',
        subtitle: 'Copilot Voice 生成并朗读文档摘要，将长文档转化为易于消化的音频内容',
        image: '/projects/read-aloud/word-mockup-2.png',
        annotations: [
          { y: 20, label: '摘要面板', detail: 'AI 生成内容概览', side: 'right', color: '#8B5CF6' },
          { y: 40, label: '核心要点', detail: '提取主要论点', side: 'left' },
          { y: 60, label: '语音朗读', detail: '自然 TTS 摘要播放', side: 'right', color: '#2DA562' },
          { y: 80, label: '全文切换', detail: '返回原始文本', side: 'left' }
        ]
      },
      {
        type: 'interaction-path',
        category: 'DESIGN FOUNDATION',
        label: '10',
        title: '从痛点到突破：构建 ReadAloud 的全新交互路径',
        subtitle: '用户需要的不仅是"听完文档"，而是"理解内容"——而理解依赖于主动参与和即时反馈。',
        steps: [
          { label: '🎧 聆听 Listen' },
          { label: '❓ 提问 Ask / Answer' },
          { label: '🔁 回听 Resume' }
        ],
        rows: [
          { action: '点击 Read Aloud', feedback: '启动 Copilot Voice 工具栏，开始朗读文档', value: '沉浸式阅读，提升专注力' },
          { action: '切换模式（原文 / 摘要）', feedback: 'UI 显示当前阅读模式，朗读内容实时切换', value: '根据任务选择不同信息密度' },
          { action: '点击麦克风按钮提问', feedback: '暂停播放，语音识别提问内容并开始输出语音回答', value: '用户获得所需解释或总结' },
          { action: '主动点击播放', feedback: '系统提示"继续阅读"，自动/手动恢复朗读', value: '保持连续性，回到任务流' }
        ],
        content: '提问场景中，用户可以提出任意自然语言问题："这段的核心观点是什么？""它是什么意思？""可以用更简单的话说一遍吗？"'
      },
      {
        type: 'state-flow',
        category: 'DESIGN RATIONALE',
        label: '11',
        title: '从播放到提问再到回读：对话式阅读的体验节奏',
        content: '在 Copilot Voice 之前，Word 的 ReadAloud 是一个被动听取的功能。以下是全新的对话式流程：',
        items: [
          { title: '播放中 Speaking', color: '#2DA562', description: '正在朗读文档' },
          { title: '用户激活 Mic', color: '#E97548', description: '点击麦克风按钮' },
          { title: '语音输入 Listening', color: '#E97548', description: '捕捉用户语音' },
          { title: '系统思考 Thinking', color: '#8B5CF6', description: '通过 Copilot 处理' },
          { title: '系统作答 Speaking', color: '#2DA562', description: '语音回复用户' },
          { title: '自动恢复阅读', color: '#2DA562', description: '回到朗读位置' }
        ]
      },
      {
        type: 'validation',
        category: 'DESIGN VALIDATION',
        label: '12',
        title: '从使用提升到行为转变：验证 Voice 体验的真实价值',
        subtitle: '为验证 Copilot Voice 的真实价值，我们收集了多项用户行为数据，涵盖使用频次、功能触发及用户反馈变化。',
        stats: [
          { value: '+37%', label: '用户整体使用率' },
          { value: '+92%', label: 'Mic 启用率增长' },
          { value: '62%', label: '主动中断提问占比' }
        ],
        quotes: [
          { avatar: '😊', text: '它让我边做事边思考，不再像以前那样只是被动跟读。这种交互让我更容易沉浸在文档内容里。' },
          { avatar: '🤩', text: '我第一次发现朗读能够"跟我说话"了。这真的改变了我使用 Word 的方式。' },
          { avatar: '🙂', text: '现在处理长文档轻松多了，Copilot 就像个周到的语音助手。' },
          { avatar: '😄', text: '可以随时暂停提问，然后继续听下去，就像和人对话一样自然。' }
        ],
        content: '用户满意度从 3.4（Read Aloud）上升至 4.6（Copilot Voice）。'
      },
      {
        type: 'text',
        category: 'DESIGN VALIDATION',
        label: '13',
        title: '从协作到引领：我在 Copilot Voice 中的角色价值',
        content: '在 Copilot Voice 项目中，我承担了中国区唯一视觉与交互设计师角色，从需求到最终交付，持续驱动多个关键环节。',
        image: '/projects/read-aloud/megaphone-3d.png',
        secondaryImage: '/projects/read-aloud/emoji-hearts.png'
      },
      {
        type: 'outcomes',
        label: '14',
        title: '成果与影响',
        subtitle: '成功上线 Dogfood 版本，将被动阅读转化为主动对话。',
        content: 'Dogfood 上线 · 1000万+ MAU',
        image: '/projects/read-aloud/cover-bg-2.png',
        items: [
          { title: '产品交付', description: '语音中断、模式切换、自然语音反馈系统已在 Dogfood 中交付' },
          { title: '视觉一致性', description: '完整集成 Rocksteady 设计系统，符合 Word UI token 规范' },
          { title: '交互模型', description: '5 种语音状态无缝过渡' },
          { title: '可扩展性', description: '可扩展架构，为 podcast、无障碍和未来语音能力做好准备' }
        ]
      }
    ]
  },
  {
    id: 'p2',
    title: 'Keeta 用户流分析与设计优化',
    category: 'B-Side',
    platform: 'Mobile',
    year: '2025',
    role: 'UI/UX 设计师',
    shortDescription: '从门店页到提交订单页的用户动线分析与设计策略。',
    coverImage: '/projects/figma-portfolio/keeta-user-flow/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_KEETA_SLIDES,
    },
    acts: {
      act1: {
        title: '用户动线',
        content: '围绕从门店页到提交订单页的路径进行分析。'
      },
      act2: {
        title: '设计优化',
        content: '以 Figma 导出的原始页面作为唯一视觉来源。',
        decisionPoints: ['原始顺序', '高保真展示', '响应式阅读']
      },
      act3: {
        title: 'Reader 呈现',
        content: '网页只展示原始中文设计稿，不重建设计内容。',
        impact: '6 页源文件'
      }
    }
  },
  {
    id: 'p3',
    title: 'NUWA Series',
    category: 'C-Side',
    platform: 'Web',
    year: '2022-2023',
    role: '交互设计师 / Web 体验设计师',
    shortDescription: '一个关于早期生成式 AI 交互范式的系列案例：把研究能力转译成可理解、可探索、可控制的体验。',
    coverImage: '/projects/nuwa-infinity/live-preview.png',
    tags: ['早期 AI UX', 'NUWA 系列', '多模态 AI', '交互转译', '生成式 AI', 'Microsoft Research'],
    externalLinks: {
      live: 'https://nuwa-infinity.microsoft.com/#/',
      github: 'https://github.com/microsoft/NUWA/blob/main/NUWAInfinity.md'
    },
    caseSections: [
      {
        type: 'hero',
        variant: 'series',
        title: 'NUWA Series — 为早期生成式 AI 设计交互范式',
        subtitle: '从 NUWA-Infinity 到 NUWA XL，再到 DragNUWA，我设计的是陌生 AI 能力与用户熟悉操作之间的桥：空间探索、时间理解与直接运动控制。',
        bgImage: '/projects/nuwa-infinity/live-preview.png',
        tags: ['早期 AI 交互', 'Emerging Technology UX', 'Research Demo Experience', 'Microsoft Research'],
        role: '交互设计师 / Web 体验设计师',
        date: '2022-2023'
      },
      {
        type: 'stats',
        category: '项目背景',
        label: '01',
        title: '真正的问题不是视觉够不够酷，而是用户能不能读懂交互。',
        subtitle: '这些是早期多模态 AI research demo，当时还没有今天这样成熟的生成式 AI 产品交互范式。',
        content: '我的核心挑战，是把抽象模型能力转译成非技术读者能通过行动理解的体验：输入、选择、拖拽、扩展、预览、对比，并继续探索。',
        stats: [
          { value: '01', label: 'NUWA-Infinity：空间探索' },
          { value: '02', label: 'NUWA XL：时间连续性' },
          { value: '03', label: 'DragNUWA：直接运动控制' },
          { value: '0→1', label: '在成熟 AI UX pattern 之前定义交互逻辑' }
        ]
      },
      {
        type: 'series-timeline',
        category: '系列演进',
        label: '02',
        title: '三个项目，一套逐步演进的交互语言',
        subtitle: '这个系列从“理解 AI 能生成什么”，演进到“理解生成如何跨越时间”，再到“用户如何直接控制运动”。',
        content: '这样组织后，NUWA-Infinity 仍然是整个案例的起点，同时也能清楚呈现后续两个项目如何把交互问题推得更具体。',
        items: [
          {
            number: '01',
            title: 'NUWA-Infinity',
            subtitle: 'Spatial exploration',
            description: '当 outpainting 和任意尺寸生成还不是日常产品概念时，用户如何理解无限视觉生成？'
          },
          {
            number: '02',
            title: 'NUWA XL',
            subtitle: 'Temporal continuity',
            description: '长视频生成不能只展示最终结果，还需要让用户理解它如何在时间上组织和延展。'
          },
          {
            number: '03',
            title: 'DragNUWA',
            subtitle: 'Directable motion',
            description: '用户如何从描述“我想要什么”，进一步变成直接指出“它应该怎么动”？'
          }
        ]
      },
      {
        type: 'cards',
        category: '设计原则',
        label: '03',
        title: '让早期 AI 能力变得可感知的设计原则',
        content: '这些好玩的交互不是装饰，而是为了让陌生的 AI 能力变得可接近、可探索、可控制。',
        items: [
          {
            title: '先熟悉，再惊喜',
            description: '先用输入、拖拽、扩展、预览、对比这些用户熟悉的动作建立入口，再呈现 AI 的惊喜能力。'
          },
          {
            title: '通过互动解释技术',
            description: '让用户通过操作示例和观察结果理解模型，而不是依赖论文术语或长段说明。'
          },
          {
            title: '让能力变得可见',
            description: '用空间、时间、运动这些可以被看见和操作的界面结构来表达模型能力。'
          },
          {
            title: '给用户控制感',
            description: '通过清晰步骤、预览、before/after 和继续探索入口，降低生成式 AI 的黑箱感。'
          }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: '第一章 / NUWA-Infinity',
        label: '04',
        title: '从未知 AI 能力到空间探索体验',
        subtitle: 'NUWA-Infinity 通过把抽象生成能力转译成空间体验，让用户理解 infinite visual synthesis。',
        content: '这个项目不是为了做一个 fancy 网站，而是让用户通过熟悉动作感受到模型能力：输入 prompt、看到生成世界、扩展画面边界，并继续探索。',
        demoUrl: 'https://nuwa-infinity.microsoft.com/#/',
        fallbackImage: '/projects/nuwa-infinity/live-preview.png',
        fallbackAlt: 'NUWA-Infinity 网站预览图，展示生成式视觉 gallery。',
        buttonLabel: '打开在线演示',
        caption: '交互证据：桌面端可在 case study 里直接操作原项目；移动端保留预览图和外部打开入口，避免窄屏 iframe 破坏阅读。',
        items: [
          {
            number: '1',
            title: '用户不知道如何开始一次 AI 生成任务',
            subtitle: '用户问题',
            description: '当时访客并不一定熟悉 prompt、outpainting 或任意尺寸生成，research demo 不能默认用户已经懂这些流程。'
          },
          {
            number: '2',
            title: '我用熟悉的创作动作承载模型能力',
            subtitle: '设计决策',
            description: '输入、选择示例、扩展视觉边界、预览结果，成为模型能力的用户侧交互语言。'
          },
          {
            number: '3',
            title: 'demo 把生成表现成可以扩展的视觉世界',
            subtitle: '交互证据',
            description: '嵌入页面通过 gallery、导航、生成示例和探索流程，让模型能力变得可观察。'
          },
          {
            number: '4',
            title: 'AI 能力变得可接近、可探索、可控制',
            subtitle: '设计价值',
            description: '用户不需要先读技术说明，而是可以在体验里通过行动理解模型。'
          }
        ],
        rows: [
          {
            action: 'Prompt',
            feedback: '从语言开始',
            value: 'Text-to-image 被理解成创意 brief，而不是技术命令。'
          },
          {
            action: 'Expand',
            feedback: '继续向画面之外生成',
            value: 'Outpainting 被转译成用户熟悉的画布扩展动作。'
          },
          {
            action: 'Explore',
            feedback: '预览并比较结果',
            value: 'AI 的不确定性变成可以继续尝试的探索感。'
          }
        ]
      },
      {
        type: 'evidence',
        variant: 'xl',
        category: '第二章 / NUWA XL',
        label: '05',
        title: '从空间扩展到时间连续性',
        subtitle: 'NUWA XL 把设计问题从“AI 能生成什么”推进到“如何理解长视频在时间上的生成过程”。',
        content: '如果只展示一个最终视频，用户很难理解长视频生成的差异。我用 filmstrip / timeline 的心智模型，把稀疏关键帧、coarse-to-fine 补帧和时间结构表达出来。',
        demoUrl: 'https://msra-nuwa.azurewebsites.net/#/NUWAXL',
        fallbackImage: '/projects/nuwa-series/nuwa-xl-preview.png',
        fallbackAlt: 'NUWA XL 页面预览图，展示长视频生成 demo。',
        buttonLabel: '打开 NUWA XL 页面',
        caption: '视觉证据：timeline 与 filmstrip 的处理方式，把文案里的设计解释绑定到 NUWA XL 的长视频生成主题。',
        items: [
          {
            number: '1',
            title: '只看最终视频，不足以解释模型差异',
            subtitle: '用户问题',
            description: '用户需要理解的是长视频如何被组织和生成，而不只是看到一个生成结果。'
          },
          {
            number: '2',
            title: '我借用了时间线和胶片条的心智模型',
            subtitle: '设计决策',
            description: '关键帧、进度和帧序列让 coarse-to-fine 的生成逻辑更容易被理解。'
          },
          {
            number: '3',
            title: '视觉证据把视频结构和生成逻辑连起来',
            subtitle: '交互证据',
            description: '模块展示从稀疏到密集的帧结构，而不是孤立地放一张截图。'
          },
          {
            number: '4',
            title: '长视频生成变成可读的时间结构',
            subtitle: '设计价值',
            description: '用户可以扫描、预览并理解生成过程，而不是只依赖技术指标。'
          }
        ],
        rows: [
          {
            action: 'Keyframes',
            feedback: '故事骨架',
            value: '稀疏关键帧给用户一个理解生成时间线的起点。'
          },
          {
            action: 'Coarse-to-fine',
            feedback: '渐进补齐',
            value: '中间帧被理解成模型对时间空隙的补全。'
          },
          {
            action: 'Long timeline',
            feedback: '可扫描时长',
            value: '长视频生成的尺度变得可见，而不是只停留在技术描述里。'
          }
        ]
      },
      {
        type: 'evidence',
        variant: 'drag',
        category: '第三章 / DragNUWA',
        label: '06',
        title: '从 prompt 描述到直接控制运动',
        subtitle: 'DragNUWA 把交互从“描述我想要什么”，推进到“直接指出它应该怎么动”。',
        content: 'Prompt 能表达语义，但很难精确描述运动方向、路径和节奏。我把 trajectory 视为直接操控层，让 text、image 和 path control 共同表达生成意图。',
        demoUrl: 'https://www.microsoft.com/en-us/research/project/dragnuwa/',
        fallbackImage: '/projects/nuwa-series/dragnuwa-preview.png',
        fallbackAlt: 'DragNUWA Microsoft Research 页面预览图。',
        buttonLabel: '打开 DragNUWA 页面',
        caption: '视觉证据：轨迹叠加层明确表达控制模型，同时不假装作品集可以直接改写原研究页面。',
        items: [
          {
            number: '1',
            title: 'Prompt 很难精确表达运动',
            subtitle: '用户问题',
            description: '文字可以描述场景，但用户经常需要说明物体或镜头应该沿着什么路径移动。'
          },
          {
            number: '2',
            title: '我用轨迹作为直接控制语言',
            subtitle: '设计决策',
            description: '在图像上拖拽路径，把运动意图转译成空间和时间上的控制指令。'
          },
          {
            number: '3',
            title: '界面把 text、image、trajectory 绑定在一起',
            subtitle: '交互证据',
            description: '视觉层展示三种控制因素如何协同，让读者理解它和普通 prompt 的差异。'
          },
          {
            number: '4',
            title: '用户可以直接“画出”运动意图',
            subtitle: '设计价值',
            description: '模型变得更可控，因为界面接受了一个很熟悉的人类动作：画出你想要的路径。'
          }
        ],
        rows: [
          {
            action: 'Text',
            feedback: '语义意图',
            value: 'Prompt 描述生成视频的主题。'
          },
          {
            action: 'Image',
            feedback: '空间锚点',
            value: '静态图定义场景和对象上下文。'
          },
          {
            action: 'Trajectory',
            feedback: '运动方向',
            value: '拖拽路径把人类意图转译成镜头或物体运动。'
          }
        ]
      },
      {
        type: 'interaction-mapping',
        category: '交互转译框架',
        label: '07',
        title: '贯穿 NUWA 系列的一套共享框架',
        subtitle: '每个项目都把一个技术能力转译成用户熟悉的心智模型和具体交互方式。',
        rows: [
          {
            action: 'NUWA-Infinity',
            feedback: '画布、地图、图像编辑器',
            value: '无限视觉生成被转译成空间探索：prompt、扩展、预览、继续生成。'
          },
          {
            action: 'NUWA XL',
            feedback: '胶片条、时间线、关键帧',
            value: '长视频生成被转译成时间结构：稀疏关键帧、渐进补帧、可扫描时长。'
          },
          {
            action: 'DragNUWA',
            feedback: '拖拽、绘制路径、运动箭头',
            value: '可控视频生成被转译成直接操控：文字 + 图像 + 轨迹。'
          },
          {
            action: '系列价值',
            feedback: '用交互解释技术',
            value: '每个技术概念都绑定到用户已知动作上，因此 research demo 更容易被理解。'
          }
        ]
      },
      {
        type: 'outcomes',
        category: '设计价值',
        label: '08',
        title: '这个系列如何体现我的交互设计能力',
        subtitle: '最重要的设计贡献不是让页面看起来未来感，而是让陌生 AI 能力变得可感知。',
        content: '我设计的是陌生 AI 能力与用户熟悉操作之间的桥。',
        items: [
          {
            title: 'Emerging technology UX',
            description: '在成熟 AI 产品范式出现之前，我参与定义了 research demo 的交互逻辑。'
          },
          {
            title: 'Interaction translation',
            description: '我把模型能力转译成空间、时间和运动控制三类用户心智模型。'
          },
          {
            title: 'Purposeful play',
            description: '我用好玩、可探索的交互降低陌生感，而不是把它当成纯视觉装饰。'
          },
          {
            title: 'Qualitative design impact',
            description: '这个系列减少了对技术解释的依赖，让读者通过具体证据理解 research demo。'
          }
        ]
      }
    ],
    acts: {
      act1: {
        title: 'NUWA 系列演进',
        content: '将 NUWA-Infinity、NUWA XL 和 DragNUWA 整理成早期生成式 AI 交互问题的连续演进。'
      },
      act2: {
        title: '交互转译',
        content: '把空间生成、长视频生成和运动控制分别转译成用户熟悉的心智模型。',
        decisionPoints: ['空间探索', '时间连续性', '直接运动控制']
      },
      act3: {
        title: '可理解的 research demo',
        content: '把文案、视觉和交互证据绑定在一起，让招聘方能看到每个 demo 背后的设计推理。',
        impact: 'AI 交互语言'
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
    coverImage: '/projects/figma-portfolio/reme-ai-companion/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_REME_SLIDES,
    },
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
    coverImage: '/projects/figma-portfolio/rd-agent/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_RD_AGENT_SLIDES,
    },
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
    coverImage: '/projects/figma-portfolio/msra-25th-anniversary/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_MSRA_25TH_SLIDES,
    },
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
    coverImage: '/projects/figma-portfolio/ioete-tea-shop/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_IOETE_SLIDES,
    },
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
    coverImage: '/projects/figma-portfolio/illustration-works/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_ILLUSTRATION_SLIDES,
    },
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
    title: '心相印包装设计',
    category: 'C-Side',
    platform: 'Digital',
    year: '2023',
    role: '包装设计师',
    shortDescription: '心相印包装设计项目的 Figma 原始页面展示。',
    coverImage: '/projects/figma-portfolio/heart-printing-packaging/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_HEART_PRINTING_SLIDES,
    },
    gallery: FIGMA_HEART_PRINTING_SLIDES,
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
    coverImage: '/project-covers/palette-of-the-dreamer.svg',
    gallery: [
      '/project-covers/palette-of-the-dreamer.svg'
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
    coverImage: '/projects/figma-portfolio/white-elephant-packaging/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 1814 / 796,
    slideSets: {
      zh: FIGMA_WHITE_ELEPHANT_SLIDES,
    },
    gallery: FIGMA_WHITE_ELEPHANT_SLIDES,
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
  },
  {
    id: 'p12',
    title: '百度智能云平台视觉升级',
    category: 'B-Side',
    platform: 'Web',
    year: '2024',
    role: 'UI/UX 设计师',
    shortDescription: '百度智能云知识平台全流程视觉升级方案。',
    coverImage: '/projects/figma-portfolio/baidu-ai-cloud/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_BAIDU_AI_CLOUD_SLIDES,
    },
    gallery: FIGMA_BAIDU_AI_CLOUD_SLIDES,
    tags: ['B2B 平台', '视觉升级', '知识平台', 'Figma'],
    acts: {
      act1: {
        title: '平台背景',
        content: '以 Figma 原始导出页面整理视觉升级方案。'
      },
      act2: {
        title: '源文件阅读器',
        content: '网页只负责高保真展示，不重建页面布局。',
        decisionPoints: ['原始顺序', '不拆组件', '响应式阅读']
      },
      act3: {
        title: 'Reader 呈现',
        content: '在 Works 中展示完整中文设计稿页面。',
        impact: '11 页源文件'
      }
    }
  },
  {
    id: 'p13',
    title: 'TaskMatrix.AI Storytelling Agent',
    category: 'B-Side',
    platform: 'Web',
    year: '2023',
    role: 'UI/UX 设计师',
    shortDescription: 'TaskMatrix.AI 的 Storytelling Agent 与 AI 工作流设计稿展示。',
    coverImage: '/projects/figma-portfolio/taskmatrix-ai/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_TASKMATRIX_SLIDES,
    },
    gallery: FIGMA_TASKMATRIX_SLIDES,
    tags: ['AI Agent', '工作流设计', 'B2B 平台', 'Figma'],
    acts: {
      act1: {
        title: 'Agent 工作流',
        content: 'TaskMatrix.AI 需要清晰呈现 agent 驱动的故事生成与任务编排逻辑。'
      },
      act2: {
        title: '源文件阅读器',
        content: '保留 Figma 原始页面顺序，以高分辨率图片展示完整方案。',
        decisionPoints: ['原始顺序', 'AI 工作流清晰度', '响应式阅读']
      },
      act3: {
        title: 'Reader 呈现',
        content: '在 Works 中展示完整导出的设计叙事。',
        impact: '11 页源文件'
      }
    }
  },
  {
    id: 'p14',
    title: '小度学习机首页重构',
    category: 'C-Side',
    platform: 'Digital',
    year: '2024',
    role: 'UI/UX 设计师',
    shortDescription: '围绕信息层级、学习节律与 AI 入口的小度学习机首页重构。',
    coverImage: '/projects/figma-portfolio/xiaodu-learning-tablet/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_XIAODU_SLIDES,
    },
    gallery: FIGMA_XIAODU_SLIDES,
    tags: ['首页重构', '教育 UX', 'AI 入口', 'Figma'],
    acts: {
      act1: {
        title: '首页复杂度',
        content: '学习机首页需要更清晰地承载学习内容、产品功能与 AI 能力入口。'
      },
      act2: {
        title: '结构化重构',
        content: '以 Figma 原始页面形式保留完整重构方案和展示节奏。',
        decisionPoints: ['信息层级', '学习节律', 'AI 入口']
      },
      act3: {
        title: 'Reader 呈现',
        content: '在 Works 中展示完整首页重构流程。',
        impact: '13 页源文件'
      }
    }
  },
  {
    id: 'p15',
    title: 'Value Compass',
    category: 'B-Side',
    platform: 'Web',
    year: '2024',
    role: 'UI/UX 设计师',
    shortDescription: 'AI 价值对齐研究项目的界面与视觉系统设计。',
    coverImage: '/projects/figma-portfolio/value-compass/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_VALUE_COMPASS_SLIDES,
    },
    gallery: FIGMA_VALUE_COMPASS_SLIDES,
    tags: ['AI 研究', '价值对齐', '视觉系统', 'Figma'],
    acts: {
      act1: {
        title: '研究表达',
        content: '项目需要用清晰的视觉系统传达 AI 价值对齐研究。'
      },
      act2: {
        title: '界面与系统',
        content: '以 Figma 原始页面保留研究叙事和视觉方向。',
        decisionPoints: ['研究清晰度', '界面结构', '视觉一致性']
      },
      act3: {
        title: 'Reader 呈现',
        content: '以高分辨率阅读器展示完整 Figma 方案。',
        impact: '7 页源文件'
      }
    }
  }
];

// 保持向后兼容
export const PROJECTS = PROJECTS_EN;

// ===== EXPLORATION PROJECTS (Walk-Through AI Garden cards) =====
export const EXPLORATIONS_EN: Project[] = [
  {
    id: 'exp-aigc',
    title: 'AIGC Image Creation',
    category: 'B-Side',
    platform: 'Digital',
    year: '2024',
    role: 'AI Explorer & Visual Designer',
    shortDescription: 'From ideas to visuals — exploring AI-generated art and creative expression.',
    coverImage: '/projects/walk-through/aigc-01.png',
    tags: ['AIGC', 'Midjourney', 'Stable Diffusion', 'Creative AI', 'Visual Art'],
    slides: [
      '/projects/walk-through/aigc-01.png',
      '/projects/walk-through/aigc-02.png',
      '/projects/walk-through/aigc-03.png',
      '/projects/walk-through/aigc-04.png',
    ],
    acts: {
      act1: { title: 'Exploration', content: 'Exploring AI-generated imagery as a creative medium — from concept to final composition.' },
      act2: { title: 'Process', content: 'Iterating through prompts, styles, and visual languages to find unique expressions.', decisionPoints: ['Prompt engineering', 'Style transfer', 'Composition'] },
      act3: { title: 'Output', content: 'A collection of AI-generated artworks that push creative boundaries.', impact: 'Personal exploration' }
    }
  },
  {
    id: 'exp-prompt',
    title: 'Prompt & Template Thinking',
    category: 'B-Side',
    platform: 'Web',
    year: '2024',
    role: 'Prompt Designer',
    shortDescription: 'Writing image prompts as visual design briefs, from vague intent to executable decisions.',
    coverImage: '/projects/walk-through/aigc-02.png',
    slides: [
      '/projects/walk-through/aigc-02.png',
      '/projects/walk-through/aigc-01.png',
      '/projects/walk-through/aigc-03.png',
      '/projects/walk-through/aigc-04.png',
    ],
    tags: ['Visual Prompting', 'Prompt Framework', 'Image Models', 'Design Brief'],
    acts: {
      act1: { title: 'The Problem', content: 'Keyword piles make the model guess composition, camera, light, and mood.' },
      act2: { title: 'Prompt Framework', content: 'I turn visual judgment into reusable slots: emotion, subject, camera, lighting, and detail.', decisionPoints: ['Style anchor', 'Composition', 'Pseudo perspective', 'Lighting'] },
      act3: { title: 'Impact', content: 'Prompt writing becomes a design brief that can be repeated, refined, and compared across models.', impact: 'More controllable image generation' }
    }
  },
  {
    id: 'exp-workflow',
    title: 'AI Workflow Design',
    category: 'B-Side',
    platform: 'Web',
    year: '2024',
    role: 'AI Workflow Designer',
    shortDescription: 'Building AI-powered helper tools for complex image-generation production.',
    coverImage: '/projects/walk-through/aigc-03.png',
    tags: ['Batch Generation', '3:4 Review Board', 'AIGC Production', 'Design Automation'],
    acts: {
      act1: { title: 'Production Complexity', content: 'Complex image-generation work created repeated generating, filtering, resizing, and review preparation.' },
      act2: { title: 'AI Helper Tools', content: 'I built two small tools: batch image generation and a 3:4 review board for team selection.', decisionPoints: ['Batch generation', '3:4 normalization', 'Team screening', 'Final selection'] },
      act3: { title: 'Result', content: 'My time moved from manual operation to image judgment, review, and communication.', impact: 'Faster review-ready production' }
    }
  },
  {
    id: 'exp-vibe-coding',
    title: 'Vibe Coding',
    category: 'C-Side',
    platform: 'Web',
    year: '2025',
    role: 'Designer & Developer',
    shortDescription: 'Elsewhere: an independent AI template website, from product idea to working demo.',
    coverImage: '/projects/walk-through/aigc-04.png',
    tags: ['Vibe Coding', 'Template Website', 'React', 'Live Demo', 'Interaction'],
    acts: {
      act1: { title: 'The Spark', content: 'Elsewhere started from the problem that blank prompt boxes are hard for normal users.' },
      act2: { title: 'The Process', content: 'I designed template-first flows, visual interaction states, and then used AI-assisted coding to implement the site.', decisionPoints: ['Template UX', 'Guided generation', 'Preview states', 'Deployable app'] },
      act3: { title: 'The Output', content: 'A working React + Vite website with a live ID photo interaction model.', impact: 'Live GitHub Pages demo' }
    }
  },
];

export const EXPLORATIONS_ZH: Project[] = [
  {
    id: 'exp-aigc',
    title: 'AIGC 图像创作',
    category: 'B-Side',
    platform: 'Digital',
    year: '2024',
    role: 'AI 探索者 & 视觉设计师',
    shortDescription: '从想法到视觉，探索 AI 生成艺术与创作表达。',
    coverImage: '/projects/walk-through/aigc-01.png',
    tags: ['AIGC', 'Midjourney', 'Stable Diffusion', '创意 AI', '视觉艺术'],
    slides: [
      '/projects/walk-through/aigc-01.png',
      '/projects/walk-through/aigc-02.png',
      '/projects/walk-through/aigc-03.png',
      '/projects/walk-through/aigc-04.png',
    ],
    acts: {
      act1: { title: '探索', content: '将 AI 图像生成作为创作媒介，从概念到最终构图的探索之旅。' },
      act2: { title: '过程', content: '通过迭代提示词、风格和视觉语言，寻找独特的表达方式。', decisionPoints: ['提示词工程', '风格迁移', '构图设计'] },
      act3: { title: '成果', content: '一组突破创意边界的 AI 生成艺术作品。', impact: '个人探索' }
    }
  },
  {
    id: 'exp-prompt',
    title: 'Prompt 与模板思维',
    category: 'B-Side',
    platform: 'Web',
    year: '2024',
    role: 'Prompt 设计师',
    shortDescription: '把图像 prompt 写成视觉设计 brief，从模糊想法变成可执行决策。',
    coverImage: '/projects/walk-through/aigc-02.png',
    slides: [
      '/projects/walk-through/aigc-02.png',
      '/projects/walk-through/aigc-01.png',
      '/projects/walk-through/aigc-03.png',
      '/projects/walk-through/aigc-04.png',
    ],
    tags: ['视觉 Prompt', 'Prompt 框架', '生图模型', '设计 Brief'],
    acts: {
      act1: { title: '痛点', content: '关键词堆叠会让模型自己猜构图、镜头、光线和情绪。' },
      act2: { title: 'Prompt 框架', content: '我把视觉判断拆成可复用槽位：情绪、主体、镜头、光线和细节。', decisionPoints: ['风格锚点', '构图', '伪透视', '光线'] },
      act3: { title: '影响', content: 'Prompt 变成可以复用、微调和跨模型比较的视觉 brief。', impact: '更可控的图像生成' }
    }
  },
  {
    id: 'exp-workflow',
    title: 'AI Workflow 设计',
    category: 'B-Side',
    platform: 'Web',
    year: '2024',
    role: 'AI Workflow 设计师',
    shortDescription: '为复杂生图生产制作 AI 提效小工具。',
    coverImage: '/projects/walk-through/aigc-03.png',
    tags: ['批量生图', '3:4 展示板', 'AIGC 生产', '设计自动化'],
    acts: {
      act1: { title: '生产复杂度', content: '复杂生图工作会产生大量重复生成、筛选、改比例和整理 review 的工作。' },
      act2: { title: 'AI 提效工具', content: '我做了两个小工具：批量生图，以及给团队筛选用的 3:4 图片展示板。', decisionPoints: ['批量生成', '统一 3:4', '团队筛选', '最终选择'] },
      act3: { title: '结果', content: '我的时间从重复操作转向审美判断、review 和沟通。', impact: '更快进入可筛选状态' }
    }
  },
  {
    id: 'exp-vibe-coding',
    title: 'Vibe Coding',
    category: 'C-Side',
    platform: 'Web',
    year: '2025',
    role: '设计师 & 开发者',
    shortDescription: 'Elsewhere：独立完成的 AI 模板网站，从产品想法到可运行 demo。',
    coverImage: '/projects/walk-through/aigc-04.png',
    tags: ['Vibe Coding', '模板网站', 'React', 'Live Demo', '交互设计'],
    acts: {
      act1: { title: '灵感', content: 'Elsewhere 从一个问题开始：普通用户很难从空白 prompt 框开始。' },
      act2: { title: '过程', content: '我设计模板优先的流程、视觉交互状态，再用 AI 辅助编码完成网站实现。', decisionPoints: ['模板 UX', '引导式生成', '预览状态', '可部署 App'] },
      act3: { title: '成果', content: '一个包含 ID photo 交互模型的 React + Vite 可运行网站。', impact: '已部署 GitHub Pages demo' }
    }
  },
];

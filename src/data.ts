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
    shortDescription: 'How I turned three Microsoft Research generative AI models into web demos people could understand through prompt, canvas, timeline, and path controls.',
    coverImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
    tags: ['Research Demo UX', 'Canvas Expansion', 'Timeline Interaction', 'Trajectory Control', 'Microsoft Research'],
    externalLinks: {
      live: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
      github: 'https://github.com/microsoft/NUWA/blob/main/NUWAInfinity.md'
    },
    caseSections: [
      {
        type: 'hero',
        variant: 'series',
        title: 'NUWA Series — Designing the Web Interaction Layer for Early Generative AI Demos',
        subtitle: 'My role was to turn research capabilities into things visitors could actually try: type a prompt, pick an example, expand an image boundary, read a timeline, or draw a motion path.',
        bgImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        tags: ['Prompt to Image World', 'Outpainting', 'Long Video Timeline', 'Trajectory Control'],
        role: 'Interaction Designer / Web Experience Designer',
        date: '2022-2023'
      },
      {
        type: 'stats',
        variant: 'series',
        category: 'ROLE IN THE DEMO LAYER',
        label: '01',
        title: 'I was not decorating research results. I was designing how people would understand them.',
        subtitle: 'Each model had a technical story, but a visitor landing on the page needed a concrete task: what can I do, what will change, and why does that result matter?',
        content: 'I worked on the interaction layer that made the demos readable without requiring the visitor to read the paper first.',
        stats: [
          { value: '01', label: 'Translate model capability into a page task visitors can start' },
          { value: '02', label: 'Choose controls people already know: prompt, gallery, canvas, timeline, path' },
          { value: '03', label: 'Design states and feedback so outputs can be read, compared, and continued' },
          { value: '04', label: 'Use the page itself as a demo, not as a poster for a research paper' }
        ]
      },
      {
        type: 'series-timeline',
        category: 'ABILITY EVOLUTION',
        label: '02',
        title: 'The interaction problem changed as the model capability changed.',
        subtitle: 'I structure the case study by what the visitor had to understand in each demo: space, time, then motion control.',
        content: 'The three chapters are not equal feature summaries. Each one shows a different design problem caused by a different AI capability.',
        items: [
          {
            number: '01',
            title: 'NUWA-Infinity',
            subtitle: 'Space / infinite image generation',
            description: 'Visitors needed to see that generation could continue beyond the original frame, so the page had to teach prompt, examples, image boundary, and outpainting as one flow.'
          },
          {
            number: '02',
            title: 'NUWA XL',
            subtitle: 'Time / long video generation',
            description: 'A final video clip does not explain long-video synthesis, so the page needed timeline, filmstrip, keyframe, and coarse-to-fine cues.'
          },
          {
            number: '03',
            title: 'DragNUWA',
            subtitle: 'Motion / trajectory control',
            description: 'Prompt text is weak for movement, so the demo needed to show how text, image, and a drawn path work together.'
          }
        ]
      },
      {
        type: 'cards',
        variant: 'series',
        category: 'HOW I MADE THE DEMOS READABLE',
        label: '03',
        title: 'Every abstract term had to become a visible operation on the page.',
        content: 'I used playful interactions only when they carried an explanation. The visitor should learn by doing one small action and seeing what the model changes.',
        items: [
          {
            title: 'Give the visitor a first move',
            description: 'For NUWA-Infinity, the first move is not “read the paper.” It is choose a prompt or example, then see the image world the model can extend.'
          },
          {
            title: 'Keep input and result visually connected',
            description: 'Prompt, selected example, generated image, and expanded result need to sit in one path so the visitor can tell which action caused which output.'
          },
          {
            title: 'Use structure from the medium',
            description: 'Images use canvas boundaries; long video uses filmstrip and timeline; motion control uses a drawn path and endpoint. The UI shape explains the AI capability.'
          },
          {
            title: 'Show what to inspect',
            description: 'Screenshots, demo windows, and diagrams need callouts: where the input starts, where the model result appears, and what changed after generation.'
          }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: 'CHAPTER 01 / NUWA-INFINITY',
        label: '04',
        title: 'I turned outpainting into a canvas-expansion task the visitor could follow.',
        subtitle: 'Capability: NUWA-Infinity can generate images and videos from text, image, or video input, and can extend an image beyond its original frame.',
        content: 'The page had to answer a basic first-visit question: “What can this AI do, and what should I try first?” I used prompt, gallery examples, image boundary, and continuation as the visitor path.',
        demoUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
        fallbackImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        fallbackAlt: 'NUWA-Infinity website preview showing the generated image world and project entry.',
        buttonLabel: 'Open NUWA-Infinity',
        caption: 'Evidence caption: click Enter in the live demo first. Then inspect how the page moves from prompt/gallery examples to generated image evidence, and scroll to the outpainting section that asks visitors to continue beyond the original frame.',
        items: [
          {
            number: 'A',
            title: 'Technology capability',
            subtitle: 'What the model does',
            description: 'Generate a visual world from text or image input, then extend that world outside the original image boundary.'
          },
          {
            number: 'B',
            title: 'User understanding problem',
            subtitle: 'Where visitors get stuck',
            description: '“Infinite visual synthesis” is not self-explanatory. A visitor may not know whether to type, click an example, compare two images, or scroll to find the model difference.'
          },
          {
            number: 'C',
            title: 'My design decision',
            subtitle: 'Familiar interaction model',
            description: 'Use a prompt/gallery entry first, then show generated examples as a visual world, then introduce outpainting as extending the canvas boundary.'
          },
          {
            number: 'D',
            title: 'How it appears on the page',
            subtitle: 'Interface evidence',
            description: 'The hero names NUWA-Infinity, the gallery offers example scenes, the outpainting section frames the “beyond the horizon” action, and preview imagery shows what changed.'
          },
          {
            number: 'E',
            title: 'Why this works',
            subtitle: 'Reduced learning cost',
            description: 'Visitors do not have to decode the research term first. They can see a prompt, inspect a generated result, and understand that the image can keep growing outside the frame.'
          },
          {
            number: 'F',
            title: 'What to show visually',
            subtitle: 'Portfolio asset direction',
            description: 'Use an annotated original screenshot plus a prompt → generated result → expand boundary → preview comparison path. Keep the live demo inside this chapter, not as a separate plugin.'
          }
        ],
        rows: [
          {
            action: 'Prompt / example',
            feedback: 'First action',
            value: 'Gives visitors a safe starting point before they understand the research term.'
          },
          {
            action: 'Generated scene',
            feedback: 'Immediate result',
            value: 'Shows the model output as a world to inspect, not a disconnected benchmark image.'
          },
          {
            action: 'Canvas expansion',
            feedback: 'Continue beyond the edge',
            value: 'Turns outpainting into a concrete spatial operation: the frame grows and the image continues.'
          }
        ],
        annotations: [
          { x: 50, y: 52, side: 'right', label: 'Enter the demo', detail: 'The original site starts as a staged demo. Click Enter before inspecting the interaction path.' },
          { x: 24, y: 30, side: 'right', label: 'Gallery / prompt examples', detail: 'After entering, examples give visitors a first action before they know outpainting.' },
          { x: 36, y: 78, side: 'right', label: 'Scroll to outpainting', detail: 'The “beyond the horizon” section turns expansion beyond the frame into the core task.' }
        ]
      },
      {
        type: 'evidence',
        variant: 'xl',
        category: 'CHAPTER 02 / NUWA XL',
        label: '05',
        title: 'I made long-video generation readable as a time structure, not just a final clip.',
        subtitle: 'Capability: NUWA XL generates long videos by organizing sparse visual moments and filling temporal gaps over time.',
        content: 'If the page only shows the final video, the visitor sees an output but misses why the model is different. I used filmstrip, timeline, keyframes, and staged filling to show how the result is built across time.',
        demoUrl: 'https://msra-nuwa.azurewebsites.net/#/NUWAXL',
        fallbackImage: '/projects/nuwa-series/nuwa-xl-preview.png',
        fallbackAlt: 'NUWA XL page preview showing a long video generation demo.',
        buttonLabel: 'Open NUWA XL page',
        caption: 'Evidence caption: the visual should not be a plain page screenshot. It should annotate sparse keyframes, filled intermediate frames, and the progress spine so the reader can see how the model organizes time.',
        items: [
          {
            number: 'A',
            title: 'Technology capability',
            subtitle: 'What the model does',
            description: 'Generate longer video by treating the output as a sequence over time rather than a single image-like result.'
          },
          {
            number: 'B',
            title: 'User understanding problem',
            subtitle: 'Where visitors get stuck',
            description: 'A final video clip can look impressive but does not explain duration, continuity, keyframes, or how the model fills the moments between them.'
          },
          {
            number: 'C',
            title: 'My design decision',
            subtitle: 'Familiar interaction model',
            description: 'Use a filmstrip and timeline because people already read video as frames on a line: start, middle, end, then the in-between frames.'
          },
          {
            number: 'D',
            title: 'How it appears on the page',
            subtitle: 'Interface evidence',
            description: 'Keyframe cards mark sparse moments; the timeline bar shows progress; the dense frame strip makes coarse-to-fine filling visible.'
          },
          {
            number: 'E',
            title: 'Why this works',
            subtitle: 'Reduced learning cost',
            description: 'The visitor can understand “long video” as organized time. The model difference is visible before reading any architecture description.'
          },
          {
            number: 'F',
            title: 'What to show visually',
            subtitle: 'Portfolio asset direction',
            description: 'Use a keyframes → timeline → filled frames diagram, plus a marked screenshot or short GIF showing the page moving from sparse moments to long-video preview.'
          }
        ],
        rows: [
          {
            action: 'Sparse keyframes',
            feedback: 'Anchor moments',
            value: 'Shows the visitor what the model uses as the story spine.'
          },
          {
            action: 'Coarse-to-fine fill',
            feedback: 'Intermediate frames',
            value: 'Makes the invisible filling process legible as the sequence becomes denser.'
          },
          {
            action: 'Timeline / progress',
            feedback: 'Duration cue',
            value: 'Helps the reader understand scale and continuity, not only output quality.'
          }
        ],
        annotations: [
          { x: 18, y: 26, side: 'right', label: 'Sparse keyframes', detail: 'A few anchor moments make the generation process readable.' },
          { x: 58, y: 42, side: 'left', label: 'Filled frames', detail: 'Dense frames show the model completing the temporal gaps.' },
          { x: 74, y: 78, side: 'left', label: 'Timeline spine', detail: 'Progress bar communicates duration and continuity.' }
        ]
      },
      {
        type: 'evidence',
        variant: 'drag',
        category: 'CHAPTER 03 / DragNUWA',
        label: '06',
        title: 'I used a drawn trajectory because prompt text is too vague for motion.',
        subtitle: 'Capability: DragNUWA controls generated video with text, an image, and a trajectory path that tells the model where movement should go.',
        content: 'A user can write “a bird flies across the sky,” but prompt text alone does not clearly specify path, direction, endpoint, or camera movement. I framed the trajectory as the control the visitor can draw directly on the scene.',
        demoUrl: 'https://www.microsoft.com/en-us/research/project/dragnuwa/',
        fallbackImage: '/projects/nuwa-series/dragnuwa-preview.png',
        fallbackAlt: 'DragNUWA Microsoft Research page preview.',
        buttonLabel: 'Open DragNUWA page',
        caption: 'Evidence caption: the diagram should make the three inputs impossible to miss: text describes intent, image anchors the scene, and the path tells the model how motion should travel.',
        items: [
          {
            number: 'A',
            title: 'Technology capability',
            subtitle: 'What the model does',
            description: 'Generate controllable video from three inputs: a text prompt, a reference image, and a trajectory path.'
          },
          {
            number: 'B',
            title: 'User understanding problem',
            subtitle: 'Where visitors get stuck',
            description: 'People can describe the subject in words, but movement is spatial. Prompt text makes users translate a path into language, which is slow and imprecise.'
          },
          {
            number: 'C',
            title: 'My design decision',
            subtitle: 'Familiar interaction model',
            description: 'Use drawing and dragging. The visitor can show motion by placing a path on the image instead of inventing a long prompt.'
          },
          {
            number: 'D',
            title: 'How it appears on the page',
            subtitle: 'Interface evidence',
            description: 'The interface needs to display the text, image, and trajectory together, with the path sitting on top of the scene and ending with a direction cue.'
          },
          {
            number: 'E',
            title: 'Why this works',
            subtitle: 'Reduced learning cost',
            description: 'The visitor immediately sees that controllable video is different from text-only generation: the path is an input, not decoration.'
          },
          {
            number: 'F',
            title: 'What to show visually',
            subtitle: 'Portfolio asset direction',
            description: 'Use a three-input relationship diagram and an annotated path overlay. Show start point, endpoint, arrow direction, and how the prompt/image/path each affect the result.'
          }
        ],
        rows: [
          {
            action: 'Text',
            feedback: 'Subject intent',
            value: 'Names what should happen, but does not precisely define the route.'
          },
          {
            action: 'Image',
            feedback: 'Scene anchor',
            value: 'Shows where the subject and camera live before motion starts.'
          },
          {
            action: 'Drawn path',
            feedback: 'Motion route',
            value: 'Turns direction and endpoint into a visible instruction the model can use.'
          }
        ],
        annotations: [
          { x: 18, y: 62, side: 'right', label: 'Start point', detail: 'The user begins motion on the object or camera path.' },
          { x: 54, y: 38, side: 'left', label: 'Drawn trajectory', detail: 'The path carries direction and rhythm that a prompt cannot express precisely.' },
          { x: 84, y: 52, side: 'left', label: 'Endpoint', detail: 'The arrow makes the intended final movement explicit.' }
        ]
      },
      {
        type: 'interaction-mapping',
        variant: 'series',
        category: 'DESIGN WORK SUMMARY',
        label: '07',
        title: 'The repeated design move: turn a model term into a user action and a page state.',
        subtitle: 'This is where my interaction design work sits: understanding what the research model can do, then choosing the page control and feedback that makes that capability visible.',
        rows: [
          {
            action: 'NUWA-Infinity',
            feedback: 'Prompt + gallery + canvas edge',
            value: 'Outpainting becomes a sequence: choose input, inspect result, expand beyond the frame, compare what changed.'
          },
          {
            action: 'NUWA XL',
            feedback: 'Filmstrip + timeline + keyframes',
            value: 'Long-video generation becomes a visible time structure instead of a single final clip.'
          },
          {
            action: 'DragNUWA',
            feedback: 'Text + image + drawn path',
            value: 'Motion control becomes something the visitor can draw and inspect, not only describe in words.'
          },
          {
            action: 'My contribution',
            feedback: 'Entry, flow, states, feedback, evidence',
            value: 'The websites became places where visitors could test the research idea themselves, not just read an announcement.'
          }
        ]
      },
      {
        type: 'outcomes',
        variant: 'series',
        category: 'WHAT THIS CASE STUDY SHOULD PROVE',
        label: '08',
        title: 'I can design interaction for technology before the product pattern is obvious.',
        subtitle: 'The value is not that the pages look novel. The value is that a non-technical visitor can understand what to try, what changed, and why the model is different.',
        content: 'My design work translated research capability into entry points, user flows, states, feedback, and annotated evidence.',
        items: [
          {
            title: 'Understanding the model',
            description: 'I first identified what each model needed to prove: image space can expand, video can be organized over time, and motion can be directed.'
          },
          {
            title: 'Choosing the right control',
            description: 'I matched each capability with a familiar control: canvas expansion for outpainting, timeline for long video, and drag path for trajectory control.'
          },
          {
            title: 'Designing evidence',
            description: 'I connected screenshots, demo windows, and diagrams to specific claims so hiring readers can see what design decision each visual proves.'
          },
          {
            title: 'Turning a demo into an experience',
            description: 'The page shifts from “here is a research result” to “try this action and inspect what the model did.”'
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
        title: 'Interaction Layer',
        content: 'Mapped spatial generation, long-video generation, and motion control to concrete web controls.',
        decisionPoints: ['Canvas expansion', 'Timeline and keyframes', 'Drawn trajectory']
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
    shortDescription: '我如何把三个 Microsoft Research 生成式 AI 模型，做成用户能通过 prompt、画布、时间线和路径控制理解的网页 demo。',
    coverImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
    tags: ['Research Demo UX', '画布扩展', '时间线交互', '轨迹控制', 'Microsoft Research'],
    externalLinks: {
      live: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
      github: 'https://github.com/microsoft/NUWA/blob/main/NUWAInfinity.md'
    },
    caseSections: [
      {
        type: 'hero',
        variant: 'series',
        title: 'NUWA Series — 为早期生成式 AI Demo 设计可操作的网页体验',
        subtitle: '我的工作是把研究模型能力变成用户能亲自试的网页动作：输入 prompt、选择示例、扩展图像边界、阅读时间线，或者直接画出运动路径。',
        bgImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        tags: ['Prompt 到图像世界', 'Outpainting', '长视频时间线', '轨迹控制'],
        role: '交互设计师 / Web 体验设计师',
        date: '2022-2023'
      },
      {
        type: 'stats',
        variant: 'series',
        category: '我负责的 demo 体验层',
        label: '01',
        title: '我不是在给研究结果做视觉包装，而是在设计用户如何理解它。',
        subtitle: '每个模型都有技术故事，但访客打开网页时首先需要知道：我能做什么？点完会发生什么？这个结果强在哪里？',
        content: '我的工作集中在交互体验层：让用户不先读论文，也能通过页面动作读懂模型能力。',
        stats: [
          { value: '01', label: '把模型能力变成用户能开始的页面任务' },
          { value: '02', label: '选择用户熟悉的控制：prompt、gallery、画布、时间线、路径' },
          { value: '03', label: '设计状态和反馈，让结果可以被阅读、比较、继续操作' },
          { value: '04', label: '让网页成为 demo 本身，而不是论文发布页的海报' }
        ]
      },
      {
        type: 'series-timeline',
        category: '能力演进',
        label: '02',
        title: '模型能力变化后，交互问题也跟着变化。',
        subtitle: '我把这个 case study 按用户需要理解的内容来讲：空间、时间，然后是运动控制。',
        content: '这三个项目不是平均介绍功能，而是展示三种不同 AI 能力分别带来的设计问题。',
        items: [
          {
            number: '01',
            title: 'NUWA-Infinity',
            subtitle: '空间 / 无限图像生成',
            description: '用户需要看懂生成可以继续超出原图边界，所以页面要把 prompt、示例、图像边界和 outpainting 串成一个流程。'
          },
          {
            number: '02',
            title: 'NUWA XL',
            subtitle: '时间 / 长视频生成',
            description: '只放最终视频不能解释长视频生成，所以页面需要时间线、胶片条、关键帧和 coarse-to-fine 的提示。'
          },
          {
            number: '03',
            title: 'DragNUWA',
            subtitle: '运动 / 轨迹控制',
            description: 'Prompt 很难描述运动路线，所以 demo 需要让用户看到 text、image 和画出的 path 是如何一起工作的。'
          }
        ]
      },
      {
        type: 'cards',
        variant: 'series',
        category: '我如何让 demo 被读懂',
        label: '03',
        title: '每个抽象技术词，都必须在页面上变成一个看得见的操作。',
        content: '我只在交互能帮助解释模型时使用“好玩”的形式。用户应该通过一个小动作看到模型改变了什么。',
        items: [
          {
            title: '先给用户一个第一步',
            description: '在 NUWA-Infinity 里，第一步不是“读论文”，而是选择 prompt 或示例，然后看到模型能继续生成的图像世界。'
          },
          {
            title: '让输入和结果保持连接',
            description: 'Prompt、被选中的示例、生成图、扩展结果需要在一条路径里出现，用户才能知道哪个动作带来了哪个输出。'
          },
          {
            title: '用媒介本身的结构解释技术',
            description: '图像用画布边界，长视频用胶片条和时间线，运动控制用路径和终点箭头。界面形状本身就在解释模型能力。'
          },
          {
            title: '告诉读者该看哪里',
            description: '截图、demo 和图解都要有标注：输入从哪里开始、模型结果在哪里出现、生成后到底变了什么。'
          }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: '第一章 / NUWA-Infinity',
        label: '04',
        title: '我把 outpainting 设计成用户能跟着走的“画布扩展”任务。',
        subtitle: '技术能力：NUWA-Infinity 可以从文字、图像或视频输入生成高质量图像/视频，也可以把一张图继续扩展到原始边界之外。',
        content: '页面首先要回答一个很基础的问题：“这个 AI 能做什么，我应该先试哪里？” 我用 prompt、gallery 示例、图像边界和继续生成，组成用户的理解路径。',
        demoUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
        fallbackImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        fallbackAlt: 'NUWA-Infinity 网站预览图，展示生成图像世界和项目入口。',
        buttonLabel: '打开 NUWA-Infinity',
        caption: '证据说明：请先在 live demo 里点击 Enter。进入后看页面如何从 prompt/gallery 示例过渡到生成图像证据，再滚到 outpainting 区域，看它如何引导用户继续向原图边界之外生成。',
        items: [
          {
            number: 'A',
            title: '技术能力是什么',
            subtitle: '模型能做什么',
            description: '从文字或图像输入生成一个视觉世界，并把这个世界继续延展到原图边界之外。'
          },
          {
            number: 'B',
            title: '用户理解难点是什么',
            subtitle: '访客会卡在哪里',
            description: '“Infinite visual synthesis”不是用户一看就懂的概念。访客可能不知道应该输入、点示例、比较图片，还是继续往下滚。'
          },
          {
            number: 'C',
            title: '我的设计判断是什么',
            subtitle: '选择熟悉的交互模型',
            description: '先用 prompt 和 gallery 作为入口，再展示生成示例，最后把 outpainting 表达成“扩大画布边界”。'
          },
          {
            number: 'D',
            title: '界面上如何体现',
            subtitle: '页面证据',
            description: 'Hero 直接说明 NUWA-Infinity，gallery 提供可点的场景，outpainting 区域用 “beyond the horizon” 引导用户理解边界外继续生成。'
          },
          {
            number: 'E',
            title: '为什么这样有效',
            subtitle: '降低理解成本',
            description: '用户不需要先理解论文术语，而是通过 prompt、生成结果和扩展边界，看到图像可以继续向外生长。'
          },
          {
            number: 'F',
            title: '应该配什么图',
            subtitle: '作品集素材方向',
            description: '用带标注的原网页截图，加一张 prompt → 生成结果 → 扩展边界 → 预览对比的流程图。live demo 必须留在这一章里。'
          }
        ],
        rows: [
          {
            action: 'Prompt / 示例',
            feedback: '第一步',
            value: '在用户还不理解 outpainting 前，先给一个安全的开始方式。'
          },
          {
            action: '生成场景',
            feedback: '即时结果',
            value: '把模型输出展示成一个可检查的图像世界，而不是孤立的 benchmark 图片。'
          },
          {
            action: '画布扩展',
            feedback: '越过图像边界',
            value: '把 outpainting 变成具体空间操作：画框变大，图像继续延展。'
          }
        ],
        annotations: [
          { x: 50, y: 52, side: 'right', label: '先进入 demo', detail: '原网站先用舞台式入口开始。点击 Enter 后再检查交互路径。' },
          { x: 24, y: 30, side: 'right', label: 'Gallery / prompt 示例', detail: '进入后，示例先给用户一个可点的第一步。' },
          { x: 36, y: 78, side: 'right', label: '滚到 outpainting', detail: '“beyond the horizon” 区域把越过边界继续生成变成核心任务。' }
        ]
      },
      {
        type: 'evidence',
        variant: 'xl',
        category: '第二章 / NUWA XL',
        label: '05',
        title: '我把长视频生成讲成“时间结构”，而不是只放一个最终视频。',
        subtitle: '技术能力：NUWA XL 通过组织稀疏视觉时刻，并补齐时间空隙来生成长视频。',
        content: '如果页面只放最终视频，访客只能看到结果，却看不出模型为什么特别。我用 filmstrip、timeline、关键帧和阶段式补帧来表现结果是如何跨时间生成的。',
        demoUrl: 'https://msra-nuwa.azurewebsites.net/#/NUWAXL',
        fallbackImage: '/projects/nuwa-series/nuwa-xl-preview.png',
        fallbackAlt: 'NUWA XL 页面预览图，展示长视频生成 demo。',
        buttonLabel: '打开 NUWA XL 页面',
        caption: '证据说明：这一章不应该只放网页截图。视觉需要标出稀疏关键帧、中间帧补齐和进度时间线，让读者看到模型如何组织时间。',
        items: [
          {
            number: 'A',
            title: '技术能力是什么',
            subtitle: '模型能做什么',
            description: '把视频当成跨时间的序列来生成，而不是只生成一张图或一个短片段。'
          },
          {
            number: 'B',
            title: '用户理解难点是什么',
            subtitle: '访客会卡在哪里',
            description: '最终视频看起来可能很酷，但它不能解释时长、连续性、关键帧，以及模型如何补齐中间时刻。'
          },
          {
            number: 'C',
            title: '我的设计判断是什么',
            subtitle: '选择熟悉的交互模型',
            description: '用 filmstrip 和 timeline，因为用户已经习惯把视频理解成时间线上的帧：开始、中段、结束，以及中间被补齐的画面。'
          },
          {
            number: 'D',
            title: '界面上如何体现',
            subtitle: '页面证据',
            description: '关键帧卡片标记稀疏时刻，时间线展示进度，密集帧序列让 coarse-to-fine 的补齐过程可见。'
          },
          {
            number: 'E',
            title: '为什么这样有效',
            subtitle: '降低理解成本',
            description: '用户能把“长视频”理解成被组织起来的时间，而不是只靠技术文字相信模型更强。'
          },
          {
            number: 'F',
            title: '应该配什么图',
            subtitle: '作品集素材方向',
            description: '做一张 keyframes → timeline → filled frames 的图解，再配一个带标注截图或短 GIF，展示从稀疏时刻到长视频预览的过程。'
          }
        ],
        rows: [
          {
            action: '稀疏关键帧',
            feedback: '锚点时刻',
            value: '让用户先看到模型用哪些画面作为故事骨架。'
          },
          {
            action: 'Coarse-to-fine 补齐',
            feedback: '中间帧',
            value: '把看不见的生成过程表达成帧序列逐渐变密。'
          },
          {
            action: '时间线 / 进度',
            feedback: '时长提示',
            value: '帮助读者理解尺度和连续性，而不只是输出质量。'
          }
        ],
        annotations: [
          { x: 18, y: 26, side: 'right', label: '稀疏关键帧', detail: '少量锚点先让生成过程可读。' },
          { x: 58, y: 42, side: 'left', label: '中间帧补齐', detail: '密集帧展示模型如何补完时间空隙。' },
          { x: 74, y: 78, side: 'left', label: '时间线骨架', detail: '进度条传达时长和连续性。' }
        ]
      },
      {
        type: 'evidence',
        variant: 'drag',
        category: '第三章 / DragNUWA',
        label: '06',
        title: '我用“画轨迹”解决 prompt 很难描述运动的问题。',
        subtitle: '技术能力：DragNUWA 用 text、image 和 trajectory path 三种输入来控制生成视频里的运动方向。',
        content: '用户可以写“鸟飞过天空”，但很难用 prompt 精确描述路线、方向、终点或镜头运动。我把 trajectory 设计成用户直接画在场景上的控制方式。',
        demoUrl: 'https://www.microsoft.com/en-us/research/project/dragnuwa/',
        fallbackImage: '/projects/nuwa-series/dragnuwa-preview.png',
        fallbackAlt: 'DragNUWA Microsoft Research 页面预览图。',
        buttonLabel: '打开 DragNUWA 页面',
        caption: '证据说明：图里必须清楚看到三种输入的关系：文字描述意图，图片固定场景，轨迹线告诉模型运动应该怎么走。',
        items: [
          {
            number: 'A',
            title: '技术能力是什么',
            subtitle: '模型能做什么',
            description: '从文字 prompt、参考图像和一条运动轨迹生成可控视频。'
          },
          {
            number: 'B',
            title: '用户理解难点是什么',
            subtitle: '访客会卡在哪里',
            description: '用户能用文字描述主体，但运动是空间问题。只用 prompt 等于让用户把一条路径翻译成句子，既慢又不准确。'
          },
          {
            number: 'C',
            title: '我的设计判断是什么',
            subtitle: '选择熟悉的交互模型',
            description: '用拖拽和绘制路径。用户不需要写很长的 prompt，而是可以在图片上直接画出运动。'
          },
          {
            number: 'D',
            title: '界面上如何体现',
            subtitle: '页面证据',
            description: '界面需要把 text、image 和 trajectory 同时展示出来，路径覆盖在场景上，并用终点箭头说明方向。'
          },
          {
            number: 'E',
            title: '为什么这样有效',
            subtitle: '降低理解成本',
            description: '用户一眼能看出 controllable video 和普通 text-to-video 不同：path 是输入，不是装饰线。'
          },
          {
            number: 'F',
            title: '应该配什么图',
            subtitle: '作品集素材方向',
            description: '做一张三输入关系图和一张轨迹标注图，标出起点、终点、箭头方向，以及 prompt/image/path 分别控制什么。'
          }
        ],
        rows: [
          {
            action: 'Text',
            feedback: '主体意图',
            value: '说明视频大概要发生什么，但不能精准定义路线。'
          },
          {
            action: 'Image',
            feedback: '场景锚点',
            value: '说明运动发生在什么画面、哪个对象或镜头上。'
          },
          {
            action: 'Drawn path',
            feedback: '运动路线',
            value: '把方向和终点变成模型可以使用的可见指令。'
          }
        ],
        annotations: [
          { x: 18, y: 62, side: 'right', label: '起点', detail: '用户从对象或镜头运动的开始位置画起。' },
          { x: 54, y: 38, side: 'left', label: '轨迹线', detail: '路径承载 prompt 很难说清的方向和节奏。' },
          { x: 84, y: 52, side: 'left', label: '终点', detail: '箭头让最终运动意图明确。' }
        ]
      },
      {
        type: 'interaction-mapping',
        variant: 'series',
        category: '设计工作总结',
        label: '07',
        title: '我反复做的一件事：把模型术语变成用户动作和页面状态。',
        subtitle: '这就是我的交互设计工作：先理解研究模型到底要证明什么，再选择能让这个能力被看见的页面控制和反馈。',
        rows: [
          {
            action: 'NUWA-Infinity',
            feedback: 'Prompt + gallery + 画布边界',
            value: 'Outpainting 被组织成：选择输入、检查结果、越过边界、比较变化。'
          },
          {
            action: 'NUWA XL',
            feedback: '胶片条 + 时间线 + 关键帧',
            value: '长视频生成被表现成可见的时间结构，而不是一个最终视频。'
          },
          {
            action: 'DragNUWA',
            feedback: 'Text + image + 画出的路径',
            value: '运动控制变成用户可以画出来、检查出来的东西，而不是只靠文字描述。'
          },
          {
            action: '我的贡献',
            feedback: '入口、流程、状态、反馈、证据',
            value: '网页从“展示研究结果”，变成“用户可以亲自试这个研究想法”。'
          }
        ]
      },
      {
        type: 'outcomes',
        variant: 'series',
        category: '这个 case study 要证明什么',
        label: '08',
        title: '我能在产品范式还不清楚时，为新技术设计可理解的交互。',
        subtitle: '这个项目的价值不在于网页看起来新奇，而在于非技术用户能知道试什么、看什么、模型到底强在哪里。',
        content: '我的设计工作是把研究能力落到入口、流程、状态、反馈和可标注的界面证据上。',
        items: [
          {
            title: '理解模型能力',
            description: '我先判断每个模型要证明什么：图像空间可以扩展、视频可以被时间组织、运动可以被直接控制。'
          },
          {
            title: '选择正确控制方式',
            description: '我把能力对应到具体控制：outpainting 用画布扩展，长视频用时间线，trajectory control 用拖拽路径。'
          },
          {
            title: '设计证据',
            description: '我让截图、demo 和图解都服务于一个明确 claim：这张图到底证明了哪个设计判断。'
          },
          {
            title: '把 demo 做成体验',
            description: '页面从“这里有一个研究成果”，变成“试这个动作，然后检查模型做了什么”。'
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
        title: '交互体验层',
        content: '把空间生成、长视频生成和运动控制分别落到具体网页控件上。',
        decisionPoints: ['画布扩展', '时间线与关键帧', '画出的轨迹']
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

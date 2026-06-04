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
    title: 'NUWA-Infinity',
    category: 'C-Side',
    platform: 'Web',
    year: '2022',
    role: 'Interaction Designer / Web Experience Designer',
    shortDescription: 'A Microsoft Research case study on designing prompt, gallery, canvas expansion, preview, and live-demo evidence for an early generative AI model.',
    coverImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
    tags: ['Research Demo UX', 'Prompt Interaction', 'Canvas Expansion', 'Outpainting', 'Microsoft Research'],
    externalLinks: {
      live: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
      github: 'https://github.com/microsoft/NUWA/blob/main/NUWAInfinity.md'
    },
    caseSections: [
      {
        type: 'hero',
        variant: 'series',
        title: 'NUWA-Infinity — Spatial Exploration',
        subtitle: 'I designed an interaction experience that helped early generative AI feel understandable, explorable, and controllable through prompt, gallery, canvas expansion, and preview.',
        bgImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        tags: ['Prompt to Image World', 'Gallery Entry', 'Canvas Expansion', 'Live Demo Evidence'],
        role: 'Interaction Designer / Web Experience Designer',
        date: '2022'
      },
      {
        type: 'stats',
        variant: 'series',
        category: 'SUBPAGE INTRODUCTION',
        label: '01',
        title: 'This subpage had to explain a research model through actions, not through a paper abstract.',
        subtitle: 'NUWA-Infinity was an early Microsoft Research generative AI demo for generating and extending visual content. The first-visit problem was not visual polish; it was helping people know what to try and what the result proved.',
        content: 'I treated the page as an interaction translation layer between model capability and visitor behavior: prompt entry, example selection, canvas boundary, preview, and live verification.',
        stats: [
          { value: '01', label: 'Project context: early generative AI / multimodal AI research demo' },
          { value: '02', label: 'User problem: no mature AI UX pattern for visitors to recognize' },
          { value: '03', label: 'Design challenge: explain outpainting without requiring paper-reading first' },
          { value: '04', label: 'Design rule: every paragraph points to a visible control, screenshot, or live interaction' }
        ]
      },
      {
        type: 'cards',
        variant: 'series',
        category: 'DESIGN PRINCIPLES',
        label: '02',
        title: 'The interaction rules I used before designing the page modules.',
        content: 'Each rule is tied to a concrete interface element so the hiring reader can see what I actually designed.',
        items: [
          {
            title: 'Start with a concrete first action',
            description: 'Prompt input and gallery examples give the visitor something to try before they understand the research term “infinite visual synthesis.”'
          },
          {
            title: 'Make the model output inspectable',
            description: 'Large generated scenes work as evidence. The visitor can look at the result before reading a technical explanation.'
          },
          {
            title: 'Turn outpainting into an edge action',
            description: 'The key control is the image boundary. Expanding the edge is easier to understand than describing outpainting in model language.'
          },
          {
            title: 'Keep proof inside the page',
            description: 'Annotated screenshots and an embedded live demo let readers verify the interaction instead of taking the case study text on trust.'
          }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: 'WEBSITE SCREENSHOT + FUNCTION MAP',
        label: '03',
        title: 'I use the website screenshot as a map of the interaction, not as a full-page decoration.',
        subtitle: 'The screenshot should mark the entry, prompt/gallery examples, generated image world, and outpainting path.',
        content: 'The reader should understand where the visitor starts, where the model result appears, and which later section proves infinite visual synthesis.',
        fallbackImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        fallbackAlt: 'NUWA-Infinity website screenshot used as an annotated interaction map.',
        caption: 'Evidence caption: this screenshot anchors the reading path: entry, example gallery, generated image world, and the later outpainting task.',
        items: [
          {
            number: '1',
            title: 'User problem',
            subtitle: 'Where the page can fail',
            description: 'A first-time visitor cannot infer what to try from the model name alone. They need to see a start point and a result area.'
          },
          {
            number: '2',
            title: 'Design decision',
            subtitle: 'How I organized the page',
            description: 'I structured the page as start → inspect → expand → compare, so each model capability becomes a visitor action.'
          },
          {
            number: '3',
            title: 'Interaction evidence',
            subtitle: 'What the screenshot should prove',
            description: 'The marked areas point to the entry, generated scene, and later outpainting path instead of showing an unannotated full-page capture.'
          },
          {
            number: '4',
            title: 'Design value',
            subtitle: 'Why it matters',
            description: 'The hiring reader can connect each claim to a specific part of the interface and see that my role was interaction design, not visual dressing.'
          }
        ],
        rows: [
          {
            action: 'Entry',
            feedback: 'Click Enter / start the demo',
            value: 'Turns a research page into something the visitor can begin using immediately.'
          },
          {
            action: 'Prompt + gallery',
            feedback: 'Choose a familiar input path',
            value: 'Gives the visitor a safe first action before they know the model vocabulary.'
          },
          {
            action: 'Generated image world',
            feedback: 'Inspect what the model produced',
            value: 'Makes the output visible as a space that can later be extended.'
          }
        ],
        annotations: [
          { x: 50, y: 52, side: 'right', label: 'Demo entry', detail: 'The first task is to enter and start exploring, not read a paper abstract.' },
          { x: 24, y: 30, side: 'right', label: 'Prompt / gallery path', detail: 'Examples create a first action before visitors know the research term.' },
          { x: 72, y: 74, side: 'left', label: 'Continue outward', detail: 'The lower page path leads toward the outpainting interaction.' }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: 'FEATURE 01 / INPUT AND EXAMPLE ENTRY',
        label: '04',
        title: 'Prompt and gallery turn an unfamiliar model into a first action.',
        subtitle: 'Technology capability: generate a visual world from a text or image input.',
        content: 'When users first meet a research demo, they often do not know whether they should read, type, scroll, or click. I placed familiar input patterns before research language.',
        fallbackImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        fallbackAlt: 'NUWA-Infinity page preview highlighting prompt and gallery entry.',
        caption: 'Evidence caption: the image should be annotated around the entry area, prompt/gallery examples, and generated result area so the reader sees how the first action connects to the output.',
        items: [
          {
            number: '1',
            title: 'User problem',
            subtitle: 'No obvious first move',
            description: 'A visitor may not know whether NUWA-Infinity expects text, an example image, or passive viewing.'
          },
          {
            number: '2',
            title: 'Design decision',
            subtitle: 'Use known input patterns',
            description: 'I used prompt and gallery because people already understand typing an idea or choosing an example as a way to start.'
          },
          {
            number: '3',
            title: 'Interaction evidence',
            subtitle: 'What to mark on the interface',
            description: 'Call out the prompt/gallery entry, the selected example, and the result area. These three UI parts explain input → output.'
          },
          {
            number: '4',
            title: 'Design value',
            subtitle: 'Why this helps understanding',
            description: 'The model stops feeling like a black-box research name and becomes a system the visitor can query and inspect.'
          }
        ],
        rows: [
          {
            action: 'Prompt input',
            feedback: 'Type an idea',
            value: 'Uses the most familiar interaction for text-to-image exploration.'
          },
          {
            action: 'Gallery examples',
            feedback: 'Pick instead of inventing',
            value: 'Reduces blank-page anxiety when visitors do not yet know what prompts work.'
          },
          {
            action: 'Generated result',
            feedback: 'Inspect the output',
            value: 'Connects the chosen input to a visible image world before moving into outpainting.'
          }
        ],
        annotations: [
          { x: 26, y: 31, side: 'right', label: 'First input', detail: 'Prompt or example selection gives the visitor a concrete first action.' },
          { x: 54, y: 58, side: 'left', label: 'Generated scene', detail: 'The output is large enough to inspect as a visual world.' },
          { x: 74, y: 76, side: 'left', label: 'Next task cue', detail: 'The page can then lead the visitor toward expanding the boundary.' }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        layout: 'immersive',
        category: 'FEATURE 02 / CANVAS EXPANSION',
        label: '05',
        title: 'I translated outpainting into expanding the image boundary.',
        subtitle: 'Technology capability: continue the generated scene beyond the original frame.',
        content: 'The important interaction is the edge. The user needs to see that the model is not replacing the image, but extending it into new space.',
        fallbackImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        fallbackAlt: 'Canvas expansion diagram using NUWA-Infinity generated imagery.',
        caption: 'Evidence caption: this visual should show the original frame, the boundary line, the generated continuation area, and the action that asks the visitor to continue beyond the edge.',
        items: [
          {
            number: '1',
            title: 'User problem',
            subtitle: 'Outpainting is not obvious',
            description: 'If the page only says “infinite visual synthesis,” visitors may not understand that the model continues an existing image outside its frame.'
          },
          {
            number: '2',
            title: 'Design decision',
            subtitle: 'Use canvas expansion',
            description: 'I used the image boundary as the interaction model: the frame can grow, and the visual world continues into the new area.'
          },
          {
            number: '3',
            title: 'Interaction evidence',
            subtitle: 'What to mark on the interface',
            description: 'Show the original frame, a highlighted boundary, and the new generated region so the user sees what changed after the expand action.'
          },
          {
            number: '4',
            title: 'Design value',
            subtitle: 'Why this helps understanding',
            description: 'The abstract AI ability becomes a spatial action: extend the edge, inspect the continuation, then decide whether to keep exploring.'
          }
        ],
        rows: [
          {
            action: 'Original boundary',
            feedback: 'What already exists',
            value: 'Gives the visitor a stable reference before generation changes the image.'
          },
          {
            action: 'Expanded area',
            feedback: 'Where AI will continue',
            value: 'Makes the invisible model operation visible as a new canvas region.'
          },
          {
            action: 'Preview result',
            feedback: 'What changed',
            value: 'Lets the visitor compare the generated continuation against the original frame.'
          }
        ],
        annotations: [
          { x: 26, y: 38, side: 'right', label: 'Original frame', detail: 'The user starts from a visible image boundary.' },
          { x: 48, y: 38, side: 'left', label: 'Expandable edge', detail: 'The boundary becomes the control point for outpainting.' },
          { x: 72, y: 38, side: 'left', label: 'Generated continuation', detail: 'The new area explains “infinity” as visible space.' }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        layout: 'contained',
        category: 'FEATURE 03 / PREVIEW AND SELECTION',
        label: '06',
        title: 'Preview and comparison make the generated continuation readable.',
        subtitle: 'Technology capability: produce possible continuations from the same starting image.',
        content: 'A single final output would hide the design logic. I framed preview as a decision point: compare what changed, pick a direction, and continue exploring.',
        fallbackImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        fallbackAlt: 'NUWA-Infinity preview and selection interaction diagram.',
        caption: 'Evidence caption: this module should show prompt → generate → expand → preview/select, then call out how before/after comparison helps visitors read the model result.',
        items: [
          {
            number: '1',
            title: 'User problem',
            subtitle: 'The result can feel arbitrary',
            description: 'If visitors only see one final image, they may not know what part was generated, whether it followed the prompt, or how to evaluate it.'
          },
          {
            number: '2',
            title: 'Design decision',
            subtitle: 'Use preview and comparison',
            description: 'I treated the generated continuation as something to inspect: show before/after, show candidates, then let the visitor continue from a chosen result.'
          },
          {
            number: '3',
            title: 'Interaction evidence',
            subtitle: 'What to mark on the interface',
            description: 'Call out the preview candidates, the selected result, and the before/after comparison area.'
          },
          {
            number: '4',
            title: 'Design value',
            subtitle: 'Why this helps understanding',
            description: 'The visitor gains control because the page explains what changed and gives them a reason to choose the next step.'
          }
        ],
        rows: [
          {
            action: 'Before / after',
            feedback: 'What changed',
            value: 'Separates the original frame from generated continuation.'
          },
          {
            action: 'Candidate preview',
            feedback: 'What can be selected',
            value: 'Shows the model output as options, not a single unexplained image.'
          },
          {
            action: 'Continue exploring',
            feedback: 'What comes next',
            value: 'Makes the demo feel iterative: prompt, generate, extend, inspect, continue.'
          }
        ],
        annotations: [
          { x: 28, y: 40, side: 'right', label: 'Original result', detail: 'The first generated frame stays visible for comparison.' },
          { x: 52, y: 40, side: 'left', label: 'Selected continuation', detail: 'The chosen option shows what the model added beyond the edge.' },
          { x: 70, y: 76, side: 'left', label: 'Before / after', detail: 'Comparison makes the AI change easier to judge.' }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: 'LIVE DEMO INTERACTION BOARD',
        label: '07',
        title: 'Try the original page where the design claims are being made.',
        subtitle: 'The live demo is embedded inside the NUWA-Infinity chapter because it is interaction evidence, not a separate plugin.',
        content: 'Use the window on the right as a small browser. Click Enter, choose a prompt or example, scroll to outpainting, then inspect preview and comparison. If the target site blocks iframe embedding, the module falls back to the preview image and keeps an external open button.',
        demoUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
        fallbackImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        fallbackAlt: 'NUWA-Infinity live demo fallback preview.',
        buttonLabel: 'Open live demo',
        caption: 'Evidence caption: this embedded browser asks the reader to verify the same interaction path described in the text: input prompt → choose example → expand boundary → preview and compare. On mobile, use the preview and open the original demo in a new tab.',
        items: [
          {
            number: '1',
            title: 'User problem',
            subtitle: 'Static screenshots are not enough',
            description: 'The most important part of this project is the sequence of actions. A single screenshot cannot prove how the interaction works.'
          },
          {
            number: '2',
            title: 'Design decision',
            subtitle: 'Embed the demo as evidence',
            description: 'The iframe lets readers operate the original project inside the case study and compare the live behavior with the annotated explanation.'
          },
          {
            number: '3',
            title: 'Interaction evidence',
            subtitle: 'What to try',
            description: 'Enter the demo, use prompt/gallery examples, move toward the outpainting section, and inspect how the page presents continuation beyond the frame.'
          },
          {
            number: '4',
            title: 'Fallback behavior',
            subtitle: 'If iframe is blocked',
            description: 'Show the screenshot/GIF preview, explain that embedding may be blocked by security policy, and keep an “Open live demo” button.'
          }
        ],
        rows: [
          {
            action: '1. Enter',
            feedback: 'Start the staged demo',
            value: 'The browser window preserves the original first step so readers can see the project as a real web experience.'
          },
          {
            action: '2. Prompt / gallery',
            feedback: 'Choose or type input',
            value: 'This verifies that the page starts with familiar actions rather than research vocabulary.'
          },
          {
            action: '3. Expand / preview',
            feedback: 'Inspect what changed',
            value: 'This verifies the main design claim: outpainting is presented as extending a visible image boundary.'
          },
          {
            action: '4. External open',
            feedback: 'Fallback path',
            value: 'If iframe embedding fails or the reader is on mobile, the case study still offers a direct path to the original project.'
          }
        ],
        annotations: [
          { x: 50, y: 52, side: 'right', label: '1. Click Enter', detail: 'Start the original NUWA-Infinity stage before inspecting the flow.' },
          { x: 24, y: 30, side: 'right', label: '2. Prompt / example', detail: 'Look for the first input path the page gives to non-technical visitors.' },
          { x: 38, y: 78, side: 'right', label: '3. Expand boundary', detail: 'Scroll to the outpainting area and watch how the page explains continuation.' },
          { x: 76, y: 78, side: 'left', label: '4. Preview / compare', detail: 'Use the result preview to judge what changed after generation.' }
        ]
      },
      {
        type: 'outcomes',
        variant: 'series',
        category: 'DESIGN SUMMARY',
        label: '08',
        title: 'What this NUWA-Infinity page proves about my interaction design work.',
        subtitle: 'I designed the layer that lets non-technical visitors understand and control an early generative AI capability.',
        content: 'My contribution was to understand the research capability, translate it into familiar web actions, and create enough interface evidence for visitors to explore without reading the paper first.',
        items: [
          {
            title: 'Read the technical capability',
            description: 'I identified that the page needed to prove image space could continue beyond an existing boundary.'
          },
          {
            title: 'Define entry and flow',
            description: 'I organized the experience around prompt/gallery entry, result inspection, canvas expansion, preview, and continuation.'
          },
          {
            title: 'Design states and evidence',
            description: 'I made the result, boundary, candidates, fallback, and live demo work as visible proof of the interaction logic.'
          },
          {
            title: 'Turn research into exploration',
            description: 'The page shifts from “here is a research result” to “try this action and inspect what the model did.”'
          }
        ]
      }
    ],
    acts: {
      act1: {
        title: 'Spatial Exploration',
        content: 'Focused the case study on NUWA-Infinity and the interaction problem of explaining infinite visual synthesis through page actions.'
      },
      act2: {
        title: 'Interaction Translation',
        content: 'Mapped a research capability to concrete controls and states a visitor can recognize.',
        decisionPoints: ['Prompt and gallery entry', 'Canvas boundary expansion', 'Preview and before/after comparison']
      },
      act3: {
        title: 'Understandable Research Demo',
        content: 'Connected text, screenshots, callouts, and live demo behavior so hiring readers can see the design reasoning behind the page.',
        impact: 'Early AI Interaction Design'
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
    title: 'NUWA-Infinity',
    category: 'C-Side',
    platform: 'Web',
    year: '2022',
    role: '交互设计师 / Web 体验设计师',
    shortDescription: '一个 Microsoft Research 早期生成式 AI case study：我如何设计 prompt、gallery、画布扩展、预览选择和 live demo 证据。',
    coverImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
    tags: ['Research Demo UX', 'Prompt 交互', '画布扩展', 'Outpainting', 'Microsoft Research'],
    externalLinks: {
      live: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
      github: 'https://github.com/microsoft/NUWA/blob/main/NUWAInfinity.md'
    },
    caseSections: [
      {
        type: 'hero',
        variant: 'series',
        title: 'NUWA-Infinity — 空间探索',
        subtitle: '我设计了一套让早期生成式 AI 能力可理解、可探索、可控制的交互体验：从 prompt 输入，到图像生成，再到画布边界扩展和结果预览。',
        bgImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        tags: ['Prompt 到图像世界', 'Gallery 入口', '画布扩展', 'Live Demo 证据'],
        role: '交互设计师 / Web 体验设计师',
        date: '2022'
      },
      {
        type: 'stats',
        variant: 'series',
        category: '子页面介绍',
        label: '01',
        title: '这个子页面需要用一组具体操作解释研究模型，而不是只写论文摘要。',
        subtitle: 'NUWA-Infinity 是 Microsoft Research 早期生成式 AI / multimodal AI demo。用户第一次打开页面时，真正的问题不是“视觉够不够炫”，而是：我应该先做什么？结果说明了什么？为什么它不是普通图片生成？',
        content: '我把页面当成 research model 和非技术访客之间的交互转译层：prompt 输入、示例选择、生成结果、画布边界、预览选择和 live demo 验证都要串成一条可操作路径。',
        stats: [
          { value: '01', label: '项目背景：早期生成式 AI / 多模态 AI research demo' },
          { value: '02', label: '用户问题：当时没有成熟 AI UX pattern 可以直接套用' },
          { value: '03', label: '设计挑战：不要求用户先读论文，也能理解 outpainting' },
          { value: '04', label: '设计原则：每段文案都要指向可见控件、截图或 live interaction' }
        ]
      },
      {
        type: 'cards',
        variant: 'series',
        category: '设计原则',
        label: '02',
        title: '在设计页面模块前，我先确定了这几条交互规则。',
        content: '每条规则都对应一个具体界面元素，方便招聘方看到我真实做了哪些交互设计判断。',
        items: [
          {
            title: '先给用户一个具体第一步',
            description: 'Prompt 输入和 gallery 示例让用户先能做一个动作，而不是一上来就面对 “infinite visual synthesis” 这样的研究术语。'
          },
          {
            title: '让模型结果可以被检查',
            description: '大面积生成图像不是装饰，而是证据。用户可以先看结果，再理解技术解释。'
          },
          {
            title: '把 outpainting 变成边界动作',
            description: '关键控制点是图像边界。用户理解“扩展边缘”比理解模型论文里的 outpainting 更直接。'
          },
          {
            title: '把证据留在页面里',
            description: '带标注的截图和嵌入式 live demo 让读者可以自己验证交互，而不是只相信 case study 文案。'
          }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: '网站截图和功能说明',
        label: '03',
        title: '我把网站截图当成交互地图，而不是一张装饰性的整页预览。',
        subtitle: '这张图需要标出入口、prompt/gallery 示例、生成图像世界，以及通往 outpainting 的路径。',
        content: '读者看这一屏时应该知道：用户从哪里开始，模型结果在哪里出现，后续哪个区域在证明 infinite visual synthesis。',
        fallbackImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        fallbackAlt: 'NUWA-Infinity 网站截图，用作带标注的交互地图。',
        caption: '证据说明：这张截图用于固定阅读路径：入口、示例 gallery、生成图像世界，以及后续的 outpainting 任务。',
        items: [
          {
            number: '1',
            title: '用户问题',
            subtitle: '页面可能失效的地方',
            description: '用户只看到模型名字时，不能自然推断自己应该先点哪里，也不知道结果区域在哪里。'
          },
          {
            number: '2',
            title: '设计决策',
            subtitle: '我如何组织页面',
            description: '我把页面组织成 start → inspect → expand → compare，每个模型能力都对应一个用户动作。'
          },
          {
            number: '3',
            title: '交互证据',
            subtitle: '截图应该证明什么',
            description: '标注入口、生成图像区域和通往 outpainting 的路径，而不是只放一张没有解释的完整网页截图。'
          },
          {
            number: '4',
            title: '设计价值',
            subtitle: '为什么重要',
            description: '招聘方能把每个设计 claim 对应到具体界面位置，看出我的角色是交互设计，而不是视觉包装。'
          }
        ],
        rows: [
          {
            action: '入口',
            feedback: '点击 Enter / 开始 demo',
            value: '把 research page 变成用户可以立刻开始操作的体验。'
          },
          {
            action: 'Prompt + gallery',
            feedback: '选择熟悉的输入路径',
            value: '在用户不知道模型术语前，先给一个安全的第一步。'
          },
          {
            action: '生成图像世界',
            feedback: '检查模型生成了什么',
            value: '把输出展示成一个后续可以继续扩展的空间。'
          }
        ],
        annotations: [
          { x: 50, y: 52, side: 'right', label: 'Demo 入口', detail: '第一件事是进入并开始探索，而不是先读论文摘要。' },
          { x: 24, y: 30, side: 'right', label: 'Prompt / gallery 路径', detail: '示例在用户理解术语前，先提供一个可点击的第一步。' },
          { x: 72, y: 74, side: 'left', label: '继续向外扩展', detail: '页面下方路径把用户带向 outpainting 交互。' }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: '功能 01 / 输入创意和示例入口',
        label: '04',
        title: 'Prompt 和 gallery 把陌生模型变成用户能开始的第一步。',
        subtitle: '技术能力：从文字或图像输入生成一个视觉世界。',
        content: '用户第一次看到 research demo 时，经常不知道应该阅读、输入、滚动还是点击。我把用户熟悉的输入方式放在研究术语前面。',
        fallbackImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        fallbackAlt: 'NUWA-Infinity 页面预览图，重点标注 prompt 和 gallery 入口。',
        caption: '证据说明：这一屏应该标注入口区域、prompt/gallery 示例和生成结果区域，让读者看到第一步如何连接到模型输出。',
        items: [
          {
            number: '1',
            title: '用户问题',
            subtitle: '不知道第一步做什么',
            description: '用户可能不知道 NUWA-Infinity 需要文字、示例图片，还是只是被动观看。'
          },
          {
            number: '2',
            title: '设计决策',
            subtitle: '使用已知输入方式',
            description: '我选择 prompt 和 gallery，因为用户已经熟悉“输入一个想法”或“选择一个示例”来开始探索。'
          },
          {
            number: '3',
            title: '交互证据',
            subtitle: '界面上应该标什么',
            description: '标出 prompt/gallery 入口、被选中的示例和结果区域。这三个 UI 部分解释 input → output。'
          },
          {
            number: '4',
            title: '设计价值',
            subtitle: '为什么帮助理解',
            description: '模型不再只是一个黑盒研究名字，而变成用户可以提问、选择和检查结果的系统。'
          }
        ],
        rows: [
          {
            action: 'Prompt 输入',
            feedback: '输入一个想法',
            value: '使用用户最熟悉的 text-to-image 探索方式。'
          },
          {
            action: 'Gallery 示例',
            feedback: '不用从零想 prompt',
            value: '降低用户不知道该写什么的空白压力。'
          },
          {
            action: '生成结果',
            feedback: '检查输出',
            value: '在进入 outpainting 前，先把输入和生成图像世界连接起来。'
          }
        ],
        annotations: [
          { x: 26, y: 31, side: 'right', label: '第一个输入动作', detail: 'Prompt 或示例选择给用户一个具体开始方式。' },
          { x: 54, y: 58, side: 'left', label: '生成图像世界', detail: '输出区域足够大，用户能把它当成一个空间来检查。' },
          { x: 74, y: 76, side: 'left', label: '下一步提示', detail: '页面随后可以把用户带向边界扩展。' }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        layout: 'immersive',
        category: '功能 02 / 画布扩展',
        label: '05',
        title: '我把 outpainting 转译成“扩大图像边界”的动作。',
        subtitle: '技术能力：把已经生成的场景继续延展到原始画框之外。',
        content: '这个交互的关键不是“又生成了一张图”，而是“边界”。用户需要看到模型不是替换原图，而是在原图之外继续生成新的空间。',
        fallbackImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        fallbackAlt: '使用 NUWA-Infinity 生成图像做成的画布扩展示意图。',
        caption: '证据说明：这一屏应该同时显示原始画框、边界线、模型继续生成的区域，以及提示用户越过边界继续探索的动作。',
        items: [
          {
            number: '1',
            title: '用户问题',
            subtitle: 'Outpainting 不直观',
            description: '如果页面只写 “infinite visual synthesis”，用户不一定知道模型是在原图边界之外继续生成。'
          },
          {
            number: '2',
            title: '设计决策',
            subtitle: '使用画布扩展',
            description: '我把图像边界作为交互模型：画框可以变大，视觉世界会继续延展到新增区域。'
          },
          {
            number: '3',
            title: '交互证据',
            subtitle: '界面上应该标什么',
            description: '标出原始画框、被高亮的边界，以及新生成区域，让用户看到点击扩展后到底改变了哪里。'
          },
          {
            number: '4',
            title: '设计价值',
            subtitle: '为什么帮助理解',
            description: '抽象 AI 能力被转成空间动作：扩展边缘、检查延展结果，再决定是否继续探索。'
          }
        ],
        rows: [
          {
            action: '原始边界',
            feedback: '已有内容',
            value: '在生成改变图像前，给用户一个稳定参照。'
          },
          {
            action: '扩展区域',
            feedback: 'AI 将继续生成的位置',
            value: '把看不见的模型运算表达成一个新增画布区域。'
          },
          {
            action: '结果预览',
            feedback: '看见变化',
            value: '让用户把新增内容和原始画框放在一起比较。'
          }
        ],
        annotations: [
          { x: 26, y: 38, side: 'right', label: '原始画框', detail: '用户从一个可见的图像边界开始。' },
          { x: 48, y: 38, side: 'left', label: '可扩展边界', detail: '边界变成 outpainting 的控制点。' },
          { x: 72, y: 38, side: 'left', label: '生成延展区域', detail: '新增区域把 “infinity” 解释成可见空间。' }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        layout: 'contained',
        category: '功能 03 / 预览与选择',
        label: '06',
        title: '预览和对比让用户读懂生成的延展结果。',
        subtitle: '技术能力：从同一张起始图生成多个可能的延展结果。',
        content: '如果页面只展示一个最终结果，用户很难判断哪里是新增内容、是否符合 prompt、以及下一步该不该继续。我把 preview 设计成一个决策点：比较变化、选择方向、继续探索。',
        fallbackImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        fallbackAlt: 'NUWA-Infinity 预览选择交互示意图。',
        caption: '证据说明：这一屏应该展示 prompt → generate → expand → preview/select，并标出 before/after 如何帮助用户判断模型结果。',
        items: [
          {
            number: '1',
            title: '用户问题',
            subtitle: '结果可能显得随机',
            description: '如果只看到一张最终图，用户不知道哪一部分是生成的，也不知道它是否跟 prompt 有关。'
          },
          {
            number: '2',
            title: '设计决策',
            subtitle: '使用预览和对比',
            description: '我把生成延展当成可检查对象：展示 before/after、展示候选结果，再让用户从某个结果继续。'
          },
          {
            number: '3',
            title: '交互证据',
            subtitle: '界面上应该标什么',
            description: '标出预览候选、被选中的结果，以及 before/after 对比区域。'
          },
          {
            number: '4',
            title: '设计价值',
            subtitle: '为什么帮助理解',
            description: '页面告诉用户生成后到底变了什么，也给出继续选择的理由，因此用户会更有控制感。'
          }
        ],
        rows: [
          {
            action: 'Before / after',
            feedback: '变化在哪里',
            value: '把原始画框和生成延展内容分开看。'
          },
          {
            action: '候选预览',
            feedback: '可以选择什么',
            value: '把模型输出展示成选项，而不是一张无法解释的最终图。'
          },
          {
            action: '继续探索',
            feedback: '下一步做什么',
            value: '让 demo 形成迭代路径：输入、生成、扩展、检查、继续。'
          }
        ],
        annotations: [
          { x: 28, y: 40, side: 'right', label: '原始结果', detail: '第一张生成结果保留下来，方便比较。' },
          { x: 52, y: 40, side: 'left', label: '被选中的延展', detail: '被选结果展示模型在边界外新增了什么。' },
          { x: 70, y: 76, side: 'left', label: 'Before / after', detail: '对比让 AI 改动更容易被判断。' }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: 'Live Demo 交互板块',
        label: '07',
        title: '在原始页面里验证这些设计判断。',
        subtitle: 'Live demo 被嵌入在 NUWA-Infinity 章节里，因为它是交互证据，不是一个独立插件。',
        content: '右侧窗口就是一个小浏览器。读者可以点击 Enter，选择 prompt 或示例，滚动到 outpainting 区域，再检查预览和对比。如果目标网页因为安全策略不允许 iframe 嵌入，模块会显示预览图，并保留外部打开按钮。',
        demoUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
        fallbackImage: '/projects/nuwa-series/nuwa-infinity-cover.png',
        fallbackAlt: 'NUWA-Infinity live demo fallback 预览图。',
        buttonLabel: '打开在线演示',
        caption: '证据说明：这个嵌入式浏览器让读者验证同一条交互路径：输入 prompt → 选择示例 → 扩展边界 → 预览和对比。移动端建议使用预览图并在新标签页打开原项目。',
        items: [
          {
            number: '1',
            title: '用户问题',
            subtitle: '静态截图不够',
            description: '这个项目最重要的是一串动作。单张截图无法证明交互如何发生。'
          },
          {
            number: '2',
            title: '设计决策',
            subtitle: '把 demo 作为证据嵌入',
            description: 'Iframe 让读者可以在 case study 内操作原项目，并把真实行为和页面解释对照起来。'
          },
          {
            number: '3',
            title: '交互证据',
            subtitle: '读者应该试什么',
            description: '进入 demo，使用 prompt/gallery 示例，找到 outpainting 区域，检查页面如何呈现边界外继续生成。'
          },
          {
            number: '4',
            title: 'Fallback 行为',
            subtitle: '如果 iframe 被阻止',
            description: '显示截图/GIF 预览，说明可能是目标网站安全策略，同时保留“打开在线演示”按钮。'
          }
        ],
        rows: [
          {
            action: '1. Enter',
            feedback: '开始舞台式 demo',
            value: '浏览器窗口保留原网站第一步，让读者看到这是一个真实可操作网页体验。'
          },
          {
            action: '2. Prompt / gallery',
            feedback: '选择或输入',
            value: '验证页面确实先用熟悉动作开始，而不是先抛研究术语。'
          },
          {
            action: '3. Expand / preview',
            feedback: '检查变化',
            value: '验证核心设计 claim：outpainting 被表达成扩展可见图像边界。'
          },
          {
            action: '4. External open',
            feedback: '备用路径',
            value: '如果 iframe 失败或读者在移动端，case study 仍然提供通向原项目的入口。'
          }
        ],
        annotations: [
          { x: 50, y: 52, side: 'right', label: '1. 点击 Enter', detail: '先进入原始 NUWA-Infinity 舞台，再检查流程。' },
          { x: 24, y: 30, side: 'right', label: '2. Prompt / 示例', detail: '观察页面给非技术用户的第一条输入路径。' },
          { x: 38, y: 78, side: 'right', label: '3. 扩展边界', detail: '滚动到 outpainting 区域，看页面如何解释继续生成。' },
          { x: 76, y: 78, side: 'left', label: '4. 预览 / 对比', detail: '通过结果预览判断生成后发生了什么变化。' }
        ]
      },
      {
        type: 'outcomes',
        variant: 'series',
        category: '设计总结',
        label: '08',
        title: '这个 NUWA-Infinity 页面证明了我的哪些交互设计工作。',
        subtitle: '我设计的是让非技术用户理解并控制早期生成式 AI 能力的体验层。',
        content: '我的贡献是先理解 research model 能力，再把它转译成用户熟悉的网页动作，并提供足够清楚的界面证据，让用户不读论文也能探索。',
        items: [
          {
            title: '读懂技术能力',
            description: '我先判断页面需要证明什么：图像空间可以越过已有边界继续生成。'
          },
          {
            title: '定义入口和流程',
            description: '我把体验组织成 prompt/gallery 入口、结果检查、画布扩展、预览选择和继续探索。'
          },
          {
            title: '设计状态和证据',
            description: '我让结果、边界、候选、fallback 和 live demo 都成为可见的交互逻辑证据。'
          },
          {
            title: '把研究变成探索',
            description: '页面从“这里有一个研究成果”，变成“试这个动作，然后检查模型做了什么”。'
          }
        ]
      }
    ],
    acts: {
      act1: {
        title: '空间探索',
        content: '把 case study 聚焦在 NUWA-Infinity，以及如何通过页面动作解释 infinite visual synthesis。'
      },
      act2: {
        title: '交互转译',
        content: '把 research capability 映射成用户熟悉的具体控件和状态。',
        decisionPoints: ['Prompt 和 gallery 入口', '画布边界扩展', '预览与 before/after 对比']
      },
      act3: {
        title: '可理解的 Research Demo',
        content: '把文案、截图、callout 和 live demo 行为绑定起来，让招聘方看到页面背后的设计推理。',
        impact: '早期 AI 交互设计'
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

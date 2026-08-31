import { CareerStage, Project } from './types';

const FIGMA_READ_ALOUD_SLIDES = Array.from(
  { length: 18 },
  (_, index) => `/projects/figma-portfolio/read-aloud/page-${String(index + 1).padStart(2, '0')}.png`
);

const FIGMA_COPILOT_CMC_IMAGE_EDITING_SLIDES = Array.from(
  { length: 12 },
  (_, index) => `/projects/figma-portfolio/copilot-cmc-image-editing/page-${String(index + 1).padStart(2, '0')}.png`
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

const FIGMA_PROBTS_SLIDES = Array.from(
  { length: 7 },
  (_, index) => `/projects/figma-portfolio/probts/page-${String(index + 1).padStart(2, '0')}.png`
);

const FIGMA_RODIN_DIFFUSION_SLIDES = Array.from(
  { length: 9 },
  (_, index) => `/projects/figma-portfolio/rodin-diffusion/page-${String(index + 1).padStart(2, '0')}.png`
);

const behanceOriginal = (projectSlug: string, index: number, extension = 'jpg') =>
  `/projects/figma-portfolio/${projectSlug}/behance-originals/behance-original-${String(index).padStart(2, '0')}.${extension}`;

const FIGMA_VALUE_COMPASS_SLIDES = Array.from(
  { length: 14 },
  (_, index) => behanceOriginal('value-compass', index + 1)
);

const VALUE_COMPASS_COVER_IMAGE = behanceOriginal('value-compass', 1);

const SALONE_DEL_MOBILE_SLIDES = Array.from(
  { length: 31 },
  (_, index) => behanceOriginal('salone-del-mobile', index + 1)
);

const SALONE_DEL_MOBILE_COVER_IMAGE = behanceOriginal('salone-del-mobile', 1);

const BATTERYML_VISUAL_SLIDES = Array.from(
  { length: 14 },
  (_, index) => behanceOriginal('batteryml-visual-design', index + 1, index === 1 ? 'gif' : 'jpg')
);

const BATTERYML_VISUAL_COVER_IMAGE = behanceOriginal('batteryml-visual-design', 1);

const FERA_SLIDES = Array.from(
  { length: 8 },
  (_, index) => behanceOriginal('fera', index + 1)
);

const FERA_COVER_IMAGE = behanceOriginal('fera', 1);

const PROFILTUBI_REBRANDING_SLIDES = Array.from(
  { length: 51 },
  (_, index) => behanceOriginal('profiltubi-rebranding', index + 1)
);

const PROFILTUBI_REBRANDING_COVER_IMAGE = behanceOriginal('profiltubi-rebranding', 1);

const IOETE_COVER_IMAGE = '/projects/figma-portfolio/ioete-tea-shop/behance-originals/behance-original-01.jpg';

const FIGMA_IOETE_SLIDES = Array.from(
  { length: 7 },
  (_, index) => `/projects/figma-portfolio/ioete-tea-shop/behance-originals/behance-original-${String(index + 1).padStart(2, '0')}.jpg`
);

const FIGMA_ILLUSTRATION_SLIDES = Array.from(
  { length: 3 },
  (_, index) => `/projects/figma-portfolio/illustration-works/page-${String(index + 1).padStart(2, '0')}.png`
);

const RODIN_DIFFUSION_COVER_IMAGE = '/projects/figma-portfolio/rodin-diffusion/page-01.png';
const LANTERN_HOMECOMING_COVER_IMAGE = '/projects/lantern-homecoming/placeholder-cover.svg';

// ===== CAREER TIMELINE - English =====
export const CAREER_TIMELINE_EN: CareerStage[] = [
  {
    id: 'c1',
    period: 'Feb 2025 - Present',
    company: 'Microsoft STCA',
    role: 'UI/UX Designer',
    oneLiner: 'Designing Copilot and interaction prototypes across Office voice UX and lightweight H5 experiences.',
    skills: ['Copilot Voice', 'Office UX', 'Interaction Prototype', 'H5 Flow'],
    image: '/timeline-scenes/STAC.webp',
    relatedProjectIds: ['p23', 'p1']
  },
  {
    id: 'c2',
    period: 'Jun 2022 - Feb 2025',
    company: 'Microsoft Research Asia',
    role: 'UI/UX Designer, Graphic Designer',
    oneLiner: 'Translated AI research capabilities into demos, agent workflows, visual systems, and research communication.',
    skills: ['AI Agents', 'Research Demos', 'Visual Systems', 'AIGC UX'],
    image: '/timeline-scenes/MSRA.webp',
    relatedProjectIds: ['p3', 'p5']
  },
  {
    id: 'c3',
    period: 'Aug 2021 - Dec 2021',
    company: 'FOM Studio Milan',
    role: 'Design Intern',
    oneLiner: 'Built brand identity and commercial visual systems for studio clients in Milan.',
    skills: ['Brand Identity', 'Retail Visuals', 'Logo System'],
    image: '/timeline-scenes/fom-milan-packaging-studio.webp',
    relatedProjectIds: ['p7', 'p18']
  },
  {
    id: 'c4',
    period: '2020 - 2021',
    company: 'NABA Milan & Study in Italy',
    role: 'Visual Communication Design',
    oneLiner: "Master's training at a Milan design academy, grounding visual communication in critique, brand systems, and editorial web.",
    skills: ['Design Academy', 'Brand Systems', 'Editorial Web'],
    image: '/timeline-scenes/NABA.webp',
    relatedProjectIds: ['p19', 'p16']
  }
];

// ===== CAREER TIMELINE - 中文 =====
export const CAREER_TIMELINE_ZH: CareerStage[] = [
  {
    id: 'c1',
    period: '2025年2月 - 至今',
    company: 'Microsoft STCA',
    role: 'UI/UX 设计师',
    oneLiner: '围绕 Copilot、Office 语音体验和轻量 H5 交互原型推进产品设计。',
    skills: ['Copilot Voice', 'Office UX', '交互原型', 'H5 流程'],
    image: '/timeline-scenes/STAC.webp',
    relatedProjectIds: ['p23', 'p1']
  },
  {
    id: 'c2',
    period: '2022年6月 - 2025年2月',
    company: 'Microsoft Research Asia',
    role: 'UI/UX 设计师, 平面设计师',
    oneLiner: '把 AI 研究能力转译成 demo、Agent 工作流、视觉系统和研究传播项目。',
    skills: ['AI Agent', '研究 Demo', '视觉系统', 'AIGC UX'],
    image: '/timeline-scenes/MSRA.webp',
    relatedProjectIds: ['p3', 'p5']
  },
  {
    id: 'c3',
    period: '2021年8月 - 2021年12月',
    company: 'FOM Studio Milan',
    role: '设计实习生',
    oneLiner: '在米兰工作室参与商业品牌项目，将品牌识别和应用视觉系统落地。',
    skills: ['品牌识别', '零售视觉', 'Logo 系统'],
    image: '/timeline-scenes/fom-milan-packaging-studio.webp',
    relatedProjectIds: ['p7', 'p18']
  },
  {
    id: 'c4',
    period: '2020 - 2021',
    company: 'NABA 米兰与意大利留学',
    role: '视觉传达设计',
    oneLiner: '在米兰设计学院完成视觉传达训练，用评图、品牌系统和编辑式网页建立设计底盘。',
    skills: ['设计学院', '品牌系统', '编辑式网页'],
    image: '/timeline-scenes/NABA.webp',
    relatedProjectIds: ['p19', 'p16']
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
    id: 'p23',
    title: 'Copilot CMC Image Editing',
    category: 'C-Side',
    platform: 'Web',
    year: '2025',
    role: 'Lead UX & Product Designer',
    shortDescription: 'AI image editing flow for Copilot CMC, connecting selection, prompt input, and result iteration in chat.',
    coverImage: '/projects/figma-portfolio/copilot-cmc-image-editing/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_COPILOT_CMC_IMAGE_EDITING_SLIDES,
    },
    tags: ['Copilot', 'AI Image Editing', 'Selection UX', 'Mobile UX', 'Brush Interaction', 'Result Iteration'],
    externalLinks: {
      behance: 'https://www.figma.com/design/1MdXjP52UK8cwvVo6VgzHD/Portfolio?node-id=635-37806&m=dev'
    },
    acts: {
      act1: {
        title: 'Where + What Split',
        content: 'Designed an image editing flow where users mark the area to change and describe what the edit should become.'
      },
      act2: {
        title: 'Selection-Based Editing',
        content: 'Moved editing entry points into image cards and detail views, then used a clean canvas, brush size, and visible selection states to reduce prompt burden.',
        decisionPoints: ['Image card and detail-page entry', 'Clean editing canvas', 'Purple mask and dashed boundary', 'Brush size control', 'Prompt bound to selection']
      },
      act3: {
        title: 'Contextual Result Loop',
        content: 'Kept edited results in the same Copilot conversation so users could continue editing, reuse, download, or give feedback without restarting.',
        impact: 'AI Image Editing Flow'
      }
    }
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
    year: '2022–2023',
    role: 'Interaction Designer / Web Experience Designer',
    shortDescription: 'A Microsoft Research demo series case study: turning outpainting, long video, and trajectory control into web actions people could actually try.',
    coverImage: '/projects/nuwa-series/verified/infinity-hero-01-project.png',
    tags: ['Research Demo UX', 'NUWA Series', 'Image Outpainting', 'Long Video', 'Trajectory Control', 'Microsoft Research'],
    externalLinks: {
      live: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
      github: 'https://github.com/microsoft/NUWA/blob/main/NUWAInfinity.md'
    },
    caseSections: [
      {
        type: 'hero',
        variant: 'series',
        title: 'NUWA-Infinity — Making outpainting feel like extending a picture by hand',
        subtitle: 'Turning image outpainting into an interactive research demo',
        content: 'This case study follows three Microsoft Research demos in browsing order: NUWA-Infinity, NUWA XL, and DragNUWA. My work was to understand what the models could do, then turn those behaviors into actions on the page: extend an image, follow time in a video, and draw motion on a picture.',
        bgImage: '/projects/nuwa-series/verified/infinity-hero-01-project.png',
        tags: ['NUWA-Infinity', 'NUWA XL', 'DragNUWA', 'Research Demo UX'],
        role: 'Interaction Design / Web Experience Design · Microsoft Research AI Demo Series',
        demoUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
        buttonLabel: 'Try the original demo',
        date: '2022–2023'
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: 'Project Background / Design Challenge',
        label: '01',
        title: 'Early AI demos needed to answer a basic question: what can I do here?',
        subtitle: 'The NUWA series introduced unfamiliar behaviors: image outpainting, long video generation, and trajectory-controlled video. A first-time visitor might not know what to type, where the image extends, why a timeline matters, or what a trajectory controls.',
        content: 'I organized the experience around actions users already knew: choose an entry, generate, extend an edge, read a timeline, draw a motion path, and compare output.',
        fallbackImage: '/projects/nuwa-series/verified/infinity-01-landing-enter.png',
        fallbackAlt: 'Original NUWA-Infinity landing screen showing the research demo stage and navigation.',
        caption: 'The NUWA site works best when it is read as a demo users can enter, scan, and try, rather than a paper summary.',
        items: [
          {
            number: '?',
            title: 'Where do I start?',
            description: 'Prompt and Gallery carry the first step instead of acting as decorative options.'
          },
          {
            number: '?',
            title: 'Where is outpainting happening?',
            description: 'The boundary must be visible so users can see where the image continues.'
          },
          {
            number: '?',
            title: 'How is a long video organized?',
            description: 'Keyframes and timeline make generated time visible before the final video plays.'
          },
          {
            number: '?',
            title: 'How do I control motion?',
            description: 'A drawn trajectory makes movement clearer than prompt text alone.'
          }
        ],
        annotations: [
          { x: 23, y: 18, side: 'right', label: 'Series entry', detail: 'The page frames NUWA as a demo users can enter.' },
          { x: 53, y: 45, side: 'left', label: 'Generated image stage', detail: 'Real results appear before technical explanation.' },
          { x: 82, y: 78, side: 'left', label: 'Next project path', detail: 'Browsing order moves from space to time to motion.' }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: 'Interaction walkthrough',
        label: '02',
        title: '01 / NUWA-Infinity: outpainting becomes “continue past this edge.”',
        subtitle: 'A first-time visitor may not know how to start or which part of the image will extend. The interface has to show both the entry point and the edge.',
        content: 'I designed the flow as Prompt / Gallery → current image → boundary → preview. Prompt keeps the user in control, Gallery gives a safe example, and the visible edge shows where the model continues the scene.',
        fallbackImage: '/projects/nuwa-series/verified/infinity-05-outpainting-result.png',
        fallbackAlt: 'Original NUWA-Infinity outpainting result screen with generated continuation and candidate preview strip.',
        caption: 'Infinite visual synthesis becomes a concrete path: pick a start, inspect the edge, then compare what appears outside the original image.',
        items: [
          {
            number: '1',
            title: 'User issue',
            description: 'Users do not know where to begin or which part of the image AI will extend.'
          },
          {
            number: '2',
            title: 'My decision',
            description: 'Use Prompt and Gallery as two entry modes, then make the image boundary the next action.'
          },
          {
            number: '3',
            title: 'User benefit',
            description: 'Users can try the model without reading the paper and immediately see what changed.'
          }
        ],
        annotations: [
          { x: 55, y: 45, side: 'left', label: 'Generated continuation', detail: 'The large result makes the extended image inspectable.' },
          { x: 45, y: 78, side: 'left', label: 'Preview / compare point', detail: 'Users can judge where the new content begins.' },
          { x: 64, y: 86, side: 'left', label: 'Candidate strip', detail: 'Multiple outputs keep exploration open.' }
        ]
      },
      {
        type: 'evidence',
        variant: 'xl',
        category: 'Interaction walkthrough',
        label: '03',
        title: '02 / NUWA XL: long video becomes scripts, stages, and output.',
        subtitle: 'A final video alone does not show why long video generation is hard. Users need to see how prompts, frames, and stages hold the video together over time.',
        content: 'I used script cards, a process rail, and example browsing so visitors could read the plan before treating the final video as proof.',
        fallbackImage: '/projects/nuwa-series/verified/xl-03-generate-frames-stage.png',
        fallbackAlt: 'Original NUWA XL page showing the generation process rail.',
        caption: 'Long video generation becomes a visible process: read the prompt beats, follow the stage, then compare the output.',
        items: [
          {
            number: '1',
            title: 'User issue',
            description: 'Visitors cannot tell how a long generated video is planned if they only see the final clip.'
          },
          {
            number: '2',
            title: 'My decision',
            description: 'Use keyframes, filmstrip, timeline, and coarse-to-fine stages to show temporal organization.'
          },
          {
            number: '3',
            title: 'User benefit',
            description: 'Non-technical readers can understand “first plan the sequence, then complete the motion.”'
          }
        ],
        annotations: [
          { x: 37, y: 18, side: 'right', label: 'Sparse keyframes', detail: 'Global frames explain the video structure before playback.' },
          { x: 45, y: 51, side: 'right', label: 'Intermediate frames', detail: 'Local generation fills the time gaps.' },
          { x: 63, y: 78, side: 'left', label: 'Dense timeline', detail: 'The final result reads as continuous video, not one image.' }
        ]
      },
      {
        type: 'evidence',
        variant: 'drag',
        category: 'Interaction walkthrough',
        label: '04',
        title: '03 / DragNUWA: motion control becomes a path users draw.',
        subtitle: 'Prompt text can describe a scene, but it is weak at direction, path, speed, and camera behavior.',
        content: 'I framed DragNUWA around three connected inputs: Text says intent, Image fixes the scene, and Trajectory shows how the motion should move before users review the generated video.',
        fallbackImage: '/projects/nuwa-series/verified/drag-05-text-image-drag.png',
        fallbackAlt: 'Original DragNUWA page showing text, image, and drag controls together.',
        caption: 'The trajectory overlay turns hard-to-describe motion into something users can point to and judge.',
        items: [
          {
            number: '1',
            title: 'User issue',
            description: 'A prompt cannot precisely say where an object or camera should move.'
          },
          {
            number: '2',
            title: 'My decision',
            description: 'Let users draw the movement path directly on the image and keep text, image, and trajectory visible together.'
          },
          {
            number: '3',
            title: 'User benefit',
            description: 'Motion intent becomes visible and controllable before the generated video is reviewed.'
          }
        ],
        annotations: [
          { x: 16, y: 43, side: 'right', label: 'Text intent', detail: 'Words describe the scene or motion goal.' },
          { x: 52, y: 36, side: 'left', label: 'Image context', detail: 'The starting image anchors what should move.' },
          { x: 83, y: 55, side: 'left', label: 'Drawn trajectory', detail: 'Red paths show direction and motion control.' }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: 'Try the original interaction',
        label: '05',
        title: 'Try the Original Interaction',
        subtitle: 'Directly experience the web interaction I designed',
        content: 'Use the original NUWA-Infinity demo to verify the interaction path: enter the site, choose a starting point, find the image boundary, then compare the generated continuation.',
        demoUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
        fallbackImage: '/projects/nuwa-series/verified/infinity-01-landing-enter.png',
        fallbackAlt: 'NUWA-Infinity live demo fallback preview.',
        buttonLabel: 'Open full demo',
        caption: 'The original demo is hosted externally. If it does not load inside the portfolio, open it in a new tab or watch the recorded walkthrough.',
        items: [
          {
            number: '1',
            title: 'Click Enter to enter the demo',
            description: ''
          },
          {
            number: '2',
            title: 'Choose a start from Gallery or Prompt',
            description: ''
          },
          {
            number: '3',
            title: 'Find the image boundary / outpainting area',
            description: ''
          },
          {
            number: '4',
            title: 'Compare the generated continuation',
            description: ''
          }
        ]
      },
      {
        type: 'outcomes',
        variant: 'series',
        category: 'My design work',
        label: '06',
        title: 'What This Project Shows About My Design Work',
        subtitle: 'The work was not visual packaging. I turned early AI research into page-level actions first-time visitors could follow.',
        content: 'Across the series, I designed how people enter the demo, understand the model behavior, control the input, and judge the output across space, time, and motion.',
        items: [
          {
            title: 'Defined first-use paths',
            description: 'Prompt / Gallery → Generate → Expand → Preview gives NUWA-Infinity a clear first visit path.'
          },
          {
            title: 'Mapped model behavior to interface actions',
            description: 'Space becomes an extendable edge, time becomes stages and examples, and motion becomes a drawn trajectory.'
          },
          {
            title: 'Designed user control moments',
            description: 'Preview, before/after comparison, and continue-explore choices give users room to judge output.'
          },
          {
            title: 'Made a research demo explorable',
            description: 'Non-technical visitors can understand the research by operating the page before reading the paper.'
          }
        ]
      }
    ],
    acts: {
      act1: {
        title: 'First-Use Path',
        content: 'Defined how users move from Prompt / Gallery into generation, expansion, preview, and continued exploration.'
      },
      act2: {
        title: 'Model-to-Interaction Translation',
        content: 'Mapped model behavior to concrete controls across space, time, and motion.',
        decisionPoints: ['Prompt / Gallery entry', 'Canvas boundary expansion', 'Keyframes and timeline', 'Text / image / trajectory control']
      },
      act3: {
        title: 'Understandable Research Demo',
        content: 'Connected copy, screenshots, callouts, and live demo behavior so hiring readers can see the design decisions behind each interface.',
        impact: 'Early AI Interaction Design'
      }
    }
  },
  {
    id: 'p20',
    title: 'RODIN Diffusion',
    category: 'C-Side',
    platform: 'Web',
    year: '2022',
    role: 'Interaction Designer / Web Experience Designer / Front-end Developer',
    shortDescription: 'A PPT-sourced case study for presenting 3D avatar generation, interaction ideas, and web page states.',
    coverImage: RODIN_DIFFUSION_COVER_IMAGE,
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      en: FIGMA_RODIN_DIFFUSION_SLIDES,
      zh: FIGMA_RODIN_DIFFUSION_SLIDES,
    },
    tags: ['Microsoft Research', '3D Avatar', 'Diffusion Model', 'Research Demo UX', 'Front-end'],
    externalLinks: {
      behance: 'https://www.figma.com/design/lscl0BysjMvjXiMwVrZQhM/PPT?node-id=82-22&m=dev'
    },
    acts: {
      act1: {
        title: 'PPT Source Case',
        content: 'Organized the original PPT pages as the source presentation for RODIN Diffusion.'
      },
      act2: {
        title: '3D Avatar Interaction Ideas',
        content: 'Presented grid, color, portrait-guided creation, text-guided creation, and avatar editing page states from the PPT.',
        decisionPoints: ['PPT source order', 'Portrait-guided avatar creation', 'Text-guided avatar creation', 'Text-guided avatar editing']
      },
      act3: {
        title: 'Reader Delivery',
        content: 'Displayed the original PPT content as exported pages in the portfolio reader.',
        impact: '9 PPT Pages'
      }
    }
  },
  {
    id: 'p21',
    title: 'From Spring Festival Homecoming to Lantern Night Return',
    category: 'C-Side',
    platform: 'Web',
    year: '2025',
    role: 'Product Designer / UI Designer / Vibe Coding Collaborator',
    shortDescription: 'A festival mini game case study about translating a Spring Festival homecoming concept into a Lantern Festival story experience.',
    coverImage: LANTERN_HOMECOMING_COVER_IMAGE,
    coverDisplay: 'cover',
    coverAspectRatio: 4 / 3,
    tags: ['Vibe Coding', 'Festival H5', 'Mini Game', 'Theme Translation', 'UI Design', 'Share Card'],
    caseSections: [
      {
        type: 'text',
        title: 'From Spring Festival Homecoming to Lantern Night Return'
      }
    ],
    acts: {
      act1: {
        title: 'Theme Pivot',
        content: 'Kept the emotional core of homecoming, journey, and reunion when the activity timing moved from Spring Festival to Lantern Festival.'
      },
      act2: {
        title: 'Game Flow Design',
        content: 'Restructured the experience from a simple holiday challenge into story selection, quiz rounds, ending collection, and Train Ticket sharing.',
        decisionPoints: ['Story card entry', 'Lantern progress feedback', 'Ending collection', 'Ticket-style sharing result']
      },
      act3: {
        title: 'Vibe Coding to Product Experience',
        content: 'Used Vibe Coding for a runnable prototype, then refined theme, visuals, components, and multi-device presentation through design judgment.',
        impact: 'Festival Story Game'
      }
    }
  },
  {
    id: 'p4',
    title: 'ReMe - AI Companion',
    category: 'C-Side',
    platform: 'Mobile',
    year: '2024',
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
    coverImage: IOETE_COVER_IMAGE,
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_IOETE_SLIDES,
    },
    tags: ['Brand Identity', 'Packaging Design', 'Visual System', 'Print Design', 'Adobe Creative Suite'],
    externalLinks: {
      behance: 'https://www.behance.net/gallery/207609085/ioete'
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
    year: '2025',
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
    year: '2026',
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
    title: 'Value Compass & Visual System Web',
    category: 'B-Side',
    platform: 'Web',
    year: '2024',
    role: 'UI/UX Designer',
    shortDescription: 'AI value-alignment research interface plus a companion web design in the same visual system.',
    coverImage: VALUE_COMPASS_COVER_IMAGE,
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_VALUE_COMPASS_SLIDES,
    },
    gallery: FIGMA_VALUE_COMPASS_SLIDES,
    tags: ['AI Research', 'Value Alignment', 'Visual System', 'Web Design', 'Figma'],
    acts: {
      act1: {
        title: 'Research Communication',
        content: 'The project needed a concise visual system for communicating AI value-alignment research across interface and web surfaces.'
      },
      act2: {
        title: 'Interface & System',
        content: 'Preserved the research interface and companion web design as one connected visual-system case.',
        decisionPoints: ['Research clarity', 'Interface structure', 'Web visual system']
      },
      act3: {
        title: 'Reader Delivery',
        content: 'Displayed the Behance source assets as a high-resolution reader.',
        impact: '14 Source Assets'
      }
    }
  },
  {
    id: 'p16',
    title: 'Salone del Mobile',
    category: 'C-Side',
    platform: 'Web',
    year: '2021',
    role: 'UI/UX Designer',
    shortDescription: 'Art direction and mobile web concept for Salone del Mobile.',
    coverImage: SALONE_DEL_MOBILE_COVER_IMAGE,
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: SALONE_DEL_MOBILE_SLIDES,
    },
    gallery: SALONE_DEL_MOBILE_SLIDES,
    tags: ['Art Direction', 'UI/UX', 'Mobile Web', 'Editorial Design', 'Behance Source'],
    externalLinks: {
      behance: 'https://www.behance.net/gallery/200906941/salone-del-mobile'
    },
    acts: {
      act1: {
        title: 'Event Website Direction',
        content: 'Explored a mobile-first visual direction for an international design event experience.'
      },
      act2: {
        title: 'Editorial Mobile Flow',
        content: 'Organized the interface around strong typography, device mockups, and browsable content pages.',
        decisionPoints: ['Mobile-first layout', 'Editorial hierarchy', 'Event identity']
      },
      act3: {
        title: 'Behance Source Reader',
        content: 'Added the original Behance source images to the Works reader.',
        impact: '31 Source Assets'
      }
    }
  },
  {
    id: 'p17',
    title: 'BatteryML Visual Design',
    category: 'B-Side',
    platform: 'Digital',
    year: '2024',
    role: 'Visual Designer',
    shortDescription: 'Visual identity and communication design for BatteryML.',
    coverImage: BATTERYML_VISUAL_COVER_IMAGE,
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: BATTERYML_VISUAL_SLIDES,
    },
    gallery: BATTERYML_VISUAL_SLIDES,
    tags: ['Visual Design', 'Research Communication', 'Brand Identity', 'Motion GIF', 'Behance Source'],
    externalLinks: {
      behance: 'https://www.behance.net/gallery/198104963/BatteryML-visual-design'
    },
    acts: {
      act1: {
        title: 'Research Brand Expression',
        content: 'The project needed a distinctive visual system for explaining a technical research direction.'
      },
      act2: {
        title: 'Identity and Visual Assets',
        content: 'Built a visual language around the BatteryML mark, product imagery, and presentation-ready assets.',
        decisionPoints: ['Technical clarity', 'Recognizable symbol', 'Animated communication']
      },
      act3: {
        title: 'Behance Source Reader',
        content: 'Added the original Behance images and GIF to the Works reader.',
        impact: '14 Source Assets'
      }
    }
  },
  {
    id: 'p22',
    title: 'ProbTS Visual Identity',
    category: 'System',
    platform: 'Digital',
    year: '2024',
    role: 'Visual Designer',
    shortDescription: 'An early-stage visual identity exploration for a probabilistic time-series research project at MSRA.',
    coverImage: '/projects/figma-portfolio/probts/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_PROBTS_SLIDES,
    },
    gallery: FIGMA_PROBTS_SLIDES,
    tags: ['MSRA', 'Visual Identity', 'Research Communication', 'Logo Guidelines', 'Time Series'],
    acts: {
      act1: {
        title: 'Research Brand Context',
        content: 'ProbTS needed a lightweight identity direction for presenting probabilistic time-series research.'
      },
      act2: {
        title: 'Early Visual Exploration',
        content: 'Explored logo structure, color rules, auxiliary graphics, and application examples as a compact brand guideline draft.',
        decisionPoints: ['Research-facing identity', 'Logo and color rules', 'Presentation-ready diagrams']
      },
      act3: {
        title: 'Archive Placement',
        content: 'Kept as supporting evidence of MSRA research-brand work, with intentionally modest positioning after the more mature MSRA projects.',
        impact: '7 Source Pages'
      }
    }
  },
  {
    id: 'p18',
    title: 'Fera',
    category: 'B-Side',
    platform: 'Print & Digital',
    year: '2021',
    role: 'Brand Designer',
    shortDescription: 'Visual identity system for Fera.',
    coverImage: FERA_COVER_IMAGE,
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FERA_SLIDES,
    },
    gallery: FERA_SLIDES,
    tags: ['Brand Identity', 'Logo Design', 'Visual System', 'Print & Digital', 'Behance Source'],
    externalLinks: {
      behance: 'https://www.behance.net/gallery/207609497/Fera'
    },
    acts: {
      act1: {
        title: 'Identity Design',
        content: 'Created a focused identity presentation for the Fera brand.'
      },
      act2: {
        title: 'System Application',
        content: 'Extended the logo direction into visual applications and presentation mockups.',
        decisionPoints: ['Logo clarity', 'Applied identity', 'Presentation rhythm']
      },
      act3: {
        title: 'Behance Source Reader',
        content: 'Added the original Behance source images to the Works reader.',
        impact: '8 Source Assets'
      }
    }
  },
  {
    id: 'p19',
    title: 'PROFILTUBI Rebranding',
    category: 'C-Side',
    platform: 'Print & Digital',
    year: '2021',
    role: 'Brand Designer, Group Work',
    shortDescription: 'Group rebranding competition project for PROFILTUBI.',
    coverImage: PROFILTUBI_REBRANDING_COVER_IMAGE,
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: PROFILTUBI_REBRANDING_SLIDES,
    },
    gallery: PROFILTUBI_REBRANDING_SLIDES,
    tags: ['Rebranding', 'Group Work', 'Brand System', 'Print & Digital', 'Behance Source'],
    externalLinks: {
      behance: 'https://www.behance.net/gallery/207608603/PROFILTUBI_Rebranding-competition-(group-work)'
    },
    acts: {
      act1: {
        title: 'Rebranding Competition',
        content: 'A group rebranding proposal for an industrial brand.'
      },
      act2: {
        title: 'Identity System',
        content: 'Organized the brand direction across logo, graphic system, applications, and presentation pages.',
        decisionPoints: ['Industrial identity', 'System consistency', 'Application range']
      },
      act3: {
        title: 'Behance Source Reader',
        content: 'Added the original Behance source images to the Works reader.',
        impact: '51 Source Assets'
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
    id: 'p23',
    title: 'Copilot CMC Image Editing',
    category: 'C-Side',
    platform: 'Web',
    year: '2025',
    role: 'Lead UX & Product Designer',
    shortDescription: 'Copilot / CMC 的 AI 图像编辑体验设计：把选区、编辑描述和结果回流整理成连续的聊天编辑流程。',
    coverImage: '/projects/figma-portfolio/copilot-cmc-image-editing/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_COPILOT_CMC_IMAGE_EDITING_SLIDES,
    },
    tags: ['Copilot', 'AI 图像编辑', '选区 UX', '移动端 UX', '画笔交互', '结果迭代'],
    externalLinks: {
      behance: 'https://www.figma.com/design/1MdXjP52UK8cwvVo6VgzHD/Portfolio?node-id=635-37806&m=dev'
    },
    acts: {
      act1: {
        title: '拆开 where 和 what',
        content: '为 Copilot / CMC 设计图像编辑流程：用户先圈出要修改的区域，再输入希望改成什么。'
      },
      act2: {
        title: '基于选区的图片编辑',
        content: '从聊天图片卡片和图片详情页进入编辑，用干净画布、brush size 和可见选区状态降低 prompt 负担。',
        decisionPoints: ['图片卡片与详情页入口', '干净的编辑画布', '紫色蒙层与虚线边界', 'Brush size 控制', 'Prompt 与选区绑定']
      },
      act3: {
        title: '结果回到对话上下文',
        content: '编辑结果保留在同一条 Copilot 对话里，用户可以继续修改、复用、下载或反馈，不需要重新开始。',
        impact: 'AI 图像编辑流程'
      }
    }
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
    year: '2022–2023',
    role: '交互设计师 / Web 体验设计师',
    shortDescription: '展示 Microsoft Research NUWA 系列三个 demo：把图像外扩、长视频和轨迹控制做成用户真的能操作的网页体验。',
    coverImage: '/projects/nuwa-series/verified/infinity-hero-01-project.png',
    tags: ['Research Demo UX', 'NUWA Series', '图像外扩', '长视频生成', '轨迹控制', 'Microsoft Research'],
    externalLinks: {
      live: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
      github: 'https://github.com/microsoft/NUWA/blob/main/NUWAInfinity.md'
    },
    caseSections: [
      {
        type: 'hero',
        variant: 'series',
        title: 'NUWA-Infinity — 把 outpainting 做成“亲手把画面往外扩”',
        subtitle: 'Turning image outpainting into an interactive research demo',
        content: '这页按浏览顺序展示 NUWA-Infinity、NUWA XL、DragNUWA 三个 Microsoft Research demo。我的工作是先理解模型到底能做什么，再把这些行为变成页面上的动作：往画面外扩、沿时间看视频、在图上画运动路径。',
        bgImage: '/projects/nuwa-series/verified/infinity-hero-01-project.png',
        tags: ['NUWA-Infinity', 'NUWA XL', 'DragNUWA', 'Research Demo UX'],
        role: 'Interaction Design / Web Experience Design · Microsoft Research AI Demo Series',
        demoUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
        buttonLabel: 'Try the original demo',
        date: '2022–2023'
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: 'Project Background / Design Challenge',
        label: '01',
        title: '早期 AI demo 需要先回答一个问题：我能做什么？',
        subtitle: 'NUWA 系列的行为很陌生：图像外扩、长视频生成、轨迹控制。第一次访问的用户不一定知道 prompt 怎么写、图像在哪里延展、为什么需要时间线，或者 trajectory 到底控制什么。',
        content: '我把体验组织成用户已经熟悉的动作：选择入口、生成、扩展边缘、读时间线、画运动路径、比较输出。',
        fallbackImage: '/projects/nuwa-series/verified/infinity-01-landing-enter.png',
        fallbackAlt: 'Original NUWA-Infinity landing screen showing the research demo stage and navigation.',
        caption: 'NUWA 不是论文摘要页，而是用户可以进入、浏览、操作和比较的 demo。',
        items: [
          {
            number: '?',
            title: '我从哪里开始？',
            description: 'Prompt 和 Gallery 承担第一次探索入口，而不是装饰选项。'
          },
          {
            number: '?',
            title: '图像外扩发生在哪里？',
            description: '边界必须可见，用户才知道 AI 在画面外继续生成。'
          },
          {
            number: '?',
            title: '长视频如何被组织？',
            description: '关键帧和时间线要说明视频不是单张图。'
          },
          {
            number: '?',
            title: '运动怎么控制？',
            description: '画轨迹比只写 prompt 更容易表达方向和路径。'
          }
        ],
        annotations: [
          { x: 23, y: 18, side: 'right', label: '系列入口', detail: '先把 NUWA 定位成可进入的 demo。' },
          { x: 53, y: 45, side: 'left', label: '生成结果舞台', detail: '先看到真实结果，再进入说明。' },
          { x: 82, y: 78, side: 'left', label: '项目浏览顺序', detail: '从空间、时间到运动控制。' }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: 'Interaction walkthrough',
        label: '02',
        title: '01 / NUWA-Infinity：把 outpainting 变成“从这条边继续往外看”',
        subtitle: '第一次访问的用户不一定知道从哪里开始，也不知道画面哪一部分会被延展。界面必须同时说明入口和边界。',
        content: '我把流程拆成 Prompt / Gallery → 当前图像 → 边界 → 预览。Prompt 保留用户控制感，Gallery 给安全示例，可见边缘说明模型会从哪里继续生成。',
        fallbackImage: '/projects/nuwa-series/verified/infinity-05-outpainting-result.png',
        fallbackAlt: 'Original NUWA-Infinity outpainting result screen with generated continuation and candidate preview strip.',
        caption: 'Infinite visual synthesis 被转成一条具体路径：选择起点、检查边界，再比较画面外生成了什么。',
        items: [
          {
            number: '1',
            title: '用户问题',
            description: '不知道从哪里开始，也不知道画面哪里会被 AI 延展。'
          },
          {
            number: '2',
            title: '我的设计决策',
            description: '用 Prompt / Gallery 做双入口，并把图像边界设计成下一步操作位置。'
          },
          {
            number: '3',
            title: '用户效益',
            description: '第一次尝试不需要懂论文术语；用户能立即看到边界外生成了什么。'
          }
        ],
        annotations: [
          { x: 55, y: 45, side: 'left', label: '生成延展结果', detail: '大图保留检查空间。' },
          { x: 45, y: 78, side: 'left', label: '预览 / 对比点', detail: '用户能判断哪里发生变化。' },
          { x: 64, y: 86, side: 'left', label: '候选结果条', detail: '不满意可以继续比较。' }
        ]
      },
      {
        type: 'evidence',
        variant: 'xl',
        category: 'Interaction walkthrough',
        label: '03',
        title: '02 / NUWA XL：把长视频生成讲成脚本、阶段和输出',
        subtitle: '如果只放最终视频，用户看不到模型如何跨时间组织画面，也不理解长视频生成难在哪里。',
        content: '我用脚本卡片、流程轨道和示例浏览，让用户先读懂计划和阶段，再把最终视频当成验证结果。',
        fallbackImage: '/projects/nuwa-series/verified/xl-03-generate-frames-stage.png',
        fallbackAlt: 'Original NUWA XL page showing the generation process rail.',
        caption: '长视频生成被转成可观察的过程：先读 prompt 节点，再跟随阶段，最后比较输出。',
        items: [
          {
            number: '1',
            title: '用户问题',
            description: '不知道长视频为什么难，也看不出帧之间如何连续。'
          },
          {
            number: '2',
            title: '我的设计决策',
            description: '用关键帧、filmstrip、timeline 和 coarse-to-fine 阶段解释生成过程。'
          },
          {
            number: '3',
            title: '用户效益',
            description: '用户不用懂 Diffusion over Diffusion，也能理解“先搭骨架，再补细节”。'
          }
        ],
        annotations: [
          { x: 37, y: 18, side: 'right', label: '稀疏关键帧', detail: '先让用户看到视频骨架。' },
          { x: 45, y: 51, side: 'right', label: '补齐中间帧', detail: '解释连续性如何产生。' },
          { x: 63, y: 78, side: 'left', label: '密集时间线', detail: '最终视频变成可扫描序列。' }
        ]
      },
      {
        type: 'evidence',
        variant: 'drag',
        category: 'Interaction walkthrough',
        label: '04',
        title: '03 / DragNUWA：让用户画出运动路径',
        subtitle: 'Prompt 可以描述场景，但很难精确表达方向、路径、速度和镜头变化。',
        content: '我把控制拆成三种输入：Text 说意图，Image 固定场景，Trajectory 说明怎么动。用户画完路径后，再看生成视频有没有跟上。',
        fallbackImage: '/projects/nuwa-series/verified/drag-05-text-image-drag.png',
        fallbackAlt: 'Original DragNUWA page showing text, image, and drag controls together.',
        caption: '轨迹线把 prompt 难以表达的运动变成用户可以指出、也可以判断的控制。',
        items: [
          {
            number: '1',
            title: '用户问题',
            description: '只靠文字很难说清“往哪里动、怎么动”。'
          },
          {
            number: '2',
            title: '我的设计决策',
            description: '让用户在图像上画出路径，并把文字、图片、轨迹三种输入保持在同一理解框架里。'
          },
          {
            number: '3',
            title: '用户效益',
            description: '运动意图可见，生成结果更可控，用户能理解路径如何影响视频。'
          }
        ],
        annotations: [
          { x: 16, y: 43, side: 'right', label: 'Text 意图', detail: '文字定义场景或运动目标。' },
          { x: 52, y: 36, side: 'left', label: 'Image 上下文', detail: '起始图像锚定运动对象。' },
          { x: 83, y: 55, side: 'left', label: 'Trajectory 轨迹', detail: '红色路径表达方向和控制。' }
        ]
      },
      {
        type: 'evidence',
        variant: 'infinity',
        category: 'Try the original interaction',
        label: '05',
        title: 'Try the Original Interaction',
        subtitle: '直接体验我设计的网页交互',
        content: '用原始 NUWA-Infinity demo 验证这条路径：进入网页、选择起点、找到图像边界，再对比生成后的延展结果。',
        demoUrl: 'https://nuwa-infinity.microsoft.com/#/NUWAInfinity',
        fallbackImage: '/projects/nuwa-series/verified/infinity-01-landing-enter.png',
        fallbackAlt: 'NUWA-Infinity live demo fallback 预览图。',
        buttonLabel: 'Open full demo',
        caption: '原始 demo 托管在外部站点。如果无法在作品集内加载，可以新窗口打开，或观看录屏版交互 walkthrough。',
        items: [
          {
            number: '1',
            title: '点击 Enter 进入 demo',
            description: ''
          },
          {
            number: '2',
            title: '从 Gallery 或 Prompt 选择起点',
            description: ''
          },
          {
            number: '3',
            title: '找到图像边界和 outpainting 区域',
            description: ''
          },
          {
            number: '4',
            title: '对比生成后的延展结果',
            description: ''
          }
        ]
      },
      {
        type: 'outcomes',
        variant: 'series',
        category: '我的设计工作',
        label: '06',
        title: 'What This Project Shows About My Design Work',
        subtitle: '我做的不是视觉包装，而是把早期 AI research demo 转成第一次访问者能跟住的页面动作。',
        content: '这组项目展示了我如何设计用户进入 demo、理解模型行为、控制输入并判断输出：空间、时间、运动都对应到具体界面动作。',
        items: [
          {
            title: '定义第一次访问路径',
            description: 'Prompt / Gallery → 生成 → 扩展 → 预览，让用户知道每一步做什么。'
          },
          {
            title: '把模型行为映射成界面动作',
            description: '空间变成可扩展边界，时间变成阶段和示例，运动变成可画出的轨迹。'
          },
          {
            title: '设计用户控制流程',
            description: 'preview、before / after 和 continue explore 让用户能判断结果。'
          },
          {
            title: '把研究变成可探索体验',
            description: '非技术用户可以先通过操作理解研究，再决定是否去读论文。'
          }
        ]
      }
    ],
    acts: {
      act1: {
        title: '第一次访问路径',
        content: '定义用户如何从 Prompt / Gallery 进入生成、扩展、预览和继续探索。'
      },
      act2: {
        title: '模型能力到界面动作',
        content: '把空间、时间、运动三类模型能力映射成用户能操作的控件和状态。',
        decisionPoints: ['Prompt / Gallery 入口', '图像边界扩展', '关键帧与 timeline', 'Text / Image / Trajectory 控制']
      },
      act3: {
        title: '可操作的 Research Demo',
        content: '把文案、截图、callout 和 live demo 绑定到具体界面，让招聘方看到每个设计判断。',
        impact: '早期 AI 交互设计'
      }
    }
  },
  {
    id: 'p20',
    title: 'RODIN Diffusion',
    category: 'C-Side',
    platform: 'Web',
    year: '2022',
    role: '交互设计师 / Web 体验设计师 / 前端开发',
    shortDescription: '来自 PPT 源稿的 RODIN Diffusion 案例，展示 3D Avatar 生成、交互想法和网页状态。',
    coverImage: RODIN_DIFFUSION_COVER_IMAGE,
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      en: FIGMA_RODIN_DIFFUSION_SLIDES,
      zh: FIGMA_RODIN_DIFFUSION_SLIDES,
    },
    tags: ['Microsoft Research', '3D Avatar', 'Diffusion Model', 'Research Demo UX', '前端实现'],
    externalLinks: {
      behance: 'https://www.figma.com/design/lscl0BysjMvjXiMwVrZQhM/PPT?node-id=82-22&m=dev'
    },
    acts: {
      act1: {
        title: 'PPT 源稿案例',
        content: '按原始 PPT 页面顺序整理 RODIN Diffusion 的展示内容。'
      },
      act2: {
        title: '3D Avatar 交互想法',
        content: '展示 PPT 中的 grid、色彩、portrait-guided creation、text-guided creation 和 avatar editing 页面状态。',
        decisionPoints: ['PPT 源稿顺序', 'Portrait-guided avatar creation', 'Text-guided avatar creation', 'Text-guided avatar editing']
      },
      act3: {
        title: 'Reader 呈现',
        content: '在作品集阅读器中展示从 PPT 导出的原始页面。',
        impact: '9 页 PPT 源稿'
      }
    }
  },
  {
    id: 'p21',
    title: '从春节回家路到元宵夜归人',
    category: 'C-Side',
    platform: 'Web',
    year: '2025',
    role: '产品设计师 / UI 设计师 / Vibe Coding 协作',
    shortDescription: '一个节日剧情小游戏 case study：把春节“回家路”的核心情绪转译成元宵“夜归人”的互动体验。',
    coverImage: LANTERN_HOMECOMING_COVER_IMAGE,
    coverDisplay: 'cover',
    coverAspectRatio: 4 / 3,
    tags: ['Vibe Coding', '节日 H5', '小游戏', '主题转译', 'UI 设计', '票根分享'],
    caseSections: [
      {
        type: 'text',
        title: '从春节回家路到元宵夜归人'
      }
    ],
    acts: {
      act1: {
        title: '主题转译',
        content: '当活动节点从春节调整到元宵，我保留了回家、归途、团圆的核心情绪。'
      },
      act2: {
        title: '小游戏流程设计',
        content: '把原本偏节日闯关的体验重构成故事选择、问答闯关、结局收集和 Train Ticket 票根分享。',
        decisionPoints: ['故事卡入口', '灯笼进度反馈', '结局收集', '票根式分享结果']
      },
      act3: {
        title: '从 Vibe Coding 到完整体验',
        content: '用 Vibe Coding 快速跑通原型，再通过设计判断调整主题、视觉、组件和多端展示。',
        impact: '节日剧情小游戏'
      }
    }
  },
  {
    id: 'p4',
    title: 'ReMe - AI 陪伴',
    category: 'C-Side',
    platform: 'Mobile',
    year: '2024',
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
    coverImage: IOETE_COVER_IMAGE,
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_IOETE_SLIDES,
    },
    externalLinks: {
      behance: 'https://www.behance.net/gallery/207609085/ioete'
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
    year: '2025',
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
    year: '2026',
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
    title: 'Value Compass 与视觉系统网页',
    category: 'B-Side',
    platform: 'Web',
    year: '2024',
    role: 'UI/UX 设计师',
    shortDescription: 'AI 价值对齐研究界面，以及同一视觉系统下的网页设计。',
    coverImage: VALUE_COMPASS_COVER_IMAGE,
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_VALUE_COMPASS_SLIDES,
    },
    gallery: FIGMA_VALUE_COMPASS_SLIDES,
    tags: ['AI 研究', '价值对齐', '视觉系统', '网页设计', 'Figma'],
    acts: {
      act1: {
        title: '研究表达',
        content: '项目需要用清晰的视觉系统，在界面和网页两个载体上传达 AI 价值对齐研究。'
      },
      act2: {
        title: '界面与系统',
        content: '把研究界面和同视觉系统的网页设计作为一个连续案例保留。',
        decisionPoints: ['研究清晰度', '界面结构', '网页视觉系统']
      },
      act3: {
        title: 'Reader 呈现',
        content: '以高分辨率阅读器展示 Behance 原始素材。',
        impact: '14 个原始素材'
      }
    }
  },
  {
    id: 'p16',
    title: 'Salone del Mobile',
    category: 'C-Side',
    platform: 'Web',
    year: '2021',
    role: 'UI/UX 设计师',
    shortDescription: 'Salone del Mobile 的艺术指导与移动端网页概念。',
    coverImage: SALONE_DEL_MOBILE_COVER_IMAGE,
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: SALONE_DEL_MOBILE_SLIDES,
    },
    gallery: SALONE_DEL_MOBILE_SLIDES,
    tags: ['艺术指导', 'UI/UX', '移动端网页', '编辑设计', 'Behance 原图'],
    externalLinks: {
      behance: 'https://www.behance.net/gallery/200906941/salone-del-mobile'
    },
    acts: {
      act1: {
        title: '展会网站方向',
        content: '为国际设计展会体验探索移动优先的视觉方向。'
      },
      act2: {
        title: '编辑式移动流程',
        content: '围绕强字体、设备 mockup 和可浏览内容页面组织界面。',
        decisionPoints: ['移动优先布局', '编辑层级', '展会识别']
      },
      act3: {
        title: 'Behance 原图 Reader',
        content: '将 Behance 原始图片加入 Works 阅读器。',
        impact: '31 个原始素材'
      }
    }
  },
  {
    id: 'p17',
    title: 'BatteryML Visual Design',
    category: 'B-Side',
    platform: 'Digital',
    year: '2024',
    role: '视觉设计师',
    shortDescription: 'BatteryML 的视觉识别与研究传播设计。',
    coverImage: BATTERYML_VISUAL_COVER_IMAGE,
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: BATTERYML_VISUAL_SLIDES,
    },
    gallery: BATTERYML_VISUAL_SLIDES,
    tags: ['视觉设计', '研究传播', '品牌识别', '动图', 'Behance 原图'],
    externalLinks: {
      behance: 'https://www.behance.net/gallery/198104963/BatteryML-visual-design'
    },
    acts: {
      act1: {
        title: '研究品牌表达',
        content: '项目需要一套清晰、有识别度的视觉系统来解释技术研究方向。'
      },
      act2: {
        title: '识别与视觉素材',
        content: '围绕 BatteryML 标识、产品意象和展示素材建立视觉语言。',
        decisionPoints: ['技术清晰度', '可识别符号', '动态传播']
      },
      act3: {
        title: 'Behance 原图 Reader',
        content: '将 Behance 原始图片和 GIF 加入 Works 阅读器。',
        impact: '14 个原始素材'
      }
    }
  },
  {
    id: 'p22',
    title: 'ProbTS 视觉识别探索',
    category: 'System',
    platform: 'Digital',
    year: '2024',
    role: '视觉设计师',
    shortDescription: 'MSRA 期间为概率时间序列研究项目做的一组早期视觉识别探索。',
    coverImage: '/projects/figma-portfolio/probts/page-01.png',
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FIGMA_PROBTS_SLIDES,
    },
    gallery: FIGMA_PROBTS_SLIDES,
    tags: ['MSRA', '视觉识别', '研究传播', 'Logo 规范', '时间序列'],
    acts: {
      act1: {
        title: '研究品牌语境',
        content: 'ProbTS 需要一套轻量的识别方向，用来承载概率时间序列研究的展示与传播。'
      },
      act2: {
        title: '早期视觉探索',
        content: '围绕 Logo 结构、标准色、辅助图形和应用示例整理成一版紧凑的品牌规范草案。',
        decisionPoints: ['面向研究传播的识别', 'Logo 与色彩规则', '可用于展示的技术图形']
      },
      act3: {
        title: '归档定位',
        content: '作为 MSRA 研究品牌工作的补充材料保留，并放在更成熟的 MSRA 项目之后。',
        impact: '7 张源页面'
      }
    }
  },
  {
    id: 'p18',
    title: 'Fera',
    category: 'B-Side',
    platform: 'Print & Digital',
    year: '2021',
    role: '品牌设计师',
    shortDescription: 'Fera 的视觉识别系统。',
    coverImage: FERA_COVER_IMAGE,
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: FERA_SLIDES,
    },
    gallery: FERA_SLIDES,
    tags: ['品牌识别', 'Logo 设计', '视觉系统', '印刷与数字', 'Behance 原图'],
    externalLinks: {
      behance: 'https://www.behance.net/gallery/207609497/Fera'
    },
    acts: {
      act1: {
        title: '识别设计',
        content: '为 Fera 品牌建立聚焦的视觉识别展示。'
      },
      act2: {
        title: '系统应用',
        content: '将 logo 方向延展到视觉应用和展示 mockup 中。',
        decisionPoints: ['Logo 清晰度', '识别应用', '展示节奏']
      },
      act3: {
        title: 'Behance 原图 Reader',
        content: '将 Behance 原始图片加入 Works 阅读器。',
        impact: '8 个原始素材'
      }
    }
  },
  {
    id: 'p19',
    title: 'PROFILTUBI Rebranding',
    category: 'C-Side',
    platform: 'Print & Digital',
    year: '2021',
    role: '品牌设计师，小组项目',
    shortDescription: 'PROFILTUBI 品牌重塑竞赛小组项目。',
    coverImage: PROFILTUBI_REBRANDING_COVER_IMAGE,
    coverDisplay: 'contain',
    coverAspectRatio: 16 / 9,
    slideSets: {
      zh: PROFILTUBI_REBRANDING_SLIDES,
    },
    gallery: PROFILTUBI_REBRANDING_SLIDES,
    tags: ['品牌重塑', '小组项目', '品牌系统', '印刷与数字', 'Behance 原图'],
    externalLinks: {
      behance: 'https://www.behance.net/gallery/207608603/PROFILTUBI_Rebranding-competition-(group-work)'
    },
    acts: {
      act1: {
        title: '品牌重塑竞赛',
        content: '为工业品牌完成的小组品牌重塑提案。'
      },
      act2: {
        title: '识别系统',
        content: '围绕 logo、图形系统、应用场景和展示页面组织品牌方向。',
        decisionPoints: ['工业品牌识别', '系统一致性', '应用范围']
      },
      act3: {
        title: 'Behance 原图 Reader',
        content: '将 Behance 原始图片加入 Works 阅读器。',
        impact: '51 个原始素材'
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
    shortDescription: 'Building AI-powered helper tools for image production, review boards, and PPT generation.',
    coverImage: '/projects/walk-through/aigc-03.png',
    tags: ['Batch Generation', '3:4 Review Board', 'AI Presentation', 'Design Automation'],
    acts: {
      act1: { title: 'Production Complexity', content: 'Complex production work created repeated generating, filtering, resizing, deck drafting, and review preparation.' },
      act2: { title: 'AI Helper Tools', content: 'I built three small tools: batch image generation, a 3:4 review board, and OPG-MXP-Presentation for generated PPT review.', decisionPoints: ['Batch generation', '3:4 normalization', 'PPT generation review', 'Final selection'] },
      act3: { title: 'Result', content: 'My time moved from manual operation to image judgment, slide review, and team communication.', impact: 'Faster review-ready production' }
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
    shortDescription: '为复杂生图、展示板和 PPT 生成制作 AI 提效小工具。',
    coverImage: '/projects/walk-through/aigc-03.png',
    tags: ['批量生图', '3:4 展示板', 'AI Presentation', '设计自动化'],
    acts: {
      act1: { title: '生产复杂度', content: '复杂生产工作会产生大量重复生成、筛选、改比例、搭 PPT 初稿和整理 review 的工作。' },
      act2: { title: 'AI 提效工具', content: '我做了三个小工具：批量生图、给团队筛选用的 3:4 图片展示板，以及 OPG-MXP-Presentation PPT 生成 review 工具。', decisionPoints: ['批量生成', '统一 3:4', 'PPT 生成 review', '最终选择'] },
      act3: { title: '结果', content: '我的时间从重复操作转向审美判断、页面 review 和沟通。', impact: '更快进入可 review 状态' }
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

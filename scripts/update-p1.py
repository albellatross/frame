#!/usr/bin/env python3
"""Replace EN and ZH p1 sections with caseSections data."""
import os

filepath = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'constants.ts')

with open(filepath, 'r') as f:
    content = f.read()

# ===== EN p1 =====
en_p1_start = content.find("id: 'p1',\n    title: 'Interactive ReadAloud")
en_p1_obj_start = content.rfind('{', 0, en_p1_start)
en_p2 = content.find("id: 'p2',", en_p1_start)
en_p1_obj_end = content.rfind('},', en_p1_start, en_p2) + 2

en_new = """  {
    id: 'p1',
    title: 'Interactive ReadAloud with Copilot Voice',
    category: 'B-Side',
    platform: 'Web',
    year: '2025',
    role: 'UI/UX Designer (Sole Beijing IC)',
    shortDescription: 'We didn\'t just redesign Voice \u2014 we reimagined how people understand through sound.',
    coverImage: '/projects/read-aloud/cover-bg-1.png',
    tags: ['AI+UX', 'Voice Interaction', 'Cross-team Collaboration', 'Copilot', 'Microsoft Word'],
    caseSections: [
      {
        type: 'hero',
        title: 'Interactive ReadAloud with Copilot Voice',
        subtitle: 'Redefining How We Listen',
        date: '02/2025 \u2014 06/2025',
        role: 'UI/UX Designer \u00b7 Sole Beijing IC',
        tags: ['AI+UX', 'Voice Interaction', 'Cross-team Collaboration'],
        bgImage: '/projects/read-aloud/cover-bg-1.png'
      },
      {
        type: 'stats',
        label: '01',
        title: 'Background',
        subtitle: 'From One-Way Voice to Intelligent Dialogue',
        content: 'Word\'s Read Aloud serves over 10 million monthly active users, spanning information workers, educators, and language learners. However, the experience remains a passive, one-way playback \u2014 users can only listen, with no ability to interact, ask questions, or customize the flow.',
        stats: [
          { value: '10,000,000+', label: 'Monthly Active Users' },
          { value: '30% \u2192 70%', label: 'Users wanting interactive features (2022 Q4 \u2192 2024 Q4)' }
        ]
      },
      {
        type: 'personas',
        label: '02',
        title: 'Target Users',
        items: [
          { icon: '\ud83d\udc54', title: 'Information Professionals', subtitle: 'Efficient document comprehension', description: 'Need to efficiently process and understand long documents while multitasking. They listen to reports, papers, and emails while handling other work, but lack the ability to ask questions or skip irrelevant sections.', color: '#4F6BED' },
          { icon: '\ud83c\udfa8', title: 'Content Creators', subtitle: 'Voice-assisted review', description: 'Need voice-assisted review of their own writing. They want to hear their content read back for editing, proofreading, and quality checks, but the current tool offers no interactive feedback.', color: '#E97548' }
        ]
      },
      {
        type: 'flow',
        label: '03',
        title: 'Current Experience',
        content: 'Before Copilot Voice, Read Aloud followed a rigid, linear playback model with no room for user agency.',
        steps: [
          { label: 'Click Play' },
          { label: 'Listen sentence by sentence' },
          { label: 'Pause / Resume' },
          { label: 'Listen through' }
        ],
        subtitle: 'Passive \u00b7 One-way \u00b7 Linear'
      },
      {
        type: 'cards',
        label: '04',
        title: 'Pain Points',
        items: [
          { icon: '\ud83e\udd2c', title: 'Can\'t Ask Questions', description: 'Users can\'t get real-time explanations or context for confusing passages while listening.' },
          { icon: '\ud83e\udd74', title: 'Fragmented Comprehension', description: 'Long or complex documents are hard to digest \u2014 no summarization or key point extraction during playback.' },
          { icon: '\ud83d\ude36\u200d\ud83c\udf2b\ufe0f', title: 'Rigid Playback Control', description: 'No natural way to interrupt or interact with voice \u2014 users are stuck in passive reception mode.' },
          { icon: '\ud83e\udd78', title: 'High Cognitive Load', description: 'Multi-tasking users want to listen and interact simultaneously, but the system doesn\'t support it.' }
        ]
      },
      {
        type: 'principles',
        label: '05',
        title: 'Design Direction',
        items: [
          { number: '01', title: 'Interruptibility', subtitle: '\u53ef\u4e2d\u65ad\u6027', description: 'Users can tap the microphone to ask questions at any point during playback. The system auto-pauses reading, switches to Copilot response mode, and resumes seamlessly after answering.' },
          { number: '02', title: 'Comprehensibility', subtitle: '\u53ef\u7406\u89e3\u6027', description: 'Original/Summary mode toggle supports semantic requests like \u201cSummarize this section\u201d or \u201cWhat does this mean?\u201d. Copilot responds with structured summaries plus expandable details.' },
          { number: '03', title: 'Resumability', subtitle: '\u53ef\u56de\u6eaf\u6027', description: 'The system auto-marks the reading position when interrupted. After 5 seconds of inactivity, it auto-resumes reading. Users can also manually tap play to return to where they left off.' }
        ]
      },
      {
        type: 'two-column',
        label: '06',
        title: 'Design Goals & Strategy',
        subtitle: 'The core strategy was not to simply remake Voice, but to use a systematic design language to create an entirely new interaction experience.',
        columns: [
          { title: 'Product Strategy', items: ['Voice interruption without breaking experience flow', 'Original/Summary dual-mode content switching', 'Natural voice feedback with contextual responses', 'Auto-resume with position memory after 5s'] },
          { title: 'Visual Strategy', items: ['Rocksteady design system compatible tokens', 'Clear information hierarchy for voice UI', 'Consistent with existing Word UI patterns', 'Scalable component architecture for future voice features'] }
        ]
      },
      {
        type: 'voice-states',
        label: '07',
        title: 'Design System',
        subtitle: 'Built on Rocksteady \u00b7 Consistent with Word UI',
        content: 'Designed 5 distinct voice states for the Copilot Voice system, each with unique visual indicators built using Rocksteady design tokens.',
        items: [
          { title: 'Working', color: '#4F6BED', description: 'Processing document for playback', number: '' },
          { title: 'Speaking', color: '#2DA562', description: 'Actively reading content aloud', number: '' },
          { title: 'Waiting', color: '#8A8886', description: 'Paused, awaiting user input', number: '' },
          { title: 'Thinking', color: '#8B5CF6', description: 'Processing voice query via Copilot', number: '' },
          { title: 'Listening', color: '#E97548', description: 'Capturing user voice input', number: '' }
        ]
      },
      {
        type: 'mockup',
        title: 'Copilot Voice in Word',
        subtitle: 'Interactive voice companion embedded within the familiar Word reading experience',
        image: '/projects/read-aloud/word-mockup-1.png'
      },
      {
        type: 'text',
        label: '08',
        title: 'Voice Interaction Flow',
        content: 'The interaction follows a natural conversation pattern: during playback, users tap the microphone to interrupt and ask questions. The system seamlessly transitions between reading and responding \u2014 pausing playback, processing the query through Copilot, delivering the answer, then auto-resuming from the exact position.',
        image: '/projects/read-aloud/word-mockup-2.png'
      },
      {
        type: 'outcomes',
        label: '09',
        title: 'Results & Impact',
        subtitle: 'Successfully launched Dogfood version, transforming passive reading into active dialogue.',
        content: 'Dogfood Launch \u00b7 10M+ MAU',
        items: [
          { title: 'Product Delivery', description: 'Voice interruption, mode switching, and natural voice feedback system shipped in Dogfood' },
          { title: 'Visual Consistency', description: 'Full Rocksteady design system integration with Word UI token compliance' },
          { title: 'Interaction Model', description: '5 voice states (Working/Speaking/Waiting/Thinking/Listening) with seamless transitions' },
          { title: 'Scalability', description: 'Extensible architecture ready for podcast, accessibility, and future voice capabilities' }
        ]
      },
      {
        type: 'text',
        label: '10',
        title: 'Learnings & Reflection',
        content: 'Cross-timezone collaboration between Beijing and US teams required clear documentation and async communication. Designing for voice interaction demands a fundamentally different mental model than visual-first design \u2014 timing, interruption handling, and state management become primary concerns.'
      }
    ],
    acts: {
      act1: { title: 'Context', content: '' },
      act2: { title: 'Design', content: '', decisionPoints: [] },
      act3: { title: 'Outcome', content: '', impact: 'Dogfood Launch' }
    },
    externalLinks: {
      behance: 'https://www.figma.com/design/1MdXjP52UK8cwvVo6VgzHD/Portfolio?node-id=455-35981&m=dev'
    }
  },"""

content = content[:en_p1_obj_start] + en_new + content[en_p1_obj_end:]
print(f"EN replaced OK")

# ===== ZH p1 =====
zh_marker = content.find("PROJECTS_ZH")
zh_p1_start = content.find("id: 'p1',", zh_marker)
zh_p1_obj_start = content.rfind('{', zh_marker, zh_p1_start)
zh_p2 = content.find("id: 'p2',", zh_p1_start)
zh_p1_obj_end = content.rfind('},', zh_p1_start, zh_p2) + 2

zh_new = """  {
    id: 'p1',
    title: 'Interactive ReadAloud with Copilot Voice',
    category: 'B-Side',
    platform: 'Web',
    year: '2025',
    role: 'UI/UX \u8bbe\u8ba1\u5e08\uff08\u5317\u4eac\u533a\u552f\u4e00\u4ee3\u8868\uff09',
    shortDescription: '\u8bbe\u8ba1\u7b56\u7565\u7684\u6838\u5fc3\u4e0d\u662f\u91cd\u505a Voice\uff0c\u800c\u662f\u7528\u7cfb\u7edf\u7684\u8bed\u8a00\u8bbe\u8ba1\u5168\u65b0\u7684\u4ea4\u4e92\u4f53\u9a8c\u3002',
    coverImage: '/projects/read-aloud/cover-bg-1.png',
    tags: ['AI+UX', '\u8bed\u97f3\u4ea4\u4e92', '\u8de8\u56e2\u961f\u534f\u4f5c', 'Copilot', 'Microsoft Word'],
    caseSections: [
      {
        type: 'hero',
        title: 'Interactive ReadAloud with Copilot Voice',
        subtitle: '\u91cd\u65b0\u5b9a\u4e49\u6211\u4eec\u7684\u8046\u542c\u65b9\u5f0f',
        date: '02/2025 \u2014 06/2025',
        role: 'UI/UX \u8bbe\u8ba1\u5e08 \u00b7 \u5317\u4eac\u533a\u552f\u4e00 IC',
        tags: ['AI+UX', '\u8bed\u97f3\u4ea4\u4e92', '\u8de8\u56e2\u961f\u534f\u4f5c'],
        bgImage: '/projects/read-aloud/cover-bg-1.png'
      },
      {
        type: 'stats',
        label: '01',
        title: '\u80cc\u666f',
        subtitle: '\u4ece\u5355\u5411\u8bed\u97f3\u5230\u667a\u80fd\u5bf9\u8bdd',
        content: 'Word \u7684 Read Aloud \u529f\u80fd\u62e5\u6709\u8d85\u8fc7 1000 \u4e07\u6708\u6d3b\u8dc3\u7528\u6237\uff0c\u8986\u76d6\u4fe1\u606f\u5de5\u4f5c\u8005\u3001\u6559\u80b2\u8005\u548c\u8bed\u8a00\u5b66\u4e60\u8005\u3002\u4f46\u7528\u6237\u59cb\u7ec8\u5904\u4e8e\u201c\u53ea\u80fd\u542c\u201d\u7684\u88ab\u52a8\u72b6\u6001\u2014\u2014\u65e0\u6cd5\u4e2d\u65ad\u3001\u63d0\u95ee\u6216\u81ea\u5b9a\u4e49\u6d41\u7a0b\u3002',
        stats: [
          { value: '10,000,000+', label: '\u6708\u6d3b\u8dc3\u7528\u6237' },
          { value: '30% \u2192 70%', label: '\u7528\u6237\u671f\u671b\u4ea4\u4e92\u9605\u8bfb\u529f\u80fd\uff082022 Q4 \u2192 2024 Q4\uff09' }
        ]
      },
      {
        type: 'personas',
        label: '02',
        title: '\u76ee\u6807\u7528\u6237',
        items: [
          { icon: '\ud83d\udc54', title: '\u4fe1\u606f\u5de5\u4f5c\u8005', subtitle: '\u9ad8\u6548\u6587\u6863\u7406\u89e3', description: '\u9700\u8981\u5728\u591a\u4efb\u52a1\u73af\u5883\u4e2d\u9ad8\u6548\u5904\u7406\u548c\u7406\u89e3\u957f\u6587\u6863\u3002\u5728\u5904\u7406\u5176\u4ed6\u5de5\u4f5c\u7684\u540c\u65f6\u542c\u53d6\u62a5\u544a\u3001\u8bba\u6587\u548c\u90ae\u4ef6\uff0c\u4f46\u65e0\u6cd5\u63d0\u95ee\u6216\u8df3\u8fc7\u65e0\u5173\u5185\u5bb9\u3002', color: '#4F6BED' },
          { icon: '\ud83c\udfa8', title: '\u5185\u5bb9\u521b\u4f5c\u8005', subtitle: '\u8bed\u97f3\u8f85\u52a9\u5ba1\u9605', description: '\u9700\u8981\u8bed\u97f3\u8f85\u52a9\u5ba1\u9605\u81ea\u5df1\u7684\u5199\u4f5c\u5185\u5bb9\u3002\u5e0c\u671b\u901a\u8fc7\u542c\u8bfb\u6765\u7f16\u8f91\u3001\u6821\u5bf9\u548c\u8d28\u91cf\u68c0\u67e5\uff0c\u4f46\u5f53\u524d\u5de5\u5177\u6ca1\u6709\u4ea4\u4e92\u53cd\u9988\u3002', color: '#E97548' }
        ]
      },
      {
        type: 'flow',
        label: '03',
        title: '\u5f53\u524d\u4f53\u9a8c',
        content: '\u5728 Copilot Voice \u4e4b\u524d\uff0cRead Aloud \u7684\u4f53\u9a8c\u9075\u5faa\u50f5\u5316\u7684\u7ebf\u6027\u64ad\u653e\u6a21\u5f0f\uff0c\u6ca1\u6709\u4e3a\u7528\u6237\u4e3b\u52a8\u6027\u7559\u4e0b\u7a7a\u95f4\u3002',
        steps: [
          { label: '\u70b9\u51fb\u64ad\u653e' },
          { label: '\u9010\u53e5\u8046\u542c' },
          { label: '\u6682\u505c / \u7ee7\u7eed' },
          { label: '\u542c\u5b8c' }
        ],
        subtitle: '\u88ab\u52a8 \u00b7 \u5355\u5411 \u00b7 \u7ebf\u6027'
      },
      {
        type: 'cards',
        label: '04',
        title: '\u7528\u6237\u75db\u70b9',
        items: [
          { icon: '\ud83e\udd2c', title: '\u65e0\u6cd5\u63d0\u95ee', description: '\u7528\u6237\u5728\u542c\u5230\u4e0d\u7406\u89e3\u7684\u6bb5\u843d\u65f6\uff0c\u65e0\u6cd5\u5b9e\u65f6\u83b7\u53d6\u89e3\u91ca\u6216\u80cc\u666f\u3002' },
          { icon: '\ud83e\udd74', title: '\u5185\u5bb9\u788e\u7247\u5316\u7406\u89e3\u56f0\u96be', description: '\u5bf9\u4e8e\u6587\u6863\u7ed3\u6784\u590d\u6742\u6216\u957f\u7bc7\u5185\u5bb9\uff0c\u4fe1\u606f\u96be\u4ee5\u4e32\u8054\u7406\u89e3\uff0c\u65e0\u6cd5\u603b\u7ed3\u6216\u63d0\u53d6\u8981\u70b9\u3002' },
          { icon: '\ud83d\ude36\u200d\ud83c\udf2b\ufe0f', title: '\u64ad\u653e\u63a7\u5236\u4e0d\u7075\u6d3b', description: '\u7f3a\u4e4f\u66f4\u81ea\u7136\u7684\u6253\u65ad\u4e0e\u4e92\u52a8\u65b9\u5f0f\uff0c\u7528\u6237\u4ecd\u5904\u4e8e\u88ab\u52a8\u63a5\u6536\u6a21\u5f0f\u3002' },
          { icon: '\ud83e\udd78', title: '\u8ba4\u77e5\u8d1f\u62c5\u9ad8', description: '\u591a\u4efb\u52a1\u73af\u5883\u4e0b\uff0c\u7528\u6237\u5e0c\u671b\u80fd\u8fb9\u542c\u8fb9\u4e92\u52a8\uff0c\u7cfb\u7edf\u5374\u4e0d\u652f\u6301\u3002' }
        ]
      },
      {
        type: 'principles',
        label: '05',
        title: '\u8bbe\u8ba1\u65b9\u5411',
        items: [
          { number: '01', title: 'Interruptibility', subtitle: '\u53ef\u4e2d\u65ad\u6027', description: '\u7528\u6237\u53ef\u968f\u65f6\u70b9\u51fb\u9ea6\u514b\u98ce\u5728\u64ad\u653e\u8fc7\u7a0b\u4e2d\u63d0\u95ee\u3002\u7cfb\u7edf\u81ea\u52a8\u6682\u505c\u6717\u8bfb\uff0c\u5207\u6362\u5230 Copilot \u56de\u590d\u6a21\u5f0f\uff0c\u56de\u7b54\u540e\u65e0\u7f1d\u6062\u590d\u3002' },
          { number: '02', title: 'Comprehensibility', subtitle: '\u53ef\u7406\u89e3\u6027', description: '\u539f\u6587/\u6458\u8981\u6a21\u5f0f\u5207\u6362\uff0c\u652f\u6301\u201c\u8fd9\u6bb5\u4ec0\u4e48\u610f\u601d\uff1f\u201d\u201c\u80fd\u4e0d\u80fd\u603b\u7ed3\u4e00\u4e0b\uff1f\u201d\u7b49\u8bed\u4e49\u8bf7\u6c42\u3002Copilot \u4ee5\u7ed3\u6784\u5316\u603b\u7ed3 + \u53ef\u9009\u5ef6\u4f38\u4fe1\u606f\u56de\u590d\u3002' },
          { number: '03', title: 'Resumability', subtitle: '\u53ef\u56de\u6eaf\u6027', description: '\u7cfb\u7edf\u5728\u7528\u6237\u63d0\u95ee\u65f6\u81ea\u52a8\u6807\u8bb0\u5f53\u524d\u4f4d\u7f6e\u30025\u79d2\u65e0\u64cd\u4f5c\u81ea\u52a8\u6062\u590d\u6717\u8bfb\uff0c\u7528\u6237\u4e5f\u53ef\u624b\u52a8\u70b9\u51fb\u64ad\u653e\u6309\u94ae\u56de\u5230\u4e2d\u65ad\u4f4d\u7f6e\u3002' }
        ]
      },
      {
        type: 'two-column',
        label: '06',
        title: '\u8bbe\u8ba1\u76ee\u6807\u4e0e\u7b56\u7565',
        subtitle: '\u8bbe\u8ba1\u7b56\u7565\u7684\u6838\u5fc3\u4e0d\u662f\u91cd\u505a Voice\uff0c\u800c\u662f\u7528\u7cfb\u7edf\u7684\u8bbe\u8ba1\u8bed\u8a00\u6784\u5efa\u5168\u65b0\u7684\u4ea4\u4e92\u4f53\u9a8c\u3002',
        columns: [
          { title: '\u4ea7\u54c1\u7b56\u7565', items: ['\u8bed\u97f3\u4e2d\u65ad\u4e0d\u6253\u65ad\u4f53\u9a8c\u6d41', '\u539f\u6587/\u6458\u8981\u53cc\u6a21\u5f0f\u5185\u5bb9\u5207\u6362', '\u81ea\u7136\u8bed\u97f3\u53cd\u9988\u4e0e\u4e0a\u4e0b\u6587\u611f\u77e5\u56de\u590d', '5\u79d2\u65e0\u64cd\u4f5c\u81ea\u52a8\u6062\u590d\u5e76\u8bb0\u5fc6\u4f4d\u7f6e'] },
          { title: '\u89c6\u89c9\u7b56\u7565', items: ['Rocksteady \u8bbe\u8ba1\u7cfb\u7edf\u517c\u5bb9 token', '\u6e05\u6670\u7684\u8bed\u97f3 UI \u4fe1\u606f\u5c42\u7ea7', '\u4e0e\u73b0\u6709 Word UI \u6a21\u5f0f\u4fdd\u6301\u4e00\u81f4', '\u53ef\u6269\u5c55\u7ec4\u4ef6\u67b6\u6784\uff0c\u652f\u6491\u672a\u6765\u8bed\u97f3\u80fd\u529b'] }
        ]
      },
      {
        type: 'voice-states',
        label: '07',
        title: '\u8bbe\u8ba1\u7cfb\u7edf',
        subtitle: '\u57fa\u4e8e Rocksteady \u00b7 \u4e0e Word UI \u4fdd\u6301\u4e00\u81f4',
        content: '\u4e3a Copilot Voice \u7cfb\u7edf\u8bbe\u8ba1\u4e86 5 \u79cd\u72ec\u7acb\u7684\u8bed\u97f3\u72b6\u6001\uff0c\u6bcf\u79cd\u72b6\u6001\u90fd\u6709\u72ec\u7279\u7684\u89c6\u89c9\u6307\u793a\uff0c\u57fa\u4e8e Rocksteady \u8bbe\u8ba1 token \u6784\u5efa\u3002',
        items: [
          { title: 'Working', color: '#4F6BED', description: '\u7cfb\u7edf\u6b63\u5728\u5904\u7406\u6587\u6863\u4ee5\u4f9b\u64ad\u653e', number: '' },
          { title: 'Speaking', color: '#2DA562', description: '\u6b63\u5728\u6717\u8bfb\u6587\u6863\u5185\u5bb9', number: '' },
          { title: 'Waiting', color: '#8A8886', description: '\u5df2\u6682\u505c\uff0c\u7b49\u5f85\u7528\u6237\u8f93\u5165\u6216\u64cd\u4f5c', number: '' },
          { title: 'Thinking', color: '#8B5CF6', description: '\u6b63\u5728\u901a\u8fc7 Copilot \u5904\u7406\u8bed\u97f3\u67e5\u8be2', number: '' },
          { title: 'Listening', color: '#E97548', description: '\u6b63\u5728\u6355\u6349\u7528\u6237\u7684\u8bed\u97f3\u8f93\u5165', number: '' }
        ]
      },
      {
        type: 'mockup',
        title: 'Word \u4e2d\u7684 Copilot Voice',
        subtitle: '\u5d4c\u5165\u719f\u6089\u7684 Word \u9605\u8bfb\u4f53\u9a8c\u4e2d\u7684\u667a\u80fd\u8bed\u97f3\u4f34\u8bfb',
        image: '/projects/read-aloud/word-mockup-1.png'
      },
      {
        type: 'text',
        label: '08',
        title: '\u8bed\u97f3\u4ea4\u4e92\u6d41\u7a0b',
        content: '\u4ea4\u4e92\u9075\u5faa\u81ea\u7136\u5bf9\u8bdd\u6a21\u5f0f\uff1a\u5728\u6587\u6863\u64ad\u653e\u8fc7\u7a0b\u4e2d\uff0c\u7528\u6237\u53ef\u70b9\u51fb\u9ea6\u514b\u98ce\u4e2d\u65ad\u5e76\u63d0\u95ee\u3002\u7cfb\u7edf\u5728\u6717\u8bfb\u548c\u56de\u590d\u4e4b\u95f4\u65e0\u7f1d\u8fc7\u6e21\u2014\u2014\u6682\u505c\u64ad\u653e\u3001\u901a\u8fc7 Copilot \u5904\u7406\u67e5\u8be2\u3001\u4f20\u8fbe\u7b54\u6848\uff0c\u7136\u540e\u4ece\u7cbe\u786e\u4f4d\u7f6e\u81ea\u52a8\u6062\u590d\u3002',
        image: '/projects/read-aloud/word-mockup-2.png'
      },
      {
        type: 'outcomes',
        label: '09',
        title: '\u6210\u679c\u4e0e\u5f71\u54cd',
        subtitle: '\u6210\u529f\u4e0a\u7ebf Dogfood \u7248\u672c\uff0c\u5c06\u88ab\u52a8\u9605\u8bfb\u8f6c\u5316\u4e3a\u4e3b\u52a8\u5bf9\u8bdd\u3002',
        content: 'Dogfood \u4e0a\u7ebf \u00b7 1000\u4e07+ MAU',
        items: [
          { title: '\u4ea7\u54c1\u4ea4\u4ed8', description: '\u8bed\u97f3\u4e2d\u65ad\u3001\u6a21\u5f0f\u5207\u6362\u3001\u81ea\u7136\u8bed\u97f3\u53cd\u9988\u7cfb\u7edf\u5df2\u5728 Dogfood \u4e2d\u4ea4\u4ed8' },
          { title: '\u89c6\u89c9\u4e00\u81f4\u6027', description: '\u5b8c\u6574\u96c6\u6210 Rocksteady \u8bbe\u8ba1\u7cfb\u7edf\uff0c\u7b26\u5408 Word UI token \u89c4\u8303' },
          { title: '\u4ea4\u4e92\u6a21\u578b', description: '5 \u79cd\u8bed\u97f3\u72b6\u6001\uff08Working/Speaking/Waiting/Thinking/Listening\uff09\u65e0\u7f1d\u8fc7\u6e21' },
          { title: '\u53ef\u6269\u5c55\u6027', description: '\u53ef\u6269\u5c55\u67b6\u6784\uff0c\u4e3a podcast\u3001\u65e0\u969c\u788d\u548c\u672a\u6765\u8bed\u97f3\u80fd\u529b\u505a\u597d\u51c6\u5907' }
        ]
      },
      {
        type: 'text',
        label: '10',
        title: '\u53cd\u601d\u4e0e\u6536\u83b7',
        content: '\u5317\u4eac\u4e0e\u7f8e\u56fd\u56e2\u961f\u7684\u8de8\u65f6\u533a\u534f\u4f5c\u9700\u8981\u6e05\u6670\u7684\u6587\u6863\u548c\u5f02\u6b65\u6c9f\u901a\u3002\u8bed\u97f3\u4ea4\u4e92\u8bbe\u8ba1\u9700\u8981\u4e0e\u89c6\u89c9\u4f18\u5148\u7684\u8bbe\u8ba1\u622a\u7136\u4e0d\u540c\u7684\u601d\u7ef4\u6a21\u578b\u2014\u2014\u65f6\u5e8f\u3001\u4e2d\u65ad\u5904\u7406\u548c\u72b6\u6001\u7ba1\u7406\u6210\u4e3a\u4e3b\u8981\u5173\u6ce8\u70b9\u3002Rocksteady \u8bbe\u8ba1\u7cfb\u7edf\u5728\u521b\u65b0\u4ea4\u4e92\u6a21\u5f0f\u7684\u540c\u65f6\u4fdd\u6301\u4e00\u81f4\u6027\uff0c\u8bc1\u660e\u4e86\u5176\u5de8\u5927\u4ef7\u503c\u3002'
      }
    ],
    acts: {
      act1: { title: '\u80cc\u666f', content: '' },
      act2: { title: '\u8bbe\u8ba1', content: '', decisionPoints: [] },
      act3: { title: '\u6210\u679c', content: '', impact: 'Dogfood \u4e0a\u7ebf' }
    },
    externalLinks: {
      behance: 'https://www.figma.com/design/1MdXjP52UK8cwvVo6VgzHD/Portfolio?node-id=455-35981&m=dev'
    }
  },"""

content = content[:zh_p1_obj_start] + zh_new + content[zh_p1_obj_end:]
print(f"ZH replaced OK")

with open(filepath, 'w') as f:
    f.write(content)

print("SUCCESS: Both EN and ZH p1 updated with caseSections")

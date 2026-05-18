#!/usr/bin/env python3
"""Add missing Figma slide content and category labels to caseSections."""

with open('constants.ts', 'r') as f:
    content = f.read()

# ====== EN: Replace from mockup section onwards ======
en_old_start = "        type: 'mockup',\n        title: 'Copilot Voice in Word',"
en_old_end = "        content: 'Cross-timezone collaboration between Beijing and US teams required clear documentation and async communication. Designing for voice interaction demands a fundamentally different mental model than visual-first design \u2014 timing, interruption handling, and state management become primary concerns.'\n      }"

en_start_idx = content.find(en_old_start)
en_end_idx = content.find(en_old_end) + len(en_old_end)

en_new_sections = """        type: 'mockup',
        category: 'DESIGN RATIONALE',
        title: 'Copilot Voice in Word',
        subtitle: 'Interactive voice companion embedded within the familiar Word reading experience',
        image: '/projects/read-aloud/word-mockup-1.png'
      },
      {
        type: 'design-rationale',
        category: 'DESIGN RATIONALE',
        label: '08',
        title: 'From Suggestions to Voice States: Elevating the Visual Entry for Active Interaction',
        content: 'This design effectively guides users to speak up, improving the discoverability and usage of voice entry points, and promoting voice features as a key driver of usage growth.',
        steps: [
          { label: 'Observe dynamic waveform' },
          { label: 'See prompt: \\"You Can Say...\\"' },
          { label: 'Click or reference a suggestion' },
          { label: 'Activate microphone' }
        ],
        image: '/projects/read-aloud/word-mockup-2.png'
      },
      {
        type: 'design-rationale',
        category: 'DESIGN RATIONALE',
        label: '09',
        title: 'From Playback Control to Customization: Building Tempo Ownership for Voice Reading',
        content: 'Addressing two reading needs by providing flexible model switching entry points, helping users control reading density while improving the voice reading experience through controllable content tempo and feedback mechanisms.',
        steps: [
          { label: 'Determine current reading goal' },
          { label: 'Full original playback or Summary quick focus' },
          { label: 'Select appropriate model' },
          { label: 'From passive listening to interactive expectation' }
        ],
        image: '/projects/read-aloud/word-mockup-1.png'
      },
      {
        type: 'mockup',
        category: 'DESIGN RATIONALE',
        title: 'Summary Reading with AI-Generated Summaries',
        subtitle: 'Copilot Voice generates and reads document summaries, transforming long documents into digestible audio content',
        image: '/projects/read-aloud/word-mockup-2.png'
      },
      {
        type: 'interaction-path',
        category: 'DESIGN FOUNDATION',
        label: '10',
        title: 'From Pain Points to Breakthrough: Building ReadAloud\\'s New Interaction Path',
        subtitle: 'Users don\\'t just need to \\"hear documents\\" \u2014 they need to \\"understand content\\". Understanding depends on active participation and real-time feedback.',
        steps: [
          { label: '\ud83c\udfa7 Listen' },
          { label: '\u2753 Ask / Answer' },
          { label: '\ud83d\udd01 Resume' }
        ],
        rows: [
          { action: 'Click Read Aloud', feedback: 'Launch Copilot Voice toolbar, begin reading', value: 'Immersive reading, improved focus' },
          { action: 'Switch mode (Original / Summary)', feedback: 'UI shows current reading mode, content switches in real-time', value: 'Choose info density per task' },
          { action: 'Click microphone to ask', feedback: 'Pause playback, recognize speech, deliver voice answer', value: 'Get explanations or summaries needed' },
          { action: 'Resume playback', feedback: 'System prompts \\"Continue Reading\\", auto/manual resume', value: 'Maintain continuity, return to task flow' }
        ],
        content: 'In questioning scenarios, users can ask any natural language question: \\"What is the key argument of this section?\\" \\"What does this mean?\\" \\"Can you simplify this?\\" \\"Please summarize the previous section.\\"'
      },
      {
        type: 'state-flow',
        category: 'DESIGN RATIONALE',
        label: '11',
        title: 'From Playback to Question to Resumption: The Rhythm of Conversational Reading',
        content: 'Before Copilot Voice, Word\\'s ReadAloud was a passive listen-only feature. Users could only click play, listen linearly, with no ability to interact. Here is the new conversational flow:',
        items: [
          { title: 'Speaking', color: '#2DA562', description: 'Reading document aloud', number: '1' },
          { title: 'Mic Activated', color: '#E97548', description: 'User clicks mic button', number: '2' },
          { title: 'Listening', color: '#E97548', description: 'Capturing voice input', number: '3' },
          { title: 'Thinking', color: '#8B5CF6', description: 'Processing via Copilot', number: '4' },
          { title: 'Answering', color: '#2DA562', description: 'Speaking the response', number: '5' },
          { title: 'Auto Resume', color: '#2DA562', description: 'Returns to reading', number: '6' }
        ]
      },
      {
        type: 'validation',
        category: 'DESIGN VALIDATION',
        label: '12',
        title: 'From Usage Growth to Behavior Change: Validating the Real Value of Voice Experience',
        subtitle: 'To validate the real value of Copilot Voice after Dogfood launch, we collected multi-dimensional user behavior data covering usage frequency, feature engagement, and user sentiment changes.',
        stats: [
          { value: '+37%', label: 'Overall User Utilization Rate', description: 'Post-launch utilization rate increased significantly' },
          { value: '+92%', label: 'Data-Driven Highlight', description: 'Mic usage rate saw dramatic growth' },
          { value: '62%', label: 'Active Interruption for Questions', description: 'Demonstrates successful \\"passive to active\\" behavior shift' }
        ],
        quotes: [
          { avatar: '\ud83d\ude0a', text: 'It lets me think while doing other things. Instead of just passively reading along, this approach makes me more engaged with the document content.' },
          { avatar: '\ud83e\udd29', text: 'This is the first time a reading tool can \\"talk back to me.\\" Not only can it read, it can also answer my questions. This has truly changed how I use Word.' },
          { avatar: '\ud83d\ude42', text: 'Processing long documents is so much easier now, especially when preparing reports. Copilot is like having a thoughtful voice assistant.' },
          { avatar: '\ud83d\ude04', text: 'We can pause and ask it questions anytime, then continue listening. It feels as natural as having a conversation.' }
        ],
        content: 'User satisfaction score rose from 3.4 (Read Aloud) to 4.6 (Copilot Voice). Top positive keywords: \\"intelligent\\", \\"natural\\", \\"like chatting\\".'
      },
      {
        type: 'text',
        category: 'DESIGN VALIDATION',
        label: '13',
        title: 'From Collaboration to Leadership: My Role Value in Copilot Voice',
        content: 'In the Copilot Voice project, I served as the sole visual and interaction design representative in the Beijing region. Throughout the entire project cycle, I drove multiple key milestones from requirements to final delivery.',
        image: '/projects/read-aloud/cover-bg-2.png'
      },
      {
        type: 'outcomes',
        label: '14',
        title: 'Results & Impact',
        subtitle: 'Successfully launched Dogfood version, transforming passive reading into active dialogue.',
        content: 'Dogfood Launch \u00b7 10M+ MAU',
        items: [
          { title: 'Product Delivery', description: 'Voice interruption, mode switching, and natural voice feedback system shipped in Dogfood' },
          { title: 'Visual Consistency', description: 'Full Rocksteady design system integration with Word UI token compliance' },
          { title: 'Interaction Model', description: '5 voice states (Working/Speaking/Waiting/Thinking/Listening) with seamless transitions' },
          { title: 'Scalability', description: 'Extensible architecture ready for podcast, accessibility, and future voice capabilities' }
        ]
      }"""

content = content[:en_start_idx] + en_new_sections + content[en_end_idx:]
print("EN sections replaced OK")

# ====== Also add category labels to existing EN sections ======
# hero - already has PROJECT OVERVIEW in code
# stats section
content = content.replace(
    "        type: 'stats',\n        label: '01',\n        title: 'Background',",
    "        type: 'stats',\n        category: 'PROJECT OVERVIEW',\n        label: '01',\n        title: 'Background',",
    1
)
# voice-states section
content = content.replace(
    "        type: 'voice-states',\n        label: '07',\n        title: 'Design System',",
    "        type: 'voice-states',\n        category: 'DESIGN SYSTEM',\n        label: '07',\n        title: 'Design System',",
    1
)
print("EN categories added OK")


# ====== ZH: Replace from mockup section onwards ======
zh_old_start = "        type: 'mockup',\n        title: 'Word \u4e2d\u7684 Copilot Voice',"
zh_old_end = "        content: '\u5317\u4eac\u4e0e\u7f8e\u56fd\u56e2\u961f\u7684\u8de8\u65f6\u533a\u534f\u4f5c\u9700\u8981\u6e05\u6670\u7684\u6587\u6863\u548c\u5f02\u6b65\u6c9f\u901a\u3002\u8bed\u97f3\u4ea4\u4e92\u8bbe\u8ba1\u9700\u8981\u4e0e\u89c6\u89c9\u4f18\u5148\u7684\u8bbe\u8ba1\u622a\u7136\u4e0d\u540c\u7684\u601d\u7ef4\u6a21\u578b\u2014\u2014\u65f6\u5e8f\u3001\u4e2d\u65ad\u5904\u7406\u548c\u72b6\u6001\u7ba1\u7406\u6210\u4e3a\u4e3b\u8981\u5173\u6ce8\u70b9\u3002'\n      }"

zh_start_idx = content.find(zh_old_start)
zh_end_idx = content.find(zh_old_end) + len(zh_old_end)

zh_new_sections = """        type: 'mockup',
        category: 'DESIGN RATIONALE',
        title: 'Word \u4e2d\u7684 Copilot Voice',
        subtitle: '\u5d4c\u5165\u719f\u6089\u7684 Word \u9605\u8bfb\u4f53\u9a8c\u4e2d\u7684\u667a\u80fd\u8bed\u97f3\u4f34\u8bfb',
        image: '/projects/read-aloud/word-mockup-1.png'
      },
      {
        type: 'design-rationale',
        category: 'DESIGN RATIONALE',
        label: '08',
        title: '\u4ece\u5efa\u8bae\u8bed\u5230\u8bed\u97f3\u72b6\u6001\uff1a\u63d0\u5347\u4e3b\u52a8\u4ea4\u4e92\u7684\u89c6\u89c9\u5165\u53e3',
        content: '\u8be5\u8bbe\u8ba1\u6709\u6548\u5f15\u5bfc\u7528\u6237\u5f00\u53e3\u53d1\u8a00\uff0c\u63d0\u5347\u8bed\u97f3\u5165\u53e3\u7684\u53ef\u53d1\u73b0\u6027\u548c\u4f7f\u7528\u7387\uff0c\u662f\u4fc3\u8fdb\u8bed\u97f3\u529f\u80fd\u4f7f\u7528\u7387\u63d0\u5347\u7684\u91cd\u8981\u624b\u6bb5\u3002',
        steps: [
          { label: '\u7528\u6237\u89c2\u5bdf\u52a8\u6001\u6ce2\u5f62' },
          { label: '\u5f15\u5bfc\u8bed\u63d0\u793a\u201cYou Can Say...\u201d' },
          { label: '\u70b9\u51fb\u6216\u53c2\u8003\u5efa\u8bae\u53e5' },
          { label: '\u6fc0\u6d3b\u9ea6\u514b\u98ce\u63d0\u95ee' }
        ],
        image: '/projects/read-aloud/word-mockup-2.png'
      },
      {
        type: 'design-rationale',
        category: 'DESIGN RATIONALE',
        label: '09',
        title: '\u4ece\u63a7\u5236\u64ad\u653e\u5230\u5b9a\u5236\u4f53\u9a8c\uff1a\u6784\u5efa\u8bed\u97f3\u9605\u8bfb\u7684\u8282\u594f\u4e3b\u63a7\u6743',
        content: '\u9488\u5bf9\u4e24\u7c7b\u9605\u8bfb\u9700\u6c42\u63d0\u4f9b\u7075\u6d3b\u5207\u6362\u7684\u6a21\u578b\u5165\u53e3\uff0c\u5e2e\u52a9\u7528\u6237\u628a\u63a7\u9605\u8bfb\u5bc6\u5ea6\uff1b\u540c\u65f6\u901a\u8fc7\u53ef\u63a7\u7684\u5185\u5bb9\u8282\u594f\u4e0e\u53cd\u9988\u673a\u5236\uff0c\u63d0\u5347\u7528\u6237\u7684\u8bed\u97f3\u9605\u8bfb\u4f53\u9a8c\u3002',
        steps: [
          { label: '\u786e\u5b9a\u5f53\u524d\u9605\u8bfb\u76ee\u6807' },
          { label: '\u5b8c\u6574\u64ad\u653e\u539f\u6587\u6216 Summary \u5feb\u901f\u805a\u7126' },
          { label: '\u9009\u62e9\u6070\u5f53\u7684\u6a21\u578b' },
          { label: '\u4ece\u88ab\u52a8\u542c\u8bfb\u5230\u4ea4\u4e92\u671f\u5f85' }
        ],
        image: '/projects/read-aloud/word-mockup-1.png'
      },
      {
        type: 'mockup',
        category: 'DESIGN RATIONALE',
        title: '\u6458\u8981\u6a21\u5f0f\u9605\u8bfb\u4e0e AI \u751f\u6210\u6458\u8981',
        subtitle: 'Copilot Voice \u751f\u6210\u5e76\u6717\u8bfb\u6587\u6863\u6458\u8981\uff0c\u5c06\u957f\u6587\u6863\u8f6c\u5316\u4e3a\u6613\u4e8e\u6d88\u5316\u7684\u97f3\u9891\u5185\u5bb9',
        image: '/projects/read-aloud/word-mockup-2.png'
      },
      {
        type: 'interaction-path',
        category: 'DESIGN FOUNDATION',
        label: '10',
        title: '\u4ece\u75db\u70b9\u5230\u7a81\u7834\uff1a\u6784\u5efa ReadAloud \u7684\u5168\u65b0\u4ea4\u4e92\u8def\u5f84',
        subtitle: '\u7528\u6237\u9700\u8981\u7684\u4e0d\u4ec5\u662f\u201c\u542c\u5b8c\u6587\u6863\u201d\uff0c\u800c\u662f\u201c\u7406\u89e3\u5185\u5bb9\u201d\u2014\u2014\u800c\u7406\u89e3\u4f9d\u8d56\u4e8e\u4e3b\u52a8\u53c2\u4e0e\u548c\u5373\u65f6\u53cd\u9988\u3002',
        steps: [
          { label: '\ud83c\udfa7 \u8046\u542c Listen' },
          { label: '\u2753 \u63d0\u95ee Ask / Answer' },
          { label: '\ud83d\udd01 \u56de\u542c Resume' }
        ],
        rows: [
          { action: '\u70b9\u51fb Read Aloud', feedback: '\u542f\u52a8 Copilot Voice \u5de5\u5177\u680f\uff0c\u5f00\u59cb\u6717\u8bfb\u6587\u6863', value: '\u6c89\u6d78\u5f0f\u9605\u8bfb\uff0c\u63d0\u5347\u4e13\u6ce8\u529b' },
          { action: '\u5207\u6362\u6a21\u5f0f\uff08\u539f\u6587 / \u6458\u8981\uff09', feedback: 'UI \u663e\u793a\u5f53\u524d\u9605\u8bfb\u6a21\u5f0f\uff0c\u6717\u8bfb\u5185\u5bb9\u5b9e\u65f6\u5207\u6362', value: '\u6839\u636e\u4efb\u52a1\u9009\u62e9\u4e0d\u540c\u4fe1\u606f\u5bc6\u5ea6' },
          { action: '\u70b9\u51fb\u9ea6\u514b\u98ce\u6309\u94ae\u63d0\u95ee', feedback: '\u6682\u505c\u64ad\u653e\uff0c\u8bed\u97f3\u8bc6\u522b\u63d0\u95ee\u5185\u5bb9\u5e76\u5f00\u59cb\u8f93\u51fa\u8bed\u97f3\u56de\u7b54', value: '\u7528\u6237\u83b7\u5f97\u6240\u9700\u89e3\u91ca\u6216\u603b\u7ed3' },
          { action: '\u4e3b\u52a8\u70b9\u51fb\u64ad\u653e', feedback: '\u7cfb\u7edf\u63d0\u793a\u201c\u7ee7\u7eed\u9605\u8bfb\u201d\uff0c\u81ea\u52a8/\u624b\u52a8\u6062\u590d\u6717\u8bfb', value: '\u4fdd\u6301\u8fde\u7eed\u6027\uff0c\u56de\u5230\u4efb\u52a1\u6d41' }
        ],
        content: '\u63d0\u95ee\u573a\u666f\u4e2d\uff0c\u7528\u6237\u53ef\u4ee5\u63d0\u51fa\u4efb\u610f\u81ea\u7136\u8bed\u8a00\u95ee\u9898\uff1a\u201c\u8fd9\u6bb5\u7684\u6838\u5fc3\u89c2\u70b9\u662f\u4ec0\u4e48\uff1f\u201d\u201c\u5b83\u662f\u4ec0\u4e48\u610f\u601d\uff1f\u201d\u201c\u53ef\u4ee5\u7528\u66f4\u7b80\u5355\u7684\u8bdd\u8bf4\u4e00\u904d\u5417\uff1f\u201d\u201c\u8bf7\u518d\u603b\u7ed3\u4e00\u4e0b\u4e0a\u4e00\u4e2a\u6bb5\u843d\u3002\u201d'
      },
      {
        type: 'state-flow',
        category: 'DESIGN RATIONALE',
        label: '11',
        title: '\u4ece\u64ad\u653e\u5230\u63d0\u95ee\u518d\u5230\u56de\u8bfb\uff1a\u5bf9\u8bdd\u5f0f\u9605\u8bfb\u7684\u4f53\u9a8c\u8282\u594f',
        content: '\u5728 Copilot Voice \u9879\u76ee\u542f\u52a8\u4e4b\u524d\uff0cWord \u4e2d\u7684 ReadAloud \u662f\u4e00\u4e2a\u4ee5\u88ab\u52a8\u542c\u53d6\u4e3a\u4e3b\u7684\u529f\u80fd\u3002\u7528\u6237\u70b9\u51fb\u64ad\u653e\u6309\u94ae\u540e\uff0c\u4ec5\u80fd\u7ebf\u6027\u5730\u6536\u542c\u6587\u6863\u5185\u5bb9\uff0c\u7f3a\u4e4f\u4ea4\u4e92\u80fd\u529b\u3002\u4ee5\u4e0b\u662f\u5168\u65b0\u7684\u5bf9\u8bdd\u5f0f\u6d41\u7a0b\uff1a',
        items: [
          { title: '\u64ad\u653e\u4e2d Speaking', color: '#2DA562', description: '\u6b63\u5728\u6717\u8bfb\u6587\u6863', number: '1' },
          { title: '\u7528\u6237\u6fc0\u6d3b Mic', color: '#E97548', description: '\u70b9\u51fb\u9ea6\u514b\u98ce\u6309\u94ae', number: '2' },
          { title: '\u8bed\u97f3\u8f93\u5165 Listening', color: '#E97548', description: '\u6355\u6349\u7528\u6237\u8bed\u97f3', number: '3' },
          { title: '\u7cfb\u7edf\u601d\u8003 Thinking', color: '#8B5CF6', description: '\u901a\u8fc7 Copilot \u5904\u7406', number: '4' },
          { title: '\u7cfb\u7edf\u4f5c\u7b54 Speaking', color: '#2DA562', description: '\u8bed\u97f3\u56de\u590d\u7528\u6237', number: '5' },
          { title: '\u81ea\u52a8\u6062\u590d\u9605\u8bfb', color: '#2DA562', description: '\u56de\u5230\u6717\u8bfb\u4f4d\u7f6e', number: '6' }
        ]
      },
      {
        type: 'validation',
        category: 'DESIGN VALIDATION',
        label: '12',
        title: '\u4ece\u4f7f\u7528\u63d0\u5347\u5230\u884c\u4e3a\u8f6c\u53d8\uff1a\u9a8c\u8bc1 Voice \u4f53\u9a8c\u7684\u771f\u5b9e\u4ef7\u503c',
        subtitle: '\u4e3a\u9a8c\u8bc1 Copilot Voice \u529f\u80fd\u4e0a\u7ebfDogfood\u7684\u7248\u672c\u540e\u7684\u771f\u5b9e\u4ef7\u503c\uff0c\u6211\u4eec\u6536\u96c6\u4e86\u591a\u9879\u7528\u6237\u884c\u4e3a\u6570\u636e\uff0c\u6db5\u76d6\u4f7f\u7528\u9891\u6b21\u3001\u529f\u80fd\u89e6\u53d1\u53ca\u7528\u6237\u53cd\u9988\u53d8\u5316\u3002',
        stats: [
          { value: '+37%', label: '\u7528\u6237\u6574\u4f53\u4f7f\u7528\u7387', description: '\u4e0a\u7ebf\u540e\u6574\u4f53\u4f7f\u7528\u9891\u7387\u663e\u8457\u63d0\u5347' },
          { value: '+92%', label: '\u6570\u636e\u9a71\u52a8\u4eae\u70b9', description: 'Mic \u542f\u7528\u7387\u5927\u5e45\u589e\u957f' },
          { value: '62%', label: '\u4e3b\u52a8\u4e2d\u65ad\u63d0\u95ee\u5360\u6bd4', description: '\u4f53\u73b0\u201c\u88ab\u52a8\u5230\u4e3b\u52a8\u201d\u884c\u4e3a\u8f6c\u53d8\u6210\u529f' }
        ],
        quotes: [
          { avatar: '\ud83d\ude0a', text: '\u5b83\u8ba9\u6211\u8fb9\u505a\u4e8b\u8fb9\u601d\u8003\uff0c\u4e0d\u518d\u50cf\u4ee5\u524d\u90a3\u6837\u53ea\u662f\u88ab\u52a8\u8ddf\u8bfb\u3002\u8fd9\u79cd\u4ea4\u4e92\u8ba9\u6211\u66f4\u5bb9\u6613\u6c89\u6d78\u5728\u6587\u6863\u5185\u5bb9\u91cc\u3002' },
          { avatar: '\ud83e\udd29', text: '\u6211\u7b2c\u4e00\u6b21\u53d1\u73b0\u6717\u8bfb\u529f\u80fd\u80fd\u591f\u201c\u8ddf\u6211\u8bf4\u8bdd\u201d\u4e86\u3002\u4e0d\u4ec5\u80fd\u8bfb\uff0c\u8fd8\u80fd\u56de\u7b54\u6211\u5728\u542c\u7684\u65f6\u5019\u7684\u5185\u5bb9\uff0c\u8fd9\u771f\u7684\u6539\u53d8\u4e86\u6211\u4f7f\u7528 Word \u7684\u65b9\u5f0f\u3002' },
          { avatar: '\ud83d\ude42', text: '\u73b0\u5728\u6211\u5904\u7406\u957f\u6587\u6863\u8f7b\u677e\u591a\u4e86\uff0c\u7279\u522b\u662f\u5728\u51c6\u5907\u62a5\u544a\u6216\u5199\u4f5c\u65f6\uff0cCopilot \u5c31\u50cf\u4e2a\u5468\u5230\u7684\u8bed\u97f3\u52a9\u624b\u3002' },
          { avatar: '\ud83d\ude04', text: '\u6211\u4eec\u53ef\u4ee5\u968f\u65f6\u6682\u505c\u95ee\u5b83\u63d0\u95ee\uff0c\u7136\u540e\u7ee7\u7eed\u542c\u4e0b\u53bb\uff0c\u5c31\u50cf\u548c\u4eba\u5bf9\u8bdd\u4e00\u6837\u81ea\u7136\u3002' }
        ],
        content: '\u7528\u6237\u603b\u4f53\u6ee1\u610f\u5ea6\u4ece 3.4\uff08Read Aloud\uff09\u4e0a\u5347\u81f3 4.6\uff08Copilot Voice\uff09\u3002\u65b0\u7528\u6237\u597d\u8bc4\u5173\u952e\u8bcd\u9ad8\u9891\u96c6\u4e2d\u5728\uff1a\u201c\u667a\u80fd\u201d\u3001\u201c\u81ea\u7136\u201d\u3001\u201c\u50cf\u804a\u5929\u201d\u3002'
      },
      {
        type: 'text',
        category: 'DESIGN VALIDATION',
        label: '13',
        title: '\u4ece\u534f\u4f5c\u5230\u5f15\u9886\uff1a\u6211\u5728 Copilot Voice \u4e2d\u7684\u89d2\u8272\u4ef7\u503c',
        content: '\u5728 Copilot Voice \u9879\u76ee\u4e2d\uff0c\u6211\u4e0d\u4ec5\u627f\u62c5\u4e86\u4e2d\u56fd\u533a\u7684\u552f\u4e00\u89c6\u89c9\u4e0e\u4ea4\u4e92\u8bbe\u8ba1\u5e08\u89d2\u8272\uff0c\u66f4\u5728\u6574\u4e2a\u9879\u76ee\u5468\u671f\u4e2d\uff0c\u4ece\u9700\u6c42\u5230\u6700\u7ec8\u4ea4\u4ed8\uff0c\u6301\u7eed\u9a71\u52a8\u591a\u4e2a\u5173\u952e\u73af\u8282\u3002',
        image: '/projects/read-aloud/cover-bg-2.png'
      },
      {
        type: 'outcomes',
        label: '14',
        title: '\u6210\u679c\u4e0e\u5f71\u54cd',
        subtitle: '\u6210\u529f\u4e0a\u7ebf Dogfood \u7248\u672c\uff0c\u5c06\u88ab\u52a8\u9605\u8bfb\u8f6c\u5316\u4e3a\u4e3b\u52a8\u5bf9\u8bdd\u3002',
        content: 'Dogfood \u4e0a\u7ebf \u00b7 1000\u4e07+ MAU',
        items: [
          { title: '\u4ea7\u54c1\u4ea4\u4ed8', description: '\u8bed\u97f3\u4e2d\u65ad\u3001\u6a21\u5f0f\u5207\u6362\u3001\u81ea\u7136\u8bed\u97f3\u53cd\u9988\u7cfb\u7edf\u5df2\u5728 Dogfood \u4e2d\u4ea4\u4ed8' },
          { title: '\u89c6\u89c9\u4e00\u81f4\u6027', description: '\u5b8c\u6574\u96c6\u6210 Rocksteady \u8bbe\u8ba1\u7cfb\u7edf\uff0c\u7b26\u5408 Word UI token \u89c4\u8303' },
          { title: '\u4ea4\u4e92\u6a21\u578b', description: '5 \u79cd\u8bed\u97f3\u72b6\u6001\uff08Working/Speaking/Waiting/Thinking/Listening\uff09\u65e0\u7f1d\u8fc7\u6e21' },
          { title: '\u53ef\u6269\u5c55\u6027', description: '\u53ef\u6269\u5c55\u67b6\u6784\uff0c\u4e3a podcast\u3001\u65e0\u969c\u788d\u548c\u672a\u6765\u8bed\u97f3\u80fd\u529b\u505a\u597d\u51c6\u5907' }
        ]
      }"""

content = content[:zh_start_idx] + zh_new_sections + content[zh_end_idx:]
print("ZH sections replaced OK")

# Add category labels to ZH existing sections
content = content.replace(
    "        type: 'stats',\n        label: '01',\n        title: '\u80cc\u666f',",
    "        type: 'stats',\n        category: 'PROJECT OVERVIEW',\n        label: '01',\n        title: '\u80cc\u666f',",
    1
)
content = content.replace(
    "        type: 'voice-states',\n        label: '07',\n        title: '\u8bbe\u8ba1\u7cfb\u7edf',",
    "        type: 'voice-states',\n        category: 'DESIGN SYSTEM',\n        label: '07',\n        title: '\u8bbe\u8ba1\u7cfb\u7edf',",
    1
)
print("ZH categories added OK")

with open('constants.ts', 'w') as f:
    f.write(content)
print("SUCCESS - file written")

import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Linkedin, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const ResumePage: React.FC = () => {
  const { language } = useLanguage();
  const isZh = language === 'zh';

  const skills = [
    { label: isZh ? 'AI 产品体验设计' : 'AI Product Experience', accent: true },
    { label: 'UX Design', accent: true },
    { label: isZh ? '视觉设计' : 'Visual Design', accent: true },
    { label: isZh ? '品牌/设计系统' : 'Brand / Design Systems' },
    { label: 'AI Workflow', accent: true },
    { label: isZh ? '设计自动化' : 'Design Automation' },
    { label: '3D Visual' },
  ];

  const tools: Record<string, string> = {
    Design: 'Figma, Sketch, Ps, Ai, AE, Pr',
    '3D': 'Blender, Spline',
    'AI (Focus)': 'Copilot, Claude, Gemini, Cursor, VS Code',
  };

  const fadeIn = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay, duration: 0.5 },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative pt-28 sm:pt-32 pb-20 sm:pb-32 px-4 sm:px-6 md:px-12 min-h-screen bg-[#f6f3f1]"
    >
      <div className="max-w-3xl mx-auto space-y-10">

        {/* Header */}
        <motion.div {...fadeIn(0.1)} className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-neutral-100">
          <div className="flex items-center gap-5 mb-6">
            <div className="w-20 h-20 rounded-full bg-neutral-200 overflow-hidden flex-shrink-0">
              <img src="/profile.jpg" alt="Geli Guo" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 font-['Instrument_Serif']">郭格里</h1>
              <p className="text-sm text-neutral-500 italic font-['Instrument_Serif']">Bella</p>
              <p className="text-base font-semibold text-neutral-700 mt-1">
                {isZh ? 'AI 产品体验设计师' : 'AI Product Experience Designer'}
              </p>
              <p className="text-xs text-neutral-400 font-mono mt-0.5">UI/UX × Generative AI</p>
            </div>
          </div>

          <p className="text-sm text-neutral-600 leading-relaxed mb-5 italic font-['Instrument_Serif']">
            {isZh
              ? '我相信 AI 是这个时代最伟大的魔法，也一直在把复杂技术偷偷设计得更温暖一点。'
              : "I believe AI is the greatest magic of our era — and I'm quietly designing it to feel a little warmer."}
          </p>

          <p className="text-sm text-neutral-600 leading-relaxed mb-6">
            {isZh
              ? '拥有品牌设计，视觉设计与 UI/UX 背景。目前专注于 AI 产品体验、生成式 AI 与创作者工具方向。参与过 AI 图像生成、图像编辑、AI 语音交互、Agent 等多类型 AI 产品体验设计，包括 Copilot Imagine、Word Read Aloud 等项目，同时持续探索 AI Workflow、设计自动化与 Design-to-Code 等新型创作方式。'
              : "Background in brand design, visual design, and UI/UX. Currently focused on AI product experience, generative AI, and creator tools. Involved in diverse AI product experience design including image generation, image editing, voice interaction, and Agent systems — including Copilot Imagine and Word Read Aloud — while continuously exploring AI Workflow, design automation, and Design-to-Code."}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {['Generative AI', isZh ? '多模态交互' : 'Multimodal', 'AI Workflow', 'Prompt Design', 'Design System', 'Design-to-Code', isZh ? '创作者工具' : 'Creator Tools', 'AI Agent'].map((tag, i) => (
              <span key={i} className="text-xs px-3 py-1 rounded-full bg-neutral-100 text-neutral-600">{tag}</span>
            ))}
          </div>

          {/* Contact */}
          <div className="flex flex-wrap gap-4 text-xs text-neutral-500">
            <a href="mailto:albellatross@gmail.com" className="flex items-center gap-1.5 hover:text-neutral-800 transition-colors">
              <Mail size={14} /> albellatross@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/geli-guo-239807164/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-neutral-800 transition-colors">
              <Linkedin size={14} /> LinkedIn
            </a>
            <a href="https://www.behance.net/albellatrocb95" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-neutral-800 transition-colors">
              <Globe size={14} /> Behance
            </a>
          </div>
        </motion.div>

        {/* Currently Focusing */}
        <motion.div {...fadeIn(0.15)} className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-neutral-100">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">Currently Focusing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: isZh ? 'AI 产品体验' : 'AI Product Experience',
                desc: isZh ? '探索生成式 AI、多模态交互与自然语言编辑体验，让复杂 AI 能力更容易理解与使用。' : 'Exploring generative AI, multimodal interaction, and natural language editing to make complex AI capabilities easier to understand and use.',
              },
              {
                title: 'AI Workflow',
                desc: isZh ? '持续实践 Prompt Workflow、Design-to-Code 与 AI Presentation 等设计自动化流程。' : 'Practicing Prompt Workflow, Design-to-Code, and AI Presentation automation pipelines.',
              },
              {
                title: isZh ? '创作者工具' : 'Creator Tools',
                desc: isZh ? '关注 AI 创作者工具与内容系统设计，包括模板化生成、图像编辑与创作体验优化。' : 'Focusing on AI creator tools and content systems — templated generation, image editing, and creative experience optimization.',
              },
            ].map((item, i) => (
              <div key={i} className="p-4 rounded-xl bg-neutral-50 border-t-2 border-neutral-200">
                <h3 className="text-sm font-semibold text-neutral-800 mb-2">{item.title}</h3>
                <p className="text-xs text-neutral-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Work Experience */}
        <motion.div {...fadeIn(0.2)} className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-neutral-100">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-8">{isZh ? '工作经历' : 'Work Experience'}</h2>

          {/* STCA */}
          <div className="relative pl-5 border-l-2 border-neutral-200 mb-10">
            <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-neutral-800 ring-4 ring-neutral-100" />
            <h3 className="text-base font-semibold text-neutral-900 font-['Instrument_Serif']">Microsoft STCA</h3>
            <p className="text-sm text-neutral-500">UI/UX Designer</p>
            <p className="text-xs font-mono text-neutral-400 mb-4">2025.02 – {isZh ? '至今' : 'Present'}</p>

            <div className="mb-5">
              <h4 className="text-sm font-semibold text-neutral-800 mb-1">M365 — Word · {isZh ? 'AI 语音交互' : 'AI Voice Interaction'}</h4>
              <p className="text-xs font-mono text-neutral-400 mb-2">2025.02 – 2025.07</p>
              <ul className="space-y-1 text-sm text-neutral-600 leading-relaxed">
                <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '参与 Word Read Aloud 的体验设计，将"阅读工具"升级为"语音交互体验"' : 'Participated in Word Read Aloud experience design, upgrading "reading tool" to "voice interaction experience"'}</li>
                <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '设计语音播放/控制/反馈的交互结构，降低长文信息理解成本' : 'Designed interaction structure for voice playback/control/feedback, reducing long-text comprehension cost'}</li>
                <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '跨时区协作推进方案落地，并参与 Coach AI 写作辅助方向探索' : 'Cross-timezone collaboration for implementation; explored Coach AI writing assistant direction'}</li>
              </ul>
            </div>

            <div className="mb-5">
              <h4 className="text-sm font-semibold text-neutral-800 mb-1">Copilot — Copilot Imagine · {isZh ? 'AI 图像生成' : 'AI Image Generation'}</h4>
              <p className="text-xs font-mono text-neutral-400 mb-2">2025.08 – {isZh ? '至今' : 'Present'}</p>
              <div className="mb-3">
                <p className="text-xs font-semibold text-neutral-700 mb-1">{isZh ? '图像生成（内容系统）' : 'Image Generation (Content System)'}</p>
                <ul className="space-y-1 text-sm text-neutral-600 leading-relaxed">
                  <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '生成 230 / 429 张生产级图像，为核心内容贡献者之一' : 'Generated 230/429 production images, one of the core content contributors'}</li>
                  <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '设计并落地 12 个模板（Templates），提升内容规模化生产与一致性' : 'Designed and shipped 12 Templates, improving scalable content production and consistency'}</li>
                  <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '优化 prompt 结构与风格约束，提升生成结果稳定性与可控性' : 'Optimized prompt structure and style constraints for improved generation stability and controllability'}</li>
                </ul>
              </div>
              <div className="mb-3">
                <p className="text-xs font-semibold text-neutral-700 mb-1">{isZh ? '图像编辑（多模态交互）' : 'Image Editing (Multimodal Interaction)'}</p>
                <ul className="space-y-1 text-sm text-neutral-600 leading-relaxed">
                  <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '定义多模态编辑的交互逻辑' : 'Defined interaction logic for multimodal editing'}</li>
                  <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '建立"选区 + 自然语言"的编辑范式' : 'Established "selection + natural language" editing paradigm'}</li>
                  <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '把 AI 能力转化成用户可控的操作体验' : 'Transformed AI capabilities into user-controllable operation experience'}</li>
                </ul>
              </div>
            </div>

            <div className="mb-5">
              <h4 className="text-sm font-semibold text-neutral-800 mb-1">Copilot — Copilot Education · {isZh ? 'AI 教育' : 'AI Education'}</h4>
              <p className="text-xs font-mono text-neutral-400 mb-2">2025.08 – {isZh ? '至今' : 'Present'}</p>
              <ul className="space-y-1 text-sm text-neutral-600 leading-relaxed">
                <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '负责 Campus 主页的信息架构与功能优化' : 'Led Campus homepage information architecture & optimization'}</li>
                <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '设计 Add School 完整流程（学校搜索/校验/验证/状态反馈）' : 'Designed complete Add School flow (search/validation/verification/status feedback)'}</li>
                <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '设计 Course Search 信息结构与筛选逻辑' : 'Designed Course Search information structure and filtering logic'}</li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-neutral-800 mb-1">{isZh ? '创新与跨团队' : 'Innovation & Cross-team'}</h4>
              <ul className="space-y-1 text-sm text-neutral-600 leading-relaxed">
                <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '主导节假日小游戏（0→1），完成从概念到视觉与交互的整体设计' : 'Led holiday mini-game (0→1), full design from concept to visual and interaction'}</li>
                <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '参与 3D IP 形象设计' : 'Participated in 3D IP character design'}</li>
                <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? 'STCA Studio 8 Demo vibe coding 项目获「最具创新 Demo 奖」' : 'Won "Most Innovative Demo Award" for vibe coding project at STCA Studio 8 Demo'}</li>
              </ul>
            </div>
          </div>

          {/* MSRA */}
          <div className="relative pl-5 border-l-2 border-neutral-200 mb-10">
            <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-neutral-400 ring-4 ring-neutral-100" />
            <h3 className="text-base font-semibold text-neutral-900 font-['Instrument_Serif']">Microsoft Research Asia (MSRA)</h3>
            <p className="text-sm text-neutral-500">UI/UX Designer</p>
            <p className="text-xs font-mono text-neutral-400 mb-4">2022.06 – 2025.02</p>

            <ul className="space-y-1 text-sm text-neutral-600 leading-relaxed mb-4">
              <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '主导多个 AI-native 产品与研究项目的体验设计，覆盖生成式图像、3D Avatar、多智能体系统、认知陪伴与 AI Research Tooling' : 'Led experience design for multiple AI-native products covering generative imagery, 3D Avatar, multi-agent systems, cognitive companionship, and AI Research Tooling'}</li>
              <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '在缺乏成熟交互参考的早期阶段，独立定义 AI 产品的核心交互模式' : 'Independently defined core interaction patterns for AI products in early stages without mature references'}</li>
              <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '将复杂 AI 能力转化为用户可理解、可控制的产品体验' : 'Transformed complex AI capabilities into understandable, controllable product experiences'}</li>
            </ul>

            {[
              { name: 'NUWA Infinity', desc: isZh ? '微软早期生成式图像产品（2022），从 0→1 参与完整设计流程' : "Microsoft's early generative image product (2022), full design process from 0→1" },
              { name: 'RODIN Diffusion', desc: isZh ? 'AI 3D Avatar / Character Generation Platform' : 'AI 3D Avatar / Character Generation Platform' },
              { name: 'RD-Agent / Task Metrics', desc: isZh ? '多智能体研发辅助平台与 AI Research Tooling' : 'Multi-agent R&D platform and AI Research Tooling' },
              { name: 'ReMe', desc: isZh ? '面向认知障碍用户的 AI 对话产品' : 'AI conversation product for users with cognitive impairment' },
              { name: 'Value Compass / Research Showcase', desc: isZh ? 'AI 价值体系与研究成果展示平台' : 'AI value system and research showcase platform' },
              { name: 'Brand & Design Systems', desc: isZh ? '建立多个 AI Research 项目的品牌视觉与设计规范' : 'Established brand visuals and design specs for multiple AI Research projects' },
            ].map((p, i) => (
              <div key={i} className="mb-3">
                <h4 className="text-sm font-semibold text-neutral-800">{p.name}</h4>
                <p className="text-xs text-neutral-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          {/* FOM Studio */}
          <div className="relative pl-5 border-l-2 border-neutral-200">
            <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-neutral-300 ring-4 ring-neutral-100" />
            <h3 className="text-base font-semibold text-neutral-900 font-['Instrument_Serif']">FOM Studio{isZh ? '（米兰）' : ' (Milan)'}</h3>
            <p className="text-sm text-neutral-500">Design Intern</p>
            <p className="text-xs font-mono text-neutral-400 mb-3">2021.08 – 2021.12</p>
            <ul className="space-y-1 text-sm text-neutral-600 leading-relaxed">
              <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '参与 loete 茶叶店品牌包装与主视觉设计，设计成果应用于线下门店' : 'Participated in loete tea shop brand packaging and visual design, applied in physical store'}</li>
              <li className="flex items-start gap-2"><span className="text-neutral-400 mt-0.5">·</span>{isZh ? '参与意大利 Fera 风力发电公司的视觉系统' : 'Participated in visual system for Italian wind power company Fera'}</li>
            </ul>
          </div>
        </motion.div>

        {/* Skills & Tools */}
        <motion.div {...fadeIn(0.25)} className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-neutral-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">{isZh ? '技能' : 'Skills'}</h2>
              <div className="flex flex-wrap gap-2">
                {skills.map((s, i) => (
                  <span key={i} className={`text-xs px-3 py-1.5 rounded-full ${s.accent ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-600'}`}>
                    {s.label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">{isZh ? '工具' : 'Tools'}</h2>
              <div className="space-y-2">
                {Object.entries(tools).map(([cat, val]) => (
                  <div key={cat}>
                    <span className="text-xs font-mono text-neutral-400 uppercase">{cat}</span>
                    <p className="text-sm text-neutral-600">{val}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI & Design Systems */}
        <motion.div {...fadeIn(0.3)} className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-neutral-100">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">AI & Design Systems</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                title: 'AI Workflow & Design Automation',
                desc: isZh ? '构建从内容解析、信息结构到视觉生成的 AI 驱动设计流程' : 'Building AI-driven design pipelines from content parsing to visual generation',
                items: isZh ? ['搭建 AI Presentation Workflow', '建立可复用组件与视觉层级系统', '将重复性设计转化为系统化生成'] : ['Built AI Presentation Workflow', 'Established reusable component & visual hierarchy system', 'Transformed repetitive design into systematic generation'],
              },
              {
                title: 'Vibe Coding & AI Prototyping',
                desc: isZh ? '结合 VS Code、Copilot 与 AI 工具进行快速原型与自动化实践' : 'Rapid prototyping and automation with VS Code, Copilot, and AI tools',
                items: isZh ? ['AI 辅助完成前端原型与交互实验', '开发批量处理与内容生成工具', '一次性产出转化为可复用 workflow'] : ['AI-assisted frontend prototypes & interaction experiments', 'Developed batch processing & content generation tools', 'Converted one-off outputs into reusable workflows'],
              },
              {
                title: 'Generative AI & Creative Systems',
                desc: isZh ? '持续探索生成式 AI 在视觉创作与数字体验中的可能性' : 'Exploring generative AI in visual creation and digital experiences',
                items: isZh ? ['构建个人 IP「Bella Universe」', 'Prompt-driven 视觉创作体系', 'AI 图像生成、编辑与多模态表达'] : ['Building personal IP "Bella Universe"', 'Prompt-driven visual creation system', 'AI image generation, editing & multimodal expression'],
              },
            ].map((card, i) => (
              <div key={i} className="p-4 rounded-xl bg-neutral-50 border-l-2 border-neutral-300">
                <h3 className="text-xs font-semibold text-neutral-800 mb-1">{card.title}</h3>
                <p className="text-xs text-neutral-500 mb-2">{card.desc}</p>
                <ul className="space-y-0.5">
                  {card.items.map((item, j) => (
                    <li key={j} className="text-xs text-neutral-500 flex items-start gap-1.5">
                      <span className="text-neutral-400">·</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* At a Glance */}
          <div className="mt-6 p-5 rounded-xl bg-neutral-100 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
            {[
              { num: '10+', label: isZh ? 'AI 产品设计' : 'AI Product Design' },
              { num: '230', label: isZh ? '生产级图像' : 'Prod Images' },
              { num: '12', label: isZh ? '落地模板' : 'Shipped Templates' },
              { num: '~20', label: isZh ? 'AI 工具设计' : 'AI Tool Designs' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-2xl font-bold text-neutral-800 font-['Instrument_Serif']">{s.num}</div>
                <div className="text-xs text-neutral-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Education */}
        <motion.div {...fadeIn(0.35)} className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-neutral-100">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6">{isZh ? '教育背景' : 'Education'}</h2>

          <div className="mb-6 pb-6 border-b border-neutral-100">
            <h3 className="text-base font-semibold text-neutral-900 font-['Instrument_Serif']">NABA — Nuova Accademia di Belle Arti Milano</h3>
            <p className="text-sm text-neutral-500">{isZh ? '视觉传达设计硕士' : "Master's Degree in Visual Communication Design"}</p>
            <p className="text-xs font-mono text-neutral-400 mb-2">2020 – 2021</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 text-white font-mono">108 / 110</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-mono">QS Top 100 Art & Design (2021)</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 text-white font-mono">PROFILIBU Award</span>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {isZh ? '聚焦 UI/UX、品牌策略与用户行为研究。毕业期间获得 PROFILIBU Visual Design Award，项目方案被企业正式采用并持续使用。' : 'Focused on UI/UX, brand strategy, and user behavior research. Won PROFILIBU Visual Design Award; project was officially adopted and continuously used by the enterprise.'}
            </p>
          </div>

          <div>
            <h3 className="text-base font-semibold text-neutral-900 font-['Instrument_Serif']">Rome Academy of Fine Arts</h3>
            <p className="text-sm text-neutral-500">{isZh ? '平面设计学士' : "Bachelor's Degree in Graphic Design"}</p>
            <p className="text-xs font-mono text-neutral-400 mb-2">2016 – 2019</p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-800 text-white font-mono">108 / 110</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-600 font-mono">QS Art & Design #101–150</span>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {isZh ? '接受系统化的视觉与艺术训练，建立品牌视觉、版式设计与数字媒介表达基础。' : 'Systematic visual and art training, establishing foundations in brand visual, typography, and digital media expression.'}
            </p>
          </div>
        </motion.div>

        {/* Languages */}
        <motion.div {...fadeIn(0.4)} className="bg-white rounded-2xl p-6 sm:p-10 shadow-sm border border-neutral-100">
          <h2 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4">{isZh ? '语言能力' : 'Languages'}</h2>
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: isZh ? '中文' : 'Chinese', detail: isZh ? '母语' : 'Native', pct: 100 },
              { name: isZh ? '意大利语' : 'Italian', detail: 'B2', pct: 72 },
              { name: isZh ? '英语' : 'English', detail: 'IELTS 5.5', pct: 65 },
            ].map((l, i) => (
              <div key={i}>
                <p className="text-sm text-neutral-800 font-medium">{l.name}</p>
                <p className="text-xs font-mono text-neutral-400 mb-1">{l.detail}</p>
                <div className="h-1 bg-neutral-100 rounded-full overflow-hidden">
                  <div className="h-full bg-neutral-600 rounded-full" style={{ width: `${l.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Download */}
        <motion.div {...fadeIn(0.45)} className="flex justify-center">
          <button className="flex items-center gap-3 px-8 py-4 rounded-full bg-neutral-900 text-white font-medium shadow-lg hover:scale-105 transition-transform">
            <Download size={18} />
            {isZh ? '下载 PDF 简历' : 'Download PDF Resume'}
          </button>
        </motion.div>

      </div>
    </motion.div>
  );
};

export default ResumePage;

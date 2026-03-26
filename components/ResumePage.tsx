import React from 'react';
import { motion } from 'framer-motion';
import { Download, Mail, Linkedin, Globe, MapPin, Briefcase, GraduationCap, Award, Languages, Sparkles, Zap, Rocket } from 'lucide-react';

const ResumePage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative pt-28 sm:pt-32 pb-20 sm:pb-32 px-6 md:px-12 min-h-screen overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)'
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 right-10 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(112, 42, 225, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 left-10 w-80 h-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 87, 189, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">

        {/* Hero Header - Kinetic Asymmetric */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
          className="relative mb-16 sm:mb-20"
        >
          {/* Glass Container */}
          <div
            className="relative rounded-[2rem] p-8 sm:p-12 md:p-16 overflow-hidden"
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            {/* Floating Emoji - Breaking Container */}
            <motion.div
              animate={{
                y: [-10, 10, -10],
                rotate: [-5, 5, -5]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-8 -right-8 text-7xl"
              style={{ filter: 'drop-shadow(0 20px 40px rgba(112, 42, 225, 0.3))' }}
            >
              🚀
            </motion.div>

            <div className="relative z-10">
              {/* Tag */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 rounded-full text-xs font-bold tracking-wider"
                style={{
                  background: 'linear-gradient(135deg, #702ae1 0%, #994100 100%)',
                  boxShadow: '0 8px 32px rgba(112, 42, 225, 0.4)'
                }}
              >
                <Sparkles size={14} className="text-white" />
                <span className="text-white">RESUME</span>
              </motion.div>

              {/* Name - Display Typography */}
              <h1
                className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 tracking-tight"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  lineHeight: '1.1'
                }}
              >
                Geli Guo
              </h1>

              {/* Subtitle with Gradient */}
              <p
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-8"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  background: 'linear-gradient(135deg, #702ae1 0%, #0057bd 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                UI/UX Designer & Visual Communicator
              </p>

              {/* Contact Info - Glassmorphic Pills */}
              <div className="flex flex-wrap gap-3 mb-10">
                <a
                  href="mailto:albellatross@gmail.com"
                  className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-white/80 hover:text-white transition-all duration-300"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <Mail size={16}/> albellatross@gmail.com
                </a>
                <span
                  className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium text-white/60"
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <MapPin size={16}/> Beijing, China
                </span>
              </div>

              {/* Social Links - Gradient Buttons */}
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="https://www.linkedin.com/in/geli-guo-239807164/"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #702ae1 0%, #5022a8 100%)',
                    boxShadow: '0 10px 40px rgba(112, 42, 225, 0.4)'
                  }}
                >
                  <Linkedin size={18}/> LinkedIn
                </motion.a>
                <motion.a
                  href="https://www.behance.net/albellatrocb95"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #0057bd 0%, #003d82 100%)',
                    boxShadow: '0 10px 40px rgba(0, 87, 189, 0.4)'
                  }}
                >
                  <Globe size={18}/> Behance
                </motion.a>
              </div>
            </div>

            {/* Stats - Tonal Layering */}
            <div
              className="grid grid-cols-3 gap-6 mt-12 p-6 rounded-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              {[
                { number: '3+', label: 'Years' },
                { number: '10+', label: 'Projects' },
                { number: '2', label: 'Countries' }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="text-center"
                >
                  <div
                    className="text-4xl sm:text-5xl font-black mb-2"
                    style={{
                      fontFamily: '"Plus Jakarta Sans", sans-serif',
                      background: 'linear-gradient(135deg, #702ae1 0%, #0057bd 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-white/40" style={{ fontFamily: '"Manrope", sans-serif' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content - Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left Sidebar - Compact Info Cards */}
          <div className="lg:col-span-2 space-y-6">

            {/* About Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="relative rounded-2xl p-6 overflow-hidden group"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(112, 42, 225, 0.2) 0%, rgba(112, 42, 225, 0.05) 100%)'
                  }}
                >
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-white/90" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  About
                </h3>
              </div>
              <p className="text-sm leading-relaxed text-white/60" style={{ fontFamily: '"Manrope", sans-serif' }}>
                A designer who pairs thoughtful UI with strong branding, translating user needs and product goals into engaging visuals and seamless flows. With 3+ years at Microsoft, I've led AI-driven projects.
              </p>
            </motion.div>

            {/* Skills Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="relative rounded-2xl p-6 overflow-hidden"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 87, 189, 0.2) 0%, rgba(0, 87, 189, 0.05) 100%)'
                  }}
                >
                  <Zap size={20} className="text-[#0057bd]" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-white/90" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Core Skills
                </h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {['UI/UX Design', 'AIGC Design', 'Voice UX', 'Visual Design', 'Brand Identity', 'B2B Tools', '3D Design', 'Prototyping'].map((skill, idx) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + idx * 0.05 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="px-4 py-2 rounded-full text-xs font-bold cursor-default"
                    style={{
                      background: 'rgba(112, 42, 225, 0.15)',
                      color: '#a78bfa',
                      border: '1px solid rgba(112, 42, 225, 0.3)',
                      fontFamily: '"Manrope", sans-serif'
                    }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Tools Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(153, 65, 0, 0.2) 0%, rgba(153, 65, 0, 0.05) 100%)'
                  }}
                >
                  <span className="text-2xl">🛠️</span>
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-white/90" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Tools
                </h3>
              </div>
              <div className="space-y-3 text-sm" style={{ fontFamily: '"Manrope", sans-serif' }}>
                <p className="text-white/60"><span className="font-bold text-white/80">Design:</span> Figma, Sketch, ProtoPie</p>
                <p className="text-white/60"><span className="font-bold text-white/80">3D:</span> Blender, Spline, Nomad</p>
                <p className="text-white/60"><span className="font-bold text-white/80">Adobe:</span> Ps, Ai, Id, Pr, Ae</p>
                <p className="text-white/60"><span className="font-bold text-white/80">AI:</span> Midjourney, LiblibAI, Cursor</p>
              </div>
            </motion.div>

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(112, 42, 225, 0.2) 0%, rgba(112, 42, 225, 0.05) 100%)'
                  }}
                >
                  <GraduationCap size={20} className="text-[#702ae1]" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-white/90" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Education
                </h3>
              </div>
              <div className="space-y-5">
                <div>
                  <h4 className="font-bold text-white text-sm mb-1" style={{ fontFamily: '"Manrope", sans-serif' }}>
                    Master's in Visual Communication Design
                  </h4>
                  <p className="text-white/50 text-xs">NABA Milan</p>
                  <p className="text-white/30 text-xs mt-1">2020-2021 · 108/110</p>
                </div>
                <div
                  className="pt-5"
                  style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}
                >
                  <h4 className="font-bold text-white text-sm mb-1" style={{ fontFamily: '"Manrope", sans-serif' }}>
                    Bachelor's in Graphic Design
                  </h4>
                  <p className="text-white/50 text-xs">Accademia di Belle Arti di Roma</p>
                  <p className="text-white/30 text-xs mt-1">2016-2019 · 108/110</p>
                </div>
              </div>
            </motion.div>

            {/* Languages Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0 }}
              className="rounded-2xl p-6"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0, 87, 189, 0.2) 0%, rgba(0, 87, 189, 0.05) 100%)'
                  }}
                >
                  <Languages size={20} className="text-[#0057bd]" />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-white/90" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Languages
                </h3>
              </div>
              <div className="space-y-3 text-sm" style={{ fontFamily: '"Manrope", sans-serif' }}>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Chinese</span>
                  <span className="text-xs text-white/40">Native</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">English</span>
                  <span className="text-xs text-white/40">IELTS 6.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/70">Italian</span>
                  <span className="text-xs text-white/40">CEFR B2</span>
                </div>
              </div>
            </motion.div>

            {/* Download Button - Primary Gradient */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              className="w-full py-5 rounded-full text-sm font-black flex items-center justify-center gap-3 text-white"
              style={{
                background: 'linear-gradient(135deg, #702ae1 0%, #994100 100%)',
                boxShadow: '0 20px 60px rgba(112, 42, 225, 0.4)',
                fontFamily: '"Plus Jakarta Sans", sans-serif'
              }}
            >
              <Download size={18} /> DOWNLOAD PDF RESUME
            </motion.button>

          </div>

          {/* Right Column - Experience (Wider, Asymmetric) */}
          <div className="lg:col-span-3 space-y-8">

            {/* Section Divider - No Lines, Just Spacing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-center mb-12"
            >
              <h2
                className="text-3xl font-black tracking-tight inline-block"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.5) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                EXPERIENCE
              </h2>
            </motion.div>

            {/* Job 1 - Microsoft STCA (Current Badge) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="relative rounded-2xl p-8 overflow-hidden group"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {/* Floating Emoji Overlay */}
              <motion.div
                animate={{ rotate: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 text-6xl opacity-20 pointer-events-none"
              >
                💼
              </motion.div>

              <div className="relative z-10">
                {/* Current Badge */}
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black mb-4"
                  style={{
                    background: 'linear-gradient(135deg, #702ae1 0%, #994100 100%)',
                    boxShadow: '0 8px 24px rgba(112, 42, 225, 0.4)'
                  }}
                >
                  <Sparkles size={12} className="text-white" />
                  <span className="text-white">CURRENT</span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                      UI/UX Designer
                    </h3>
                    <p className="text-lg font-bold" style={{
                      fontFamily: '"Manrope", sans-serif',
                      background: 'linear-gradient(135deg, #702ae1 0%, #0057bd 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}>
                      Microsoft STCA
                    </p>
                  </div>
                  <span className="text-xs font-mono text-white/40 whitespace-nowrap">Feb 2025 - Present</span>
                </div>

                <ul className="space-y-3 text-sm text-white/60" style={{ fontFamily: '"Manrope", sans-serif' }}>
                  <li className="flex items-start gap-3">
                    <span className="text-[#702ae1] text-lg leading-none">•</span>
                    <span>Leading UI/UX design for <strong className="text-white/90">Microsoft's consumer and enterprise products</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#702ae1] text-lg leading-none">•</span>
                    <span>Designing <strong className="text-white/90">user experiences for AI-powered features</strong> and productivity tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#702ae1] text-lg leading-none">•</span>
                    <span>Collaborating with <strong className="text-white/90">cross-functional teams</strong> across design, engineering, and product management</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Job 2 - Microsoft Research Asia */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="rounded-2xl p-8"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-5">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    UI/UX Designer & Graphic Designer
                  </h3>
                  <p className="text-lg font-bold text-[#0057bd]" style={{ fontFamily: '"Manrope", sans-serif' }}>
                    Microsoft Research Asia
                  </p>
                </div>
                <span className="text-xs font-mono text-white/40 whitespace-nowrap">Jun 2022 - Feb 2025</span>
              </div>

              <ul className="space-y-3 text-sm text-white/60" style={{ fontFamily: '"Manrope", sans-serif' }}>
                <li className="flex items-start gap-3">
                  <span className="text-[#0057bd] text-lg leading-none">•</span>
                  <span>Designed <strong className="text-white/90">Copilot Read Aloud</strong> voice interaction experience - <em className="text-white/50">transforming passive listening into active dialogue with real-time voice conversation for Office documents</em></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0057bd] text-lg leading-none">•</span>
                  <span>Led <strong className="text-white/90">NUWA AIGC platform</strong> design - <em className="text-white/50">AI-powered content generation showcase achieving <strong className="text-white/80">10,000+ social media engagements</strong> and establishing brand presence</em></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0057bd] text-lg leading-none">•</span>
                  <span>Created <strong className="text-white/90">RD-Agent</strong> internal research platform - <em className="text-white/50">streamlining workflows for AI-assisted hypothesis generation with improved usability and productivity</em></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0057bd] text-lg leading-none">•</span>
                  <span>Designed <strong className="text-white/90">ReMe AI companion app</strong> - <em className="text-white/50">personalized cognitive training platform for Alzheimer's patients combining AI agents with emotional design</em></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0057bd] text-lg leading-none">•</span>
                  <span>Delivered <strong className="text-white/90">MSRA 25th Anniversary</strong> visual identity campaign - <em className="text-white/50">seasonal designs and memorable merchandise garnering <strong className="text-white/80">30,000+ social media views</strong></em></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#0057bd] text-lg leading-none">•</span>
                  <span>Established <strong className="text-white/90">design systems and guidelines</strong> - <em className="text-white/50">ensuring consistency across multiple AI-driven products and research tools</em></span>
                </li>
              </ul>
            </motion.div>

            {/* Job 3 & 4 - Compact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <h3 className="text-lg font-black text-white mb-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Design Intern
                </h3>
                <p className="text-sm font-bold text-[#702ae1] mb-2" style={{ fontFamily: '"Manrope", sans-serif' }}>Vertical Lab</p>
                <span className="text-xs font-mono text-white/30 block mb-3">Mar 2022 - Apr 2022</span>
                <p className="text-xs text-white/50" style={{ fontFamily: '"Manrope", sans-serif' }}>
                  Supported design projects for emerging technology initiatives
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl p-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)'
                }}
              >
                <h3 className="text-lg font-black text-white mb-1" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                  Design Intern
                </h3>
                <p className="text-sm font-bold text-[#0057bd] mb-2" style={{ fontFamily: '"Manrope", sans-serif' }}>FOM Studio</p>
                <span className="text-xs font-mono text-white/30 block mb-3">Aug 2021 - Dec 2021</span>
                <p className="text-xs text-white/50" style={{ fontFamily: '"Manrope", sans-serif' }}>
                  Contributed to visual design projects and brand identity work
                </p>
              </motion.div>
            </div>

            {/* Recognition Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="mt-16 mb-8"
            >
              <h2
                className="text-3xl font-black tracking-tight text-center mb-10"
                style={{
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.5) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                RECOGNITION
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="rounded-2xl p-8 relative overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: 'linear-gradient(135deg, rgba(112, 42, 225, 0.2) 0%, rgba(112, 42, 225, 0.05) 100%)'
                    }}
                  >
                    <Award size={28} className="text-[#702ae1]" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    PROFILTUBI Visual Competition
                  </h4>
                  <p className="text-sm text-white/50" style={{ fontFamily: '"Manrope", sans-serif' }}>
                    First Prize · Design still in use by company
                  </p>
                </motion.div>

                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="rounded-2xl p-8 relative overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)'
                  }}
                >
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 87, 189, 0.2) 0%, rgba(0, 87, 189, 0.05) 100%)'
                    }}
                  >
                    <span className="text-4xl">🏆</span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
                    Ioete Tea Shop Brand Identity
                  </h4>
                  <p className="text-sm text-white/50" style={{ fontFamily: '"Manrope", sans-serif' }}>
                    Live brand since 2021
                  </p>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumePage;

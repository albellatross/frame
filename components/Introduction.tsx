import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Introduction: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // 简化的技能标签 - 基于 Figma 设计
  const skills = [
    { name: 'UI/UX Design', category: 'core' },
    { name: 'Visual Design', category: 'core' },
    { name: 'AIGC Design', category: 'core' },
    { name: 'Voice Interaction', category: 'specialized' },
    { name: 'Figma', category: 'tool' },
    { name: 'Adobe Suite', category: 'tool' },
    { name: 'Blender', category: 'tool' },
    { name: '3D Design', category: 'specialized' },
    { name: 'Brand Identity', category: 'specialized' },
    { name: 'Prototyping', category: 'specialized' },
    { name: 'User Research', category: 'specialized' },
    { name: 'Design Systems', category: 'specialized' },
  ];

  return (
    <section ref={containerRef} className="relative py-20 sm:py-28 md:py-36 px-6 md:px-12 bg-[#f6f3f1] overflow-hidden">

      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, #7e6bff 0.5px, transparent 0)
            `,
            backgroundSize: '40px 40px'
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Section Header */}
        <motion.div
          style={{ opacity, y }}
          className="mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0, x: -20 }}
            whileInView={{ scale: 1, x: 0 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#7e6bff] text-white px-5 py-2.5 rounded-full mb-10 shadow-lg shadow-purple-200"
          >
            <span className="text-sm font-semibold tracking-wide">
              {language === 'zh' ? '关于我' : 'About me'}
            </span>
          </motion.div>

          {/* Introduction Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-3xl p-8 sm:p-10 md:p-12 shadow-sm border border-neutral-100"
          >
            {/* Main Bio */}
            <div className="space-y-6 mb-8">
              <p className="text-lg sm:text-xl md:text-2xl text-neutral-700 leading-relaxed">
                {t('intro.paragraph1')}
              </p>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
                {t('intro.paragraph2')}{' '}
                <span className="font-semibold text-neutral-900">
                  {t('intro.highlight1')}
                </span>{' '}
                {t('intro.paragraph2b')}{' '}
                <span className="font-semibold text-neutral-900">
                  {t('intro.highlight2')}
                </span>{' '}
                {t('intro.paragraph2c')}
              </p>
            </div>

            {/* Stats/Highlights */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-neutral-100">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-center"
              >
                <div className="text-3xl font-serif text-[#7e6bff] mb-1">3+</div>
                <div className="text-xs text-neutral-500 uppercase tracking-wide">
                  {language === 'zh' ? '年经验' : 'Years'}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <div className="text-3xl font-serif text-[#7e6bff] mb-1">10+</div>
                <div className="text-xs text-neutral-500 uppercase tracking-wide">
                  {language === 'zh' ? '项目' : 'Projects'}
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-center"
              >
                <div className="text-3xl font-serif text-[#7e6bff] mb-1">2</div>
                <div className="text-xs text-neutral-500 uppercase tracking-wide">
                  {language === 'zh' ? '国家' : 'Countries'}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Skills Section - Clean Tag Style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 sm:mt-20"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
            <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">
              {language === 'zh' ? '技能与工具' : 'Skills & Tools'}
            </span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-neutral-200 to-transparent"></div>
          </div>

          {/* Skills Tags Grid */}
          <div className="flex flex-wrap gap-3 justify-center">
            {skills.map((skill, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-medium
                  transition-all duration-300 cursor-default
                  ${skill.category === 'core'
                    ? 'bg-[#7e6bff] text-white shadow-md shadow-purple-200'
                    : skill.category === 'tool'
                    ? 'bg-white text-neutral-700 border border-neutral-200 hover:border-[#7e6bff]'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }
                `}
              >
                {skill.name}
              </motion.div>
            ))}
          </div>

          {/* Legend */}
          <div className="mt-8 flex flex-wrap gap-6 justify-center text-xs text-neutral-500">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#7e6bff]"></div>
              <span>{language === 'zh' ? '核心能力' : 'Core Skills'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-white border border-neutral-200"></div>
              <span>{language === 'zh' ? '设计工具' : 'Design Tools'}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-neutral-100"></div>
              <span>{language === 'zh' ? '专业技能' : 'Specialized'}</span>
            </div>
          </div>
        </motion.div>

        {/* Education & Experience Quick Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Education Card */}
          <motion.div
            whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(126, 107, 255, 0.15)' }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#7e6bff]/10 flex items-center justify-center">
                <span className="text-xl">🎓</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {language === 'zh' ? '教育背景' : 'Education'}
              </h3>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {language === 'zh'
                ? 'NABA Milan 视觉传达设计硕士，QS全球前100。专注于用户体验设计、品牌建设和市场策略。'
                : 'Master\'s in Visual Communication Design from NABA Milan, QS Top 100. Focused on UX design, branding, and marketing strategy.'
              }
            </p>
          </motion.div>

          {/* Experience Card */}
          <motion.div
            whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(126, 107, 255, 0.15)' }}
            className="bg-white rounded-2xl p-6 shadow-sm border border-neutral-100 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#7e6bff]/10 flex items-center justify-center">
                <span className="text-xl">💼</span>
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {language === 'zh' ? '工作经历' : 'Experience'}
              </h3>
            </div>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {language === 'zh'
                ? '3年+ 微软 UI/UX 设计经验，主导 AI 驱动项目，包括 Copilot 语音交互、AIGC 平台和内部研究工具。'
                : '3+ years at Microsoft leading AI-driven projects including Copilot voice interaction, AIGC platforms, and internal research tools.'
              }
            </p>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 sm:mt-20"
        >
          <p className="text-sm text-neutral-500 mb-4">
            {language === 'zh' ? '想了解更多？' : 'Want to know more?'}
          </p>
          <motion.a
            href="https://www.linkedin.com/in/geli-guo-239807164/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 bg-[#7e6bff] text-white px-8 py-3 rounded-full text-sm font-medium shadow-lg shadow-purple-200 hover:bg-[#6f55ff] transition-colors duration-300"
          >
            <span>{language === 'zh' ? '查看 LinkedIn' : 'View LinkedIn'}</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

export default Introduction;

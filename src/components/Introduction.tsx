import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { assetUrl } from '../utils/assets';

const AboutSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const skills = [
    'AI Product Design', 'UX Design', 'Visual Design', 'AI Workflow',
    'Generative AI', 'Design Systems', 'Design-to-Code', 'Prompt Design',
    'Figma', 'Adobe Suite', 'Blender / Spline', 'Copilot / Claude',
  ];

  return (
    <section ref={containerRef} id="introduction" className="relative py-20 sm:py-28 md:py-32 px-6 md:px-12 bg-cream-light overflow-hidden">

      <div className="max-w-5xl mx-auto relative z-10">

        {/* Hero-style About: Photo + Text side by side */}
        <motion.div
          style={{ opacity, y }}
          className="flex flex-col md:flex-row gap-10 md:gap-16 items-start"
        >
          {/* Left: Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-[280px] lg:w-[320px] flex-shrink-0"
          >
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src={assetUrl('/profile.jpg')}
                  alt="Bella - UI/UX Designer"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Subtle decorative frame */}
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl border-2 border-cream-dark -z-10" />
            </div>

            {/* Stats row below photo */}
            <div className="flex justify-between mt-8 px-1">
              {[
                { value: '4+', label: language === 'zh' ? '年经验' : 'Years' },
                { value: '10+', label: language === 'zh' ? 'AI 产品' : 'AI Products' },
                { value: '230+', label: language === 'zh' ? '图像产出' : 'Images' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-2xl font-serif text-brown">{stat.value}</div>
                  <div className="text-[10px] text-warm-gray uppercase tracking-wider mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex-1 pt-0 md:pt-2"
          >
            {/* Tag */}
            <span className="inline-block text-[11px] font-mono text-warm-gray uppercase tracking-widest mb-4">
              {language === 'zh' ? '关于我' : 'About me'}
            </span>

            {/* Name & Title */}
            <h2 className="text-3xl sm:text-4xl font-serif text-dark-brown mb-2">
              Bella Guo
            </h2>
            <p className="text-base text-brown font-medium mb-6">
              AI Product Experience Designer @ Microsoft
            </p>

            {/* Bio - concise */}
            <div className="space-y-4 mb-8">
              <p className="text-base text-neutral-600 leading-relaxed">
                {t('intro.paragraph1')}
              </p>
              <p className="text-sm text-neutral-500 leading-relaxed">
                {t('intro.paragraph2')}{' '}
                <span className="font-medium text-neutral-700">
                  {t('intro.highlight1')}
                </span>{' '}
                {t('intro.paragraph2b')}{' '}
                <span className="font-medium text-neutral-700">
                  {t('intro.highlight2')}
                </span>{' '}
                {t('intro.paragraph2c')}
              </p>
            </div>

            {/* Quick Info */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mb-8 text-sm text-neutral-600">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-warm-gray block mb-1">
                  {language === 'zh' ? '教育' : 'Education'}
                </span>
                <span className="font-medium text-neutral-800">NABA Milan</span>
                <span className="text-neutral-400 mx-1.5">·</span>
                <span>{language === 'zh' ? '视觉传达设计硕士' : 'MA Visual Communication'}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-warm-gray block mb-1">
                  {language === 'zh' ? '专注方向' : 'Focus'}
                </span>
                <span>{language === 'zh' ? 'AI 产品体验 · 生成式 AI · 创作者工具' : 'AI Product Experience · Generative AI · Creator Tools'}</span>
              </div>
            </div>

            {/* Skills - compact inline */}
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="px-3 py-1.5 rounded-full text-xs text-warm-gray bg-cream border border-cream-dark/50 hover:border-brown/40 transition-colors"
                >
                  {skill}
                </motion.span>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 flex items-center gap-5">
              <motion.a
                href="https://www.linkedin.com/in/geli-guo-239807164/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-dark-brown border-b border-dark-brown/30 pb-1 hover:border-dark-brown transition-colors"
              >
                <ArrowUpRight size={13} className="opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                <span className="tracking-wide">LinkedIn</span>
              </motion.a>
              <span className="text-[11px] text-warm-gray/60 tracking-wide">
                {language === 'zh' ? '了解更多关于我的经历' : 'Learn more about my journey'}
              </span>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
};

export default AboutSection;

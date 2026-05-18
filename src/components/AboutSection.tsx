import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface AboutSectionProps {
  onOpenWalkThrough?: () => void;
}

const AboutSection: React.FC<AboutSectionProps> = ({ onOpenWalkThrough }) => {
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
                  src="/profile.jpg"
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

      {/* Walk Through entry - handwritten arrow with text on path */}
      {onOpenWalkThrough && (
        <>
          <style>{`
            @keyframes arrowDraw {
              0% { stroke-dashoffset: 3200; opacity: 0.2; }
              5% { opacity: 0.6; }
              50% { stroke-dashoffset: 0; opacity: 0.7; }
              55% { stroke-dashoffset: 0; opacity: 0.5; }
              60% { stroke-dashoffset: 0; opacity: 0.7; }
              100% { stroke-dashoffset: 0; opacity: 0.3; }
            }
            @keyframes textSlideIn {
              0% { opacity: 0; letter-spacing: 14px; }
              50% { opacity: 0.7; letter-spacing: 1px; }
              75% { opacity: 0.9; letter-spacing: 6px; }
              100% { opacity: 0.9; letter-spacing: 4px; }
            }
            @keyframes inkGlow {
              0%, 100% { filter: drop-shadow(0 0 0px transparent); }
              50% { filter: drop-shadow(0 0 5px rgba(59,35,14,0.4)); }
            }
            .arrow-entry:hover svg {
              animation: inkGlow 1.5s ease-in-out infinite;
            }
            .arrow-entry svg path.arrow-fill {
              transition: opacity 0.4s ease;
            }
            .arrow-entry:hover svg path.arrow-fill {
              opacity: 0.85;
            }
            .arrow-entry svg path.arrow-stroke {
              transition: stroke-width 0.3s ease, opacity 0.3s ease;
            }
            .arrow-entry:hover svg path.arrow-stroke {
              stroke-width: 6;
              opacity: 0.8;
            }
            .arrow-entry svg text textPath {
              transition: letter-spacing 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease;
            }
            .arrow-entry:hover svg text textPath {
              opacity: 1 !important;
              letter-spacing: 6px !important;
            }
          `}</style>
          <motion.button
            initial={{ opacity: 0, y: 24, rotate: 6, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 1.2, type: 'spring', stiffness: 80, damping: 12 }}
            whileHover={{
              scale: 1.06,
              rotate: -2,
              y: -3,
              transition: { type: 'spring', stiffness: 200, damping: 18 }
            }}
            whileTap={{
              scale: 0.92,
              rotate: 1,
              transition: { type: 'spring', stiffness: 400, damping: 15 }
            }}
            onClick={onOpenWalkThrough}
            className="arrow-entry absolute bottom-[3%] right-[1%] sm:bottom-[4%] sm:right-[2%] md:bottom-[5%] md:right-[3%] z-20 cursor-pointer"
          >
            <svg
              viewBox="-50 -20 1250 1020"
              className="w-[clamp(130px,14vw,250px)] h-[clamp(106px,11.4vw,204px)]"
            >
              <defs>
                {/* Text path follows arrow contour with consistent spacing, long enough for full text */}
                <path
                  id="textArc"
                  d="M 120 530 C 300 370 510 220 780 110"
                  fill="none"
                />
              </defs>
              {/* Arrow filled shape - shows complete arrow including solid arrowhead */}
              <path
                d="M872.1,308.03c-194.08-10.11-432.39,120.26-504.57,274.92c5.31,1.18,10.55,4.18,16.2,3.32 c94.02-14.37,139.68,23.42,166.86,76.77c20.15,39.56,30.5,81.46,21.24,129.14c-2.54,13.08-6.28,26.61-12.43,39.81 c-23.16,49.72-68.4,75.49-125.37,71.96c-39.22-2.43-66.27-18.31-88.21-39.9c-40.91-40.26-62.56-92.96-65.99-157.13 c-0.7-13.05-0.58-26.45-0.96-46.22C166.25,717.99,112.55,800.02,45.31,876.05c4.44-13.38,5.81-27.4,13.95-40.39 C104.18,764,161.97,695.29,251.02,642.41c25.21-14.97,43.76-30,53.85-55.49c40.59-102.46,125.2-183.84,236.83-245.55 c83.51-46.16,168.1-76.57,251.83-90.44c20.27-3.36,40.47-7.23,73.86-13.23c-31.97-48.54-60.52-91.9-90.4-137.28 c3.55-3.94,7.1-7.89,10.66-11.84c10.91,1.36,25.09-1.14,31.98,4.7c32.43,27.55,63.08,55.09,90.61,83.73 c24.35,25.33,44.3,53.54,66.6,77.98c21.24,23.28,17.85,43.48-18.1,62.06c-63.08,32.61-127.93,60.31-193.24,88.69 c-8.92,3.88-19.51-2.75-29.41-4.53c7.88-11.29,13.98-27.13,24.09-33.22C794.67,347.24,830.38,330.02,872.1,308.03z M346.42,629.54 c-20.97,107.86,3.42,185.81,84.12,231.55c16.41,9.3,40.42,15.4,63.77-1.01c16.31-11.46,29.07-33.57,33.81-49.82 c18.19-62.42,0.72-113.92-36.21-159.63C464.49,616.71,421.2,604.4,346.42,629.54z"
                fill="#3b230e"
                opacity="0.55"
                className="arrow-fill"
              />
              {/* Arrow stroke animation overlay */}
              <path
                className="arrow-stroke"
                d="M872.1,308.03c-194.08-10.11-432.39,120.26-504.57,274.92c5.31,1.18,10.55,4.18,16.2,3.32 c94.02-14.37,139.68,23.42,166.86,76.77c20.15,39.56,30.5,81.46,21.24,129.14c-2.54,13.08-6.28,26.61-12.43,39.81 c-23.16,49.72-68.4,75.49-125.37,71.96c-39.22-2.43-66.27-18.31-88.21-39.9c-40.91-40.26-62.56-92.96-65.99-157.13 c-0.7-13.05-0.58-26.45-0.96-46.22C166.25,717.99,112.55,800.02,45.31,876.05c4.44-13.38,5.81-27.4,13.95-40.39 C104.18,764,161.97,695.29,251.02,642.41c25.21-14.97,43.76-30,53.85-55.49c40.59-102.46,125.2-183.84,236.83-245.55 c83.51-46.16,168.1-76.57,251.83-90.44c20.27-3.36,40.47-7.23,73.86-13.23c-31.97-48.54-60.52-91.9-90.4-137.28 c3.55-3.94,7.1-7.89,10.66-11.84c10.91,1.36,25.09-1.14,31.98,4.7c32.43,27.55,63.08,55.09,90.61,83.73 c24.35,25.33,44.3,53.54,66.6,77.98c21.24,23.28,17.85,43.48-18.1,62.06c-63.08,32.61-127.93,60.31-193.24,88.69 c-8.92,3.88-19.51-2.75-29.41-4.53c7.88-11.29,13.98-27.13,24.09-33.22C794.67,347.24,830.38,330.02,872.1,308.03z M346.42,629.54 c-20.97,107.86,3.42,185.81,84.12,231.55c16.41,9.3,40.42,15.4,63.77-1.01c16.31-11.46,29.07-33.57,33.81-49.82 c18.19-62.42,0.72-113.92-36.21-159.63C464.49,616.71,421.2,604.4,346.42,629.54z"
                fill="none"
                stroke="#3b230e"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.4"
                style={{
                  strokeDasharray: 3200,
                  strokeDashoffset: 0,
                  animation: 'arrowDraw 5s ease-in-out infinite',
                }}
              />
              {/* Text following arrow contour */}
              <text style={{ animation: 'textSlideIn 1.4s ease-out 0.8s both' }}>
                <textPath
                  href="#textArc"
                  startOffset="2%"
                  style={{
                    fontFamily: 'Bradford, Georgia, serif',
                    fontStyle: 'italic',
                    fontSize: '98px',
                    fill: '#3b230e',
                    opacity: 0.9,
                    letterSpacing: '4px',
                  }}
                >
                  {language === 'zh' ? 'Enter My Frame' : 'Enter My Frame'}
                </textPath>
              </text>
            </svg>
          </motion.button>
        </>
      )}
    </section>
  );
};

export default AboutSection;

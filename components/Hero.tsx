import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [colorIndex, setColorIndex] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  
  const colors = ['#2563EB', '#EC4899'];

  const handleMouseEnter = () => {
    setIsHovering(true);
    setColorIndex(prev => (prev + 1) % colors.length);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <section id="hero" className="min-h-screen relative flex flex-col justify-center items-center px-6 md:px-12 bg-neutral-100 overflow-hidden pt-24 sm:pt-28 md:pt-20">
      
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
          </defs>
        </svg>
        
        <div className="absolute inset-0" style={{ filter: 'url(#goo)' }}>
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(37, 99, 235, 0.08) 100%)',
              top: '-10%',
              left: '-5%',
            }}
            animate={{
              x: ['0%', '30%', '15%', '40%', '0%'],
              y: ['0%', '20%', '35%', '15%', '0%'],
              scale: [1, 1.3, 1.1, 1.25, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          <motion.div
            className="absolute w-[450px] h-[450px] rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.12) 0%, rgba(236, 72, 153, 0.06) 100%)',
              bottom: '-15%',
              right: '-10%',
            }}
            animate={{
              x: ['0%', '-35%', '-15%', '-45%', '0%'],
              y: ['0%', '-25%', '-40%', '-20%', '0%'],
              scale: [1, 1.2, 1.35, 1.15, 1],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          
          <motion.div
            className="absolute w-[300px] h-[300px] rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(236, 72, 153, 0.08) 100%)',
              top: '40%',
              left: '30%',
            }}
            animate={{
              x: ['0%', '20%', '-15%', '10%', '0%'],
              y: ['0%', '-20%', '15%', '-10%', '0%'],
              scale: [1, 1.4, 1.1, 1.3, 1],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        
        <div 
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>
      
      <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
        <div className="relative z-20 text-center flex flex-col items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-neutral-900 italic tracking-tight">
              Design isn't just
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="my-2 sm:my-4"
          >
            <h2 className="font-sans text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black text-neutral-900 tracking-tighter leading-none uppercase">
              OUTPUT
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h3 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-neutral-900 italic tracking-tight">
              It's the{' '}
              <span
                ref={containerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
                className="relative inline-block"
                style={{ cursor: isHovering ? 'none' : 'default' }}
              >
                <span className="relative">frame</span>
                
                {isHovering && (
                  <span
                    className="pointer-events-none absolute rounded-full"
                    style={{
                      width: 100,
                      height: 100,
                      left: mousePos.x - 50,
                      top: mousePos.y - 50,
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.4) 100%)',
                      backdropFilter: 'blur(20px) saturate(180%)',
                      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                      border: '0.5px solid rgba(255, 255, 255, 0.6)',
                      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04), inset 0 1px 1px rgba(255, 255, 255, 0.8), inset 0 -1px 1px rgba(0, 0, 0, 0.05)',
                      zIndex: 50,
                      overflow: 'hidden',
                    }}
                  >
                    <span
                      className="absolute pointer-events-none"
                      style={{
                        top: 2,
                        left: '15%',
                        right: '15%',
                        height: 20,
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0) 100%)',
                        borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%',
                        opacity: 0.6,
                        zIndex: 5,
                      }}
                    />
                    <span
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: 'linear-gradient(135deg, rgba(255,180,180,0.1) 0%, rgba(180,255,200,0.08) 25%, rgba(180,200,255,0.1) 50%, rgba(255,200,255,0.08) 75%, rgba(255,220,180,0.1) 100%)',
                        zIndex: 4,
                      }}
                    />
                    <span
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 4px 12px rgba(255,255,255,0.15), inset 0 -2px 6px rgba(0,0,0,0.03)',
                        zIndex: 3,
                      }}
                    />
                    <span
                      className="absolute font-serif italic whitespace-nowrap"
                      style={{
                        fontSize: '1.1em',
                        fontWeight: 400,
                        left: 50 - mousePos.x * 1.1,
                        top: 50 - mousePos.y * 1.1 - 2,
                        transform: 'scale(1.1)',
                        transformOrigin: 'center',
                        zIndex: 10,
                        color: colors[colorIndex],
                        transition: 'color 0.3s ease',
                        textShadow: 'none',
                      }}
                    >
                      Bella
                    </span>
                  </span>
                )}
              </span>
              .
            </h3>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 sm:mt-12 max-w-xl text-base sm:text-lg text-neutral-600 leading-relaxed text-center"
          >
            {t('hero.description')}
          </motion.p>
        </div>

        <motion.a
          href="#introduction"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 transition-colors group"
        >
          <span>{t('hero.enterFrame')}</span>
          <motion.span 
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↓
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;

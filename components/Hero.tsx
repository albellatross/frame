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
    <section id="hero" className="min-h-screen relative flex flex-col justify-center items-center px-6 md:px-12 bg-gradient-to-br from-neutral-50 via-neutral-100 to-neutral-50 overflow-hidden pt-24 sm:pt-28 md:pt-20">

      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute w-0 h-0">
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -12" result="goo" />
              <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
            </filter>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(37, 99, 235, 0.2)" />
              <stop offset="100%" stopColor="rgba(37, 99, 235, 0.05)" />
            </linearGradient>
            <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(236, 72, 153, 0.18)" />
              <stop offset="100%" stopColor="rgba(249, 115, 22, 0.08)" />
            </linearGradient>
            <linearGradient id="gradient3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59, 130, 246, 0.15)" />
              <stop offset="50%" stopColor="rgba(236, 72, 153, 0.12)" />
              <stop offset="100%" stopColor="rgba(249, 115, 22, 0.08)" />
            </linearGradient>
          </defs>
        </svg>

        <div className="absolute inset-0 animate-gradient bg-gradient-mesh opacity-60" />

        <div className="absolute inset-0" style={{ filter: 'url(#goo)' }}>
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'url(#gradient1)',
              fill: 'url(#gradient1)',
              backgroundColor: 'rgba(37, 99, 235, 0.18)',
              top: '-15%',
              left: '-8%',
              boxShadow: '0 0 120px 40px rgba(37, 99, 235, 0.12)',
            }}
            animate={{
              x: ['0%', '35%', '18%', '45%', '0%'],
              y: ['0%', '25%', '40%', '18%', '0%'],
              scale: [1, 1.35, 1.15, 1.3, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />

          <motion.div
            className="absolute w-[550px] h-[550px] rounded-full"
            style={{
              background: 'url(#gradient2)',
              backgroundColor: 'rgba(236, 72, 153, 0.15)',
              bottom: '-18%',
              right: '-12%',
              boxShadow: '0 0 100px 35px rgba(236, 72, 153, 0.1)',
            }}
            animate={{
              x: ['0%', '-40%', '-18%', '-50%', '0%'],
              y: ['0%', '-28%', '-45%', '-22%', '0%'],
              scale: [1, 1.25, 1.4, 1.2, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          />

          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: 'url(#gradient3)',
              backgroundColor: 'rgba(59, 130, 246, 0.12)',
              top: '35%',
              left: '35%',
              boxShadow: '0 0 80px 30px rgba(236, 72, 153, 0.08)',
            }}
            animate={{
              x: ['0%', '25%', '-20%', '15%', '0%'],
              y: ['0%', '-25%', '20%', '-15%', '0%'],
              scale: [1, 1.45, 1.15, 1.35, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />

          <motion.div
            className="absolute w-[250px] h-[250px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, rgba(251, 146, 60, 0.08) 100%)',
              top: '10%',
              right: '15%',
              boxShadow: '0 0 60px 20px rgba(249, 115, 22, 0.08)',
            }}
            animate={{
              x: ['0%', '-20%', '15%', '-10%', '0%'],
              y: ['0%', '30%', '-20%', '15%', '0%'],
              scale: [1, 1.3, 1.1, 1.2, 1],
            }}
            transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
          />
        </div>

        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-neutral-50/50 via-transparent to-transparent" />
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
                  <motion.span
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="pointer-events-none absolute rounded-full"
                    style={{
                      width: 120,
                      height: 120,
                      left: mousePos.x - 60,
                      top: mousePos.y - 60,
                      background: 'linear-gradient(145deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.5) 100%)',
                      backdropFilter: 'blur(24px) saturate(200%)',
                      WebkitBackdropFilter: 'blur(24px) saturate(200%)',
                      border: '1px solid rgba(255, 255, 255, 0.7)',
                      boxShadow: '0 12px 48px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.08), inset 0 2px 2px rgba(255, 255, 255, 0.9), inset 0 -2px 2px rgba(0, 0, 0, 0.06)',
                      zIndex: 50,
                      overflow: 'hidden',
                    }}
                  >
                    <span
                      className="absolute pointer-events-none animate-shimmer"
                      style={{
                        top: 3,
                        left: '10%',
                        right: '10%',
                        height: 28,
                        background: 'linear-gradient(180deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 100%)',
                        borderRadius: '50% 50% 50% 50% / 100% 100% 0% 0%',
                        opacity: 0.7,
                        zIndex: 5,
                      }}
                    />
                    <span
                      className="absolute inset-0 rounded-full pointer-events-none animate-gradient"
                      style={{
                        background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(59, 130, 246, 0.12) 25%, rgba(249, 115, 22, 0.15) 50%, rgba(236, 72, 153, 0.12) 75%, rgba(59, 130, 246, 0.15) 100%)',
                        backgroundSize: '200% 200%',
                        zIndex: 4,
                      }}
                    />
                    <span
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 6px 16px rgba(255,255,255,0.2), inset 0 -3px 8px rgba(0,0,0,0.04)',
                        zIndex: 3,
                      }}
                    />
                    <span
                      className="absolute inset-0 rounded-full pointer-events-none animate-glow"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, ${colors[colorIndex]}40 0%, transparent 70%)`,
                        zIndex: 2,
                      }}
                    />
                    <motion.span
                      initial={{ scale: 0.95 }}
                      animate={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="absolute font-serif italic whitespace-nowrap"
                      style={{
                        fontSize: '1.2em',
                        fontWeight: 500,
                        left: 60 - mousePos.x * 1.15,
                        top: 60 - mousePos.y * 1.15 - 3,
                        transform: 'scale(1.15)',
                        transformOrigin: 'center',
                        zIndex: 10,
                        color: colors[colorIndex],
                        transition: 'color 0.4s ease-in-out',
                        textShadow: `0 2px 8px ${colors[colorIndex]}40, 0 0 20px ${colors[colorIndex]}20`,
                        filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                      }}
                    >
                      Bella
                    </motion.span>
                  </motion.span>
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

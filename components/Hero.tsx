import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [colorIndex, setColorIndex] = useState(0);
  const containerRef = useRef<HTMLSpanElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>(0);

  const colors = ['#5F4E41', '#8C5462'];

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

  // Video fade-in/out with smooth manual loop
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const FADE_IN = 1.5;
    const FADE_OUT = 2.0;
    let stopped = false;

    const startPlayback = () => {
      if (stopped) return;
      video.currentTime = 0;
      video.play().then(() => {
        if (!stopped) rafRef.current = requestAnimationFrame(handleFrame);
      }).catch(() => {});
    };

    const handleFrame = () => {
      if (stopped || !video) return;
      const { currentTime, duration } = video;
      if (duration && duration > 0) {
        if (currentTime < FADE_IN) {
          video.style.opacity = String(Math.min(currentTime / FADE_IN, 1));
        } else if (currentTime > duration - FADE_OUT) {
          const remaining = duration - currentTime;
          video.style.opacity = String(Math.max(remaining / FADE_OUT, 0));
          // When fully faded out, pause and restart
          if (remaining < 0.05) {
            video.pause();
            video.style.opacity = '0';
            setTimeout(startPlayback, 200);
            return;
          }
        } else {
          video.style.opacity = '1';
        }
      }
      rafRef.current = requestAnimationFrame(handleFrame);
    };

    video.style.opacity = '0';
    startPlayback();

    return () => {
      stopped = true;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen w-full overflow-hidden bg-white pt-24 sm:pt-28 md:pt-20">
      {/* Video Background */}
      <div className="absolute z-0" style={{ top: '300px', inset: 'auto 0 0 0' }}>
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ opacity: 0 }}
        />
        {/* Gradient overlay - top fade only */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/30 to-transparent" style={{ height: '40%' }} />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center px-6 pb-32" style={{ paddingTop: 'calc(13rem - 75px)' }}>
        <div className="text-center flex flex-col items-center">

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-2 sm:mb-4"
          >
            <h1 className="font-serif text-3xl sm:text-4xl md:text-[2.8rem] lg:text-5xl text-dark-brown italic tracking-tight leading-tight">
              Design isn't just <span className="font-sans not-italic font-black uppercase tracking-tighter">OUTPUT</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h3 className="font-serif text-3xl sm:text-4xl md:text-[2.8rem] lg:text-5xl text-dark-brown italic tracking-tight leading-tight">
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
                        background: 'linear-gradient(135deg, rgba(140, 84, 98, 0.12) 0%, rgba(98, 140, 140, 0.10) 25%, rgba(229, 184, 92, 0.12) 50%, rgba(140, 84, 98, 0.10) 75%, rgba(98, 140, 140, 0.12) 100%)',
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
            className="mt-6 sm:mt-8 max-w-md text-sm sm:text-base text-warm-gray leading-relaxed text-center"
          >
            {t('hero.description')}
          </motion.p>
        </div>

      </div>

      {/* Enter the frame - scroll indicator */}
      <motion.a
        href="#introduction"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-[180px] left-0 right-0 z-30 flex flex-col items-center gap-3 cursor-pointer group"
      >
        <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/90 group-hover:text-white transition-colors duration-300 drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]">
          {t('hero.enterFrame')}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/70 to-transparent"
        />
      </motion.a>

      {/* Smooth transition gradient to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#FEF9ED] z-20 pointer-events-none" />
    </section>
  );
};

export default Hero;



import React, { useState, useEffect } from 'react';
import { Briefcase, Home as HomeIcon, Linkedin, Mail, UserRound, X, ArrowUpRight, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: 'home' | 'work' | 'profile';
  onNavigate: (page: 'home' | 'work' | 'profile') => void;
  hideHeader?: boolean;
  hideFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate, hideHeader = false, hideFooter = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (hideHeader) {
      setIsMenuOpen(false);
    }
  }, [hideHeader]);

  useEffect(() => {
    const closeDesktopMenu = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    closeDesktopMenu();
    window.addEventListener('resize', closeDesktopMenu);
    return () => window.removeEventListener('resize', closeDesktopMenu);
  }, []);

  // Smooth scroll handler
  const handleNavClick = (id: string, type: 'scroll' | 'page') => {
    setIsMenuOpen(false);
    
    if (type === 'page') {
      onNavigate(id as 'home' | 'work' | 'profile');
      window.scrollTo(0, 0);
      return;
    }

    if (currentPage !== 'home') {
      onNavigate('home');
      // Allow render cycle to complete before scrolling
      setTimeout(() => {
        scrollToElement(id);
      }, 100);
    } else {
      scrollToElement(id);
    }
  };

  const scrollToElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: t('nav.home'), id: 'hero', type: 'scroll' as const, icon: HomeIcon },
    { label: t('nav.work'), id: 'work', type: 'page' as const, icon: Briefcase },
    { label: t('nav.profile'), id: 'profile', type: 'page' as const, icon: UserRound }
  ];

  const isActive = (linkId: string) => {
    if (currentPage === 'work' && linkId === 'work') return true;
    if (currentPage === 'profile' && linkId === 'profile') return true;
    if (currentPage === 'home' && linkId === 'hero') return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-cream-light font-sans selection:bg-accent selection:text-white">
      
      {!hideHeader ? (
        <>
          {/* Navigation Bar */}
          <nav
            className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-12 transition-all duration-500 ease-in-out flex justify-between items-center ${
              isScrolled && !isMenuOpen
                ? 'py-4 bg-white/80 backdrop-blur-xl border-b border-neutral-200/50 shadow-[0_2px_20px_rgba(0,0,0,0.02)]'
                : 'py-6 md:py-8 bg-transparent'
            }`}
          >
            {/* Logo */}
            <div className="z-50 relative">
              <button
                onClick={() => handleNavClick('hero', 'scroll')}
                className="text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315CFF] focus-visible:ring-offset-4"
                aria-label="Go to home"
              >
                <span className={`block text-xl font-bold tracking-tighter transition-colors duration-300 ${isMenuOpen ? 'text-neutral-900' : 'text-neutral-900'}`}>
                  FRAME.
                </span>
                {!isScrolled && !isMenuOpen && (
                  <span className="text-[10px] text-neutral-500 uppercase tracking-widest mt-0.5 block group-hover:text-accent transition-colors">
                    Bella's portfolio
                  </span>
                )}
              </button>
            </div>

            {/* Desktop Center Menu - Floating Island Style */}
            <div className={`absolute left-1/2 -translate-x-1/2 transition-all duration-500 hidden md:block ${
               isMenuOpen ? 'opacity-0 translate-y-[-20px] pointer-events-none' : 'opacity-100 translate-y-0'
            }`}>
               <div className={`flex items-center gap-1 p-1.5 rounded-full transition-all duration-300 ${
                 isScrolled
                   ? 'bg-white/90 border border-neutral-200/60 backdrop-blur-xl shadow-button'
                   : 'bg-white/70 border border-neutral-200/40 backdrop-blur-md'
               }`}>
                 {navLinks.map((link) => (
                   <motion.button
                     key={link.id}
                     onClick={() => handleNavClick(link.id, link.type)}
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     className={`relative w-20 py-2.5 rounded-full text-xs font-medium transition-all duration-300 uppercase tracking-wide text-center overflow-hidden ${
                        isActive(link.id)
                        ? 'text-neutral-900 bg-white shadow-sm'
                        : 'text-neutral-600 hover:text-neutral-900'
                     }`}
                   >
                     {isActive(link.id) && (
                       <motion.div
                         layoutId="activeTab"
                         className="absolute inset-0 bg-white rounded-full shadow-sm"
                         transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                       />
                     )}
                     <span className="relative inline-block transition-transform duration-300">
                       {link.label}
                     </span>
                   </motion.button>
                 ))}
               </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3 z-50">
               {/* Language Toggle Switch */}
               <LanguageToggle
                 trackClassName={isMenuOpen || isScrolled
                   ? 'bg-neutral-200'
                   : 'bg-white/90 backdrop-blur-md shadow-sm border border-neutral-200/50'}
               />

               {/* Hamburger Toggle */}
               <motion.button
                 onClick={() => setIsMenuOpen(!isMenuOpen)}
                 whileHover={{ scale: 1.05 }}
                 whileTap={{ scale: 0.96 }}
                 className={`flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300 group md:hidden ${
                   isMenuOpen
                     ? 'bg-white text-neutral-900 shadow-[0_10px_28px_rgba(54,34,16,0.14)] rotate-90'
                     : 'bg-white/82 shadow-[0_8px_24px_rgba(54,34,16,0.1)] backdrop-blur-xl hover:bg-white'
                 }`}
                 aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
                 aria-expanded={isMenuOpen}
               >
                 {isMenuOpen ? (
                   <X size={24} className="text-neutral-900" />
                 ) : (
                   <div className="space-y-1.5 p-2">
                     <motion.span
                       className="block w-6 h-0.5 bg-neutral-900 transition-all duration-300 ml-auto"
                       animate={{ width: isMenuOpen ? 24 : 24 }}
                       whileHover={{ width: 16 }}
                     />
                     <motion.span
                       className="block w-4 h-0.5 bg-neutral-900 transition-all duration-300 ml-auto"
                       whileHover={{ width: 24 }}
                     />
                   </div>
                 )}
               </motion.button>
            </div>
          </nav>

          {/* Menu Overlay */}
          <AnimatePresence>
            {isMenuOpen && (
              <>
                <motion.button
                  key="mobile-menu-backdrop"
                  type="button"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: 'easeOut' }}
                  onClick={() => setIsMenuOpen(false)}
                  className="fixed inset-0 z-40 bg-[#2f2112]/28 backdrop-blur-lg md:hidden"
                  aria-label="Close navigation"
                />

                <motion.div
                  key="mobile-menu"
                  initial={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                  transition={{ type: 'spring', duration: 0.32, bounce: 0 }}
                  className="fixed left-3 right-3 top-[84px] z-[45] md:hidden"
                >
                  <div className="rounded-[26px] bg-[#fffaf2] p-2 shadow-[0_0_0_1px_rgba(59,35,14,0.12),0_22px_54px_rgba(52,32,15,0.26),inset_0_1px_0_rgba(255,255,255,0.92)] backdrop-blur-[30px]">
                    <div className="flex items-center justify-between px-3 pb-2 pt-2">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400">{t('nav.navigation')}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-neutral-300">FRAME</span>
                    </div>

                    <div className="space-y-1">
                      {navLinks.map((link) => {
                        const Icon = link.icon;
                        const active = isActive(link.id);

                        return (
                          <button
                            key={link.id}
                            type="button"
                            onClick={() => handleNavClick(link.id, link.type)}
                            className={`flex min-h-[56px] w-full items-center justify-between rounded-[18px] px-3.5 text-left transition-[background-color,color,transform] duration-200 ease-out active:scale-[0.96] ${
                              active
                                ? 'bg-[#f5efe4] text-neutral-950'
                                : 'text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950'
                            }`}
                          >
                            <span className="flex min-w-0 items-center gap-3">
                              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-full ${
                                active ? 'bg-white text-[#3b230e] shadow-[0_0_0_1px_rgba(0,0,0,0.04)]' : 'bg-neutral-100 text-neutral-500'
                              }`}>
                                <Icon size={17} strokeWidth={2} />
                              </span>
                              <span className="truncate text-[15px] font-medium">{link.label}</span>
                            </span>
                            <ArrowUpRight size={16} className={active ? 'text-neutral-500' : 'text-neutral-300'} />
                          </button>
                        );
                      })}
                    </div>

                    <div className="mt-2 grid grid-cols-2 gap-1 border-t border-neutral-100 pt-2">
                      <a
                        href="mailto:albellatross@gmail.com"
                        className="rounded-[15px] px-3 py-2.5 text-center text-[12px] font-medium text-neutral-500 transition-[background-color,color,transform] duration-200 ease-out hover:bg-neutral-50 hover:text-neutral-900 active:scale-[0.96]"
                      >
                        Email
                      </a>
                      <a
                        href="https://www.linkedin.com/in/geli-guo-239807164/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-[15px] px-3 py-2.5 text-center text-[12px] font-medium text-neutral-500 transition-[background-color,color,transform] duration-200 ease-out hover:bg-neutral-50 hover:text-neutral-900 active:scale-[0.96]"
                      >
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </motion.div>

              </>
            )}
          </AnimatePresence>
        </>
      ) : null}

      <main className="relative">
        {children}
      </main>

      {!hideFooter ? (
        <footer className="bg-dark-brown text-white py-16 sm:py-24 px-6 md:px-12 relative z-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-6 sm:mb-8 leading-tight">Let's create <br/>together.</h2>
              <div className="flex flex-col gap-3 sm:gap-4 text-neutral-400">
                <a href="mailto:albellatross@gmail.com" className="hover:text-white flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg transition-colors"><Mail size={18}/> albellatross@gmail.com</a>
                <a href="https://www.linkedin.com/in/geli-guo-239807164/" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg transition-colors"><Linkedin size={18}/> LinkedIn</a>
                <a href="https://www.behance.net/albellatrocb95" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg transition-colors"><Globe size={18}/> Behance</a>
                <a href="https://www.zcool.com.cn/u/18429743" target="_blank" rel="noopener noreferrer" className="hover:text-white flex items-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg transition-colors"><Globe size={18}/> Zcool</a>
              </div>
            </div>
            <div className="flex flex-col justify-end items-start md:items-end">
               <div className="mb-6 sm:mb-8">
                 <button 
                   onClick={() => handleNavClick('hero', 'scroll')}
                   className="w-12 h-12 sm:w-16 sm:h-16 border border-white/20 rounded-full flex items-center justify-center hover:bg-white hover:text-neutral-900 transition-all group"
                 >
                   <ArrowUpRight size={20} className="sm:hidden group-hover:scale-125 transition-transform" />
                   <ArrowUpRight size={24} className="hidden sm:block group-hover:scale-125 transition-transform" />
                 </button>
               </div>
               <p className="text-xs sm:text-sm text-neutral-500 max-w-xs text-left md:text-right leading-relaxed">
                 {t('footer.meta')} <br className="hidden sm:block"/>
                 {t('footer.exploration')}
                 <br/><br/>
                 {t('footer.copyright')}
               </p>
            </div>
          </div>
        </footer>
      ) : null}
    </div>
  );
};

export default Layout;

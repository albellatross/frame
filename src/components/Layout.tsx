import React, { useState, useEffect } from 'react';
import { Linkedin, Mail, X, ArrowUpRight, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: 'home' | 'work' | 'profile';
  onNavigate: (page: 'home' | 'work' | 'profile') => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onNavigate }) => {
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
    { label: t('nav.home'), id: 'hero', type: 'scroll' as const },
    { label: t('nav.timeline'), id: 'timeline', type: 'scroll' as const },
    { label: t('nav.work'), id: 'work', type: 'page' as const },
    { label: t('nav.profile'), id: 'profile', type: 'page' as const }
  ];

  const isActive = (linkId: string) => {
    if (currentPage === 'work' && linkId === 'work') return true;
    if (currentPage === 'profile' && linkId === 'profile') return true;
    if (currentPage === 'home' && linkId === 'hero') return !isScrolled;
    if (currentPage === 'home' && linkId === 'timeline') return isScrolled;
    return false;
  };

  return (
    <div className="min-h-screen bg-cream-light font-sans selection:bg-accent selection:text-white">
      
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
             className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group ${
               isMenuOpen ? 'bg-neutral-100 rotate-90' : 'bg-transparent hover:bg-neutral-100/80'
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

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl flex flex-col pt-32 px-6 md:px-12 pb-12 overflow-hidden"
          >
             <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 h-full">
                
                {/* Left: Navigation List */}
                <div className="flex flex-col justify-center space-y-2">
                   <p className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest mb-6 sm:mb-8">{t('nav.navigation')}</p>
                   {navLinks.map((link, idx) => (
                     <motion.button
                       key={link.id}
                       initial={{ opacity: 0, x: -50 }}
                       animate={{ opacity: 1, x: 0 }}
                       transition={{ delay: 0.1 + idx * 0.1, duration: 0.5 }}
                       onClick={() => handleNavClick(link.id, link.type)}
                       className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-neutral-900 text-left hover:text-accent hover:pl-4 sm:hover:pl-8 transition-all duration-300 group flex items-center gap-3 sm:gap-4"
                     >
                       <span className="text-xs sm:text-sm font-mono text-neutral-300 group-hover:text-accent/50 align-top opacity-0 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                       {link.label}
                     </motion.button>
                   ))}
                </div>

                {/* Right: Info & Visuals */}
                <div className="hidden md:flex flex-col justify-center border-l border-neutral-100 pl-12 lg:pl-24">
                   <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.4 }}
                   >
                     <p className="text-xs font-mono text-neutral-400 uppercase tracking-widest mb-6 lg:mb-8">{t('nav.connect')}</p>
                     
                     <div className="space-y-4 lg:space-y-6 text-base lg:text-lg text-neutral-600">
                        <a href="mailto:albellatross@gmail.com" className="block hover:text-neutral-900 transition-colors">albellatross@gmail.com</a>
                        <a href="https://www.linkedin.com/in/geli-guo-239807164/" target="_blank" rel="noopener noreferrer" className="block hover:text-neutral-900 transition-colors">LinkedIn</a>
                        <a href="https://www.behance.net/albellatrocb95" target="_blank" rel="noopener noreferrer" className="block hover:text-neutral-900 transition-colors">Behance</a>
                     </div>

                     <div className="mt-16 lg:mt-24 p-6 lg:p-8 bg-neutral-50 rounded-2xl max-w-xs lg:max-w-sm">
                        <p className="text-xs lg:text-sm text-neutral-500 italic mb-3 lg:mb-4">
                          {t('quote.eames')}
                        </p>
                        <p className="text-[10px] lg:text-xs font-bold text-neutral-900 uppercase tracking-wider">{t('quote.author')}</p>
                     </div>
                   </motion.div>
                </div>
             </div>
             
             {/* Bottom Footer in Menu */}
             <div className="mt-auto border-t border-neutral-100 pt-8 flex justify-between items-center text-neutral-400 text-xs uppercase tracking-widest">
                <span>© 2024 FRAME</span>
                <span>San Francisco, CA</span>
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative">
        {children}
      </main>

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
    </div>
  );
};

export default Layout;

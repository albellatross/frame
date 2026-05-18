import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageToggleProps {
  trackClassName?: string;
  labelClassName?: string;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({
  trackClassName = 'bg-white/90 backdrop-blur-md shadow-sm border border-neutral-200/50',
  labelClassName = 'text-neutral-900',
}) => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      aria-label={language === 'zh' ? '切换到英文' : 'Switch to Chinese'}
      className={`relative flex h-8 w-[72px] items-center rounded-full p-1 transition-all duration-300 ${trackClassName}`}
    >
      <span className={`absolute left-2.5 text-[10px] font-semibold transition-opacity duration-200 ${labelClassName} ${language === 'en' ? 'opacity-0' : 'opacity-50'}`}>
        EN
      </span>
      <span className={`absolute right-2 text-[10px] font-semibold transition-opacity duration-200 ${labelClassName} ${language === 'zh' ? 'opacity-0' : 'opacity-50'}`}>
        中
      </span>

      <motion.div
        layout
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={`relative z-10 flex h-6 w-7 items-center justify-center rounded-full bg-dark-brown text-[10px] font-bold text-white shadow-md ${language === 'zh' ? 'ml-auto' : ''}`}
      >
        {language === 'en' ? 'EN' : '中'}
      </motion.div>
    </button>
  );
};

export default LanguageToggle;
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { X, FileText, MoveUp, MoveDown, Trash2, Download, Loader2 } from 'lucide-react';
import { projectCoverAsset } from '../utils/assets';
import { useLanguage } from '../contexts/LanguageContext';

interface GeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  selectedIds: string[];
  projects: Project[];
  onRemove: (id: string) => void;
}

const PortfolioGenerator: React.FC<GeneratorProps> = ({ isOpen, onClose, selectedIds, projects, onRemove }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { t } = useLanguage();
  
  // Filter selected projects and maintain order (in a real app, we'd have reordering state)
  const selectedProjects = projects.filter(p => selectedIds.includes(p.id));

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setIsDone(true);
    }, 2500);
  };

  const handleReset = () => {
    setIsDone(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed inset-x-0 bottom-0 z-40 bg-white border-t border-neutral-200 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] h-[85vh] md:h-[600px] flex flex-col md:flex-row"
        >
          {/* Close Button Mobile */}
          <button
            onClick={onClose}
            className="md:hidden absolute top-4 right-4 p-2 text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315CFF]"
            aria-label={t('generator.cancel')}
          >
            <X size={24} aria-hidden="true" />
          </button>

          {/* Left Panel: Controls */}
          <div className="w-full md:w-1/3 bg-neutral-50 p-5 sm:p-8 border-b md:border-b-0 md:border-r border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-neutral-900 text-white flex items-center justify-center rounded-md">
                   <FileText size={14} className="sm:hidden" />
                   <FileText size={16} className="hidden sm:block" />
                </div>
                <h2 className="text-lg sm:text-xl font-serif">{t('generator.title')}</h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 mb-6 sm:mb-8">
                {t('generator.description')}
              </p>

              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase text-neutral-400">{t('generator.coverStyle')}</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="h-16 border-2 border-[#315CFF] bg-white rounded flex items-center justify-center text-xs font-medium text-[#315CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315CFF]">{t('generator.minimal')}</button>
                  <button className="h-16 border border-neutral-200 bg-neutral-100 rounded flex items-center justify-center text-xs text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315CFF]">{t('generator.bold')}</button>
                  <button className="h-16 border border-neutral-200 bg-neutral-100 rounded flex items-center justify-center text-xs text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315CFF]">{t('generator.typographic')}</button>
                  <button className="h-16 border border-neutral-200 bg-neutral-100 rounded flex items-center justify-center text-xs text-neutral-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315CFF]">{t('generator.image')}</button>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
               <button onClick={onClose} className="text-sm text-neutral-500 hover:text-neutral-900 underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315CFF]">
                 {t('generator.cancel')}
               </button>
            </div>
          </div>

          {/* Right Panel: Content List */}
          <div className="w-full md:w-2/3 p-5 sm:p-8 flex flex-col h-full relative">
            {!isDone ? (
              <>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
                  <h3 className="text-sm sm:text-base font-medium text-neutral-900">{t('generator.included')} ({selectedProjects.length})</h3>
                  <span className="text-[10px] sm:text-xs text-neutral-400">{t('generator.reorder')}</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {selectedProjects.length === 0 ? (
                     <div className="h-40 flex items-center justify-center border-2 border-dashed border-neutral-200 rounded-lg text-neutral-400 text-sm">
                       {t('generator.empty')}
                     </div>
                  ) : (
                    selectedProjects.map((p, idx) => (
                      <div key={p.id} className="flex items-center gap-4 p-4 bg-white border border-neutral-100 shadow-sm rounded-lg group">
                        <span className="text-neutral-300 font-mono text-xs">{String(idx + 1).padStart(2, '0')}</span>
                        <div className="w-10 h-10 bg-neutral-100 rounded overflow-hidden">
                          <img src={projectCoverAsset(p)} alt="" width={80} height={80} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-neutral-900">{p.title}</h4>
                          <span className="text-xs text-neutral-500">{p.category}</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-2 hover:bg-neutral-100 rounded text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315CFF]" aria-label={`Move ${p.title} up`}><MoveUp size={14} aria-hidden="true" /></button>
                           <button className="p-2 hover:bg-neutral-100 rounded text-neutral-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315CFF]" aria-label={`Move ${p.title} down`}><MoveDown size={14} aria-hidden="true" /></button>
                           <button onClick={() => onRemove(p.id)} className="p-2 hover:bg-red-50 rounded text-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500" aria-label={`Remove ${p.title}`}><Trash2 size={14} aria-hidden="true" /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-100 flex justify-end">
                   <button 
                     disabled={selectedProjects.length === 0 || isGenerating}
                     onClick={handleGenerate}
                     className={`px-8 py-3 rounded-full text-white font-medium flex items-center gap-2 transition-[background-color,transform,opacity] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315CFF] ${
                       selectedProjects.length === 0 
                       ? 'bg-neutral-300 cursor-not-allowed' 
                       : 'bg-neutral-900 hover:bg-[#315CFF] active:scale-[0.96]'
                     }`}
                   >
                     {isGenerating ? <><Loader2 className="animate-spin" size={18} aria-hidden="true" /> {t('generator.generating')}</> : t('generator.generate')}
                   </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center px-4">
                 <motion.div 
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 sm:mb-6"
                 >
                   <Download size={24} className="sm:hidden" />
                   <Download size={32} className="hidden sm:block" />
                 </motion.div>
                 <h3 className="text-xl sm:text-2xl font-serif text-neutral-900 mb-2">{t('generator.ready')}</h3>
                 <p className="text-sm sm:text-base text-neutral-500 max-w-md mb-6 sm:mb-8">
                   {t('generator.success')} {selectedProjects.length} {t('generator.projects')}
                 </p>
                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                   <button onClick={handleReset} className="px-6 py-2.5 sm:py-2 border border-neutral-200 rounded-full text-sm hover:bg-neutral-50 order-2 sm:order-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315CFF]">
                     {t('generator.edit')}
                   </button>
                   <button className="px-6 py-2.5 sm:py-2 bg-neutral-900 text-white rounded-full text-sm hover:bg-neutral-800 order-1 sm:order-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#315CFF]">
                     {t('generator.download')}
                   </button>
                 </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PortfolioGenerator;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import { X, FileText, MoveUp, MoveDown, Trash2, Download, Loader2 } from 'lucide-react';

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
          <button onClick={onClose} className="md:hidden absolute top-4 right-4 p-2 text-neutral-400">
            <X size={24} />
          </button>

          {/* Left Panel: Controls */}
          <div className="w-full md:w-1/3 bg-neutral-50 p-5 sm:p-8 border-b md:border-b-0 md:border-r border-neutral-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-neutral-900 text-white flex items-center justify-center rounded-md">
                   <FileText size={14} className="sm:hidden" />
                   <FileText size={16} className="hidden sm:block" />
                </div>
                <h2 className="text-lg sm:text-xl font-serif">Generate Portfolio</h2>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 mb-6 sm:mb-8">
                Curate a specific PDF version of this portfolio tailored to your recruitment needs.
              </p>

              <div className="space-y-4">
                <label className="block text-xs font-bold uppercase text-neutral-400">Cover Style</label>
                <div className="grid grid-cols-2 gap-2">
                  <button className="h-16 border-2 border-accent bg-white rounded flex items-center justify-center text-xs font-medium text-accent">Minimal</button>
                  <button className="h-16 border border-neutral-200 bg-neutral-100 rounded flex items-center justify-center text-xs text-neutral-400">Bold</button>
                  <button className="h-16 border border-neutral-200 bg-neutral-100 rounded flex items-center justify-center text-xs text-neutral-400">Typographic</button>
                  <button className="h-16 border border-neutral-200 bg-neutral-100 rounded flex items-center justify-center text-xs text-neutral-400">Image</button>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
               <button onClick={onClose} className="text-sm text-neutral-500 hover:text-neutral-900 underline">
                 Cancel and Close
               </button>
            </div>
          </div>

          {/* Right Panel: Content List */}
          <div className="w-full md:w-2/3 p-5 sm:p-8 flex flex-col h-full relative">
            {!isDone ? (
              <>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0 mb-4 sm:mb-6">
                  <h3 className="text-sm sm:text-base font-medium text-neutral-900">Included Projects ({selectedProjects.length})</h3>
                  <span className="text-[10px] sm:text-xs text-neutral-400">Drag to reorder (Simulated)</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                  {selectedProjects.length === 0 ? (
                     <div className="h-40 flex items-center justify-center border-2 border-dashed border-neutral-200 rounded-lg text-neutral-400 text-sm">
                       No projects selected. Add them from the Work section.
                     </div>
                  ) : (
                    selectedProjects.map((p, idx) => (
                      <div key={p.id} className="flex items-center gap-4 p-4 bg-white border border-neutral-100 shadow-sm rounded-lg group">
                        <span className="text-neutral-300 font-mono text-xs">{String(idx + 1).padStart(2, '0')}</span>
                        <div className="w-10 h-10 bg-neutral-100 rounded overflow-hidden">
                          <img src={p.coverImage} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-neutral-900">{p.title}</h4>
                          <span className="text-xs text-neutral-500">{p.category}</span>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                           <button className="p-2 hover:bg-neutral-100 rounded text-neutral-500"><MoveUp size={14} /></button>
                           <button className="p-2 hover:bg-neutral-100 rounded text-neutral-500"><MoveDown size={14} /></button>
                           <button onClick={() => onRemove(p.id)} className="p-2 hover:bg-red-50 rounded text-red-500"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="mt-6 pt-6 border-t border-neutral-100 flex justify-end">
                   <button 
                     disabled={selectedProjects.length === 0 || isGenerating}
                     onClick={handleGenerate}
                     className={`px-8 py-3 rounded-full text-white font-medium flex items-center gap-2 transition-all ${
                       selectedProjects.length === 0 
                       ? 'bg-neutral-300 cursor-not-allowed' 
                       : 'bg-neutral-900 hover:bg-accent'
                     }`}
                   >
                     {isGenerating ? <><Loader2 className="animate-spin" size={18} /> Generating PDF...</> : 'Generate Portfolio'}
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
                 <h3 className="text-xl sm:text-2xl font-serif text-neutral-900 mb-2">Portfolio Ready</h3>
                 <p className="text-sm sm:text-base text-neutral-500 max-w-md mb-6 sm:mb-8">
                   Your curated portfolio "Portfolio_2024_v1.pdf" has been generated successfully with {selectedProjects.length} projects.
                 </p>
                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                   <button onClick={handleReset} className="px-6 py-2.5 sm:py-2 border border-neutral-200 rounded-full text-sm hover:bg-neutral-50 order-2 sm:order-1">
                     Edit Selection
                   </button>
                   <button className="px-6 py-2.5 sm:py-2 bg-neutral-900 text-white rounded-full text-sm hover:bg-neutral-800 order-1 sm:order-2">
                     Download PDF
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
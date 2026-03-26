import React, { useState } from 'react';
import { Project } from '../types';
import { Plus, Check, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface WorkPageProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  selectedProjectIds: string[];
  onToggleSelect: (id: string) => void;
}

const WorkPage: React.FC<WorkPageProps> = ({ projects, onProjectClick, selectedProjectIds, onToggleSelect }) => {
  const [filter, setFilter] = useState<'All' | 'System' | 'C-Side' | 'B-Side'>('All');
  const { t } = useLanguage();

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-6 md:px-12 bg-white min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-neutral-100 pb-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-8">
           <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-neutral-900 mb-4 sm:mb-6">{t('work.title')}</h1>
              <p className="text-base sm:text-lg md:text-xl text-neutral-500 max-w-md sm:max-w-xl font-light leading-relaxed">
                {t('work.description')}
              </p>
           </div>
           
           {/* Filter Pills */}
           <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {['All', 'System', 'B-Side', 'C-Side'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-6 py-3 rounded-full text-sm transition-all whitespace-nowrap border ${
                  filter === f 
                    ? 'bg-neutral-900 text-white border-neutral-900' 
                    : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                }`}
              >
                {f === 'All' ? t('work.all') : f}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
          {filteredProjects.map((project, idx) => {
            const isSelected = selectedProjectIds.includes(project.id);
            // Alternate layout logic for visual interest: every 3rd item is full width
            const isFullWidth = (idx % 3 === 2); 

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={project.id} 
                className={`group cursor-pointer ${isFullWidth ? 'md:col-span-2' : 'md:col-span-1'}`}
                onClick={() => onProjectClick(project)}
              >
                 {/* Image Container */}
                 <div className={`relative overflow-hidden bg-neutral-100 mb-6 ${isFullWidth ? 'aspect-[21/9]' : 'aspect-[16/10] md:aspect-[4/3]'}`}>
                    <img 
                      src={project.coverImage} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                    
                    {/* Selection Button */}
                    <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSelect(project.id);
                        }}
                        className={`absolute top-6 right-6 z-20 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-lg ${
                          isSelected ? 'bg-gradient-accent text-white' : 'bg-white/90 text-neutral-400 hover:bg-white hover:text-neutral-900'
                        }`}
                     >
                        {isSelected ? <Check size={20} /> : <Plus size={20} />}
                     </button>
                 </div>

                 {/* Typography */}
                 <div className="flex justify-between items-start">
                    <div className="flex-1 min-w-0">
                       <span className="text-[10px] sm:text-xs font-mono text-gradient-accent uppercase tracking-widest mb-1 sm:mb-2 block">
                          {project.category} — {project.year}
                       </span>
                       <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-neutral-900 mb-1 sm:mb-2 group-hover:underline decoration-1 underline-offset-4">
                          {project.title}
                       </h3>
                       <p className="text-neutral-500 text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg leading-relaxed">
                          {project.shortDescription}
                       </p>
                    </div>
                    
                    <div className="hidden md:flex items-center gap-2 text-neutral-400 group-hover:text-accent transition-colors mt-2">
                       <span className="text-sm font-medium uppercase tracking-wider">{t('work.viewCase')}</span>
                       <ArrowRight size={18} />
                    </div>
                 </div>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="py-24 text-center text-neutral-400 border-t border-neutral-100 mt-12">
            {t('work.noProjects')}
          </div>
        )}

      </div>
    </motion.div>
  );
};

export default WorkPage;
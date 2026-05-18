import React, { useState, useRef } from 'react';
import { Project } from '../types';
import { Plus, Check, ArrowRight } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
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

  // Card 3D Tilt Component
  const ProjectCard: React.FC<{ project: Project; idx: number; isFullWidth: boolean }> = ({ project, idx, isFullWidth }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isSelected = selectedProjectIds.includes(project.id);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const rect = cardRef.current.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;

      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;

      x.set(xPct);
      y.set(yPct);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    return (
      <motion.div
        ref={cardRef}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: idx * 0.08 }}
        className={`group cursor-pointer ${isFullWidth ? 'md:col-span-2' : 'md:col-span-1'}`}
        style={{
          perspective: '1000px',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onProjectClick(project)}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        >
          {/* Image Container */}
          <div className={`relative overflow-hidden bg-cream mb-6 rounded-2xl shadow-card group-hover:shadow-card-hover transition-shadow duration-500 ${isFullWidth ? 'aspect-[21/9]' : 'aspect-[16/10] md:aspect-[4/3]'}`}>
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Shimmer Effect */}
            <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* Selection Button */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                onToggleSelect(project.id);
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={`absolute top-6 right-6 z-20 w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 shadow-button hover:shadow-button-hover ${
                isSelected ? 'bg-gradient-accent text-white scale-110' : 'bg-white/90 text-warm-gray hover:bg-white hover:text-dark-brown'
              }`}
            >
              {isSelected ? <Check size={20} strokeWidth={3} /> : <Plus size={20} />}
            </motion.button>
          </div>

          {/* Typography */}
          <div className="flex justify-between items-start px-2">
            <div className="flex-1 min-w-0">
              <motion.span
                className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest mb-1 sm:mb-2 block bg-gradient-accent bg-clip-text text-transparent"
                style={{ backgroundSize: '200% 200%' }}
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              >
                {project.category} — {project.year}
              </motion.span>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-dark-brown mb-1 sm:mb-2 group-hover:text-primary transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-warm-gray text-sm sm:text-base md:text-lg max-w-md sm:max-w-lg leading-relaxed">
                {project.shortDescription}
              </p>
            </div>

            <motion.div
              className="hidden md:flex items-center gap-2 text-warm-gray group-hover:text-accent transition-colors mt-2"
              whileHover={{ x: 5 }}
            >
              <span className="text-sm font-medium uppercase tracking-wider">{t('work.viewCase')}</span>
              <ArrowRight size={18} />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-6 md:px-12 bg-cream-light min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="border-b border-cream-dark pb-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-8">
           <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-serif text-dark-brown mb-4 sm:mb-6">{t('work.title')}</h1>
              <p className="text-base sm:text-lg md:text-xl text-warm-gray max-w-md sm:max-w-xl font-light leading-relaxed">
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
                    ? 'bg-dark-brown text-white border-dark-brown' 
                    : 'bg-cream-light text-warm-gray border-cream-dark hover:border-brown'
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
            const isFullWidth = (idx % 3 === 2);
            return (
              <ProjectCard
                key={project.id}
                project={project}
                idx={idx}
                isFullWidth={isFullWidth}
              />
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
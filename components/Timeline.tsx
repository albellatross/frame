import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { CareerStage, Project } from '../types';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface TimelineProps {
  stages: CareerStage[];
  allProjects: Project[];
  onProjectClick: (projectId: string) => void;
}

const Timeline: React.FC<TimelineProps> = ({ stages, allProjects, onProjectClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStageId, setActiveStageId] = useState<string>(stages[0].id);
  const { t } = useLanguage();

  return (
    <section ref={containerRef} id="timeline" className="relative bg-dark-brown text-white py-24 md:py-0">
      <div className="flex flex-col md:flex-row">
        
        {/* Left Panel: Sticky Visuals (Desktop Only) */}
        <div className="hidden md:block md:w-2/5 h-screen sticky top-0 overflow-hidden bg-brown">
          <AnimatePresence mode="wait">
             {stages.map((stage) => (
                stage.id === activeStageId && (
                  <motion.div
                    key={stage.id}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                  >
                    <img 
                      src={stage.image} 
                      alt={stage.company} 
                      className="w-full h-full object-cover opacity-60" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-brown via-transparent to-transparent" />
                    
                    {/* Atmospheric Text */}
                    <div className="absolute bottom-12 lg:bottom-24 left-8 lg:left-12 max-w-sm lg:max-w-md">
                       <h3 className="text-5xl lg:text-7xl font-serif mb-3 lg:mb-4 text-white/10 select-none">{stage.period.split('-')[0]}</h3>
                       <p className="text-lg lg:text-2xl font-light text-white/90 italic">"{stage.oneLiner}"</p>
                    </div>
                  </motion.div>
                )
             ))}
          </AnimatePresence>
        </div>

        {/* Right Panel: Scrolling Content */}
        <div className="w-full md:w-3/5 relative bg-cream-light">
          <div className="max-w-xl mx-auto px-6 py-24 md:py-48 space-y-48">
            
            <div className="mb-12 sm:mb-24">
                <span className="text-warm-gray uppercase tracking-widest text-[10px] sm:text-xs">{t('timeline.journey')}</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-dark-brown mt-2">{t('timeline.title')}</h2>
            </div>

            {stages.map((stage, index) => (
              <TimelineItem 
                key={stage.id} 
                stage={stage} 
                projects={allProjects.filter(p => stage.relatedProjectIds.includes(p.id))}
                onProjectClick={onProjectClick}
                onInView={() => setActiveStageId(stage.id)}
                t={t}
                index={index}
                total={stages.length}
              />
            ))}
            
            <div className="h-[20vh]"></div> {/* Spacer for bottom scroll */}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineItem: React.FC<{ 
  stage: CareerStage; 
  projects: Project[]; 
  onProjectClick: (id: string) => void;
  onInView: () => void;
  t: (key: string) => string;
  index: number;
  total: number;
}> = ({ stage, projects, onProjectClick, onInView, t, index, total }) => {
  const ref = useRef(null);
  
  // 根据索引计算颜色 - 索引0是最近的（粉色），索引越大越远（蓝色）
  const getTimelineColor = () => {
    const colors = [
      { line: '#5F4E41', text: '#5F4E41' },  // Brown - 最近
      { line: '#8C5462', text: '#8C5462' },  // Mauve - 中间
      { line: '#72675B', text: '#72675B' },  // Warm Gray - 最远
    ];
    return colors[Math.min(index, colors.length - 1)];
  };
  
  const timelineColor = getTimelineColor();
  
  // Use framer motion viewport to detect when this item is in focus
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end center"]
  });

  // Simple effect to trigger state change when largely in view
  useTransform(scrollYProgress, (pos) => {
    if (pos > 0 && pos < 1) {
      onInView();
    }
    return pos;
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ margin: "-20% 0px" }}
      onViewportEnter={onInView} // Backup trigger
      className="relative pl-8 border-l-2 border-cream-dark"
    >
      {/* Active Indicator Line - Dynamic Color */}
      <motion.div 
        className="absolute left-[-2px] top-0 bottom-0 w-[2px] origin-top" 
        style={{ backgroundColor: timelineColor.line }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 1 }}
      />

      <span 
        className="text-[10px] sm:text-xs font-mono uppercase tracking-wider block mb-1 sm:mb-2"
        style={{ color: timelineColor.text }}
      >
        {stage.period}
      </span>
      <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-dark-brown mb-1">{stage.company}</h3>
      <p className="text-base sm:text-lg text-warm-gray font-light mb-4 sm:mb-6">{stage.role}</p>
      
      {/* Mobile-only visible visual since sticky is hidden */}
      <div className="md:hidden w-full h-48 mb-6 rounded-lg overflow-hidden relative">
         <img src={stage.image} className="w-full h-full object-cover" alt="" />
         <div className="absolute inset-0 bg-black/20" />
      </div>

      <p className="text-sm sm:text-base text-warm-gray leading-relaxed mb-6 sm:mb-8">
        {stage.oneLiner}
      </p>

      {/* Embedded Project Cards (Photos as requested) */}
      <div className="grid grid-cols-1 gap-6">
         {projects.map((project) => (
           <motion.div 
             key={project.id}
             whileHover={{ y: -5 }}
             className="group cursor-pointer bg-white rounded-xl overflow-hidden border border-cream-dark shadow-sm hover:shadow-md transition-all"
             onClick={() => onProjectClick(project.id)}
           >
             <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.coverImage} 
                  alt={project.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                   <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white text-xs font-medium flex items-center gap-2">
                      {t('timeline.viewCase')} <ArrowUpRight size={14} />
                   </div>
                </div>
             </div>
             <div className="p-4 sm:p-5">
                <h4 className="font-serif text-base sm:text-lg text-dark-brown">{project.title}</h4>
                <p className="text-[10px] sm:text-xs text-warm-gray mt-1 line-clamp-2">{project.shortDescription}</p>
             </div>
           </motion.div>
         ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-8">
        {stage.skills.map(skill => (
          <span key={skill} className="text-[10px] uppercase tracking-wide bg-cream text-warm-gray px-3 py-1 rounded-full">
            {skill}
          </span>
        ))}
      </div>

    </motion.div>
  );
};

export default Timeline;
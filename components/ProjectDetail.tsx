import React, { useEffect } from 'react';
import { Project } from '../types';
import { X, ArrowRight, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectDetailProps {
  project: Project | null;
  onClose: () => void;
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [project]);

  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-neutral-900/90 backdrop-blur-sm flex justify-end"
    >
      <motion.div 
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="w-full md:w-[800px] bg-white h-full overflow-y-auto relative shadow-2xl"
      >
        <button 
          onClick={onClose}
          className="fixed top-6 right-6 z-50 p-2 bg-white/80 backdrop-blur rounded-full hover:bg-neutral-100 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="h-[35vh] sm:h-[40vh] w-full relative">
          <img src={project.coverImage} className="w-full h-full object-cover" alt={project.title} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6 sm:p-8 md:p-12">
            <div>
               <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-2">{project.title}</h2>
               <p className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed">{project.shortDescription}</p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 md:p-12 space-y-12 sm:space-y-16 max-w-3xl mx-auto">
          
          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 border-b border-neutral-100 pb-6 sm:pb-8">
            <div><span className="text-[10px] sm:text-xs text-neutral-400 block mb-1">Role</span><span className="text-xs sm:text-sm font-medium">{project.role}</span></div>
            <div><span className="text-[10px] sm:text-xs text-neutral-400 block mb-1">Year</span><span className="text-xs sm:text-sm font-medium">{project.year}</span></div>
            <div><span className="text-[10px] sm:text-xs text-neutral-400 block mb-1">Platform</span><span className="text-xs sm:text-sm font-medium">{project.platform}</span></div>
            <div><span className="text-[10px] sm:text-xs text-neutral-400 block mb-1">Type</span><span className="text-xs sm:text-sm font-medium">{project.category}</span></div>
          </div>

          {/* Act 1: Problem */}
          <section>
            <span className="text-[10px] sm:text-xs font-mono text-accent uppercase tracking-widest mb-3 sm:mb-4 block">Act I : The Context</span>
            <h3 className="text-xl sm:text-2xl font-serif text-neutral-900 mb-3 sm:mb-4">{project.acts.act1.title}</h3>
            <p className="text-neutral-600 leading-relaxed text-base sm:text-lg">{project.acts.act1.content}</p>
          </section>

          {/* Act 2: Decision */}
          <section className="bg-neutral-50 -mx-6 sm:-mx-8 md:-mx-12 p-6 sm:p-8 md:p-12 border-y border-neutral-100">
             <span className="text-[10px] sm:text-xs font-mono text-accent uppercase tracking-widest mb-3 sm:mb-4 block">Act II : The Frame</span>
             <h3 className="text-xl sm:text-2xl font-serif text-neutral-900 mb-4 sm:mb-6">{project.acts.act2.title}</h3>
             <p className="text-neutral-600 leading-relaxed text-base sm:text-lg mb-6 sm:mb-8">{project.acts.act2.content}</p>
             
             <div className="space-y-4">
                <p className="text-sm font-medium text-neutral-900">Key Decisions:</p>
                {project.acts.act2.decisionPoints.map((dp, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 min-w-[20px] h-[20px] rounded-full bg-white border border-neutral-200 flex items-center justify-center text-[10px] font-bold text-accent">
                      {idx + 1}
                    </div>
                    <p className="text-neutral-700">{dp}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* Act 3: Result */}
          <section>
             <span className="text-[10px] sm:text-xs font-mono text-accent uppercase tracking-widest mb-3 sm:mb-4 block">Act III : The Outcome</span>
             <h3 className="text-xl sm:text-2xl font-serif text-neutral-900 mb-3 sm:mb-4">{project.acts.act3.title}</h3>
             <p className="text-neutral-600 leading-relaxed text-base sm:text-lg mb-6 sm:mb-8">{project.acts.act3.content}</p>
             
             <div className="bg-neutral-900 text-white p-5 sm:p-6 md:p-8 rounded-lg">
                <span className="block text-[10px] sm:text-xs text-neutral-400 mb-2 uppercase">Primary Metric Impact</span>
                <span className="text-2xl sm:text-3xl md:text-4xl font-serif">{project.acts.act3.impact}</span>
             </div>
          </section>

          {/* Image Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <section>
              <span className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4 block">Project Visuals</span>
              <div className="grid grid-cols-1 gap-4">
                {project.gallery.map((image, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="w-full rounded-lg overflow-hidden shadow-lg"
                  >
                    <img src={image} alt={`${project.title} - ${idx + 1}`} className="w-full h-auto" />
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* External Links */}
          {project.externalLinks && Object.keys(project.externalLinks).length > 0 && (
            <section className="bg-blue-50 -mx-6 sm:-mx-8 md:-mx-12 p-6 sm:p-8 md:p-12">
              <span className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4 block">View More</span>
              <div className="flex flex-wrap gap-3">
                {project.externalLinks.behance && (
                  <a
                    href={project.externalLinks.behance}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 px-4 py-2 rounded-full text-sm font-medium transition-colors border border-neutral-200"
                  >
                    <ExternalLink size={16} />
                    View on Behance
                  </a>
                )}
                {project.externalLinks.zcool && (
                  <a
                    href={project.externalLinks.zcool}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 px-4 py-2 rounded-full text-sm font-medium transition-colors border border-neutral-200"
                  >
                    <ExternalLink size={16} />
                    View on Zcool
                  </a>
                )}
                {project.externalLinks.live && (
                  <a
                    href={project.externalLinks.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white hover:bg-neutral-50 px-4 py-2 rounded-full text-sm font-medium transition-colors border border-neutral-200"
                  >
                    <ExternalLink size={16} />
                    Live Project
                  </a>
                )}
              </div>
            </section>
          )}

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <section>
              <span className="text-[10px] sm:text-xs font-mono text-neutral-400 uppercase tracking-widest mb-4 block">Skills & Tools</span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs rounded-full transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </section>
          )}

          <div className="pt-8 border-t border-neutral-100 flex justify-between items-center text-sm text-neutral-400">
            <span>End of Case Study</span>
            <button onClick={onClose} className="flex items-center gap-2 hover:text-neutral-900 transition-colors">
              Back to Timeline <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetail;
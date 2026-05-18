import React, { useState } from 'react';
import { Project } from '../types';
import { Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProjectListProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
  selectedProjectIds: string[];
  onToggleSelect: (id: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onProjectClick, selectedProjectIds, onToggleSelect }) => {
  const [filter, setFilter] = useState<'All' | 'System' | 'C-Side' | 'B-Side'>('All');

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="work" className="py-24 px-6 md:px-12 bg-cream-light">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="text-3xl font-serif text-neutral-900 mb-2">Selected Works</h2>
            <p className="text-neutral-500">Case studies structured by the decisions made.</p>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
            {['All', 'System', 'B-Side', 'C-Side'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`px-4 py-2 rounded-full text-sm transition-all whitespace-nowrap ${
                  filter === f 
                    ? 'bg-neutral-900 text-white' 
                    : 'bg-white text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {filteredProjects.map((project) => {
            const isSelected = selectedProjectIds.includes(project.id);
            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                key={project.id} 
                className="group relative bg-white aspect-[4/3] md:aspect-[16/10] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-shadow duration-500"
                onClick={() => onProjectClick(project)}
              >
                 <img 
                   src={project.coverImage} 
                   alt={project.title} 
                   className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                 />
                 
                 {/* Overlay Content */}
                 <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="text-xs font-mono text-white/80 border border-white/30 px-2 py-1 rounded mb-3 inline-block">
                        {project.category} · {project.platform}
                      </span>
                      <h3 className="text-2xl font-serif text-white mb-2">{project.title}</h3>
                      <p className="text-white/80 text-sm max-w-md">{project.shortDescription}</p>
                    </div>
                 </div>

                 {/* Selection Button (Prevent bubbling to allow selection without opening) */}
                 <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleSelect(project.id);
                    }}
                    className={`absolute top-4 right-4 z-20 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                      isSelected ? 'bg-accent text-white' : 'bg-white/20 text-white hover:bg-white hover:text-neutral-900'
                    }`}
                 >
                    {isSelected ? <Check size={18} /> : <Plus size={18} />}
                 </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProjectList;
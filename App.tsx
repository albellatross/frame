import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PROJECTS_EN, PROJECTS_ZH, CAREER_TIMELINE_EN, CAREER_TIMELINE_ZH } from './constants';
import { Project } from './types';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Introduction from './components/Introduction';
import Timeline from './components/Timeline';
import ResumePage from './components/ResumePage';
import WorkPage from './components/WorkPage';
import ProjectDetail from './components/ProjectDetail';
import PortfolioGenerator from './components/PortfolioGenerator';

const AppContent: React.FC = () => {
  const { language } = useLanguage();
  
  // 根据语言选择数据
  const PROJECTS = language === 'zh' ? PROJECTS_ZH : PROJECTS_EN;
  const CAREER_TIMELINE = language === 'zh' ? CAREER_TIMELINE_ZH : CAREER_TIMELINE_EN;

  // State
  const [currentPage, setCurrentPage] = useState<'home' | 'work' | 'profile'>('home');
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  // Re-resolve activeProject when language changes
  const resolvedProject = activeProject ? PROJECTS.find(p => p.id === activeProject.id) || activeProject : null;
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);

  // Handlers
  const handleProjectSelect = (id: string) => {
    setSelectedProjectIds(prev => 
      prev.includes(id) ? prev.filter(pid => pid !== id) : [...prev, id]
    );
  };

  const handleProjectClick = (project: Project) => {
    setActiveProject(project);
  };

  const handleProjectClickById = (id: string) => {
    const project = PROJECTS.find(p => p.id === id);
    if (project) setActiveProject(project);
  };

  return (
    <Layout 
      onOpenGenerator={() => setIsGeneratorOpen(true)}
      selectedCount={selectedProjectIds.length}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
    >
      {currentPage === 'home' && (
        <>
          <Hero />
          <Introduction />
          <Timeline 
            stages={CAREER_TIMELINE}
            allProjects={PROJECTS}
            onProjectClick={handleProjectClickById}
          />
        </>
      )}

      {currentPage === 'work' && (
        <WorkPage 
          projects={PROJECTS}
          onProjectClick={handleProjectClick}
          selectedProjectIds={selectedProjectIds}
          onToggleSelect={handleProjectSelect}
        />
      )}

      {currentPage === 'profile' && (
        <ResumePage />
      )}

      {/* Overlays */}
      <AnimatePresence>
        {resolvedProject && (
          <ProjectDetail 
            project={resolvedProject} 
            onClose={() => setActiveProject(null)} 
          />
        )}
      </AnimatePresence>
      
      <PortfolioGenerator
        isOpen={isGeneratorOpen}
        onClose={() => setIsGeneratorOpen(false)}
        selectedIds={selectedProjectIds}
        projects={PROJECTS}
        onRemove={handleProjectSelect}
      />
    </Layout>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
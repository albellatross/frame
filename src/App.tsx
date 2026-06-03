import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { PROJECTS_EN, PROJECTS_ZH, CAREER_TIMELINE_EN, CAREER_TIMELINE_ZH } from './data';
import { Project } from './types';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import Timeline from './components/Timeline';
import ResumePage from './components/ResumePage';
import WorkPage from './components/WorkPage';
import ProjectDetail from './components/ProjectDetail';
import PortfolioGenerator from './components/PortfolioGenerator';
import WalkThrough from './components/walk-through';

const hasPortfolioReaderPages = (project: Project) =>
  Boolean(project.slideSets?.zh?.length || project.slideSets?.en?.length || project.slides?.length || project.caseSections?.length);

const AppContent: React.FC = () => {
  const { language } = useLanguage();
  
  // 根据语言选择数据
  const PROJECTS = language === 'zh' ? PROJECTS_ZH : PROJECTS_EN;
  const WORK_PROJECTS = PROJECTS.filter(hasPortfolioReaderPages);
  const CAREER_TIMELINE = language === 'zh' ? CAREER_TIMELINE_ZH : CAREER_TIMELINE_EN;

  // State
  const [currentPage, setCurrentPage] = useState<'home' | 'work' | 'profile'>('home');
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isGeneratorOpen, setIsGeneratorOpen] = useState(false);
  const [isWalkThroughOpen, setIsWalkThroughOpen] = useState(false);

  // Re-resolve activeProject when language changes
  const resolvedProject = activeProject
    ? WORK_PROJECTS.find(p => p.id === activeProject.id) || PROJECTS.find(p => p.id === activeProject.id) || activeProject
    : null;

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
    const project = WORK_PROJECTS.find(p => p.id === id);
    if (project) setActiveProject(project);
  };

  return (
    <>
    <Layout 
      onOpenGenerator={() => setIsGeneratorOpen(true)}
      selectedCount={selectedProjectIds.length}
      currentPage={currentPage}
      onNavigate={setCurrentPage}
    >
      {currentPage === 'home' && (
        <>
          <Hero />
          <AboutSection onOpenWalkThrough={() => setIsWalkThroughOpen(true)} />
          <Timeline 
            stages={CAREER_TIMELINE}
            allProjects={WORK_PROJECTS}
            onProjectClick={handleProjectClickById}
          />
        </>
      )}

      {currentPage === 'work' && (
        <WorkPage 
          projects={WORK_PROJECTS}
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
        projects={WORK_PROJECTS}
        onRemove={handleProjectSelect}
      />
    </Layout>

    {/* Walk Through — rendered outside Layout to avoid z-index stacking context */}
    <AnimatePresence>
      {isWalkThroughOpen && (
        <WalkThrough
          onClose={() => setIsWalkThroughOpen(false)}
          onExploreWork={() => {
            setIsWalkThroughOpen(false);
            setCurrentPage('work');
          }}
          onOpenResume={() => {
            setIsWalkThroughOpen(false);
            setCurrentPage('profile');
          }}
        />
      )}
    </AnimatePresence>
    </>
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

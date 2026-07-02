import React, { useCallback, useState } from 'react';
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
import WalkThrough from './components/walk-through';

type Page = 'home' | 'work' | 'profile';
type AgentReturnTarget = 'home' | 'profile' | 'timeline' | 'archive';
type LocalizedLabel = { en: string; zh: string };

const hasPortfolioReaderPages = (project: Project) =>
  Boolean(project.slideSets?.zh?.length || project.slideSets?.en?.length || project.slides?.length || project.caseSections?.length);

const AppContent: React.FC = () => {
  const { language } = useLanguage();
  
  // 根据语言选择数据
  const PROJECTS = language === 'zh' ? PROJECTS_ZH : PROJECTS_EN;
  const WORK_PROJECTS = PROJECTS.filter(hasPortfolioReaderPages);
  const CAREER_TIMELINE = language === 'zh' ? CAREER_TIMELINE_ZH : CAREER_TIMELINE_EN;

  // State
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isWalkThroughOpen, setIsWalkThroughOpen] = useState(false);
  const [workReturnTarget, setWorkReturnTarget] = useState<'timeline' | null>(null);
  const [workViewMode, setWorkViewMode] = useState<'agent' | 'archive'>('agent');
  const [agentReturnTarget, setAgentReturnTarget] = useState<AgentReturnTarget>('home');

  // Re-resolve activeProject when language changes
  const resolvedProject = activeProject
    ? WORK_PROJECTS.find(p => p.id === activeProject.id) || PROJECTS.find(p => p.id === activeProject.id) || activeProject
    : null;

  // Handlers
  const handleProjectClick = (project: Project) => {
    setActiveProject(project);
  };

  const handleProjectClickById = (id: string) => {
    const project = WORK_PROJECTS.find(p => p.id === id);
    if (project) setActiveProject(project);
  };

  const scrollToTimeline = () => {
    const timeline = document.getElementById('timeline');
    if (timeline) {
      const y = timeline.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleViewAllWorksFromTimeline = () => {
    setWorkReturnTarget('timeline');
    setAgentReturnTarget('timeline');
    setWorkViewMode('agent');
    setCurrentPage('work');
    window.scrollTo(0, 0);
  };

  const handleReturnToTimeline = () => {
    setCurrentPage('home');
    setWorkReturnTarget(null);
    setAgentReturnTarget('home');
    window.setTimeout(scrollToTimeline, 120);
  };

  const handleNavigate = (page: Page) => {
    const previousPage = currentPage;
    setCurrentPage(page);
    setWorkReturnTarget(null);
    if (page === 'work') {
      setAgentReturnTarget(previousPage === 'work' && workViewMode === 'archive' ? 'archive' : previousPage === 'profile' ? 'profile' : 'home');
      setWorkViewMode('agent');
    }
  };

  const handleWorkViewModeChange = useCallback((viewMode: 'agent' | 'archive') => {
    if (viewMode === 'agent' && workViewMode === 'archive') {
      setAgentReturnTarget('archive');
    }
    if (viewMode === 'archive') {
      setWorkReturnTarget(null);
    }
    setWorkViewMode(viewMode);
  }, [workViewMode]);

  const handleAgentBack = useCallback(() => {
    const target = workReturnTarget === 'timeline' ? 'timeline' : agentReturnTarget;

    if (target === 'timeline') {
      handleReturnToTimeline();
      return;
    }

    if (target === 'profile') {
      setCurrentPage('profile');
      setWorkReturnTarget(null);
      setAgentReturnTarget('home');
      window.scrollTo(0, 0);
      return;
    }

    setCurrentPage('home');
    setWorkReturnTarget(null);
    setAgentReturnTarget('home');
    window.scrollTo(0, 0);
  }, [agentReturnTarget, workReturnTarget]);

  const agentBackLabel: LocalizedLabel =
    workReturnTarget === 'timeline' || agentReturnTarget === 'timeline'
      ? { en: 'Back to Timeline', zh: '返回时间线' }
      : agentReturnTarget === 'archive'
        ? { en: 'Back to Library', zh: '返回项目库' }
        : agentReturnTarget === 'profile'
          ? { en: 'Back to Profile', zh: '返回 Profile' }
          : { en: 'Back', zh: '返回' };

  const hideAgentChrome = currentPage === 'work' && workViewMode === 'agent' && !activeProject;
  const hideFooter = hideAgentChrome;
  const hideHeader = hideAgentChrome;

  return (
    <>
    <Layout 
      currentPage={currentPage}
      onNavigate={handleNavigate}
      hideHeader={hideHeader}
      hideFooter={hideFooter}
    >
      {currentPage === 'home' && (
        <>
          <Hero />
          <AboutSection onOpenWalkThrough={() => setIsWalkThroughOpen(true)} />
          <Timeline 
            stages={CAREER_TIMELINE}
            allProjects={WORK_PROJECTS}
            onProjectClick={handleProjectClickById}
            onViewAllWorks={handleViewAllWorksFromTimeline}
          />
        </>
      )}

      {currentPage === 'work' && (
        <WorkPage 
          projects={WORK_PROJECTS}
          onProjectClick={handleProjectClick}
          onReturnToTimeline={workReturnTarget === 'timeline' ? handleReturnToTimeline : undefined}
          onAgentBack={agentReturnTarget === 'archive' ? undefined : handleAgentBack}
          agentBackLabel={agentBackLabel}
          onViewModeChange={handleWorkViewModeChange}
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
    </Layout>

    {/* Walk Through — rendered outside Layout to avoid z-index stacking context */}
    <AnimatePresence>
      {isWalkThroughOpen && (
        <WalkThrough
          onClose={() => setIsWalkThroughOpen(false)}
          onExploreWork={() => {
            setIsWalkThroughOpen(false);
            setAgentReturnTarget(currentPage === 'profile' ? 'profile' : 'home');
            setWorkViewMode('agent');
            setCurrentPage('work');
          }}
          onOpenResume={() => {
            setIsWalkThroughOpen(false);
            setAgentReturnTarget('home');
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

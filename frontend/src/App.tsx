import { useEffect, useMemo, useRef } from 'react';
import { ProjectsPage } from '~/pages/projects';
import { PAGES, usePageStore } from '~/stores/pageStore';
import { CommandsPage } from '~/pages/commands';
import { SettingsPage } from '~/pages/settings';
import { Navbar } from '~/components/navbar';
import { AddProjectPage } from './pages/add-project';

function App() {
  const { currentPage } = usePageStore();
  const currentPageRef = useRef<HTMLDivElement | null>(null);

  const CurrentPage = useMemo(() => {
    switch (currentPage) {
      case PAGES[0]:
        return ProjectsPage;
      case PAGES[1]:
        return CommandsPage;
      case PAGES[2]:
        return SettingsPage;
      case PAGES[3]:
        return AddProjectPage;
    }
  }, [currentPage]);

  // Scroll to top when changing pages
  useEffect(() => {
    if (currentPageRef.current) {
      currentPageRef.current.scrollTop = 0;
    }
  }, [currentPage]);

  return (
    <div id="App" className="flex flex-col h-screen text-white bg-background font-azeret">
      <Navbar />

      <div className="p-4 overflow-scroll" ref={currentPageRef}>
        <CurrentPage />
      </div>
    </div>
  );
}

export default App;

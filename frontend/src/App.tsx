import { useMemo } from 'react';
import { ProjectsPage } from '~/pages/projects';
import { PAGES, usePageStore } from '~/stores/pageStore';
import { CommandsPage } from '~/pages/commands';
import { SettingsPage } from '~/pages/settings';
import { Navbar } from '~/components/navbar';

function App() {
  const { currentPage } = usePageStore();

  const CurrentPage = useMemo(() => {
    switch (currentPage) {
      case PAGES[0]:
        return ProjectsPage;
      case PAGES[1]:
        return CommandsPage;
      case PAGES[2]:
        return SettingsPage;
    }
  }, [currentPage]);

  return (
    <div id="App" className="flex flex-col h-screen text-white bg-background font-azeret">
      <Navbar />

      <div className="p-4 overflow-scroll">
        <CurrentPage />
      </div>
    </div>
  );
}

export default App;

import { useMemo } from 'react';
import { create } from 'zustand';
import { AddCommandPage } from '~/pages/add-command';
import { AddProjectPage } from '~/pages/add-project';
import { CommandsPage } from '~/pages/commands';
import { ProjectsPage } from '~/pages/projects';
import { SettingsPage } from '~/pages/settings';

export enum Page {
  Projects = 'Projects',
  Commands = 'Commands',
  Settings = 'Settings',
  AddProject = 'AddProject',
  AddCommand = 'AddCommand',
}

export const defaultPage = Page.Projects;

export const NAV_PAGES = [Page.Projects, Page.Commands, Page.Settings] as const;
export const PAGES = [...NAV_PAGES, Page.AddProject, Page.AddCommand] as const;

interface PageState {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  getPageComponent: (currentPage: Page) => () => JSX.Element;
}

export const usePageStore = create<PageState>((set, get) => ({
  currentPage: defaultPage,
  setCurrentPage: (page) => set(() => ({ currentPage: page })),
  getPageComponent: (currentPage) => {
    switch (currentPage) {
      case Page.Projects:
        return ProjectsPage;
      case Page.Commands:
        return CommandsPage;
      case Page.Settings:
        return SettingsPage;
      case Page.AddProject:
        return AddProjectPage;
      case Page.AddCommand:
        return AddCommandPage;
    }
  },
}));

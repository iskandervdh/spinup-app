import { create } from 'zustand';

export const NAV_PAGES = ['Projects', 'Commands', 'Settings'] as const;
export const PAGES = [...NAV_PAGES, 'AddProject'] as const;
export type Page = (typeof PAGES)[number];

interface PageState {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

export const usePageStore = create<PageState>((set) => ({
  currentPage: PAGES[0],
  setCurrentPage: (page) => set(() => ({ currentPage: page })),
}));

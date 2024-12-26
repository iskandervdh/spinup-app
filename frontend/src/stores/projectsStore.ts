import { create } from 'zustand';
import { Projects } from '../types';
import { RunProject, StopProject } from 'wjs/go/app/App';

interface ProjectsState {
  projects: Projects | null;
  setProjects: (projects: Projects) => void;

  runningProjects: string[];
  runProject: (project: string) => Promise<void>;
  stopProject: (project: string) => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: null,
  setProjects: (projects: Projects) => set(() => ({ projects })),

  runningProjects: [],
  async runProject(project: string) {
    set((state) => ({ runningProjects: [...state.runningProjects, project] }));

    await RunProject(project);
  },
  async stopProject(project: string) {
    set((state) => ({ runningProjects: state.runningProjects.filter((p) => p !== project) }));

    await StopProject(project);
  },
}));

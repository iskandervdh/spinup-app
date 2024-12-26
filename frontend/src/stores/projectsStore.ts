import { create } from 'zustand';
import { Projects } from '../types';
import { GetProjects, RunProject, SelectProjectDirectory, StopProject } from 'wjs/go/app/App';

interface ProjectsState {
  projects: Projects | null;
  setProjects: (projects: Projects) => void;

  runningProjects: string[];
  runProject: (project: string) => Promise<void>;
  stopProject: (project: string) => Promise<void>;
  selectProjectDir: (project: string) => Promise<void>;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: null,
  setProjects: (projects) => set(() => ({ projects })),

  runningProjects: [],
  async runProject(projectName) {
    set((state) => ({ runningProjects: [...state.runningProjects, projectName] }));

    await RunProject(projectName);
  },
  async stopProject(projectName) {
    set((state) => ({ runningProjects: state.runningProjects.filter((p) => p !== projectName) }));

    await StopProject(projectName);
  },
  async selectProjectDir(projectName) {
    await SelectProjectDirectory(projectName);

    const projects = await GetProjects();
    set(() => ({ projects }));
  },
}));

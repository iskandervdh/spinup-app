import { create } from 'zustand';
import { Projects } from '../types';
import {
  GetProjects,
  RunProject,
  SelectProjectDirectory,
  StopProject,
  AddProject,
  RemoveProject,
} from 'wjs/go/app/App';

interface ProjectsState {
  projects: Projects | null;
  setProjects: (projects: Projects) => void;

  runningProjects: string[];
  runProject: (projectName: string) => Promise<void>;
  stopProject: (projectName: string) => Promise<void>;
  selectProjectDir: (projectName: string) => Promise<void>;
  addProject: (projectName: string, domain: string, port: number, commandNames: string[]) => Promise<void>;
  removeProject: (projectName: string) => Promise<void>;

  currentProject: string | null;
  setCurrentProject: (projectName: string | null) => void;
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
  async addProject(projectName, domain, port, commandNames) {
    await AddProject(projectName, domain, port, commandNames);

    const projects = await GetProjects();
    set(() => ({ projects }));
  },
  async removeProject(projectName) {
    await RemoveProject(projectName);

    const projects = await GetProjects();
    set(() => ({ projects }));
  },

  currentProject: null,
  setCurrentProject: (projectName) => set(() => ({ currentProject: projectName })),
}));

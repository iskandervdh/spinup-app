import { create } from 'zustand';
import { Commands } from '../types';

interface CommandsState {
  commands: Commands | null;
  setCommands: (commands: Commands) => void;
}

export const useCommandsStore = create<CommandsState>((set) => ({
  commands: null,
  setCommands: (projects) => set(() => ({ commands: projects })),
}));

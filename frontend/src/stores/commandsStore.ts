import { create } from 'zustand';
import { Commands } from '../types';
import { AddCommand, GetCommands, RemoveCommand } from 'wjs/go/app/App';

interface CommandsState {
  commands: Commands | null;
  setCommands: (commands: Commands) => void;

  addCommand: (commandName: string, command: string) => Promise<void>;
  removeCommand: (commandName: string) => Promise<void>;
}

export const useCommandsStore = create<CommandsState>((set) => ({
  commands: null,
  setCommands: (projects) => set(() => ({ commands: projects })),

  addCommand: async (commandName, command) => {
    await AddCommand(commandName, command);

    const commands = await GetCommands();
    set(() => ({ commands }));
  },
  removeCommand: async (commandName) => {
    await RemoveCommand(commandName);

    const commands = await GetCommands();
    set(() => ({ commands }));
  },
}));

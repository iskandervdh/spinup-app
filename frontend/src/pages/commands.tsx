import { useCallback, useEffect } from 'react';
import { PageTitle } from '../components/page-title';
import { GetCommands } from '../../wailsjs/go/app/App';
import { useCommandsStore } from '~/stores/commandsStore';
import { Button } from '~/components/button';
import { ArrowPathIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Page, usePageStore } from '~/stores/pageStore';

function CommandInfo({ name, command }: { name: string; command: string }) {
  const { setCurrentPage } = usePageStore();
  const { removeCommand, setEditingCommand } = useCommandsStore();

  const edit = useCallback(() => {
    setEditingCommand(name);
    setCurrentPage(Page.CommandForm);
  }, [name, setEditingCommand, setCurrentPage]);

  const remove = useCallback(() => {
    if (confirm(`Are you sure you want to remove command "${name}"?`)) {
      removeCommand(name);
    }
  }, [name, removeCommand]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h3 className="pr-2 text-xl font-bold text-primary">{name}</h3>

        <Button onClick={edit} size={'xs'} title={`Change project directory for ${name}`}>
          <PencilSquareIcon width={16} height={16} className="text-current" />
        </Button>

        <Button onClick={remove} size={'icon'} variant={'error'} title={`Remove project ${name}`}>
          <TrashIcon width={16} height={16} className="text-current" />
        </Button>
      </div>

      <div className="grid grid-cols-[16rem,auto]">
        <div>Command</div>
        <div className="text-sm">{command}</div>
      </div>
    </div>
  );
}

export function CommandsPage() {
  const { setCurrentPage } = usePageStore();
  const { commands, setCommands, setEditingCommand } = useCommandsStore();

  useEffect(() => {
    GetCommands().then(setCommands);
  }, []);

  return (
    <div id="commands">
      <div className="flex items-center gap-4 pb-4">
        <PageTitle>Commands</PageTitle>

        <div className="flex gap-2">
          <Button onClick={() => GetCommands().then(setCommands)} size={'icon-lg'} title="Refresh projects">
            <ArrowPathIcon width={24} height={24} className="text-current" />
          </Button>

          <Button
            onClick={() => {
              setEditingCommand(null);
              setCurrentPage(Page.CommandForm);
            }}
            size={'icon-lg'}
            variant={'success'}
            title="Add command"
          >
            <PlusIcon width={24} height={24} className="text-current" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {commands ? (
          Object.entries(commands).map(([name, command]) => <CommandInfo key={name} name={name} command={command} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

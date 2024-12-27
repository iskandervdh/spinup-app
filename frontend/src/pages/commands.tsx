import { useCallback, useEffect } from 'react';
import { PageTitle } from '../components/page-title';
import { GetCommands } from '../../wailsjs/go/app/App';
import { useCommandsStore } from '~/stores/commandsStore';
import { Button } from '~/components/button';
import { ArrowPathIcon, PlusIcon, TrashIcon } from '@heroicons/react/20/solid';
import { Page, usePageStore } from '~/stores/pageStore';

export function CommandsPage() {
  const { setCurrentPage } = usePageStore();
  const { commands, setCommands, removeCommand } = useCommandsStore();

  useEffect(() => {
    GetCommands().then(setCommands);
  }, []);

  const remove = useCallback((name: string) => {
    if (confirm(`Are you sure you want to remove command "${name}"?`)) {
      removeCommand(name);
    }
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
            onClick={() => setCurrentPage(Page.AddCommand)}
            size={'icon-lg'}
            variant={'success'}
            title="Add project"
          >
            <PlusIcon width={24} height={24} className="text-current" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {commands ? (
          Object.entries(commands).map(([name, command]) => (
            <div key={name} className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <h3 className="pr-2 text-xl font-bold text-primary">{name}</h3>

                <Button onClick={() => remove(name)} size={'icon'} variant={'error'} title={`Remove project ${name}`}>
                  <TrashIcon width={16} height={16} className="text-current" />
                </Button>
              </div>

              <div className="grid grid-cols-[16rem,auto]">
                <div>Command</div>
                <div className="text-sm">{command}</div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

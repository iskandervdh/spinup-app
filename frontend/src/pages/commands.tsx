import { useEffect } from 'react';
import { PageTitle } from '../components/page-title';
import { GetCommands } from '../../wailsjs/go/app/App';
import { useCommandsStore } from '~/stores/commandsStore';

export function CommandsPage() {
  const { commands, setCommands } = useCommandsStore();

  useEffect(() => {
    GetCommands().then(setCommands);
  }, []);

  return (
    <div id="commands">
      <div className="pb-4">
        <PageTitle>Commands</PageTitle>
      </div>

      <div className="flex flex-col gap-4">
        {commands ? (
          Object.entries(commands).map(([name, command]) => (
            <div key={name}>
              <div className="flex items-center gap-4 mb-2">
                <h3 className="text-xl font-bold text-primary">{name}</h3>
              </div>

              <div className="grid grid-cols-2">
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

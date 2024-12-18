import { useEffect, useState } from 'react';
import { PageTitle } from '../components/page-title';
import { GetCommands } from '../../wailsjs/go/main/App';
import { Commands } from '../types';

export function CommandsPage() {
  const [commands, setProjects] = useState<Commands | null>(null);

  useEffect(() => {
    GetCommands().then(setProjects);
  }, []);

  return (
    <div id="commands">
      <PageTitle>Commands</PageTitle>

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

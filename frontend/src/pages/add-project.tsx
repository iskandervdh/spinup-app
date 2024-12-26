import { useCallback, useEffect, useState } from 'react';
import { Input } from '~/components/input';
import { PageTitle } from '~/components/page-title';
import { Select } from '~/components/select';
import { useCommandsStore } from '~/stores/commandsStore';
import { useProjectsStore } from '~/stores/projectsStore';
import { GetCommands } from 'wjs/go/app/App';

export function AddProjectPage() {
  const { commands, setCommands } = useCommandsStore();
  const { addProject } = useProjectsStore();

  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [port, setPort] = useState(3000);
  const [commandNames, setCommandNames] = useState<string[]>([]);

  const submit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await addProject(name, domain, port, commandNames);
    },
    [name, domain, port, commandNames, addProject]
  );

  useEffect(() => {
    GetCommands().then(setCommands);
  }, []);

  return (
    <form onSubmit={submit} className="flex flex-col gap-4">
      <div>
        <PageTitle>Add Project</PageTitle>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="name">Name</label>
        <Input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="domain">Domain</label>
        <Input id="domain" name="domain" type="text" value={domain} onChange={(e) => setDomain(e.target.value)} />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="port">Port</label>
        <Input
          id="port"
          name="port"
          type="number"
          min={1}
          max={65536}
          value={port}
          onChange={(e) => setPort(parseInt(e.target.value))}
        />
      </div>

      <Select
        multiple
        value={commandNames}
        onChange={(e) => setCommandNames(Array.from(e.target.selectedOptions).map((o) => o.value))}
      >
        {commands &&
          Object.keys(commands).map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
      </Select>

      <button type="submit">Add Project</button>
    </form>
  );
}

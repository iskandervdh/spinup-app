import { useCallback, useEffect, useMemo, useState } from 'react';
import { Input } from '~/components/input';
import { PageTitle } from '~/components/page-title';
import { Select } from '~/components/select';
import { useCommandsStore } from '~/stores/commandsStore';
import { useProjectsStore } from '~/stores/projectsStore';
import { GetCommands } from 'wjs/go/app/App';
import { Button } from '~/components/button';
import { Page, usePageStore } from '~/stores/pageStore';
import { SelectMultiple } from '~/components/select-multiple';

export function ProjectFormPage() {
  const { commands, setCommands } = useCommandsStore();
  const { projects, projectFormSubmit, editingProject, setEditingProject } = useProjectsStore();
  const { setCurrentPage } = usePageStore();

  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [port, setPort] = useState(3000);
  const [commandNames, setCommandNames] = useState<string[]>([]);

  const pageTitle = useMemo(
    () => (editingProject ? `Edit Project "${editingProject}"` : 'Add Project'),
    [editingProject]
  );

  const submitText = useMemo(() => (editingProject ? 'Save Project' : 'Add Project'), [editingProject]);

  const submit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      try {
        await projectFormSubmit(name, domain, port, commandNames);
        setCurrentPage(Page.Projects);
      } catch (e) {
        // TODO: Show error toast
        console.error(e);
      }
    },
    [name, domain, port, commandNames, projectFormSubmit]
  );

  useEffect(() => {
    GetCommands().then(setCommands);
  }, []);

  useEffect(() => {
    if (editingProject) {
      const project = projects?.[editingProject];

      if (project) {
        setName(editingProject);
        setDomain(project.domain);
        setPort(project.port);
        setCommandNames(project.commands);
      }
    }
  }, [editingProject, setName, setDomain, setPort, setCommandNames]);

  return (
    <form onSubmit={submit} className="flex flex-col w-full max-w-2xl">
      <div className="flex items-center pb-4 h-14">
        <PageTitle>{pageTitle}</PageTitle>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="w-min">
            Name
          </label>
          <Input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="domain" className="w-min">
            Domain
          </label>
          <Input id="domain" name="domain" type="text" value={domain} onChange={(e) => setDomain(e.target.value)} />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="port" className="w-min">
            Port
          </label>
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

        <div className="flex flex-col gap-2">
          <label className="w-min">Commands</label>
          <SelectMultiple
            id="commands"
            name="commands"
            options={commands ? Object.keys(commands) : []}
            value={commandNames}
            onChanged={setCommandNames}
          />
        </div>

        <Button type="submit" className="mt-2">
          {submitText}
        </Button>
      </div>
    </form>
  );
}

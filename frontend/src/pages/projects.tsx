import { PlayIcon, StopIcon } from '@heroicons/react/20/solid';
import { GetProjects } from '../../wailsjs/go/app/App';
import { useCallback, useEffect, useMemo } from 'react';
import { PageTitle } from '../components/page-title';
import { useProjectsStore } from '../stores/projectsStore';
import { Project } from '~/types';

import { BrowserOpenURL } from 'wjs/runtime/runtime';

function ProjectInfo({ name, project }: { name: string; project: Project }) {
  const { runningProjects, runProject, stopProject } = useProjectsStore();

  const isRunning = useMemo(() => runningProjects.includes(name), [runningProjects]);

  const commands = useMemo(() => project.commands.join(', '), [project.commands]);

  const variables = useMemo(() => {
    return Object.entries(project.variables)
      .map(([key, value]) => `${key}=${value}`)
      .join(', ');
  }, [project.variables]);

  const domainAliases = useMemo(() => project.domainAliases.join(', '), [project.domainAliases]);

  const openProjectInBrowser = useCallback(() => {
    BrowserOpenURL(`http://${project.domain}`);
  }, [project.domain]);

  const startOrStopProject = useCallback(async () => {
    if (isRunning) {
      await stopProject(name);
    } else {
      await runProject(name);
    }
  }, [isRunning]);

  return (
    <div key={name}>
      <div className="flex items-center gap-2 mb-2">
        <button
          className="p-2 rounded-lg hover:bg-black/10 disabled:cursor-not-allowed"
          onClick={startOrStopProject}
          disabled={project.dir ? undefined : true}
        >
          {isRunning ? (
            <StopIcon width={20} height={20} className="text-red-400" />
          ) : (
            <PlayIcon width={20} height={20} className="text-green-400" />
          )}
        </button>

        <h3 className="text-xl font-bold text-primary">{name}</h3>
      </div>

      <div className="grid max-w-6xl grid-cols-2">
        <div>Domain</div>

        {isRunning ? (
          <div
            onClick={openProjectInBrowser}
            className="text-sm underline cursor-pointer text-info hover:text-info-dark"
          >
            {project.domain}
          </div>
        ) : (
          <div className="text-sm">{project.domain}</div>
        )}

        <div>Port</div>
        <div className="text-sm">{project.port}</div>

        <div>Commands</div>
        {commands !== '' ? <div className="text-sm">{commands}</div> : <div className="text-sm text-error">-</div>}

        <div>Directory</div>
        <div className="text-sm">{project.dir ?? '-'}</div>

        <div>Variables</div>
        <div className="text-sm">{variables || '-'}</div>

        <div>Domain aliases</div>
        <div className="text-sm">{domainAliases || '-'}</div>
      </div>
    </div>
  );
}

export function ProjectsPage() {
  const { projects, setProjects } = useProjectsStore();

  useEffect(() => {
    GetProjects().then(setProjects);
  }, []);

  return (
    <div id="projects">
      <PageTitle>Projects</PageTitle>

      <div className="flex flex-col gap-4">
        {projects ? (
          Object.entries(projects).map(([name, project]) => <ProjectInfo key={name} name={name} project={project} />)
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}

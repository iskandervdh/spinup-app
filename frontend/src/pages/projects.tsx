import { PlayIcon, StopIcon } from '@heroicons/react/20/solid';
import { GetProjects } from '../../wailsjs/go/main/App';
import { useCallback, useEffect, useMemo } from 'react';
import { PageTitle } from '../components/page-title';
import { useProjectsStore } from '../stores/projectsStore';
import { Project } from '~/types';

function ProjectInfo({ name, project }: { name: string; project: Project }) {
  const { runningProjects, runProject, stopProject } = useProjectsStore();

  const isRunning = useMemo(() => runningProjects.includes(name), [runningProjects]);

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
        <button className="p-2 rounded-lg hover:bg-black/10" onClick={startOrStopProject}>
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
        <div className="text-sm">{project.domain}</div>

        <div>Port</div>
        <div className="text-sm">{project.port}</div>

        <div>Commands</div>
        <div className="text-sm">{project.commands.join(', ')}</div>

        <div>Directory</div>
        <div className="text-sm">{project.dir ?? 'No directory specified'}</div>

        <div>Variables</div>
        <div className="text-sm">{JSON.stringify(project.variables)}</div>
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

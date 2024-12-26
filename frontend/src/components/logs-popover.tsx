import { XMarkIcon } from '@heroicons/react/20/solid';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useProjectsStore } from '~/stores/projectsStore';
import { GetProjectLogs } from 'wjs/go/app/App';
import AnsiToHtml from 'ansi-to-html';

export function LogsPopover() {
  const ansiToHtml = new AnsiToHtml();

  const { currentProject, setCurrentProject } = useProjectsStore();
  const [logs, setLogs] = useState('');

  const logsRef = useRef<HTMLPreElement | null>(null);

  const close = useCallback(() => {
    setCurrentProject(null);
  }, [setCurrentProject]);

  useEffect(() => {
    if (!currentProject) return;

    const interval = setInterval(() => {
      GetProjectLogs(currentProject).then((newLogs) => {
        setLogs(ansiToHtml.toHtml(newLogs));
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [currentProject]);

  if (!currentProject) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50" onClick={close}>
      <div className="absolute flex items-center justify-center w-full h-full p-8">
        <div
          className="flex flex-col w-full h-full max-h-screen p-4 rounded-lg bg-background"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between">
            <h1 className="text-xl">Logs for project {currentProject}</h1>
            <button onClick={close} className="p-2 rounded-lg hover:bg-black/10">
              <XMarkIcon width={24} height={24} />
            </button>
          </div>
          <div className="w-full h-full mt-4 overflow-scroll rounded-lg bg-black/50">
            <pre ref={logsRef} className="p-4 text-sm text-wrap" dangerouslySetInnerHTML={{ __html: logs }} />
          </div>
        </div>
      </div>
    </div>
  );
}

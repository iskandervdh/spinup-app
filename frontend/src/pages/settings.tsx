import { useEffect, useState } from 'react';
import { PageTitle } from '../components/page-title';
import { GetVersion } from 'wjs/go/app/App';
import { Select } from '~/components/select';

export function SettingsPage() {
  const [version, setVersion] = useState<string | null>(null);

  useEffect(() => {
    GetVersion().then(setVersion);
  }, []);

  return (
    <div>
      <div className="pb-4">
        <PageTitle>Settings</PageTitle>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-primary">Info</h2>

          <div className="grid items-center max-w-6xl grid-cols-2">
            <div>Action on crash (example, WIP)</div>

            <div className="w-full min-w-32 max-w-64">
              <Select id="action-on-crash" name="Action on crash">
                <option value="stop">Stop</option>
                <option value="restart">Restart</option>
              </Select>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-xl font-bold text-primary">Info</h2>

          <div className="grid max-w-6xl grid-cols-2">
            <div>Spinup version</div>
            <div>{version}</div>

            <div>Spinup app version</div>
            <div>dev</div>
          </div>
        </div>
      </div>
    </div>
  );
}

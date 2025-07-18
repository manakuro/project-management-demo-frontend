import { useRecoilCallback } from 'recoil';
import { workspaceTeammateState } from '../atom';
import type { WorkspaceTeammateResponse } from '../type';

export const useWorkspaceTeammateResponse = () => {
  const setWorkspaceTeammates = useRecoilCallback(
    ({ set }) =>
      (data: WorkspaceTeammateResponse[]) => {
        data.forEach((d) => {
          set(workspaceTeammateState(d.id), d);
        });
      },
    [],
  );

  return {
    setWorkspaceTeammates,
  };
};

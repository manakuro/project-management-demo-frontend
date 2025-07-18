import { useRecoilCallback } from 'recoil';
import { projectTeammateState } from '../atom';
import type { ProjectTeammateResponse } from '../type';

export const useProjectTeammateResponse = () => {
  const setProjectsTeammates = useRecoilCallback(
    ({ set }) =>
      (data: ProjectTeammateResponse[]) => {
        data.forEach((d) => {
          set(projectTeammateState(d.id), (prev) => ({ ...prev, ...d }));
        });
      },
    [],
  );

  return {
    setProjectsTeammates,
  };
};

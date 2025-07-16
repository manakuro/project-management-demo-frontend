import { useRecoilCallback } from 'recoil';
import { taskCollaboratorState } from '../atom';

export const useResetTaskCollaborator = () => {
  const resetTaskCollaborator = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(taskCollaboratorState(id));
      },
    [],
  );

  const resetTaskCollaborators = useRecoilCallback(
    ({ reset }) =>
      (taskTeammates: string[]) => {
        taskTeammates.forEach((id) => {
          reset(taskCollaboratorState(id));
        });
      },
    [],
  );

  return {
    resetTaskCollaborator,
    resetTaskCollaborators,
  };
};

import { useRecoilCallback } from 'recoil';
import { teammateTaskState } from '../atom';

export const useResetTeammateTask = () => {
  const resetTeammateTask = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(teammateTaskState(id));
      },
    [],
  );

  const resetTeammateTasks = useRecoilCallback(
    ({ reset }) =>
      (teammateTasks: string[]) => {
        teammateTasks.forEach((id) => {
          reset(teammateTaskState(id));
        });
      },
    [],
  );

  return {
    resetTeammateTask,
    resetTeammateTasks,
  };
};

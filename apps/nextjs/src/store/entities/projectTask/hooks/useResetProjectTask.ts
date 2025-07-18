import { useRecoilCallback } from 'recoil';
import { projectTaskState } from '../atom';

export const useResetProjectTask = () => {
  const resetProjectTask = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(projectTaskState(id));
      },
    [],
  );

  const resetProjectTasks = useRecoilCallback(
    ({ reset }) =>
      (ids: string[]) => {
        ids.forEach((id) => {
          reset(projectTaskState(id));
        });
      },
    [],
  );

  return {
    resetProjectTask,
    resetProjectTasks,
  };
};

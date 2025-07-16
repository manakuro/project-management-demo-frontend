import { useRecoilCallback } from 'recoil';
import type { Task } from 'src/store/entities/task';
import { taskState } from '../atom';

export const useResetTask = () => {
  const resetTask = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(taskState(id));
      },
    [],
  );

  const resetTasks = useRecoilCallback(
    ({ reset }) =>
      (tasks: Task[]) => {
        tasks.forEach((t) => {
          reset(taskState(t.id));
        });
      },
    [],
  );

  return {
    resetTask,
    resetTasks,
  };
};

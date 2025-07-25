import { useAtomValue } from 'jotai';
import { taskActivityTaskState } from '../atom';

export const useTaskActivityTask = (taskActivityTaskId: string) => {
  const taskActivityTask = useAtomValue(
    taskActivityTaskState(taskActivityTaskId),
  );

  return {
    taskActivityTask,
  };
};

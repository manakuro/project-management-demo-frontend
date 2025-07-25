import { useAtomValue } from 'jotai';
import { taskIdsByTaskActivityIdState } from '../atom';

export const useTaskActivityTasksTaskIds = (taskActivityId: string) => {
  const taskIds = useAtomValue(taskIdsByTaskActivityIdState(taskActivityId));

  return {
    taskIds,
  };
};

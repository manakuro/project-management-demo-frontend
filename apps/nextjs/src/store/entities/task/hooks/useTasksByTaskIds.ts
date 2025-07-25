import { useAtomValue } from 'jotai';
import { tasksByTaskIdsState } from '../atom';

export const useTasksByTaskIds = (taskIds: string[]) => {
  const tasks = useAtomValue(tasksByTaskIdsState(taskIds));

  return {
    tasks,
  };
};

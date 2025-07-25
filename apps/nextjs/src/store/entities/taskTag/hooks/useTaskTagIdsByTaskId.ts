import { useAtomValue } from 'jotai';
import { taskTagIdsByTaskIdState } from '../atom';

export const useTaskTagIdsByTaskId = (taskId: string) => {
  const taskTagIds = useAtomValue(taskTagIdsByTaskIdState(taskId));
  return {
    taskTagIds,
  };
};

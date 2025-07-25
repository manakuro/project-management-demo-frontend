import { useAtomValue } from 'jotai';
import { taskFileIdsByTaskIdState } from '../atom';

export const useTaskFileIdsByTaskId = (taskId: string) => {
  const taskFileIds = useAtomValue(taskFileIdsByTaskIdState(taskId));

  return {
    taskFileIds,
  };
};

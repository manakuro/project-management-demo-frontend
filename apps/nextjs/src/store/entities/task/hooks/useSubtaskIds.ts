import { useAtomValue } from 'jotai';
import { taskIdsByTaskParentIdState } from '../atom';

export const useSubtaskIds = (taskId: string) => {
  const taskIds = useAtomValue(taskIdsByTaskParentIdState(taskId));

  return {
    taskIds,
  };
};

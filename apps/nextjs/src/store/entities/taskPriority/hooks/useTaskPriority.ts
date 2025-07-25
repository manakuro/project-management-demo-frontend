import { useAtomValue } from 'jotai';
import { taskPriorityState } from '../atom';

export const useTaskPriority = (taskPriorityId: string) => {
  const taskPriority = useAtomValue(taskPriorityState(taskPriorityId));

  return {
    taskPriority,
  };
};

import { useRecoilValue } from 'recoil';
import { taskPriorityState } from '../atom';

export const useTaskPriority = (taskPriorityId: string) => {
  const taskPriority = useRecoilValue(taskPriorityState(taskPriorityId));

  return {
    taskPriority,
  };
};

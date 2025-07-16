import { useRecoilValue } from 'recoil';
import { taskPrioritiesState } from '../atom';

export const useTasksPriorities = () => {
  const taskPriorities = useRecoilValue(taskPrioritiesState);

  return {
    taskPriorities,
  };
};

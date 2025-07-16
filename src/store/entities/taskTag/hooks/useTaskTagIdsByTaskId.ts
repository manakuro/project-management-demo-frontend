import { useRecoilValue } from 'recoil';
import { taskTagIdsByTaskIdState } from '../atom';

export const useTaskTagIdsByTaskId = (taskId: string) => {
  const taskTagIds = useRecoilValue(taskTagIdsByTaskIdState(taskId));
  return {
    taskTagIds,
  };
};

import { useRecoilValue } from 'recoil';
import { taskActivityTaskIdsState } from '../atom';

export const useTaskActivityTaskIds = () => {
  const taskActivityTaskIds = useRecoilValue(taskActivityTaskIdsState);

  return {
    taskActivityTaskIds,
  };
};

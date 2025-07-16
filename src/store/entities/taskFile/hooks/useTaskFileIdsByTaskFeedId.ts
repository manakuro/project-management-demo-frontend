import { useRecoilValue } from 'recoil';
import { taskFileIdsByFeedIdState } from '../atom';

export const useTaskFileIdsByTaskFeedId = (taskFeedId: string) => {
  const taskFileIds = useRecoilValue(taskFileIdsByFeedIdState(taskFeedId));

  return {
    taskFileIds,
  };
};

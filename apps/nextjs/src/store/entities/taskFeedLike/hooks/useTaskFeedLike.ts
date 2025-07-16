import { useRecoilValue } from 'recoil';
import { taskFeedLikeState } from '../atom';

export const useTaskTaskFeedLike = (taskFeedLikeId: string) => {
  const taskFeedLike = useRecoilValue(taskFeedLikeState(taskFeedLikeId));

  return {
    taskFeedLike,
  };
};

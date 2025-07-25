import { useAtomValue } from 'jotai';
import { taskFeedLikeState } from '../atom';

export const useTaskTaskFeedLike = (taskFeedLikeId: string) => {
  const taskFeedLike = useAtomValue(taskFeedLikeState(taskFeedLikeId));

  return {
    taskFeedLike,
  };
};

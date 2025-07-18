import { useRecoilCallback } from 'recoil';
import { taskFeedLikeState } from '../atom';
import type { TaskFeedLike } from '../type';

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskFeedLike: TaskFeedLike) => {
        set(taskFeedLikeState(taskFeedLike.id), taskFeedLike);
      },
    [],
  );

  return {
    upsert,
  };
};

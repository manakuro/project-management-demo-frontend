import { useRecoilCallback } from 'recoil';
import { taskFeedState } from '../atom';
import type { TaskFeed } from '../type';

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskFeed: TaskFeed) => {
        set(taskFeedState(taskFeed.id), taskFeed);
      },
    [],
  );

  return {
    upsert,
  };
};

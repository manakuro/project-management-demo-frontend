import { useRecoilCallback } from 'recoil';
import { taskLikeState } from '../atom';
import type { TaskLike } from '../type';

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskLike: TaskLike) => {
        set(taskLikeState(taskLike.id), taskLike);
      },
    [],
  );

  return {
    upsert,
  };
};

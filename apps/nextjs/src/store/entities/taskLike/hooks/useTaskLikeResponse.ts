import { useRecoilCallback } from 'recoil';
import { taskLikeState } from '../atom';
import type { TaskLikeResponse } from '../type';

export const useTaskLikeResponse = () => {
  const setTaskLikes = useRecoilCallback(
    ({ set }) =>
      (data: TaskLikeResponse[]) => {
        data.forEach((d) => {
          set(taskLikeState(d.id), d);
        });
      },
    [],
  );

  return {
    setTaskLikes,
  };
};

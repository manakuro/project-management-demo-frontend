import { useRecoilCallback } from 'recoil';
import { taskLikeState } from '../atom';

export const useResetTaskLike = () => {
  const resetTaskLike = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(taskLikeState(id));
      },
    [],
  );

  const resetTaskLikes = useRecoilCallback(
    ({ reset }) =>
      (taskLikes: string[]) => {
        taskLikes.forEach((id) => {
          reset(taskLikeState(id));
        });
      },
    [],
  );

  return {
    resetTaskLike,
    resetTaskLikes,
  };
};

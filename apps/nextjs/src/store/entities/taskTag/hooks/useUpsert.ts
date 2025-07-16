import { useRecoilCallback } from 'recoil';
import { taskTagState } from '../atom';
import type { TaskTag } from '../type';

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskTag: TaskTag) => {
        set(taskTagState(taskTag.id), (prev) => {
          return {
            ...prev,
            ...taskTag,
          };
        });
      },
    [],
  );

  return {
    upsert,
  };
};

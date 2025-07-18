import { useRecoilCallback } from 'recoil';
import { taskFileState } from '../atom';
import type { TaskFile } from '../type';

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskFile: TaskFile) => {
        set(taskFileState(taskFile.id), taskFile);
      },
    [],
  );

  return {
    upsert,
  };
};

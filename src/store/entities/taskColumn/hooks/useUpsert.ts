import { useRecoilCallback } from 'recoil';
import { taskColumnState } from '../atom';
import type { TaskColumn } from '../type';

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskColumn: TaskColumn) => {
        set(taskColumnState(taskColumn.id), taskColumn);
      },
    [],
  );

  return {
    upsert,
  };
};

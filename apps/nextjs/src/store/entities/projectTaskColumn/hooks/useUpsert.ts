import { useRecoilCallback } from 'recoil';
import { projectTaskColumnState } from '../atom';
import type { ProjectTaskColumn } from '../type';

export const UseUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskColumn: Partial<ProjectTaskColumn> & { id: string }) => {
        set(projectTaskColumnState(taskColumn.id), (prev) => {
          return {
            ...prev,
            ...taskColumn,
          };
        });
      },
    [],
  );

  return {
    upsert,
  };
};

import { useRecoilCallback } from 'recoil';
import { projectTaskColumnState } from '../atom';
import type { ProjectTaskColumn } from '../type';
import { UseUpsert } from './useUpsert';

export const useProjectTaskColumnCommand = () => {
  const { upsert } = UseUpsert();

  const setProjectsTaskColumn = useRecoilCallback(
    ({ snapshot }) =>
      async (input: Partial<ProjectTaskColumn> & { id: string }) => {
        const prev = await snapshot.getPromise(
          projectTaskColumnState(input.id),
        );
        upsert({ ...prev, ...input });
      },
    [upsert],
  );

  const setProjectTaskColumnOrder = useRecoilCallback(
    () => (ids: string[]) => {
      ids.forEach((id, index) => {
        upsert({
          id,
          order: index,
        });
      });
    },
    [upsert],
  );

  return {
    upsert,
    setProjectsTaskColumn,
    setProjectTaskColumnOrder,
  };
};

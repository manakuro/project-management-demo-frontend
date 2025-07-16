import { useRecoilCallback } from 'recoil';
import { teammateTaskColumnState } from '../atom';

export const useResetTeammateTaskColumn = () => {
  const resetTeammateTaskColumn = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(teammateTaskColumnState(id));
      },
    [],
  );

  const resetTeammateTaskColumns = useRecoilCallback(
    ({ reset }) =>
      (teammateTaskColumns: string[]) => {
        teammateTaskColumns.forEach((id) => {
          reset(teammateTaskColumnState(id));
        });
      },
    [],
  );

  return {
    resetTeammateTaskColumn,
    resetTeammateTaskColumns,
  };
};

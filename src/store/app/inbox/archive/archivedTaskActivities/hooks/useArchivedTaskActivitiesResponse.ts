import { useRecoilCallback } from 'recoil';
import { archivedTaskActivityState } from '../atom';
import type { ArchivedTaskActivityResponse } from '../type';

export const useArchivedTaskActivitiesResponse = () => {
  const setArchivedTaskActivities = useRecoilCallback(
    ({ set }) =>
      (data: ArchivedTaskActivityResponse[]) => {
        data.forEach((d) => {
          set(archivedTaskActivityState(d.id), d);
        });
      },
    [],
  );

  return {
    setArchivedTaskActivities,
  };
};

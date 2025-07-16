import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { teammateIdsState, teammatesState } from '../atom';

export const useTeammates = () => {
  const teammateIds = useRecoilValue(teammateIdsState);
  const teammates = useRecoilValue(teammatesState);

  const getTeammatesById = useCallback(
    (teammateIds: string[]) => {
      return teammates.filter((t) => teammateIds.includes(t.id));
    },
    [teammates],
  );

  return {
    teammateIds,
    teammates,
    getTeammatesById,
  };
};

import { useRecoilCallback } from 'recoil';
import { teammateState } from '../atom';
import type { Teammate } from '../type';

export const useTeammateResponse = () => {
  const setTeammates = useRecoilCallback(
    ({ set }) =>
      (teammates: Teammate[]) => {
        teammates.forEach((t) => {
          set(teammateState(t.id), (prev) => {
            return {
              ...prev,
              ...t,
            };
          });
        });
      },
    [],
  );

  return {
    setTeammates,
  };
};

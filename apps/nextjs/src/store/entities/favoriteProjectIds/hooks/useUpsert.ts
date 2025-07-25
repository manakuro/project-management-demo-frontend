import { useRecoilCallback } from 'recoil';
import { favoriteProjectIdsState } from '../atom';
import type { FavoriteProjectId } from '../type';

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (favoriteProjectId: FavoriteProjectId[]) => {
        set(favoriteProjectIdsState, favoriteProjectId);
      },
    [],
  );

  return {
    upsert,
  };
};

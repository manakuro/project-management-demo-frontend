import { useRecoilCallback } from 'recoil';
import { favoriteWorkspaceIdsState } from '../atom';
import type { FavoriteWorkspaceId } from '../type';

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (favoriteWorkspaceId: FavoriteWorkspaceId[]) => {
        set(favoriteWorkspaceIdsState, favoriteWorkspaceId);
      },
    [],
  );

  return {
    upsert,
  };
};

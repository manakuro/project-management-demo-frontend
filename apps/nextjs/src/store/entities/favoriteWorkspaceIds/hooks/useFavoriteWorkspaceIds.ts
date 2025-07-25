import { useCallback } from 'react';
import { useAtomValue } from 'jotai';
import { favoriteWorkspaceIdsState } from '../atom';

export const useFavoriteWorkspaceIds = () => {
  const ids = useAtomValue(favoriteWorkspaceIdsState);

  const isFavorite = useCallback(
    (id: string) => ids.some((i) => i === id),
    [ids],
  );

  return {
    favoriteWorkspaceIds: ids,
    isFavorite,
  };
};

import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';
import { favoriteProjectIdsState } from '../atom';

export const useFavoriteProjectIds = () => {
  const ids = useRecoilValue(favoriteProjectIdsState);

  const isFavorite = useCallback(
    (id: string) => ids.some((i) => i === id),
    [ids],
  );

  return {
    favoriteProjectIds: ids,
    isFavorite,
  };
};

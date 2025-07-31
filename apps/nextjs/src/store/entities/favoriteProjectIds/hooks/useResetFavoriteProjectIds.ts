import { useAtomCallback } from 'jotai/utils';
import { RESET } from 'jotai/utils';
import { useCallback } from 'react';
import { favoriteProjectIdsState } from '../atom';

export const useResetFavoriteProjectIds = () => {
  const resetFavoriteProjectIds = useAtomCallback(
    useCallback((_get, set) => {
      set(favoriteProjectIdsState, RESET);
    }, []),
  );

  return {
    resetFavoriteProjectIds,
  };
};

import { useRecoilCallback } from 'recoil';
import { favoriteProjectIdsState } from '../atom';

export const useResetFavoriteProjectIds = () => {
  const resetFavoriteProjectIds = useRecoilCallback(
    ({ reset }) =>
      () => {
        reset(favoriteProjectIdsState);
      },
    [],
  );

  return {
    resetFavoriteProjectIds,
  };
};

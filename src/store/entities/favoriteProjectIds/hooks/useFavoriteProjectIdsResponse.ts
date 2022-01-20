import { useRecoilCallback } from 'recoil'
import { FavoriteProjectId } from '../type'
import { useFavoriteProjectIdsCommand } from './useFavoriteProjectIdsCommand'

export const useFavoriteProjectIdsResponse = () => {
  const { upsert } = useFavoriteProjectIdsCommand()

  const setFavoriteProjectIds = useRecoilCallback(
    () => (favoriteProjectIds: FavoriteProjectId[]) => {
      upsert(favoriteProjectIds)
    },
    [upsert],
  )

  return {
    setFavoriteProjectIds,
  }
}

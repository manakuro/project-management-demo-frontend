import { useRecoilCallback } from 'recoil'
import { FavoriteProjectId } from '../type'
import { useUpsert } from './useUpsert'

export const useFavoriteProjectIdsResponse = () => {
  const { upsert } = useUpsert()

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

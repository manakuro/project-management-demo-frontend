import { useRecoilCallback } from 'recoil'
import type { FavoriteProjectId } from '../type'
import { useUpsert } from './useUpsert'

export const useFavoriteProjectIdsResponse = () => {
  const { upsert } = useUpsert()

  const setFavoriteProjectIds = useRecoilCallback(
    () => (input: FavoriteProjectId[]) => {
      upsert(input)
    },
    [upsert],
  )

  return {
    setFavoriteProjectIds,
  }
}

import { useRecoilCallback } from 'recoil'
import type { FavoriteWorkspaceId } from '../type'
import { useUpsert } from './useUpsert'

export const useFavoriteWorkspaceIdsResponse = () => {
  const { upsert } = useUpsert()

  const setFavoriteWorkspaceIds = useRecoilCallback(
    () => (input: FavoriteWorkspaceId[]) => {
      upsert(input)
    },
    [upsert],
  )

  return {
    setFavoriteWorkspaceIds,
  }
}

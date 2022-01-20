import { useRecoilCallback } from 'recoil'
import { FavoriteWorkspaceId } from '../type'
import { useFavoriteWorkspaceIdsCommand } from './useFavoriteWorkspaceIdsCommand'

export const useFavoriteWorkspaceIdsResponse = () => {
  const { upsert } = useFavoriteWorkspaceIdsCommand()

  const setFavoriteWorkspaceIds = useRecoilCallback(
    () => (favoriteWorkspaceIds: FavoriteWorkspaceId[]) => {
      upsert(favoriteWorkspaceIds)
    },
    [upsert],
  )

  return {
    setFavoriteWorkspaceIds,
  }
}

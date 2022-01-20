import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { favoriteWorkspaceIdsState } from '../atom'

export const useFavoriteWorkspaceIds = () => {
  const ids = useRecoilValue(favoriteWorkspaceIdsState)

  const isFavorite = useCallback(
    (id: string) => ids.some((i) => i === id),
    [ids],
  )

  return {
    favoriteWorkspaceIds: ids,
    isFavorite,
  }
}

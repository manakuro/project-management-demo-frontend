import { useCallback } from 'react'
import { useRecoilState } from 'recoil'
import { uniq } from 'src/shared/utils'
import { favoriteWorkspaceIdsState } from '../atom'
import { FavoriteWorkspace } from '../type'

export const useFavoriteWorkspaceIds = () => {
  const [ids, setIds] = useRecoilState(favoriteWorkspaceIdsState)

  const setFavoriteWorkspaceIds = useCallback(
    (favoriteWorkspaces: FavoriteWorkspace[]) => {
      setIds(favoriteWorkspaces.map((f) => f.id))
    },
    [setIds],
  )

  const isFavorite = useCallback(
    (id: string) => ids.some((i) => i === id),
    [ids],
  )

  const setFavoriteWorkspaceId = useCallback(
    (id: string) => {
      setIds((s) => {
        return uniq(isFavorite(id) ? s.filter((s) => s !== id) : [...s, id])
      })
    },
    [isFavorite, setIds],
  )

  return {
    favoriteWorkspaceIds: ids,
    setFavoriteWorkspaceIds,
    setFavoriteWorkspaceId,
    isFavorite,
  }
}

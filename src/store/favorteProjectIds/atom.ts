import { atom, useRecoilState } from 'recoil'
import { useCallback } from 'react'
import { uniq } from 'src/shared/utils'
import { FavoriteProject } from './type'

export const favoriteProjectIdsState = atom<string[]>({
  key: 'favoriteProjectIdsState',
  default: [],
})

export const useFavoriteProjectIds = () => {
  const [ids, setIds] = useRecoilState(favoriteProjectIdsState)

  const setFavoriteProjectIds = useCallback(
    (favoriteProjects: FavoriteProject[]) => {
      setIds(favoriteProjects.map((f) => f.id))
    },
    [setIds],
  )

  const isFavorite = useCallback(
    (id: string) => ids.some((i) => i === id),
    [ids],
  )

  const setFavoriteProjectId = useCallback(
    (id: string) => {
      setIds((s) => {
        return uniq(isFavorite(id) ? s.filter((s) => s !== id) : [...s, id])
      })
    },
    [isFavorite, setIds],
  )

  return {
    favoriteProjectIds: ids,
    setFavoriteProjectIds,
    setFavoriteProjectId,
    isFavorite,
  }
}

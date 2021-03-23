import { atom, useRecoilState } from 'recoil'
import { useCallback } from 'react'
import { uniq } from 'src/shared/utils'

export const favoriteProjectIdsState = atom<string[]>({
  key: 'favoriteProjectIdsState',
  default: [],
})

export const useFavoriteProjectIds = () => {
  const [ids, setIds] = useRecoilState(favoriteProjectIdsState)

  const setFavoriteProjectIds = useCallback(
    (favoriteProjects: any[]) => {
      setIds(favoriteProjects.map((f) => f.id))
    },
    [setIds],
  )

  const setFavoriteProjectId = useCallback(
    (id: string) => {
      setIds((s) => uniq([...s, id]))
    },
    [setIds],
  )

  return {
    favoriteProjectIds: ids,
    setFavoriteProjectIds,
    setFavoriteProjectId,
  }
}

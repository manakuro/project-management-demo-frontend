import { useEffect } from 'react'
import {
  useFavoriteProjectIds,
  FavoriteProject,
} from 'src/store/favorteProjectIds'

export const useFavoriteProjectIdsQuery = () => {
  const { setFavoriteProjectIds } = useFavoriteProjectIds()

  useEffect(() => {
    ;(async () => {
      const res = await fetchFavoriteProjectIds()
      setFavoriteProjectIds(res)
    })()
  }, [setFavoriteProjectIds])
}

const fetchFavoriteProjectIds = (): Promise<FavoriteProject[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '1',
        },
      ])
    }, 1000)
  })
}

import { useCallback, useEffect } from 'react'
import {
  useFavoriteProjectIds,
  FavoriteProject,
} from 'src/store/entities/favorteProjectIds'

type Props = {
  lazy?: boolean
}

export const useFavoriteProjectIdsQuery = (props?: Props) => {
  const { setFavoriteProjectIds } = useFavoriteProjectIds()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      const res = await fetchFavoriteProjectIds()
      setFavoriteProjectIds(res)
    })()
  }, [props?.lazy, setFavoriteProjectIds])

  const refetch = useCallback(() => {
    ;(async () => {
      const res = await fetchFavoriteProjectIds()
      setFavoriteProjectIds(res)
    })()
  }, [setFavoriteProjectIds])

  return {
    refetch,
  }
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

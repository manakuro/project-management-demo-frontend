import { useCallback, useEffect } from 'react'
import {
  useFavoriteProjectIds,
  FavoriteProject,
} from 'src/store/entities/favoriteProjectIds'

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
          id: '0AG01FRSQPE9S074GRC1HX85HGCWS',
        },
      ])
    }, 1000)
  })
}

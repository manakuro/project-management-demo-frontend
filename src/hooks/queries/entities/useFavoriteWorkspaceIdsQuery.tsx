import { useCallback, useEffect } from 'react'
import {
  useFavoriteWorkspaceIds,
  FavoriteWorkspace,
} from 'src/store/entities/favoriteWorkspaceIds'

type Props = {
  lazy?: boolean
}

export const useFavoriteWorkspaceIdsQuery = (props?: Props) => {
  const { setFavoriteWorkspaceIds } = useFavoriteWorkspaceIds()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      const res = await fetch()
      setFavoriteWorkspaceIds(res)
    })()
  }, [props?.lazy, setFavoriteWorkspaceIds])

  const refetch = useCallback(() => {
    ;(async () => {
      const res = await fetch()
      setFavoriteWorkspaceIds(res)
    })()
  }, [setFavoriteWorkspaceIds])

  return {
    refetch,
  }
}

const fetch = (): Promise<FavoriteWorkspace[]> => {
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

import { useCallback, useEffect } from 'react'
import { useFeedLikes, FeedLike } from 'src/store/entities/feedLikes'

type Props = {
  lazy?: boolean
}

export const useFeedLikesQuery = (props?: Props) => {
  const { setFeedLikes } = useFeedLikes()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      const res = await fetchFeedLikes()
      setFeedLikes(res)
    })()
  }, [props?.lazy, setFeedLikes])

  const refetch = useCallback(() => {
    ;(async () => {
      const res = await fetchFeedLikes()
      setFeedLikes(res)
    })()
  }, [setFeedLikes])

  return {
    refetch,
  }
}

const fetchFeedLikes = (): Promise<FeedLike[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '3',
          taskId: '1',
          feedId: '2',
          teammateId: '3',
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '4',
          taskId: '1',
          feedId: '2',
          teammateId: '2',
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '5',
          taskId: '1',
          feedId: '2',
          teammateId: '1',
          createdAt: '',
          updatedAt: '',
        },
      ])
    }, 1000)
  })
}

import { useCallback, useEffect } from 'react'
import {
  useTaskFeedLikesResponse,
  TaskFeedLike,
} from 'src/store/entities/taskFeedLike'

type Props = {
  lazy?: boolean
}

export const useFeedLikesQuery = (props?: Props) => {
  const { setTaskFeedLikes } = useTaskFeedLikesResponse()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      const res = await fetchFeedLikes()
      setTaskFeedLikes(res)
    })()
  }, [props?.lazy, setTaskFeedLikes])

  const refetch = useCallback(() => {
    ;(async () => {
      const res = await fetchFeedLikes()
      setTaskFeedLikes(res)
    })()
  }, [setTaskFeedLikes])

  return {
    refetch,
  }
}

const fetchFeedLikes = (): Promise<TaskFeedLike[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '3',
          taskId: '1',
          taskFeedId: '2',
          teammateId: '3',
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '4',
          taskId: '1',
          taskFeedId: '2',
          teammateId: '2',
          createdAt: '',
          updatedAt: '',
        },
        {
          id: '5',
          taskId: '1',
          taskFeedId: '2',
          teammateId: '1',
          createdAt: '',
          updatedAt: '',
        },
      ])
    }, 1000)
  })
}

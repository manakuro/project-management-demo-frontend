import { useCallback, useEffect } from 'react'
import { uuid } from 'src/shared/uuid'
import {
  useTaskLikeResponse,
  TaskLikeResponse,
} from 'src/store/entities/taskLike'

type Props = {
  lazy?: boolean
}

export const useTaskLikesQuery = (props?: Props) => {
  const { setTaskLikes } = useTaskLikeResponse()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return

      const res = await fetchTaskLikes()
      setTaskLikes(res)
    })()
  }, [props?.lazy, setTaskLikes])

  const refetch = useCallback(() => {
    ;(async () => {
      const res = await fetchTaskLikes()
      setTaskLikes(res)
    })()
  }, [setTaskLikes])

  return {
    refetch,
  }
}

const fetchTaskLikes = (): Promise<TaskLikeResponse[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: uuid(),
          taskId: '1',
          teammateId: '1',
          createdAt: '',
          updatedAt: '',
        },
        {
          id: uuid(),
          taskId: '1',
          teammateId: '2',
          createdAt: '',
          updatedAt: '',
        },
        {
          id: uuid(),
          taskId: '1',
          teammateId: '3',
          createdAt: '',
          updatedAt: '',
        },
        {
          id: uuid(),
          taskId: '2',
          teammateId: '3',
          createdAt: '',
          updatedAt: '',
        },
      ])
    }, 500)
  })
}

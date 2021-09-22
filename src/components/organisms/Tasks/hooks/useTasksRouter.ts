import { useCallback } from 'react'
import {
  isMyTasksDetailURLById,
  isProjectsDetailURLById,
  useRouter,
} from 'src/router'
import { Options } from 'src/router/types'
import { useTasksContext } from '../TasksProvider'

type Result = {
  navigateToTaskDetail: (taskId: string, options?: Options) => Promise<void>
  navigateToTaskBoard: (options?: Options) => Promise<void>
  isTaskDetailURLById: (taskId: string) => boolean
}

export const useTasksRouter = (): Result => {
  const { isMyTasksPage } = useTasksContext()
  const { router } = useRouter()
  const { push } = router

  const navigateToTaskDetail = useCallback(
    async (taskId, options) => {
      const pathArray = router.asPath.split('/')
      const excludedPath = pathArray.slice(0, -1)
      const path = `${excludedPath.join('/')}/${taskId}`

      await push(path, undefined, {
        shallow: true,
        ...options,
      })
    },
    [push, router.asPath],
  )

  const navigateToTaskBoard = useCallback(
    async (options) => {
      const pathArray = router.asPath.split('/')
      const excludedPath = pathArray.slice(0, -1)
      const path = `${excludedPath.join('/')}/board`

      await push(path, undefined, {
        shallow: true,
        ...options,
      })
    },
    [push, router.asPath],
  )

  const isTaskDetailURLById = useCallback(
    (taskId: string) => {
      if (isMyTasksPage) return isMyTasksDetailURLById(router, taskId)

      return isProjectsDetailURLById(router, taskId)
    },
    [isMyTasksPage, router],
  )

  return {
    navigateToTaskDetail,
    navigateToTaskBoard,
    isTaskDetailURLById,
  }
}

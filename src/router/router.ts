import { useRouter as useRouterNext, NextRouter } from 'next/router'
import { useCallback } from 'react'
import {
  ROUTE_MY_TASKS,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_FILES,
} from 'src/router/routes'

type Options = Parameters<NextRouter['push']>[2]

export const useRouter = () => {
  const router = useRouterNext()
  const { push } = router

  const navigateToMyTasks = useCallback(
    async (options?: Options) => {
      await push(ROUTE_MY_TASKS.href.pathname, undefined, {
        shallow: true,
        ...options,
      })
    },
    [push],
  )

  const navigateToTaskDetail = useCallback(
    async (id: string, options?: Options) => {
      await push(`${ROUTE_MY_TASKS.href.pathname}/${id}`, undefined, {
        shallow: true,
        ...options,
      })
    },
    [push],
  )

  const navigateToTaskDetailFeed = useCallback(
    async (taskId: string, feedId: string, options?: Options) => {
      await push(
        `${ROUTE_MY_TASKS.href.pathname}/${taskId}/${feedId}`,
        undefined,
        {
          shallow: true,
          ...options,
        },
      )
    },
    [push],
  )

  const navigateToMyTasksBoard = useCallback(
    async (options?: Options) => {
      await push(ROUTE_MY_TASKS_BOARD.href.pathname, undefined, {
        shallow: true,
        ...options,
      })
    },
    [push],
  )
  const navigateToMyTasksCalendar = useCallback(
    async (options?: Options) => {
      await push(ROUTE_MY_TASKS_CALENDAR.href.pathname, undefined, {
        shallow: true,
        ...options,
      })
    },
    [push],
  )
  const navigateToMyTasksFiles = useCallback(
    async (options?: Options) => {
      await push(ROUTE_MY_TASKS_FILES.href.pathname, undefined, {
        shallow: true,
        ...options,
      })
    },
    [push],
  )

  const taskDetailFeedURL = useCallback(
    (taskId: string, feedId: string): string => {
      return `${window.location.origin}/${ROUTE_MY_TASKS.name}/${taskId}/${feedId}`
    },
    [],
  )

  return {
    navigateToMyTasks,
    navigateToMyTasksBoard,
    navigateToMyTasksCalendar,
    navigateToMyTasksFiles,
    navigateToTaskDetail,
    navigateToTaskDetailFeed,
    router,
    taskDetailFeedURL,
  }
}

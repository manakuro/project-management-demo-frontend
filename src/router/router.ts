import { useRouter as useRouterNext, NextRouter } from 'next/router'
import { useCallback } from 'react'
import {
  ROUTE_HOME,
  ROUTE_MY_TASKS_LIST,
  ROUTE_MY_TASKS_BOARD,
  ROUTE_MY_TASKS_CALENDAR,
  ROUTE_MY_TASKS_FILES,
  ROUTE_MY_TASKS,
  ROUTE_INBOX,
} from 'src/router/routes'

type Options = Parameters<NextRouter['push']>[2]

export const useRouter = () => {
  const router = useRouterNext()
  const { push } = router

  const navigateToHome = useCallback(
    async (options?: Options) => {
      await push(ROUTE_HOME.href.pathname, undefined, {
        shallow: true,
        ...options,
      })
    },
    [push],
  )

  const navigateToHomeDetail = useCallback(
    async (id: string, options?: Options) => {
      await push(`${ROUTE_HOME.href.pathname}${id}`, undefined, {
        shallow: true,
        ...options,
      })
    },
    [push],
  )

  const navigateToMyTasksList = useCallback(
    async (options?: Options) => {
      await push(ROUTE_MY_TASKS_LIST.href.pathname, undefined, {
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

  const navigateToInbox = useCallback(
    async (options?: Options) => {
      await push(ROUTE_INBOX.href.pathname, undefined, {
        shallow: true,
        ...options,
      })
    },
    [push],
  )

  const navigateToInboxDetail = useCallback(
    async (id: string, options?: Options) => {
      await push(`${ROUTE_INBOX.href.pathname}${id}`, undefined, {
        shallow: true,
        ...options,
      })
    },
    [push],
  )

  return {
    navigateToHome,
    navigateToHomeDetail,
    navigateToMyTasksList,
    navigateToMyTasksBoard,
    navigateToMyTasksCalendar,
    navigateToMyTasksFiles,
    navigateToTaskDetail,
    navigateToTaskDetailFeed,
    navigateToInbox,
    navigateToInboxDetail,
    router,
  }
}

import { useRouter as useRouterNext, NextRouter } from 'next/router'
import { useCallback } from 'react'
import { ROUTE_MY_TASKS } from 'src/router/routes'

type Options = Parameters<NextRouter['push']>[2]

export const useRouter = () => {
  const router = useRouterNext()

  const navigateToTasks = useCallback(
    async (options?: Options) => {
      await router.push(ROUTE_MY_TASKS.href.pathname, undefined, {
        shallow: true,
        ...options,
      })
    },
    [router],
  )

  const navigateToTaskDetail = useCallback(
    async (id: string, options?: Options) => {
      await router.push(`${ROUTE_MY_TASKS.href.pathname}/${id}`, undefined, {
        shallow: true,
        ...options,
      })
    },
    [router],
  )

  const navigateToTaskDetailFeed = useCallback(
    async (taskId: string, feedId: string, options?: Options) => {
      await router.push(
        `${ROUTE_MY_TASKS.href.pathname}/${taskId}/${feedId}`,
        undefined,
        {
          shallow: true,
          ...options,
        },
      )
    },
    [router],
  )

  const taskDetailFeedURL = useCallback(
    (taskId: string, feedId: string): string => {
      return `${window.location.origin}/${ROUTE_MY_TASKS.name}/${taskId}/${feedId}`
    },
    [],
  )

  return {
    navigateToTaskDetail,
    navigateToTaskDetailFeed,
    navigateToTasks,
    router,
    taskDetailFeedURL,
  }
}

import { useRouter as useRouterNext, NextRouter } from 'next/router'
import { useCallback } from 'react'

type Options = Parameters<NextRouter['push']>[2]

export const useRouter = () => {
  const router = useRouterNext()

  const navigateToTasks = useCallback(
    async (options?: Options) => {
      await router.push('/tasks/', undefined, {
        shallow: true,
        ...options,
      })
    },
    [router],
  )

  const navigateToTaskDetail = useCallback(
    async (id: string, options?: Options) => {
      await router.push(`/tasks/${id}`, undefined, {
        shallow: true,
        ...options,
      })
    },
    [router],
  )

  return {
    navigateToTaskDetail,
    navigateToTasks,
    router,
  }
}

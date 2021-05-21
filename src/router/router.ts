import { useRouter as useRouterNext, NextRouter } from 'next/router'
import { useCallback } from 'react'

type Options = Parameters<NextRouter['push']>[2]

export const useRouter = () => {
  const router = useRouterNext()

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
    router,
  }
}

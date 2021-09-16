import { useRouter as useRouterNext } from 'next/router'
import { useCallback } from 'react'
import { Options } from '../types'
import { ROUTE_INBOX } from './routes'

export const useRouterInbox = () => {
  const router = useRouterNext()
  const { push } = router

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
      await push(`${ROUTE_INBOX.href.pathname}/${id}`, undefined, {
        shallow: true,
        ...options,
      })
    },
    [push],
  )

  return {
    navigateToInbox,
    navigateToInboxDetail,
  }
}

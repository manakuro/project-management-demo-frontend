import { useRouter as useRouterNext } from 'next/router'
import { useCallback } from 'react'
import { Options } from '../types'
import { ROUTE_HOME } from './routes'

export const useRouterHome = () => {
  const router = useRouterNext()
  const { push } = router

  const navigateToHome = useCallback(
    async (options?: Options) => {
      await push(ROUTE_HOME.href.pathname(), undefined, {
        shallow: true,
        ...options,
      })
    },
    [push],
  )

  const navigateToHomeDetail = useCallback(
    async (id: string, options?: Options) => {
      await push(`${ROUTE_HOME.href.pathname()}${id}`, undefined, {
        shallow: true,
        ...options,
      })
    },
    [push],
  )

  return {
    navigateToHome,
    navigateToHomeDetail,
  }
}

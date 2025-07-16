import { useRouter as useRouterNext } from 'next/router'
import { useCallback } from 'react'
import type { Options } from '../types'
import { ROUTE_WORKSPACES_OVERVIEW } from './routes'

export const useRouterWorkspace = () => {
  const router = useRouterNext()
  const { push } = router

  const navigateToWorkspaceOverview = useCallback(
    async (id: string, options?: Options) => {
      await push(ROUTE_WORKSPACES_OVERVIEW.href.pathname(id), undefined, {
        shallow: true,
        ...options,
      })
    },
    [push],
  )

  return {
    navigateToWorkspaceOverview,
  }
}

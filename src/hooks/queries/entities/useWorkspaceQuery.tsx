import { useCallback, useEffect, useState } from 'react'
import { useWorkspaceLazyQuery as useWorkspaceQueryApollo } from 'src/graphql/hooks'
import { useMountedRef } from 'src/hooks'
import { useWorkspace, Workspace } from 'src/store/entities/workspace'

type Props = {
  lazy?: boolean
}

export const useWorkspaceQuery = (props?: Props) => {
  const [refetchQuery] = useWorkspaceQueryApollo({
    variables: {
      where: {
        name: 'My Workspace',
      },
    },
  })
  const [loading, setLoading] = useState(true)
  const { setWorkspace } = useWorkspace()
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    ;(async () => {
      if (props?.lazy) return
      setLoading(true)
      const res = await refetchQuery()
      setWorkspace(res.data?.workspace as Workspace)
      setLoading(false)
    })()
  }, [props?.lazy, refetchQuery, setWorkspace])

  const refetch = useCallback(() => {
    ;(async () => {
      setLoading(true)
      const res = await refetchQuery()
      if (mountedRef.current) {
        setWorkspace(res.data?.workspace as Workspace)
      }
    })()
  }, [mountedRef, refetchQuery, setWorkspace])

  return {
    refetch,
    loading,
  }
}

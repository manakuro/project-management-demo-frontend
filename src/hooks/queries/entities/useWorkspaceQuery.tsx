import { useEffect, useState } from 'react'
import { useWorkspaceQuery as useWorkspaceQueryApollo } from 'src/graphql/hooks'
import { useMountedRef } from 'src/hooks'
import { useWorkspaceResponse, Workspace } from 'src/store/entities/workspace'

export const useWorkspaceQuery = () => {
  const queryResult = useWorkspaceQueryApollo({
    variables: {
      where: {
        name: 'My Workspace',
      },
    },
    fetchPolicy: 'cache-first',
  })
  const { setWorkspace } = useWorkspaceResponse()
  const [loading, setLoading] = useState(true)
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    setLoading(queryResult.loading)
  }, [queryResult.loading])

  useEffect(() => {
    if (!queryResult.data) return
    if (loading) return
    if (!mountedRef.current) return

    setWorkspace(queryResult.data.workspace as Workspace)
    setLoading(false)
  }, [loading, mountedRef, queryResult.data, setWorkspace])

  return {
    refetch: queryResult.refetch,
    loading,
  }
}

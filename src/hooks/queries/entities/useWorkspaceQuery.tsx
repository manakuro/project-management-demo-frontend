import { useEffect, useState } from 'react'
import { useWorkspaceQuery as useQuery } from 'src/graphql/hooks'
import { useMountedRef } from 'src/hooks'
import { useWorkspaceResponse, Workspace } from 'src/store/entities/workspace'

export const useWorkspaceQuery = () => {
  const queryResult = useQuery({
    variables: {
      where: {
        name: 'My Workspace',
      },
    },
    fetchPolicy: 'no-cache',
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

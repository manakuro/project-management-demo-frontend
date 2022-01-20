import { useEffect, useMemo, useState } from 'react'
import { useFavoriteWorkspaceIdsQuery as useQuery } from 'src/graphql/hooks'
import { useMountedRef } from 'src/hooks'
import { useFavoriteWorkspaceIdsResponse } from 'src/store/entities/favoriteWorkspaceIds'
import { useMe } from 'src/store/entities/me'
import { useWorkspace } from 'src/store/entities/workspace'

export const useFavoriteWorkspaceIdsQuery = () => {
  const { me } = useMe()
  const { workspace } = useWorkspace()
  const skip = useMemo(() => !me.id || !workspace.id, [me.id, workspace.id])

  const queryResult = useQuery({
    variables: {
      teammateId: me.id,
      workspaceId: workspace.id,
    },
    skip,
  })
  const { setFavoriteWorkspaceIds } = useFavoriteWorkspaceIdsResponse()
  const [loading, setLoading] = useState(queryResult.loading)
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    setLoading(queryResult.loading)
  }, [queryResult.loading])

  useEffect(() => {
    if (!queryResult.data) return
    if (loading) return
    if (!mountedRef.current) return

    setFavoriteWorkspaceIds(queryResult.data.favoriteWorkspaceIds)
    setLoading(false)
  }, [loading, mountedRef, queryResult.data, setFavoriteWorkspaceIds])

  return {
    refetch: queryResult.refetch,
    loading,
  }
}

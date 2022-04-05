import { useMemo } from 'react'
import { useFavoriteWorkspaceIdsQuery as useQuery } from 'src/graphql/hooks'
import { useFavoriteWorkspaceIdsResponse } from 'src/store/entities/favoriteWorkspaceIds'
import { useMe } from 'src/store/entities/me'
import { useWorkspace } from 'src/store/entities/workspace'

export const useFavoriteWorkspaceIdsQuery = () => {
  const { me } = useMe()
  const { workspace } = useWorkspace()
  const skip = useMemo(() => !me.id || !workspace.id, [me.id, workspace.id])
  const { setFavoriteWorkspaceIds } = useFavoriteWorkspaceIdsResponse()

  const queryResult = useQuery({
    variables: {
      teammateId: me.id,
      workspaceId: workspace.id,
    },
    skip,
    onCompleted: (data) => {
      setFavoriteWorkspaceIds(data.favoriteWorkspaceIds)
    },
  })

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  }
}

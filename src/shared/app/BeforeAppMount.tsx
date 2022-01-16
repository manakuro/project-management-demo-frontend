import React, { useEffect } from 'react'
import {
  useProjectsQuery,
  useFavoriteProjectIdsQuery,
  useWorkspaceQuery,
  useMeQuery,
  useFeedLikesQuery,
  useTaskLikesQuery,
  useTabStatusForMyTasksQuery,
  useFavoriteWorkspaceIdsQuery,
  useProjectBaseColorsQuery,
  useProjectLightColorsQuery,
  useProjectIconsQuery,
} from 'src/hooks/queries/entities'

export const BeforeAppMount: React.FC = (props) => {
  useProjectsQuery()
  useProjectBaseColorsQuery()
  useProjectLightColorsQuery()
  useProjectIconsQuery()
  const useFavoriteProjectIdsQueryResult = useFavoriteProjectIdsQuery({
    lazy: true,
  })
  const useFavoriteWorkspaceIdsQueryResult = useFavoriteWorkspaceIdsQuery({
    lazy: true,
  })
  useWorkspaceQuery()
  useMeQuery()

  const useFeedLikesQueryResult = useFeedLikesQuery({
    lazy: true,
  })
  const useTaskLikesQueryResult = useTaskLikesQuery({
    lazy: true,
  })
  const useTabStatusForMyTasksQueryResult = useTabStatusForMyTasksQuery({
    lazy: true,
  })

  useEffect(() => {
    console.log('BeforeAppMount!!')
    useFavoriteProjectIdsQueryResult.refetch()
    useFeedLikesQueryResult.refetch()
    useTaskLikesQueryResult.refetch()
    useTabStatusForMyTasksQueryResult.refetch()
    useFavoriteWorkspaceIdsQueryResult.refetch()
    /* eslint react-hooks/exhaustive-deps: off */
  }, [])

  return props.children as React.ReactElement
}

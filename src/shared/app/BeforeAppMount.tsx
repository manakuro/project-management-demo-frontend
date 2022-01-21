import React, { useEffect } from 'react'
import {
  useProjectsQuery,
  useFavoriteProjectIdsQuery,
  useWorkspaceQuery,
  useMeQuery,
  useFeedLikesQuery,
  useTaskLikesQuery,
  useMyTasksTabStatusQuery,
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
  useFavoriteWorkspaceIdsQuery()
  useWorkspaceQuery()
  useMeQuery()
  useFavoriteProjectIdsQuery()
  useMyTasksTabStatusQuery()
  const useFeedLikesQueryResult = useFeedLikesQuery({
    lazy: true,
  })
  const useTaskLikesQueryResult = useTaskLikesQuery({
    lazy: true,
  })

  useEffect(() => {
    console.log('BeforeAppMount!!')
    useFeedLikesQueryResult.refetch()
    useTaskLikesQueryResult.refetch()
    /* eslint react-hooks/exhaustive-deps: off */
  }, [])

  return props.children as React.ReactElement
}

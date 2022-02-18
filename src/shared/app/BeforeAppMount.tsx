import React, { useEffect } from 'react'
import {
  useProjectsQuery,
  useFavoriteProjectIdsQuery,
  useWorkspaceQuery,
  useMeQuery,
  useFeedLikesQuery,
  useTaskLikesQuery,
  useTeammateTaskTabStatusQuery,
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
  useTeammateTaskTabStatusQuery()
  const useFeedLikesQueryResult = useFeedLikesQuery({
    lazy: true,
  })
  useTaskLikesQuery()

  useEffect(() => {
    console.log('BeforeAppMount!!')
    useFeedLikesQueryResult.refetch()
    /* eslint react-hooks/exhaustive-deps: off */
  }, [])

  return props.children as React.ReactElement
}

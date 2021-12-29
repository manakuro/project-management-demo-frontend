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
} from 'src/hooks/queries/entities'

export const BeforeAppMount: React.FC = (props) => {
  const projectQueryResult = useProjectsQuery({ lazy: true })
  const useFavoriteProjectIdsQueryResult = useFavoriteProjectIdsQuery({
    lazy: true,
  })
  const useFavoriteWorkspaceIdsQueryResult = useFavoriteWorkspaceIdsQuery({
    lazy: true,
  })
  useWorkspaceQuery()

  const useMeQueryResult = useMeQuery({
    lazy: true,
  })
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
    projectQueryResult.refetch()
    useFavoriteProjectIdsQueryResult.refetch()
    useMeQueryResult.refetch()
    useFeedLikesQueryResult.refetch()
    useTaskLikesQueryResult.refetch()
    useTabStatusForMyTasksQueryResult.refetch()
    useFavoriteWorkspaceIdsQueryResult.refetch()
    /* eslint react-hooks/exhaustive-deps: off */
  }, [])

  return props.children as React.ReactElement
}

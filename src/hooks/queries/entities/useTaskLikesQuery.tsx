import { useEffect, useState } from 'react'
import { useTaskLikesQuery as useQuery } from 'src/graphql/hooks'
import { TaskLikesQueryResponse } from 'src/graphql/types/taskLikes'
import { useMountedRef } from 'src/hooks'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import { useTaskLikeResponse, TaskLike } from 'src/store/entities/taskLike'
import { useWorkspace } from 'src/store/entities/workspace'

export const useTaskLikesQuery = () => {
  const { setTaskLikes } = useTaskLikeResponse()
  const { workspace } = useWorkspace()
  const [loading, setLoading] = useState(true)
  const { mountedRef } = useMountedRef()

  const queryResult = useQuery({
    variables: {
      where: {
        workspaceID: workspace.id,
      },
    },
    skip: !workspace.id,
  })

  useEffect(() => {
    setLoading(queryResult.loading)
  }, [queryResult.loading])

  useEffect(() => {
    if (!queryResult.data) return
    if (loading) return
    if (!mountedRef.current) return

    const taskLikes = getNodesFromEdges<TaskLike, TaskLikesQueryResponse>(
      queryResult.data.taskLikes,
    )
    setTaskLikes(taskLikes)
    setLoading(false)
  }, [loading, mountedRef, queryResult.data, setTaskLikes])

  return {
    refetch: queryResult.refetch,
    loading,
  }
}

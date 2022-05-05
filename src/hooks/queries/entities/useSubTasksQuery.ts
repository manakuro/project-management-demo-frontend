import { useEffect, useState } from 'react'
import { useSubTasksQuery as useQuery } from 'src/graphql/hooks'
import {
  SubTasksQuery,
  SubTaskResponse,
  SubTasksQueryVariables as Variables,
} from 'src/graphql/types/subTasks'
import { useMountedRef } from 'src/hooks'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import { useTasksResponse, TaskResponse } from 'src/store/entities/task'

export const useSubTasksQuery = (variables: Variables) => {
  const queryResult = useQuery({
    variables,
  })
  const { setTasksFromResponse } = useTasksResponse()
  const [loading, setLoading] = useState(true)
  const { mountedRef } = useMountedRef()

  useEffect(() => {
    if (!queryResult.data) return
    if (loading) return
    if (!mountedRef.current) return

    const subTasks = getNodesFromEdges<SubTaskResponse, SubTasksQuery['tasks']>(
      queryResult.data.tasks,
    )

    setTasksFromResponse(subTasks as TaskResponse[])
    setLoading(false)
  }, [loading, mountedRef, queryResult.data, setTasksFromResponse])

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  }
}

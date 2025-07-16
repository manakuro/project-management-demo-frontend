import { useSubTasksQuery as useQuery } from 'src/graphql/hooks'
import type {
  SubTaskResponse,
  SubTasksQuery,
  SubTasksQueryVariables as Variables,
} from 'src/graphql/types/subTasks'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import { type TaskResponse, useTasksResponse } from 'src/store/entities/task'

export const useSubTasksQuery = (variables: Variables) => {
  const { setTasksFromResponse } = useTasksResponse()

  const queryResult = useQuery({
    variables,
    onCompleted: (data) => {
      if (!data.tasks) return

      const subTasks = getNodesFromEdges<
        SubTaskResponse,
        SubTasksQuery['tasks']
      >(data.tasks)

      setTasksFromResponse(subTasks as TaskResponse[])
    },
  })

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  }
}

import { useTaskPrioritiesQuery as useQuery } from 'src/graphql/hooks'
import type { TaskPrioritiesQuery } from 'src/graphql/types/taskPriorities'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import {
  type TaskPriority,
  useTaskPriorityResponse,
} from 'src/store/entities/taskPriority'

export const useTaskPrioritiesQuery = () => {
  const { setTaskPriorities } = useTaskPriorityResponse()

  const queryResult = useQuery({
    fetchPolicy: 'cache-first',
    onCompleted: (data) => {
      const taskPriorities = getNodesFromEdges<
        TaskPriority,
        TaskPrioritiesQuery['taskPriorities']
      >(data.taskPriorities)

      setTaskPriorities(taskPriorities)
    },
  })

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  }
}

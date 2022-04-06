import { useTaskPrioritiesQuery as useQuery } from 'src/graphql/hooks'
import { TaskPrioritiesQuery } from 'src/graphql/types/taskPriorities'
import { getNodesFromEdges } from 'src/shared/apollo/util'
import {
  TaskPriority,
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

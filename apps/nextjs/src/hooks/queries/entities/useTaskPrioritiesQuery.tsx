import { useTaskPrioritiesQuery as useQuery } from '@/graphql/hooks';
import type { TaskPrioritiesQuery } from '@/graphql/types/taskPriorities';
import { getNodesFromEdges } from '@/shared/apollo/util';
import {
  type TaskPriority,
  useTaskPriorityResponse,
} from '@/store/entities/taskPriority';

export const useTaskPrioritiesQuery = () => {
  const { setTaskPriorities } = useTaskPriorityResponse();

  const queryResult = useQuery({
    fetchPolicy: 'cache-first',
    onCompleted: (data) => {
      const taskPriorities = getNodesFromEdges<
        TaskPriority,
        TaskPrioritiesQuery['taskPriorities']
      >(data.taskPriorities);

      setTaskPriorities(taskPriorities);
    },
  });

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};

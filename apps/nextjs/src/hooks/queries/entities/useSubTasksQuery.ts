import { useSubTasksQuery as useQuery } from '@/graphql/hooks';
import type {
  SubTaskResponse,
  SubTasksQuery,
  SubTasksQueryVariables as Variables,
} from '@/graphql/types/subTasks';
import { getNodesFromEdges } from '@/shared/apollo/util';
import { type TaskResponse, useTasksResponse } from '@/store/entities/task';

export const useSubTasksQuery = (variables: Variables) => {
  const { setTasksFromResponse } = useTasksResponse();

  const queryResult = useQuery({
    variables,
    onCompleted: (data) => {
      if (!data.tasks) return;

      const subTasks = getNodesFromEdges<
        SubTaskResponse,
        SubTasksQuery['tasks']
      >(data.tasks);

      setTasksFromResponse(subTasks as TaskResponse[]);
    },
  });

  return {
    refetch: queryResult.refetch,
    loading: queryResult.loading,
  };
};

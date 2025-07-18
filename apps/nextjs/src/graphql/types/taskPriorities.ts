import type { TaskPrioritiesQuery } from 'src/graphql/types';

export type {
  TaskPrioritiesQuery,
  TaskPrioritiesQueryVariables,
} from 'src/graphql/types';

export type TaskPriorityResponse = NonNullable<
  EdgesNode<TaskPrioritiesQuery['taskPriorities']>
>;

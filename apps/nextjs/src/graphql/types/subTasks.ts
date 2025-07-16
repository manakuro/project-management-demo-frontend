import type { SubTasksQuery } from 'src/graphql/types';

export type { SubTasksQuery, SubTasksQueryVariables } from 'src/graphql/types';
export type SubTaskResponse = NonNullable<EdgesNode<SubTasksQuery['tasks']>>;

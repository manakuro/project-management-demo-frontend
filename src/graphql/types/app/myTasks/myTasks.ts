import type { MyTasksPageQuery } from 'src/graphql/types';

export type MyTasksResponse = NonNullable<MyTasksPageQuery>;
export type MyTasksTeammateTaskSectionResponse = NonNullable<
  EdgesNode<MyTasksResponse['teammateTaskSections']>
>;

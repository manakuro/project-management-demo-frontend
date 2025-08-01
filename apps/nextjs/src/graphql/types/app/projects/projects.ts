import type { ProjectsPageQuery } from '@/graphql/types';

export type ProjectsResponse = NonNullable<ProjectsPageQuery>;
export type ProjectsProjectTaskSectionResponse = NonNullable<
  EdgesNode<ProjectsResponse['projectTaskSections']>
>;
export type { ProjectsPageQueryVariables } from '@/graphql/types';

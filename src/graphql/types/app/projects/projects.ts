import type { ProjectsPageQuery } from 'src/graphql/types';

export type ProjectsResponse = NonNullable<ProjectsPageQuery>;
export type ProjectsProjectTaskSectionResponse = NonNullable<
  EdgesNode<ProjectsResponse['projectTaskSections']>
>;
export type { ProjectsPageQueryVariables } from 'src/graphql/types';

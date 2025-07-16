import type { ProjectTaskSectionsQuery } from 'src/graphql/types';

export type ProjectTaskSectionResponse = NonNullable<
  EdgesNode<ProjectTaskSectionsQuery['projectTaskSections']>
>;

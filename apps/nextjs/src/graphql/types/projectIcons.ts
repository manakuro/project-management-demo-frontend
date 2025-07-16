import type { ProjectIconsQuery } from 'src/graphql/types';

export type {
  ProjectIconsQuery,
  ProjectIconsQueryVariables,
} from 'src/graphql/types';
export type {
  ProjectIconsQueryHookResult,
  ProjectIconsLazyQueryHookResult,
} from 'src/graphql/hooks';

export type ProjectIconsResponse = ProjectIconsQuery['projectIcons'];

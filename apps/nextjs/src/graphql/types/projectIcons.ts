import type { ProjectIconsQuery } from '@/graphql/types';

export type {
  ProjectIconsQuery,
  ProjectIconsQueryVariables,
} from '@/graphql/types';
export type {
  ProjectIconsQueryHookResult,
  ProjectIconsLazyQueryHookResult,
} from '@/graphql/hooks';

export type ProjectIconsResponse = ProjectIconsQuery['projectIcons'];

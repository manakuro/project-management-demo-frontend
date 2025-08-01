import type { ProjectsQuery } from '@/graphql/types';

export type { ProjectsQuery, ProjectsQueryVariables } from '@/graphql/types';
export type {
  ProjectsQueryHookResult,
  ProjectsLazyQueryHookResult,
} from '@/graphql/hooks';

export type ProjectsResponse = ProjectsQuery['projects'];

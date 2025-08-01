import type { ProjectResponse } from '@/graphql/types/project';

export type { ProjectsResponse } from '@/graphql/types/projects';
export type {
  ProjectResponse,
  ProjectUpdatedSubscriptionResponse,
} from '@/graphql/types/project';

export type Project = Omit<ProjectResponse, 'projectTeammates'>;

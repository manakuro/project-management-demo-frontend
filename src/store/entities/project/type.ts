import type { ProjectResponse } from 'src/graphql/types/project'

export type { ProjectsResponse } from 'src/graphql/types/projects'
export type {
  ProjectResponse,
  ProjectUpdatedSubscriptionResponse,
} from 'src/graphql/types/project'

export type Project = Omit<ProjectResponse, 'projectTeammates'>

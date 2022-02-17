import type { ProjectTaskResponse } from 'src/graphql/types/projectTask'

export type {
  ProjectTaskResponse,
  ProjectTaskCreatedSubscription as ProjectTaskCreatedSubscriptionResponse,
} from 'src/graphql/types/projectTask'

export type ProjectTask = Omit<ProjectTaskResponse, 'task' | 'project'>

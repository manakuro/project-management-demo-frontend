import type { ProjectTaskResponse } from 'src/graphql/types/projectTask'

export type {
  ProjectTaskResponse,
  ProjectTaskCreatedSubscription as ProjectTaskCreatedSubscriptionResponse,
  ProjectTaskUpdatedSubscription as ProjectTaskUpdatedSubscriptionResponse,
} from 'src/graphql/types/projectTask'

export type ProjectTask = Omit<ProjectTaskResponse, 'task' | 'project'>

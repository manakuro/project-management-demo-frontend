import type { ProjectTaskResponse } from '@/graphql/types/projectTask';

export type {
  ProjectTaskResponse,
  ProjectTaskCreatedSubscriptionResponse,
  ProjectTaskUpdatedSubscriptionResponse,
  ProjectTaskCreatedByTaskIdSubscriptionResponse,
  ProjectTaskDeletedSubscriptionResponse,
} from '@/graphql/types/projectTask';

export type ProjectTask = Omit<ProjectTaskResponse, 'task' | 'project'>;

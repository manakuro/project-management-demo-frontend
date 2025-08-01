import type { TaskCollaboratorResponse } from '@/graphql/types/taskCollaborator';

export type {
  TaskCollaboratorResponse,
  TaskCollaboratorCreatedSubscriptionResponse,
  TaskCollaboratorDeletedSubscriptionResponse,
} from '@/graphql/types/taskCollaborator';

export type TaskCollaborator = Omit<TaskCollaboratorResponse, 'teammate'>;

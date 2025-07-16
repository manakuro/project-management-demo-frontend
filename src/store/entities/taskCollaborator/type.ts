import type { TaskCollaboratorResponse } from 'src/graphql/types/taskCollaborator';

export type {
  TaskCollaboratorResponse,
  TaskCollaboratorCreatedSubscriptionResponse,
  TaskCollaboratorDeletedSubscriptionResponse,
} from 'src/graphql/types/taskCollaborator';

export type TaskCollaborator = Omit<TaskCollaboratorResponse, 'teammate'>;

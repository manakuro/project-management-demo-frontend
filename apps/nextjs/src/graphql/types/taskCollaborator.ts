import type { TaskCollaboratorFragmentFragment } from 'src/graphql/types';

export type {
  TaskCollaboratorCreatedSubscription as TaskCollaboratorCreatedSubscriptionResponse,
  TaskCollaboratorDeletedSubscription as TaskCollaboratorDeletedSubscriptionResponse,
} from 'src/graphql/types';

export type TaskCollaboratorResponse =
  NonNullable<TaskCollaboratorFragmentFragment>;

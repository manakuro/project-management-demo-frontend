import type { TaskFragmentFragment } from '@/graphql/types';

export type TaskResponse = NonNullable<TaskFragmentFragment>;
export type {
  TaskUpdatedSubscription as TaskUpdatedSubscriptionResponse,
  TaskDeletedSubscription as TaskDeletedSubscriptionResponse,
  TaskUndeletedSubscription as TaskUndeletedSubscriptionResponse,
  TaskAssignedSubscription as TaskAssignedSubscriptionResponse,
  TaskUnassignedSubscription as TaskUnassignedSubscriptionResponse,
  UpdateTaskMutationVariables,
  UndeleteTaskInput,
  UpdateTaskInput,
} from '@/graphql/types';

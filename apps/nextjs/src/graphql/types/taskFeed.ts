import type {
  DeleteTaskFeedMutation,
  TaskFeedFragmentFragment,
} from '@/graphql/types';

export type TaskFeedResponse = NonNullable<TaskFeedFragmentFragment>;
export type {
  TaskFeedUpdatedSubscription as TaskFeedUpdatedSubscriptionResponse,
  TaskFeedCreatedSubscription as TaskFeedCreatedSubscriptionResponse,
  TaskFeedDeletedSubscription as TaskFeedDeletedSubscriptionResponse,
  UpdateTaskFeedInput,
  CreateTaskFeedInput,
  DeleteTaskFeedInput,
} from '@/graphql/types';

export type DeleteTaskFeedResponse = DeleteTaskFeedMutation['deleteTaskFeed'];

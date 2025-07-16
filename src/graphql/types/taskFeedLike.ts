import type { TaskFeedLikeFragmentFragment } from 'src/graphql/types';

export type TaskFeedLikeResponse = NonNullable<TaskFeedLikeFragmentFragment>;

export type {
  TaskFeedLikeCreatedSubscription as TaskFeedLikeCreatedSubscriptionResponse,
  TaskFeedLikeDeletedSubscription as TaskFeedLikeDeletedSubscriptionResponse,
  CreateTaskFeedLikeInput,
} from 'src/graphql/types';

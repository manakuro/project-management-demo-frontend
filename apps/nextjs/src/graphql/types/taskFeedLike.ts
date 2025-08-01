import type { TaskFeedLikeFragmentFragment } from '@/graphql/types';

export type TaskFeedLikeResponse = NonNullable<TaskFeedLikeFragmentFragment>;

export type {
  TaskFeedLikeCreatedSubscription as TaskFeedLikeCreatedSubscriptionResponse,
  TaskFeedLikeDeletedSubscription as TaskFeedLikeDeletedSubscriptionResponse,
  CreateTaskFeedLikeInput,
} from '@/graphql/types';

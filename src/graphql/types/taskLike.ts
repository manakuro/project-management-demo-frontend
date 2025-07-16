import type { TaskLikesQuery } from 'src/graphql/types';

export type TaskLikeResponse = NonNullable<
  EdgesNode<TaskLikesQuery['taskLikes']>
>;

export type {
  TaskLikeCreatedSubscription as TaskLikeCreatedSubscriptionResponse,
  TaskLikeDeletedSubscription as TaskLikeDeletedSubscriptionResponse,
} from 'src/graphql/types';

import type { TaskFeedLikeResponse } from 'src/graphql/types/taskFeedLike'

export type {
  TaskFeedLikeResponse,
  TaskFeedLikeCreatedSubscription as TaskFeedLikeCreatedSubscriptionResponse,
  TaskFeedLikeDeletedSubscription as TaskFeedLikeDeletedSubscriptionResponse,
} from 'src/graphql/types/taskFeedLike'

export type TaskFeedLike = TaskFeedLikeResponse

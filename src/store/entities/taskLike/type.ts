import type { TaskLikeResponse } from 'src/graphql/types/taskLike'

export type {
  TaskLikeResponse,
  TaskLikeCreatedSubscription as TaskLikeCreatedSubscriptionResponse,
  TaskLikeDeletedSubscription as TaskLikeDeletedSubscriptionResponse,
} from 'src/graphql/types/taskLike'

export type TaskLike = TaskLikeResponse

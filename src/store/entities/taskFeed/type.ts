import type { TaskFeedResponse } from 'src/graphql/types/taskFeed'

export type {
  TaskFeedResponse,
  TaskFeedUpdatedSubscription as TaskFeedUpdatedSubscriptionResponse,
  TaskFeedCreatedSubscription as TaskFeedCreatedSubscriptionResponse,
  TaskFeedDeletedSubscription as TaskFeedDeletedSubscriptionResponse,
  UpdateTaskFeedInput,
  CreateTaskFeedInput,
  DeleteTaskFeedInput,
} from 'src/graphql/types/taskFeed'

export type TaskFeed = TaskFeedResponse

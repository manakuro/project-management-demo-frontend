import type { TaskFeedResponse } from '@/graphql/types/taskFeed';

export type {
  TaskFeedResponse,
  TaskFeedUpdatedSubscriptionResponse,
  TaskFeedCreatedSubscriptionResponse,
  TaskFeedDeletedSubscriptionResponse,
  UpdateTaskFeedInput,
  CreateTaskFeedInput,
  DeleteTaskFeedInput,
  DeleteTaskFeedResponse,
} from '@/graphql/types/taskFeed';

export type TaskFeed = TaskFeedResponse;

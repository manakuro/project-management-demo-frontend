import type { TaskFeedResponse } from 'src/graphql/types/taskFeed';

export type {
  TaskFeedResponse,
  TaskFeedUpdatedSubscriptionResponse,
  TaskFeedCreatedSubscriptionResponse,
  TaskFeedDeletedSubscriptionResponse,
  UpdateTaskFeedInput,
  CreateTaskFeedInput,
  DeleteTaskFeedInput,
  DeleteTaskFeedResponse,
} from 'src/graphql/types/taskFeed';

export type TaskFeed = TaskFeedResponse;

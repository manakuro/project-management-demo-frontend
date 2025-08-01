import type { TaskResponse as Response } from '@/graphql/types/task';

export type {
  TaskUpdatedSubscriptionResponse,
  TaskDeletedSubscriptionResponse,
  TaskUndeletedSubscriptionResponse,
  TaskAssignedSubscriptionResponse,
  TaskUnassignedSubscriptionResponse,
  UpdateTaskMutationVariables,
  UpdateTaskInput,
} from '@/graphql/types/task';

export type TaskResponse = Response;

export type Task = Omit<
  TaskResponse,
  | 'taskFiles'
  | 'taskTags'
  | 'taskCollaborators'
  | 'taskFeeds'
  | 'projectTasks'
  | 'subTasks'
  | 'taskFeedLikes'
  | 'taskLikes'
>;

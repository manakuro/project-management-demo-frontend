import type { TaskResponse as Response } from 'src/graphql/types/task'

export type {
  TaskUpdatedSubscription as TaskUpdatedSubscriptionResponse,
  TaskDeletedSubscription as TaskDeletedSubscriptionResponse,
  TaskUndeletedSubscription as TaskUndeletedSubscriptionResponse,
  TaskAssignedSubscription as TaskAssignedSubscriptionResponse,
  UpdateTaskMutationVariables,
  UpdateTaskInput,
} from 'src/graphql/types/task'

export type TaskResponse = Response

export type Task = Override<
  Omit<
    TaskResponse,
    | 'taskFiles'
    | 'taskTags'
    | 'taskCollaborators'
    | 'taskFeeds'
    | 'projectTasks'
    | 'subTasks'
    | 'taskFeedLikes'
    | 'taskLikes'
  >,
  {
    taskPriority: NonNullable<TaskResponse['taskPriority']>
  }
>

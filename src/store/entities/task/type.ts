import type { TaskResponse as Response } from 'src/graphql/types/task'

export type TaskResponse = Response & {
  taskSectionId: string // Add id of task section in order to easily access its task section data.
}

export type Task = Override<
  Omit<
    TaskResponse,
    | 'taskFiles'
    | 'taskTags'
    | 'taskCollaborators'
    | 'taskFeeds'
    | 'projectTasks'
    | 'subTasks'
  >,
  {
    taskPriority: NonNullable<TaskResponse['taskPriority']>
  }
>

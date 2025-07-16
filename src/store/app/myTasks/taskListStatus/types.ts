import type { TaskListSortStatusCode } from 'src/store/entities/taskListSortStatus'

export type TaskListSortStatusCodeValue =
  | typeof TaskListSortStatusCode.None
  | typeof TaskListSortStatusCode.DueDate
  | typeof TaskListSortStatusCode.DueDate
  | typeof TaskListSortStatusCode.Likes
  | typeof TaskListSortStatusCode.Alphabetical
  | typeof TaskListSortStatusCode.Project

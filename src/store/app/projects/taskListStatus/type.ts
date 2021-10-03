import { TaskListStatusType, TaskListSortStatusType } from './types'

export type TaskListStatus = {
  id: string
  taskListCompletedStatus: TaskListStatusType
  sortStatus: TaskListSortStatusType
}

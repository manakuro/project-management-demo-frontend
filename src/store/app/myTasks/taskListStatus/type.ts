import { TaskListCompletedStatusType, TaskListSortStatusType } from './types'

export type TaskListStatus = {
  id: string
  taskListStatus: TaskListCompletedStatusType
  sortStatus: TaskListSortStatusType
}

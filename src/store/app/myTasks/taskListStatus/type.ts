import { TaskListCompletedStatusType, TaskListSortStatusType } from './types'

export type TaskListStatus = {
  id: string
  taskListCompletedStatus: TaskListCompletedStatusType
  sortStatus: TaskListSortStatusType
}

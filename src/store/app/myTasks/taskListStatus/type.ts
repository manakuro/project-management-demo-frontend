import { TaskListStatusType, TaskListSortStatusType } from './types'

export type TaskListStatus = {
  id: string
  taskListStatus: TaskListStatusType
  sortStatus: TaskListSortStatusType
}

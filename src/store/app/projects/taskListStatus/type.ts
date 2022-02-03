import {
  TaskListCompletedStatusCodeValue,
  TaskListSortStatusCodeValue,
} from './types'

export type TaskListStatus = {
  id: string
  taskListCompletedStatus: TaskListCompletedStatusCodeValue
  taskListSortStatus: TaskListSortStatusCodeValue
}

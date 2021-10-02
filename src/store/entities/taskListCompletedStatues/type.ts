import { TaskListCompletedStatusType } from './types'

export type TaskListCompletedStatusResponse = {
  id: string
  name: string
  statusType: TaskListCompletedStatusType
  createdAt: string
  updatedAt: string
}

export type TaskListCompletedStatus = {
  id: string
  name: string
  statusType: TaskListCompletedStatusType
  createdAt: string
  updatedAt: string
}

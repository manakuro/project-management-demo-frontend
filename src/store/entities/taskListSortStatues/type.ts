import { TaskListSortStatusType } from './types'

export type TaskListSortStatusResponse = {
  id: string
  name: string
  statusType: TaskListSortStatusType
  createdAt: string
  updatedAt: string
}

export type TaskListSortStatus = {
  id: string
  name: string
  statusType: TaskListSortStatusType
  createdAt: string
  updatedAt: string
}

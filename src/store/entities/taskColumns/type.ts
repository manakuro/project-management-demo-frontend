import { TaskColumnType } from './types'

export type TaskColumnResponse = {
  id: string
  name: string
  type: TaskColumnType
  createdAt: string
  updatedAt: string
}

export type TaskColumn = {
  id: string
  name: string
  type: TaskColumnType
  createdAt: string
  updatedAt: string
}

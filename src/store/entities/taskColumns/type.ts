import { TaskColumnType } from './types'

export type TaskColumn = {
  id: string
  projectId: string
  name: string
  type: TaskColumnType
  width: string
  createdAt: string
  updatedAt: string
}

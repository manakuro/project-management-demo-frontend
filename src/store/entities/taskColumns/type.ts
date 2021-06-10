import { TaskColumnType } from './types'

export type TaskColumn = {
  id: string
  fieldId: string
  projectId: string
  teammateId: string
  name: string
  type: TaskColumnType
  width: string
  createdAt: string
  updatedAt: string
}

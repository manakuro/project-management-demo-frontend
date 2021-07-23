import { TaskColumnType } from './types'

export type TaskColumn = {
  id: string
  fieldId: string
  projectId: string
  teammateId: string
  name: string
  type: TaskColumnType
  width: string
  disabled: boolean
  customizable: boolean
  createdAt: string
  updatedAt: string
}

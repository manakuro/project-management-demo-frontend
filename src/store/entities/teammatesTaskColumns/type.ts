import { TaskColumn } from 'src/store/entities/taskColumns'

export type TeammatesTaskColumnResponse = {
  id: string
  taskColumnId: string
  taskColumn: TaskColumn
  teammateId: string
  width: string
  disabled: boolean
  customizable: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export type TeammatesTaskColumn = {
  id: string
  taskColumnId: string
  teammateId: string
  width: string
  disabled: boolean
  customizable: boolean
  order: number
  createdAt: string
  updatedAt: string
}

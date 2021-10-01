import { TaskColumn } from 'src/store/entities/taskColumns'

export type ProjectsTaskColumnResponse = {
  id: string
  taskColumnId: string
  taskColumn: TaskColumn
  projectId: string
  width: string
  disabled: boolean
  customizable: boolean
  order: number
  createdAt: string
  updatedAt: string
}

export type ProjectsTaskColumn = {
  id: string
  taskColumnId: string
  projectId: string
  width: string
  disabled: boolean
  customizable: boolean
  order: number
  createdAt: string
  updatedAt: string
}

import { TaskColumn } from 'src/store/entities/taskColumns'

export type ProjectTaskColumnResponse = {
  id: string
  projectId: string
  taskColumnId: string
  taskColumn: TaskColumn
  createdAt: string
  updatedAt: string
}

export type ProjectTaskColumn = {
  id: string
  projectId: string
  taskColumnId: string
  createdAt: string
  updatedAt: string
}

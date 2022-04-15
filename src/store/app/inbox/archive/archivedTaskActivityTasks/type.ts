import { TaskResponse } from 'src/store/entities/task'

export type ArchivedTaskActivityTasksResponse = {
  id: string
  archivedMyTaskActivityId: string
  taskId: string
  task: TaskResponse
  createdAt: string
  updatedAt: string
}

export type ArchivedTaskActivityTask = {
  id: string
  archivedMyTaskActivityId: string
  taskId: string
  createdAt: string
  updatedAt: string
}

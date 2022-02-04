import { TaskResponse } from 'src/store/entities/task'

export type ArchivedMyTaskActivityTasksResponse = {
  id: string
  archivedMyTaskActivityId: string
  taskId: string
  task: TaskResponse
  createdAt: string
  updatedAt: string
}

export type ArchivedMyTaskActivityTask = {
  id: string
  archivedMyTaskActivityId: string
  taskId: string
  createdAt: string
  updatedAt: string
}

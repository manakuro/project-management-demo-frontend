import { TaskResponse } from 'src/store/entities/tasks'

export type TaskActivityTasksResponse = {
  id: string
  taskActivityId: string
  taskId: string
  task: TaskResponse
  createdAt: string
  updatedAt: string
}

export type TaskActivityTask = {
  id: string
  taskActivityId: string
  taskId: string
  createdAt: string
  updatedAt: string
}

import { TaskResponse } from 'src/store/entities/task'

export type MyTaskActivityTasksResponse = {
  id: string
  myTaskActivityId: string
  taskId: string
  task: TaskResponse
  createdAt: string
  updatedAt: string
}

export type MyTaskActivityTask = {
  id: string
  myTaskActivityId: string
  taskId: string
  createdAt: string
  updatedAt: string
}

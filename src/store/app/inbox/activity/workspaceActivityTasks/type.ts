import { TaskResponse } from 'src/store/entities/tasks'

export type WorkspaceActivityTasksResponse = {
  id: string
  workspaceActivityId: string
  taskId: string
  task: TaskResponse
  createdAt: string
  updatedAt: string
}

export type WorkspaceActivityTask = {
  id: string
  workspaceActivityId: string
  taskId: string
  createdAt: string
  updatedAt: string
}

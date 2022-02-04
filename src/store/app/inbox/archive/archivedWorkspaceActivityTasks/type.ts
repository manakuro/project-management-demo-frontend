import { TaskResponse } from 'src/store/entities/task'

export type ArchivedWorkspaceActivityTasksResponse = {
  id: string
  archivedWorkspaceActivityId: string
  taskId: string
  task: TaskResponse
  createdAt: string
  updatedAt: string
}

export type ArchivedWorkspaceActivityTask = {
  id: string
  archivedWorkspaceActivityId: string
  taskId: string
  createdAt: string
  updatedAt: string
}

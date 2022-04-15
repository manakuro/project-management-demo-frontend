import { ArchivedWorkspaceActivityTasksResponse } from '../archivedWorkspaceActivityTasks'

export type ArchivedWorkspaceActivityResponse = {
  id: string
  activityType: any
  workspaceId: string
  workspace: {
    id: string
    name: string
  }
  projectId: string
  project: {
    id: string
    name: string
  }
  archivedWorkspaceActivityTasks: ArchivedWorkspaceActivityTasksResponse[]
  teammateId: string
  createdAt: string
  updatedAt: string
}

export type ArchivedWorkspaceActivity = {
  id: string
  activityType: any
  workspaceId: string
  projectId: string
  teammateId: string
  createdAt: string
  updatedAt: string
}

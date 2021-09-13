import { ACTIVITY_TYPE_WORKSPACE } from 'src/store/entities/activityTypes'
import { ArchivedWorkspaceActivityTasksResponse } from '../archivedWorkspaceActivityTasks'

export type ArchivedWorkspaceActivityResponse = {
  id: string
  activityType: typeof ACTIVITY_TYPE_WORKSPACE
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
  activityType: typeof ACTIVITY_TYPE_WORKSPACE
  workspaceId: string
  projectId: string
  teammateId: string
  createdAt: string
  updatedAt: string
}

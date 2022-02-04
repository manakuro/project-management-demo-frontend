import { WorkspaceActivityTasksResponse } from 'src/store/app/inbox/activity/workspaceActivityTasks'
import { ACTIVITY_TYPE_WORKSPACE } from 'src/store/entities/activityType'

export type WorkspaceActivityResponse = {
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
  workspaceActivityTasks: WorkspaceActivityTasksResponse[]
  teammateId: string
  createdAt: string
  updatedAt: string
}

export type WorkspaceActivity = {
  id: string
  activityType: typeof ACTIVITY_TYPE_WORKSPACE
  workspaceId: string
  projectId: string
  teammateId: string
  createdAt: string
  updatedAt: string
}

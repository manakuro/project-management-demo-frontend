import { Activity } from './activities'
import { WorkspaceActivityResponse } from './workspaceActivities'

export type ActivityResponse = {
  workspaceActivities: WorkspaceActivityResponse[]
  taskActivities: []
  activities: Activity[]
}

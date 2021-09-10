import { Activity } from './activities'
import { TaskActivityResponse } from './taskActivities'
import { WorkspaceActivityResponse } from './workspaceActivities'

export type ActivityResponse = {
  workspaceActivities: WorkspaceActivityResponse[]
  taskActivities: TaskActivityResponse[]
  activities: Activity[]
}

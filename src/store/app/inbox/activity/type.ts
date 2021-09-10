import { Activity } from './activities'
import { InboxListStatus } from './inboxListStatus'
import { TaskActivityResponse } from './taskActivities'
import { WorkspaceActivityResponse } from './workspaceActivities'

export type ActivityResponse = {
  workspaceActivities: WorkspaceActivityResponse[]
  taskActivities: TaskActivityResponse[]
  inboxListStatus: InboxListStatus
  activities: Activity[]
}

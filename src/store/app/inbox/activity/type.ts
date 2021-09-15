import { Activity } from './activities'
import { InboxListStatus } from './inboxListStatus'
import { MyTaskActivityResponse } from './myTaskActivities'
import { WorkspaceActivityResponse } from './workspaceActivities'

export type ActivityResponse = {
  workspaceActivities: WorkspaceActivityResponse[]
  myTaskActivities: MyTaskActivityResponse[]
  inboxListStatus: InboxListStatus
  activities: Activity[]
}

import { ArchivedMyTaskActivityTasksResponse } from '../archivedMyTaskActivityTasks'

export type ArchivedMyTaskActivityResponse = {
  id: string
  activityType: any
  archivedMyTaskActivityTasks: ArchivedMyTaskActivityTasksResponse[]
  teammateId: string
  createdAt: string
  updatedAt: string
}

export type ArchivedMyTaskActivity = {
  id: string
  activityType: any
  teammateId: string
  createdAt: string
  updatedAt: string
}

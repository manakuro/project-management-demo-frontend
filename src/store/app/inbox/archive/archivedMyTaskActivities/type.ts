import { ACTIVITY_TYPE_TASK } from 'src/store/entities/activityTypes'
import { ArchivedMyTaskActivityTasksResponse } from '../archivedMyTaskActivityTasks'

export type ArchivedMyTaskActivityResponse = {
  id: string
  activityType: typeof ACTIVITY_TYPE_TASK
  archivedMyTaskActivityTasks: ArchivedMyTaskActivityTasksResponse[]
  teammateId: string
  createdAt: string
  updatedAt: string
}

export type ArchivedMyTaskActivity = {
  id: string
  activityType: typeof ACTIVITY_TYPE_TASK
  teammateId: string
  createdAt: string
  updatedAt: string
}

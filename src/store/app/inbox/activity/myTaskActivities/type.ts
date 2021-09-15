import { ACTIVITY_TYPE_TASK } from 'src/store/entities/activityTypes'
import { MyTaskActivityTasksResponse } from '../myTaskActivityTasks'

export type MyTaskActivityResponse = {
  id: string
  activityType: typeof ACTIVITY_TYPE_TASK
  myTaskActivityTasks: MyTaskActivityTasksResponse[]
  teammateId: string
  createdAt: string
  updatedAt: string
}

export type MyTaskActivity = {
  id: string
  activityType: typeof ACTIVITY_TYPE_TASK
  teammateId: string
  createdAt: string
  updatedAt: string
}

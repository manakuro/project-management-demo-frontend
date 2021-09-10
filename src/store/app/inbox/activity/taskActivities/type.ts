import { ACTIVITY_TYPE_TASK } from 'src/store/entities/activityTypes'

export type TaskActivityResponse = {
  id: string
  activityType: typeof ACTIVITY_TYPE_TASK
  taskActivityTasks: any[]
  teammateId: string
  createdAt: string
  updatedAt: string
}

export type TaskActivity = {
  id: string
  activityType: typeof ACTIVITY_TYPE_TASK
  teammateId: string
  createdAt: string
  updatedAt: string
}

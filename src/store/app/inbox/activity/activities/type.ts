import { ActivityTypes } from 'src/store/entities/activityType'

export type Activity = {
  id: string
  type: ActivityTypes
  updatedAt: string
}

import { ActivityTypes } from 'src/store/entities/activityTypes'

export type Activity = {
  id: string
  type: ActivityTypes
  updatedAt: string
}

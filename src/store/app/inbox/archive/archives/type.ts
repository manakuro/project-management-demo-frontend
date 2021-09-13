import { ActivityTypes } from 'src/store/entities/activityTypes'

export type Archive = {
  id: string
  type: ActivityTypes
  updatedAt: string
}

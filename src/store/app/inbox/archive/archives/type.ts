import { ActivityTypes } from 'src/store/entities/activityType'

export type Archive = {
  id: string
  type: ActivityTypes
  updatedAt: string
}

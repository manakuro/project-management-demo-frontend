import { ActivityTypeCodeValues } from 'src/store/entities/activityType'

export type Archive = {
  id: string
  type: ActivityTypeCodeValues
  updatedAt: string
}

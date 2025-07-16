import { createState } from 'src/store/util'
import type { TaskActivity } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/myTaskActivities/${str}`

export const initialState = (): TaskActivity => ({
  id: '',
  activityTypeId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
})
export const {
  state: taskActivityState,
  listState: taskActivitiesState,
  idsState: taskActivityIdsState,
} = createState({ key, initialState })

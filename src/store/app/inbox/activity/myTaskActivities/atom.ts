import { createState } from 'src/store/util'
import { MyTaskActivity } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/myTaskActivities/${str}`

export const initialState = (): MyTaskActivity => ({
  id: '',
  activityType: 1,
  teammateId: '',
  createdAt: '',
  updatedAt: '',
})
export const {
  state: myTaskActivityState,
  listState: myTaskActivitiesState,
  idsState: myTaskActivityIdsState,
} = createState({ key, initialState })

import { createState } from 'src/store/util'
import { ArchivedMyTaskActivity } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/archivedMyTaskActivities/${str}`

export const initialState = (): ArchivedMyTaskActivity => ({
  id: '',
  activityType: 1,
  teammateId: '',
  createdAt: '',
  updatedAt: '',
})

export const {
  state: archivedMyTaskActivityState,
  listState: archivedMyTaskActivitiesState,
  idsState: archivedMyTaskActivityIdsState,
} = createState({ key, initialState })

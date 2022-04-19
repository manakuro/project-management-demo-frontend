import { createState } from 'src/store/util'
import { ArchivedTaskActivity } from './type'

const key = (str: string) =>
  `src/store/app/inbox/archive/archivedTaskActivities/${str}`

export const initialState = (): ArchivedTaskActivity => ({
  id: '',
  activityTypeId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
})

export const {
  state: archivedTaskActivityState,
  listState: archivedTaskActivitiesState,
  idsState: archivedTaskActivityIdsState,
} = createState({ key, initialState })

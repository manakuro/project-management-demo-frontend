import { createState } from 'src/store/util'
import type { ArchivedWorkspaceActivity } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/archivedWorkspaceActivities/${str}`

export const initialState = (): ArchivedWorkspaceActivity => ({
  id: '',
  activityTypeId: '',
  workspaceId: '',
  projectId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
})

export const {
  state: archivedWorkspaceActivityState,
  listState: archivedWorkspaceActivitiesState,
  idsState: archivedWorkspaceActivityIdsState,
} = createState({ key, initialState })

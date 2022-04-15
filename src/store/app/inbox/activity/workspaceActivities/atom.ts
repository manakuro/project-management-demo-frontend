import { createState } from 'src/store/util'
import { WorkspaceActivity } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/workspaceActivities/${str}`

export const initialState = (): WorkspaceActivity => ({
  id: '',
  activityTypeId: '',
  workspaceId: '',
  projectId: '',
  teammateId: '',
  createdAt: '',
  updatedAt: '',
})
export const {
  state: workspaceActivityState,
  listState: workspaceActivitiesState,
  idsState: workspaceActivityIdsState,
} = createState({ key, initialState })

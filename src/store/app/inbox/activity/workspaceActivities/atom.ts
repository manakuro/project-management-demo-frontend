import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { WorkspaceActivity } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/workspaceActivities/${str}`

export const workspaceActivityIdsState = atom<string[]>({
  key: key('workspaceActivityIdsState'),
  default: [],
})
export const workspaceActivitiesState = atom<WorkspaceActivity[]>({
  key: key('workspaceActivitiesState'),
  default: [],
})

const state = atomFamily<WorkspaceActivity, string>({
  key: key('state'),
  default: {
    id: '',
    activityType: 2,
    workspaceId: '',
    projectId: '',
    teammateId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const workspaceActivityState = selectorFamily<WorkspaceActivity, string>(
  {
    key: key('workspaceActivityState'),
    get:
      (workspaceActivityId) =>
      ({ get }) =>
        get(state(workspaceActivityId)),
    set:
      (workspaceActivityId) =>
      ({ get, set, reset }, newVal) => {
        if (newVal instanceof DefaultValue) {
          reset(state(workspaceActivityId))
          return
        }

        set(state(workspaceActivityId), newVal)
        set(workspaceActivitiesState, (prev) =>
          uniqBy([...prev, newVal], 'id').map((p) => {
            if (p.id === newVal.id) {
              return {
                ...p,
                ...newVal,
              }
            }
            return p
          }),
        )

        if (
          get(workspaceActivityIdsState).find(
            (workspaceActivityId) => workspaceActivityId === newVal.id,
          )
        )
          return
        set(workspaceActivityIdsState, (prev) => [...prev, newVal.id])
      },
  },
)

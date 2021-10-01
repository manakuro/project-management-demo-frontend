import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { ArchivedWorkspaceActivity } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/archivedWorkspaceActivities/${str}`

export const archivedWorkspaceActivityIdsState = atom<string[]>({
  key: key('archivedWorkspaceActivityIdsState'),
  default: [],
})
export const archivedWorkspaceActivitiesState = atom<
  ArchivedWorkspaceActivity[]
>({
  key: key('archivedWorkspaceActivitiesState'),
  default: [],
})

const state = atomFamily<ArchivedWorkspaceActivity, string>({
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

export const archivedWorkspaceActivityState = selectorFamily<
  ArchivedWorkspaceActivity,
  string
>({
  key: key('archivedWorkspaceActivityState'),
  get:
    (archivedWorkspaceActivityId) =>
    ({ get }) =>
      get(state(archivedWorkspaceActivityId)),
  set:
    (archivedWorkspaceActivityId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(archivedWorkspaceActivityId))
        return
      }

      set(state(archivedWorkspaceActivityId), newVal)
      set(archivedWorkspaceActivitiesState, (prev) =>
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
        get(archivedWorkspaceActivityIdsState).find(
          (archivedWorkspaceActivityId) =>
            archivedWorkspaceActivityId === newVal.id,
        )
      )
        return
      set(archivedWorkspaceActivityIdsState, (prev) => [...prev, newVal.id])
    },
})

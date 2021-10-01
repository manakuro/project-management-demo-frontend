import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { ArchivedMyTaskActivity } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/archivedMyTaskActivities/${str}`

export const archivedMyTaskActivityIdsState = atom<string[]>({
  key: key('archivedMyTaskActivityIdsState'),
  default: [],
})
export const archivedMyTaskActivitiesState = atom<ArchivedMyTaskActivity[]>({
  key: key('archivedMyTaskActivitiesState'),
  default: [],
})

const state = atomFamily<ArchivedMyTaskActivity, string>({
  key: key('state'),
  default: {
    id: '',
    activityType: 1,
    teammateId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const archivedMyTaskActivityState = selectorFamily<
  ArchivedMyTaskActivity,
  string
>({
  key: key('archivedMyTaskActivityState'),
  get:
    (archivedMyTaskActivityId) =>
    ({ get }) =>
      get(state(archivedMyTaskActivityId)),
  set:
    (archivedMyTaskActivityId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(archivedMyTaskActivityId))
        return
      }

      set(state(archivedMyTaskActivityId), newVal)
      set(archivedMyTaskActivitiesState, (prev) =>
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
        get(archivedMyTaskActivityIdsState).find(
          (archivedMyTaskActivityId) => archivedMyTaskActivityId === newVal.id,
        )
      )
        return
      set(archivedMyTaskActivityIdsState, (prev) => [...prev, newVal.id])
    },
})

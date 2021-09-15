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

export const archivedMyTaskActivityState = atomFamily<
  ArchivedMyTaskActivity,
  string
>({
  key: key('archivedMyTaskActivityState'),
  default: {
    id: '',
    activityType: 1,
    teammateId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const archivedMyTaskActivitySelector = selectorFamily<
  ArchivedMyTaskActivity,
  string
>({
  key: key('archivedMyTaskActivitySelector'),
  get:
    (archivedMyTaskActivityId) =>
    ({ get }) =>
      get(archivedMyTaskActivityState(archivedMyTaskActivityId)),
  set:
    (archivedMyTaskActivityId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(archivedMyTaskActivityState(archivedMyTaskActivityId))
        return
      }

      set(archivedMyTaskActivityState(archivedMyTaskActivityId), newVal)
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

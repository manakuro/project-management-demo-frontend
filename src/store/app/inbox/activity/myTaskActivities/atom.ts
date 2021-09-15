import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { MyTaskActivity } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/myTaskActivities/${str}`

export const myTaskActivityIdsState = atom<string[]>({
  key: key('myTaskActivityIdsState'),
  default: [],
})
export const myTaskActivitiesState = atom<MyTaskActivity[]>({
  key: key('myTaskActivitiesState'),
  default: [],
})

export const myTaskActivityState = atomFamily<MyTaskActivity, string>({
  key: key('myTaskActivityState'),
  default: {
    id: '',
    activityType: 1,
    teammateId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const myTaskActivitySelector = selectorFamily<MyTaskActivity, string>({
  key: key('myTaskActivitySelector'),
  get:
    (myTaskActivityId) =>
    ({ get }) =>
      get(myTaskActivityState(myTaskActivityId)),
  set:
    (myTaskActivityId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(myTaskActivityState(myTaskActivityId))
        return
      }

      set(myTaskActivityState(myTaskActivityId), newVal)
      set(myTaskActivitiesState, (prev) =>
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
        get(myTaskActivityIdsState).find(
          (myTaskActivityId) => myTaskActivityId === newVal.id,
        )
      )
        return
      set(myTaskActivityIdsState, (prev) => [...prev, newVal.id])
    },
})

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

const state = atomFamily<MyTaskActivity, string>({
  key: key('state'),
  default: {
    id: '',
    activityType: 1,
    teammateId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const myTaskActivityState = selectorFamily<MyTaskActivity, string>({
  key: key('myTaskActivityState'),
  get:
    (myTaskActivityId) =>
    ({ get }) =>
      get(state(myTaskActivityId)),
  set:
    (myTaskActivityId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(myTaskActivityId))
        return
      }

      set(state(myTaskActivityId), newVal)
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

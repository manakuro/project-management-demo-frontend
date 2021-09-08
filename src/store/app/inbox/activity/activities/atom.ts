import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { Activity } from './type'

const key = (str: string) => `src/store/app/inbox/activity/activities/${str}`

export const activityIdsState = atom<string[]>({
  key: key('activityIdsState'),
  default: [],
})
export const activitiesState = atom<Activity[]>({
  key: key('activitiesState'),
  default: [],
})

export const activityState = atomFamily<Activity, string>({
  key: key('activityState'),
  default: {
    id: '',
    type: 1,
    updatedAt: '',
  },
})

export const activitySelector = selectorFamily<Activity, string>({
  key: key('activitySelector'),
  get:
    (activityId) =>
    ({ get }) =>
      get(activityState(activityId)),
  set:
    (activityId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(activityState(activityId))
        return
      }

      set(activityState(activityId), newVal)
      set(activitiesState, (prev) =>
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

      if (get(activityIdsState).find((activityId) => activityId === newVal.id))
        return
      set(activityIdsState, (prev) => [...prev, newVal.id])
    },
})

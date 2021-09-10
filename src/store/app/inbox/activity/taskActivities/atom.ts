import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { TaskActivity } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/taskActivities/${str}`

export const taskActivityIdsState = atom<string[]>({
  key: key('taskActivityIdsState'),
  default: [],
})
export const taskActivitiesState = atom<TaskActivity[]>({
  key: key('taskActivitiesState'),
  default: [],
})

export const taskActivityState = atomFamily<TaskActivity, string>({
  key: key('taskActivityState'),
  default: {
    id: '',
    activityType: 1,
    teammateId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const taskActivitySelector = selectorFamily<TaskActivity, string>({
  key: key('taskActivitySelector'),
  get:
    (taskActivityId) =>
    ({ get }) =>
      get(taskActivityState(taskActivityId)),
  set:
    (taskActivityId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(taskActivityState(taskActivityId))
        return
      }

      set(taskActivityState(taskActivityId), newVal)
      set(taskActivitiesState, (prev) =>
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
        get(taskActivityIdsState).find(
          (taskActivityId) => taskActivityId === newVal.id,
        )
      )
        return
      set(taskActivityIdsState, (prev) => [...prev, newVal.id])
    },
})

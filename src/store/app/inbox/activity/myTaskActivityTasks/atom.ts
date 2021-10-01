import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { MyTaskActivityTask } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/myTaskActivityTasks/${str}`

export const myTaskActivityTaskIdsState = atom<string[]>({
  key: key('myTaskActivityTaskIdsState'),
  default: [],
})
export const myTaskActivityTasksState = atom<MyTaskActivityTask[]>({
  key: key('myTaskActivityTasksState'),
  default: [],
})
export const taskIdsByMyTaskActivityIdState = selectorFamily<string[], string>({
  key: key('taskIdsByMyTaskActivityIdState'),
  get:
    (myTaskActivityId: string) =>
    ({ get }) => {
      const myTaskActivityTasks = get(myTaskActivityTasksState)
      return myTaskActivityTasks
        .filter((w) => w.myTaskActivityId === myTaskActivityId)
        .map((w) => w.taskId)
    },
})

const state = atomFamily<MyTaskActivityTask, string>({
  key: key('state'),
  default: {
    id: '',
    myTaskActivityId: '',
    taskId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const myTaskActivityTaskState = selectorFamily<
  MyTaskActivityTask,
  string
>({
  key: key('myTaskActivityTaskState'),
  get:
    (myTaskActivityTaskId) =>
    ({ get }) =>
      get(state(myTaskActivityTaskId)),
  set:
    (myTaskActivityTaskId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(myTaskActivityTaskId))
        return
      }

      set(state(myTaskActivityTaskId), newVal)
      set(myTaskActivityTasksState, (prev) =>
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
        get(myTaskActivityTaskIdsState).find(
          (myTaskActivityTaskId) => myTaskActivityTaskId === newVal.id,
        )
      )
        return
      set(myTaskActivityTaskIdsState, (prev) => [...prev, newVal.id])
    },
})

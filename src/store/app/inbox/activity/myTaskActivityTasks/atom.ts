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
export const taskIdsByMyTaskActivityIdSelector = selectorFamily<
  string[],
  string
>({
  key: key('taskIdsByMyTaskActivityIdSelector'),
  get:
    (myTaskActivityId: string) =>
    ({ get }) => {
      const myTaskActivityTasks = get(myTaskActivityTasksState)
      return myTaskActivityTasks
        .filter((w) => w.myTaskActivityId === myTaskActivityId)
        .map((w) => w.taskId)
    },
})

export const myTaskActivityTaskState = atomFamily<MyTaskActivityTask, string>({
  key: key('myTaskActivityTaskState'),
  default: {
    id: '',
    myTaskActivityId: '',
    taskId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const myTaskActivityTaskSelector = selectorFamily<
  MyTaskActivityTask,
  string
>({
  key: key('myTaskActivityTaskSelector'),
  get:
    (myTaskActivityTaskId) =>
    ({ get }) =>
      get(myTaskActivityTaskState(myTaskActivityTaskId)),
  set:
    (myTaskActivityTaskId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(myTaskActivityTaskState(myTaskActivityTaskId))
        return
      }

      set(myTaskActivityTaskState(myTaskActivityTaskId), newVal)
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

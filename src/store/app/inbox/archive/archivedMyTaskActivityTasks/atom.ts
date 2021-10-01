import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { ArchivedMyTaskActivityTask } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/archivedMyTaskActivityTasks/${str}`

export const archivedMyTaskActivityTaskIdsState = atom<string[]>({
  key: key('archivedMyTaskActivityTaskIdsState'),
  default: [],
})
export const archivedMyTaskActivityTasksState = atom<
  ArchivedMyTaskActivityTask[]
>({
  key: key('archivedMyTaskActivityTasksState'),
  default: [],
})
export const taskIdsByArchivedMyTaskActivityIdState = selectorFamily<
  string[],
  string
>({
  key: key('taskIdsByArchivedMyTaskActivityIdState'),
  get:
    (archivedMyTaskActivityId: string) =>
    ({ get }) => {
      const archivedMyTaskActivityTasks = get(archivedMyTaskActivityTasksState)
      return archivedMyTaskActivityTasks
        .filter((w) => w.archivedMyTaskActivityId === archivedMyTaskActivityId)
        .map((w) => w.taskId)
    },
})

const state = atomFamily<ArchivedMyTaskActivityTask, string>({
  key: key('state'),
  default: {
    id: '',
    archivedMyTaskActivityId: '',
    taskId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const archivedMyTaskActivityTaskState = selectorFamily<
  ArchivedMyTaskActivityTask,
  string
>({
  key: key('archivedMyTaskActivityTaskState'),
  get:
    (archivedMyTaskActivityTaskId) =>
    ({ get }) =>
      get(state(archivedMyTaskActivityTaskId)),
  set:
    (archivedMyTaskActivityTaskId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(archivedMyTaskActivityTaskId))
        return
      }

      set(state(archivedMyTaskActivityTaskId), newVal)
      set(archivedMyTaskActivityTasksState, (prev) =>
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
        get(archivedMyTaskActivityTaskIdsState).find(
          (archivedMyTaskActivityTaskId) =>
            archivedMyTaskActivityTaskId === newVal.id,
        )
      )
        return
      set(archivedMyTaskActivityTaskIdsState, (prev) => [...prev, newVal.id])
    },
})

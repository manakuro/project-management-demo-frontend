import { atom, atomFamily, DefaultValue, selectorFamily } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { TaskActivityTask } from './type'

const key = (str: string) =>
  `src/store/app/inbox/activity/taskActivityTasks/${str}`

export const taskActivityTaskIdsState = atom<string[]>({
  key: key('taskActivityTaskIdsState'),
  default: [],
})
export const taskActivityTasksState = atom<TaskActivityTask[]>({
  key: key('taskActivityTasksState'),
  default: [],
})
export const taskIdsByTaskActivityIdSelector = selectorFamily<string[], string>(
  {
    key: key('taskActivityTasksTaskIdsSelector'),
    get:
      (taskActivityId: string) =>
      ({ get }) => {
        const taskActivityTasks = get(taskActivityTasksState)
        return taskActivityTasks
          .filter((w) => w.taskActivityId === taskActivityId)
          .map((w) => w.taskId)
      },
  },
)

export const taskActivityTaskState = atomFamily<TaskActivityTask, string>({
  key: key('taskActivityTaskState'),
  default: {
    id: '',
    taskActivityId: '',
    taskId: '',
    createdAt: '',
    updatedAt: '',
  },
})

export const taskActivityTaskSelector = selectorFamily<
  TaskActivityTask,
  string
>({
  key: key('taskActivityTaskSelector'),
  get:
    (taskActivityTaskId) =>
    ({ get }) =>
      get(taskActivityTaskState(taskActivityTaskId)),
  set:
    (taskActivityTaskId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(taskActivityTaskState(taskActivityTaskId))
        return
      }

      set(taskActivityTaskState(taskActivityTaskId), newVal)
      set(taskActivityTasksState, (prev) =>
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
        get(taskActivityTaskIdsState).find(
          (taskActivityTaskId) => taskActivityTaskId === newVal.id,
        )
      )
        return
      set(taskActivityTaskIdsState, (prev) => [...prev, newVal.id])
    },
})

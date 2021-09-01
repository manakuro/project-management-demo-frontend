import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { Task } from './type'

const key = (str: string) => `src/store/entities/tasks/${str}`

export const taskIdsState = atom<string[]>({
  key: key('taskIdsState'),
  default: [],
})
export const tasksState = atom<Task[]>({
  key: key('tasksState'),
  default: [],
})

export const defaultTaskState = (): Task => ({
  assigneeId: '',
  dueDate: '',
  dueTime: '',
  id: '',
  isDeleted: false,
  isDone: false,
  doneAt: '',
  isNew: false,
  name: '',
  taskParentId: '',
  taskSectionId: '',
})
export const taskIdsByTaskParentIdSelector = selectorFamily<string[], string>({
  key: key('taskIdsByTaskParentIdSelector'),
  get:
    (taskParentId) =>
    ({ get }) => {
      const tasks = get(tasksState)
      return tasks
        .filter((t) => t.taskParentId === taskParentId && !t.isDeleted)
        .map((t) => t.id)
    },
})
export const taskIdsByAssigneeIdSelector = selectorFamily<string[], string>({
  key: key('taskIdsByAssigneeIdSelector'),
  get:
    (assigneeId) =>
    ({ get }) => {
      const tasks = get(tasksState)
      return tasks
        .filter((t) => t.assigneeId === assigneeId && !t.isDeleted)
        .map((t) => t.id)
    },
})

export const taskState = atomFamily<Task, string>({
  key: key('taskState'),
  default: defaultTaskState(),
})

export const taskSelector = selectorFamily<Task, string>({
  key: key('taskSelector'),
  get:
    (taskId) =>
    ({ get }) =>
      get(taskState(taskId)),
  set:
    (taskId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(taskState(taskId))
        return
      }

      set(taskState(taskId), newVal)
      set(tasksState, (prev) =>
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

      if (newVal.isDeleted) {
        set(taskIdsState, (prev) => prev.filter((id) => id !== newVal.id))
        return
      }

      if (get(taskIdsState).find((taskId) => taskId === newVal.id)) return

      set(taskIdsState, (prev) => [...prev, newVal.id])
    },
})

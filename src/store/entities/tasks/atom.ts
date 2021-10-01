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

export const initialTaskState = (): Task => ({
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
  createdBy: '',
})
export const taskIdsByTaskParentIdState = selectorFamily<string[], string>({
  key: key('taskIdsByTaskParentIdState'),
  get:
    (taskParentId) =>
    ({ get }) => {
      const tasks = get(tasksState)
      return tasks
        .filter((t) => t.taskParentId === taskParentId && !t.isDeleted)
        .map((t) => t.id)
    },
})
export const taskIdsByAssigneeIdState = selectorFamily<string[], string>({
  key: key('taskIdsByAssigneeIdState'),
  get:
    (assigneeId) =>
    ({ get }) => {
      const tasks = get(tasksState)
      return tasks
        .filter((t) => t.assigneeId === assigneeId && !t.isDeleted)
        .map((t) => t.id)
    },
})

export const tasksByTaskSectionIdState = selectorFamily<Task[], string>({
  key: key('tasksByTaskSectionIdState'),
  get:
    (taskSectionId) =>
    ({ get }) => {
      const tasks = get(tasksState)
      const filterByTaskSectionId = (taskSectionId: string) => (t: Task) =>
        !t.isDeleted && taskSectionId === t.taskSectionId && !t.taskParentId

      return tasks.filter(filterByTaskSectionId(taskSectionId))
    },
})

export const tasksByTaskIdsState = selectorFamily<Task[], string[]>({
  key: key('tasksByTaskIdsState'),
  get:
    (taskIds) =>
    ({ get }) => {
      const tasks = get(tasksState)
      return tasks.filter((t) => taskIds.includes(t.id))
    },
})

export const createdByIdsByTaskIdsState = selectorFamily<string[], string[]>({
  key: key('createdByIdsByTaskIdsState'),
  get:
    (taskIds) =>
    ({ get }) => {
      const tasks = get(tasksState)
      return tasks.filter((t) => taskIds.includes(t.id)).map((t) => t.createdBy)
    },
})

const state = atomFamily<Task, string>({
  key: key('state'),
  default: initialTaskState(),
})

export const taskState = selectorFamily<Task, string>({
  key: key('taskState'),
  get:
    (taskId) =>
    ({ get }) =>
      get(state(taskId)),
  set:
    (taskId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(taskId))
        return
      }

      set(state(taskId), newVal)
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

import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import { Task } from './type'

const key = (str: string) => `src/store/entities/tasks/${str}`

export const initialState = (): Task => ({
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
  createdAt: '',
  updatedAt: '',
})
export const {
  state: taskState,
  listState: tasksState,
  idsState: taskIdsState,
} = createState({ key, initialState })

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

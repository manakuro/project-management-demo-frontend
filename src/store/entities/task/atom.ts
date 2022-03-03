import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import { Task } from './type'

const key = (str: string) => `src/store/entities/task/${str}`

export const initialState = (): Task => ({
  assigneeId: '',
  dueDate: '',
  dueTime: '',
  id: '',
  completed: false,
  completedAt: '',
  isNew: false,
  name: '',
  taskSectionId: '',
  taskParentId: '',
  taskPriorityId: '',
  description: {
    type: 'doc',
    content: [],
  },
  taskPriority: {
    id: '',
    name: '',
    priorityType: null,
    color: {
      id: '',
      name: '',
      color: '',
      createdAt: '',
      updatedAt: '',
    },
    createdAt: '',
    updatedAt: '',
  },
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
        .filter((t) => t.taskParentId === taskParentId)
        .map((t) => t.id)
    },
})
export const taskIdsByAssigneeIdState = selectorFamily<string[], string>({
  key: key('taskIdsByAssigneeIdState'),
  get:
    (assigneeId) =>
    ({ get }) => {
      const tasks = get(tasksState)
      return tasks.filter((t) => t.assigneeId === assigneeId).map((t) => t.id)
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

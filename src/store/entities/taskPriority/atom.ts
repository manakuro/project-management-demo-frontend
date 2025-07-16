import { createState } from 'src/store/util'
import type { TaskPriority } from './type'
import { TaskPriorityType } from './types'

const key = (str: string) => `src/store/entities/taskPriority/${str}`

export const initialState = (): TaskPriority => ({
  id: '',
  name: '',
  priorityType: TaskPriorityType.Low,
  color: {
    id: '',
    name: '',
    color: '',
    createdAt: '',
    updatedAt: '',
  },
  createdAt: '',
  updatedAt: '',
})

export const {
  state: taskPriorityState,
  listState: taskPrioritiesState,
  idsState: taskPriorityIdsState,
} = createState({ key, initialState })

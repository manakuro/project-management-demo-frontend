import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import { TaskTag } from './type'

const key = (str: string) => `src/store/entities/taskTag/${str}`

const initialState = (): TaskTag => ({
  id: '',
  tagId: '',
  tag: {
    id: '',
    name: '',
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
  taskId: '',
  createdAt: '',
  updatedAt: '',
})

export const {
  state: taskTagState,
  listState: taskTagsState,
  idsState: taskTagIdsState,
} = createState({ key, initialState })

export const taskTagIdsByTaskIdState = selectorFamily<string[], string>({
  key: key('taskTagIdsByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const tags = get(taskTagsState)
      return tags.filter((t) => t.taskId === taskId).map((p) => p.id)
    },
})

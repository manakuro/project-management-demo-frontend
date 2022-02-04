import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import { TaskTag } from './type'

const key = (str: string) => `src/store/entities/tags/${str}`

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
  state: tagState,
  listState: tagsState,
  idsState: tagIdsState,
} = createState({ key, initialState })

export const tagIdsByTaskIdState = selectorFamily<string[], string>({
  key: key('tagIdsByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const tags = get(tagsState)
      return tags.filter((t) => t.taskId === taskId).map((p) => p.id)
    },
})

import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import { Tag } from './type'

const key = (str: string) => `src/store/entities/tags/${str}`

const initialState = (): Tag => ({
  id: '',
  name: '',
  taskId: '',
  color: {
    id: '',
    name: '',
    color: '',
  },
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

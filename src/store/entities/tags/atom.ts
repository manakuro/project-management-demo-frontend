import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { Tag } from './type'

const key = (str: string) => `src/store/entities/tags/${str}`

export const tagIdsState = atom<string[]>({
  key: key('tagIdsState'),
  default: [],
})
export const tagsState = atom<Tag[]>({
  key: key('tagsState'),
  default: [],
})

const defaultStateValue = (): Tag => ({
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
const tagState = atomFamily<Tag, string>({
  key: key('tagState'),
  default: defaultStateValue(),
})

export const tagIdsByTaskIdSelector = selectorFamily<string[], string>({
  key: key('tagIdsByTaskIdSelector'),
  get:
    (taskId) =>
    ({ get }) => {
      const tags = get(tagsState)
      return tags.filter((t) => t.taskId === taskId).map((p) => p.id)
    },
})

export const tagSelector = selectorFamily<Tag, string>({
  key: key('tagSelector'),
  get:
    (tagId) =>
    ({ get }) =>
      get(tagState(tagId)),
  set:
    (tagId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(tagState(tagId))
        return
      }

      set(tagState(tagId), newVal)
      set(tagsState, (prev) =>
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

      if (get(tagIdsState).find((tagId) => tagId === newVal.id)) return

      set(tagIdsState, (prev) => [...prev, newVal.id])
    },
})

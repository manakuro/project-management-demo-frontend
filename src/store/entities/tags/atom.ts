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

const initialStateValue = (): Tag => ({
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

export const tagIdsByTaskIdState = selectorFamily<string[], string>({
  key: key('tagIdsByTaskIdState'),
  get:
    (taskId) =>
    ({ get }) => {
      const tags = get(tagsState)
      return tags.filter((t) => t.taskId === taskId).map((p) => p.id)
    },
})

const state = atomFamily<Tag, string>({
  key: key('state'),
  default: initialStateValue(),
})
export const tagState = selectorFamily<Tag, string>({
  key: key('tagState'),
  get:
    (tagId) =>
    ({ get }) =>
      get(state(tagId)),
  set:
    (tagId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(tagId))
        return
      }

      set(state(tagId), newVal)
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

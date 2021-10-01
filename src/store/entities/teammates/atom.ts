import { atomFamily, selectorFamily, DefaultValue, atom } from 'recoil'
import { uniqBy } from 'src/shared/utils'
import { Teammate } from './type'

const key = (str: string) => `src/store/entities/teammates/${str}`

export const teammateIdsState = atom<string[]>({
  key: key('teammateIdsState'),
  default: [],
})
export const teammatesState = atom<Teammate[]>({
  key: key('teammatesState'),
  default: [],
})

export const initialTeammateStateValue = (): Teammate => ({
  id: '',
  image: '',
  email: '',
  name: '',
  createdAt: '',
  updatedAt: '',
})
export const namesByTeammateIdState = selectorFamily<string[], string[]>({
  key: key('namesByTeammateIdState'),
  get:
    (teammateIds) =>
    ({ get }) => {
      const teammates = get(teammatesState)
      return teammates
        .filter((t) => teammateIds.includes(t.id))
        .map((t) => t.name)
    },
})

const state = atomFamily<Teammate, string>({
  key: key('state'),
  default: initialTeammateStateValue(),
})
export const teammateState = selectorFamily<Teammate, string>({
  key: key('teammateState'),
  get:
    (teammateId) =>
    ({ get }) =>
      get(state(teammateId)),
  set:
    (teammateId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(state(teammateId))
        return
      }

      set(state(teammateId), newVal)
      set(teammatesState, (prev) =>
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

      if (get(teammateIdsState).find((teammateId) => teammateId === newVal.id))
        return
      set(teammateIdsState, (prev) => [...prev, newVal.id])
    },
})

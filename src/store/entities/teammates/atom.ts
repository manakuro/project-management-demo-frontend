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

export const defaultTeammateStateValue = (): Teammate => ({
  id: '',
  image: '',
  email: '',
  name: '',
})
const teammateState = atomFamily<Teammate, string>({
  key: key('teammateState'),
  default: defaultTeammateStateValue(),
})

export const teammateSelector = selectorFamily<Teammate, string>({
  key: key('teammateSelector'),
  get:
    (teammateId) =>
    ({ get }) =>
      get(teammateState(teammateId)),
  set:
    (teammateId) =>
    ({ get, set, reset }, newVal) => {
      if (newVal instanceof DefaultValue) {
        reset(teammateState(teammateId))
        return
      }

      set(teammateState(teammateId), newVal)
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

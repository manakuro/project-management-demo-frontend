import { selectorFamily } from 'recoil'
import { createState } from 'src/store/util'
import type { Teammate } from './type'

const key = (str: string) => `src/store/entities/teammate/${str}`

export const initialState = (): Teammate => ({
  id: '',
  image: '',
  email: '',
  name: '',
  createdAt: '',
  updatedAt: '',
})
export const {
  state: teammateState,
  listState: teammatesState,
  idsState: teammateIdsState,
} = createState({ key, initialState })

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

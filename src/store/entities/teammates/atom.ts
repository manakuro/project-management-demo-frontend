import { useCallback } from 'react'
import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
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

export const useTeammateCommand = () => {
  const setTeammatesFromResponse = useRecoilCallback(
    ({ set }) =>
      (teammates: (Teammate & { teammateId: string })[]) => {
        teammates
          .map<Teammate>((t) => ({
            id: t.teammateId,
            name: t.name,
            email: t.email,
            image: t.image,
          }))
          .forEach((p) => {
            set(teammateSelector(p.id), p)
          })
      },
    [],
  )

  return {
    setTeammatesFromResponse,
  }
}

export const useTeammates = () => {
  const teammateIds = useRecoilValue(teammateIdsState)
  const teammates = useRecoilValue(teammatesState)

  const getTeammatesById = useCallback(
    (teammateIds: string[]) => {
      return teammates.filter((t) => teammateIds.includes(t.id))
    },
    [teammates],
  )

  return {
    teammateIds,
    teammates,
    getTeammatesById,
  }
}

export const useTeammate = (teammateId?: string) => {
  const teammate = useRecoilValue(teammateSelector(teammateId || ''))

  const upsertTeammate = useRecoilCallback(
    ({ set }) =>
      (teammate: Teammate) => {
        set(teammateSelector(teammate.id), teammate)
      },
    [],
  )

  return {
    teammate,
    upsertTeammate,
  }
}

import {
  atomFamily,
  selectorFamily,
  useRecoilCallback,
  DefaultValue,
  atom,
  useRecoilValue,
} from 'recoil'
import { Teammate } from './type'
import { uniqBy } from 'src/shared/utils'
import { useCallback } from 'react'

export const teammateIdsState = atom<string[]>({
  key: 'teammateIdsState',
  default: [],
})
export const teammatesState = atom<Teammate[]>({
  key: 'teammatesState',
  default: [],
})

export const defaultTeammateStateValue = (): Teammate => ({
  id: '',
  image: '',
  email: '',
  name: '',
})
const teammateState = atomFamily<Teammate, string>({
  key: 'teammateState',
  default: defaultTeammateStateValue(),
})

export const teammateSelector = selectorFamily<Teammate, string>({
  key: 'teammateSelector',
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

export const useTeammates = () => {
  const teammateIds = useRecoilValue(teammateIdsState)
  const teammates = useRecoilValue(teammatesState)

  const setTeammates = useRecoilCallback(
    ({ set }) =>
      (teammates: Teammate[]) => {
        teammates.forEach((p) => {
          set(teammateSelector(p.id), p)
        })
      },
    [],
  )

  const getTeammatesById = useCallback(
    (teammateIds: string[]) => {
      return teammates.filter((t) => teammateIds.indexOf(t.id))
    },
    [teammates],
  )

  return {
    teammateIds,
    teammates,
    setTeammates,
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

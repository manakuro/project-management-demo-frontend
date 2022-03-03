import { useRecoilCallback } from 'recoil'
import { teammateState } from '../atom'
import { Teammate } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (teammate: Teammate) => {
        set(teammateState(teammate.id), teammate)
      },
    [],
  )

  return {
    upsert,
  }
}

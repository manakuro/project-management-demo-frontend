import { useRecoilCallback } from 'recoil'
import { teammateState } from '../atom'
import type { Teammate } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (input: Teammate) => {
        set(teammateState(input.id), (prev) => {
          return {
            ...prev,
            ...input,
          }
        })
      },
    [],
  )

  return {
    upsert,
  }
}

import { useRecoilCallback } from 'recoil'
import { meState } from '../atom'
import { Me } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (input: Me) => {
        set(meState, (prev) => ({
          ...prev,
          ...input,
        }))
      },
    [],
  )

  return {
    upsert,
  }
}

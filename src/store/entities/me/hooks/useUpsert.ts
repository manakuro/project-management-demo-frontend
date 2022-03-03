import { useRecoilCallback } from 'recoil'
import { meState } from '../atom'
import { Me } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: Me) => {
        set(meState, (prev) => ({
          ...prev,
          ...val,
        }))
      },
    [],
  )

  return {
    upsert,
  }
}

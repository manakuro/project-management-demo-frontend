import { useRecoilCallback } from 'recoil'
import { tabStatusState } from '../atom'
import { TeammateTaskTabStatus } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: Partial<TeammateTaskTabStatus>) => {
        set(tabStatusState, (prev) => ({
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

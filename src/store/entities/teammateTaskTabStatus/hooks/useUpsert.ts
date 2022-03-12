import { useRecoilCallback } from 'recoil'
import { tabStatusState } from '../atom'
import { TeammateTaskTabStatus } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (input: Partial<TeammateTaskTabStatus>) => {
        set(tabStatusState, (prev) => ({
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

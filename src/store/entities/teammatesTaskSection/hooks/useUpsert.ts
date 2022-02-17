import { useRecoilCallback } from 'recoil'
import { teammatesTaskSectionState } from '../atom'
import { TeammateTaskSection } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: TeammateTaskSection) => {
        set(teammatesTaskSectionState(val.id), val)
      },
    [],
  )

  return {
    upsert,
  }
}

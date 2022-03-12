import { useRecoilCallback } from 'recoil'
import { teammatesTaskSectionState } from '../atom'
import { TeammateTaskSection } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (input: TeammateTaskSection) => {
        set(teammatesTaskSectionState(input.id), input)
      },
    [],
  )

  return {
    upsert,
  }
}

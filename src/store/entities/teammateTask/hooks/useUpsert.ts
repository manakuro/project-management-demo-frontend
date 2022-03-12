import { useRecoilCallback } from 'recoil'
import { teammateTaskState } from '../atom'
import { TeammateTask } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (input: TeammateTask) => {
        set(teammateTaskState(input.id), input)
      },
    [],
  )

  return {
    upsert,
  }
}

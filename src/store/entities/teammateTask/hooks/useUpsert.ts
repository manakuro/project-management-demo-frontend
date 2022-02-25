import { useRecoilCallback } from 'recoil'
import { teammateTaskState } from '../atom'
import { TeammateTask } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: TeammateTask) => {
        set(teammateTaskState(val.id), val)
      },
    [],
  )

  return {
    upsert,
  }
}

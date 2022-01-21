import { useRecoilCallback } from 'recoil'
import { tabStatusState } from '../atom'
import { MyTasksTabStatus } from '../type'

export const useMyTasksTabStatusCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (val: Partial<MyTasksTabStatus>) => {
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

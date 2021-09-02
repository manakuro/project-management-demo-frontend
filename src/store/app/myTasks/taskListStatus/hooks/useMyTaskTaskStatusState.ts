import { useRecoilCallback, useRecoilValue } from 'recoil'
import { myTaskTaskStatusState } from '../atom'
import { TaskListStatus } from '../type'

export const useMyTaskTaskStatusState = () => {
  const state = useRecoilValue(myTaskTaskStatusState)
  const setTaskStatus = useRecoilCallback(
    ({ set }) =>
      (val: Partial<TaskListStatus>) => {
        set(myTaskTaskStatusState, (prev) => ({
          ...prev,
          ...val,
        }))
      },
    [],
  )

  return {
    state,
    setTaskStatus,
  }
}

import { useRecoilCallback, useRecoilValue } from 'recoil'
import { taskListStatusState } from '../atom'
import { TaskListStatus } from '../type'

export const useMyTaskTaskStatusState = () => {
  const state = useRecoilValue(taskListStatusState)
  const setTaskStatus = useRecoilCallback(
    ({ set }) =>
      (val: Partial<TaskListStatus>) => {
        set(taskListStatusState, (prev) => ({
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

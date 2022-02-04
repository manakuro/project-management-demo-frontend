import { useRecoilCallback } from 'recoil'
import { TeammateTaskListStatus } from 'src/store/app/myTasks/taskListStatus'
import { taskListStatusState } from '../atom'

export const useTaskListStatusCommand = () => {
  const setTaskListCompletedStatus = useRecoilCallback(
    ({ set }) =>
      (val: Partial<TeammateTaskListStatus['taskListCompletedStatus']>) => {
        set(taskListStatusState, (prev) => ({
          ...prev,
          taskListCompletedStatus: {
            ...prev.taskListCompletedStatus,
            ...val,
          },
        }))
      },
    [],
  )

  const setTaskListSortStatus = useRecoilCallback(
    ({ set }) =>
      (val: Partial<TeammateTaskListStatus['taskListSortStatus']>) => {
        set(taskListStatusState, (prev) => ({
          ...prev,
          taskListSortStatus: {
            ...prev.taskListSortStatus,
            ...val,
          },
        }))
      },
    [],
  )

  return {
    setTaskListCompletedStatus,
    setTaskListSortStatus,
  }
}

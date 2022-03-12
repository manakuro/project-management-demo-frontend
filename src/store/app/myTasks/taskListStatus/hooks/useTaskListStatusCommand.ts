import { useRecoilCallback } from 'recoil'
import { TeammateTaskListStatus } from 'src/store/app/myTasks/taskListStatus'
import { taskListStatusState } from '../atom'

export const useTaskListStatusCommand = () => {
  const setTaskListCompletedStatus = useRecoilCallback(
    ({ set }) =>
      (input: Partial<TeammateTaskListStatus['taskListCompletedStatus']>) => {
        set(taskListStatusState, (prev) => ({
          ...prev,
          taskListCompletedStatus: {
            ...prev.taskListCompletedStatus,
            ...input,
          },
        }))
      },
    [],
  )

  const setTaskListSortStatus = useRecoilCallback(
    ({ set }) =>
      (input: Partial<TeammateTaskListStatus['taskListSortStatus']>) => {
        set(taskListStatusState, (prev) => ({
          ...prev,
          taskListSortStatus: {
            ...prev.taskListSortStatus,
            ...input,
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

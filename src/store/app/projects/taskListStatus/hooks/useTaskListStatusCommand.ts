import { useRecoilCallback } from 'recoil'
import { ProjectTaskListStatus } from 'src/store/app/projects/taskListStatus'
import { taskListStatusState } from '../atom'

export const useTaskListStatusCommand = () => {
  const setTaskListCompletedStatus = useRecoilCallback(
    ({ set }) =>
      (val: Partial<ProjectTaskListStatus['taskListCompletedStatus']>) => {
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
      (val: Partial<ProjectTaskListStatus['taskListSortStatus']>) => {
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

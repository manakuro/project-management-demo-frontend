import { useRecoilCallback } from 'recoil'
import { ProjectTaskListStatus } from 'src/store/app/projects/taskListStatus'
import { taskListStatusState } from '../atom'

export const useTaskListStatusCommand = () => {
  const setTaskListCompletedStatus = useRecoilCallback(
    ({ set }) =>
      (input: Partial<ProjectTaskListStatus['taskListCompletedStatus']>) => {
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
      (input: Partial<ProjectTaskListStatus['taskListSortStatus']>) => {
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

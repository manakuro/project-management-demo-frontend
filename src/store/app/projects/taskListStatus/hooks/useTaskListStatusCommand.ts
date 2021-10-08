import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { TaskListStatus } from 'src/store/app/myTasks/taskListStatus'
import { taskListStatusState } from '../atom'
import { TaskListCompletedStatusType } from '../types'

export const useTaskListStatusCommand = () => {
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

  const onSetTaskListStatus = useCallback(
    (status: TaskListCompletedStatusType) => {
      setTaskStatus({ taskListCompletedStatus: status })
    },
    [setTaskStatus],
  )

  return {
    setTaskStatus,
    onSetTaskListStatus,
  }
}

import { useCallback } from 'react'
import { taskListStatues, TaskListStatuses } from '../atom'
import { TaskListStatusType } from '../types'
import { useMyTaskTaskStatusState } from './useMyTaskTaskStatusState'

export const useTaskListStatus = () => {
  const { setTaskStatus, state } = useMyTaskTaskStatusState()

  const isTaskListStatus = useCallback(
    (status: TaskListStatuses) =>
      state.taskListStatus === taskListStatues[status],
    [state.taskListStatus],
  )

  const onSetTaskListStatus = useCallback(
    (status: TaskListStatusType) => {
      setTaskStatus({ taskListStatus: status })
    },
    [setTaskStatus],
  )

  return {
    onSetTaskListStatus,
    isTaskListStatus,
  }
}

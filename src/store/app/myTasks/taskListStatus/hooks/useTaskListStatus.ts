import { useCallback } from 'react'
import { taskListCompletedStatues, TaskListCompletedStatuses } from '../atom'
import { TaskListCompletedStatusType } from '../types'
import { useMyTaskTaskStatusState } from './useMyTaskTaskStatusState'

export const useTaskListStatus = () => {
  const { setTaskStatus, state } = useMyTaskTaskStatusState()

  const isTaskListStatus = useCallback(
    (status: TaskListCompletedStatuses) =>
      state.taskListStatus === taskListCompletedStatues[status],
    [state.taskListStatus],
  )

  const onSetTaskListStatus = useCallback(
    (status: TaskListCompletedStatusType) => {
      setTaskStatus({ taskListStatus: status })
    },
    [setTaskStatus],
  )

  return {
    onSetTaskListStatus,
    isTaskListStatus,
  }
}

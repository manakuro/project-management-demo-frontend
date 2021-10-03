import { useCallback } from 'react'
import { taskListCompletedStatues, TaskListCompletedStatuses } from '../atom'
import { TaskListCompletedStatusType } from '../types'
import { useMyTaskTaskStatusState } from './useMyTaskTaskStatusState'

export const useTaskListStatus = () => {
  const { setTaskStatus, state } = useMyTaskTaskStatusState()

  const isTaskListStatus = useCallback(
    (status: TaskListCompletedStatuses) =>
      state.taskListCompletedStatus === taskListCompletedStatues[status],
    [state.taskListCompletedStatus],
  )

  const onSetTaskListStatus = useCallback(
    (status: TaskListCompletedStatusType) => {
      setTaskStatus({ taskListCompletedStatus: status })
    },
    [setTaskStatus],
  )

  return {
    onSetTaskListStatus,
    isTaskListStatus,
  }
}

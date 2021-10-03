import { useCallback } from 'react'
import { taskListStatues, TaskListStatuses } from '../atom'
import { TaskListStatusType } from '../types'
import { useProjectsTaskStatusState } from './useProjectsTaskStatusState'

export const useTaskListStatus = () => {
  const { setTaskStatus, state } = useProjectsTaskStatusState()

  const isTaskListStatus = useCallback(
    (status: TaskListStatuses) =>
      state.taskListCompletedStatus === taskListStatues[status],
    [state.taskListCompletedStatus],
  )

  const onSetTaskListStatus = useCallback(
    (status: TaskListStatusType) => {
      setTaskStatus({ taskListCompletedStatus: status })
    },
    [setTaskStatus],
  )

  return {
    onSetTaskListStatus,
    isTaskListStatus,
  }
}

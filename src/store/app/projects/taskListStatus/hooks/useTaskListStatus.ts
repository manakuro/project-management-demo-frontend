import { useCallback } from 'react'
import { taskListStatues, TaskListStatuses } from '../atom'
import { TaskListStatusType } from '../types'
import { useProjectsTaskStatusState } from './useProjectsTaskStatusState'

export const useTaskListStatus = () => {
  const { setTaskStatus, state } = useProjectsTaskStatusState()

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

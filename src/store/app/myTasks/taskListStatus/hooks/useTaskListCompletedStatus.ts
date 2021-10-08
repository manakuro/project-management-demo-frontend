import { useCallback } from 'react'
import { taskListCompletedStatues, TaskListCompletedStatuses } from '../atom'
import { TaskListCompletedStatusType } from '../types'
import { useTaskListStatus } from './useTaskListStatus'
import { useTaskListStatusCommand } from './useTaskListStatusCommand'

export const useTaskListCompletedStatus = () => {
  const { taskListStatus } = useTaskListStatus()
  const { setTaskStatus } = useTaskListStatusCommand()

  const isTaskListCompletedStatus = useCallback(
    (status: TaskListCompletedStatuses) =>
      taskListStatus.taskListCompletedStatus ===
      taskListCompletedStatues[status],
    [taskListStatus.taskListCompletedStatus],
  )

  const setTaskListCompletedStatus = useCallback(
    (status: TaskListCompletedStatusType) => {
      setTaskStatus({ taskListCompletedStatus: status })
    },
    [setTaskStatus],
  )

  return {
    isTaskListCompletedStatus,
    setTaskListCompletedStatus,
  }
}

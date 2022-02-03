import { useCallback } from 'react'
import { taskListCompletedStatues, TaskListCompletedStatuses } from '../atom'
import { TaskListCompletedStatusCodeValue } from '../types'
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
    (status: TaskListCompletedStatusCodeValue) => {
      setTaskStatus({ taskListCompletedStatus: status })
    },
    [setTaskStatus],
  )

  return {
    isTaskListCompletedStatus,
    setTaskListCompletedStatus,
  }
}

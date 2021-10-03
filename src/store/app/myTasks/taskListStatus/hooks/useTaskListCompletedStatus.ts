import { useCallback } from 'react'
import { taskListCompletedStatues, TaskListCompletedStatuses } from '../atom'
import { useTaskListStatus } from './useTaskListStatus'

export const useTaskListCompletedStatus = () => {
  const { taskListStatus } = useTaskListStatus()

  const isTaskListCompletedStatus = useCallback(
    (status: TaskListCompletedStatuses) =>
      taskListStatus.taskListCompletedStatus ===
      taskListCompletedStatues[status],
    [taskListStatus.taskListCompletedStatus],
  )

  return {
    isTaskListCompletedStatus,
  }
}

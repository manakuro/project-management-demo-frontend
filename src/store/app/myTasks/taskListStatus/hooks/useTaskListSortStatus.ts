import { useCallback } from 'react'
import { TaskListSortStatuses, taskListSortStatues } from '../atom'
import { TaskListSortStatusType } from '../types'
import { useTaskListStatus } from './useTaskListStatus'
import { useTaskListStatusCommand } from './useTaskListStatusCommand'

export const useTaskListSortStatus = () => {
  const { setTaskStatus } = useTaskListStatusCommand()
  const { taskListStatus } = useTaskListStatus()

  const isSorted = useCallback(
    (status: TaskListSortStatuses) =>
      taskListStatus.taskListSortStatus === taskListSortStatues[status],
    [taskListStatus.taskListSortStatus],
  )
  const isSortStatusKey = useCallback(
    (val: any): val is TaskListSortStatuses => typeof val === 'string',
    [],
  )

  const onSort = useCallback(
    (status: TaskListSortStatusType | TaskListSortStatuses) => {
      const val = isSortStatusKey(status) ? taskListSortStatues[status] : status
      setTaskStatus({ taskListSortStatus: val })
    },
    [setTaskStatus, isSortStatusKey],
  )

  return {
    onSort,
    isSorted,
  }
}

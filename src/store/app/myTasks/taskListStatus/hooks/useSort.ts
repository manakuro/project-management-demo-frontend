import { useCallback } from 'react'
import { TaskListSortStatuses, taskListSortStatues } from '../atom'
import { TaskListSortStatusType } from '../types'
import { useMyTaskTaskStatusState } from './useMyTaskTaskStatusState'

export const useSort = () => {
  const { setTaskStatus, state } = useMyTaskTaskStatusState()
  const isSorted = useCallback(
    (status: TaskListSortStatuses) =>
      state.taskListSortStatus === taskListSortStatues[status],
    [state.taskListSortStatus],
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

import { useCallback } from 'react'
import { SortStatuses, sortStatues } from '../atom'
import { TaskListSortStatusType } from '../types'
import { useProjectsTaskStatusState } from './useProjectsTaskStatusState'

export const useSort = () => {
  const { setTaskStatus, state } = useProjectsTaskStatusState()
  const isSorted = useCallback(
    (status: SortStatuses) => state.sortStatus === sortStatues[status],
    [state.sortStatus],
  )
  const isSortStatusKey = useCallback(
    (val: any): val is SortStatuses => typeof val === 'string',
    [],
  )

  const onSort = useCallback(
    (status: TaskListSortStatusType | SortStatuses) => {
      const val = isSortStatusKey(status) ? sortStatues[status] : status
      setTaskStatus({ sortStatus: val })
    },
    [setTaskStatus, isSortStatusKey],
  )

  return {
    onSort,
    isSorted,
  }
}

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

  const sortBy = useCallback(
    (status: TaskListSortStatusType | TaskListSortStatuses) => {
      const val = isSortStatusKey(status) ? taskListSortStatues[status] : status
      setTaskStatus({ taskListSortStatus: val })
    },
    [setTaskStatus, isSortStatusKey],
  )

  const sortByNone = useCallback(() => {
    sortBy('none')
  }, [sortBy])

  const sortByAlphabetical = useCallback(() => {
    sortBy('alphabetical')
  }, [sortBy])

  const sortByLikes = useCallback(() => {
    sortBy('likes')
  }, [sortBy])

  const sortByDueDate = useCallback(() => {
    sortBy('dueDate')
  }, [sortBy])

  return {
    sortBy,
    isSorted,
    sortByNone,
    sortByAlphabetical,
    sortByLikes,
    sortByDueDate,
  }
}

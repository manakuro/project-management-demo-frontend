import { useCallback } from 'react'
import { TaskListSortStatuses, taskListSortStatues } from '../atom'
import { TaskListSortStatusCodeValue } from '../types'
import { useTaskListStatus } from './useTaskListStatus'
import { useTaskListStatusCommand } from './useTaskListStatusCommand'

export const useTaskListSortStatus = () => {
  const { setTaskListSortStatus } = useTaskListStatusCommand()
  const { taskListStatus } = useTaskListStatus()

  const isSorted = useCallback(
    (status: TaskListSortStatuses) =>
      taskListStatus.taskListSortStatus.statusCode ===
      taskListSortStatues[status],
    [taskListStatus.taskListSortStatus],
  )
  const isSortStatusKey = useCallback(
    (val: any): val is TaskListSortStatuses => typeof val === 'string',
    [],
  )

  const sortBy = useCallback(
    (status: TaskListSortStatusCodeValue | TaskListSortStatuses) => {
      const val = isSortStatusKey(status) ? taskListSortStatues[status] : status
      setTaskListSortStatus({ statusCode: val })
    },
    [setTaskListSortStatus, isSortStatusKey],
  )

  const sortByProject = useCallback(() => {
    sortBy('project')
  }, [sortBy])

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
    sortByProject,
    sortByNone,
    sortByAlphabetical,
    sortByLikes,
    sortByDueDate,
  }
}

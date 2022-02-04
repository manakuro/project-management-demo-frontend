import { useCallback } from 'react'
import { TaskListSortStatuses, taskListSortStatues } from '../atom'
import { TaskListSortStatusCodeValue } from '../types'
import { useTaskListStatus } from './useTaskListStatus'
import { useTaskListStatusCommand } from './useTaskListStatusCommand'

const isSortStatusKey = (val: any): val is TaskListSortStatuses =>
  typeof val === 'string'

export const useTaskListSortStatus = () => {
  const { setTaskListSortStatus } = useTaskListStatusCommand()
  const { taskListStatus } = useTaskListStatus()

  const isSorted = useCallback(
    (status: TaskListSortStatuses) =>
      taskListStatus.taskListSortStatus.statusCode ===
      taskListSortStatues[status],
    [taskListStatus.taskListSortStatus],
  )

  const sortBy = useCallback(
    (status: TaskListSortStatusCodeValue | TaskListSortStatuses) => {
      const val = isSortStatusKey(status) ? taskListSortStatues[status] : status
      setTaskListSortStatus({ statusCode: val })
    },
    [setTaskListSortStatus],
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

  const sortByAssignee = useCallback(() => {
    sortBy('assignee')
  }, [sortBy])

  const sortByPriority = useCallback(() => {
    sortBy('priority')
  }, [sortBy])

  return {
    sortBy,
    isSorted,
    sortByNone,
    sortByAlphabetical,
    sortByLikes,
    sortByDueDate,
    sortByAssignee,
    sortByPriority,
  }
}

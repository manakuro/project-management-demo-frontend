import { useCallback } from 'react'
import { TaskListSortStatusCode } from 'src/store/entities/taskListSortStatus'
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

  const sortBy = useCallback(
    (status: TaskListSortStatusCodeValue) => {
      setTaskListSortStatus({ statusCode: status })
    },
    [setTaskListSortStatus],
  )

  const sortByNone = useCallback(() => {
    sortBy(TaskListSortStatusCode.None)
  }, [sortBy])

  const sortByAlphabetical = useCallback(() => {
    sortBy(TaskListSortStatusCode.Alphabetical)
  }, [sortBy])

  const sortByLikes = useCallback(() => {
    sortBy(TaskListSortStatusCode.Likes)
  }, [sortBy])

  const sortByDueDate = useCallback(() => {
    sortBy(TaskListSortStatusCode.DueDate)
  }, [sortBy])

  const sortByAssignee = useCallback(() => {
    sortBy(TaskListSortStatusCode.Assignee)
  }, [sortBy])

  const sortByPriority = useCallback(() => {
    sortBy(TaskListSortStatusCode.Priority)
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

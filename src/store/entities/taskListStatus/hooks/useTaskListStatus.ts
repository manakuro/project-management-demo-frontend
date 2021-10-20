import { useCallback } from 'react'
import {
  TASK_LIST_SORT_STATUS_TYPE_NONE,
  TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  TASK_LIST_SORT_STATUS_TYPE_LIKES,
  TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  TASK_LIST_SORT_STATUS_TYPE_PROJECT,
  TASK_LIST_SORT_STATUS_TYPE_ASSIGNEE,
  TaskListSortStatusType,
  TaskListCompletedStatusType,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED,
  TASK_LIST_COMPLETED_STATUS_TYPE_ALL,
  TASK_LIST_COMPLETED_STATUS_TYPE_INCOMPLETE,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_1_WEEK,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_2_WEEKS,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_3_WEEKS,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_TODAY,
  TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_YESTERDAY,
  TASK_LIST_SORT_STATUS_TYPE_PRIORITY,
  TASK_LIST_SORT_STATUS_TYPE_CREATION_TIME,
} from '../types'

const isSortedBy = (
  status: TaskListSortStatusType,
  targetStatus: TaskListSortStatusType,
) => status === targetStatus

const isCompleted = (
  status: TaskListCompletedStatusType,
  targetStatus: TaskListCompletedStatusType,
) => status === targetStatus

export const useTaskListStatus = () => {
  const isSortedByNone = useCallback(
    (status: TaskListSortStatusType) =>
      isSortedBy(status, TASK_LIST_SORT_STATUS_TYPE_NONE),
    [],
  )
  const isSortedByDueDate = useCallback(
    (status: TaskListSortStatusType) =>
      isSortedBy(status, TASK_LIST_SORT_STATUS_TYPE_DUE_DATE),
    [],
  )
  const isSortedByLikes = useCallback(
    (status: TaskListSortStatusType) =>
      isSortedBy(status, TASK_LIST_SORT_STATUS_TYPE_LIKES),
    [],
  )
  const isSortedByAlphabetical = useCallback(
    (status: TaskListSortStatusType) =>
      isSortedBy(status, TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL),
    [],
  )
  const isSortedByProject = useCallback(
    (status: TaskListSortStatusType) =>
      isSortedBy(status, TASK_LIST_SORT_STATUS_TYPE_PROJECT),
    [],
  )
  const isSortedByAssignee = useCallback(
    (status: TaskListSortStatusType) =>
      isSortedBy(status, TASK_LIST_SORT_STATUS_TYPE_ASSIGNEE),
    [],
  )
  const isSortedByPriority = useCallback(
    (status: TaskListSortStatusType) =>
      isSortedBy(status, TASK_LIST_SORT_STATUS_TYPE_PRIORITY),
    [],
  )
  const isSortedByCreationTime = useCallback(
    (status: TaskListSortStatusType) =>
      isSortedBy(status, TASK_LIST_SORT_STATUS_TYPE_CREATION_TIME),
    [],
  )

  const isTaskListCompletedAll = useCallback(
    (status: TaskListCompletedStatusType) =>
      isCompleted(status, TASK_LIST_COMPLETED_STATUS_TYPE_ALL),
    [],
  )
  const isTaskListInComplete = useCallback(
    (status: TaskListCompletedStatusType) =>
      isCompleted(status, TASK_LIST_COMPLETED_STATUS_TYPE_INCOMPLETE),
    [],
  )
  const isTaskListCompleted1Week = useCallback(
    (status: TaskListCompletedStatusType) =>
      isCompleted(status, TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_1_WEEK),
    [],
  )
  const isTaskListCompleted2Weeks = useCallback(
    (status: TaskListCompletedStatusType) =>
      isCompleted(status, TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_2_WEEKS),
    [],
  )
  const isTaskListCompleted3Weeks = useCallback(
    (status: TaskListCompletedStatusType) =>
      isCompleted(status, TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_3_WEEKS),
    [],
  )
  const isTaskListCompletedToday = useCallback(
    (status: TaskListCompletedStatusType) =>
      isCompleted(status, TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_TODAY),
    [],
  )
  const isTaskListCompletedYesterday = useCallback(
    (status: TaskListCompletedStatusType) =>
      isCompleted(status, TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_YESTERDAY),
    [],
  )
  const isTaskListCompleted = useCallback(
    (status: TaskListCompletedStatusType) =>
      isCompleted(status, TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED),
    [],
  )

  return {
    isSortedByNone,
    isSortedByDueDate,
    isSortedByLikes,
    isSortedByAlphabetical,
    isSortedByProject,
    isSortedByAssignee,
    isSortedByPriority,
    isSortedByCreationTime,
    isTaskListCompleted,
    isTaskListCompletedAll,
    isTaskListInComplete,
    isTaskListCompleted1Week,
    isTaskListCompleted2Weeks,
    isTaskListCompleted3Weeks,
    isTaskListCompletedToday,
    isTaskListCompletedYesterday,
  }
}

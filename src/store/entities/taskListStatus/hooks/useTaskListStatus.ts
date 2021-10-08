import { useCallback } from 'react'
import {
  TASK_LIST_SORT_STATUS_TYPE_NONE,
  TASK_LIST_SORT_STATUS_TYPE_DUE_DATE,
  TASK_LIST_SORT_STATUS_TYPE_LIKES,
  TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL,
  TASK_LIST_SORT_STATUS_TYPE_PROJECT,
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
} from '../types'

const isSort = (
  status: TaskListSortStatusType,
  targetStatus: TaskListSortStatusType,
) => status === targetStatus

const isCompleted = (
  status: TaskListCompletedStatusType,
  targetStatus: TaskListCompletedStatusType,
) => status === targetStatus

export const useTaskListStatus = () => {
  const isSortNone = useCallback(
    (status: TaskListSortStatusType) =>
      isSort(status, TASK_LIST_SORT_STATUS_TYPE_NONE),
    [],
  )
  const isSortDueDate = useCallback(
    (status: TaskListSortStatusType) =>
      isSort(status, TASK_LIST_SORT_STATUS_TYPE_DUE_DATE),
    [],
  )
  const isSortLikes = useCallback(
    (status: TaskListSortStatusType) =>
      isSort(status, TASK_LIST_SORT_STATUS_TYPE_LIKES),
    [],
  )
  const isSortAlphabetical = useCallback(
    (status: TaskListSortStatusType) =>
      isSort(status, TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL),
    [],
  )
  const isSortProject = useCallback(
    (status: TaskListSortStatusType) =>
      isSort(status, TASK_LIST_SORT_STATUS_TYPE_PROJECT),
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
    isSortNone,
    isSortDueDate,
    isSortLikes,
    isSortAlphabetical,
    isSortProject,
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

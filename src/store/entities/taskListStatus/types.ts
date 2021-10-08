export const TASK_LIST_COMPLETED_STATUS_TYPE_INCOMPLETE = 1 as const
export const TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED = 10 as const
export const TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_TODAY = 11 as const
export const TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_YESTERDAY = 12 as const
export const TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_1_WEEK = 13 as const
export const TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_2_WEEKS = 14 as const
export const TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_3_WEEKS = 15 as const
export const TASK_LIST_COMPLETED_STATUS_TYPE_ALL = 2 as const

export type TaskListCompletedStatusType =
  | typeof TASK_LIST_COMPLETED_STATUS_TYPE_INCOMPLETE
  | typeof TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED
  | typeof TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_TODAY
  | typeof TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_YESTERDAY
  | typeof TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_1_WEEK
  | typeof TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_2_WEEKS
  | typeof TASK_LIST_COMPLETED_STATUS_TYPE_COMPLETED_3_WEEKS
  | typeof TASK_LIST_COMPLETED_STATUS_TYPE_ALL

export const TASK_LIST_SORT_STATUS_TYPE_NONE = 1 as const
export const TASK_LIST_SORT_STATUS_TYPE_DUE_DATE = 2 as const
export const TASK_LIST_SORT_STATUS_TYPE_LIKES = 3 as const
export const TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL = 4 as const
export const TASK_LIST_SORT_STATUS_TYPE_PROJECT = 5 as const

export type TaskListSortStatusType =
  | typeof TASK_LIST_SORT_STATUS_TYPE_NONE
  | typeof TASK_LIST_SORT_STATUS_TYPE_DUE_DATE
  | typeof TASK_LIST_SORT_STATUS_TYPE_LIKES
  | typeof TASK_LIST_SORT_STATUS_TYPE_ALPHABETICAL
  | typeof TASK_LIST_SORT_STATUS_TYPE_PROJECT

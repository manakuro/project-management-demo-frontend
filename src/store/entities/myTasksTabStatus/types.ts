export const TASK_TAB_STATUS_TYPE_LIST = 1 as const
export const TASK_TAB_STATUS_TYPE_BOARD = 2 as const
export const TASK_TAB_STATUS_TYPE_CALENDAR = 3 as const
export const TASK_TAB_STATUS_TYPE_FILES = 4 as const

export type TaskTabStatusType =
  | typeof TASK_TAB_STATUS_TYPE_LIST
  | typeof TASK_TAB_STATUS_TYPE_BOARD
  | typeof TASK_TAB_STATUS_TYPE_CALENDAR
  | typeof TASK_TAB_STATUS_TYPE_FILES

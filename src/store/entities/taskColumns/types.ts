export const TASK_COLUMN_TYPE_FIELD_NAME = 1 as const
export const TASK_COLUMN_TYPE_ASSIGNMENT = 2 as const
export const TASK_COLUMN_TYPE_DUE_DATE = 3 as const
export const TASK_COLUMN_TYPE_PROJECT = 4 as const
export const TASK_COLUMN_TYPE_TAGS = 5 as const
export const TASK_COLUMN_TYPE_PRIORITY = 6 as const
export const TASK_COLUMN_TYPE_CUSTOM = 99 as const

export type TaskColumnType =
  | typeof TASK_COLUMN_TYPE_FIELD_NAME
  | typeof TASK_COLUMN_TYPE_ASSIGNMENT
  | typeof TASK_COLUMN_TYPE_DUE_DATE
  | typeof TASK_COLUMN_TYPE_PROJECT
  | typeof TASK_COLUMN_TYPE_TAGS
  | typeof TASK_COLUMN_TYPE_PRIORITY
  | typeof TASK_COLUMN_TYPE_CUSTOM

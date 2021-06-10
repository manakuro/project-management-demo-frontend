export const TASK_COLUMN_TYPE_MY_TASK = 1 as const
export const ATTACHMENT_TYPE_PROJECT = 2 as const

export type TaskColumnType =
  | typeof TASK_COLUMN_TYPE_MY_TASK
  | typeof ATTACHMENT_TYPE_PROJECT

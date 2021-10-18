export const TASKS_PRIORITY_TYPE_NONE = 0 as const
export const TASKS_PRIORITY_TYPE_LOW = 1 as const
export const TASKS_PRIORITY_TYPE_MEDIUM = 2 as const
export const TASKS_PRIORITY_TYPE_HIGH = 3 as const

export type TasksPriorityTypes =
  | typeof TASKS_PRIORITY_TYPE_NONE
  | typeof TASKS_PRIORITY_TYPE_LOW
  | typeof TASKS_PRIORITY_TYPE_MEDIUM
  | typeof TASKS_PRIORITY_TYPE_HIGH

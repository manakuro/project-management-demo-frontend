export const ACTIVITY_TYPE_TASK = 1 as const
export const ACTIVITY_TYPE_WORKSPACE = 2 as const

export type ActivityTypes =
  | typeof ACTIVITY_TYPE_TASK
  | typeof ACTIVITY_TYPE_WORKSPACE

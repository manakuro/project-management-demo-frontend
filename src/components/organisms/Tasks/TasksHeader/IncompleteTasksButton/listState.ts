export const INCOMPLETE_TASKS = '1' as const
export const ALL_TASKS = '3' as const
export const ALL_COMPLETED_TASKS = '4' as const
export const TODAY = '5' as const
export const YESTERDAY = '6' as const
export const ONE_WEEK = '7' as const
export const TWO_WEEK = '8' as const
export const THREE_WEEK = '9' as const

export type ListStatus =
  | typeof INCOMPLETE_TASKS
  | typeof ALL_TASKS
  | typeof ALL_COMPLETED_TASKS
  | typeof TODAY
  | typeof YESTERDAY
  | typeof ONE_WEEK
  | typeof TWO_WEEK
  | typeof THREE_WEEK

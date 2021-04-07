export const BACKLOG = '1' as const
export const READY = '2' as const
export const IN_PROGRESS = '3' as const
export const IN_REVIEW = '4' as const
export const DONE = '5' as const

export type ListStatus =
  | typeof BACKLOG
  | typeof READY
  | typeof IN_PROGRESS
  | typeof IN_REVIEW
  | typeof DONE

export const NONE = '1' as const
export const PROJECT = '2' as const
export const DUE_DATE = '3' as const
export const LIKES = '4' as const

export type ListStatus =
  | typeof NONE
  | typeof PROJECT
  | typeof DUE_DATE
  | typeof LIKES

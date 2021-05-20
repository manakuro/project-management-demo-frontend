export const FEED_TYPE_IMAGE = 1 as const
export const FEED_TYPE_PDF = 2 as const
export const FEED_TYPE_TEXT = 3 as const

export type FeedType =
  | typeof FEED_TYPE_IMAGE
  | typeof FEED_TYPE_PDF
  | typeof FEED_TYPE_TEXT

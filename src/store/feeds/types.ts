export const FEED_TYPE_TEXT = 1 as const
export const FEED_TYPE_ATTACHMENT = 2 as const

export type FeedType = typeof FEED_TYPE_TEXT | typeof FEED_TYPE_ATTACHMENT

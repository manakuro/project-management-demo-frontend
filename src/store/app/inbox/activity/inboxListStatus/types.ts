export const INBOX_LIST_FILTER_STATUS_TYPE_ALL = 1 as const
export const INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_TO_ME = 2 as const
export const INBOX_LIST_FILTER_STATUS_TYPE_MENTIONED = 3 as const
export const INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_BY_ME = 4 as const
export const INBOX_LIST_FILTER_STATUS_TYPE_UNREAD_ONLY = 5 as const

export type InboxListFilterStatuses =
  | typeof INBOX_LIST_FILTER_STATUS_TYPE_ALL
  | typeof INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_TO_ME
  | typeof INBOX_LIST_FILTER_STATUS_TYPE_MENTIONED
  | typeof INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_BY_ME
  | typeof INBOX_LIST_FILTER_STATUS_TYPE_UNREAD_ONLY
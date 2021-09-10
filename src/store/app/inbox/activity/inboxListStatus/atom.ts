import { atom, selectorFamily } from 'recoil'
import { InboxListStatus } from './type'
import {
  INBOX_LIST_SORT_STATUS_TYPE_ALL,
  INBOX_LIST_SORT_STATUS_TYPE_ASSIGNED_BY_ME,
  INBOX_LIST_SORT_STATUS_TYPE_ASSIGNED_TO_ME,
  INBOX_LIST_SORT_STATUS_TYPE_MENTIONED,
  INBOX_LIST_SORT_STATUS_TYPE_UNREAD_ONLY,
} from './types'

const key = (str: string) => `src/store/app/inbox/inboxListStatus/${str}`

export const inboxStatusState = atom<InboxListStatus>({
  key: key('inboxStatusState'),
  default: {
    id: '',
    teammateId: '',
    sortStatus: 1,
    createdAt: '',
    updatedAt: '',
  },
})

export const isSortStatus = selectorFamily<boolean, SortStatuses>({
  key: key('isSortStatus'),
  get:
    (key) =>
    ({ get }) => {
      const inboxStatus = get(inboxStatusState)
      return inboxStatus.sortStatus === sortStatues[key]
    },
})

export const sortStatues = {
  all: INBOX_LIST_SORT_STATUS_TYPE_ALL,
  assignedToMe: INBOX_LIST_SORT_STATUS_TYPE_ASSIGNED_TO_ME,
  mentioned: INBOX_LIST_SORT_STATUS_TYPE_MENTIONED,
  assignedByMe: INBOX_LIST_SORT_STATUS_TYPE_ASSIGNED_BY_ME,
  unreadOnly: INBOX_LIST_SORT_STATUS_TYPE_UNREAD_ONLY,
} as const
export type SortStatuses = keyof typeof sortStatues

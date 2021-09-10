import { atom, selectorFamily } from 'recoil'
import { InboxListStatus } from './type'
import {
  INBOX_LIST_FILTER_STATUS_TYPE_ALL,
  INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_BY_ME,
  INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_TO_ME,
  INBOX_LIST_FILTER_STATUS_TYPE_MENTIONED,
  INBOX_LIST_FILTER_STATUS_TYPE_UNREAD_ONLY,
} from './types'

const key = (str: string) => `src/store/app/inbox/inboxListStatus/${str}`

export const inboxStatusState = atom<InboxListStatus>({
  key: key('inboxStatusState'),
  default: {
    id: '',
    teammateId: '',
    filterStatus: 1,
    createdAt: '',
    updatedAt: '',
  },
})

export const isFilterStatus = selectorFamily<boolean, FilterStatuses>({
  key: key('isFilterStatus'),
  get:
    (key) =>
    ({ get }) => {
      const inboxStatus = get(inboxStatusState)
      return inboxStatus.filterStatus === filterStatues[key]
    },
})

export const filterStatues = {
  all: INBOX_LIST_FILTER_STATUS_TYPE_ALL,
  assignedToMe: INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_TO_ME,
  mentioned: INBOX_LIST_FILTER_STATUS_TYPE_MENTIONED,
  assignedByMe: INBOX_LIST_FILTER_STATUS_TYPE_ASSIGNED_BY_ME,
  unreadOnly: INBOX_LIST_FILTER_STATUS_TYPE_UNREAD_ONLY,
} as const
export type FilterStatuses = keyof typeof filterStatues

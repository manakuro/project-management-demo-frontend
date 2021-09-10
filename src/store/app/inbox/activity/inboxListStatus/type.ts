import { InboxListSortStatuses } from './types'

export type InboxListStatus = {
  id: string
  teammateId: string
  sortStatus: InboxListSortStatuses
  createdAt: string
  updatedAt: string
}

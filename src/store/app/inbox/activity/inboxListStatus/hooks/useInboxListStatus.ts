import { useCallback } from 'react'
import { useRecoilValue } from 'recoil'
import { inboxStatusState, sortStatues, SortStatuses } from '../atom'
import { InboxListSortStatuses } from '../types'
import { useInboxListStatusCommand } from './useInboxListStatusCommand'

const isSortStatusKey = (val: any): val is SortStatuses =>
  typeof val === 'string'

export const useInboxListStatus = () => {
  const { sortStatus } = useRecoilValue(inboxStatusState)
  const { upsert } = useInboxListStatusCommand()

  const isSorted = useCallback(
    (status: SortStatuses) => sortStatus === sortStatues[status],
    [sortStatus],
  )

  const onSort = useCallback(
    (status: InboxListSortStatuses | SortStatuses) => {
      const val = isSortStatusKey(status) ? sortStatues[status] : status
      upsert({ sortStatus: val })
    },
    [upsert],
  )

  return {
    sortStatus,
    isSorted,
    onSort,
  }
}

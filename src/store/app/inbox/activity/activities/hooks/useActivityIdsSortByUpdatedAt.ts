import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { activityIdsSortByUpdatedAtSelector } from '../atom'

export const useActivityIdsSortByUpdatedAt = () => {
  const ids = useRecoilValue(activityIdsSortByUpdatedAtSelector)
  const activityIds = useMemo(() => ids, [ids])

  return {
    activityIds,
  }
}

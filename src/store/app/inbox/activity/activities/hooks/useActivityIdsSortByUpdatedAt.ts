import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { activityIdsSortByUpdatedAtState } from '../atom'

export const useActivityIdsSortByUpdatedAt = () => {
  const ids = useRecoilValue(activityIdsSortByUpdatedAtState)
  const activityIds = useMemo(() => ids, [ids])

  return {
    activityIds,
  }
}

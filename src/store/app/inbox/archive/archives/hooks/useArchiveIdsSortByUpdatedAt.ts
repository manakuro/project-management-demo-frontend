import { useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { archiveIdsSortByUpdatedAtSelector } from '../atom'

export const useArchiveIdsSortByUpdatedAt = () => {
  const ids = useRecoilValue(archiveIdsSortByUpdatedAtSelector)
  const archiveIds = useMemo(() => ids, [ids])

  return {
    archiveIds,
  }
}

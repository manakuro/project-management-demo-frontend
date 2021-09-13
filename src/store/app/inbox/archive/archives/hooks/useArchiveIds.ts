import { useRecoilValue } from 'recoil'
import { archiveIdsState } from '../atom'

export const useArchiveIds = () => {
  const archiveIds = useRecoilValue(archiveIdsState)

  return {
    archiveIds,
  }
}

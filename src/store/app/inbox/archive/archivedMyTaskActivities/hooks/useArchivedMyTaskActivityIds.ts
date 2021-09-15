import { useRecoilValue } from 'recoil'
import { archivedMyTaskActivityIdsState } from '../atom'

export const useArchivedMyTaskActivityIds = () => {
  const archivedMyTaskActivityIds = useRecoilValue(
    archivedMyTaskActivityIdsState,
  )

  return {
    archivedMyTaskActivityIds,
  }
}

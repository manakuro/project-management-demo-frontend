import { useRecoilValue } from 'recoil'
import { archivedTaskActivityIdsState } from '../atom'

export const useArchivedTaskActivityIds = () => {
  const archivedTaskActivityIds = useRecoilValue(archivedTaskActivityIdsState)

  return {
    archivedTaskActivityIds,
  }
}

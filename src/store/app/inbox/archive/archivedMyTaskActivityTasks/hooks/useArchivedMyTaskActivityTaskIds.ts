import { useRecoilValue } from 'recoil'
import { archivedMyTaskActivityTaskIdsState } from '../atom'

export const useArchivedMyTaskActivityTaskIds = () => {
  const archivedMyTaskActivityTaskIds = useRecoilValue(
    archivedMyTaskActivityTaskIdsState,
  )

  return {
    archivedMyTaskActivityTaskIds,
  }
}

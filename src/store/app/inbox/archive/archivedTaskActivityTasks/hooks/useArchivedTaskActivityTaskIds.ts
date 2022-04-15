import { useRecoilValue } from 'recoil'
import { archivedMyTaskActivityTaskIdsState } from '../atom'

export const useArchivedTaskActivityTaskIds = () => {
  const archivedTaskActivityTaskIds = useRecoilValue(
    archivedMyTaskActivityTaskIdsState,
  )

  return {
    archivedTaskActivityTaskIds,
  }
}

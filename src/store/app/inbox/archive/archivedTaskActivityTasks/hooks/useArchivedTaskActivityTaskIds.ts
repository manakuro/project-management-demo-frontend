import { useRecoilValue } from 'recoil'
import { archivedTaskActivityTaskIdsState } from '../atom'

export const useArchivedTaskActivityTaskIds = () => {
  const archivedTaskActivityTaskIds = useRecoilValue(
    archivedTaskActivityTaskIdsState,
  )

  return {
    archivedTaskActivityTaskIds,
  }
}

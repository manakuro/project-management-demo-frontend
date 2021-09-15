import { useRecoilValue } from 'recoil'
import { archivedMyTaskActivityTaskSelector } from '../atom'

export const useArchivedMyTaskActivityTask = (
  archivedMyTaskActivityTaskId: string,
) => {
  const archivedMyTaskActivityTask = useRecoilValue(
    archivedMyTaskActivityTaskSelector(archivedMyTaskActivityTaskId),
  )

  return {
    archivedMyTaskActivityTask,
  }
}

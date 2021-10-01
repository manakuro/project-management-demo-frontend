import { useRecoilValue } from 'recoil'
import { archivedMyTaskActivityTaskState } from '../atom'

export const useArchivedMyTaskActivityTask = (
  archivedMyTaskActivityTaskId: string,
) => {
  const archivedMyTaskActivityTask = useRecoilValue(
    archivedMyTaskActivityTaskState(archivedMyTaskActivityTaskId),
  )

  return {
    archivedMyTaskActivityTask,
  }
}

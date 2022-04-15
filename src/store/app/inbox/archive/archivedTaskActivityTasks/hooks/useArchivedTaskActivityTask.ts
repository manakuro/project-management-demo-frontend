import { useRecoilValue } from 'recoil'
import { archivedMyTaskActivityTaskState } from '../atom'

export const useArchivedTaskActivityTask = (
  archivedTaskActivityTaskId: string,
) => {
  const archivedTaskActivityTask = useRecoilValue(
    archivedMyTaskActivityTaskState(archivedTaskActivityTaskId),
  )

  return {
    archivedTaskActivityTask,
  }
}

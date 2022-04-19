import { useRecoilValue } from 'recoil'
import { archivedTaskActivityTaskState } from '../atom'

export const useArchivedTaskActivityTask = (
  archivedTaskActivityTaskId: string,
) => {
  const archivedTaskActivityTask = useRecoilValue(
    archivedTaskActivityTaskState(archivedTaskActivityTaskId),
  )

  return {
    archivedTaskActivityTask,
  }
}

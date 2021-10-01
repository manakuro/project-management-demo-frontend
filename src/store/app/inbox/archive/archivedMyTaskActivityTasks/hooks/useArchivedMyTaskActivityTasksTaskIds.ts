import { useRecoilValue } from 'recoil'
import { taskIdsByArchivedMyTaskActivityIdState } from '../atom'

export const useArchivedMyTaskActivityTasksTaskIds = (
  archivedMyTaskActivityId: string,
) => {
  const taskIds = useRecoilValue(
    taskIdsByArchivedMyTaskActivityIdState(archivedMyTaskActivityId),
  )

  return {
    taskIds,
  }
}

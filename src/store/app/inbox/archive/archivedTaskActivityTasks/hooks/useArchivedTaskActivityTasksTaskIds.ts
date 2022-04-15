import { useRecoilValue } from 'recoil'
import { taskIdsByArchivedMyTaskActivityIdState } from '../atom'

export const useArchivedTaskActivityTasksTaskIds = (
  archivedTaskActivityId: string,
) => {
  const taskIds = useRecoilValue(
    taskIdsByArchivedMyTaskActivityIdState(archivedTaskActivityId),
  )

  return {
    taskIds,
  }
}

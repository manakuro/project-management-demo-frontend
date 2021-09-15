import { useRecoilValue } from 'recoil'
import { taskIdsByArchivedMyTaskActivityIdSelector } from '../atom'

export const useArchivedMyTaskActivityTasksTaskIds = (
  archivedMyTaskActivityId: string,
) => {
  const taskIds = useRecoilValue(
    taskIdsByArchivedMyTaskActivityIdSelector(archivedMyTaskActivityId),
  )

  return {
    taskIds,
  }
}

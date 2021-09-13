import { useRecoilValue } from 'recoil'
import { taskIdsByArchivedWorkspaceActivityIdSelector } from '../atom'

export const useArchivedWorkspaceActivityTasksTaskIds = (
  archivedWorkspaceActivityId: string,
) => {
  const taskIds = useRecoilValue(
    taskIdsByArchivedWorkspaceActivityIdSelector(archivedWorkspaceActivityId),
  )

  return {
    taskIds,
  }
}

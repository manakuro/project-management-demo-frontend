import { useRecoilValue } from 'recoil'
import { archivedWorkspaceActivityTaskState } from '../atom'

export const useArchivedWorkspaceActivityTask = (
  archivedWorkspaceActivityTaskId: string,
) => {
  const archivedWorkspaceActivityTask = useRecoilValue(
    archivedWorkspaceActivityTaskState(archivedWorkspaceActivityTaskId),
  )

  return {
    archivedWorkspaceActivityTask,
  }
}

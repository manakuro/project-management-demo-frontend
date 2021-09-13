import { useRecoilValue } from 'recoil'
import { archivedWorkspaceActivityTaskSelector } from '../atom'

export const useArchivedWorkspaceActivityTask = (
  archivedWorkspaceActivityTaskId: string,
) => {
  const archivedWorkspaceActivityTask = useRecoilValue(
    archivedWorkspaceActivityTaskSelector(archivedWorkspaceActivityTaskId),
  )

  return {
    archivedWorkspaceActivityTask,
  }
}

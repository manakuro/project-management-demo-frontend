import { useRecoilValue } from 'recoil'
import { archivedWorkspaceActivityTaskIdsState } from '../atom'

export const useArchivedWorkspaceActivityTaskIds = () => {
  const archivedWorkspaceActivityTaskIds = useRecoilValue(
    archivedWorkspaceActivityTaskIdsState,
  )

  return {
    archivedWorkspaceActivityTaskIds,
  }
}

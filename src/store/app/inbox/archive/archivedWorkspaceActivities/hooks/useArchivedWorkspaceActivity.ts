import { useRecoilValue } from 'recoil'
import { archivedWorkspaceActivitySelector } from '../atom'

export const useArchivedWorkspaceActivity = (
  archivedWorkspaceActivityId: string,
) => {
  const archivedWorkspaceActivity = useRecoilValue(
    archivedWorkspaceActivitySelector(archivedWorkspaceActivityId),
  )

  return {
    archivedWorkspaceActivity,
  }
}

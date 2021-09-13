import { useRecoilValue } from 'recoil'
import { archivedWorkspaceActivityIdsState } from '../atom'

export const useArchivedWorkspaceActivityIds = () => {
  const archivedWorkspaceActivityIds = useRecoilValue(
    archivedWorkspaceActivityIdsState,
  )

  return {
    archivedWorkspaceActivityIds,
  }
}

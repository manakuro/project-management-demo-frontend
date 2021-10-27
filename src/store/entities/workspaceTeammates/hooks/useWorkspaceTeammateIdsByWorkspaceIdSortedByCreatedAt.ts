import { useRecoilValue } from 'recoil'
import { workspaceTeammateIdsByWorkspaceIdSortedByCreatedAtState } from '../atom'

export const useWorkspaceTeammateIdsByWorkspaceIdSortedByCreatedAt = (
  workspaceId: string,
) => {
  const workspaceTeammateIds = useRecoilValue(
    workspaceTeammateIdsByWorkspaceIdSortedByCreatedAtState(workspaceId),
  )

  return {
    workspaceTeammateIds,
  }
}

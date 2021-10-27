import { useRecoilValue } from 'recoil'
import { workspaceTeammateIdsByWorkspaceIdSortedByOwnerState } from '../atom'

export const useWorkspaceTeammateIdsByWorkspaceIdSortedByOwner = (
  workspaceId: string,
) => {
  const workspaceTeammateIds = useRecoilValue(
    workspaceTeammateIdsByWorkspaceIdSortedByOwnerState(workspaceId),
  )

  return {
    workspaceTeammateIds,
  }
}

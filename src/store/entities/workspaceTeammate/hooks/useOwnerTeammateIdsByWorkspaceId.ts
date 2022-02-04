import { useRecoilValue } from 'recoil'
import { ownerWorkspaceTeammateByWorkspaceIdState } from '../atom'

export const useOwnerTeammateIdsByWorkspaceId = (workspaceId: string) => {
  const workspaceTeammate = useRecoilValue(
    ownerWorkspaceTeammateByWorkspaceIdState(workspaceId),
  )

  return {
    workspaceTeammate,
  }
}

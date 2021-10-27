import { useRecoilValue } from 'recoil'
import { workspaceTeammateIdsByWorkspaceIdState } from '../atom'

export const useWorkspaceTeammateIdsByWorkspaceId = (workspaceId: string) => {
  const workspaceTeammateIds = useRecoilValue(
    workspaceTeammateIdsByWorkspaceIdState(workspaceId),
  )

  return {
    workspaceTeammateIds,
  }
}

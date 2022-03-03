import { useRecoilCallback } from 'recoil'
import { workspaceTeammateState } from '../atom'
import { WorkspaceTeammate } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (workspaceTeammate: WorkspaceTeammate) => {
        set(workspaceTeammateState(workspaceTeammate.id), workspaceTeammate)
      },
    [],
  )

  return {
    upsert,
  }
}

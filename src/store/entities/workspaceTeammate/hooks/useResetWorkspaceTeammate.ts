import { useRecoilCallback } from 'recoil'
import { workspaceTeammateState } from '../atom'

export const useResetWorkspaceTeammate = () => {
  const resetWorkspaceTeammate = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(workspaceTeammateState(id))
      },
    [],
  )

  const resetWorkspaceTeammates = useRecoilCallback(
    ({ reset }) =>
      (workspaceTeammates: string[]) => {
        workspaceTeammates.forEach((id) => {
          reset(workspaceTeammateState(id))
        })
      },
    [],
  )

  return {
    resetWorkspaceTeammate,
    resetWorkspaceTeammates,
  }
}

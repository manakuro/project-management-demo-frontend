import { useRecoilCallback } from 'recoil'
import { workspaceTeammateState } from '../atom'
import { WorkspaceTeammateResponse } from '../type'

export const useWorkspaceTeammatesResponse = () => {
  const setWorkspaceTeammates = useRecoilCallback(
    ({ set }) =>
      (data: WorkspaceTeammateResponse[]) => {
        data.forEach((d) => {
          set(workspaceTeammateState(d.id), d)
        })
      },
    [],
  )

  return {
    setWorkspaceTeammates,
  }
}

import { useRecoilCallback } from 'recoil'
import { workspaceState, workspaceStateDefault } from '../atom'
import { WorkspaceResponse } from '../type'

export const useWorkspaceResponse = () => {
  const setWorkspace = useRecoilCallback(
    ({ set }) =>
      (data: WorkspaceResponse) => {
        set(workspaceState, data || workspaceStateDefault())
      },
    [],
  )

  return {
    setWorkspace,
  }
}

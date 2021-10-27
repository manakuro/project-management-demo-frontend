import { useRecoilCallback } from 'recoil'
import { workspaceState } from '../atom'
import { WorkspaceResponse } from '../type'

export const useWorkspaceResponse = () => {
  const setWorkspace = useRecoilCallback(
    ({ set }) =>
      (data: WorkspaceResponse) => {
        set(workspaceState, data)
      },
    [],
  )

  return {
    setWorkspace,
  }
}

import { useRecoilCallback } from 'recoil'
import { workspaceState } from '../atom'
import type { WorkspaceResponse } from '../type'

export const useWorkspaceResponse = () => {
  const setWorkspace = useRecoilCallback(
    ({ set }) =>
      (data: WorkspaceResponse) => {
        set(workspaceState, (prev) => {
          return {
            ...prev,
            ...data,
            description: {
              ...prev.description,
              ...data?.description,
            },
          }
        })
      },
    [],
  )

  return {
    setWorkspace,
  }
}

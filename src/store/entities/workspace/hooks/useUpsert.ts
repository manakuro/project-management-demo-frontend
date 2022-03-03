import { useRecoilCallback } from 'recoil'
import { workspaceState } from '../atom'
import { Workspace } from '../type'

export const useUpsert = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (workspace: Workspace) => {
        set(workspaceState, workspace)
      },
    [],
  )

  return {
    upsert,
  }
}

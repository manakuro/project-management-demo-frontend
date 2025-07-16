import { useRecoilCallback } from 'recoil'
import { workspaceState } from '../atom'
import type { Workspace } from '../type'

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

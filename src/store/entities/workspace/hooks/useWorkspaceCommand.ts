import { useRecoilCallback } from 'recoil'
import { workspaceState } from '../atom'
import { Workspace } from '../type'

export const useWorkspaceCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (workspace: Workspace) => {
        set(workspaceState, workspace)
      },
    [],
  )

  const setWorkspace = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<Workspace>) => {
        const prev = await snapshot.getPromise(workspaceState)
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert],
  )

  return {
    setWorkspace,
  }
}

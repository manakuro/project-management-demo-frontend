import { useRecoilCallback } from 'recoil'
import { useUpdateWorkspaceMutation } from 'src/graphql/hooks'
import { workspaceState } from '../atom'
import { Workspace } from '../type'

export const useWorkspaceCommand = () => {
  const [updateWorkspaceMutation] = useUpdateWorkspaceMutation()

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
        const params = {
          ...prev,
          ...val,
        }
        upsert(params)

        await updateWorkspaceMutation({
          variables: {
            input: {
              id: params.id,
              description: params.description,
              name: params.name,
            },
          },
        })
      },
    [updateWorkspaceMutation, upsert],
  )

  return {
    setWorkspace,
  }
}

import { useRecoilCallback } from 'recoil'
import { useUpdateWorkspaceMutation } from 'src/graphql/hooks'
import { workspaceState } from '../atom'
import type { Workspace } from '../type'
import { useUpsert } from './useUpsert'
import { WORKSPACE_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useWorkspaceUpdatedSubscription'

export const useWorkspaceCommand = () => {
  const [updateWorkspaceMutation, { loading: updating }] =
    useUpdateWorkspaceMutation()

  const { upsert } = useUpsert()

  const setWorkspace = useRecoilCallback(
    ({ snapshot }) =>
      async (input: Partial<Workspace>) => {
        const prev = await snapshot.getPromise(workspaceState)
        const params = {
          ...prev,
          ...input,
        }
        upsert(params)

        const restore = () => {
          upsert(prev)
        }
        try {
          const res = await updateWorkspaceMutation({
            variables: {
              input: {
                id: params.id,
                description: params.description,
                name: params.name,
                requestId: WORKSPACE_UPDATED_SUBSCRIPTION_REQUEST_ID,
              },
            },
          })

          if (res.errors) {
            restore()
          }
        } catch (e) {
          restore()
          throw e
        }
      },
    [updateWorkspaceMutation, upsert],
  )

  return {
    setWorkspace,
    updating,
  }
}

import { useRecoilCallback } from 'recoil'
import { useUpdateProjectMutation } from 'src/graphql/hooks'
import { UpdateProjectInput } from 'src/graphql/types'
import { omit } from 'src/shared/utils/omit'
import { useWorkspace } from 'src/store/entities/workspace'
import { projectState } from '../atom'
import { Project } from '../type'
import { PROJECT_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useProjectUpdatedSubscription'
import { useUpsert } from './useUpsert'

export const useProjectCommand = () => {
  const [updateProjectMutation] = useUpdateProjectMutation()
  const { workspace } = useWorkspace()
  const { upsert } = useUpsert()

  const setProject = useRecoilCallback(
    ({ snapshot }) =>
      async (input: { projectId: string } & Partial<Omit<Project, 'id'>>) => {
        const prev = await snapshot.getPromise(projectState(input.projectId))

        upsert({ ...prev, ...omit(input, 'projectId') })

        const restore = () => {
          upsert(prev)
        }

        try {
          const res = await updateProjectMutation({
            variables: {
              input: prepareUpdateProjectInput({
                ...input,
                workspaceId: workspace.id,
              }),
            },
          })
          if (res.errors) {
            restore()
          }
        } catch (err) {
          restore()
          throw err
        }
      },
    [updateProjectMutation, upsert, workspace.id],
  )

  return {
    setProject,
  }
}

const prepareUpdateProjectInput = (
  input: { projectId: string; workspaceId: string } & Partial<
    Omit<Project, 'id'>
  >,
): UpdateProjectInput => {
  return {
    id: input.projectId,
    requestId: PROJECT_UPDATED_SUBSCRIPTION_REQUEST_ID,
    ...omit(input, 'projectId'),
  }
}

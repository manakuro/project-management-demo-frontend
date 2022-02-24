import { useRecoilCallback } from 'recoil'
import { useUpdateProjectMutation } from 'src/graphql/hooks'
import { UpdateProjectInput } from 'src/graphql/types'
import { omit } from 'src/shared/utils/omit'
import { useWorkspace } from 'src/store/entities/workspace'
import { projectState } from '../atom'
import { Project } from '../type'
import { PROJECT_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useProjectUpdatedSubscription'

export const useProjectCommand = () => {
  const [updateProjectMutation] = useUpdateProjectMutation()
  const { workspace } = useWorkspace()

  const upsert = useRecoilCallback(
    ({ set }) =>
      (project: Project) => {
        set(projectState(project.id), project)
      },
    [],
  )

  const setProject = useRecoilCallback(
    ({ snapshot }) =>
      async (payload: { projectId: string } & Partial<Omit<Project, 'id'>>) => {
        const current = await snapshot.getPromise(
          projectState(payload.projectId),
        )

        upsert({ ...current, ...omit(payload, 'projectId') })

        try {
          await updateProjectMutation({
            variables: {
              input: prepareUpdateProjectInput({
                ...payload,
                workspaceId: workspace.id,
              }),
            },
          })
        } catch (err) {
          console.error(err)
          upsert(current)
          throw err
        }
      },
    [updateProjectMutation, upsert, workspace.id],
  )

  return {
    upsert,
    setProject,
  }
}

const prepareUpdateProjectInput = (
  payload: { projectId: string; workspaceId: string } & Partial<
    Omit<Project, 'id'>
  >,
): UpdateProjectInput => {
  return {
    id: payload.projectId,
    requestId: PROJECT_UPDATED_SUBSCRIPTION_REQUEST_ID,
    ...omit(payload, 'projectId'),
  }
}

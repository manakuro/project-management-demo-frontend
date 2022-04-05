import { useRecoilCallback } from 'recoil'
import { useUpdateProjectMutation } from 'src/graphql/hooks'
import { UpdateProjectInput } from 'src/graphql/types'
import {
  formatDueTimeToLocalTimezone,
  formatDueTimeToServerTimezone,
} from 'src/shared/date'
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

  const setProjectDueDate = useRecoilCallback(
    () => async (input: { projectId: string; dueDate: Date }) => {
      await setProject({
        projectId: input.projectId,
        dueDate: formatDueTimeToLocalTimezone(input.dueDate),
      })
    },
    [setProject],
  )

  const resetProjectDueDate = useRecoilCallback(
    () => async (input: { projectId: string }) => {
      await setProject({
        projectId: input.projectId,
        dueDate: '',
      })
    },
    [setProject],
  )

  return {
    setProject,
    setProjectDueDate,
    resetProjectDueDate,
  }
}

const prepareUpdateProjectInput = (
  input: { projectId: string; workspaceId: string } & Partial<
    Omit<Project, 'id'>
  >,
): UpdateProjectInput => {
  let res: UpdateProjectInput = {
    id: input.projectId,
    requestId: PROJECT_UPDATED_SUBSCRIPTION_REQUEST_ID,
    ...omit(input, 'projectId'),
  }
  if (input.dueDate === '') {
    res = omit(res, 'dueDate')
    res.clearDueDate = true
  }
  if (input.dueDate) {
    res.dueDate = formatDueTimeToServerTimezone(new Date(input.dueDate))
  }

  return res
}

import { useRecoilCallback } from 'recoil'
import { useCreateProjectTaskSectionMutation } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useWorkspace } from 'src/store/entities/workspace'
import { initialState, projectTaskSectionState } from '../atom'
import { PROJECT_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID } from './useProjectTaskSectionCreatedSubscription'
import { useProjectTaskSectionResponse } from './useProjectTaskSectionResponse'
import { useUpsert } from './useUpsert'

export const useProjectTaskSectionCommand = () => {
  const { upsert } = useUpsert()
  const { setProjectsTaskSections } = useProjectTaskSectionResponse()
  const [createProjectTaskSectionMutation] =
    useCreateProjectTaskSectionMutation()
  const { workspace } = useWorkspace()

  const addProjectsTaskSection = useRecoilCallback(
    ({ reset }) =>
      async (val: { projectId: string }) => {
        const id = uuid()
        upsert({
          ...initialState(),
          ...val,
          isNew: true,
          id,
        })

        const res = await createProjectTaskSectionMutation({
          variables: {
            input: {
              projectId: val.projectId,
              requestId: PROJECT_TASK_SECTION_CREATED_SUBSCRIPTION_REQUEST_ID,
              workspaceId: workspace.id,
            },
          },
        })
        if (res.errors) {
          reset(projectTaskSectionState(id))
          return ''
        }

        const addedProjectTaskSection = res.data?.createProjectTaskSection
        if (!addedProjectTaskSection) return ''

        reset(projectTaskSectionState(id))
        setProjectsTaskSections([
          {
            ...addedProjectTaskSection,
            isNew: true,
          },
        ])

        return addedProjectTaskSection.id
      },
    [
      upsert,
      createProjectTaskSectionMutation,
      workspace.id,
      setProjectsTaskSections,
    ],
  )

  return {
    addProjectsTaskSection,
  }
}

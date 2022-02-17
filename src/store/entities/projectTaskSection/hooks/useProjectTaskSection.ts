import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useUpdateProjectTaskSectionMutation } from 'src/graphql/hooks'
import { UpdateTeammateTaskSectionInput } from 'src/graphql/types'
import { omit } from 'src/shared/utils/omit'
import { projectTaskSectionState } from '../atom'
import { ProjectTaskSection } from '../type'
import { DEFAULT_TITLE_NAME, hasProjectTaskSectionBeenPersisted } from '../util'
import { useProjectTaskSectionCreatedSubscription } from './useProjectTaskSectionCreatedSubscription'
import {
  PROJECT_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID,
  useProjectTaskSectionUpdatedSubscription,
} from './useProjectTaskSectionUpdatedSubscription'
import { useUpsert } from './useUpsert'

export const useProjectTaskSection = (projectTaskSectionId: string) => {
  const { upsert } = useUpsert()
  const projectTaskSection = useRecoilValue(
    projectTaskSectionState(projectTaskSectionId),
  )

  const [updateProjectTaskSectionMutation] =
    useUpdateProjectTaskSectionMutation()

  useProjectTaskSectionCreatedSubscription({
    projectId: projectTaskSection.projectId,
  })

  useProjectTaskSectionUpdatedSubscription({
    projectTaskSectionId: projectTaskSection.id,
  })

  const setProjectTaskSection = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<ProjectTaskSection>) => {
        const prev = await snapshot.getPromise(
          projectTaskSectionState(projectTaskSectionId),
        )
        if (!hasProjectTaskSectionBeenPersisted(prev)) return

        upsert({ ...prev, ...val })

        const res = await updateProjectTaskSectionMutation({
          variables: {
            input: prepareUpdateTeammateTaskSectionInput(
              projectTaskSectionId,
              val,
            ),
          },
        })
        if (res.errors) {
          upsert(prev)
        }
      },
    [projectTaskSectionId, updateProjectTaskSectionMutation, upsert],
  )

  const setProjectTaskSectionName = useRecoilCallback(
    () => async (val: string) => {
      if (projectTaskSection.name && val && projectTaskSection.name === val)
        return
      const name = val || DEFAULT_TITLE_NAME

      await setProjectTaskSection({ name, isNew: false })
    },
    [setProjectTaskSection, projectTaskSection.name],
  )

  return {
    projectTaskSection,
    setProjectTaskSectionName,
  }
}

const prepareUpdateTeammateTaskSectionInput = (
  teammateTaskSectionId: string,
  val: Partial<ProjectTaskSection>,
): UpdateTeammateTaskSectionInput => {
  return {
    ...omit(val, 'isNew'),
    id: teammateTaskSectionId,
    requestId: PROJECT_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID,
  }
}

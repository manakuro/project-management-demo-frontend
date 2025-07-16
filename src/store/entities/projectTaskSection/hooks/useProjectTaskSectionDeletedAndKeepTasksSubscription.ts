import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useProjectTaskSectionDeletedAndKeepTasksSubscription as useSubscription } from 'src/graphql/hooks'
import type { ProjectTaskResponse } from 'src/graphql/types/projectTask'
import { uuid } from 'src/shared/uuid'
import {
  projectTasksByProjectTaskSectionIdState,
  useProjectTaskResponse,
} from 'src/store/entities/projectTask'
import type { ProjectTaskSectionDeletedAndKeepTasksSubscriptionResponse as Response } from '../type'
import { useResetProjectTaskSection } from './useResetProjectTaskSection'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
}
export const PROJECT_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID =
  uuid()
export const useProjectTaskSectionDeletedAndKeepTasksSubscription = (
  props: Props,
) => {
  const { resetProjectTaskSection } = useResetProjectTaskSection()
  const { setProjectTask } = useProjectTaskResponse()

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  )
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId:
        PROJECT_TASK_SECTION_DELETED_AND_KEEP_TASKS_SUBSCRIPTION_REQUEST_ID,
    },
    onSubscriptionData: (data) => {
      if (
        isEqual(
          data.subscriptionData.data,
          previousData?.subscriptionData?.data,
        )
      )
        return

      if (data.subscriptionData.data)
        setBySubscription(data.subscriptionData.data)
      previousData = data
    },
    skip: skipSubscription,
  })

  const setBySubscription = useRecoilCallback(
    ({ snapshot }) =>
      async (response: Response) => {
        if (__DEV__) console.log('Project Task Section deleted!')

        const projectTaskSection =
          response.projectTaskSectionDeletedAndKeepTasks.projectTaskSection
        resetProjectTaskSection(projectTaskSection.id)

        const newProjectTaskSection =
          response.projectTaskSectionDeletedAndKeepTasks.keptProjectTaskSection
        resetProjectTaskSection(projectTaskSection.id)

        const projectTasks = await snapshot.getPromise(
          projectTasksByProjectTaskSectionIdState(projectTaskSection.id),
        )

        const newProjectTasks = projectTasks.map((t) => ({
          ...t,
          projectTaskSectionId: newProjectTaskSection.id,
        }))
        setProjectTask(newProjectTasks as ProjectTaskResponse[], {
          includeTask: false,
        })
      },
    [resetProjectTaskSection, setProjectTask],
  )

  return {
    subscriptionResult,
  }
}

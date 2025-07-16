import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useProjectTaskSectionDeletedAndDeleteTasksSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import type { ProjectTaskSectionDeletedAndDeleteTasksSubscriptionResponse as Response } from '../type'
import { useResetProjectTaskSection } from './useResetProjectTaskSection'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
}
export const PROJECT_TASK_SECTION_DELETED_AND_DELETED_TASKS_SUBSCRIPTION_REQUEST_ID =
  uuid()
export const useProjectTaskSectionDeletedAndDeleteTasksSubscription = (
  props: Props,
) => {
  const { resetProjectTaskSection } = useResetProjectTaskSection()
  const { resetProjectTaskSections } = useResetProjectTaskSection()

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  )
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId:
        PROJECT_TASK_SECTION_DELETED_AND_DELETED_TASKS_SUBSCRIPTION_REQUEST_ID,
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
    () => async (response: Response) => {
      if (__DEV__) console.log('Project Task Section deleted!')

      const projectTaskSection =
        response.projectTaskSectionDeletedAndDeleteTasks.projectTaskSection
      const projectTaskIds =
        response.projectTaskSectionDeletedAndDeleteTasks.projectTaskIds

      resetProjectTaskSection(projectTaskSection.id)
      resetProjectTaskSections(projectTaskIds)
    },
    [resetProjectTaskSection, resetProjectTaskSections],
  )

  return {
    subscriptionResult,
  }
}

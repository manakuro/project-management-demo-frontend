import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useProjectTaskSectionUndeletedAndDeleteTasksSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useProjectTaskSectionResponse } from 'src/store/entities/projectTaskSection'
import { ProjectTaskSectionUndeletedAndDeleteTasksSubscriptionResponse as Response } from '../type'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
}
export const PROJECT_TASK_SECTION_UNDELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID =
  uuid()
export const useProjectTaskSectionUndeletedAndDeleteTasksSubscription = (
  props: Props,
) => {
  const { setProjectsTaskSections } = useProjectTaskSectionResponse()

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  )
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId:
        PROJECT_TASK_SECTION_UNDELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID,
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
      if (__DEV__) console.log('Project Task Section undeleted!')

      const projectTaskSection =
        response.projectTaskSectionUndeletedAndDeleteTasks.projectTaskSection

      setProjectsTaskSections([projectTaskSection])
    },
    [setProjectsTaskSections],
  )

  return {
    subscriptionResult,
  }
}

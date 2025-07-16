import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useTeammateTaskSectionUndeletedAndDeleteTasksSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { useTeammatesTaskSectionResponse } from 'src/store/entities/teammatesTaskSection'
import type { TeammateTaskSectionUndeletedAndDeleteTasksSubscriptionResponse as Response } from '../type'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
  teammateId: string
}
export const TEAMMATE_TASK_SECTION_UNDELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID =
  uuid()
export const useTeammateTaskSectionUndeletedAndDeleteTasksSubscription = (
  props: Props,
) => {
  const { setTeammatesTaskSections } = useTeammatesTaskSectionResponse()

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  )
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      teammateId: props.teammateId,
      requestId:
        TEAMMATE_TASK_SECTION_UNDELETED_AND_DELETE_TASKS_SUBSCRIPTION_REQUEST_ID,
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
      const data = response.teammateTaskSectionUndeletedAndDeleteTasks

      if (__DEV__) console.log('Teammate Task Section undeleted!')

      setTeammatesTaskSections([data.teammateTaskSection], {
        includeTask: false,
      })
    },
    [setTeammatesTaskSections],
  )

  return {
    subscriptionResult,
  }
}

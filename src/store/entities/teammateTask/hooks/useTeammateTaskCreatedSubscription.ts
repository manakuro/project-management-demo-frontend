import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useTeammateTaskCreatedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import type { TeammateTaskCreatedSubscriptionResponse as Response } from '../type'
import { useTeammateTaskResponse } from './useTeammateTaskResponse'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
  teammateId: string
}
export const TEAMMATE_TASK_CREATED_SUBSCRIPTION_REQUEST_ID = uuid()
export const useTeammateTaskCreatedSubscription = (props: Props) => {
  const { setTeammateTask } = useTeammateTaskResponse()

  const skipSubscription = useMemo(
    () => !props.teammateId || !props.workspaceId,
    [props.teammateId, props.workspaceId],
  )
  const subscriptionResult = useSubscription({
    variables: {
      teammateId: props.teammateId,
      workspaceId: props.workspaceId,
      requestId: TEAMMATE_TASK_CREATED_SUBSCRIPTION_REQUEST_ID,
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
      const created = response.teammateTaskCreated

      if (__DEV__) console.log('Teammate Task created!')

      setTeammateTask([
        {
          ...created,
          task: {
            ...created.task,
            isNew: false,
          },
        },
      ])
    },
    [setTeammateTask],
  )

  return {
    subscriptionResult,
  }
}

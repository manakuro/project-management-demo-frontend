import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useTaskTagCreatedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import type { TaskTagCreatedSubscriptionResponse as Response } from '../type'
import { useTaskTagResponse } from './useTaskTagResponse'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
}
export const TASK_TAG_CREATED_SUBSCRIPTION_REQUEST_ID = uuid()
export const useTaskTagCreatedSubscription = (props: Props) => {
  const { setTaskTag } = useTaskTagResponse()

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  )
  useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_TAG_CREATED_SUBSCRIPTION_REQUEST_ID,
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
      const data = response.taskTagCreated

      if (__DEV__) console.log('Teammate Task created!')

      setTaskTag([data])
    },
    [setTaskTag],
  )
}

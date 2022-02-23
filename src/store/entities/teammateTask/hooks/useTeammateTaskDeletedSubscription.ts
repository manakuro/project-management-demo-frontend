import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useTeammateTaskDeletedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { teammateTaskState } from 'src/store/entities/teammateTask'
import { TeammateTaskDeletedSubscriptionResponse as Response } from '../type'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
  teammateId: string
}
export const TEAMMATE_TASK_DELETED_SUBSCRIPTION_REQUEST_ID = uuid()
export const useTeammateTaskDeletedSubscription = (props: Props) => {
  const skipSubscription = useMemo(
    () => !props.teammateId || !props.workspaceId,
    [props.teammateId, props.workspaceId],
  )
  const subscriptionResult = useSubscription({
    variables: {
      teammateId: props.teammateId,
      workspaceId: props.workspaceId,
      requestId: TEAMMATE_TASK_DELETED_SUBSCRIPTION_REQUEST_ID,
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
    ({ reset }) =>
      async (response: Response) => {
        const updated = response.teammateTaskDeleted

        if (__DEV__) console.log('Teammate Task deleted!')

        reset(teammateTaskState(updated.id))
      },
    [],
  )

  return {
    subscriptionResult,
  }
}

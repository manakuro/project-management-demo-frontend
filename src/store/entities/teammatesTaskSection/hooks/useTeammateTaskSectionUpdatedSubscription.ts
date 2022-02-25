import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useTeammateTaskSectionUpdatedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { TeammateTaskSectionUpdatedSubscriptionResponse as Response } from '../type'
import { useTeammatesTaskSectionResponse } from './useTeammatesTaskSectionResponse'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
}
export const TEAMMATE_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid()
export const useTeammateTaskSectionUpdatedSubscription = (props: Props) => {
  const { setTeammatesTaskSections } = useTeammatesTaskSectionResponse()

  const skipSubscription = useMemo(
    () => !props.workspaceId,
    [props.workspaceId],
  )
  const subscriptionResult = useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TEAMMATE_TASK_SECTION_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
    () => (response: Response) => {
      const updated = response.teammateTaskSectionUpdated

      if (__DEV__) console.log('Teammate Task Section updated!')

      setTeammatesTaskSections([updated])
    },
    [setTeammatesTaskSections],
  )

  return {
    subscriptionResult,
  }
}

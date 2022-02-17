import isEqual from 'lodash-es/isEqual'
import { useRecoilCallback } from 'recoil'
import { useTaskFeedUpdatedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { TaskFeedUpdatedSubscriptionResponse } from '../type'
import { useTaskFeedCommand } from './useTaskFeedCommand'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  taskFeedId: string
}

export const TASK_FEED_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid()
export const useTaskFeedUpdatedSubscription = (props: Props) => {
  const { upsert } = useTaskFeedCommand()

  useSubscription({
    variables: {
      taskFeedId: props.taskFeedId,
      requestId: TASK_FEED_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
        setTaskBySubscription(data.subscriptionData.data)
      previousData = data
    },
  })

  const setTaskBySubscription = useRecoilCallback(
    () => async (response: TaskFeedUpdatedSubscriptionResponse) => {
      const updated = response.taskFeedUpdated

      console.log('subscription updated!: ')

      upsert(updated)
    },
    [upsert],
  )
}

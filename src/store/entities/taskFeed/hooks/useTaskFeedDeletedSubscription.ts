import isEqual from 'lodash-es/isEqual'
import { useRecoilCallback } from 'recoil'
import { useTaskFeedDeletedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { taskFeedState } from 'src/store/entities/taskFeed'
import type { TaskFeedDeletedSubscriptionResponse } from '../type'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
}

export const TASK_FEED_DELETED_SUBSCRIPTION_REQUEST_ID = uuid()
export const useTaskFeedDeletedSubscription = (props: Props) => {
  useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_FEED_DELETED_SUBSCRIPTION_REQUEST_ID,
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
    ({ reset }) =>
      async (response: TaskFeedDeletedSubscriptionResponse) => {
        const data = response.taskFeedDeleted

        console.log('subscription deleted! ')

        reset(taskFeedState(data.taskFeed.id))
      },
    [],
  )
}

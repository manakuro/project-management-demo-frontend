import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useTaskFeedLikeCreatedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { TaskFeedLikeCreatedSubscriptionResponse as Response } from '../type'
import { useTaskFeedLikeResponse } from './useTaskFeedLikeResponse'

export const TASK_FEED_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID = uuid()

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
}
export const useTaskFeedLikeCreatedSubscription = (props: Props) => {
  const skipSubscription = useMemo(() => {
    return !props.workspaceId
  }, [props.workspaceId])

  const { setTaskFeedLikes } = useTaskFeedLikeResponse()

  useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_FEED_LIKE_CREATED_SUBSCRIPTION_REQUEST_ID,
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
      const taskFeedLikeCreated = response.taskFeedLikeCreated

      if (__DEV__) console.log('TaskFeedLike created!: ')

      setTaskFeedLikes([taskFeedLikeCreated])
    },
    [setTaskFeedLikes],
  )
}

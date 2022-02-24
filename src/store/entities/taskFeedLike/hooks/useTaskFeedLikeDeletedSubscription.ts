import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useTaskFeedLikeDeletedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { taskFeedLikeState } from 'src/store/entities/taskFeedLike'
import { TaskFeedLikeDeletedSubscriptionResponse as Response } from '../type'

export const TASK_FEED_LIKE_DELETED_SUBSCRIPTION_REQUEST_ID = uuid()

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
}
export const useTaskFeedLikeDeletedSubscription = (props: Props) => {
  const skipSubscription = useMemo(() => {
    return !props.workspaceId
  }, [props.workspaceId])

  useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_FEED_LIKE_DELETED_SUBSCRIPTION_REQUEST_ID,
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
        const taskFeedLikeDeleted = response.taskFeedLikeDeleted

        if (__DEV__) console.log('TaskFeedLike deleted!: ')

        reset(taskFeedLikeState(taskFeedLikeDeleted.id))
      },
    [],
  )
}

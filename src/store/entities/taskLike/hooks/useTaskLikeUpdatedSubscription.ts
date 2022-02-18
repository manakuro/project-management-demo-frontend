import isEqual from 'lodash-es/isEqual'
import { useMemo } from 'react'
import { useRecoilCallback } from 'recoil'
import { useTaskLikeUpdatedSubscription as useSubscription } from 'src/graphql/hooks'
import { uuid } from 'src/shared/uuid'
import { taskLikeState } from 'src/store/entities/taskLike'
import { TaskLikeUpdatedSubscriptionResponse as Response } from '../type'
import { useTaskLikeResponse } from './useTaskLikeResponse'

export const TASK_LIKE_UPDATED_SUBSCRIPTION_REQUEST_ID = uuid()

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any

type Props = {
  workspaceId: string
}
export const useTaskLikeUpdatedSubscription = (props: Props) => {
  const skipSubscription = useMemo(() => {
    return !props.workspaceId
  }, [props.workspaceId])

  const { setTaskLikes } = useTaskLikeResponse()

  useSubscription({
    variables: {
      workspaceId: props.workspaceId,
      requestId: TASK_LIKE_UPDATED_SUBSCRIPTION_REQUEST_ID,
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
    ({ snapshot, reset }) =>
      async (response: Response) => {
        const taskLikeUpdated = response.taskLikeUpdated
        const prev = await snapshot.getPromise(
          taskLikeState(taskLikeUpdated.id),
        )

        if (__DEV__) console.log('TaskLike updated!: ')

        if (prev.id) {
          reset(taskLikeState(taskLikeUpdated.id))
          return
        }

        setTaskLikes([taskLikeUpdated])
      },
    [setTaskLikes],
  )
}

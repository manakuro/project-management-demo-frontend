import isEqual from 'lodash-es/isEqual'
import { useRecoilCallback } from 'recoil'
import { useTaskFeedUpdatedSubscription } from 'src/graphql/hooks'
import { omit } from 'src/shared/utils/omit'
import { taskFeedState } from '../atom'
import { TaskFeedUpdatedSubscriptionResponse } from '../type'
import { useTaskFeedCommand } from './useTaskFeedCommand'

// NOTE: To prevent re-rendering via duplicated subscription response.
let previousData: any
export const useSubscription = (taskFeedId: string) => {
  const { upsert } = useTaskFeedCommand()

  useTaskFeedUpdatedSubscription({
    variables: {
      taskFeedId,
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
    ({ snapshot }) =>
      async (response: TaskFeedUpdatedSubscriptionResponse) => {
        const prev = await snapshot.getPromise(taskFeedState(taskFeedId))
        const updated = response.taskFeedUpdated

        if (isEqual(omit(updated, 'updatedAt'), omit(prev, 'updatedAt'))) return

        console.log('subscription updated!: ')

        upsert({
          ...prev,
          ...updated,
        })
      },
    [upsert, taskFeedId],
  )
}

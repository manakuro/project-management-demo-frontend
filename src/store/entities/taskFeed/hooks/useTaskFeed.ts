import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useUpdateTaskFeedMutation } from 'src/graphql/hooks'
import { taskFeedState } from '../atom'
import { TaskFeed } from '../type'
import { useTaskFeedCommand } from './useTaskFeedCommand'
import {
  TASK_FEED_UPDATED_SUBSCRIPTION_REQUEST_ID,
  useTaskFeedUpdatedSubscription,
} from './useTaskFeedUpdatedSubscription'

export const useTaskFeed = (taskFeedId: string) => {
  const taskFeed = useRecoilValue(taskFeedState(taskFeedId))
  const { upsert } = useTaskFeedCommand()
  const [updateTaskFeedMutation] = useUpdateTaskFeedMutation()

  useTaskFeedUpdatedSubscription({
    taskFeedId,
  })

  const setTaskFeed = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskFeed>) => {
        const prev = await snapshot.getPromise(taskFeedState(taskFeed.id))
        upsert({
          ...prev,
          ...val,
        })

        const res = await updateTaskFeedMutation({
          variables: {
            input: {
              id: taskFeedId,
              requestId: TASK_FEED_UPDATED_SUBSCRIPTION_REQUEST_ID,
              ...val,
            },
          },
        })

        if (res.errors) {
          upsert(prev)
        }
      },
    [taskFeed.id, upsert, updateTaskFeedMutation, taskFeedId],
  )

  return {
    taskFeed,
    setTaskFeed,
  }
}

import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useUpdateTaskFeedMutation } from 'src/graphql/hooks'
import { useWorkspace } from 'src/store/entities/workspace'
import { taskFeedState } from '../atom'
import { TaskFeed } from '../type'
import { TASK_FEED_UPDATED_SUBSCRIPTION_REQUEST_ID } from './useTaskFeedUpdatedSubscription'
import { useUpsert } from './useUpsert'

export const useTaskFeed = (taskFeedId: string) => {
  const taskFeed = useRecoilValue(taskFeedState(taskFeedId))
  const { upsert } = useUpsert()
  const { workspace } = useWorkspace()
  const [updateTaskFeedMutation] = useUpdateTaskFeedMutation()

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
              workspaceId: workspace.id,
              ...val,
            },
          },
        })

        if (res.errors) {
          upsert(prev)
        }
      },
    [taskFeed.id, upsert, updateTaskFeedMutation, taskFeedId, workspace.id],
  )

  return {
    taskFeed,
    setTaskFeed,
  }
}

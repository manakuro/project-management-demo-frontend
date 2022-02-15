import { useRecoilCallback, useRecoilValue } from 'recoil'
import { useUpdateTaskFeedMutation } from 'src/graphql/hooks'
import { taskFeedState } from '../atom'
import { TaskFeed } from '../type'
import { useSubscription } from './useSubscription'
import { useTaskFeedCommand } from './useTaskFeedCommand'

export const useTaskFeed = (taskFeedId: string) => {
  const taskFeed = useRecoilValue(taskFeedState(taskFeedId))
  const { upsert } = useTaskFeedCommand()
  const [updateTaskFeedMutation] = useUpdateTaskFeedMutation()

  useSubscription(taskFeedId)

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

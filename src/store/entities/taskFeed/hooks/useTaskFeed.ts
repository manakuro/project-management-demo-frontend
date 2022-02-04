import { useRecoilCallback, useRecoilValue } from 'recoil'
import { taskFeedState } from '../atom'
import { TaskFeed } from '../type'
import { useTaskFeedCommand } from './useTaskFeedCommand'

export const useTaskFeed = (taskFeedId?: string) => {
  const taskFeed = useRecoilValue(taskFeedState(taskFeedId || ''))
  const { upsert } = useTaskFeedCommand()

  const setTaskFeed = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskFeed>) => {
        const prev = await snapshot.getPromise(taskFeedState(taskFeed.id))
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert, taskFeed.id],
  )

  return {
    taskFeed,
    setTaskFeed,
  }
}

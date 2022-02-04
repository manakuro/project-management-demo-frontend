import { useRecoilCallback, useRecoilValue } from 'recoil'
import { taskFeedLikeState } from '../atom'
import { TaskFeedLike } from '../type'
import { useTaskFeedLikeCommand } from './useTaskFeedLikeCommand'

export const useTaskTaskFeedLike = (taskFeedLikeId?: string) => {
  const taskFeedLike = useRecoilValue(taskFeedLikeState(taskFeedLikeId || ''))
  const { upsert } = useTaskFeedLikeCommand()

  const setTaskFeedLike = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskFeedLike>) => {
        const prev = await snapshot.getPromise(
          taskFeedLikeState(taskFeedLike.id),
        )
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert, taskFeedLike.id],
  )

  return {
    taskFeedLike,
    setTaskFeedLike,
  }
}

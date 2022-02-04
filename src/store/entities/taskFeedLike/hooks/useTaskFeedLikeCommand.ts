import { useRecoilCallback } from 'recoil'
import { taskFeedLikeState } from '../atom'
import { TaskFeedLike } from '../type'

export const useTaskFeedLikeCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskFeedLike: TaskFeedLike) => {
        set(taskFeedLikeState(taskFeedLike.id), taskFeedLike)
      },
    [],
  )

  return {
    upsert,
  }
}

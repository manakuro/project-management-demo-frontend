import { useRecoilCallback } from 'recoil'
import { taskFeedLikeState } from '../atom'

export const useResetTaskFeedLike = () => {
  const resetTaskFeedLike = useRecoilCallback(
    ({ reset }) =>
      (id: string) => {
        reset(taskFeedLikeState(id))
      },
    [],
  )

  const resetTaskFeedLikes = useRecoilCallback(
    ({ reset }) =>
      (taskFeedLikes: string[]) => {
        taskFeedLikes.forEach((id) => {
          reset(taskFeedLikeState(id))
        })
      },
    [],
  )

  return {
    resetTaskFeedLike,
    resetTaskFeedLikes,
  }
}

import { useRecoilCallback } from 'recoil'
import { taskFeedLikeState } from '../atom'
import { TaskFeedLike } from '../type'

export const useTaskFeedLikesResponse = () => {
  const setTaskFeedLikes = useRecoilCallback(
    ({ set }) =>
      (data: TaskFeedLike[]) => {
        data.forEach((d) => {
          set(taskFeedLikeState(d.id), d)
        })
      },
    [],
  )

  return {
    setTaskFeedLikes,
  }
}

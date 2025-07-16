import { useRecoilCallback } from 'recoil'
import { taskFeedLikeState } from '../atom'
import type { TaskFeedLikeResponse } from '../type'

export const useTaskFeedLikeResponse = () => {
  const setTaskFeedLikes = useRecoilCallback(
    ({ set }) =>
      (data: TaskFeedLikeResponse[]) => {
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

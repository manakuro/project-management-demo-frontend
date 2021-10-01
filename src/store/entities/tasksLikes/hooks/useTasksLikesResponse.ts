import { useRecoilCallback } from 'recoil'
import { taskLikeState } from '../atom'
import { TaskLikeResponse } from '../type'

export const useTasksLikesResponse = () => {
  const setTaskLikes = useRecoilCallback(
    ({ set }) =>
      (data: TaskLikeResponse[]) => {
        data.forEach((d) => {
          set(taskLikeState(d.id), d)
        })
      },
    [],
  )

  return {
    setTaskLikes,
  }
}

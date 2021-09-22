import { useRecoilCallback } from 'recoil'
import { taskLikeSelector } from '../atom'
import { TaskLikeResponse } from '../type'

export const useTasksLikesResponse = () => {
  const setTaskLikes = useRecoilCallback(
    ({ set }) =>
      (data: TaskLikeResponse[]) => {
        data.forEach((d) => {
          set(taskLikeSelector(d.id), d)
        })
      },
    [],
  )

  return {
    setTaskLikes,
  }
}

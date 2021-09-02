import { useRecoilCallback } from 'recoil'
import { taskLikeSelector } from '../atom'
import { TaskLike } from '../type'

export const useTaskLikesResponse = () => {
  const setTaskLikes = useRecoilCallback(
    ({ set }) =>
      (data: TaskLike[]) => {
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

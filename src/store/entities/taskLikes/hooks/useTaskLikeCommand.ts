import { useRecoilCallback } from 'recoil'
import { taskLikeSelector } from '../atom'
import { TaskLike } from '../type'

export const useTaskLikeCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskLike: TaskLike) => {
        set(taskLikeSelector(taskLike.id), taskLike)
      },
    [],
  )

  return {
    upsert,
  }
}

import { useRecoilCallback } from 'recoil'
import { taskLikeSelector } from '../atom'
import { TaskLike } from '../type'

export const useTasksLikeCommand = () => {
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

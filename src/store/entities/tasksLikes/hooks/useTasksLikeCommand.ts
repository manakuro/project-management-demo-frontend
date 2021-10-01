import { useRecoilCallback } from 'recoil'
import { taskLikeState } from '../atom'
import { TaskLike } from '../type'

export const useTasksLikeCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskLike: TaskLike) => {
        set(taskLikeState(taskLike.id), taskLike)
      },
    [],
  )

  return {
    upsert,
  }
}

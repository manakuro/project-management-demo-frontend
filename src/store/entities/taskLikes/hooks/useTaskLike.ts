import { useRecoilCallback, useRecoilValue } from 'recoil'
import { taskLikeSelector } from '../atom'
import { TaskLike } from '../type'
import { useTaskLikeCommand } from './useTaskLikeCommand'

export const useTaskLike = (taskLikeId?: string) => {
  const taskLike = useRecoilValue(taskLikeSelector(taskLikeId || ''))
  const { upsert } = useTaskLikeCommand()

  const setTaskLike = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskLike>) => {
        const prev = await snapshot.getPromise(taskLikeSelector(taskLike.id))
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert, taskLike.id],
  )

  return {
    taskLike,
    setTaskLike,
  }
}

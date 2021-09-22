import { useCallback, useMemo } from 'react'
import { useRecoilCallback, useRecoilState } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { defaultTaskLikeStateValue, taskLikesState } from '../atom'
import { useTasksLikeCommand } from './useTasksLikeCommand'

export const useTaskLikesByTaskId = (taskId: string) => {
  const { upsert } = useTasksLikeCommand()
  const [taskLikesAll, setTaskLikesAll] = useRecoilState(taskLikesState)

  const addTaskLike = useCallback(
    (teammateId: string) => {
      const id = uuid()
      upsert({
        ...defaultTaskLikeStateValue(),
        id,
        taskId,
        teammateId,
      })

      return id
    },
    [taskId, upsert],
  )

  const deleteTaskLike = useRecoilCallback(
    () => (teammateId: string) => {
      const index = taskLikesAll.findIndex(
        (f) => f.teammateId === teammateId && f.taskId === taskId,
      )
      const newValue = [
        ...taskLikesAll.slice(0, index),
        ...taskLikesAll.slice(index + 1),
      ]
      setTaskLikesAll(newValue)
    },
    [taskId, taskLikesAll, setTaskLikesAll],
  )

  const taskLikes = useMemo(
    () => taskLikesAll.filter((f) => f.taskId === taskId),
    [taskLikesAll, taskId],
  )
  const teammateIds = useMemo(
    () => taskLikes.map((f) => f.teammateId),
    [taskLikes],
  )

  return {
    addTaskLike,
    deleteTaskLike,
    taskLikes,
    teammateIds,
  }
}

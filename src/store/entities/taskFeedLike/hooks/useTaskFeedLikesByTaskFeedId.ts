import { useCallback, useMemo } from 'react'
import { useRecoilCallback, useRecoilState } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { initialState, taskFeedLikesState } from '../atom'
import { useTaskFeedLikeCommand } from './useTaskFeedLikeCommand'

export const useTaskFeedLikesByTaskFeedId = (taskFeedId: string) => {
  const { upsert } = useTaskFeedLikeCommand()
  const [taskFeedLikesAll, setTaskFeedLikesAll] =
    useRecoilState(taskFeedLikesState)

  const addTaskFeedLike = useCallback(
    (teammateId: string) => {
      const id = uuid()
      upsert({
        ...initialState(),
        id,
        taskFeedId,
        teammateId,
      })

      return id
    },
    [taskFeedId, upsert],
  )

  const deleteTaskFeedLike = useRecoilCallback(
    () => (teammateId: string) => {
      const index = taskFeedLikesAll.findIndex(
        (f) => f.teammateId === teammateId && f.taskFeedId === taskFeedId,
      )
      const newValue = [
        ...taskFeedLikesAll.slice(0, index),
        ...taskFeedLikesAll.slice(index + 1),
      ]
      setTaskFeedLikesAll(newValue)
    },
    [taskFeedId, taskFeedLikesAll, setTaskFeedLikesAll],
  )

  const taskFeedLikes = useMemo(
    () => taskFeedLikesAll.filter((f) => f.taskFeedId === taskFeedId),
    [taskFeedLikesAll, taskFeedId],
  )
  const teammateIds = useMemo(
    () => taskFeedLikes.map((f) => f.teammateId),
    [taskFeedLikes],
  )

  return {
    addTaskFeedLike,
    deleteTaskFeedLike,
    taskFeedLikes,
    teammateIds,
  }
}

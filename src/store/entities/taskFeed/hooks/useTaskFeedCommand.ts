import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { initialState, taskFeedState } from '../atom'
import { TaskFeed } from '../type'

export const useTaskFeedCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (taskFeed: TaskFeed) => {
        set(taskFeedState(taskFeed.id), taskFeed)
      },
    [],
  )

  const addTaskFeed = useCallback(
    (val: Partial<TaskFeed>) => {
      const id = uuid()
      upsert({
        ...initialState(),
        ...val,
        id,
      })

      return id
    },
    [upsert],
  )

  return {
    upsert,
    addTaskFeed,
  }
}

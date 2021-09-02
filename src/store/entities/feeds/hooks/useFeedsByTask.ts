import { useCallback, useMemo } from 'react'
import { useRecoilValue } from 'recoil'
import { uuid } from 'src/shared/uuid'
import {
  defaultFeedStateValue,
  Feed,
  feedIdsGroupByTaskState,
} from 'src/store/entities/feeds'
import { useFeedCommand } from './useFeedCommand'

export const useFeedsByTask = (taskId: string) => {
  const feedIdsGroupByTask = useRecoilValue(feedIdsGroupByTaskState)
  const { upsert } = useFeedCommand()

  const feedIds = useMemo(() => {
    return feedIdsGroupByTask[taskId] || []
  }, [feedIdsGroupByTask, taskId])

  const addFeed = useCallback(
    (val: Partial<Feed>) => {
      const id = uuid()
      upsert({
        ...defaultFeedStateValue(),
        ...val,
        id,
        taskId,
      })

      return id
    },
    [taskId, upsert],
  )

  return {
    feedIds,
    addFeed,
  }
}

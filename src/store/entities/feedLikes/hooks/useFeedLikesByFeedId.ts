import { useCallback, useMemo } from 'react'
import { useRecoilCallback, useRecoilState } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { defaultFeedLikeStateValue, feedLikesState } from '../atom'
import { useFeedLikeCommand } from './useFeedLikeCommand'

export const useFeedLikesByFeedId = (feedId: string) => {
  const { upsert } = useFeedLikeCommand()
  const [feedLikesAll, setFeedLikesAll] = useRecoilState(feedLikesState)

  const addFeedLike = useCallback(
    (teammateId: string) => {
      const id = uuid()
      upsert({
        ...defaultFeedLikeStateValue(),
        id,
        feedId,
        teammateId,
      })

      return id
    },
    [feedId, upsert],
  )

  const deleteFeedLike = useRecoilCallback(
    () => (teammateId: string) => {
      const index = feedLikesAll.findIndex(
        (f) => f.teammateId === teammateId && f.feedId === feedId,
      )
      const newValue = [
        ...feedLikesAll.slice(0, index),
        ...feedLikesAll.slice(index + 1),
      ]
      setFeedLikesAll(newValue)
    },
    [feedId, feedLikesAll, setFeedLikesAll],
  )

  const feedLikes = useMemo(
    () => feedLikesAll.filter((f) => f.feedId === feedId),
    [feedLikesAll, feedId],
  )
  const teammateIds = useMemo(
    () => feedLikes.map((f) => f.teammateId),
    [feedLikes],
  )

  return {
    addFeedLike,
    deleteFeedLike,
    feedLikes,
    teammateIds,
  }
}

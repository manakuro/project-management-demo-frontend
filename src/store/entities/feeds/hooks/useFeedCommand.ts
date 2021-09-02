import { useCallback } from 'react'
import { useRecoilCallback } from 'recoil'
import { uuid } from 'src/shared/uuid'
import { defaultFeedStateValue, feedSelector } from '../atom'
import { Feed } from '../type'

export const useFeedCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (feed: Feed) => {
        set(feedSelector(feed.id), feed)
      },
    [],
  )

  const addFeed = useCallback(
    (val: Partial<Feed>) => {
      const id = uuid()
      upsert({
        ...defaultFeedStateValue(),
        ...val,
        id,
      })

      return id
    },
    [upsert],
  )

  return {
    upsert,
    addFeed,
  }
}

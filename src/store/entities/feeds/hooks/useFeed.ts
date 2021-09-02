import { useRecoilCallback, useRecoilValue } from 'recoil'
import { feedSelector } from '../atom'
import { Feed } from '../type'
import { useFeedCommand } from './useFeedCommand'

export const useFeed = (feedId?: string) => {
  const feed = useRecoilValue(feedSelector(feedId || ''))
  const { upsert } = useFeedCommand()

  const setFeed = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<Feed>) => {
        const prev = await snapshot.getPromise(feedSelector(feed.id))
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert, feed.id],
  )

  return {
    feed,
    setFeed,
  }
}

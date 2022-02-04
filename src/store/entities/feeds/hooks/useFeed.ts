import { useRecoilCallback, useRecoilValue } from 'recoil'
import { feedState } from '../atom'
import { TaskFeed } from '../type'
import { useFeedCommand } from './useFeedCommand'

export const useFeed = (feedId?: string) => {
  const feed = useRecoilValue(feedState(feedId || ''))
  const { upsert } = useFeedCommand()

  const setFeed = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<TaskFeed>) => {
        const prev = await snapshot.getPromise(feedState(feed.id))
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

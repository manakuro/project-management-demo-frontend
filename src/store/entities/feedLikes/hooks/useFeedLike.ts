import { useRecoilCallback, useRecoilValue } from 'recoil'
import { feedLikeSelector } from '../atom'
import { FeedLike } from '../type'
import { useFeedLikeCommand } from './useFeedLikeCommand'

export const useFeedLike = (feedLikeId?: string) => {
  const feedLike = useRecoilValue(feedLikeSelector(feedLikeId || ''))
  const { upsert } = useFeedLikeCommand()

  const setFeedLike = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<FeedLike>) => {
        const prev = await snapshot.getPromise(feedLikeSelector(feedLike.id))
        upsert({
          ...prev,
          ...val,
        })
      },
    [upsert, feedLike.id],
  )

  return {
    feedLike,
    setFeedLike,
  }
}

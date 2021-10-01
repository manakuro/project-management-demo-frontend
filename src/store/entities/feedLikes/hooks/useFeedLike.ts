import { useRecoilCallback, useRecoilValue } from 'recoil'
import { feedLikeState } from '../atom'
import { FeedLike } from '../type'
import { useFeedLikeCommand } from './useFeedLikeCommand'

export const useFeedLike = (feedLikeId?: string) => {
  const feedLike = useRecoilValue(feedLikeState(feedLikeId || ''))
  const { upsert } = useFeedLikeCommand()

  const setFeedLike = useRecoilCallback(
    ({ snapshot }) =>
      async (val: Partial<FeedLike>) => {
        const prev = await snapshot.getPromise(feedLikeState(feedLike.id))
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

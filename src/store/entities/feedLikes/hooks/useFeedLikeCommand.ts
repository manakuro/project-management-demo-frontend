import { useRecoilCallback } from 'recoil'
import { feedLikeSelector } from '../atom'
import { FeedLike } from '../type'

export const useFeedLikeCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (feedLike: FeedLike) => {
        set(feedLikeSelector(feedLike.id), feedLike)
      },
    [],
  )

  return {
    upsert,
  }
}

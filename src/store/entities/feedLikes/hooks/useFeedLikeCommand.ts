import { useRecoilCallback } from 'recoil'
import { feedLikeState } from '../atom'
import { FeedLike } from '../type'

export const useFeedLikeCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (feedLike: FeedLike) => {
        set(feedLikeState(feedLike.id), feedLike)
      },
    [],
  )

  return {
    upsert,
  }
}

import { useRecoilCallback } from 'recoil'
import { feedLikeState } from '../atom'
import { FeedLike } from '../type'

export const useFeedLikesResponse = () => {
  const setFeedLikes = useRecoilCallback(
    ({ set }) =>
      (data: FeedLike[]) => {
        data.forEach((d) => {
          set(feedLikeState(d.id), d)
        })
      },
    [],
  )

  return {
    setFeedLikes,
  }
}

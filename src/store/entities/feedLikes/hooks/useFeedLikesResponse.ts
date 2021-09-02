import { useRecoilCallback } from 'recoil'
import { feedLikeSelector } from '../atom'
import { FeedLike } from '../type'

export const useFeedLikesResponse = () => {
  const setFeedLikes = useRecoilCallback(
    ({ set }) =>
      (data: FeedLike[]) => {
        data.forEach((d) => {
          set(feedLikeSelector(d.id), d)
        })
      },
    [],
  )

  return {
    setFeedLikes,
  }
}

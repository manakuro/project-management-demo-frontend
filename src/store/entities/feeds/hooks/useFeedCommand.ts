import { useRecoilCallback } from 'recoil'
import { feedSelector } from '../atom'
import { Feed } from '../type'

export const useFeedCommand = () => {
  const upsert = useRecoilCallback(
    ({ set }) =>
      (feed: Feed) => {
        set(feedSelector(feed.id), feed)
      },
    [],
  )

  return {
    upsert,
  }
}

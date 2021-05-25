import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/Feeds/FeedListItem/Provider'
import { useTeammates } from 'src/store/teammates'
import { useFeedLikesByFeedId } from 'src/store/feedLikes'
import { useMe } from 'src/store/me'
import { useMemo } from 'react'

export const useLike = () => {
  const { feed } = useFeedListItem()
  const { getTeammatesById } = useTeammates()
  const { feedLikes, teammateIds } = useFeedLikesByFeedId(feed.id)
  const { me } = useMe()

  const likeLength = useMemo(() => feedLikes.length, [feedLikes])
  const isLiked = useMemo(() => !!feedLikes.length, [feedLikes])

  const teammates = useMemo(
    () => getTeammatesById(teammateIds),
    [getTeammatesById, teammateIds],
  )

  const teammateNames = useMemo(() => {
    return [
      ...teammates.filter((t) => t.id === me.id),
      ...teammates.filter((t) => t.id !== me.id),
    ].map((t) => {
      return t.id === me.id ? 'You' : t.name
    })
  }, [me.id, teammates])

  const label = useMemo(() => {
    const names =
      teammateNames.length > 2
        ? [...teammateNames.slice(0, 2), 'others']
        : teammateNames

    return `${names.join(' and ')} liked this`
  }, [teammateNames])

  return {
    label,
    likeLength,
    isLiked,
  }
}

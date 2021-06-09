import { useCallback, useMemo } from 'react'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'
import { useFeedLikesByFeedId } from 'src/store/entities/feedLikes'
import { useMe } from 'src/store/entities/me'
import { useTeammates } from 'src/store/entities/teammates'

export const useLike = () => {
  const { feed } = useFeedListItem()
  const { getTeammatesById } = useTeammates()
  const { feedLikes, teammateIds, addFeedLike, deleteFeedLike } =
    useFeedLikesByFeedId(feed.id)
  const { me } = useMe()

  const likeLength = useMemo(() => feedLikes.length, [feedLikes])
  const hasAnyoneLiked = useMemo(() => !!feedLikes.length, [feedLikes])

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

  const onToggleLike = useCallback(() => {
    const isLiked = feedLikes.some(
      (f) => f.teammateId === me.id && f.feedId === feed.id,
    )

    isLiked ? deleteFeedLike(me.id) : addFeedLike(me.id)
  }, [addFeedLike, deleteFeedLike, feed.id, feedLikes, me.id])

  return {
    label,
    likeLength,
    hasAnyoneLiked,
    onToggleLike,
  }
}

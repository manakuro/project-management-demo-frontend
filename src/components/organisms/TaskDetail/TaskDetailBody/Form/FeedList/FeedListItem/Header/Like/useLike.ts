import { useCallback, useMemo } from 'react'
import { useTaskFeedListItemContext } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'
import { useMe } from 'src/store/entities/me'
import { useTaskFeedLikesByTaskFeedId } from 'src/store/entities/taskFeedLike'
import { useTeammates } from 'src/store/entities/teammates'

export const useLike = () => {
  const { taskFeed } = useTaskFeedListItemContext()
  const { getTeammatesById } = useTeammates()
  const { taskFeedLikes, teammateIds, addTaskFeedLike, deleteTaskFeedLike } =
    useTaskFeedLikesByTaskFeedId(taskFeed.id)
  const { me } = useMe()

  const likeLength = useMemo(() => taskFeedLikes.length, [taskFeedLikes])
  const hasAnyoneLiked = useMemo(() => !!taskFeedLikes.length, [taskFeedLikes])

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
    const isLiked = taskFeedLikes.some(
      (f) => f.teammateId === me.id && f.taskFeedId === taskFeed.id,
    )

    isLiked ? deleteTaskFeedLike(me.id) : addTaskFeedLike(me.id)
  }, [addTaskFeedLike, deleteTaskFeedLike, taskFeed.id, taskFeedLikes, me.id])

  return {
    label,
    likeLength,
    hasAnyoneLiked,
    onToggleLike,
  }
}

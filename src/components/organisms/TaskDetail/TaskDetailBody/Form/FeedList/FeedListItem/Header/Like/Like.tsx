import React from 'react'
import { LikeButton } from 'src/components/molecules'
import { useFeedListItemContext } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'
import { useLike } from './useLike'

type Props = {}

export const Like: React.VFC<Props> = () => {
  const { showLike } = useFeedListItemContext()
  const { hasAnyoneLiked, label, likeLength, onToggleLike } = useLike()

  return (
    <LikeButton
      show={showLike}
      hasAnyoneLiked={hasAnyoneLiked}
      label={label}
      likeLength={likeLength}
      onToggleLike={onToggleLike}
    />
  )
}

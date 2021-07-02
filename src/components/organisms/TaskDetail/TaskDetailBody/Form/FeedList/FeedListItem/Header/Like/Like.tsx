import React from 'react'
import { LikeButton } from 'src/components/molecules'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'
import { useLike } from './useLike'

type Props = {}

export const Like: React.VFC<Props> = () => {
  const { showLike } = useFeedListItem()
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

import React from 'react'
import { LikeIconButton } from 'src/components/molecules'
import { useTaskFeedListItemContext } from '../../Provider'
import { useLike } from './useLike'

type Props = {}

export const Like: React.VFC<Props> = () => {
  const { showLike } = useTaskFeedListItemContext()
  const { hasAnyoneLiked, label, likeLength, onToggleLike } = useLike()

  return (
    <LikeIconButton
      show={showLike}
      hasAnyoneLiked={hasAnyoneLiked}
      label={label}
      likeLength={likeLength}
      onToggleLike={onToggleLike}
    />
  )
}

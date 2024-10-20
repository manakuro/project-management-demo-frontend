import React from 'react'
import { LikeIconButton } from 'src/components/ui/molecules'
import { useTaskFeedListItemContext } from '../../Provider'
import { useLike } from './useLike'

type Props = {}

export const Like: React.FC<Props> = () => {
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

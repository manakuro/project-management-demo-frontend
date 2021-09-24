import React, { memo } from 'react'
import { IconButtonProps, TextProps } from 'src/components/atoms'
import { LikeIconButton } from 'src/components/molecules'
import { useLike } from './useLike'

type Props = {
  taskId: string
  show?: boolean
  textStyle?: TextProps
} & Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>

export const LikeTaskIconButton: React.VFC<Props> = memo<Props>((props) => {
  const { taskId, show, ...rest } = props
  const { hasAnyoneLiked, label, likeLength, onToggleLike } = useLike(props)

  return (
    <LikeIconButton
      show={show}
      hasAnyoneLiked={hasAnyoneLiked}
      label={label}
      likeLength={likeLength}
      onToggleLike={onToggleLike}
      {...rest}
    />
  )
})
LikeTaskIconButton.displayName = 'LikeTaskIconButton'
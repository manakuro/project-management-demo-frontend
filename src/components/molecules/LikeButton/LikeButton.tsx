import React, { memo } from 'react'
import { IconButton, IconButtonProps, TextProps } from 'src/components/atoms'
import { Icon } from './Icon'

type Props = {
  hasAnyoneLiked: boolean
  label: string
  likeLength: number
  onToggleLike: () => void
  show?: boolean
  textStyle?: TextProps
} & Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>
export type LikeButtonProps = Props

export const LikeButton: React.VFC<Props> = memo<Props>((props) => {
  const {
    hasAnyoneLiked,
    label,
    likeLength,
    onToggleLike,
    show,
    textStyle,
    ...rest
  } = props
  if (!props.show) return null

  return (
    <IconButton
      aria-label="Like this"
      icon={
        <Icon
          hasAnyoneLiked={hasAnyoneLiked}
          label={label}
          likeLength={likeLength}
          onToggleLike={onToggleLike}
          textStyle={textStyle}
        />
      }
      variant="ghost"
      size="sm"
      {...rest}
    />
  )
})
LikeButton.displayName = 'LikeButton'

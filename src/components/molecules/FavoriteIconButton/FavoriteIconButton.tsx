import React, { memo, useCallback } from 'react'
import {
  Icon,
  IconButton,
  IconButtonProps,
  IconProps,
} from 'src/components/atoms'

type Props = {
  favoriteId: string
  isFavorite: (favoriteId: string) => boolean
  setFavorite: (favoriteId: string) => void
  iconStyle?: {
    favorite: Omit<IconProps, 'icon'>
    none: Omit<IconProps, 'icon'>
  }
} & Omit<IconButtonProps, 'aria-label'>
export type FavoriteButtonProps = Props

export const FavoriteIconButton: React.FC<Props> = memo<Props>((props) => {
  const { favoriteId, iconStyle, isFavorite, setFavorite, ...rest } = props

  const favoriteIconStyle: IconProps = isFavorite(favoriteId)
    ? { icon: 'starFilled', color: 'yellow.300', ...iconStyle?.favorite }
    : { icon: 'starOutline', ...iconStyle?.none }

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      e.preventDefault()

      setFavorite(favoriteId)
    },
    [favoriteId, setFavorite],
  )

  return (
    <IconButton
      onClick={handleClick}
      aria-label="favorite button"
      icon={<Icon {...favoriteIconStyle} size="xs" />}
      variant="ghost"
      {...rest}
    />
  )
})
FavoriteIconButton.displayName = 'FavoriteButton'

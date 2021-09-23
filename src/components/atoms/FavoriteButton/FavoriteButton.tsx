import React, { memo, useCallback } from 'react'
import {
  Icon,
  IconButton,
  IconButtonProps,
  IconProps,
} from 'src/components/atoms'
import { useFavoriteProjectIds } from 'src/store/entities/favoriteProjectIds'

type Props = {
  favoriteProjectId: string
  iconStyle?: {
    favorite: Omit<IconProps, 'icon'>
    none: Omit<IconProps, 'icon'>
  }
} & Omit<IconButtonProps, 'aria-label'>
export type FavoriteButtonProps = Props

export const FavoriteButton: React.FC<Props> = memo<Props>((props) => {
  const { favoriteProjectId, iconStyle, ...rest } = props
  const { isFavorite, setFavoriteProjectId } = useFavoriteProjectIds()

  const favoriteIconStyle: IconProps = isFavorite(favoriteProjectId)
    ? {
        icon: 'starFilled',
        color: 'yellow.300',
        ...iconStyle?.favorite,
      }
    : {
        icon: 'starOutline',
        ...iconStyle?.none,
      }

  const handleClick = useCallback(() => {
    setFavoriteProjectId(favoriteProjectId)
  }, [favoriteProjectId, setFavoriteProjectId])

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
FavoriteButton.displayName = 'FavoriteButton'

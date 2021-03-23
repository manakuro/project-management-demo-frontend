import React, { useCallback } from 'react'
import { Icon, IconButton, IconProps } from 'src/components/atoms'
import { useClickableHover } from 'src/hooks'
import { useFavoriteProjectIds } from 'src/store/favorteProjectIds'

type Props = {
  favoriteProjectId: string
}
export type FavoriteButtonProps = Props

export const FavoriteButton: React.FC<Props> = (props) => {
  const { clickableHoverLightStyle } = useClickableHover()
  const { isFavorite, setFavoriteProjectId } = useFavoriteProjectIds()

  const iconStyle: IconProps = isFavorite(props.favoriteProjectId)
    ? {
        icon: 'starFilled',
        color: 'yellow.300',
      }
    : {
        icon: 'starOutline',
      }

  const handleClick = useCallback(() => {
    setFavoriteProjectId(props.favoriteProjectId)
  }, [props.favoriteProjectId, setFavoriteProjectId])

  return (
    <IconButton
      onClick={handleClick}
      aria-label="favorite button"
      icon={<Icon {...iconStyle} size="xs" />}
      variant="ghost"
      {...clickableHoverLightStyle}
    />
  )
}

import React, { memo } from 'react'
import { FavoriteIconButton } from 'src/components/molecules'
import { useClickableHoverStyle } from 'src/hooks'
import { useFavoriteProjectIds } from 'src/store/entities/favoriteProjectIds'

type Props = {
  projectId: string
}

export const FavoriteButton: React.VFC<Props> = memo((props) => {
  const { projectId } = props
  const { clickableHoverLightStyle } = useClickableHoverStyle()
  const { isFavorite, setFavoriteProjectId } = useFavoriteProjectIds()

  return (
    <FavoriteIconButton
      favoriteId={projectId}
      isFavorite={isFavorite}
      setFavorite={setFavoriteProjectId}
      variant="unstyled"
      display="flex"
      {...clickableHoverLightStyle}
    />
  )
})
FavoriteButton.displayName = 'FavoriteButton'

import React, { memo } from 'react'
import { IconButtonProps } from 'src/components/atoms'
import { Tooltip, FavoriteIconButton } from 'src/components/molecules'
import { useFavoriteWorkspaceIds } from 'src/store/entities/favoriteWorkspaceIds'
import { useWorkspace } from 'src/store/entities/workspace'

type Props = {
  projectId: string
} & Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>

export const FavoriteButton: React.VFC<Props> = memo<Props>((props) => {
  const { workspace } = useWorkspace()
  const { isFavorite, setFavoriteWorkspaceId } = useFavoriteWorkspaceIds()

  return (
    <Tooltip
      hasArrow
      label="Starring adds favorites to your sidebar for easy access."
      aria-label="Favorite project"
      size="md"
      withIcon
      openDelay={500}
    >
      <FavoriteIconButton
        favoriteId={workspace.id}
        isFavorite={isFavorite}
        setFavorite={setFavoriteWorkspaceId}
        h={6}
        w={6}
        iconStyle={{
          none: { color: 'text.muted' },
        }}
        {...props}
      />
    </Tooltip>
  )
})
FavoriteButton.displayName = 'FavoriteButton'

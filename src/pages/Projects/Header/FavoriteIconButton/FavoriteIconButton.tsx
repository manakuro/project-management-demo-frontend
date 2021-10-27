import React, { memo } from 'react'
import { IconButtonProps } from 'src/components/atoms'
import {
  Tooltip,
  FavoriteIconButton as MoleculesFavoriteIconButton,
} from 'src/components/molecules'
import { useFavoriteProjectIds } from 'src/store/entities/favoriteProjectIds'
import { useProject } from 'src/store/entities/projects'

type Props = {
  projectId: string
} & Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>

export const FavoriteIconButton: React.VFC<Props> = memo<Props>((props) => {
  const { projectId } = props
  const { project } = useProject(projectId)
  const { isFavorite, setFavoriteProjectId } = useFavoriteProjectIds()

  return (
    <Tooltip
      hasArrow
      label="Starring adds favorites to your sidebar for easy access."
      aria-label="Favorite project"
      size="md"
      withIcon
      openDelay={500}
    >
      <MoleculesFavoriteIconButton
        favoriteId={projectId}
        isFavorite={isFavorite}
        setFavorite={setFavoriteProjectId}
        h={6}
        w={6}
        iconStyle={{
          favorite: { color: project.color.color },
          none: { color: 'text.muted' },
        }}
      />
    </Tooltip>
  )
})
FavoriteIconButton.displayName = 'FavoriteIconButton'

import React, { memo } from 'react'
import { FavoriteButton, IconButtonProps } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'
import { useProject } from 'src/store/entities/projects'

type Props = {
  projectId: string
} & Omit<IconButtonProps, 'aria-label' | 'icon' | 'textStyle'>

export const FavoriteIconButton: React.VFC<Props> = memo<Props>((props) => {
  const { projectId } = props
  const { project } = useProject(projectId)

  return (
    <Tooltip
      hasArrow
      label="Starring adds favorites to your sidebar for easy access."
      aria-label="Favorite project"
      size="md"
      withIcon
      openDelay={500}
    >
      <FavoriteButton
        favoriteProjectId={projectId}
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

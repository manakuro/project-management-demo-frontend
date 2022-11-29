import React, { memo } from 'react'
import { ProjectsContainer } from 'src/pages/Home/ProjectsContainer'
import { useFavoriteProjectIds } from 'src/store/entities/favoriteProjectIds'

type Props = {}

export const FavoriteProjects: React.FC<Props> = memo<Props>(() => {
  const { favoriteProjectIds } = useFavoriteProjectIds()

  if (!favoriteProjectIds.length) return null

  return (
    <ProjectsContainer
      title="Favorite Projects"
      showNewOrder={false}
      projectIds={favoriteProjectIds}
      projectTileItemProps={{
        'aria-label': 'favorite project tile item',
      }}
      projectListItemProps={{
        'aria-label': 'favorite project list item',
      }}
    />
  )
})
FavoriteProjects.displayName = 'FavoriteProjects'

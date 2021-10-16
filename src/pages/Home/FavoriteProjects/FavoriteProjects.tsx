import React, { memo } from 'react'
import { ProjectsContainer } from 'src/pages/Home/ProjectsContainer'
import { useFavoriteProjectIds } from 'src/store/entities/favoriteProjectIds'

type Props = {}

export const FavoriteProjects: React.VFC<Props> = memo<Props>(() => {
  const { favoriteProjectIds } = useFavoriteProjectIds()

  if (!favoriteProjectIds.length) return null

  return (
    <ProjectsContainer
      title="Favorite Projects"
      showNewOrder={false}
      projectIds={favoriteProjectIds}
    />
  )
})
FavoriteProjects.displayName = 'FavoriteProjects'

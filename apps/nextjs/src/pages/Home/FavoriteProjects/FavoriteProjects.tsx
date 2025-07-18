import { memo } from 'react';
import { ProjectsContainer } from 'src/pages/Home/ProjectsContainer';
import { useFavoriteProjectIds } from 'src/store/entities/favoriteProjectIds';

export const FavoriteProjects = memo(function FavoriteProjects() {
  const { favoriteProjectIds } = useFavoriteProjectIds();

  if (!favoriteProjectIds.length) return null;

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
  );
});

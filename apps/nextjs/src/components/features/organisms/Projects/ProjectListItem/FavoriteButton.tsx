import { FavoriteIconButton } from '@/components/ui/molecules';
import { useClickableHoverStyle } from '@/hooks';
import {
  useFavoriteProjectIds,
  useFavoriteProjectIdsCommand,
} from '@/store/entities/favoriteProjectIds';
import type React from 'react';
import { memo } from 'react';

type Props = {
  projectId: string;
};

export const FavoriteButton: React.FC<Props> = memo((props) => {
  const { projectId } = props;
  const { clickableHoverLightStyle } = useClickableHoverStyle();
  const { setFavoriteProjectId } = useFavoriteProjectIdsCommand();
  const { isFavorite } = useFavoriteProjectIds();

  return (
    <FavoriteIconButton
      favoriteId={projectId}
      isFavorite={isFavorite}
      setFavorite={setFavoriteProjectId}
      variant="unstyled"
      display="flex"
      {...clickableHoverLightStyle}
    />
  );
});
FavoriteButton.displayName = 'FavoriteButton';

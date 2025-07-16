import type React from 'react';
import { useCallback, useMemo } from 'react';
import {
  useFavoriteProjectIds,
  useFavoriteProjectIdsCommand,
} from 'src/store/entities/favoriteProjectIds';
import { MenuItem } from './MenuItem';

type Props = {
  projectId: string;
  onClose: () => void;
  onMouseEnter: () => void;
};

export const Favorite: React.FC<Props> = (props) => {
  const { projectId, onClose, onMouseEnter } = props;
  const { setFavoriteProjectId } = useFavoriteProjectIdsCommand();
  const { isFavorite } = useFavoriteProjectIds();

  const text = useMemo(
    () =>
      isFavorite(projectId) ? 'Remove from favorites' : 'Add to Favorites',
    [isFavorite, projectId],
  );

  const handleClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      onClose();

      await setFavoriteProjectId(projectId);
    },
    [onClose, projectId, setFavoriteProjectId],
  );

  return (
    <MenuItem onMouseEnter={onMouseEnter} onClick={handleClick}>
      {text}
    </MenuItem>
  );
};

import type React from 'react';
import { useCallback } from 'react';
import { MenuItem } from 'src/components/ui/organisms/Menu';
import { useFavoriteWorkspaceIdsCommand } from 'src/store/entities/favoriteWorkspaceIds';

type Props = {
  workspaceId: string;
  onClose: () => void;
};

export const RemoveFromFavorites: React.FC<Props> = (props) => {
  const { onClose, workspaceId } = props;
  const { setFavoriteWorkspaceId } = useFavoriteWorkspaceIdsCommand();

  const handleClick = useCallback(() => {
    onClose();
    setFavoriteWorkspaceId(workspaceId);
  }, [onClose, workspaceId, setFavoriteWorkspaceId]);

  return <MenuItem onClick={handleClick}>Remove from Favorites</MenuItem>;
};

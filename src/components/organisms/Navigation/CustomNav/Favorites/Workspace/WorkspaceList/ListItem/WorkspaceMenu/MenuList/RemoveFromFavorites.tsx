import React, { useCallback } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { useFavoriteWorkspaceIds } from 'src/store/entities/favoriteWorkspaceIds'

type Props = {
  workspaceId: string
  onClose: () => void
}

export const RemoveFromFavorites: React.FC<Props> = (props) => {
  const { onClose, workspaceId } = props
  const { setFavoriteWorkspaceId } = useFavoriteWorkspaceIds()

  const handleClick = useCallback(() => {
    setFavoriteWorkspaceId(workspaceId)

    onClose()
  }, [onClose, workspaceId, setFavoriteWorkspaceId])

  return <MenuItem onClick={handleClick}>Remove from Favorites</MenuItem>
}

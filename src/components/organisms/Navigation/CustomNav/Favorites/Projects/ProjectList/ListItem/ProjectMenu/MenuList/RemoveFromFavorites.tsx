import React, { useCallback } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { useFavoriteProjectIdsCommand } from 'src/store/entities/favoriteProjectIds'

type Props = {
  projectId: string
  onClose: () => void
}

export const RemoveFromFavorites: React.FC<Props> = (props) => {
  const { onClose, projectId } = props
  const { setFavoriteProjectId } = useFavoriteProjectIdsCommand()

  const handleClick = useCallback(() => {
    onClose()
    setFavoriteProjectId(projectId)
  }, [onClose, projectId, setFavoriteProjectId])

  return <MenuItem onClick={handleClick}>Remove from Favorites</MenuItem>
}

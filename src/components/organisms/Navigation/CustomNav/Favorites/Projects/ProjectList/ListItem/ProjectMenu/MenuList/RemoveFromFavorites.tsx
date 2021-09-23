import React, { useCallback } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { useFavoriteProjectIds } from 'src/store/entities/favoriteProjectIds'

type Props = {
  projectId: string
  onClose: () => void
}

export const RemoveFromFavorites: React.FC<Props> = (props) => {
  const { onClose, projectId } = props
  const { setFavoriteProjectId } = useFavoriteProjectIds()

  const handleClick = useCallback(() => {
    setFavoriteProjectId(projectId)

    onClose()
  }, [onClose, projectId, setFavoriteProjectId])

  return <MenuItem onClick={handleClick}>Remove from Favorites</MenuItem>
}

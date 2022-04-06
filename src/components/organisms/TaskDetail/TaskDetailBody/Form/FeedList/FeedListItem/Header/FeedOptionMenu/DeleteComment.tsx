import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { useTaskFeedListItemContext } from '../../Provider'

type Props = {}

export const DeleteComment: React.FC<Props> = memo(() => {
  const { hasText, onDelete } = useTaskFeedListItemContext()
  if (!hasText) return null

  return (
    <MenuItem color="alert" onClick={onDelete}>
      Delete comment
    </MenuItem>
  )
})
DeleteComment.displayName = 'DeleteComment'

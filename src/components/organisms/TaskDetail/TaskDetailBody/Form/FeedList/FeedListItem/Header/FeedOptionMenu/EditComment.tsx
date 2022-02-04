import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { useTaskFeedListItemContext } from '../../Provider'

type Props = {}

export const EditComment: React.FC<Props> = memo(() => {
  const { onEdit, hasText } = useTaskFeedListItemContext()
  if (!hasText) return null

  return <MenuItem onClick={onEdit}>Edit comment</MenuItem>
})
EditComment.displayName = 'EditComment'

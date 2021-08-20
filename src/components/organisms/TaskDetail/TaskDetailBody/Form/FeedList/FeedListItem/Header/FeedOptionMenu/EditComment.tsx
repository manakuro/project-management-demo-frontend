import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { useFeedListItemContext } from '../../Provider'

type Props = {}

export const EditComment: React.FC<Props> = memo(() => {
  const { onEdit, hasText } = useFeedListItemContext()
  if (!hasText) return null

  return <MenuItem onClick={onEdit}>Edit comment</MenuItem>
})
EditComment.displayName = 'EditComment'

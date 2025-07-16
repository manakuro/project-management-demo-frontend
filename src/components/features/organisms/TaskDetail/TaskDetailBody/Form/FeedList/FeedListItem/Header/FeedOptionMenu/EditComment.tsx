import { memo } from 'react'
import { MenuItem } from 'src/components/ui/organisms/Menu'
import { useTaskFeedListItemContext } from '../../Provider'

export const EditComment = memo(function EditComment() {
  const { onEdit, hasText } = useTaskFeedListItemContext()
  if (!hasText) return null

  return <MenuItem onClick={onEdit}>Edit comment</MenuItem>
})

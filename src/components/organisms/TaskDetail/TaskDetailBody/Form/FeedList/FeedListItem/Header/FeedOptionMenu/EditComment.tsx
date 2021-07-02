import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms'
import { useFeedListItemContext } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'

type Props = {}

export const EditComment: React.FC<Props> = memo(() => {
  const { onEdit, hasText } = useFeedListItemContext()
  if (!hasText) return null

  return <MenuItem onClick={onEdit}>Edit comment</MenuItem>
})
EditComment.displayName = 'EditComment'

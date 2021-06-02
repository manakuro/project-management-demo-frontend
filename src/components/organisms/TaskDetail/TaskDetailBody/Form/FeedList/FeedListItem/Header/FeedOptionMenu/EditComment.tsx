import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'

type Props = {}

export const EditComment: React.FC<Props> = memo(() => {
  const { onEdit, hasText } = useFeedListItem()
  if (!hasText) return null

  return <MenuItem onClick={onEdit}>Edit comment</MenuItem>
})
EditComment.displayName = 'EditComment'
import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'

type Props = {}

export const DeleteComment: React.FC<Props> = memo(() => {
  const { hasText } = useFeedListItem()
  if (!hasText) return null

  return <MenuItem color="alert">Delete comment</MenuItem>
})
DeleteComment.displayName = 'DeleteComment'
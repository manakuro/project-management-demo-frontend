import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms'
import { useFeedListItemContext } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'

type Props = {}

export const DeleteStory: React.FC<Props> = memo(() => {
  const { hasAttachment, hasText } = useFeedListItemContext()
  if (hasText || !hasAttachment) return null

  return <MenuItem color="alert">Delete Story</MenuItem>
})
DeleteStory.displayName = 'DeleteStory'

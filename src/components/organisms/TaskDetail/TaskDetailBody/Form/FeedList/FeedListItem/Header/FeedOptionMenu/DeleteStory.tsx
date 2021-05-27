import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'

type Props = {}

export const DeleteStory: React.FC<Props> = memo(() => {
  const { isAttachment } = useFeedListItem()
  if (!isAttachment) return null

  return <MenuItem color="alert">Delete Story</MenuItem>
})
DeleteStory.displayName = 'DeleteStory'

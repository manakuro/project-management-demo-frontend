import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'

type Props = {}

export const CopyCommentLink: React.FC<Props> = memo(() => {
  const { onCopyCommentLink, isText } = useFeedListItem()
  if (!isText) return null

  return <MenuItem onClick={onCopyCommentLink}>Copy comment link</MenuItem>
})
CopyCommentLink.displayName = 'CopyCommentLink'

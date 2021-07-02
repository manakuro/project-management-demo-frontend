import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms'
import { useFeedListItemContext } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'

type Props = {}

export const CopyCommentLink: React.FC<Props> = memo(() => {
  const { onCopyCommentLink, hasText } = useFeedListItemContext()
  if (!hasText) return null

  return <MenuItem onClick={onCopyCommentLink}>Copy comment link</MenuItem>
})
CopyCommentLink.displayName = 'CopyCommentLink'

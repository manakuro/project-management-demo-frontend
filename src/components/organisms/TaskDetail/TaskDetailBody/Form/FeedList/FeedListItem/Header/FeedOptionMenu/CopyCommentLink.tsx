import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { useFeedListItemContext } from '../../Provider'

type Props = {}

export const CopyCommentLink: React.FC<Props> = memo(() => {
  const { onCopyCommentLink, hasText } = useFeedListItemContext()
  if (!hasText) return null

  return <MenuItem onClick={onCopyCommentLink}>Copy comment link</MenuItem>
})
CopyCommentLink.displayName = 'CopyCommentLink'

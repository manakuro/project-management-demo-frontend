import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { useTaskFeedListItemContext } from '../../Provider'

type Props = {}

export const DeleteComment: React.FC<Props> = memo(() => {
  const { hasText } = useTaskFeedListItemContext()
  if (!hasText) return null

  return <MenuItem color="alert">Delete comment</MenuItem>
})
DeleteComment.displayName = 'DeleteComment'

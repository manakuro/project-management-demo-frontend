import React, { memo } from 'react'
import { MenuItem } from 'src/components/ui/organisms/Menu'
import { useTaskFeedListItemContext } from '../../Provider'

type Props = {}

export const DeleteStory: React.FC<Props> = memo(() => {
  const { hasTaskFile, hasText } = useTaskFeedListItemContext()
  if (hasText || !hasTaskFile) return null

  return <MenuItem color="alert">Delete Story</MenuItem>
})
DeleteStory.displayName = 'DeleteStory'

import React, { memo } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { useFeedListItemContext } from '../../Provider'

type Props = {}

export const DeleteStory: React.FC<Props> = memo(() => {
  const { hasTaskFile, hasText } = useFeedListItemContext()
  if (hasText || !hasTaskFile) return null

  return <MenuItem color="alert">Delete Story</MenuItem>
})
DeleteStory.displayName = 'DeleteStory'

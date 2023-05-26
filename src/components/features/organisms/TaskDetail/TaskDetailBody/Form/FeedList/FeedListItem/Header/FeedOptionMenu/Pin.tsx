import React, { memo } from 'react'

import { MenuItem } from 'src/components/ui/organisms/Menu'
import { useTaskFeedListItemContext } from '../../Provider'

type Props = {}

export const Pin: React.FC<Props> = memo(() => {
  const { onUnpin, onPin, taskFeed } = useTaskFeedListItemContext()

  if (taskFeed.isPinned)
    return <MenuItem onClick={onUnpin}>Unpin from top</MenuItem>

  return <MenuItem onClick={onPin}>Pin to top</MenuItem>
})
Pin.displayName = 'Pin'

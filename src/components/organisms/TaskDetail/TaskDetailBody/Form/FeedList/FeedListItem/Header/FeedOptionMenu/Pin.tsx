import React, { memo } from 'react'

import { MenuItem } from 'src/components/organisms'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/FeedList/FeedListItem/Provider'

type Props = {}

export const Pin: React.FC<Props> = memo(() => {
  const { onUnpin, onPin, feed } = useFeedListItem()

  if (feed.isPinned)
    return <MenuItem onClick={onUnpin}>Unpin from top</MenuItem>

  return <MenuItem onClick={onPin}>Pin to top</MenuItem>
})
Pin.displayName = 'Pin'

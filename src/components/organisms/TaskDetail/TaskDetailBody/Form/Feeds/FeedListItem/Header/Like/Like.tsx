import React from 'react'
import { IconButton } from 'src/components/atoms'
import { useFeedListItem } from 'src/components/organisms/TaskDetail/TaskDetailBody/Form/Feeds/FeedListItem/Provider'
import { Icon } from './Icon'

type Props = {}

export const Like: React.VFC<Props> = () => {
  const { showLike } = useFeedListItem()

  if (!showLike) return null

  return (
    <IconButton
      aria-label="Like this"
      icon={<Icon />}
      variant="ghost"
      size="sm"
    />
  )
}

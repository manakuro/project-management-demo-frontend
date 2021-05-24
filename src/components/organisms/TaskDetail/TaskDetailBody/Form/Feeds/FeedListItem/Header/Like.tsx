import React from 'react'
import { Icon, IconButton } from 'src/components/atoms'
import { useFeedListItem } from '../Provider'

type Props = {}

export const Like: React.VFC<Props> = () => {
  const { showLike } = useFeedListItem()
  if (!showLike) return null

  return (
    <IconButton
      aria-label="Like this"
      icon={<Icon icon="like" color="text.muted" />}
      variant="ghost"
      size="sm"
    />
  )
}

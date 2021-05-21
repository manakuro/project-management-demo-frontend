import React from 'react'
import { Icon, IconButton } from 'src/components/atoms'

type Props = {}

export const Like: React.VFC<Props> = () => {
  return (
    <IconButton
      aria-label="Like this"
      icon={<Icon icon="like" color="text.muted" />}
      variant="ghost"
      size="sm"
    />
  )
}

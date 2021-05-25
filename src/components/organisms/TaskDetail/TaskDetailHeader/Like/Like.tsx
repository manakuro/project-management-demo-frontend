import React from 'react'
import { Icon, IconButton } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'

type Props = {}

export const Like: React.FC<Props> = () => {
  return (
    <Tooltip hasArrow label="Like this task" aria-label="Like button" size="sm">
      <IconButton
        aria-label="Like this task"
        icon={<Icon icon="outlineLike" color="text.muted" />}
        variant="ghost"
        size="sm"
      />
    </Tooltip>
  )
}

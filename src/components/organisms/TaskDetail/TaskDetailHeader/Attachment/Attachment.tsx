import React from 'react'
import { Icon, IconButton } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'

type Props = {}

export const Attachment: React.FC<Props> = () => {
  return (
    <Tooltip
      hasArrow
      label="Add a file to this task"
      aria-label="Attachment button"
      size="md"
      openDelay={500}
    >
      <IconButton
        aria-label="attachment file"
        icon={<Icon icon="attach" color="text.muted" />}
        variant="ghost"
        size="sm"
      />
    </Tooltip>
  )
}

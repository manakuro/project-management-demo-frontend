import React from 'react'
import { Icon, IconButton } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'

type Props = {}

export const Copy: React.FC<Props> = () => {
  return (
    <Tooltip
      hasArrow
      label="Copy task link"
      aria-label="Copy task link button description"
      size="sm"
    >
      <IconButton
        aria-label="Copy button"
        icon={<Icon icon="copyAlt" color="text.muted" />}
        variant="ghost"
        size="sm"
      />
    </Tooltip>
  )
}

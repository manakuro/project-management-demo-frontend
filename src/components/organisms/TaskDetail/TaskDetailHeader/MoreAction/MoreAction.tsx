import React from 'react'
import { Icon, IconButton } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'

type Props = {}

export const MoreAction: React.FC<Props> = () => {
  return (
    <Tooltip
      hasArrow
      label="More actions"
      aria-label="More actions button"
      size="sm"
      openDelay={500}
    >
      <IconButton
        aria-label="More actions"
        icon={<Icon icon="dotsHorizontalRounded" color="text.muted" />}
        variant="ghost"
        size="sm"
      />
    </Tooltip>
  )
}

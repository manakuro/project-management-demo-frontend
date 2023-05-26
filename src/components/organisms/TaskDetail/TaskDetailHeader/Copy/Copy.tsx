import React, { memo } from 'react'
import { Tooltip } from 'src/components/molecules'
import { Icon, IconButton } from 'src/components/ui/atoms'

type Props = {
  taskId: string
}

export const Copy: React.FC<Props> = memo(() => {
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
        isDisabled
      />
    </Tooltip>
  )
})
Copy.displayName = 'Copy'

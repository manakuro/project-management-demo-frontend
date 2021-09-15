import React, { memo, useCallback } from 'react'
import { Icon, IconButton, IconButtonProps } from 'src/components/atoms'
import { Tooltip } from 'src/components/molecules'

type Props = {
  taskId: string
} & Omit<IconButtonProps, 'aria-label'>

export const ArchiveButton: React.VFC<Props> = memo<Props>((props) => {
  const { taskId, ...rest } = props
  const handleClick = useCallback(() => {}, [])

  return (
    <Tooltip
      hasArrow
      label="Archive notification"
      aria-label="A due time description"
    >
      <IconButton
        aria-label="Archive notifications"
        icon={<Icon icon="trashAlt" color="text.muted" size="xs" />}
        variant="ghost"
        {...rest}
        onClick={handleClick}
      />
    </Tooltip>
  )
})

ArchiveButton.displayName = 'ArchiveButton'
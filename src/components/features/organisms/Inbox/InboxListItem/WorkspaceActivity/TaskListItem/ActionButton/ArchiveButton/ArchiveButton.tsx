import type React from 'react'
import { memo, useCallback } from 'react'
import { Icon, IconButton, type IconButtonProps } from 'src/components/ui/atoms'
import { Tooltip } from 'src/components/ui/molecules'

type Props = {
  taskId: string
} & Omit<IconButtonProps, 'aria-label'>

export const ArchiveButton: React.FC<Props> = memo<Props>((props) => {
  const { taskId, ...rest } = props
  const handleClick = useCallback(() => {}, [])

  return (
    <Tooltip
      hasArrow
      label="Archive notification"
      aria-label="Archive notification"
    >
      <IconButton
        aria-label="Archive notifications"
        icon={<Icon icon="trashAlt" color="text.muted" size="xs" />}
        variant="ghost"
        {...rest}
        onClick={handleClick}
        isDisabled
      />
    </Tooltip>
  )
})

ArchiveButton.displayName = 'ArchiveButton'

import React, { memo, useCallback } from 'react'
import { Tooltip } from 'src/components/molecules'
import { Icon, IconButton, IconButtonProps } from 'src/components/ui/atoms'

type Props = {
  taskId: string
} & Omit<IconButtonProps, 'aria-label'>

export const MoveToInboxButton: React.FC<Props> = memo<Props>((props) => {
  const { taskId, ...rest } = props
  const handleClick = useCallback(() => {}, [])

  return (
    <Tooltip hasArrow label="Move to Inbox" aria-label="Move to Inbox">
      <IconButton
        aria-label="Move to Inbox"
        icon={<Icon icon="arrowLeftAlt" color="text.muted" size="xs" />}
        variant="ghost"
        {...rest}
        onClick={handleClick}
      />
    </Tooltip>
  )
})

MoveToInboxButton.displayName = 'MoveToInboxButton'

import React, { memo, useCallback } from 'react'
import { Tooltip, TooltipProps } from 'src/components/molecules'
import { Icon, IconButton, IconButtonProps } from 'src/components/ui/atoms'

type Props = {
  tooltipProps: Omit<TooltipProps, 'children'>
} & Omit<IconButtonProps, 'aria-label'>

export const MoveToInboxButton: React.FC<Props> = memo<Props>((props) => {
  const { tooltipProps, ...rest } = props
  const handleClick = useCallback(() => {}, [])

  return (
    <Tooltip hasArrow {...tooltipProps}>
      <IconButton
        aria-label="Move to Inbox"
        icon={<Icon icon="arrowLeftAlt" color="text.muted" size="xs" />}
        variant="ghost"
        h={6}
        minW={6}
        {...rest}
        onClick={handleClick}
      />
    </Tooltip>
  )
})

MoveToInboxButton.displayName = 'MoveToInboxButton'

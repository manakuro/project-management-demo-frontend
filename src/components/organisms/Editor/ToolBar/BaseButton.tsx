import React, { useCallback } from 'react'
import { IconButton, IconButtonProps } from 'src/components/atoms'
import { Tooltip, TooltipProps } from 'src/components/molecules'

type Props = {
  isActive: boolean
  onClick: () => void
  tooltip: Omit<TooltipProps, 'children'>
} & IconButtonProps

export const BaseButton: React.FC<Props> = (props) => {
  const { onClick, tooltip, ...rest } = props
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      onClick()
    },
    [onClick],
  )

  return (
    <Tooltip hasArrow {...tooltip} size="sm" withIcon openDelay={500}>
      <IconButton
        variant="ghost"
        size="sm"
        colorScheme="teal"
        onMouseDown={handleMouseDown}
        {...rest}
      />
    </Tooltip>
  )
}

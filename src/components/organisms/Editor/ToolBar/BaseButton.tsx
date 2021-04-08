import React, { useCallback } from 'react'
import { IconButton, IconButtonProps } from 'src/components/atoms'

type Props = {
  isActive: boolean
  onClick: () => void
} & IconButtonProps

export const BaseButton: React.FC<Props> = (props) => {
  const { onClick, ...rest } = props
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      onClick()
    },
    [onClick],
  )

  return (
    <IconButton
      variant="ghost"
      size="sm"
      colorScheme="teal"
      onMouseDown={handleMouseDown}
      {...rest}
    />
  )
}

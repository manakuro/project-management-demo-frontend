import React, { useCallback } from 'react'
import { Button } from 'src/components/atoms'

type Props = {
  isActive: boolean
  onClick: () => void
}

export const BaseButton: React.FC<Props> = (props) => {
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      props.onClick()
    },
    [props],
  )

  return (
    <Button
      variant="ghost"
      size="sm"
      bg={props.isActive ? 'teal.100' : 'transparent'}
      onMouseDown={handleMouseDown}
    >
      {props.children}
    </Button>
  )
}

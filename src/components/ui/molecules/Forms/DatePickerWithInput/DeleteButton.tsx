import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/ui/atoms'
import { useClickableHoverStyle } from 'src/hooks'

type Props = {
  onDelete: () => void
  isHovering: boolean
}

export const DeleteButton: React.FC<Props> = memo<Props>((props) => {
  const { isHovering, onDelete } = props
  const { clickableHoverLightStyle } = useClickableHoverStyle()

  const handleClick = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation()
      onDelete()
    },
    [onDelete],
  )

  return (
    <Icon
      ml={2}
      mt="1px"
      icon="x"
      color="text.muted"
      size="sm"
      visibility={isHovering ? 'visible' : 'hidden'}
      {...clickableHoverLightStyle}
      onClick={handleClick}
    />
  )
})
DeleteButton.displayName = 'DeleteButton'

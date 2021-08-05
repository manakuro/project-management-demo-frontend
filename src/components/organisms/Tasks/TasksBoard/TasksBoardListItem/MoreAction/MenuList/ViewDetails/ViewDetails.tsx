import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { MenuItem } from 'src/components/organisms'

type Props = {
  onMouseEnter: () => void
  onCloseMenu: () => void
  taskId: string
}
export const ViewDetails: React.FC<Props> = memo((props) => {
  const { onMouseEnter, onCloseMenu } = props

  const handleClick = useCallback(() => {
    onCloseMenu()
  }, [onCloseMenu])

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="detail" color="text.muted" />}
      onClick={handleClick}
    >
      View details
    </MenuItem>
  )
})

ViewDetails.displayName = 'ViewDetails'

import React, { memo, useCallback } from 'react'
import { MenuItem } from 'src/components/organisms'

type Props = {
  onMouseEnter: () => void
  onCloseMenu: () => void
  taskId: string
}
export const DeleteTask: React.FC<Props> = memo((props) => {
  const { onMouseEnter, onCloseMenu } = props

  const handleClick = useCallback(() => {
    onCloseMenu()
  }, [onCloseMenu])

  return (
    <MenuItem onMouseEnter={onMouseEnter} color="alert" onClick={handleClick}>
      Delete task
    </MenuItem>
  )
})

DeleteTask.displayName = 'DeleteTask'

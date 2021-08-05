import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { MenuItem, useDuplicateTaskModal } from 'src/components/organisms'

type Props = {
  onMouseEnter: () => void
  onCloseMenu: () => void
  taskId: string
}
export const DuplicateTask: React.FC<Props> = memo((props) => {
  const { onMouseEnter, onCloseMenu } = props
  const { onOpen } = useDuplicateTaskModal()

  const handleClick = useCallback(() => {
    onOpen()
    onCloseMenu()
  }, [onCloseMenu, onOpen])

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="copyAlt" color="text.muted" />}
      onClick={handleClick}
    >
      Duplicate task
    </MenuItem>
  )
})

DuplicateTask.displayName = 'DuplicateTask'

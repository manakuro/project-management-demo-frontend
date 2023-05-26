import React, { memo, useCallback } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { useDuplicateTaskModal } from 'src/components/organisms/Modals'
import { Icon } from 'src/components/ui/atoms'

type Props = {
  onMouseEnter: () => void
  onCloseMenu: () => void
  taskId: string
}
export const DuplicateTask: React.FC<Props> = memo((props) => {
  const { onMouseEnter, onCloseMenu, taskId } = props
  const { onOpen, setTaskId } = useDuplicateTaskModal()

  const handleClick = useCallback(() => {
    setTaskId(taskId)
    onOpen()
    onCloseMenu()
  }, [onCloseMenu, onOpen, setTaskId, taskId])

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="copyAlt" color="text.muted" />}
      onClick={handleClick}
      isDisabled
    >
      Duplicate task
    </MenuItem>
  )
})

DuplicateTask.displayName = 'DuplicateTask'

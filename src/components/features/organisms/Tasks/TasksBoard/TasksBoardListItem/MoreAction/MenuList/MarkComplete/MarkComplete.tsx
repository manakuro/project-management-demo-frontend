import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/ui/atoms'
import { MenuItem } from 'src/components/ui/organisms/Menu'
import { useTask } from 'src/store/entities/task'
import { useTasksBoardListItemContext } from '../../../Provider'

type Props = {
  onMouseEnter: () => void
  onCloseMenu: () => void
  taskId: string
}
export const MarkComplete: React.FC<Props> = memo((props) => {
  const { task } = useTask(props.taskId)
  const { onToggleDone } = useTasksBoardListItemContext()
  const { onMouseEnter, onCloseMenu } = props

  const handleClick = useCallback(async () => {
    onToggleDone()
    onCloseMenu()
  }, [onToggleDone, onCloseMenu])

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="checkCircle" color="text.muted" />}
      onClick={handleClick}
    >
      {task.completed ? 'Mark Incomplete' : 'Mark complete'}
    </MenuItem>
  )
})

MarkComplete.displayName = 'MarkComplete'

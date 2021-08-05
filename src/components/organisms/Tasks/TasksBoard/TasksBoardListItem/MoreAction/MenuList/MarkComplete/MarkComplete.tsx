import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { MenuItem } from 'src/components/organisms'
import { useTask } from 'src/store/entities/tasks'

type Props = {
  onMouseEnter: () => void
  onCloseMenu: () => void
  taskId: string
}
export const MarkComplete: React.FC<Props> = memo((props) => {
  const { task } = useTask(props.taskId)
  const { onMouseEnter, onCloseMenu } = props

  const handleClick = useCallback(() => {
    onCloseMenu()
  }, [onCloseMenu])

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="checkCircle" color="text.muted" />}
      onClick={handleClick}
    >
      {task.isDone ? 'Mark Incomplete' : 'Mark complete'}
    </MenuItem>
  )
})

MarkComplete.displayName = 'MarkComplete'

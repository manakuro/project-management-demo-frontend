import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { MenuItem } from 'src/components/organisms'
import { useTask } from 'src/store/entities/tasks'
import { useTasksBoardListItemContext } from '../../../Provider'

type Props = {
  onMouseEnter: () => void
  onCloseMenu: () => void
  taskId: string
}
export const MarkComplete: React.FC<Props> = memo((props) => {
  const { task, setTask } = useTask(props.taskId)
  const { onEndTransition, onStartTransition } = useTasksBoardListItemContext()
  const { onMouseEnter, onCloseMenu } = props

  const handleClick = useCallback(async () => {
    if (!task.isDone) {
      onStartTransition()
      setTimeout(async () => {
        await setTask({ isDone: !task.isDone })
        onEndTransition()
      }, 1000)
      onCloseMenu()
      return
    }

    await setTask({ isDone: !task.isDone })
    onEndTransition()
    onCloseMenu()
  }, [onCloseMenu, onEndTransition, onStartTransition, setTask, task.isDone])

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

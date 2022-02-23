import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { MenuItem } from 'src/components/organisms/Menu'
import { useTasksTask } from 'src/components/organisms/Tasks/hooks'
import { useToast } from 'src/hooks'
import { useTask } from 'src/store/entities/task'

type Props = {
  onMouseEnter: () => void
  onCloseMenu: () => void
  taskId: string
}
export const DeleteTask: React.FC<Props> = memo((props) => {
  const { onMouseEnter, onCloseMenu, taskId } = props
  const { task, undeleteTask } = useTask(props.taskId)
  const { deleteTask } = useTasksTask()
  const { toast } = useToast()

  const handleClick = useCallback(async () => {
    onCloseMenu()

    await deleteTask({ taskId })
    toast({
      description: `${task.name} deleted`,
      undo: undeleteTask,
    })
  }, [onCloseMenu, deleteTask, taskId, toast, task.name, undeleteTask])

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      icon={<Icon icon="trash" color="alert" />}
      color="alert"
      onClick={handleClick}
    >
      Delete task
    </MenuItem>
  )
})

DeleteTask.displayName = 'DeleteTask'

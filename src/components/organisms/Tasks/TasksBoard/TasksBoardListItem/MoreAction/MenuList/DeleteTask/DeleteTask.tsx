import React, { memo, useCallback } from 'react'
import { MenuItem } from 'src/components/organisms'
import { useToast } from 'src/hooks'
import { useTask } from 'src/store/entities/tasks'

type Props = {
  onMouseEnter: () => void
  onCloseMenu: () => void
  taskId: string
}
export const DeleteTask: React.FC<Props> = memo((props) => {
  const { onMouseEnter, onCloseMenu } = props
  const { task, deleteTask, undeleteTask } = useTask(props.taskId)
  const { toast } = useToast()

  const handleClick = useCallback(async () => {
    await deleteTask()
    toast({
      description: `${task.name} deleted`,
      undo: undeleteTask,
    })
    onCloseMenu()
  }, [deleteTask, undeleteTask, onCloseMenu, task.name, toast])

  return (
    <MenuItem onMouseEnter={onMouseEnter} color="alert" onClick={handleClick}>
      Delete task
    </MenuItem>
  )
})

DeleteTask.displayName = 'DeleteTask'

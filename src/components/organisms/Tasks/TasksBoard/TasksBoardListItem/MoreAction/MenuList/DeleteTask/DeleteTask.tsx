import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { MenuItem } from 'src/components/organisms/Menu'
import { useToast } from 'src/hooks'
import { useTask, useTaskCommand } from 'src/store/entities/task'

type Props = {
  onMouseEnter: () => void
  taskId: string
}
export const DeleteTask: React.FC<Props> = memo((props) => {
  const { onMouseEnter, taskId } = props
  const { task, undeleteTask } = useTask(props.taskId)
  const { deleteTask } = useTaskCommand()
  const { toast } = useToast()

  const handleClick = useCallback(async () => {
    await deleteTask({ taskId })
    toast({
      description: `${task.name} deleted`,
      undo: undeleteTask,
      duration: 10000,
    })
  }, [deleteTask, taskId, toast, task.name, undeleteTask])

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

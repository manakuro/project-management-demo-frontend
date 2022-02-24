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
  const { task } = useTask(props.taskId)
  const { deleteTask, undeleteTask } = useTaskCommand()
  const { toast } = useToast()

  const handleUndo = useCallback(() => {
    undeleteTask({ taskId })
  }, [taskId, undeleteTask])

  const handleClick = useCallback(async () => {
    await deleteTask({ taskId })
    toast({
      description: `${task.name} deleted`,
      undo: handleUndo,
      duration: 10000,
    })
  }, [deleteTask, taskId, toast, task.name, handleUndo])

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

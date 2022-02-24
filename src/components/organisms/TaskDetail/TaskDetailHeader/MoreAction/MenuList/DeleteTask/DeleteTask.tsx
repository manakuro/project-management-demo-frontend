import React, { memo, useCallback } from 'react'
import { MenuItem } from 'src/components/organisms/Menu'
import { useToast } from 'src/hooks'
import { useTask, useTaskCommand } from 'src/store/entities/task'

type Props = {
  onMouseEnter: () => void
  onClose: () => void
  taskId: string
}
export const DeleteTask: React.FC<Props> = memo((props) => {
  // TODO: Fix `Can't perform a React state update on an unmounted component ...` error.
  const { onMouseEnter, taskId, onClose } = props
  const { task } = useTask(props.taskId)
  const { deleteTask, undeleteTask } = useTaskCommand()
  const { toast } = useToast()

  const handleUndo = useCallback(async () => {
    await undeleteTask({ taskId })
  }, [taskId, undeleteTask])

  const handleClick = useCallback(async () => {
    onClose()
    await deleteTask({ taskId })
    toast({
      description: `${task.name} deleted`,
      undo: handleUndo,
      duration: 10000,
    })
  }, [onClose, deleteTask, taskId, toast, task.name, handleUndo])

  return (
    <MenuItem
      onMouseEnter={onMouseEnter}
      color="alert"
      command="Tab+Del"
      onClick={handleClick}
    >
      Delete task
    </MenuItem>
  )
})

DeleteTask.displayName = 'DeleteTask'

import React, { memo, useCallback } from 'react'
import { Icon } from 'src/components/atoms'
import { MenuItem } from 'src/components/organisms/Menu'
import { useTasksTask } from 'src/components/organisms/Tasks/hooks'
import { useToast } from 'src/hooks'
import { useTask } from 'src/store/entities/task'

type Props = {
  onMouseEnter: () => void
  taskId: string
}
export const DeleteTask: React.FC<Props> = memo((props) => {
  const { onMouseEnter, taskId } = props
  const { task, undeleteTask } = useTask(props.taskId)
  const { deleteTask } = useTasksTask()
  const { toast } = useToast()

  const handleClick = useCallback(() => {
    deleteTask({ taskId })
    toast({
      description: `${task.name} deleted`,
      undo: undeleteTask,
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

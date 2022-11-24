import React, { memo, useCallback } from 'react'
import { FlexProps } from 'src/components/atoms'
import { useTask, useTaskCommand } from 'src/store/entities/task'
import { TasksNameField } from './TasksNameField'

type Props = FlexProps & {
  taskId: string
}

export const Input: React.FC<Props> = memo<Props>((props) => {
  const { task, setTaskName } = useTask(props.taskId)
  const { deleteTask } = useTaskCommand()

  const handleDeleteTask = useCallback(async () => {
    await deleteTask({ taskId: props.taskId })
  }, [deleteTask, props.taskId])

  const handleChangeName = useCallback(
    async (val: string) => {
      await setTaskName(val)
    },
    [setTaskName],
  )

  return (
    <TasksNameField
      value={task.name}
      isNew={task.isNew}
      onChange={handleChangeName}
      deleteTask={handleDeleteTask}
      focusedBorder
      flex={1}
    />
  )
})
Input.displayName = 'Input'

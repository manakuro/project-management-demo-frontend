import React, { memo, useCallback } from 'react'
import { FlexProps } from 'src/components/atoms'
import { useTask } from 'src/store/entities/tasks'
import { TasksNameField } from './TasksNameField'

type Props = FlexProps & {
  taskId: string
}

export const Input: React.VFC<Props> = memo<Props>((props) => {
  const { task, deleteTask, setTaskName } = useTask(props.taskId)

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
      deleteTask={deleteTask}
      focusedBorder
      flex={1}
    />
  )
})
Input.displayName = 'Input'

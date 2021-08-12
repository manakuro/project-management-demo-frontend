import React, { memo, useCallback } from 'react'
import { CheckIcon, Flex, FlexProps } from 'src/components/atoms'
import { useTask } from 'src/store/entities/tasks'
import { TasksNameProvider } from './Provider'
import { TasksNameField } from './TasksNameField'

type Props = FlexProps & {
  taskId: string
}

export const TasksName: React.FC<Props> = memo<Props>((props) => {
  return (
    <TasksNameProvider taskId={props.taskId}>
      <Component {...props} />
    </TasksNameProvider>
  )
})

const Component: React.VFC<Props> = memo<Props>((props) => {
  const { task, setTask, deleteTask, setTaskName } = useTask(props.taskId)

  const handleChangeName = useCallback(
    async (val: string) => {
      await setTaskName(val)
    },
    [setTaskName],
  )
  const handleToggleDone = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation()
      await setTask({ isDone: !task.isDone })
    },
    [setTask, task.isDone],
  )

  return (
    <Flex>
      <CheckIcon isDone={task.isDone} onClick={handleToggleDone} />
      <TasksNameField
        value={task.name}
        isNew={task.isNew}
        onChange={handleChangeName}
        deleteTask={deleteTask}
        focusedBorder
        flex={1}
      />
    </Flex>
  )
})
TasksName.displayName = 'TasksName'

import React, { memo, useCallback } from 'react'
import { CheckIcon, Flex, FlexProps } from 'src/components/atoms'
import { useTask, useTaskCommand } from 'src/store/entities/task'
import { useTasksBoardListItemContext } from '../Provider'
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

const Component: React.FC<Props> = memo<Props>((props) => {
  const { onToggleDone } = useTasksBoardListItemContext()
  const { deleteTask } = useTaskCommand()
  const { task, setTaskName } = useTask(props.taskId)

  const handleDeleteTask = useCallback(async () => {
    await deleteTask({ taskId: props.taskId })
  }, [deleteTask, props.taskId])

  const handleChangeName = useCallback(
    async (val: string) => {
      await setTaskName(val)
    },
    [setTaskName],
  )
  const handleToggleDone = useCallback(
    async (e: React.MouseEvent<SVGElement>) => {
      e.stopPropagation()
      onToggleDone()
    },
    [onToggleDone],
  )

  return (
    <Flex>
      <CheckIcon completed={task.completed} onClick={handleToggleDone} />
      <TasksNameField
        taskId={task.id}
        value={task.name}
        isNew={task.isNew}
        onChange={handleChangeName}
        deleteTask={handleDeleteTask}
        flex={1}
      />
    </Flex>
  )
})
Component.displayName = 'Component'
TasksName.displayName = 'TasksName'

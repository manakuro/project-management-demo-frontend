import React, { memo, useCallback } from 'react'
import { CheckIcon, Flex, FlexProps, Stack } from 'src/components/atoms'
import { TaskDoneTransition } from 'src/components/molecules'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'
import { useTask, useTaskCommand } from 'src/store/entities/task'
import { Assignee } from './Assignee'
import { DueDate } from './DueDate'
import { Provider, useSubtasksNameContext } from './Provider'
import { RightItem } from './RightItem'
import { TasksNameCell } from './TasksNameCell'
import { TasksNameField } from './TasksNameField'
import { TasksNameGrabIcon } from './TasksNameGrabIcon'

type Props = FlexProps & {
  taskId: string
}

export const TasksName: React.FC<Props> = memo<Props>((props) => {
  return (
    <Provider taskId={props.taskId}>
      <Component {...props} />
    </Provider>
  )
})

export const Component: React.FC<Props> = memo<Props>((props) => {
  const { ref, isTransitioning, onStartTransition, onEndTransition } =
    useSubtasksNameContext()
  const { deleteTask } = useTaskCommand()
  const { task, setTaskName, setTask } = useTask(props.taskId)

  const handleChange = useCallback(
    async (val: string) => {
      await setTaskName(val)
    },
    [setTaskName],
  )

  const handleDeleteTask = useCallback(async () => {
    await deleteTask({ taskId: props.taskId })
  }, [deleteTask, props.taskId])

  const handleToggleDone = useCallback(async () => {
    if (!task.completed) {
      onStartTransition()
      setTimeout(async () => {
        await setTask({ completed: !task.completed })
        onEndTransition()
      }, 1000)
      return
    }

    await setTask({ completed: !task.completed })
    onEndTransition()
  }, [onEndTransition, onStartTransition, setTask, task.completed])

  return (
    <TasksListRow w="full">
      <TasksNameCell ref={ref} borderRight="none" containerStyle={{ flex: 1 }}>
        <TaskDoneTransition isTransitioning={isTransitioning} />
        <TasksNameGrabIcon />
        <CheckIcon
          completed={task.completed}
          ml={2}
          onClick={handleToggleDone}
          isTransitioning={isTransitioning}
        />
        <TasksNameField
          value={task.name}
          isNew={task.isNew}
          onChange={handleChange}
          deleteTask={handleDeleteTask}
        />
        <Flex alignItems="center" ml="auto">
          <Stack direction="row" spacing={2} alignItems="center">
            <RightItem>
              <DueDate taskId={props.taskId} />
            </RightItem>
            <RightItem>
              <Assignee taskId={props.taskId} />
            </RightItem>
          </Stack>
        </Flex>
      </TasksNameCell>
    </TasksListRow>
  )
})
Component.displayName = 'Component'
TasksName.displayName = 'TasksName'

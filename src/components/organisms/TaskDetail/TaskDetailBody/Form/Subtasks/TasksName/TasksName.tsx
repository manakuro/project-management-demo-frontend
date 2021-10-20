import React, { memo, useCallback } from 'react'
import { CheckIcon, Flex, FlexProps, Stack } from 'src/components/atoms'
import { TaskDoneTransition } from 'src/components/molecules'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'
import { useTask } from 'src/store/entities/tasks'
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
  const { task, setTaskName, setTask, deleteTask } = useTask(props.taskId)

  const handleChange = useCallback(
    async (val) => {
      await setTaskName(val)
    },
    [setTaskName],
  )

  const handleToggleDone = useCallback(async () => {
    if (!task.isDone) {
      onStartTransition()
      setTimeout(async () => {
        await setTask({ isDone: !task.isDone })
        onEndTransition()
      }, 1000)
      return
    }

    await setTask({ isDone: !task.isDone })
    onEndTransition()
  }, [onEndTransition, onStartTransition, setTask, task.isDone])

  return (
    <TasksListRow w="full">
      <TasksNameCell ref={ref} borderRight="none" containerStyle={{ flex: 1 }}>
        <TaskDoneTransition isTransitioning={isTransitioning} />
        <TasksNameGrabIcon />
        <CheckIcon
          isDone={task.isDone}
          ml={2}
          onClick={handleToggleDone}
          isTransitioning={isTransitioning}
        />
        <TasksNameField
          value={task.name}
          isNew={task.isNew}
          onChange={handleChange}
          deleteTask={deleteTask}
        />
        <Flex alignItems="center" ml="auto">
          <Stack direction="row" spacing={2} alignItems="center">
            <RightItem>
              <DueDate dueDate={task.dueDate} dueTime={task.dueTime} />
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

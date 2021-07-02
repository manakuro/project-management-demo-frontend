import React, { memo, useCallback } from 'react'
import { CheckIcon, Flex, FlexProps, Stack } from 'src/components/atoms'
import {
  TasksNameCell,
  TasksNameGrabIcon,
  TasksNameField,
  useTasksNameContext,
} from 'src/components/organisms/Tasks/TasksList/TasksListCells/TasksName'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'
import { useTask } from 'src/store/entities/tasks'
import { Assignee } from './Assignee'
import { DueDate } from './DueDate'
import { RightItem } from './RightItem'
import { SubtaskNameProvider } from './SubtaskNameProvider'

type Props = FlexProps & {
  taskId: string
}

export const TasksName: React.FC<Props> = memo<Props>((props) => {
  return (
    <SubtaskNameProvider taskId={props.taskId}>
      <Component {...props} />
    </SubtaskNameProvider>
  )
})

export const Component: React.FC<Props> = memo<Props>((props) => {
  const { ref } = useTasksNameContext()
  const { task, setTaskName, setTask, deleteTask } = useTask(props.taskId)

  const handleChange = useCallback(
    async (val) => {
      await setTaskName(val)
    },
    [setTaskName],
  )

  const handleToggleDone = useCallback(async () => {
    await setTask({ isDone: !task.isDone })
  }, [setTask, task.isDone])

  return (
    <TasksListRow w="full">
      <TasksNameCell ref={ref} borderRight="none" flex={1}>
        <TasksNameGrabIcon />
        <CheckIcon isDone={task.isDone} ml={2} onClick={handleToggleDone} />
        <TasksNameField
          value={task.name}
          onChange={handleChange}
          isNew={task.isNew}
          deleteTask={deleteTask}
        />
        <Flex alignItems="center" ml="auto">
          <Stack direction="row" spacing={2} alignItems="center">
            <RightItem>
              <DueDate dueDate={task.dueDate} dueTime={task.dueTime} />
            </RightItem>
            <RightItem>
              <Assignee assigneeId={task.assigneeId} />
            </RightItem>
          </Stack>
        </Flex>
      </TasksNameCell>
    </TasksListRow>
  )
})
TasksName.displayName = 'TasksName'

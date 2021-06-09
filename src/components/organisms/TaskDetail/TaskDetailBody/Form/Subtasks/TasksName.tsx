import React, { memo, useCallback } from 'react'
import { CheckIcon, Flex, FlexProps, Stack } from 'src/components/atoms'
import {
  TasksNameCell,
  TasksNameGrabIcon,
  TasksNameField,
  useTasksName,
} from 'src/components/organisms/Tasks/TasksList/TasksListCells/TasksName'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'
import { useSubtask } from 'src/store/entities/subtasks'
import { Assignee } from './Assignee'
import { DueDate } from './DueDate'
import { RightItem } from './RightItem'
import { SubtaskNameProvider } from './SubtaskNameProvider'

type Props = FlexProps & {
  subtaskId: string
}

export const TasksName: React.FC<Props> = (props) => {
  return (
    <SubtaskNameProvider>
      <Component {...props} />
    </SubtaskNameProvider>
  )
}

export const Component: React.FC<Props> = memo<Props>((props) => {
  const { ref } = useTasksName()
  const { subtask, setSubtask } = useSubtask(props.subtaskId)

  const handleChange = useCallback(
    async (val) => {
      await setSubtask({ name: val })
    },
    [setSubtask],
  )

  const handleToggleDone = useCallback(async () => {
    await setSubtask({ isDone: !subtask.isDone })
  }, [setSubtask, subtask.isDone])

  return (
    <TasksListRow w="full">
      <TasksNameCell ref={ref} borderRight="none">
        <TasksNameGrabIcon />
        <CheckIcon isDone={subtask.isDone} ml={2} onClick={handleToggleDone} />
        <TasksNameField value={subtask.name} onChange={handleChange} />
        <Flex alignItems="center" ml="auto">
          <Stack direction="row" spacing={2} alignItems="center">
            <RightItem>
              <DueDate dueDate={subtask.dueDate} dueTime={subtask.dueTime} />
            </RightItem>
            <RightItem>
              <Assignee assigneeId={subtask.assigneeId} />
            </RightItem>
          </Stack>
        </Flex>
      </TasksNameCell>
    </TasksListRow>
  )
})

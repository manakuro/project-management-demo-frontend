import React, { memo } from 'react'
import { CheckIcon, Flex, FlexProps, Stack } from 'src/components/atoms'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'
import {
  TasksNameCell,
  TasksNameGrabIcon,
  TasksNameField,
  useTasksName,
} from 'src/components/organisms/Tasks/TasksList/TasksListCells/TasksName'
import { DueDate } from './DueDate'
import { SubtaskNameProvider } from './SubtaskNameProvider'
// import { dateFns } from 'src/shared/dateFns'

type Props = FlexProps

export const TasksName: React.FC<Props> = (props) => {
  return (
    <SubtaskNameProvider>
      <Component {...props} />
    </SubtaskNameProvider>
  )
}

export const Component: React.FC<Props> = memo<Props>(() => {
  const { ref } = useTasksName()

  return (
    <TasksListRow w="full">
      <TasksNameCell ref={ref} borderRight="none">
        <TasksNameGrabIcon />
        <CheckIcon isDone={false} ml={2} />
        <TasksNameField value="Organize component folder" onChange={() => {}} />
        <Flex alignItems="center" ml="auto">
          <Stack direction="row" spacing={2}>
            <DueDate
              // dueDate={new Date(dateFns.addDays(new Date(), 3)).toISOString()}
              // dueTime={new Date(dateFns.addDays(new Date(), 3)).toISOString()}
              dueDate=""
              dueTime=""
            />
          </Stack>
        </Flex>
      </TasksNameCell>
    </TasksListRow>
  )
})

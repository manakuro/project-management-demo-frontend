import React, { memo } from 'react'
import { CheckIcon, FlexProps } from 'src/components/atoms'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'
import {
  TasksNameCell,
  TasksNameGrabIcon,
  TasksNameField,
  useTasksName,
  TasksNameProvider,
} from 'src/components/organisms/Tasks/TasksList/TasksListCells/TasksName'

type Props = FlexProps

export const TasksName: React.FC<Props> = (props) => {
  return (
    <TasksNameProvider>
      <Component {...props} />
    </TasksNameProvider>
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
      </TasksNameCell>
    </TasksListRow>
  )
})

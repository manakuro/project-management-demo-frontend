import React from 'react'
import {
  TasksListCell,
  TasksListCellProps,
} from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { forwardRef } from 'src/shared/chakra'
import { useTasksName } from './TasksNameProvider'

type Props = TasksListCellProps

export const TasksNameCell: React.FC<Props> = forwardRef((props, ref) => {
  const { cellStyle } = useTasksName()

  return (
    <TasksListCell
      fontSize="sm"
      ref={ref}
      cursor="pointer"
      borderLeft="none"
      {...cellStyle}
      onClick={props.onClick}
      hover
      {...props}
    />
  )
})

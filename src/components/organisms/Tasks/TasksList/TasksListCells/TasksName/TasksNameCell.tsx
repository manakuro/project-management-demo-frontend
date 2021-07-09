import React from 'react'
import {
  TasksListCell,
  TasksListCellProps,
} from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useTasksListSectionContext } from 'src/components/organisms/Tasks/TasksList/TasksListSection/Provider'
import { forwardRef } from 'src/shared/chakra'
import { useTasksNameContext } from './TasksNameProvider'

type Props = TasksListCellProps

export const TasksNameCell: React.FC<Props> = forwardRef((props, ref) => {
  const { cellStyle } = useTasksNameContext()
  const { sortedStyle } = useTasksListSectionContext()

  return (
    <>
      <TasksListCell
        fontSize="sm"
        ref={ref}
        cursor="pointer"
        borderLeft="none"
        onClick={props.onClick}
        hover
        position="relative"
        justifyContent="flex-end"
        {...props}
        {...cellStyle}
        {...sortedStyle}
      >
        {props.children}
      </TasksListCell>
    </>
  )
})

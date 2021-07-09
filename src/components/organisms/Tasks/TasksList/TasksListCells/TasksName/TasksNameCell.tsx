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

  const { containerStyle: cellStyleContainerStyle, ...cellStyleRest } =
    cellStyle ?? { containerStyle: {} }
  return (
    <>
      <TasksListCell
        fontSize="sm"
        cursor="pointer"
        borderLeft="none"
        onClick={props.onClick}
        hover
        justifyContent="flex-end"
        containerStyle={{
          position: 'relative',
          ref,
          ...cellStyleContainerStyle,
        }}
        {...props}
        {...cellStyleRest}
        {...sortedStyle}
      >
        {props.children}
      </TasksListCell>
    </>
  )
})

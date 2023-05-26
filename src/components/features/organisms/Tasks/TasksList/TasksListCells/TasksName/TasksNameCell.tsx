import React, { memo } from 'react'
import {
  TasksListCell,
  TasksListCellProps,
} from 'src/components/features/organisms/Tasks/TasksList/TasksListCell'
import { useTasksListSectionContext } from 'src/components/features/organisms/Tasks/TasksList/TasksListSection/Provider'
import { forwardRef } from 'src/shared/chakra'
import { useTasksNameContext } from './TasksNameProvider'

type Props = TasksListCellProps

export const TasksNameCell: React.FC<Props> = memo(
  forwardRef((props, ref) => {
    const { cellStyle } = useTasksNameContext()
    const { indentedStyle } = useTasksListSectionContext()

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
          ref={ref}
          {...props}
          containerStyle={{
            position: 'relative',
            ...props.containerStyle,
            ...cellStyleContainerStyle,
          }}
          {...cellStyleRest}
          {...indentedStyle}
        >
          {props.children}
        </TasksListCell>
      </>
    )
  }),
)
TasksNameCell.displayName = 'TasksNameCell'

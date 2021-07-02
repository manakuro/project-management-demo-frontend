import React from 'react'
import { Box } from 'src/components/atoms'
import {
  TasksListCell,
  TasksListCellProps,
} from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { useTasksListSectionContext } from 'src/components/organisms/Tasks/TasksList/TasksListSection/Provider'
import { forwardRef } from 'src/shared/chakra'
import { useTask } from 'src/store/entities/tasks'
import { useTasksNameContext } from './TasksNameProvider'

type Props = TasksListCellProps

export const TasksNameCell: React.FC<Props> = forwardRef((props, ref) => {
  const { cellStyle, taskId } = useTasksNameContext()
  const { task } = useTask(taskId)
  const { sortedStyle, indented } = useTasksListSectionContext()

  return (
    <>
      <TasksListCell
        fontSize="sm"
        ref={ref}
        cursor="pointer"
        borderLeft="none"
        {...cellStyle}
        {...sortedStyle}
        onClick={props.onClick}
        hover
        position="relative"
        justifyContent="flex-end"
        {...props}
      >
        {props.children}
        {indented && !task.taskParentId && (
          <Box
            position="absolute"
            left={0}
            top="-2px"
            w={6}
            h="39px"
            bg="white"
          />
        )}
      </TasksListCell>
    </>
  )
})

import React from 'react'
import { FlexProps } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { forwardRef } from 'src/shared/chakra'
import { useTasksName } from './TasksNameProvider'

type Props = FlexProps

export const TasksNameCell: React.FC<Props> = forwardRef((props, ref) => {
  const { cellStyle } = useTasksName()

  return (
    <TasksListCell
      fontSize="sm"
      ref={ref}
      flex={1}
      cursor="pointer"
      {...cellStyle}
      onClick={props.onClick}
      {...props}
    />
  )
})

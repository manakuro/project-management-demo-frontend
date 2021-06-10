import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import {
  TasksName,
  TasksDueDate,
  TasksProjects,
  TasksTags,
} from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { useTaskColumn } from 'src/store/entities/taskColumns'

type Props = FlexProps & {
  taskId: string
  taskColumnId: string
}

export const Cell: React.FC<Props> = memo<Props>((props) => {
  const { taskColumn } = useTaskColumn(props.taskColumnId)
  console.log('taskColumn: ', taskColumn)

  return (
    <>
      <TasksName taskId={props.taskId} />
      <TasksDueDate taskId={props.taskId} />
      <TasksProjects taskId={props.taskId} />
      <TasksTags taskId={props.taskId} />
      <TasksListCell w="4%" borderRight="none" />
    </>
  )
})
Cell.displayName = 'Cell'

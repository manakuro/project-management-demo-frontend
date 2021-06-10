import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { useTasksList } from 'src/components/organisms/Tasks/TasksList/Provider'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import {
  TasksName,
  TasksDueDate,
  TasksProjects,
  TasksTags,
} from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'
import { Provider, useTasksListItem } from './Provider'

type Props = FlexProps & {
  taskId: string
}

export const TasksListItem: React.FC<Props> = (props) => {
  return (
    <Provider {...props}>
      <Component {...props} />
    </Provider>
  )
}

const Component: React.FC<Props> = memo<Props>((props) => {
  const { selected } = useTasksListItem()
  const { taskColumnIds } = useTasksList()
  console.log('taskColumnIds: ', taskColumnIds)

  return (
    <TasksListRow selected={selected}>
      <TasksName taskId={props.taskId} />
      <TasksDueDate taskId={props.taskId} />
      <TasksProjects taskId={props.taskId} />
      <TasksTags taskId={props.taskId} />
      <TasksListCell w="4%" borderRight="none" />
    </TasksListRow>
  )
})
TasksListItem.displayName = 'TasksListItem'

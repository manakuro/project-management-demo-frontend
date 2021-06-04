import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { TasksName } from 'src/components/organisms/Tasks/TasksList/TasksListCells'
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

  return (
    <TasksListRow selected={selected}>
      <TasksName taskId={props.taskId} />
      <TasksListCell w="12%" />
      <TasksListCell w="12%" />
      <TasksListCell w="12%" />
      <TasksListCell w="4%" borderRight="none" />
    </TasksListRow>
  )
})
TasksListItem.displayName = 'TasksListItem'

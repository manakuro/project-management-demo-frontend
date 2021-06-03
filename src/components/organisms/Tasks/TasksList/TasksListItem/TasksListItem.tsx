import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { TasksName } from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'

type Props = FlexProps & {
  taskId: string
}

export const TasksListItem: React.FC<Props> = memo<Props>((props) => {
  return (
    <TasksListRow>
      <TasksName taskId={props.taskId} />
      <TasksListCell w="12%" />
      <TasksListCell w="12%" />
      <TasksListCell w="12%" />
      <TasksListCell w="4%" borderRight="none" />
    </TasksListRow>
  )
})
TasksListItem.displayName = 'TasksListItem'

import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { TasksName } from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'

type Props = FlexProps

export const TasksListItem: React.FC<Props> = memo<Props>(() => {
  return (
    <TasksListRow>
      <TasksName />
      <TasksListCell w="12%" />
      <TasksListCell w="12%" />
      <TasksListCell w="12%" />
      <TasksListCell w="4%" borderRight="none" />
    </TasksListRow>
  )
})
TasksListItem.displayName = 'TasksListItem'

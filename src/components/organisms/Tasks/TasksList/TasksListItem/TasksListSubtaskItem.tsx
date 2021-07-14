import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { useTasksListContext } from 'src/components/organisms/Tasks/TasksList/Provider'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'
import { Cell } from './Cell'
import { useTasksListItemContext } from './Provider'

type Props = FlexProps & {
  taskId: string
}

export const TasksListSubtaskItem: React.FC<Props> = memo<Props>((props) => {
  const { selected } = useTasksListItemContext()
  const { taskColumnIds } = useTasksListContext()

  return (
    <>
      <TasksListRow selected={selected} pr={6}>
        {taskColumnIds.map((id) => (
          <Cell taskId={props.taskId} taskColumnId={id} key={id} isSubtask />
        ))}
        <TasksListCell containerStyle={{ flex: 1 }} borderRight="none" />
      </TasksListRow>
    </>
  )
})
TasksListSubtaskItem.displayName = 'TasksListSubItem'

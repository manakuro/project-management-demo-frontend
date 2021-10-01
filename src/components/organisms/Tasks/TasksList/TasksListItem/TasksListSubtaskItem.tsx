import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'
import { useTasksTaskColumnIds } from 'src/components/organisms/Tasks/hooks'
import { Cell } from './Cell'
import { useTasksListItemRowContext } from './Provider'

type Props = FlexProps & {
  taskId: string
}

export const TasksListSubtaskItem: React.FC<Props> = memo<Props>((props) => {
  const { selected } = useTasksListItemRowContext()
  const { tasksTaskColumnIds } = useTasksTaskColumnIds()

  return (
    <>
      <TasksListRow selected={selected} pr={6}>
        {tasksTaskColumnIds.map((id) => (
          <Cell
            taskId={props.taskId}
            tasksTaskColumnId={id}
            key={id}
            isSubtask
          />
        ))}
        <TasksListCell containerStyle={{ flex: 1 }} borderRight="none" />
      </TasksListRow>
    </>
  )
})
TasksListSubtaskItem.displayName = 'TasksListSubItem'

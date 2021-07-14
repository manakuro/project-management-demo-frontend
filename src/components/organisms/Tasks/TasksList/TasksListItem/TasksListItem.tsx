import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { useTasksListContext } from 'src/components/organisms/Tasks/TasksList/Provider'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'
import { Cell } from './Cell'
import { Provider, useTasksListItemContext } from './Provider'
import { TasksListSubtaskList } from './TasksListSubtaskList'

type Props = FlexProps & {
  taskId: string
}

export const TasksListItem: React.FC<Props> = memo<Props>((props) => {
  return (
    <Provider {...props}>
      <Component {...props} />
    </Provider>
  )
})

const Component: React.FC<Props> = memo<Props>((props) => {
  const { selected } = useTasksListItemContext()
  const { taskColumnIds } = useTasksListContext()

  return (
    <>
      <TasksListRow selected={selected} pr={6}>
        {taskColumnIds.map((id) => (
          <Cell taskId={props.taskId} taskColumnId={id} key={id} />
        ))}
        <TasksListCell containerStyle={{ flex: 1 }} borderRight="none" />
      </TasksListRow>
      <TasksListSubtaskList taskId={props.taskId} />
    </>
  )
})
TasksListItem.displayName = 'TasksListItem'

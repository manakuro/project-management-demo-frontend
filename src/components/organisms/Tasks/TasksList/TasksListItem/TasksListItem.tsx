import React, { memo } from 'react'
import { FlexProps } from 'src/components/atoms'
import { useTasksListContext } from 'src/components/organisms/Tasks/TasksList/Provider'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { TasksListRow } from 'src/components/organisms/Tasks/TasksList/TasksListRow'
import { useTaskIdsByTaskParentId } from 'src/store/entities/tasks'
import { Cell } from './Cell'
import { Provider, useTasksListItemContext } from './Provider'
import { TasksListSubItem } from './TasksListSubItem'

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
  const { selected, isSubtaskExpanded } = useTasksListItemContext()
  const { taskColumnIds } = useTasksListContext()
  const { taskIds } = useTaskIdsByTaskParentId(props.taskId)

  return (
    <>
      <TasksListRow selected={selected} pr={6}>
        {taskColumnIds.map((id) => (
          <Cell taskId={props.taskId} taskColumnId={id} key={id} />
        ))}
        <TasksListCell flex={1} borderRight="none" />
      </TasksListRow>
      {isSubtaskExpanded &&
        taskIds.length > 0 &&
        taskIds.map((id) => <TasksListSubItem key={id} taskId={id} />)}
    </>
  )
})
TasksListItem.displayName = 'TasksListItem'

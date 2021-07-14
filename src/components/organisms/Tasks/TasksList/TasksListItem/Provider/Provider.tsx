import React, { memo } from 'react'
import { Provider as SubtaskListProvider } from './useSubtaskList'
import { Provider as TasksListRowProvider } from './useTasksListRow'

type Props = {
  taskId: string
}

export const Provider: React.FC<Props> = memo((props) => {
  return (
    <TasksListRowProvider {...props}>
      <SubtaskListProvider {...props}>{props.children}</SubtaskListProvider>
    </TasksListRowProvider>
  )
})
Provider.displayName = 'Provider'

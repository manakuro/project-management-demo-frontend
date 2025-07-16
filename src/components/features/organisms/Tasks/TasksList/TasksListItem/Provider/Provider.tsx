import type React from 'react'
import { type PropsWithChildren, memo } from 'react'
import { Provider as SubtaskListProvider } from './SubtaskListProvider'
import { Provider as TasksListRowProvider } from './TasksListRowProvider'

type Props = PropsWithChildren<{
  taskId: string
}>

export const Provider: React.FC<Props> = memo((props) => {
  return (
    <TasksListRowProvider {...props}>
      <SubtaskListProvider {...props}>{props.children}</SubtaskListProvider>
    </TasksListRowProvider>
  )
})
Provider.displayName = 'Provider'

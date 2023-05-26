import React, { memo } from 'react'
import { TasksListCell } from 'src/components/features/organisms/Tasks/TasksList/TasksListCell'
import { useTasksListHeaderContext } from '../Provider'

type Props = {}

export const RemainingSpace: React.FC<Props> = memo<Props>(() => {
  const { sortedStyle } = useTasksListHeaderContext()

  return (
    <TasksListCell
      containerStyle={{ flex: 1 }}
      borderRight="none"
      {...sortedStyle}
    />
  )
})
RemainingSpace.displayName = 'RemainingSpace'

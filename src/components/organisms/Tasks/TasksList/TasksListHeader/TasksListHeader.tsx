import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useTasksListContext } from 'src/components/organisms/Tasks/TasksList/Provider'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { Column } from './Column'

type Props = {}

export const TasksListHeader: React.FC<Props> = memo<Props>(() => {
  const { taskColumnIds } = useTasksListContext()
  return (
    <Flex pr={6} position="sticky" top={0} zIndex="dropdown" bg="white">
      {taskColumnIds.map((id) => (
        <Column taskColumnId={id} key={id} />
      ))}
      <TasksListCell containerStyle={{ flex: 1 }} borderRight="none" />
    </Flex>
  )
})
TasksListHeader.displayName = 'TasksListHeader'

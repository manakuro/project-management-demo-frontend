import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useTasksList } from 'src/components/organisms/Tasks/TasksList/Provider'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { Column } from './Column'

type Props = {}

export const TasksListHeader: React.FC<Props> = memo<Props>(() => {
  const { taskColumnIds } = useTasksList()
  return (
    <Flex flex={1}>
      {taskColumnIds.map((id, i) => (
        <Column taskColumnId={id} key={id} isFirst={i === 0} />
      ))}
      <TasksListCell flex={1} borderRight="none" />
    </Flex>
  )
})
TasksListHeader.displayName = 'TasksListHeader'

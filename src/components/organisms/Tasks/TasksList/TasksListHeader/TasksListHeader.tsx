import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { Column } from './Column'

type Props = {
  taskColumnIds: string[]
}

export const TasksListHeader: React.FC<Props> = memo<Props>((props) => {
  return (
    <Flex flex={1}>
      {props.taskColumnIds.map((id, i) => (
        <Column taskColumnId={id} key={id} isFirst={i === 0} />
      ))}
      <TasksListCell flex={1} borderRight="none" />
    </Flex>
  )
})
TasksListHeader.displayName = 'TasksListHeader'

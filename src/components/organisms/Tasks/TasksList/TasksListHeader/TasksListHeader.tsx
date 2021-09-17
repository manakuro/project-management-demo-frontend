import React, { memo } from 'react'
import { Flex } from 'src/components/atoms'
import { useTasksTaskColumn } from 'src/components/organisms/Tasks/hooks'
import { Column } from './Column'
import { RemainingSpace } from './Columns'
import { Provider, useTasksListHeaderContext } from './Provider'

type Props = {}

export const TasksListHeader: React.FC<Props> = memo<Props>((props) => {
  return (
    <Provider>
      <Component {...props} />
    </Provider>
  )
})

const Component: React.FC<Props> = memo<Props>(() => {
  const { taskColumnIds } = useTasksTaskColumn()
  const { scrollingStyle } = useTasksListHeaderContext()

  return (
    <Flex
      pr={6}
      position="sticky"
      top={0}
      zIndex="dropdown"
      bg="white"
      {...scrollingStyle}
    >
      {taskColumnIds.map((id) => (
        <Column taskColumnId={id} key={id} />
      ))}
      <RemainingSpace />
    </Flex>
  )
})
TasksListHeader.displayName = 'TasksListHeader'

import React, { memo } from 'react'
import { useTasksTaskColumnIds } from 'src/components/organisms/Tasks/hooks'
import { Flex } from 'src/components/ui/atoms'
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
  const { tasksTaskColumnIds } = useTasksTaskColumnIds()
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
      {tasksTaskColumnIds.map((id) => (
        <Column tasksTaskColumnId={id} key={id} />
      ))}
      <RemainingSpace />
    </Flex>
  )
})
Component.displayName = 'Component'
TasksListHeader.displayName = 'TasksListHeader'

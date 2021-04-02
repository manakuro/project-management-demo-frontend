import React, { memo } from 'react'
import { Flex, FlexProps } from 'src/components/atoms'
import { TasksListCell } from 'src/components/organisms/Tasks/TasksList/TasksListCell'
import { TasksName } from 'src/components/organisms/Tasks/TasksList/TasksListCells'
import { useClickableHover } from 'src/hooks'

type Props = FlexProps

export const TasksListRow: React.FC<Props> = memo<Props>((props) => {
  const { clickableHoverStyle } = useClickableHover()

  return (
    <Flex {...clickableHoverStyle} cursor="auto" h="36px">
      <TasksName />
      <TasksListCell w="12%" />
      <TasksListCell w="12%" />
      <TasksListCell w="12%" />
      <TasksListCell w="4%" borderRight="none" />
    </Flex>
  )
})
